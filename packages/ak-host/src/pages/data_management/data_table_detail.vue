<template>
  <div>
    <div class="content">
      <Card dis-hover>
        <p slot="title">{{ this.basicInfo.name }}</p>
        <Button slot="extra" type="primary" @click="beginApply()">申请订阅授权</Button>
        <Button slot="extra" type="ghost" @click="goback()" style="margin-left: 10px">返回所有列表</Button>
        <div class="app-search">
          <Row>
            <Col span="12">
              <Row><h3 style="margin-bottom: 10px;">表基本信息</h3></Row>
              <Row>
                <i-col span=8>表名：</i-col>
                <i-col>{{ this.basicInfo.name }}</i-col>
              </Row>
              <Row>
                <i-col span=8>中文名：</i-col>
                <i-col>{{ this.basicInfo.cnname }}</i-col>
              </Row>
              <Row>
                <i-col span=8>责任人：</i-col>
                <i-col>{{ this.basicInfo.owner_cnname }}</i-col>
              </Row>
              <Row>
                <i-col span=8>描述：</i-col>
                <i-col>{{ this.basicInfo.description }}</i-col>
              </Row>
              <Row>
                <i-col span=8>权限状态：</i-col>
                <i-col>{{ this.basicInfo.permission }}</i-col>
              </Row>
              <Row>
                <i-col span=8>数据源：</i-col>
                <i-col>{{ this.basicInfo.source_name }}</i-col>
              </Row>
              <Row>
                <i-col span=8>订阅数：</i-col>
                <i-col>{{ this.basicInfo.realtime_sub_count + this.basicInfo.offline_sub_count }}</i-col>
              </Row>
              <Row>
                <i-col span=8>数据级别：</i-col>
                <i-col>{{ this.basicInfo.level }}</i-col>
              </Row>
              <Row><h3 style="margin-top:30px;margin-bottom:10px">表存储信息</h3></Row>
              <Row>
                <i-col span=8>物理存储量：</i-col>
                <i-col>0</i-col>
              </Row>
              <Row>
                <i-col span=8>生命周期：</i-col>
                <i-col>{{ this.basicInfo.lifetime }}天</i-col>
              </Row>
              <Row>
                <i-col span=8>是否分区表：</i-col>
                <i-col>{{ this.basicInfo.part }}</i-col>
              </Row>
              <Row>
                <i-col span=8>表创建时间：</i-col>
                <i-col>{{ this.basicInfo.create_time }}</i-col>
              </Row>
              <Row>
                <i-col span=8>DDL最后变更时间：</i-col>
                <i-col>0</i-col>
              </Row>
              <Row>
                <i-col span=8>数据最后变更时间：</i-col>
                <i-col>0</i-col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Tabs type="card" :animated="false" v-model="currentTab">
                  <TabPane label="字段信息" name="field_info">
                    <Row><h3 style="margin-bottom:10px;">非分区字段</h3></Row>
                    <Table ref="$table1" :columns="schema1Options.columns" :data="schema1Options.data" border=""></Table>
                    <Row><h3 style="margin-top:30px;margin-bottom:10px;">分区字段</h3></Row>
                    <Table ref="$table2" :columns="schema2Options.columns" :data="schema2Options.data" border=""></Table>
                  </TabPane>
                  <TabPane label="分区信息" name="partition_info">
                    <Table ref="$table3" :columns="partitionOptions.columns" :data="partitionOptions.data" border=""></Table>
                  </TabPane>
                  <TabPane label="变更历史" name="change_history">
                    <Table ref="$table4" :columns="historyOptions.columns" :data="historyOptions.data" border=""></Table>
                  </TabPane>
                  <TabPane label="血缘关系" name="blood_relation">
                    <Row>
                      todo: 血缘关系
                    </Row>
                  </TabPane>
                  <TabPane label="数据预览" name="data_overview">
                    <Row>
                      todo: 数据预览
                    </Row>
                  </TabPane>
                </Tabs>
              </Row>
            </Col>
          </Row>
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
import constant from "../../utils/constant";
export default {
  components: { richForm },
  data() {
    return {
      basicInfo: {

      },
      storeInfo: {

      },
      schema1Options: {
          columns: [
              {key: 'id', title: '序号'},
              {key: 'name', title: '字段英文名'},
              {key: 'type', title: '类型'},
              {key: 'description', title: '描述'},
          ],
          data: [
              {id: 1, name: 'name', type: 'STRING', description: 'test description'}
          ]
      },
      schema2Options: {
          columns: [
              {key: 'id', title: '序号'},
              {key: 'name', title: '字段英文名'},
              {key: 'type', title: '类型'},
              {key: 'description', title: '描述'},
          ],
          data: []
      },
      partitionOptions: {
          columns: [
              {key: 'name', title: '分区名'},
              {key: 'create_time', title: '创建时间'},
              {key: 'storage', title: '存储量'},
              {key: 'record_count', title: '记录数'},
          ],
          data: []
      },
      historyOptions: {
          columns: [
              {key: 'content', title: '内容'},
              {key: 'granularity', title: '粒度'},
              {key: 'create_time', title: '时间'},
          ],
          data: []
      },
      currentTab: 'field_info',
    };
  },
  methods: {
    goto(no) {
      this.$router.push(`/ecs/device/${no}`); // todo
    },
    getDataTable (params) {
      dwhApi.getDataTable(params).then(resp => {
        this.basicInfo = resp.data.data || {};
        this.basicInfo.permission = constant.permissionMap[this.basicInfo.permission]
        this.basicInfo.level = constant.dataLevelMap[this.basicInfo.level]
        this.basicInfo.create_time = formatDate(new Date(this.basicInfo.create_time * 1000), "yyyy-MM-dd hh:mm:ss")
      });
    },
    beginApply() {
      this.$router.push({path: '/dwh/table/' + this.basicInfo.id + '/detail/apply', 
                         query: {name: this.basicInfo.name, source_name: this.basicInfo.source_name}})
    },
    goback() {
      this.$router.go(-1)
    },
  },
  mounted() {
    this.basicInfo.id = this.$route.params.id || 0;
    this.getDataTable(this.basicInfo)
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
