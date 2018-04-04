<template>
    <div>
        <div class="content">
            <Card dis-hover>
                <p slot="title">订阅列表</p>
                <a slot="extra" @click="refreshPage">刷新</a>
                <div class="app-search">
                    <Row>
                      <span>订阅名:</span>
                      <i-input v-model="subName" placeholder="请输入..." style="width: 130px" @on-enter="applySearch"></i-input>
                      <span style="margin-left: 10px">订阅类型:</span>
                      <Select v-model="subType" style="width:100px" @on-change="applySearch">
                        <Option value="0">全部任务</Option>
                        <Option value="1">实时订阅</Option>
                        <Option value="2">离线订阅</Option>
                      </Select>
                      <span style="margin-left: 10px">订阅者:</span>
                      <i-input v-model="subUser" placeholder="请输入..." style="width: 130px" @on-enter="applySearch"></i-input>
                      <span style="margin-left: 10px">订阅状态:</span>
                      <Select v-model="subState" style="width:100px" @on-change="applySearch">
                        <Option value="0">全部任务</Option>
                        <Option value="1">正常</Option>
                        <Option value="2">冻结</Option>
                      </Select>
                      <span style="margin-left: 10px">表名:</span>
                      <i-input v-model="subTable" placeholder="请输入..." style="width: 130px" @on-enter="applySearch"></i-input>
                      <Button type="primary" @click="applySearch" style="margin-left: 10px">搜索</Button>
                    </Row>
                </div>
                <Table :columns="subOptions.columns" :data="subOptions.data" @on-selection-change="selectChanged"></Table>
                <div class="margin-5">
                <Page :total="subOptions.dataLen" :current.sync="subOptions.currentPage"
                      :page-size="subOptions.pageSize"
                      @on-change="onPageChange" @on-page-size-change="onPageSizeChange"
                      placement="top" show-sizer show-total></Page>
                </div>
                <div style="margin-top: 30px">
                  <Row>
                    <Button type="primary" @click="showUpdateSubscription" style="margin-left: 10px" :disabled="this.modifyDisabled">修改优先级</Button>
                    <Button type="primary" @click="showUpdateSubscription" style="margin-left: 10px" :disabled="this.modifyDisabled">修改订阅者</Button>
                    <Button type="primary" @click="freezeSubscriptions" style="margin-left: 10px" :disabled="this.freezeDisabled">冻结</Button>
                    <Button type="primary" @click="unfreezeSubscriptions" style="margin-left: 10px" :disabled="this.freezeDisabled">解冻</Button>
                  </Row>
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
      modifyDisabled: true,
      freezeDisabled: true,
      subName: '',
      subType: '0',
      subUser: '',
      subState: '0',
      subTable: '',
      subOptions: {
        columns: [
          { type: 'selection', width: 60, align: 'center'},
          { key: 'name', title: '订阅名'},
          { key: 'auth_user_cnname', title: '订阅者'}, // 后续改为auth_user_name
          { key: 'priority_str', title: '优先级'},
          { key: 'type', title: '订阅类型'},
          { key: 'state', title: '订阅状态'},
          { key: 'sub_time', title: '订阅时间'},
          { key: 'table_name', title: '表名'},
          { key: 'source_name', title: '数据源'},
          { key: 'description', title: '描述'},
          { 
            key: 'config_action', 
            title: '配置信息',
            align: 'center',
            render: (h, params) => {
              let actionButton = [
                h('Button',
                  {
                    props: { type: 'primary', size: 'small' },
                    style: { marginRight: '5px', },
                    on: { click: () => {
                        this.showConfig(params.row.config)
                      }
                    }
                  }, '查看' 
                )
              ];
              return h("div", actionButton);
            }
          }, //
          { key: 'delay', title: '延迟'},
          {
            key: 'detail_action',
            title: '详情',
            align: 'center',
            render: (h, params) => {
              let actionButton =  [
                h('router-link',
                  {
                    props: {
                      to: '/dwh/sub/' + params.row.id + '/detail' // todo
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
                      '查看'
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
        selectionList: [],
        priorityMap: { 0: 'P0', 1: 'P1', 2: 'P2' },
        typeMap: { 1: '实时', 2: '离线' },
        stateMap: { '-1':'拒绝', 0: '未处理', 1: '正常', 2: '冻结'},
      },
    }
  },
  methods: {
    goto (no) {
      this.$router.push(`/ecs/device/${no}`) // todo
    },
    selectChanged(selection) {
      this.modifyDisabled = selection.length == 1 ? false : true
      this.freezeDisabled = selection.length > 0 ? false : true
      this.subOptions.selectionList = selection
    },
    freezeSubscriptions () {
      this.$Modal.confirm({
        title: "警告",
        content: "确认冻结所选订阅",
        onOk: () => {
          this.subOptions.selectionList.forEach(element => {
            this.updateSubscription(element.id, 2)
          });
        }
      });
    },
    unfreezeSubscriptions () {
      this.$Modal.confirm({
        title: "警告",
        content: "确认解冻所选订阅",
        onOk: () => {
          this.subOptions.selectionList.forEach(element => {
            this.updateSubscription(element.id, 1)
          });
        }
      });
    },
    updateSubscription (sub_id, sub_state) {
      let params = {id: sub_id, state: sub_state}
      dwhApi.updateSubscription(params).then(resp => {
        let error = resp.data.error
        if (error == 0) {
          this.$Message.info({
            content: '操作成功!', onClose: () => {
              this.refreshPage()
            }, duration: 1, closable: false
          });
        } else {
          this.$Message.error({
            content: '操作出错! ' + error, onClose: () => {
            }, duration: 1, closable: false
          });
        }
      });
    },
    showUpdateSubscription () {
      if (this.subOptions.selectionList.length > 0) {
        let sub_item = this.subOptions.selectionList[0]
        this.$router.push(
          {
            path: `/dwh/sub/task/manage/${sub_item.id}/update`, 
            query: {name: sub_item.name, priority: sub_item.priority}
          }
        )
      }
    },
    getSubscriptions (params) {
      dwhApi.getSubscriptions(params).then(resp => {
        this.subOptions.data = resp.data.data.subscription || []
        this.subOptions.data.forEach(item=>{
          item.name = 'RT' + item.id
          item.priority_str = this.subOptions.priorityMap[item.priority]
          item.type = this.subOptions.typeMap[item.type]
          item.state = this.subOptions.stateMap[item.state]
          item.sub_time=formatDate(new Date(item.sub_time * 1000), "yyyy-MM-dd hh:mm:ss")
          item.delay = 0
        });
        this.subOptions.dataLen = resp.data.data.total || 0
      })
    },
    refreshPage () {
      this.modifyDisabled = true
      this.freezeDisabled = true
      let params = {page: this.subOptions.currentPage - 1, size: this.subOptions.pageSize} 
      const filters = this.genParams(this.options)
      _.extend(params, filters)
      this.getSubscriptions(params)
    },
    applySearch () { // todo: 搜索时分页冲突
      this.subOptions.currentPage = 1
      this.refreshPage()
    },
    onPageChange (currentPage) {
      this.subOptions.currentPage = currentPage
      this.refreshPage()
    },
    onPageSizeChange (size) {
      this.subOptions.pageSize = size
      this.refreshPage()
    },
    genParams () {
      var queryList = []
      if (this.subName) {
        var item = 'name:' + this.subName
        queryList.push(item)
      }
      if (this.subType && this.subType != '0') {
        var item = 'type:' + this.subType
        queryList.push(item)
      }
      if (this.subUser) {
        var item = 'auth_user_cnname:' + this.subUser
        queryList.push(item)
      }
      if (this.subState && this.subState != '0') {
        var item = 'state:' + this.subState
        queryList.push(item)
      }
      if (this.subTable) {
        var item = 'table_name:' + this.subTable
        queryList.push(item)
      }
      var params = {}
      var query = queryList.join(',')
      if (query !== '') {
        params['query'] = query
      }
      return params
    },
    showConfig(config) {
      this.$Modal.info({
        title: '配置信息',
        content: config,
        onOk: () => {
        }
      })
    }
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
