<template>
    <div>
    <Modal v-model="showing" @on-cancel="closeApply" width="700">
        <div class="content">
            <div class="banner2">
                <h3 style="text-align: center;margin-bottom: 10px;">审批及分配资源</h3>
                <Form :label-width="120" ref="currentForm" :model="currentForm" :rules="rulesValidation">
                    <div v-for="val in currentOptions" :key="val.key">
                        <Form-item :label="val.title" :prop="val.key" v-if="!val.hide">
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
                                <Input v-model="currentForm[val.key]" :placeholder="val.placeholder">
                                <div class="options" v-if="!!val.optionList" slot="append">
                                    <Select v-model="val.unit" placeholder="请选择">
                                        <Option v-for="item in val.optionList" :value="item.value" :key="item.value">{{item.label}}
                                        </Option>
                                    </Select>
                                </div>
                                </Input>
                            </div>
                            <div v-else-if="val.typ == 'readonly'">
                                <Input v-model="currentForm[val.key]" placeholder="请输入" readonly></Input>
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
                        <Button type="ghost" @click="closeApplyNow">取消</Button>
                        <Button type="primary" @click="handleReject" style="margin-left: 8px">拒绝</Button>
                        <Button type="primary" @click="handleSubmit('currentForm')" style="margin-left: 8px">生成配置</Button>
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
                subscriptionOptions: [
                    {key: 'table_name', title: '表名', typ: 'readonly'},
                    {
                        key: 'resource', title: '分配资源', typ: 'select', selectList: [
                            {label: '集群、zk、topic', value: 0},
                        ],
                    },
                    {
                        key: 'priority', title: '优先级', typ: 'select', selectList: [
                            {label: 'P0', value: 0},
                            {label: 'P1', value: 1},
                            {label: 'P2', value: 2},
                        ],
                    },
                    {key: 'type', title: '订阅类型', typ: 'radio', radioList: [
                        {label: '实时订阅', value: 1},
                        {label: '离线订阅', value: 2}
                    ]},
                    {key: 'expire_time', title: '权限有效期', typ: 'number', placeholder: '请输入申请时长(天)'},
                    {key: 'description', title: '备注', typ: 'textarea'},
                ],
                subscriptionForm: {
                    'id': 0,
                    'table_name': '',
                    'resource': 0,
                    'priority': 0,
                    'type': 1,
                    'expire_time': '',
                    'description': '',
                    'config': '',
                    'state': 1,
                    'sub_time': 0
                },
                currentOptions: [],
                currentForm: {},
                rulesValidation: {
                    table_name: [{required: true, message: '数据源名称不能为空', type: 'string'}],
                    expire_time: [{required: true, message: '权限有效期不能为空', type: 'string'}],
                    description: [{required: true, message: '备注不能为空', type: 'string'}]
                }
            }
        },
        methods: {
            refreshPages() {
            },
            setCurrent() {
                this.currentOptions = this.subscriptionOptions;
                this.currentForm = this.subscriptionForm;
            },
            handleSelectChange(val) {

            },
            genConfig() {
                this.currentForm.config = 'test config' // todo
                this.subscriptionForm.sub_time = Date.parse(new Date()) / 1000
            },
            handleSubmit(name) {
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
                this.genConfig()
                const params = this.subscriptionForm;
                dwhApi.updateSubscription(params).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.$Message.info({
                            content: '成功，跳转到订阅权限管理界面!', onClose: () => {
                                this.$router.push({path: '/dwh/sub/permission/manage'});
                            }, duration: 2, closable: false
                        });
                    } else {
                        this.$Message.error({
                            content: '审批出错! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    }
                });
            },
            handleReject() {
                dwhApi.updateSubscription({id: this.subscriptionForm.id, state: -1}).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.$Message.info({
                            content: '成功，跳转到订阅权限管理界面!', onClose: () => {
                                this.$router.push({path: '/dwh/sub/permission/manage'});
                            }, duration: 2, closable: false
                        });
                    } else {
                        this.$Message.error({
                            content: '审批出错! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    }
                });
            },
            closeApply() {
                setTimeout(() => {
                    this.$router.push('/dwh/sub/permission/manage')
                }, 200)
            },
            closeApplyNow() {
                this.$router.push('/dwh/sub/permission/manage')
            },
        },
        mounted() {
            this.subscriptionForm.id = this.$route.params.id || 0
            this.subscriptionForm.table_name = this.$route.query.table_name
            this.subscriptionForm.priority = this.$route.query.priority
            this.subscriptionForm.type = this.$route.query.type
            this.subscriptionForm.expire_time = '' + this.$route.query.expire_time
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
