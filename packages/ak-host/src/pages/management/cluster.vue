<template>
    <div class="wrapper wrapper-content">
        <Card>
            <p slot="title">
                <i class="fa fa-cube"></i>
                集群：
                <span>{{frmCluster.name}}</span>
            </p>
            <Form ref="frmCluster" :model="frmCluster" :rules="frmClusterRules">
                <Collapse v-model="clusterInfo">
                    <Panel name="basic">
                        Basic
                        <div slot="content">
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>名称</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="name">
                                        <Input type="text" v-model="frmCluster.name" :disabled="locker.locked"
                                               placeholder="名称"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>所在机房</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="name">
                                        <Input type="text" v-model="frmCluster.idcName" :disabled="locker.locked"
                                               placeholder="机房名称"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </div>
                    </Panel>
                    <Panel name="kafka">
                        Kafka Settings
                        <div slot="content">
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>brokers</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="brokers">
                                        <Input type="text" v-model="frmCluster.brokers" :disabled="locker.locked"
                                               placeholder="172.15.1.1:9092,172.15.1.2:9092"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>zookeeper</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="zookeeper">
                                        <Input type="text" v-model="frmCluster.zookeeper" :disabled="locker.locked"
                                               placeholder="172.15.1.1:2181,172.15.1.2:2181/dc"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </div>
                    </Panel>
                    <Panel name="schema">
                        Schema Registry
                        <div slot="content">
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>repositories</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="schemaRegistry">
                                        <Input type="text" v-model="frmCluster.schemaRegistry" :disabled="locker.locked"
                                               placeholder="172.15.1.1:8083,172.15.1.2:8083"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </div>
                    </Panel>
                    <Panel name="connector">
                        Kafka connector
                        <div slot="content">
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>connectors</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="connector">
                                        <Input type="text" v-model="frmCluster.connector" :disabled="locker.locked"
                                               placeholder="172.15.1.1:8083,172.15.1.2:8083"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </div>
                    </Panel>
                    <Panel name="hadoop">
                        Hadoop
                        <div slot="content">
                            <Row :gutter="16">
                                <iCol span="3" class="col-label">
                                    <label>namenode</label>
                                </iCol>
                                <iCol span="15">
                                    <FormItem prop="nameNode">
                                        <Input type="text" v-model="frmCluster.nameNode" :disabled="locker.locked"
                                               placeholder="172.15.1.1:8083"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </div>
                    </Panel>
                    <Panel name="extra">
                        其它配置
                        <div slot="content">
                            <Row :gutter="16">
                                <iCol :offset="3" span="15">
                                    <FormItem prop="extra">
                                        <Input type="textarea" :rows="5" :disabled="locker.locked"
                                               v-model="frmCluster.extra"/>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
                <div style="text-align: center;margin-top: 10px;">
                    <Button type="primary" :disabled="locker.locked" @click="saveCluster">保存</Button>
                    <Button :disabled="locker.locked" @click="cancel">取消</Button>
                </div>
            </Form>
            <div style="cursor: pointer" @click="toggleLock">
                <i :class="locker.clazz"></i>
                <span style="margin-left: 5px">{{locker.message}}</span>
            </div>
        </Card>
    </div>
</template>

<script>
  import dwhApi from '@/requests/dwh.http'
  import Panel from '../../../node_modules/iview/src/components/collapse/panel.vue'

  export default {
    components: {Panel},
    data () {
      return {
        locker: {
          locked: true,
          clazz: 'fa fa-2x fa-lock',
          message: '解锁'
        },
        frmCluster: {
          name: '',
          idcName: '',
          brokers: '',
          zookeeper: '',
          schemaRegistry: '',
          nameNode: '',
          extra: ''
        },
        frmClusterRules: {},
        clusterInfo: ['basic', 'kafka', 'schema', 'connector', 'hadoop']
      }
    },
    methods: {
      toggleLock () {
        if (this.locker.locked) {
          this.locker.clazz = 'fa fa-2x fa-unlock-alt'
          this.locker.message = '锁定'
        } else {
          this.locker.clazz = 'fa fa-2x fa-lock'
          this.locker.message = '解锁'
        }
        this.locker.locked = !this.locker.locked
      },
      saveCluster () {
        dwhApi.saveCluster(this.frmCluster)
      },
      cancel () {
        this.$refs['frmCluster'].resetFields()
      }
    },
    mounted () {
      dwhApi.getCluster({'id': this.$store.getters.current}).then(resp => {
        let cluster = resp.data.data.cluster
        if (!cluster) {
          this.toggleLock()
        } else {
          this.frmCluster.name = cluster.name
        }
      })
    }
  }
</script>
<style scoped>
    .col-label {
        text-align: right;
    }
</style>