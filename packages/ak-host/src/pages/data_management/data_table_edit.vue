<template>
    <div>
    <Modal v-model="showing" @on-cancel="closeAdd" width="900">
        <div class="content">
            <div class="banner2">
                <h3 style="text-align: center;margin-bottom: 10px;">表管理</h3>
                <Form :label-width="100" ref="dataTableForm" :model="dataTableForm" :rules="rulesValidation">
                    <div v-for="val in dataTableOptions" :key="val.key">
                        <Form-item :label="val.title" :prop="val.key" v-if="!val.hide">
                            <div v-if="val.typ == 'vue-select'" class="v-select">
                                <Select
                                    v-model="dataTableForm[val.key]"
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
                                <Select v-model="dataTableForm[val.key]" :placement="val.placement || 'top'"
                                        placeholder="请选择" @on-change="handleSelectChange(val)">
                                    <Option v-for="item in val.selectList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                            </div>
                            <div v-else-if="val.typ == 'checkbox'">
                                <Checkbox v-model="dataTableForm[val.key]"
                                          @on-change="handleSelectChange(val)"></Checkbox>
                            </div>
                            <div v-else-if="val.typ == 'radio'">
                                <Radio-group v-model="dataTableForm[val.key]" @on-change="handleSelectChange(val)">
                                    <Radio v-for="item in val.radioList" :label="item.value" :key="item.value">{{item.label}}</Radio>
                                </Radio-group>
                            </div>
                            <div v-else-if="val.typ == 'date'">
                                <Date-picker v-model="dataTableForm[val.key]" placement="right" type="datetime"
                                             format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间（不含秒）"
                                             style="width: 200px"></Date-picker>
                            </div>
                            <div v-else-if="val.typ == 'textarea'">
                                <Input v-model="dataTableForm[val.key]" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}" :placeholder="val.notes"></Input>
                            </div>
                            <div v-else-if="val.typ == 'readonly'">
                                <Input v-model="dataTableForm[val.key]" placeholder="请输入" readonly></Input>
                            </div>
                            <div v-else-if="val.typ == 'container'" class="v-border">
                                <Form :label-width="100" style="margin-top: 5px">
                                    <div v-for="(path, index) in dataTableForm[val.key]" class="sub-form" :key="index">
                                        <!--<div style="position: absolute;left: 20px;z-index:199"><strong>{{index+1}}.</strong></div>
                                        <div style="position: absolute;right: 40px;z-index:199"><a @click="delCurrentSlice(dataTableForm[val.key], index)" class="pointer">X</a></div>-->
                                        <div v-for="subVal in val.children" style="margin: 5px auto" :key="subVal.key">
                                            <Form-item :prop="subVal.key" :label="subVal.title">
                                                <div v-if="subVal.typ == 'select'">
                                                    <Select v-model="dataTableForm[val.key][index][subVal.key]"
                                                            placeholder="请选择" @on-change="handleSelectChange">
                                                        <Option v-for="item in val.selectList" :value="item.value" :key="item.value">
                                                            {{item.label}}
                                                        </Option>
                                                    </Select>
                                                </div>
                                                <div v-else-if="subVal.typ == 'radio'">
                                                    <Radio-group v-model="dataTableForm[val.key][index][subVal.key]">
                                                        <Radio v-for="item in subVal.radioList" :label="item.value" :key="item.value">
                                                            {{item.label}}
                                                        </Radio>
                                                    </Radio-group>
                                                </div>
                                                <div v-else-if="val.typ == 'textarea'"
                                                     style="width: 70%; display: inline-block">
                                                    <Input v-model="dataTableForm[val.key][index][subVal.key]"
                                                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                                           placeholder="请输入..."></Input>
                                                </div>
                                                <div v-else style="width: 70%;display: inline-block">
                                                    <Input v-model="dataTableForm[val.key][index][subVal.key]"
                                                           placeholder="请输入"></Input>
                                                </div>
                                            </Form-item>
                                        </div>
                                    </div>
                                </Form>
                                <!--<Button style="margin: 10px 0 10px 20px" type="dashed" @click="addContainerItem(dataTableForm[val.key], val.key)" icon="plus-round">新增</Button>-->
                            </div>
                            <div v-else-if="val.typ == 'number'">
                                <Input v-model="dataTableForm[val.key]" placeholder="请输入">
                                <div class="options" v-if="!!val.optionList" slot="append">
                                    <Select v-model="val.unit" placeholder="请选择">
                                        <Option v-for="item in val.optionList" :value="item.value" :key="item.value">{{item.label}}
                                        </Option>
                                    </Select>
                                </div>
                                </Input>
                            </div>
                            <div v-else>
                                <Input v-model="dataTableForm[val.key]" placeholder="请输入"></Input>
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
                        <Row>
                            <Table ref="$table" :columns="schemaOptions.columns" :data="schemaOptions.data" border=""></Table>
                        </Row>
                        <Row style="margin-top: 10px">
                            <Button icon="ios-plus-empty" type="dashed" @click="addField()">新增字段</Button>
                        </Row>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('dataTableForm')" style="margin-left: 8px">提交</Button>
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
                dataTableOptions: [
                    {key: 'name', title: '表名', typ: 'readonly'},
                    {key: 'cnname', title: '中文名', typ: 'readonly'},
                    {key: 'cluster_name', title: '集群', typ: 'readonly'},
                    {
                        key: 'lifetime', title: '生命周期', typ: 'select', selectList: [
                            {label: '永久', value: 0},
                            {label: '一周', value: 7},
                            {label: '32天', value: 32},
                        ],
                    },
                    {key: 'description', title: '描述'},
                    {key: 'owner_cnname', title: 'owner'},
                    {key: 'schema', title: '字段信息', typ: 'textarea'},
                ],
                dataTableForm: {
                    'id': 0,
                    'name': '',
                    'cnname': '',
                    'cluster_name': '',
                    'lifetime': 0,
                    'description': '',
                    'owner_cnname': '',
                    'schema': '',
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
                rulesValidation: {
                    name: [{required: true, message: '数据表名称不能为空', type: 'string'}],
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
                const params = this.dataTableForm;
                dwhApi.updateDataTable(params).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.$Message.info({
                            content: '成功，跳转到数据表管理界面!', onClose: () => {
                                this.$router.push({path: '/dwh/table/manage'});
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
            closeAdd() {
                setTimeout(() => {
                    this.$router.push('/dwh/table/manage')
                }, 200)
            },
            closeAddNow() {
                this.$router.push('/dwh/table/manage')
            },
        },
        mounted() {
            this.dataTableForm.id = this.$route.params.id || 0;
            if (this.dataTableForm.id > 0) {
                this.dataTableForm.name = this.$route.query.name
                this.dataTableForm.cnname = this.$route.query.cnname
                this.dataTableForm.cluster_name = this.$route.query.cluster_name
                this.dataTableForm.lifetime = this.$route.query.lifetime
                this.dataTableForm.description = this.$route.query.description
                this.dataTableForm.owner_cnname = this.$route.query.owner_cnname
            }
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
        width: 90%;
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
