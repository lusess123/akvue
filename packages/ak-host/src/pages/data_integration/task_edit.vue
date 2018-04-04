<template>
    <div>
        <div class="content">
            <div class="banner2">
                <Row :gutter="16">
                    <Col span="4">
                        <Row>
                            <div style="background:#eee;height:500px">
                                <Table :columns="historyOptions.columns" :data="historyOptions.data" style="padding:10px 10px 10px 10px" height="500px"></Table>
                            </div>
                        </Row>
                    </Col>
                    <Col span="14" v-if="page==0">
                        <Row>
                            <h3 style="margin-top:10px;margin-bottom:10px">新建一个同步任务</h3>
                            <Button type="ghost" @click="changeSubPage(1)" style="width:200px;height:120px">向导模式</Button>
                            <Button type="ghost" @click="refreshPage" class="margin-left" style="width:200px;height:120px">脚本模式</Button>
                        </Row>
                    </Col>
                    <Col span="16" v-if="page==1" offset="1">
                        <Row>
                            <Button type="ghost" @click="changeSubPage(0)" size="small">新建</Button>
                            <Button type="ghost" @click="changeToLog()" size="small" style="margin-left:10px">运行</Button>
                            <Button type="ghost" @click="showSubmit()" size="small" style="margin-left:10px">提交</Button>
                        </Row>
                        <Row>
                            <Steps :current="current" style="margin-top:20px">
                                <Step title="选择来源"></Step>
                                <Step title="选择目标"></Step>
                                <Step title="字段映射"></Step>
                                <Step title="通道控制"></Step>
                                <Step title="预览保存"></Step>
                            </Steps>
                        </Row>
                        <Row>
                            <Form :label-width="100" ref="form" :model="form" :rules="rulesValidation" style="margin-top:20px">

                                <div v-for="val in fromOptions" :key="val.key" v-if="current==0">
                                    <Form-item :label="val.title" :prop="val.key">
                                        <div v-if="val.typ == 'select'">
                                            <Select v-model="form[val.key]" :placement="val.placement || 'top'"
                                                    placeholder="请选择" @on-change="handleSelectChange(val)">
                                                <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                            </Select>
                                        </div>
                                        <div v-else-if="val.typ == 'checkbox'">
                                            <Checkbox v-model="form[val.key]" @on-change="handleSelectChange(val)"></Checkbox>
                                        </div>
                                        <div v-else-if="val.typ == 'textarea'">
                                            <Input v-model="form[val.key]" type="textarea"
                                                :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                                        </div>
                                        <div v-else>
                                            <Input v-model="form[val.key]" placeholder="请输入"></Input>
                                        </div>
                                    </Form-item>
                                </div>
                                <div v-if="current==0">
                                    <Button type="primary" @click="setCurrentSetp(1)" style="margin-left: 8px">下一步</Button>
                                </div>

                                <div v-for="val in toOptions" :key="val.key" v-if="current==1">
                                    <Form-item :label="val.title" :prop="val.key">
                                        <div v-if="val.typ == 'select'">
                                            <Select v-model="form[val.key]" :placement="val.placement || 'top'"
                                                    placeholder="请选择" @on-change="handleSelectChange(val)">
                                                <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                            </Select>
                                        </div>
                                        <div v-else-if="val.typ == 'textarea'">
                                            <Input v-model="form[val.key]" type="textarea"
                                                :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                                        </div>
                                        <div v-else>
                                            <Input v-model="form[val.key]" placeholder="请输入"></Input>
                                        </div>
                                    </Form-item>
                                </div>
                                <div v-if="current==1">
                                    <Button type="primary" @click="setCurrentSetp(0)" style="margin-left: 8px">上一步</Button>
                                    <Button type="primary" @click="setCurrentSetp(2)" style="margin-left: 8px">下一步</Button>
                                </div>

                                <div v-if="current==2">
                                    <Row>
                                        <Col span="12"><Table :columns="fromSchemaOptions.columns" :data="fromSchemaOptions.data" style="margin-bottom:30px"></Table></Col>
                                        <Col span="12"><Table :columns="toSchemaOptions.columns" :data="toSchemaOptions.data" style="margin-bottom:30px"></Table></Col>
                                        <Button type="primary" @click="setCurrentSetp(1)" style="margin-left: 8px">上一步</Button>
                                        <Button type="primary" @click="setCurrentSetp(3)" style="margin-left: 8px">下一步</Button>
                                    </Row>
                                </div>

                                <div v-for="val in channelOptions" :key="val.key" v-if="current==3">
                                    <Form-item :label="val.title" :prop="val.key">
                                        <div v-if="val.typ == 'select'">
                                            <Select v-model="form[val.key]" :placement="val.placement || 'top'"
                                                    placeholder="请选择" @on-change="handleSelectChange(val)">
                                                <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                            </Select>
                                        </div>
                                        <div v-else-if="val.typ == 'textarea'">
                                            <Input v-model="form[val.key]" type="textarea"
                                                :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                                        </div>
                                        <div v-else>
                                            <Input v-model="form[val.key]" :placeholder="val.placeholder || '请输入'"></Input>
                                        </div>
                                    </Form-item>
                                </div>
                                <div v-if="current==3">
                                    <Button type="primary" @click="setCurrentSetp(2)" style="margin-left: 8px">上一步</Button>
                                    <Button type="primary" @click="setCurrentSetp(4)" style="margin-left: 8px">下一步</Button>
                                </div>

                                <div v-if="current==4&&showLog==false">
                                    <Row>
                                        <Col span="4">
                                            选择来源
                                        </Col>
                                        <Col span="17">
                                            <hr style="margin-top:10px;height:1px;border:none;border-top:1px dashed #CCCCCC;" />
                                        </Col>
                                        <Col>
                                            <Button type="text" @click="setCurrentSetp(0)" size="small">修改</Button>
                                        </Col>
                                    </Row>
                                    <Row><p style="text-align:center"><b>数据源：</b>mysql_yuhang</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>表：</b>car</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>数据过滤：</b>未填写</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>切分键：</b>未填写</p></Row>
                                    <Row>
                                        <Col span="4">
                                            选择目标
                                        </Col>
                                        <Col span="17">
                                            <hr style="margin-top:10px;height:1px;border:none;border-top:1px dashed #CCCCCC;" />
                                        </Col>
                                        <Col>
                                            <Button type="text" @click="setCurrentSetp(1)" size="small">修改</Button>
                                        </Col>
                                    </Row>
                                    <Row><p style="text-align:center"><b>数据源：</b>mysql_yuhang</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>表：</b>car</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>导入前语句：</b>未填写</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>导入后语句：</b>未填写</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>主键冲突：</b>Replace Into</p></Row>
                                    <Row>
                                        <Col span="4">
                                            字段映射
                                        </Col>
                                        <Col span="17">
                                            <hr style="margin-top:10px;height:1px;border:none;border-top:1px dashed #CCCCCC;" />
                                        </Col>
                                        <Col>
                                            <Button type="text" @click="setCurrentSetp(2)" size="small">修改</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12"><Table :columns="fromSchemaOptions.columns" :data="fromSchemaOptions.data" style="margin-top:20px;margin-bottom:20px"></Table></Col>
                                        <Col span="12"><Table :columns="toSchemaOptions.columns" :data="toSchemaOptions.data" style="margin-top:20px;margin-bottom:20px"></Table></Col>
                                    </Row>
                                    <Row>
                                        <Col span="4">
                                            通道控制
                                        </Col>
                                        <Col span="17">
                                            <hr style="margin-top:10px;height:1px;border:none;border-top:1px dashed #CCCCCC;" />
                                        </Col>
                                        <Col>
                                            <Button type="text" @click="setCurrentSetp(2)" size="small">修改</Button>
                                        </Col>
                                    </Row>
                                    <Row><p style="text-align:center"><b>作业速率上限：</b>1 MB/s</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>作业并发数：</b>3</p></Row>
                                    <Row><p style="text-align:center;margin-top:10px"><b>错误记录最大数：</b>132</p></Row>
                                    <Button type="primary" @click="setCurrentSetp(3)" style="margin-top:30px;margin-left:8px;margin-bottom:20px">上一步</Button>
                                    <Button type="primary" @click="refreshPage()" style="margin-top:30px;margin-left:8px;margin-bottom:20px">保存</Button>
                                </div>
                                <div v-if="current==4&&showLog==true">
                                    <div>
                                        <p style="margin-bottom:10px"><b>日志 yuhang_mysql_car</b></p>
                                        <Input v-model="form['log']" type="textarea" :autosize="{minRows: 20,maxRows: 50}" readonly></Input>
                                    </div>
                                </div>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
        <div slot="footer"></div>
        <div class="popup">
          <router-view :key="$router.fullPath"></router-view>
        </div>
    </div>
</template>

<script>
    import dwhApi from '@/requests/dwh.http';
    import vSelect from 'vue-select';

    export default {
        components: {vSelect},
        data() {
            return {
                fromOptions: [
                    {
                        key: 'from_source_name', title: '数据源', typ: 'select', selectList: [
                            {label: 'source_1', value: 'source_1'},
                            {label: 'source_2', value: 'source_2'},
                        ]
                    },
                    {
                        key: 'from_table_name', title: '表', typ: 'select', selectList: [
                            {label: 'table_1', value: 'table_1'},
                            {label: 'table_2', value: 'table_2'},
                        ],
                    },
                    {key: 'filter', title: '数据过滤', typ: 'textarea'},
                    {key: 'split_key', title: '切分键', typ: 'textarea'}
                ],
                toOptions: [
                    {
                        key: 'to_source_name', title: '数据源', typ: 'select', selectList: [
                            {label: 'source_1', value: 'source_1'},
                            {label: 'source_2', value: 'source_2'},
                        ]
                    },
                    {
                        key: 'to_table_name', title: '表', typ: 'select', selectList: [
                            {label: 'table_1', value: 'table_1'},
                            {label: 'table_2', value: 'table_2'},
                        ],
                    },
                    {key: 'persistence_type', title: '持久化类型', typ: 'checkbox'},
                    {
                        key: 'sql_after_import', title: '导入后执行语句', typ: 'select', selectList: [
                            {label: 'table_1', value: 'table_1'},
                            {label: 'table_2', value: 'table_2'},
                        ],
                    }
                ],
                channelOptions: [
                    {
                        key: 'transmit_rate_limit', title: '作业速率上限', typ: 'select', selectList: [
                            {label: '1 MB/s', value: '1'},
                            {label: '5 MB/s', value: '5'},
                            {label: '10 MB/s', value: '10'},
                            {label: '20 MB/s', value: '20'}
                        ],
                    },
                    {
                        key: 'concurrency', title: '作业并发数', typ: 'select', selectList: [
                            {label: '1', value: '1'}, {label: '2', value: '2'},
                            {label: '3', value: '3'}, {label: '4', value: '4'},
                            {label: '5', value: '5'}, {label: '6', value: '6'},
                            {label: '7', value: '7'}, {label: '8', value: '8'},
                            {label: '9', value: '9'}, {label: '10', value: '10'},
                        ],
                    },
                    {key: 'error_limit', title: '错误记录数超过', placeholder: '超过该值则任务自动结束'}
                ],
                fromSchemaOptions: {
                    columns: [
                        {key: 'name', title: '源头表字段'},
                        {key: 'type', title: '类型'}
                    ],
                    data: [
                        {name: 'id', type: 'VARCHAR'}, {name: 'chepai', type: 'VARCHAR'}, {name: 'pinpai', type: 'VARCHAR'}
                    ]
                },
                toSchemaOptions: {
                    columns: [
                        {key: 'name', title: '源头表字段'},
                        {key: 'type', title: '类型'}
                    ],
                    data: [
                        {name: 'id', type: 'VARCHAR'}, {name: 'chepai', type: 'VARCHAR'}, {name: 'pinpai', type: 'VARCHAR'}
                    ]
                },
                showing: false,
                methodName: '添加',
                page: 0,
                current: 0,
                showLog: false,
                historyOptions: {
                    columns: [
                        {key: 'name', title: '历史记录'},
                    ],
                    data: [
                        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}
                    ]
                },
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
                    'type': 1,
                    'cluster_name': 'cluster_1',
                    'source_name': 'source_1',
                    'table_name': 'table_1',
                    'level': 0,
                    'permission': 3,
                    'owner_name': 'yangzhen',
                    'owner_cnname': '杨震',
                    'description': '',
                    'lifetime': 7,
                    'part': 0,
                    'schema': '',
                    'log': '正在提交...\n2017-10-17 13:34:34 INFO Current task status:RUNNING'
                },
                rulesValidation: {
                    name: [{required: true, message: '表名不能为空', type: 'string'}],
                }
            }
        },
        methods: {
            refreshPage () {
            },
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
            changeToLog() {
                this.showLog = true
            },
            changeSubPage(page) {
                if (page == 0) {
                    this.showLog = false
                    this.current = 0
                }
                this.page = page
            },
            setCurrentSetp(current) {
                // if (current == 0) {
                //     this.schemaOptions.data = this.getSchemaData()
                // } else if (current == 1) {
                //     let valid = true;
                //     this.$refs['form'].validate(ret => {
                //         if (!ret) {
                //             this.$Message.error("表单校验失败");
                //             valid = false;
                //         }
                //     });
                //     if (!valid) {
                //         return;
                //     }
                // }
                this.current = current
            },
            showSubmit() {
                this.$router.push('/dwh/task/edit/submit')
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
                dwhApi.createTask(params).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.setCurrentSetp(2)
                    } else if (error == 44000) {
                        this.$Message.error({
                            content: '任务名重名! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    } else {
                        this.$Message.error({
                            content: '提交信息出错! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    }
                });
            }
        },
        mounted() {
        },
        beforeRouteUpdate (to, from, next) {
            this.refreshPage()
            next()
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
        margin-left: 10px;
        width: 80%;
    }

    .padding-left {
        padding-left: 15px;
    }

    .margin-left {
        margin-left: 15px;
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
