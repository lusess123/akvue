<template>
    <div>
        <Modal v-model="showing" @on-cancel="closeAdd" width="900px">
            <div class="device detail">
                <Tabs type="card" :animated="false" v-model="currentTab">
                    <TabPane label="按数据源申请" name="apply_source">
                        <div class="app-search">
                            <Row>
                                <i-input v-model="sourceSearchkey" icon="android-search" placeholder="请输入数据源名称" style="width: 500px" @on-enter="getDataSources"></i-input>
                                <Button type="primary" @click="testFunc" class="margin-left-5">搜索</Button>
                            </Row>
                        </div>
                        <div class="group-section" style="margin-top: 10px">
                            <Table :columns="sourceOption.columns" :data="sourceDetail" width="100%"></Table>
                        </div> 
                    </TabPane>
                    <TabPane label="按表申请" name="apply_table">
                        <div class="app-search">
                            <Row>
                                <i-input v-model="tableSearchKey" icon="android-search" placeholder="请输入数据表名称" style="width: 500px" @on-enter="getDataTables"></i-input>
                                <Button type="primary" @click="getDataTables" class="margin-left-5">搜索</Button>
                            </Row>
                        </div>
                        <div class="group-section" style="margin-top: 10px">
                            <Table :columns="tableOption.columns" :data="tableDetail" width="100%"></Table>
                        </div> 
                    </TabPane>
                </Tabs>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import dwhApi from '@/requests/dwh.http'

export default {
  data () {
    return {
      showing: false,
      currentTab: 'apply_source',
      sourceSearchkey: '',
      tableSearchKey: '',
      sourceOption: {
        columns: [
          { key: 'name', title: '数据源名称' },
          { key: 'type', title: '数据源类型' },
          { key: 'description', title: '数据源描述' },
          { key: 'creator_cnname', title: '创建人' },
          {
            key: "action",
            title: "操作",
            align: "center",
            width: "100px",
            render: (h, params) => {
              let actionButton = [
                h('Button',
                  {
                    props: { type: 'primary', size: 'small' },
                    style: { marginRight: '5px', },
                    on: { click: () => {
                        this.applySource(params.row)
                      }
                    }
                  }, '申请' 
                )
              ];
              return h("div", actionButton);
            }
          },
        ]
      },
      sourceDetail: [
        {
          name: '',
          type: '',
          description: '',
          creator_cnname: '',
        }
      ],
      tableOption: {
        columns: [
          { key: 'name', title: '数据表名称' },
          { key: 'source_name', title: '数据源名称' },
          { key: 'description', title: '数据表描述' },
          { key: 'owner_cnname', title: '创建人' },
          {
            key: "action",
            title: "操作",
            align: "center",
            width: "100px",
            render: (h, params) => {
              let actionButton = [
                h('Button',
                  {
                    props: { type: 'primary', size: 'small' },
                    style: { marginRight: '5px', },
                    on: { click: () => {
                        this.applyTable(params.row)
                      }
                    }
                  }, '申请' 
                )
              ];
              return h("div", actionButton);
            }
          },
        ]
      },
      tableDetail: [
        {
          name: '',
          source_name: '',
          description: '',
          owner_name: '',
        }
      ],
      subscriptionForm: {
        'table_name': '',
        'source_name': '',
        'level': 1,
        'proxy': 0,
        'apply_user_name': 'yangzhen',
        'apply_user_cnname': '杨震',
        'auth_user_name': 'yangzhen',
        'auth_user_cnname': '杨震',
        'priority': 0,
        'type': 1,
        'expire_time': '30',
        'remark': '',
      },
      typeMap: {1: 'KAFKA', 2: 'mysql', 3: 'HDFS', 4: 'FTP', 5: 'Oracle'}
    }
  },
  methods: {
    closeAdd () {
      setTimeout(() => {
        this.$router.go(-1)
      }, 200)
    },
    testFunc() {
        this.sourceSearchkey = 'abc'
    },
    getDataSources (params) {
      const filters = this.genSourceParams()
      _.extend(params, filters)
      dwhApi.getDataSources(params).then(resp => {
        resp.data.data.sources.forEach(element => {
            element.type = this.typeMap[element.type]
        });
        this.sourceDetail = resp.data.data.sources || []
      })
    },
    getDataTables (params) {
      const filters = this.genTableParams()
      _.extend(params, filters)
      dwhApi.getDataTables(params).then(resp => {
        resp.data.data.tables.forEach(element => {
        });
        this.tableDetail = resp.data.data.tables || []
      })
    },
    genSourceParams () {
      var queryList = []
      if (this.sourceSearchkey) {
        var item = 'name:' + this.sourceSearchkey
        queryList.push(item)
      }
      var params = {}
      var query = queryList.join(',')
      if (query !== '') {
        params['query'] = query
      }
      return params
    },
    genTableParams () {
      var queryList = []
      if (this.tableSearchKey) {
        var item = 'name:' + this.tableSearchKey
        queryList.push(item)
      }
      var params = {}
      var query = queryList.join(',')
      if (query !== '') {
        params['query'] = query
      }
      return params
    },
    applySource(params) {
        this.subscriptionForm.table_name = ''
        this.subscriptionForm.source_name = params.name
        this.subscriptionForm.level = 2
        this.subscriptionForm.remark = '申请数据源' + params.name + '订阅授权'
        this.beginApply(params.name)
    },
    applyTable(params) {
        this.subscriptionForm.table_name = params.name
        this.subscriptionForm.source_name = params.source_name
        this.subscriptionForm.level = 1
        this.subscriptionForm.remark = '申请数据表' + params.name + '订阅授权'
        this.beginApply(params.name)
    },
    beginApply(name) {
      this.$Modal.confirm({
        title: '权限申请',
        content: '确定申请' + name + '订阅权限?',
        onOk: () => {
          const params = this.subscriptionForm;
          dwhApi.createSubscription(params).then(resp => {
              let error = resp.data.error
              if (error == 0) {
                  this.$Message.info({
                      content: '成功，跳转到订阅权限管理界面!', onClose: () => {
                          this.$router.push({path: '/dwh/sub/permission/manage'});
                      }, duration: 2, closable: false
                  });
              } else {
                  this.$Message.error({
                      content: '申请授权出错! ' + error, onClose: () => {
                      }, duration: 2, closable: false
                  });
              }
          });
        }
      })
    }
  },
  computed: {

  },
  mounted () {
    this.showing = true
    this.getDataSources()
    this.getDataTables()
  },
  destroyed () {
    this.showing = false
  }
}
</script>

<style scoped>
.banner1 {
  padding: 4px 0 10px 0;
}

.content {
  padding: 10px;
  border-radius: 2px;
}

.component-content {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 10px;
}

.form-item {
  margin: 6px;
}

.device.detail {
  margin-top: 10px;
}

.device-title {
  background: #dddee1;
  color: #333;
  padding: 5px 10px;
  margin: 1px 0;
  font-size: 12px;
  font-weight: bolder;
}

.device-item {
  background-color: #f7f8fb;
  padding: 5px 10px;
  margin: 1px 0;
  min-height: 31px;
  font-size: 12px;
}

.divide-header {
  font-weight: 500;
  margin: 30px 0 10px;
  position: relative;
}

.divide-header::before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #eee;
  position: absolute;
  top: 10px;
  left: 0;
}

.divide-header span {
  display: inline-block;
  background: #fff;
  padding: 0 5px 0 18px;
  position: relative;
  margin-left: 30px;
  font-size: 14px;
}
</style>
