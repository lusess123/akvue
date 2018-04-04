<template>
  <div>
    <div class="content">
      <Card dis-hover>
        <p slot="title">订阅详情</p>
        <Button slot="extra" type="ghost" @click="goback()" style="margin-left: 10px">返回</Button>
        <div class="app-search">
          <Row>
            <Col span="12">
              <Row><h3 style="margin-bottom: 10px;">基本信息</h3></Row>
              <Row>
                <i-col span=8>订阅名：</i-col>
                <i-col>RT{{ this.basicInfo.id }}</i-col>
              </Row>
              <Row>
                <i-col span=8>订阅者：</i-col>
                <i-col>{{ this.basicInfo.auth_user_cnname }}</i-col>
              </Row>
              <Row>
                <i-col span=8>任务优先级：</i-col>
                <i-col>{{ this.basicInfo.priority }}</i-col>
              </Row>
              <Row>
                <i-col span=8>订阅类型：</i-col>
                <i-col>{{ this.basicInfo.type }}</i-col>
              </Row>
              <Row>
                <i-col span=8>订阅状态：</i-col>
                <i-col>{{ this.basicInfo.state }}</i-col>
              </Row>
              <Row>
                <i-col span=8>订阅时间：</i-col>
                <i-col>{{ this.basicInfo.sub_time }}</i-col>
              </Row>
              <Row>
                <i-col span=8>数据源：</i-col>
                <i-col>{{ this.basicInfo.source_name }}</i-col>
              </Row>
              <Row>
                <i-col span=8>表名：</i-col>
                <i-col>{{ this.basicInfo.table_name }}</i-col>
              </Row>
              <Row>
                <i-col span=8>数据级别：</i-col>
                <i-col>{{ this.basicInfo.level }}</i-col>
              </Row>
              <Row>
                <i-col span=8>描述：</i-col>
                <i-col>{{ this.basicInfo.description }}</i-col>
              </Row>
              <Row>
                <i-col span=8>客户端列表：</i-col>
                <i-col>TODO</i-col>
              </Row>
              <Row><h3 style="margin-top:30px;margin-bottom:10px">配置信息</h3></Row>
              <Row>
                <i-input type="textarea" :rows="6" style="width:350px" :value="basicInfo.config" readonly></i-input>
              </Row>
            </Col>
            <Col span="12">
              <Row><h3 style="margin-bottom: 10px;">延迟信息</h3></Row>
              <Row>
                更新频率：
                <Button-group>
                  <i-button v-for="item in intervalOptions.buttons" :key="item.key" size="small" :type="isActive(item.key)" @click="changeInterval(item.key)">{{ item.title }}</i-button>
                </Button-group>
              </Row>
              <Row><h3 style="margin-top:30px;margin-bottom:10px">监控信息</h3></Row>
              <Row>
                <div class="widget style1">
                    <v-echarts :options="delayTrend" :auto-resize="true"></v-echarts>
                </div>
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
import vEcharts from 'vue-echarts'
import _ from "lodash";
import dwhApi from "@/requests/dwh.http";
import richForm from "@/components/rich-form";
import { formatDate } from "../../utils/tool";
import constant from "../../utils/constant";
export default {
  components: { vEcharts },
  data() {
    return {
        intervalOptions: {
          intervalID: 0,
          interval: 5000,
          currentKey: 1,
          buttons: [
            {title: '5秒', value: 5000, key: 1},
            {title: '15秒', value: 15000, key: 2},
            {title: '30秒', value: 30000, key: 3}
          ]
        },
        basicInfo: {
        },
        storeInfo: {
        },
        delayTrend: {
            title: {
                text: '延迟信息',
                top: 0,
                left: '40%'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['入延迟', '出延迟', '虚拟机数量'],
                top: '10%'
            },
            grid: {
                left: '0%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                },
                right: '5%'
            },
            xAxis: {
                type: 'category',
                data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                name: '入延迟',
                type: 'line',
                data: [120, 132, 201, 234, 290, 330, 410]
                },
                {
                name: '出延迟',
                type: 'line',
                data: [220, 282, 301, 334, 390, 430, 510]
                }
            ]
        }
    };
  },
  methods: {
    goto(no) {
      this.$router.push(`/ecs/device/${no}`); // todo
    },
    isActive(key) {
      return key === this.intervalOptions.currentKey ? "primary" : "ghost";
    },
    changeInterval(key) {
      this.intervalOptions.currentKey = key
      let intervalMap = {1: 5000, 2: 15000, 3: 30000}
      this.intervalOptions.interval = intervalMap[key]
      this.resetInterval()
    },
    resetInterval() {
      clearInterval(this.intervalOptions.intervalID)
      this.intervalOptions.intervalID = setInterval(this.refreshPage, this.intervalOptions.interval)
    },
    getSubscription (params) {
      dwhApi.getSubscription(params).then(resp => {
        this.basicInfo = resp.data.data || {};
        this.basicInfo.priority = constant.taskPriorityMap[this.basicInfo.priority]
        this.basicInfo.type = constant.subTypeMap[this.basicInfo.type]
        this.basicInfo.state = constant.subStateMap[this.basicInfo.state]
        this.basicInfo.level = constant.dataLevelMap[this.basicInfo.level]
        this.basicInfo.sub_time = formatDate(new Date(this.basicInfo.sub_time * 1000), "yyyy-MM-dd hh:mm:ss")
        this.basicInfo.create_time = formatDate(new Date(this.basicInfo.create_time * 1000), "yyyy-MM-dd hh:mm:ss")
      });
    },
    refreshPage () {
      this.getSubscription({id: this.basicInfo.id})
    },
    goback() {
      this.$router.go(-1)
    },
  },
  mounted() {
    this.basicInfo.id = this.$route.params.id || 0;
    this.refreshPage()
    this.intervalOptions.intervalID = setInterval(this.refreshPage, this.intervalOptions.interval)
  },
  destroyed() {
    clearInterval(this.intervalOptions.intervalID)
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
