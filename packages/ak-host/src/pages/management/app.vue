<template>
    <div class="overview">
        <div class="wrapper wrapper-content">
          <Modal 
        
        v-if="NewClusterModal.HasExist"
        v-model="NewClusterModal.IsShow"
        :styles="{top: '5px'}"
        scrollable=“true”
        title="新增集群"
        width="750px"
        >
        <template v-if="NewClusterModal.IsShow">
        <culter-new >
        </culter-new>
        </template>

        <div slot="footer">
        </div>
    </Modal>
   
          <Row :gutter="5">
                    <iCol   :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}" v-for="(item,i) in dashItems" :key="item.name">
                        <infor-card
                            :id-name="'inforCard'+i"                                                   
                            :AwsomeIconType="item.icon"
                            color="#64d572"
                            :intro-text="item.name"
                            :TextStr="typeof(item.count) == 'number' ? '':item.count "
                            :endVal="typeof(item.count) == 'number' ? item.count:0"
                            :countSize="typeof(item.count) == 'number' ? '2.5rem':'1rem'"
                        ></infor-card>
                    </iCol>
            </Row>
            <div style="margin-top: 18px;">
                <Card>
                    <p slot="title">
                        <Icon type="cube"></Icon>
                        集群列表
                          
                    </p>
                   
                   <Button-group size="small" shape="circle"  slot="extra">
                          <i-button icon="android-add" @click.prevent="newCluster">新增</i-button>
                          <i-button type="primary" icon="refresh" @click.prevent="refreshClusters">刷新</i-button>
                    </Button-group>
                    
                   
                   
                    <Table stripe border :columns="clusters.columns" :data="clusters.data"></Table>
                    
                </Card>
            </div>
            <div style="margin-top: 18px;">
                <Row :gutter="16">
                    <iCol span="12">
                        <Card>
                            <p slot="title">
                                <i class="fa fa-table"></i>
                                大表（Top5）
                            </p>
                           
                             <Button-group size="small" shape="circle"  slot="extra">
                         
                          <i-button  icon="refresh" @click.prevent="refreshBigTables">刷新</i-button>
                    </Button-group>
                            <Table stripe border :columns="bigTables.columns" :data="bigTables.data"></Table>
                        </Card>
                    </iCol>
                    <iCol span="12">
                        <Card>
                            <p slot="title">
                                <Icon type="fireball"></Icon>
                                热表（Top5）
                            </p>
                            
                             <Button-group size="small" shape="circle"  slot="extra">
                         
                          <i-button  icon="refresh" @click.prevent="refreshHotTables">刷新</i-button>
                    </Button-group>
                            <Table stripe border :columns="hotTables.columns" :data="hotTables.data"></Table>
                        </Card>
                    </iCol>
                </Row>
            </div>
        </div>
        <Modal 
        v-if="DetailClusterModal.HasExist"
        v-model="DetailClusterModal.IsShow"
        scrollable=“true”
        :key="model1"
        :title="DetailClusterModal.Title"
        width="80%"
        >

        <culter-search></culter-search>
        <div slot="footer">
        </div>
    </Modal>
     <Modal 
         
        v-if="ManageClusterModal.HasExist"
        v-model="ManageClusterModal.IsShow"

        scrollable=“true”
        :title="ManageClusterModal.Title"
        :styles="{top: '5px'}"
        
        width="85%"
        >

        <culter-manage></culter-manage>
        <div slot="footer">
        </div>
    </Modal>
     
    </div>
   
</template>

<script>
  import dwhApi from './../../requests/dwh.http'
  import inforCard from './../../views/home/components/inforCard.vue';
  import * as  appMock from './../../mock/management/app';
  import * as baseMock from './../../mock/base';
  
  import { axios } from './../../requests/dwh.base';

  import * as dwhController from "./../../controller/dwh";
  //import  * as domFile from './../../requests/dom'
  import  * as dwhcore from "./../../requests/dwh.core";
  import {core ,dom} from "ak-lib-sys"
  import   asyncvue  from './asyncvue'

  

  export default {
     components: {
       inforCard,
       //resolve => require(['@/pages/management/app.vue'], resolve)
       "culter-search":asyncvue.culterSearch,
       "culter-manage":asyncvue.culterManage,
       "culter-new": asyncvue.culterNew
     },
    data () {
      return {
         ManageClusterModal_show :false ,
         ManageClusterModal_exist:false ,
         ManageClusterModal:{
             HasExist :false ,
             IsShow :false,
             Title :""
         },
         DetailClusterModal:{
             HasExist :false ,
             IsShow :false,
             Title :""
         }
         ,
         NewClusterModal:{
             HasExist :false ,
             IsShow :false,
             Title :""
         },
  
       
        

        isData :false ,
        dashItems: [
          {name: '集群总数', count: 2, icon: 'fa-cube', bg: 'navy-bg'},
          {name: '数据源总数', count: 4, icon: 'fa-database', bg: 'blue-bg'},
          {name: '数据表总数', count: 6, icon: 'fa-table', bg: 'lazur-bg'},
          {name: '已用/存储', count: '120/600', icon: 'fa-server', bg: 'yellow-bg'}
        ],
        clusters: {
          // pager
          pageSize: 5,
          page: 1,
          total: 10,
          columns: [
            {'title': '名称', 'key': 'cnname'},
            {'title': '所在机房', 'key': 'idc'},
            {'title': '服务器数', 'key': 'machines'},
            {'title': '存储容量', 'key': 'storage'},
            {'title': '已用存储容量', 'key': 'usedStorage', 'sortable': true},
            {
              'title': '操作',
              'key': 'action',
              'render': (h, params) => {
                let actionButtons = [
                  h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      on: {
                        'click': (a,b) => {
                         //debugger;
                         dwhcore.setOrg({
                           id:params.row.id,
                           name:params.row.name,
                           cnname:params.row.cnname
                         });
                         const _this = this ;
                         //alert( core.json(dwhcore.getOrg() ));
                        _this.$router.push({path:"/listpage/search_tables"});
                        }
                      }
                    },
                    '进入'
                  ),
                  
                ]
                return h('div', actionButtons)
              }
            }
          ],
          data: []
        },
        bigTables: {
          columns: [
            {'title': '表名', 'key': 'tableName'},
            {'title': '容量', 'key': 'tableSize'}
          ],
          data: []
        },
        hotTables: {
          columns: [
            {'title': '表名', 'key': 'tableName'},
            {'title': '热度', 'key': 'hot'}
          ],
          data: []
        }
      }
    },
    methods: {
      
      newCluster(){
         const _this = this ;
           _this.NewClusterModal.HasExist =_this.NewClusterModal.IsShow =true ;
           //this.modelTitle = params.row.name +"  详细信息";
      },

      modelTriggle(){
          console.log(arguments);
      },

      getSummaryInfo (params) {
        return dwhApi.getSummaryInfo(params).then(resp => {

          return resp.data.data
        })
      },
      getClusters (params) {
        //dwhApi.getClusters()
        // return dwhApi.getClusters(params).then(resp => {
        //   return resp.data.data
        // })
      },
      getBigTables (params) {
        // dwhApi.getBigTables(params).then(resp => {
        //   this.bigTables.data = resp.data.data.tables
        // })
      },
      getHotTables (params) {
        // dwhApi.getHotTables(params).then(resp => {
        //   this.hotTables.data = resp.data.data.tables
        // })
      },
      changePage (page) {
        // let params = {'start': page - 1, 'size': this.clusters.pageSize}
        // return this.getClusters(params)
      },
      refreshClusters (params) {
 const _this = this ;
       _this.asyncLoadData("asycGetClusters");

       // return this.getClusters(params)
      },
      refreshBigTables () {
         const _this = this ;
        _this.asyncLoadData("asyGetBigTable");
      },
      refreshHotTables () {
         const _this = this ;
         _this.asyncLoadData("asyGetHotTable");
      },
      
      asyncLoadData(sign = "getAppData" ){

      dwhController[sign]().then((a)=>{
           const _this = this ;
         _this.loadData(a,sign);

       });

      },

      loadData(appData,sign="getAppData"){
         const _this = this ;
        if(sign== "getAppData"){
          const resp = appData.SummaryInfo;
           const _this = this ;
          _this.dashItems[0].count = resp.culterCount
          _this.dashItems[1].count = resp.sourceCount
          _this.dashItems[2].count = resp.tableCount
          _this.dashItems[3].count = [bytesToSize(resp.usedStorageSize), bytesToSize(resp.storageSize)].join('/');
          _this.isData = true ;
        }

        if(sign == "getAppData" || sign == "asycGetClusters"){
        
          const _clusters = appData.clusters;
          _this.clusters.page = _clusters.pager.PageIndex + 1 ;
          _this.dashItems[0].count = 
          _this.clusters.total = _clusters.pager.TotalCount;
          //this.clusters.machines = _clusters
          _this.clusters.data = _clusters.data ;
        }
        
        
        if(sign == "getAppData" || sign == "asyGetBigTable"){
          _this.bigTables.data = appData.bigTables;
        }
        if(sign == "getAppData"|| sign == "asyGetHotTable"){
          _this.hotTables.data = appData.hotTables ;
        }
        
      }
    },
    mounted () {
         
       // const appData = appMock.getApp();
 const _this = this ;
       _this.asyncLoadData();
     
    }
  }

  function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
 
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
</script>

<style scoped>
    .overview {
        margin-left: 10px;
    }

    .text-right {
        text-align: right;
    }

    .text-center {
        text-align: center;
    }
</style>
