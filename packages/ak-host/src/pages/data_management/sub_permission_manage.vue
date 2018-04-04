<template>
  <div>
    <div class="category">
      <ButtonGroup>
        <Button :type="isActive(item)" v-for="item in subTabs.tabs" :key="item.name" @click="setActiveMenu(item)">
          <i class="fa fa-server"></i>
          {{item.text}}
        </Button>
      </ButtonGroup>
    </div>
    <div class="content">
      <Card dis-hover>
        <p slot="title">搜索数据</p>
        <a slot="extra" @click="refreshPage">刷新</a>
        <div class="app-search">
          <Row>
            <i-input v-model="searchInput" icon="android-search" placeholder="请输入..." style="width: 500px" @on-enter="applySearch"></i-input>
            <Button type="primary" @click="applySearch" class="margin-left-5">搜索</Button>
            <Button type="primary" @click="sub_apply" class="pull-right">申请订阅权限</Button>
          </Row>
        </div>

        <Table :columns="currentOptions.columns" :data="currentOptions.data"></Table>
        <div class="margin-5">
            <Page :total="currentOptions.dataLen" :current.sync="currentOptions.currentPage"
                  :page-size="currentOptions.pageSize"
                  @on-change="onPageChange" @on-page-size-change="onPageSizeChange"
                  placement="top" show-sizer show-total></Page>
        </div>
      </Card>
    </div>
    <div class="popup">
      <router-view :key="$router.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import dwhApi from "@/requests/dwh.http";
import richForm from "@/components/rich-form";
import { formatDate } from "../../utils/tool";
export default {
  components: { richForm },
  data() {
   // console.log(this.$store.state);
    const   getUser =  ()=> {
         if(this.$store.state.auth){
            if(this.$store.state.auth.user){
              return this.$store.state.auth.user.UserName ;
            }
         }
         return "";
    }

    return {
      searchInput: '',
      searchKey: '',
      myAutidOptions: {
        columns: [
          { key: "id", title: "单号", width: "80px" },
          { key: "source_name", title: "数据源" },
          { key: "table_name", title: "表名" },
          { key: "type_str", title: "类型" },          
          { key: "create_time", title: "申请时间", width: "150px" },
          { key: "proxy", title: "代申请" },
          { key: "apply_user_cnname", title: "申请人" },
          { key: "auth_user_name", title: "授权账号" },
          { key: "level", title: "权限级别" },
          {
            key: "action",
            title: "申请原因",
            align: "center",
            width: "100px",
            render: (h, params) => {
              let actionButton = [
                h('Button',
                  {
                    props: { type: 'primary', size: 'small' },
                    style: { marginRight: '5px', },
                    on: { click: () => {
                        this.showRemarkDetail(params.row.remark)
                      }
                    }
                  }, '查看' 
                )
              ];
              return h("div", actionButton);
            }
          },
          {
            key: "action",
            title: "操作",
            align: "center",
            width: "100px",
            render: (h, params) => {
              let actionButton = [
                h("router-link",
                  { props: { to: { path: "/dwh/sub/permission/manage/" + params.row.id + "/auth", query: params.row} } },
                  [ h( "Button", { props: { type: "primary", size: "small" }, style: { marginRight: "5px" } }, "处理" ) ]
                )
              ];
              return h("div", actionButton);
            }
          }
        ],
        data: [],
        dataLen: 10,
        currentPage: 1,
        pageSize: 10,
      },
      revokeOptions: {
        columns: [
          { key: "id", title: "单号", width: "80px" },
          { key: "source_name", title: "数据源" },
          { key: "table_name", title: "表名" },
          { key: "type_str", title: "类型" },          
          { key: "create_time", title: "申请时间", width: "150px" },
          { key: "name", title: "订阅名" }, // 订阅名规则
          { key: "auth_user_name", title: "授权账号" },
          { key: "level", title: "权限级别" },
          {
            key: "action",
            title: "申请原因",
            align: "center",
            width: "100px",
            render: (h, params) => {
              let actionButton = [
                h('Button',
                  {
                    props: { type: 'primary', size: 'small' },
                    style: { marginRight: '5px', },
                    on: { click: () => {
                        this.showRemarkDetail(params.row.remark)
                      }
                    }
                  }, '查看' 
                )
              ];
              return h("div", actionButton);
            }
          },
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
                        this.revokePermission(params.row.id)
                      }
                    }
                  }, '处理' 
                )
              ];
              return h("div", actionButton);
            }
          }
        ],
        data: [],
        dataLen: 10,
        currentPage: 1,
        pageSize: 10,
      },
      myApplyOptions: {
        columns: [
          { key: "id", title: "单号", width: "80px" },
          { key: "source_name", title: "数据源" },
          { key: "table_name", title: "表名" },
          { key: "type_str", title: "类型" },          
          { key: "create_time", title: "申请时间", width: '150px' },
          { key: "name", title: "订阅名" },
          { key: "auth_user_name", title: "授权账号" },
          { key: "level", title: "权限级别" },
          { key: "state", title: "处理结果" },
          {
            key: "action",
            title: "操作",
            align: "center",
            width: "200px",
            render: (h, params) => {
              let actionButton = [
                h("router-link",
                  { props: { to: "/dwh/sub/" + params.row.id + "/detail" } },
                  [ h( "Button", { props: { type: "primary", size: "small" }, style: { marginRight: "5px" } }, "查看" ) ]
                ),
              ];
              return h("div", actionButton);
            }
          }
        ],
        data: [],
        dataLen: 10,
        currentPage: 1,
        pageSize: 10,
      },
      typeMap: { 1: '实时', 2: '离线' },
      proxyMap: { 0: '否', 1: '是' },
      levelMap: { 1: '表级别', 2: '数据源级别' },
      stateMap: { '-1': '拒绝', 0: '未处理', 1: '正常', 2: '冻结'},
      currentOptions: {},
      tabQuery: "owner_name:" + getUser()+ ",state:0",
      subTabs: {
        current: "my_audit",
        tabs: [
          { name: "my_audit", text: "待我审批" },
          { name: "revoke", text: "权限回收" },
          { name: "my_apply", text: "我的申请" },
        ]
      },
    };
  },
  methods: {
    goto(no) {
      this.$router.push(`/ecs/device/${no}`); // todo
    },
    getSubscriptions (params) {
      dwhApi.getSubscriptions(params).then(resp => {
        this.currentOptions.data = resp.data.data.subscription || [];
        this.currentOptions.data.forEach(item => {
          item.name = 'RT' + item.id
          item.type_str = this.typeMap[item.type]
          item.proxy = this.proxyMap[item.proxy]
          item.level = this.levelMap[item.level]
          item.state = this.stateMap[item.state]
          item.create_time = formatDate(new Date(item.create_time * 1000), "yyyy-MM-dd hh:mm:ss")
        });
        this.currentOptions.dataLen = resp.data.data.total || 0;
      });
    },
    refreshPage () {
      let params = {page: this.currentOptions.currentPage - 1, size: this.currentOptions.pageSize} 
      const filters = this.genParams()
      _.extend(params, filters)
      this.getSubscriptions(params)
    },
    applySearch () {
      this.searchKey = this.searchInput
      this.currentOptions.currentPage = 1
      this.refreshPage()
    },
    onPageChange (currentPage) {
      this.searchInput = this.searchKey
      this.currentOptions.currentPage = currentPage
      this.refreshPage()
    },
    onPageSizeChange (size) {
      this.searchInput = this.searchKey
      this.currentOptions.pageSize = size
      this.refreshPage()
    },
    genParams () {
      var queryList = []
      if (this.searchKey) {
        var item = 'table_name:' + this.searchKey // 后续支持数据源搜索
        queryList.push(item)
      }
      if (this.tabQuery != '') {
        queryList.push(this.tabQuery)
      }
      var params = {}
      var query = queryList.join(',')
      if (query !== '') {
        params['query'] = query
      }
      return params
    },
    setActiveMenu(item) {
      let myNameQuery = "owner_name:" + this.$store.state.auth.user.UserName
      let requestMap = {
        my_audit: { options: this.myAutidOptions, query: myNameQuery + ",state:0" },
        revoke: { options: this.revokeOptions, query: "state:1" },
        my_apply: { options: this.myApplyOptions, query: "apply_user_name:" + this.$store.state.auth.user.UserName },
      };
      this.tabQuery = requestMap[item.name].query
      this.currentOptions = requestMap[item.name].options
      this.subTabs.current = item.name;
      this.currentOptions.currentPage = 1;
      this.currentOptions.pageSize = 10;
      this.refreshPage();
    },
    isActive(item) {
      return item.name === this.subTabs.current ? "primary" : "ghost";
    },
    showRemarkDetail(remark) {
      this.$Modal.info({
        title: '申请原因',
        content: remark,
        onOk: () => {
        }
      })
    },
    revokePermission(id) {
      this.$Modal.confirm({
        title: '警告',
        content: '您确定回收权限?',
        onOk: () => {
          dwhApi.updateSubscription({id: id, state: -1}).then(resp => {
            let error = resp.data.error
            if (error == 0) {
             this.$Message.info({
               content: '操作成功!', onClose: () => {
                 this.refreshPage();
               }, duration: 2, closable: false
             });
            } else {
              this.$Message.error({
               content: '操作出错! ' + error, onClose: () => {
               }, duration: 2, closable: false
              });
            }
          })
        }
      })
    },
    sub_apply () {
      this.$router.push({name: 'dwh.sub.permission.manage.apply'})
    },
  },
  mounted() {
    this.currentOptions = this.myAutidOptions
    this.refreshPage()
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage()
    next()
  }
};
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
