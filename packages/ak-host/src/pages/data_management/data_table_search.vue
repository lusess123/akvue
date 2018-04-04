<template>
    <div>
        <div class="content">
            <Card dis-hover>
                <p slot="title">搜索数据</p>
                <a slot="extra" @click="refreshPage">刷新</a>
                <div class="app-search">
                    <Row>
                      <span>数据源:</span>
                      <Select v-model="sourceOptions.selected" style="width:150px" @on-change="onSourceChanged">
                        <Option v-for="item in sourceOptions.sourceList" :value="item" :key="item">{{ item }}</Option>
                      </Select>
                      <i-input v-model="searchInput" icon="android-search" placeholder="请输入..." style="width: 500px" @on-enter="applySearch"></i-input>
                      <Button type="primary" @click="applySearch" class="margin-left-5">搜索</Button>
                      <Tag v-model="tag_id" v-if="tag_id" style="margin-left: 10px" closable color="yellow" @on-close="tagClose">{{ tag_name }}</Tag>
                    </Row>
                </div>
                <Table :columns="tableOptions.columns" :data="tableOptions.data"></Table>
                <div class="margin-5">
                <Page :total="tableOptions.dataLen" :current.sync="tableOptions.currentPage"
                      :page-size="tableOptions.pageSize"
                      @on-change="onPageChange" @on-page-size-change="onPageSizeChange"
                      placement="top" show-sizer show-total></Page>
                </div>
                <div class="clear-both"></div>
            </Card>
        </div>
        <div class="popup">
          <router-view :key="$router.fullPath"></router-view>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import dwhApi from '@/requests/dwh.http'
import richForm from '@/components/rich-form'
import { formatDate } from '../../utils/tool'
import  * as dwhcore from './../../requests/dwh.core'
export default {
  components: {richForm},
  data () {
    return {
      sourceOptions: {
        selected: '全部',
        sourceList: [],
      },
      searchInput: '',
      searchKey: '',
      tag_id: 0,
      tag_name: '',
      tableOptions: {
        columns: [
          { 
            key: 'name', 
            title: '数据表名称',
            render: (h, params) => {
              let link =  [
                h('router-link',
                  { props: { to: '/dwh/table/' + params.row.id + '/detail' } },
                  [ params.row.name ]
                )
              ] 
              return h('div', link)
            }
          },
          { key: 'description', title: '描述'},
          { key: 'source_name', title: '数据源'},          
          { key: 'level', title: '数据级别', width: '100px'},          
          { key: 'sub_count', title: '订阅数', width: '100px'},          
          { key: 'owner_cnname', title: '负责人', width: '100px'},
          { key: 'update_time', title: '更新时间', width: '150px'},
          { key: 'tags', 
            title: '标签',
            render: (h, params) => {
              var actionButton = []
              params.row.tags.forEach(item=>{
                let button = h('Button',
                  {
                    props: { type: 'ghost', size: 'small', shape: 'circle' },
                    on: { click: () => {
                        this.tagClicked(item)
                      }
                    }
                  }, item.tag_name
                )
                actionButton.push(button)
              });
              return h("div", actionButton);
            }
          },
          {
            key: 'action',
            title: '操作',
            width: '120px',
            align: 'center',
            render: (h, params) => {
              let actionButton =  [
                h('router-link',
                  {
                    props: {
                      to: {path: '/dwh/table/search/' + params.row.id + '/apply', 
                           query: {name: params.row.name, source_name: params.row.source_name, owner_name: params.row.owner_name}},
                    },
                  },
                  [
                    h('Button',
                      {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        }
                      },
                      '申请订阅授权'
                    )
                  ]
                )
              ] 
              return h('div', actionButton)
            }
          }
        ],
        data: [],
        dataLen: 10,
        currentPage: 1,
        pageSize: 10,
        levelMap: { 0: 'S0', 1: 'S1', 2: 'S2' }
      },
    }
  },
  methods: {
    goto (no) {
      this.$router.push(`/ecs/device/${no}`) // todo
    },
    // todo: 默认分页，此处取全部
    getDataSources (params) {
      dwhApi.getDataSources(params).then(resp => {
        this.sourceOptions.sourceList = ['全部']
        let list = resp.data.data.sources || []
        list.forEach(item=>{
          this.sourceOptions.sourceList.push(item.name)
        });
      })
    },
    getDataTables (params) {
      dwhApi.getDataTables(params).then(resp => {
        this.tableOptions.data = resp.data.data.tables || []
        this.tableOptions.data.forEach(item=>{
          item.level = this.tableOptions.levelMap[item.level]
          item.update_time = formatDate(new Date(item.update_time * 1000), "yyyy-MM-dd hh:mm:ss")
          item.sub_count = item.realtime_sub_count + item.offline_sub_count
        });
        this.tableOptions.dataLen = resp.data.data.total || 0
      })
    },
    refreshPage () {
      this.getDataSources()
      let params = {page: this.tableOptions.currentPage - 1, size: this.tableOptions.pageSize} 
      const filters = this.genParams()
      _.extend(params, filters)
      this.getDataTables(params)
    },
    onSourceChanged () {
      this.searchInput = this.searchKey
      this.tableOptions.currentPage = 1
      this.refreshPage()
    },
    applySearch () {
      this.searchKey = this.searchInput
      this.tableOptions.currentPage = 1
      this.refreshPage()
    },
    onPageChange (currentPage) {
      this.searchInput = this.searchKey
      this.tableOptions.currentPage = currentPage
      this.refreshPage()
    },
    onPageSizeChange (size) {
      this.searchInput = this.searchKey
      this.tableOptions.pageSize = size
      this.refreshPage()
    },
    tagClicked(tag) {
      this.tag_id = tag.tag_id
      this.tag_name = tag.tag_name
      this.applySearch()
    },
    tagClose() {
      this.tag_id = 0
      this.tag_name = ''
      this.applySearch()
    },
    genParams () {
      var queryList = ['cluster_name:'+dwhcore.getOrg().name]
      if (this.searchKey) {
        var item = 'name:' + this.searchKey
        queryList.push(item)
      }
      if (this.tag_id != 0) {
        var item = 'tag_id:' + this.tag_id
        queryList.push(item)
      }
      if (this.sourceOptions.selected != '全部') {
        var item = 'source_name:' + this.sourceOptions.selected
        queryList.push(item)
      }
      var params = {}
      var query = queryList.join(',')
      if (query !== '') {
        params['query'] = query
      }
      return params
    },
  },
  mounted () {
    this.refreshPage()
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage()
    next()
  }
}
</script>


<style scoped>

.margin-top-10 {
  margin-top: 10px;
}

.pull-right {
  float: right;
}

.clear-both {
  clear: both;
}

.app-search {
  margin-bottom: 10px;
}
.margin-right-5 {
  margin-right: 5px;
}
.category {
  margin: 10px 0;
}
.content {
  margin: 10px 0;
}
.margin-5 {
  margin: 5px 0;
}
</style>
