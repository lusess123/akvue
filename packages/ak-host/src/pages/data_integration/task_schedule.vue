<template>
    <div>
        <div class="content">
            <Card dis-hover>
                <p slot="title">任务列表</p>
                <a slot="extra" @click="refreshPage">刷新</a>
                <div class="app-search">
                    <Row>
                      <span>任务名称:</span>
                      <i-input v-model="searchInput" placeholder="请输入..." style="width: 200px" @on-enter="applySearch"></i-input>
                      <span style="margin-left: 10px">任务类型:</span>
                      <Select v-model="taskType" style="width:100px" @on-change="applySearch">
                        <Option value="0">全部任务</Option>
                        <Option value="1">实时</Option>
                        <Option value="2">周期性</Option>
                        <Option value="3">一次性</Option>
                      </Select>
                      <span style="margin-left: 10px">责任人:</span>
                      <Select v-model="owner" style="width:100px" @on-change="applySearch">
                        <Option value="0">TODO</Option>
                      </Select>
                      <input type="checkbox" id="checkbox1" v-model="mineChecked" style="margin-left: 10px">
                      <label for="checkbox1">我的任务</label>
                      <input type="checkbox" id="checkbox2" v-model="frozenChecked" style="margin-left: 10px" @change="applySearch">
                      <label for="checkbox2">冻结任务</label>
                    </Row>
                </div>
                <Table :columns="taskOptions.columns" :data="taskOptions.data" @on-selection-change="selectChanged"></Table>
                <div class="margin-5">
                <Page :total="taskOptions.dataLen" :current.sync="taskOptions.currentPage"
                      :page-size="taskOptions.pageSize"
                      @on-change="onPageChange" @on-page-size-change="onPageSizeChange"
                      placement="top" show-sizer show-total></Page>
                </div>
                <div style="margin-top: 20px">
                  <Row>
                    <Button type="primary" @click="showUpdateTask" style="margin-left: 10px" :disabled="this.modifyDisabled">添加报警</Button>
                    <Button type="primary" @click="showUpdateTask" style="margin-left: 10px" :disabled="this.modifyDisabled">修改责任人</Button>
                    <Button type="primary" @click="showUpdateTask" style="margin-left: 10px" :disabled="this.modifyDisabled">修改资源组</Button>
                    <Button type="primary" @click="freezeTasks" style="margin-left: 10px" :disabled="this.freezeDisabled">冻结</Button>
                    <Button type="primary" @click="unfreezeTasks" style="margin-left: 10px" :disabled="this.freezeDisabled">解冻</Button>
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
      searchInput: '',
      searchKey: '',
      taskType: '0',
      owner: '0',
      mineChecked: false,
      frozenChecked: false,
      modifyDisabled: true,
      freezeDisabled: true,
      taskOptions: {
        columns: [
          { type: 'selection', width: 60, align: 'center'},
          { key: 'name', title: '任务名称'},
          { key: 'update_time', title: '修改日期'},
          { key: 'type', title: '任务类型'},
          { key: 'owner_cnname', title: '责任人'},
          { key: 'state', title: '状态'},
          { key: 'alarm_config', title: '报警设置'},
          { 
            key: 'config_action', 
            title: '详情',
            align: 'center',
            render: (h, params) => {
              let actionButton =  [
                h('router-link',
                  {
                    props: {
                      to: '/dwh/sub/' + params.row.id + '/detail'
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
        typeMap: {1: '实时', 2: '周期性', 3: '一次性'},
        stateMap: {0: '正常', 1: '冻结'}
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
      this.taskOptions.selectionList = selection
    },
    freezeTasks () {
      this.$Modal.confirm({
        title: "警告",
        content: "确认冻结所选任务",
        onOk: () => {
          this.taskOptions.selectionList.forEach(element => {
            this.updateTask(element.id, 1)
          });
        }
      });
    },
    unfreezeTasks () {
      this.$Modal.confirm({
        title: "警告",
        content: "确认解冻所选任务",
        onOk: () => {
          this.taskOptions.selectionList.forEach(element => {
            this.updateTask(element.id, 0)
          });
        }
      });
    },
    updateTask (task_id, task_state) {
      let params = {id: task_id, state: task_state}
      dwhApi.updateTask(params).then(resp => {
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
    showUpdateTask () {
      if (this.taskOptions.selectionList.length > 0) {
        let item = this.taskOptions.selectionList[0]
        this.$router.push(
          {
            path: `/dwh/task/schedule/${item.id}/update`, 
            query: {name: item.name}
          }
        )
      }
    },
    getTasks (params) {
      dwhApi.getTasks(params).then(resp => {
        this.taskOptions.data = resp.data.data.tasks || []
        this.taskOptions.data.forEach(item=>{
          item.update_time = formatDate(new Date(item.update_time * 1000), "yyyy-MM-dd hh:mm:ss")
          item.type = this.taskOptions.typeMap[item.type]
          item.state = this.taskOptions.stateMap[item.state]
        });
        this.taskOptions.dataLen = resp.data.data.total || 0
      })
    },
    refreshPage () {
      let params = {page: this.taskOptions.currentPage - 1, size: this.taskOptions.pageSize} 
      const filters = this.genParams(this.options)
      _.extend(params, filters)
      this.getTasks(params)
    },
    applySearch (options) {
      this.searchKey = this.searchInput
      this.taskOptions.currentPage = 1
      this.refreshPage()
    },
    onPageChange (currentPage) {
      this.searchInput = this.searchKey
      this.taskOptions.currentPage = currentPage
      this.refreshPage()
    },
    onPageSizeChange (size) {
      this.searchInput = this.searchKey
      this.taskOptions.pageSize = size
      this.refreshPage()
    },
    genParams (options) {
      var queryList = []
      if (this.searchKey) {
        var item = 'name:' + this.searchKey
        queryList.push(item)
      }
      if (this.taskType != '0') {
        var item = 'type:' + this.taskType
        queryList.push(item)
      }
      if (this.frozenChecked == true) {
        var item = 'state:1'
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
