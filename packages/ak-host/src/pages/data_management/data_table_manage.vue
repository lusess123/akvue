<template>
  <div>
    <div class="category">
      <ButtonGroup>
        <Button :type="isActive(item)" v-for="item in dataTableTabs.tabs" :key="item.name" @click="setActiveMenu(item)">
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
            <Button type="primary" @click="addDataTable" class="pull-right"><Icon type="plus"></Icon> 新建表</Button>
          </Row>
        </div>

        <Table :columns="tableOptions.columns" :data="tableOptions.data"></Table>
        <div class="margin-5">
            <Page :total="tableOptions.dataLen" :current.sync="tableOptions.currentPage"
                  :page-size="tableOptions.pageSize"
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
    return {
      searchInput: '',
      searchKey: '',
      tableOptions: {
        columns: [
          { key: "name", title: "表名" },
          { key: "source_name", title: "数据源" },
          { key: "create_time", title: "创建时间" },
          { key: "storage", title: "物理存储" },
          { key: "lifetime", title: "生命周期" },
          { key: "realtime_sub_count", title: "实时订阅" },
          { key: "offline_sub_count", title: "离线订阅" },
          {
            key: "action",
            title: "操作",
            align: "center",
            width: "180px",
            render: (h, params) => {
              let actionButton = [
                h('router-link',
                  {
                    props: {
                      to: {'path': '/dwh/table/manage/' + params.row.id + '/edit',
                        'query': params.row }
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
                      '管理'
                    )
                  ]
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.deleteDataTable(params.row.id);
                      }
                    }
                  },
                  "删除"
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
      queryApi: dwhApi.getDataTables,
      tabQuery: '',
      dataTableTabs: {
        current: "recent",
        tabs: [
          { name: "recent", text: "我近期操作的表" }, // todo:服务端加memcache支持
          { name: "persional", text: "个人账号的表" },
          { name: "prod", text: "生产账号的表" },
          { name: "owned", text: "我管理的表" } // 权限接入
        ]
      },
    };
  },
  methods: {
    goto(no) {
      this.$router.push(`/ecs/device/${no}`); // todo
    },
    getDataTables (params) {
      this.queryApi(params).then(resp => {
        this.tableOptions.data = resp.data.data.tables || [];
        this.tableOptions.data.forEach(item => {
          item.create_time = formatDate(new Date(item.create_time * 1000), "yyyy-MM-dd hh:mm:ss")
        });
        this.tableOptions.dataLen = resp.data.data.total || 0;
      });
    },
    refreshPage () {
      let params = {page: this.tableOptions.currentPage - 1, size: this.tableOptions.pageSize} 
      const filters = this.genParams()
      _.extend(params, filters)
      this.getDataTables(params)
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
    genParams () {
      var queryList = []
      if (this.searchKey) {
        var item = 'name:' + this.searchKey
        queryList.push(item)
      }
      if (this.tabQuery) {
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
        recent: { api: dwhApi.getDataTables, query: "" },
        persional: { api: dwhApi.getDataTables, query: myNameQuery + ",type:1" }, //目前新建表没有选择类型的入口
        prod: { api: dwhApi.getDataTables, query: myNameQuery + ",type:2" },
        owned: { api: dwhApi.getDataTables, query: myNameQuery}
      };
      this.queryApi = requestMap[item.name].api
      this.tabQuery = requestMap[item.name].query
      this.dataTableTabs.current = item.name;
      this.tableOptions.currentPage = 1;
      this.tableOptions.pageSize = 10;
      this.refreshPage();
    },
    isActive(item) {
      return item.name === this.dataTableTabs.current ? "primary" : "ghost";
    },
    addDataTable() {
      this.$router.push({ name: "dwh.table.add" });
    },
    deleteDataTable(no) {
      this.$Modal.confirm({
        title: "警告",
        content: "您确定删除该数据表",
        onOk: () => {
          dwhApi.deleteDataTable({ id: no }).then(resp => {
            this.$Message.info({
              content: "删除数据表成功!",
              onClose: () => {
                this.refreshPage();
              },
              duration: 2,
              closable: false
            });
          });
        }
      });
    }
  },
  mounted() {
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
