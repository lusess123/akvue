<template>
    <div>
        <div class="content">
            <div class="banner2">
                <Form :label-width="120" ref="form" :model="form" :rules="rulesValidation">
                    <Form-item>
                        <Steps :current="current">
                            <Step title="基础信息"></Step>
                            <Step title="字段和分区信息"></Step>
                            <Step title="新建成功"></Step>
                        </Steps>
                    </Form-item>
                    <div v-for="val in basicOptions" :key="val.key">
                        <Form-item :label="val.title" :prop="val.key" v-if="current==0">
                            <div v-if="val.typ == 'select'">
                                <Select v-model="form[val.key]" :placement="val.placement || 'top'"
                                        placeholder="请选择" @on-change="handleSelectChange(val)">
                                    <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                            </div>
                            <div v-else-if="val.typ == 'radio'">
                                <Radio-group v-model="form[val.key]" @on-change="handleSelectChange(val)">
                                    <Radio v-for="item in val.radioList" :label="item.value" :key="item.value">{{item.label}}</Radio>
                                </Radio-group>
                            </div>
                            <div v-else-if="val.typ == 'textarea'">
                                <Input v-model="form[val.key]" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                            </div>
                            <div v-else-if="val.typ == 'readonly'">
                                <Input v-model="form[val.key]" placeholder="请输入" readonly></Input>
                            </div>
                            <div v-else>
                                <Input v-model="form[val.key]" placeholder="请输入"></Input>
                            </div>
                        </Form-item>
                    </div>
                    <Form-item v-if="current==0">
                        <Button type="ghost" @click="goback()">取消</Button>
                        <Button type="primary" @click="setCurrentSetp(1)" style="margin-left: 8px">下一步</Button>
                    </Form-item>
                    <div v-for="val in fieldOptions" :key="val.key">
                        <Form-item :label="val.title" :prop="val.key" v-if="current==1">
                            <div v-if="val.typ == 'select'">
                                <Select v-model="form[val.key]" :placement="val.placement || 'top'"
                                        placeholder="请选择" @on-change="handleSelectChange(val)">
                                    <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                            </div>
                            <div v-else-if="val.typ == 'radio'">
                                <Radio-group v-model="form[val.key]" @on-change="handleSelectChange(val)">
                                    <Radio v-for="item in val.radioList" :label="item.value" :key="item.value">{{item.label}}</Radio>
                                </Radio-group>
                            </div>
                            <div v-else-if="val.typ == 'textarea'">
                                <Input v-model="form[val.key]" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                            </div>
                            <div v-else-if="val.typ == 'readonly'">
                                <Input v-model="form[val.key]" placeholder="请输入" readonly></Input>
                            </div>
                            <div v-else>
                                <Input v-model="form[val.key]" placeholder="请输入"></Input>
                            </div>
                        </Form-item>
                    </div>
                    <Form-item v-if="current==1">
                        <Table ref="$table" :columns="schemaOptions.columns" :data="schemaOptions.data" border=""></Table>
                        <Row style="margin-top: 10px">
                            <Button icon="ios-plus-empty" type="dashed" @click="addField()">新增字段</Button>
                        </Row>
                        <Row style="margin-top: 30px">
                            <Button type="ghost" @click="goback()">取消</Button>
                            <Button type="ghost" @click="setCurrentSetp(0)" style="margin-left: 8px">上一步</Button>
                            <Button type="primary" @click="handleSubmit('form')" style="margin-left: 8px">提交</Button>
                        </Row>
                    </Form-item>
                    <Form-item v-if="current==2">
                        <h3 style="text-align:center;margin-top:100px;margin-bottom:100px">恭喜你创建成功</h3>
                    </Form-item>
                    <Form-item v-if="current==2">
                        <Button type="primary" @click="goback()">完成</Button>
                    </Form-item>
                </Form>
            </div>
        </div>
        <div slot="footer"></div>
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
                current: 0,
                schemaOptions: {
                    columns: [
                        { 
                            key: 'name', 
                            title: '字段英文名',
                            render: (h, params) => {
                                let elements = [
                                    h("Input", {
                                        props: {value: params.row.name},
                                        on: {
                                            input: (val) => {
                                                params.row.name = val
                                            }
                                        }
                                    })
                                ];
                                return h("div", elements);
                            }
                        },
                        { 
                            key: 'type', 
                            title: '字段类型',
                            render: (h, params) => {
                                let elements = [
                                    h("Select", {props: {value: 'STRING'}}, 
                                    [
                                        h("Option", {props: {value: 'STRING'},}, 'STRING'),
                                        h("Option", {props: {value: 'INTEGER'},}, 'INTEGER'),
                                    ])
                                ];
                                return h("div", elements);
                            }
                        },
                        { 
                            key: 'description', 
                            title: '描述',
                            render: (h, params) => {
                                let elements = [
                                    h("Input", {
                                        props: {value: params.row.description},
                                        on: {
                                            input: (val) => {
                                                params.row.description = val
                                            }
                                        }
                                    })
                                ];
                                return h("div", elements);
                            }
                        },
                        {
                            key: "action",
                            title: "操作",
                            align: "center",
                            width: "100px",
                            render: (h, params) => {
                            let actionButton = [
                                h("Button",
                                {
                                    props: {type: "error", size: "small"},
                                    style: {marginRight: "5px"},
                                    on: {
                                        click: () => {
                                            this.deleteField(params.index);
                                        }
                                    }
                                }, "删除")];
                                return h("div", actionButton);
                            }
                        }
                    ],
                    data: [
                        {name: '', type: 'STRING', description: ''}
                    ]
                },
                basicOptions: [
                    {
                        key: 'cluster_name', title: '集群', typ: 'select', selectList: [
                            {label: '杭州涉密集群', value: 'cluster_1'},
                            {label: '杭州测试集群', value: 'cluster_2'},
                        ],
                    },
                    {key: 'name', title: '表名'},
                    {key: 'cnname', title: '别名'},
                    {key: 'description', title: '描述'},
                    {
                        key: 'lifetime', title: '生命周期', typ: 'select', selectList: [
                            {label: '一周', value: 7},
                            {label: '32天', value: 32},
                        ],
                    },
                ],
                fieldOptions: [
                    {key: 'part', title: '是否分区', typ: 'radio', radioList: [
                        {label: '否', value: 0},
                        {label: '是', value: 1}
                    ]},
                ],
                form: {
                    'name': '',
                    'cnname': '',
                    'type': 2, //默认生产，目前没有选择类型的入口
                    'cluster_name': 'cluster_1',
                    'source_name': 'source_1',
                    'level': 0,
                    'permission': 3,
                    'owner_name': 'yangzhen',
                    'owner_cnname': '杨震',
                    'description': '',
                    'lifetime': 7,
                    'part': 0,
                    'schema': ''
                },
                rulesValidation: {
                    name: [{required: true, message: '表名不能为空', type: 'string'}],
                }
            }
        },
        methods: {
            validateSchema() {
                let schemaJSON = this.getSchemaData()
                var nameSet = {}
                var valid = true
                schemaJSON.forEach(element => {
                    let name = element.name.trim()
                    if (nameSet[name] || name == '') {
                        valid = false
                    } else {
                        nameSet[name] = 1
                    }
                });
                return valid
            },
            getSchemaData() {
                var schemaStr = JSON.stringify(this.$refs.$table.rebuildData)
                var schemaJSON = JSON.parse(schemaStr)
                schemaJSON.forEach(element => {
                    delete element._index
                    delete element._rowKey
                });
                return schemaJSON
            },
            addField() {
                this.schemaOptions.data = this.getSchemaData()
                this.schemaOptions.data.push({name: '', type: 'STRING', description: ''})
            },
            deleteField(index) {
                this.schemaOptions.data = this.getSchemaData()
                this.schemaOptions.data.splice(index, 1)
            },
            handleSelectChange(val) {
            },
            setCurrentSetp(current) {
                if (current == 0) {
                    this.schemaOptions.data = this.getSchemaData()
                } else if (current == 1) {
                    let valid = true;
                    this.$refs['form'].validate(ret => {
                        if (!ret) {
                            this.$Message.error("表单校验失败");
                            valid = false;
                        }
                    });
                    if (!valid) {
                        return;
                    }
                }
                this.current = current
            },
            handleSubmit(name) {
                this.schemaOptions.data = this.getSchemaData()
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
                const params = this.form;
                dwhApi.createDataTable(params).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.setCurrentSetp(2)
                    } else if (error == 44000) {
                        this.$Message.error({
                            content: '数据表重名! ' + error, onClose: () => {
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
            goback() {
                this.$router.push('/dwh/table/manage')
            },
        },
        mounted() {
        },
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
