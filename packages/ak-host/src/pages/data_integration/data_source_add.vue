<template>
    <div>
    <Modal v-model="showing" @on-cancel="closeAdd" width="700">
        <div class="content">
            <div class="banner2">
                <h3 style="text-align: center;margin-bottom: 10px;">填写数据源信息</h3>
                <Form :label-width="120" ref="currentForm" :model="currentForm" :rules="rulesValidation">
                    <div v-for="val in currentOptions" :key="val.key">
                        <Form-item :label="val.title" :prop="val.key" v-if="!currentHide[val.key]">
                            <div v-if="val.typ == 'vue-select'" class="v-select">
                                <Select
                                    v-model="currentForm[val.key]"
                                    filterable
                                    remote
                                    not-found-text=""
                                    :remote-method="val.onSearch">
                                    <Option v-for="option in val.selectList" :value="option.value" :key="option.value">
                                        {{option.label}}
                                    </Option>
                                </Select>
                            </div>
                            <div v-else-if="val.typ == 'select'">
                                <Select v-model="currentForm[val.key]" :placement="val.placement || 'top'"
                                        placeholder="请选择" @on-change="handleSelectChange(val)">
                                    <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                            </div>
                            <div v-else-if="val.typ == 'checkbox'">
                                <Checkbox v-model="currentForm[val.key]"
                                          @on-change="handleSelectChange(val)"></Checkbox>
                            </div>
                            <div v-else-if="val.typ == 'radio'">
                                <Radio-group v-model="currentForm[val.key]" @on-change="handleSelectChange(val)">
                                    <Radio v-for="item in val.radioList" :label="item.value" :key="item.value">{{item.label}}</Radio>
                                </Radio-group>
                            </div>
                            <div v-else-if="val.typ == 'date'">
                                <Date-picker v-model="currentForm[val.key]" placement="right" type="datetime"
                                             format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间（不含秒）"
                                             style="width: 200px"></Date-picker>
                            </div>
                            <div v-else-if="val.typ == 'textarea'">
                                <Input v-model="currentForm[val.key]" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                            </div>
                            <div v-else-if="val.typ == 'container'" class="v-border">
                                <Form :label-width="100" style="margin-top: 5px">
                                    <div v-for="(path, index) in currentForm[val.key]" class="sub-form" :key="index">
                                        <!--<div style="position: absolute;left: 20px;z-index:199"><strong>{{index+1}}.</strong></div>
                                        <div style="position: absolute;right: 40px;z-index:199"><a @click="delCurrentSlice(currentForm[val.key], index)" class="pointer">X</a></div>-->
                                        <div v-for="subVal in val.children" style="margin: 5px auto" :key="subVal.key">
                                            <Form-item :prop="subVal.key" :label="subVal.title">
                                                <div v-if="subVal.typ == 'select'">
                                                    <Select v-model="currentForm[val.key][index][subVal.key]"
                                                            placeholder="请选择" @on-change="handleSelectChange">
                                                        <Option v-for="item in val.selectList" :value="item.value" :key="item.value">
                                                            {{item.label}}
                                                        </Option>
                                                    </Select>
                                                </div>
                                                <div v-else-if="subVal.typ == 'radio'">
                                                    <Radio-group v-model="currentForm[val.key][index][subVal.key]">
                                                        <Radio v-for="item in subVal.radioList" :label="item.value" :key="item.value">
                                                            {{item.label}}
                                                        </Radio>
                                                    </Radio-group>
                                                </div>
                                                <div v-else-if="val.typ == 'textarea'"
                                                     style="width: 70%; display: inline-block">
                                                    <Input v-model="currentForm[val.key][index][subVal.key]"
                                                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                                           placeholder="请输入..."></Input>
                                                </div>
                                                <div v-else style="width: 70%;display: inline-block">
                                                    <Input v-model="currentForm[val.key][index][subVal.key]"
                                                           placeholder="请输入"></Input>
                                                </div>
                                            </Form-item>
                                        </div>
                                    </div>
                                </Form>
                                <!--<Button style="margin: 10px 0 10px 20px" type="dashed" @click="addContainerItem(currentForm[val.key], val.key)" icon="plus-round">新增</Button>-->
                            </div>
                            <div v-else-if="val.typ == 'number'">
                                <Input v-model="currentForm[val.key]" placeholder="请输入">
                                <div class="options" v-if="!!val.optionList" slot="append">
                                    <Select v-model="val.unit" placeholder="请选择">
                                        <Option v-for="item in val.optionList" :value="item.value" :key="item.value">{{item.label}}
                                        </Option>
                                    </Select>
                                </div>
                                </Input>
                            </div>
                            <div v-else>
                                <Input v-model="currentForm[val.key]" placeholder="请输入"></Input>
                            </div>
                            <div class="suffix">
                                <div class="tooltip" v-if="!!val.tooltip">
                                    <Tooltip placement="top">
                                        <div style="white-space: normal; width: 150px" slot="content">{{val.tooltip}}
                                        </div>
                                        <Icon type="help-circled"></Icon>
                                    </Tooltip>
                                </div>
                            </div>

                        </Form-item>
                    </div>
                    <Form-item>
                        <Button type="primary" @click="closeAddNow">连通性测试</Button>
                        <Button type="primary" @click="handleSubmit('currentForm')" style="margin-left: 8px">提交</Button>
                        <Button type="ghost" @click="closeAddNow" style="margin-left: 8px">取消</Button>
                    </Form-item>
                </Form>
            </div>
        </div>
        <div slot="footer"></div>
    </Modal>
    </div>
</template>

<script>
    import dwhApi from '@/requests/dwh.http';
    import vSelect from 'vue-select';

    export default {
        components: {vSelect},
        data() {
            return {
                showing: false,
                methodName: '添加',
                dataSourceOptions: [
                    {key: 'name', title: '数据源名称'},
                    {key: 'description', title: '数据源描述'},
                    {
                        key: 'type', title: '数据源类型', typ: 'select', selectList: [
                            {label: 'KAFKA', value: 1},
                            {label: 'mysql', value: 2},
                            {label: 'HDFS', value: 3},
                            {label: 'FTP', value: 4},
                            {label: 'Oracle', value: 5}
                        ],
                    },
                    // KAFKA
                    {key: 'kafka_zookeeper', title: 'zookeeper'},
                    {key: 'kafka_consumer', title: 'consumer'},
                    {key: 'kafka_schema', title: 'schema'},
                    {key: 'kafka_user_info', title: 'user info', typ: 'textarea'},
                    // mysql
                    {key: 'mysql_jdbc_url', title: 'JDBC URL'},
                    {key: 'mysql_user_name', title: '用户名'},
                    {key: 'mysql_user_passwd', title: '密码'},
                    // HDFS
                    {key: 'hdfs_default_fs', title: 'defaultFS'},
                    // FTP
                    {key: 'ftp_host', title: 'Host'},
                    {key: 'ftp_protocol', title: '协议', typ: 'radio', radioList: [
                        {label: 'ftp', value: 'ftp'},
                        {label: 'sftp', value: 'sftp'}
                    ]},
                    {key: 'ftp_user_name', title: '用户名'},
                    {key: 'ftp_user_passwd', title: '密码'},
                    // Oracle
                    {key: 'ora_jdbc_url', title: 'JDBC URL'},
                    {key: 'ora_user_name', title: '用户名'},
                    {key: 'ora_user_passwd', title: '密码'},

                    {key: 'whitelist', title: '访问白名单'},
                ],
                dataSourceForm: {
                    'name': '',
                    'type': 1,
                    'config': '',
                    'description': '',
                    'creator_name': 'yangzhen', // todo
                    'creator_cnname': '杨震', // todo
                    'whitelist': '',
                },
                dataSourceHide: {
                    'kafka_zookeeper': false,
                    'kafka_consumer': false,
                    'kafka_schema': false,
                    'kafka_user_info': false,
                    'mysql_jdbc_url': true,
                    'mysql_user_name': true,
                    'mysql_user_passwd': true,
                    'hdfs_default_fs': true,
                    'ftp_host': true,
                    'ftp_protocol': true,
                    'ftp_user_name': true,
                    'ftp_user_passwd': true,
                    'ora_jdbc_url': true,
                    'ora_user_name': true,
                    'ora_user_passwd': true
                },

                currentOptions: [],
                currentForm: {},
                currentHide: {},
                rulesValidation: {
                    name: [{required: true, message: '数据源名称不能为空', type: 'string'}],
                }
            }
        },
        methods: {
            refreshPages() {
            },
            setCurrent() {
                this.currentOptions = this.dataSourceOptions;
                this.currentForm = this.dataSourceForm;
                this.currentHide = this.dataSourceHide;
            },
            handleSelectChange(val) {
                if (val.key === 'type') {
                    let keyList = ['kafka_zookeeper', 'kafka_consumer', 'kafka_schema', 'kafka_user_info', 'mysql_jdbc_url', 
                    'mysql_user_name', 'mysql_user_passwd', 'hdfs_default_fs', 'ftp_host', 'ftp_protocol', 'ftp_user_name',
                    'ftp_user_passwd', 'ora_jdbc_url', 'ora_user_name', 'ora_user_passwd']
                    let filterMap = {
                        1: {'kafka_zookeeper': 1, 'kafka_consumer': 1, 'kafka_schema': 1, 'kafka_user_info': 1},
                        2: {'mysql_jdbc_url': 1, 'mysql_user_name': 1, 'mysql_user_passwd': 1},
                        3: {'hdfs_default_fs': 1},
                        4: {'ftp_host': 1, 'ftp_protocol': 1, 'ftp_user_name': 1, 'ftp_user_passwd': 1},
                        5: {'ora_jdbc_url': 1, 'ora_user_name': 1, 'ora_user_passwd': 1}
                    }
                    let filter = filterMap[this.currentForm[val.key]]
                    keyList.forEach(item=>{
                        if (filter[item] == 1) {
                            this.currentHide[item] = false
                        } else {
                            this.currentHide[item] = true
                        }
                    });
                }
            },
            handleSubmit(name) {
                this.genSubmitParams()
                let valid = true;
                this.$refs[name].validate(ret => {
                    if (!ret) {
                        this.$Message.error("表单校验失败");
                        valid = false;
                    }
                });
                if (!valid) {
                    return;
                }
                const params = this.dataSourceForm;
                this.updateDataSources(params).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.$Message.info({
                            content: '成功，跳转到数据源列表界面!', onClose: () => {
                                this.$router.push({path: '/dwh/source/manage'});
                            }, duration: 2, closable: false
                        });
                    } else if (error == 44000) {
                        this.$Message.error({
                            content: '数据源重名! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    } else {
                        this.$Message.error({
                            content: '提交信息出错! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    }
                });
            },
            updateDataSources(params) {
                if (params.id > 0) {
                    return dwhApi.updateDataSource(params);
                } else {
                    return dwhApi.createDataSource(params);
                }
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            closeAdd() {
                setTimeout(() => {
                    this.$router.push('/dwh/source/manage')
                }, 200)
            },
            closeAddNow() {
                this.$router.push('/dwh/source/manage')
            },
            loadConfig(config_str) {
                let form = this.dataSourceForm
                let config = JSON.parse(config_str)
                if (form.type == 1) {
                    form.kafka_zookeeper = config.kafka_zookeeper
                    form.kafka_consumer = config.kafka_consumer
                    form.kafka_schema = config.kafka_schema
                    form.kafka_user_info = config.kafka_user_info
                } else if (this.dataSourceForm.type == 2) {
                    form.mysql_jdbc_url = config.mysql_jdbc_url
                    form.mysql_user_name = config.mysql_user_name
                    form.mysql_user_passwd = config.mysql_user_passwd
                } else if (this.dataSourceForm.type == 3) {
                    form.hdfs_default_fs = config.hdfs_default_fs
                } else if (this.dataSourceForm.type == 4) {
                    form.ftp_host = config.ftp_host
                    form.ftp_protocol = config.ftp_protocol
                    form.ftp_user_name = config.ftp_user_name
                    form.ftp_user_passwd = config.ftp_user_passwd
                } else if (this.dataSourceForm.type == 5) {
                    form.ora_jdbc_url = config.ora_jdbc_url
                    form.ora_user_name = config.ora_user_name
                    form.ora_user_passwd = config.ora_user_passwd
                }
            },
            genSubmitParams() {
                let form = this.dataSourceForm
                if (form.type == 1) {
                    form.config = JSON.stringify({kafka_zookeeper: form.kafka_zookeeper, kafka_consumer: form.kafka_consumer,
                                                  kafka_schema: form.kafka_schema, kafka_user_info: form.kafka_user_info})
                } else if (this.dataSourceForm.type == 2) {
                    form.config = JSON.stringify({mysql_jdbc_url: form.mysql_jdbc_url, mysql_user_name: form.mysql_user_name,
                                                 mysql_user_passwd: form.mysql_user_passwd})
                } else if (this.dataSourceForm.type == 3) {
                    form.config = JSON.stringify({hdfs_default_fs: form.hdfs_default_fs})
                } else if (this.dataSourceForm.type == 4) {
                    form.config = JSON.stringify({ftp_host: form.ftp_host, ftp_protocol: form.ftp_protocol,
                                                  ftp_user_name: form.ftp_user_name, ftp_user_passwd: form.ftp_user_passwd})
                } else if (this.dataSourceForm.type == 5) {
                    form.config = JSON.stringify({ora_jdbc_url: form.ora_jdbc_url, ora_user_name: form.ora_user_name,
                                                  ora_user_passwd: form.ora_user_passwd})
                }
            }
        },
        mounted() {
            this.dataSourceForm.id = this.$route.params.id || 0;
            if (this.dataSourceForm.id > 0) {
                this.methodName = '更新';
                dwhApi.getDataSourceById({id: this.dataSourceForm.id}).then(resp => {
                        this.dataSourceForm.name = resp.data.data.name;
                        this.dataSourceForm.description = resp.data.data.description;
                        this.dataSourceForm.type = resp.data.data.type;
                        this.dataSourceForm.whitelist = resp.data.data.whitelist;
                        this.loadConfig(resp.data.data.config);
                });
            }
            this.setCurrent();
            this.showing = true;
        },
        destroyed() {
            this.showing = false;
        }
    }
</script>

<style scoped>
    .banner1 {
        padding: 4px 0 10px 0;
    }

    .content {
        padding: 10px;
        min-height: 84.5vh;
        border-radius: 2px;
        background: #fff;
    }

    .banner2 {
        margin-top: 15px;
        width: 70%;
    }

    .v-border {
        border: 1px solid #dddee1;
        border-radius: 4px;
        padding: 5px auto;
    }

    .pointer {
        cursor: pointer;
    }

    .sub-form .ivu-form-item-error-tip {
        top: 24px;
        left: 20px;
    }

    .options {
        width: 60px;
        display: inline-block;
    }

    .tooltip {
        font-size: 18px;
        color: #737373;
        line-height: 32px;
        height: 32px;
        vertical-align: middle;
        display: inline-block;
    }

    .suffix {
        width: 100px;
        margin-left: 10px;
        position: absolute;
        top: 0;
        left: 100%;
    }

    .v-select .el-select {
        display: block;
    }

    .v-select .el-input__inner {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px !important;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
    }

    .v-select .el-select .el-input__inner:focus {
        border-color: #57a3f3;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
    }
</style>
