<template>
    <div class="wrapper wrapper-content">
       
            
            <div class="ivu-form ivu-form-label-right">
              
                  
                    <Card  :bordered="false">
                        <p slot="title">基础信息</p>
                        <div >
                          
                            <Row >
                                 <col-place  :isRequire="1" ColName="name"   :onChange="colChange" :isError="errorSign.name" :val="frmCluster.name" displayName="名称"       ControlType="text"  ErrorMesg="名称不能为空" />
                                
                            </Row>
                            <Row >
                                  <col-place   ColName="cnname"  :isRequire="0"  :onChange="colChange"  :isError="errorSign.cnname" :val="frmCluster.cnname" displayName="中文名"    ErrorMesg="机房不能为空" />
                            </Row>
                            <Row >
                                 <col-place  :isRequire="0" ColName="idcName"   :onChange="colChange" :isError="errorSign.idcName" :val="frmCluster.idcName" displayName="所在机房"   Url="/dwh/rooms/"    ControlType="radio"  ErrorMesg="名称不能为空" />
                                
                            </Row>
                        </div>
                    </Card>
                  <br/>
                    <Card :bordered="false">
                        <p slot="title">Kafka Settings</p>
                        <div >
                            <Row :gutter="16">

                               <col-place    ColName="brokers"   :onChange="colChange"  :isError="errorSign.brokers" :isRequire="0"  :val="frmCluster.brokers" displayName="brokers"  ControlType="configList"  ErrorMesg="brokers不能为空" />                               
                            </Row>
                            <br/>
                            <Row :gutter="16">
                                <col-place  ColName="zookeeper"   :onChange="colChange"    :isError="errorSign.zookeeper"  :isRequire="0" :val="frmCluster.zookeeper" displayName="zookeeper"  ControlType="configList"  ErrorMesg="zookeeper不能为空" />                               
                            </Row>
                        </div>
                    </Card>
                    <br/>
                    <Card :bordered="false">
                        <p slot="title">Schema Registry</p>
                        <div >
                             <Row :gutter="16">
                                <col-place   ColName="schemaRegistry"   :onChange="colChange"     :isError="errorSign.schemaRegistry"  :isRequire="0"  :val="frmCluster.schemaRegistry" displayName="repositories"  ControlType="configList"  ErrorMesg="repositories不能为空" />                               
                            </Row>
                            
                        </div>
                    </Card>
                     <br/>
                    <Card :bordered="false">
                        <p slot="title">Kafka connector</p>
                        <div >
                             <Row :gutter="16">
                                <col-place    ColName="connectors"   :onChange="colChange"      :isError="errorSign.connectors"  :isRequire="0"  :val="frmCluster.connectors" displayName="connectors"  ControlType="configList"  ErrorMesg="connectors不能为空" />                               
                            </Row>
                          
                        </div>
                    </Card>
                     <br/>
                    <Card :bordered="false">
                       <p slot="title"> Hadoop</p>
                        <div >
                              <Row :gutter="16">
                                <col-place    ColName="nameNode"   :onChange="colChange"    :isError="errorSign.nameNode"  :isRequire="0"  :val="frmCluster.nameNode" displayName="nameNode"  ControlType="configList"  ErrorMesg="nameNode不能为空" />                               
                            </Row>
                           
                        </div>
                    </Card>
                     <br/>
                    <Card :bordered="false">
                        <p slot="title">其它配置(可选)</p>
                        <div >
                            <Row :gutter="16">
                                <iCol :offset="4" span="16">
                                    
                                        <Input type="textarea" :rows="5" 
                                               v-model="frmCluster.extra"/>
                                   
                                </iCol>
                            </Row>
                        </div>
                    </Card>
               
                <div style="text-align: center;margin-top: 10px;">
                    <Button type="primary"  @click="saveCluster">保存</Button>
                    
                </div>
            </div>
            
       
    </div>
</template>

<script>
  import dwhApi from '@/requests/dwh.http'
  import Panel from '../../../node_modules/iview/src/components/collapse/panel.vue'
  import {InputTag} from 'comp'
  //import ColPlace from './col';
  import  *  as controller from './../../controller/dwh'
import {core } from "sys"
  import  * as dwhcore from "./../../requests/dwh.core";
  //import  * as core from './../../requests/core'

  export default {
    components: {
        Panel,
        //"input-tag":InputTag,
        "col-place":ColPlace
        },
    data () {
      return {
        locker: {
          locked: true,
          clazz: 'fa fa-2x fa-lock',
          message: '解锁'
        },
        errorSign:{
           name: 0,
        //   idcName: 0,
        //   brokers: 0,
        //   zookeeper: 0,
        //   schemaRegistry: 0,
        //   connectors:0,
        //   nameNode: 0,
        },
        frmCluster: {
          name: '',
          cnname:'',
          idcName: '',
          brokers: [],
          zookeeper: [],
          schemaRegistry: [],
          connectors:[],
          nameNode: [],
          extra: ''
        },
        frmClusterRules: {},
        clusterInfo: ['basic', 'kafka', 'schema', 'connector', 'hadoop']
      }
    },
    methods: {
     tagchange(a){
      let g = this ;
      //debugger ;
     },
     colChange(col,val){
           //alert(col.ColName+ "  ==  " + val );
           //同步数据
         // debugger;
           const _name = col.ColName ;
           this.frmCluster[_name] = val ;
           if( _name in   this.errorSign){
               if(!val||val.length == 0 ){
                this.errorSign[_name] = 1 ;
                return true ;
               }
               else{
                    this.errorSign[_name] = 0 ;
                    return false ;
               }


           }

     },

     checkCol(){
          //-----
          //debugger ;
          let _isError = false ;
          for(const _colName in this.errorSign){
             _isError =  this.colChange({ColName : _colName},this.frmCluster[_colName]);
          }
          return _isError ;
     },

     
      saveCluster () {

         const _isError =  this.checkCol();
        // alert(JSON.stringify(this.frmCluster));
         if(!_isError){
             controller.newCluster(this.frmCluster).then((a)=>{

             //alert(JSON.stringify(a));
             dwhcore.setOrg({
               id:a.id,
               name:a.name,
               cnname:a.cnname

             });

            // const _this:any = this ;
              //alert( core.json(dwhcore.getOrg() ));
             this.$router.push({name:"dwh.table.search"});
         })
           // dwhApi.saveCluster(this.frmCluster)
         }
         else
             core.notify("页面数据输入有问题，请检查！"); 
         
      }
    },
    mounted () {
    //   dwhApi.getCluster({'id': this.$store.getters.current}).then(resp => {
    //     let cluster = resp.data.data.cluster
    //     if (!cluster) {
    //       this.toggleLock()
    //     } else {
    //       this.frmCluster.name = cluster.name
    //     }
    //   })
    }
  }
</script>
<style >
    .col-label {
        text-align: right;
    }
    
</style>
<style >
   .acs-require-lable:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #f30;
}
    .vue-input-tag-wrapper.acs-tag .new-tag{
        width: 100% ;
    }
    .ivu-form-item-error-tip {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 6px;
    color: #f30;
}
.ivu-form-item-error .ivu-input{
    border: 1px solid #f30;
}
</style>