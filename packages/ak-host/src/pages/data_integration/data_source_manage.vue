<template>
    <div>
        <div class="content">
            <Card dis-hover>
                <p slot="title">数据源列表</p>
                <a slot="extra" @click="refreshPage">刷新</a>
                <div class="app-search">
                  <Row>
                    <span>数据源类型:</span>
                    <Select v-model="sourceOptions.sourceType" style="width:100px" @on-change="applySearch">
                      <Option value="0">全部</Option>
                      <Option value="1">KAFKA</Option>
                      <Option value="2">mysql</Option>
                      <Option value="3">HDFS</Option>
                      <Option value="4">FTP</Option>
                      <Option value="5">Oracle</Option>
                    </Select>
                    <span style="margin-left: 10px">数据源名称:</span>
                    <i-input v-model="searchInput" icon="android-search" placeholder="输入数据源名称" style="width: 500px" @on-enter="applySearch"></i-input>
                    <Button type="primary" @click="applySearch" class="margin-left-5">搜索</Button>
                    <router-link to="/dwh/source/manage/add" class="pull-right">
                      <Button type="primary">
                        <Icon type="plus-round"></Icon>&nbsp;&nbsp;新增数据源
                      </Button>
                    </router-link>
                  </Row>
                </div>
                <Table :columns="sourceOptions.columns" :data="sourceOptions.data"></Table>
                <div class="margin-5">
                <Page :total="sourceOptions.dataLen" :current.sync="sourceOptions.currentPage"
                      :page-size="sourceOptions.pageSize"
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
export default {
  components: {richForm},
  data () {
    return {
      searchInput: '',
      searchKey: '',
      sourceOptions: {
        columns: [
          { key: 'name', title: '数据源名称'},
          { key: 'type', title: '数据源类型'},
          { key: 'config', title: '连接信息', type: 'html', width: '240px'},
          { key: 'description', title: '数据源描述'},
          { key: 'creator_cnname', title: '创建人'},
          { key: 'create_time', title: '时间', width: '150px'},
          {
            key: 'action',
            title: '操作',
            align: 'center',
            render: (h, params) => {
              let actionButton =  [
                h('router-link',
                  {
                    props: {
                      to: '/dwh/source/manage/' + params.row.id + '/update'
                    }
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
                      '编辑'
                    )
                  ]
                ),
                h('Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                    },
                    on: {
                      click: () => {
                        this.delSource(params.row.id)
                      }
                    }
                  },
                  '删除'
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
        sourceType: '0',
        typeMap: {1: 'KAFKA', 2: 'mysql', 3: 'HDFS', 4: 'FTP', 5: 'Oracle'}
      },
    }
  },
  methods: {
    goto (no) {
      this.$router.push(`/ecs/device/${no}`) // todo
    },
    getConfigShow(config) {
      var config_json = JSON.parse(config)
      var config_show = ''
      for (var key in config_json) {
        config_show += '<b>' + key + '</b>: ' + config_json[key]
        config_show += '<br />'
      }
      return config_show
    },
    getDataSources (params) {
      dwhApi.getDataSources(params).then(resp => {
        this.sourceOptions.data = resp.data.data.sources || []
        this.sourceOptions.data.forEach(item=>{
          item.type=this.sourceOptions.typeMap[item.type]
          item.create_time=formatDate(new Date(item.create_time * 1000), "yyyy-MM-dd hh:mm:ss")
          item.config = this.getConfigShow(item.config)
        });
        this.sourceOptions.dataLen = resp.data.data.total || 0
      })
    },
    refreshPage () {
      let params = {page: this.sourceOptions.currentPage - 1, size: this.sourceOptions.pageSize} 
      const filters = this.genParams(this.options)
      _.extend(params, filters)
      this.getDataSources(params)
    },
    applySearch (options) {
      this.searchKey = this.searchInput
      this.sourceOptions.currentPage = 1
      this.refreshPage()
    },
    onPageChange (currentPage) {
      this.searchInput = this.searchKey
      this.sourceOptions.currentPage = currentPage
      this.refreshPage()
    },
    onPageSizeChange (size) {
      this.searchInput = this.searchKey
      this.sourceOptions.pageSize = size
      this.refreshPage()
    },
    genParams (options) {
      var queryList = []
      if (this.searchKey) {
        var item = 'name:' + this.searchKey
        queryList.push(item)
      }
      if (this.sourceOptions.sourceType != '0') {
        var item = 'type:' + this.sourceOptions.sourceType
        queryList.push(item)
      }
      var params = {}
      var query = queryList.join(',')
      if (query !== '') {
        params['query'] = query
      }
      return params
    },
    addSource () {
      this.$router.push({name: 'dwh.console.data.tables.add'})
    },
    delSource(no) {
      this.$Modal.confirm({
        title: '警告',
        content: '您确定删除该数据源',
        onOk: () => {
          dwhApi.deleteDataSource({id: no}).then(resp => {
            let error = resp.data.error
            if (error == 0) {
             this.$Message.info({
               content: '删除数据源成功!', onClose: () => {
                 this.refreshPage();
               }, duration: 2, closable: false
             });
            } else {
              this.$Message.error({
               content: '删除数据源出错! ' + error, onClose: () => {
               }, duration: 2, closable: false
              });
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getDataSources()
  },
  beforeRouteUpdate (to, from, next) {
    this.getDataSources()
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
