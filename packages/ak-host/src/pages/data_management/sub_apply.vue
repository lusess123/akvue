<template>
    <div>
    <Modal v-model="showing" @on-cancel="closeApply" width="700">
        <div class="content">
            <div class="banner2">
                <h3 style="text-align: center;margin-bottom: 10px;">订阅授权申请</h3>
                <v-form 
                    :options="currentOptions" 
                    :rules="rulesValidation" 
                    :loading="loading"
                    v-model="currentForm" 
                    @submit="handleSubmit" 
                    @on-change="handleSelectChange">
                </v-form> 
            </div>
        </div>
        <div slot="footer"></div>
    </Modal>
    </div>
</template>

<script>
    import dwhApi from '@/requests/dwh.http';
    import vSelect from 'vue-select';
    import vForm from '@/components/form';

    export default {
        components: {vForm},
        data() {
            return {
                showing: false,
                methodName: '添加',
                loading: false,
                subscriptionOptions: [
                    {key: 'table_name', title: '表名', type: 'readonly'},
                    {key: 'proxy', title: '权限归属人', type: 'radio', radioList: [
                        {label: '本人申请', value: 0},
                        {label: '代理申请', value: 1}
                    ]},
                    {key: 'auth_user', title: '授权人', type: 'user'},
                    {
                        key: 'priority', title: '优先级', type: 'select', selectList: [
                            {label: 'P0', value: 0},
                            {label: 'P1', value: 1},
                            {label: 'P2', value: 2},
                        ],
                    },
                    {key: 'type', title: '订阅类型', type: 'radio', radioList: [
                        {label: '实时订阅', value: 1},
                        {label: '离线订阅', value: 2}
                    ]},
                    {key: 'expire_time', title: '权限有效期', type: 'number', placeholder: '请输入申请时长(天)'},
                    {key: 'remark', title: '申请理由', type: 'textarea'},
                ],
                subscriptionForm: {
                    'table_name': '',
                    'source_name': '',
                    'level': 1,
                    'proxy': 0,
                    'apply_user_name': this.$store.state.auth.user.UserName,
                    'apply_user_cnname': this.$store.state.auth.user.Name,
                    'auth_user': '',
                    'auth_user_name': '',
                    'auth_user_cnname': '',
                    'owner_name': '',
                    'priority': 0,
                    'type': 1,
                    'expire_time': 0,
                    'remark': '',
                },
                currentOptions: [],
                currentForm: {},
                rulesValidation: {
                    name: [{required: true, message: '数据源名称不能为空', type: 'string'}],
                    auth_user: [{required: true, message: '授权人不能为空', type: 'string'}],
                    expire_time: [{required: true, message: '权限有效期不能为空', type: 'integer'}],
                    remark: [{required: true, message: '申请理由不能为空', type: 'string'}]
                }
            }
        },
        methods: {
            get_auth_user() {
                if (this.subscriptionForm.proxy == 0) {
                    this.subscriptionForm.auth_user_name = this.$store.state.auth.user.UserName
                    this.subscriptionForm.auth_user_cnname = this.$store.state.auth.user.Name
                } else {
                    let user = this.subscriptionForm.auth_user
                    this.subscriptionForm.auth_user_name = user.split('|')[0]
                    this.subscriptionForm.auth_user_cnname = user.split('|')[1]
                }
            },
            refreshPages() {
            },
            setCurrent() {
                this.currentOptions = this.subscriptionOptions;
                this.currentForm = this.subscriptionForm;
            },
            handleSelectChange(val) {
            },
            handleSubmit(name) {
                this.get_auth_user()
                const params = this.subscriptionForm;
                dwhApi.createSubscription(params).then(resp => {
                    let error = resp.data.error
                    if (error == 0) {
                        this.$Message.info({
                            content: '成功，跳转到数据表界面!', onClose: () => {
                                this.$router.go(-1)
                            }, duration: 2, closable: false
                        });
                    } else {
                        this.$Message.error({
                            content: '申请授权出错! ' + error, onClose: () => {
                            }, duration: 2, closable: false
                        });
                    }
                });
            },
            closeApply() {
                setTimeout(() => {
                    this.$router.go(-1)
                }, 200)
            },
            closeApplyNow() {
                this.$router.go(-1)
            },
        },
        mounted() {
            this.subscriptionForm.table_name = this.$route.query.name
            this.subscriptionForm.source_name = this.$route.query.source_name
            this.subscriptionForm.owner_name = this.$route.query.owner_name
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
