<template>
  <Form :label-width="100" ref="$form" :model="value" :rules="rules">
    <div :key="opt.key" v-for="opt in options">
        <Form-item :label="opt.title" :prop="opt.key">
            <div v-if="opt.type == 'select'">
                <Select v-model="value[opt.key]" @on-change="handleChange(opt)" placeholder="请选择">
                    <Option :key="item.value" v-for="item in opt.selectList" :value="item.value">{{item.label}}</Option>
                </Select>
            </div>
            <div v-else-if="opt.type == 'mutiselect'">
                <Select multiple  v-model="value[opt.key]" placeholder="请选择" @on-change="handleChange(opt)">
                    <Option :key="item.value" v-for="item in opt.selectList" :value="item.value">{{item.label}}</Option>
                </Select>
            </div>
            <div v-else-if="opt.type == 'datetime'">
                <DatePicker confirm v-model="value[opt.key]" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间" style="width:200px" @on-change="handleChange(opt)"></DatePicker>
            </div>
            <div v-else-if="opt.type == 'checkbox'">
                <Checkbox v-model="value[opt.key]"></Checkbox>
            </div>
            <div v-else-if="opt.type == 'radio'">
                <Radio-group v-model="value[opt.key]">
                    <Radio :key="item.value" v-for="item in opt.radioList" :label="item.value">{{item.label}}</Radio>
                </Radio-group>
            </div>
            <div v-else-if="opt.type == 'number'">
                  <InputNumber :max="100" :min="1" v-model="value[opt.key]"></InputNumber>
            </div>
            <div v-else-if="opt.type == 'textarea'">
                <Input v-model="value[opt.key]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="opt.notes"></Input>
            </div>
            <div v-else-if="opt.type == 'select2'" class="v-border">
                <v-select multiple :value.sync="value[opt.key]" :options="opt.selectList">
                    <p slot="no-options">暂无数据</p>
                </v-select>
            </div>
            <div v-else-if="opt.type == 'date'">
                <Date-picker type="datetimerange" :disabled-date="opt.disabledDate" v-model="value[opt.key]" format="yyyy-MM-dd HH:mm:ss" placeholder="选择变更日期"></Date-picker>
            </div>
            <div v-else-if="opt.type == 'markdown'">
                <Input v-model="value[opt.key]" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :placeholder="opt.notes"></Input>
                <p class="dashed">注：支持markdown方式。</p>
            </div>
            <div v-else-if="opt.type === 'cascader'">
              <Cascader :data="opt.cascaderList" :load-data="opt.loadService" v-model="value[opt.key]"></Cascader>
            </div>
            <div v-else-if="opt.type === 'switch'">
              <Switch size="large" v-model="value[opt.key]" :true-value="opt.trueOpt.value" :false-value="opt.falseOpt.value">
                <span slot="open">{{opt.trueOpt.label}}</span>
                <span slot="close">{{opt.falseOpt.label}}</span>
              </Switch>
            </div>
            <div v-else-if="opt.type === 'switch-tag'">
              <Tag size="large" :color="opt.color ? opt.color(value[opt.key]) : 'blue'">
                {{opt[value[opt.key]]}}
              </Tag>
            </div>
            <div v-else-if="opt.type === 'user'">
              <wf-user-select v-model="value[opt.key]" :multiple="false"></wf-user-select>
            </div>
            <div v-else-if="opt.type === 'users'">
              <user-select v-model="value[opt.key]" :multiple="true"></user-select>
            </div>
            <div v-else-if="opt.type === 'devices'">
              <device-select v-model="value[opt.key]" :multiple="true"></device-select>
            </div>
            <div v-else-if="opt.type == 'label'" >
                <div class="lw-label">{{value[opt.key]}}</div>
            </div>
            <div v-else-if="opt.type == 'readonly'" >
                <Input v-model="value[opt.key]" placeholder="请输入" readonly></Input>
            </div>
            <div v-else>
                <Input v-model="value[opt.key]" placeholder="请输入"></Input>
            </div>
            <div class="suffix">
              <div class="suffix-tooltip" v-if="!!opt.tooltip">
                  <Tooltip placement="top">
                      <div style="white-space: normal; width: 150px" slot="content">{{opt.tooltip}}
                      </div>
                      <Icon type="help-circled"></Icon>
                  </Tooltip>
              </div>
            </div>
        </Form-item>
    </div>

    <Form-item v-if="action">
        <Button type="primary" @click="handleSubmit('$form')" :loading="loading">提交</Button>
        <Button type="ghost" @click="handleCancel('$form')">取消</Button>
    </Form-item>
  </Form>
</template>

<script>
import vSelect from "vue-select"
import userSelect from '@/components/user'
import wfUserSelect from '@/components/wf-user'
import deviceSelect from '@/components/device'
import vMarkdown from "vue-markdown"
export default {
  components: { vSelect, vMarkdown, userSelect, deviceSelect, wfUserSelect },
  props: {
    rules: {
      type: Object,
      default: {}
    },
    value: {
      type: Object,
      default: {}
    },
    options: {
      type: Array,
      default: []
    },
    action: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleSubmit (name) {
      let valid = true
      this.$refs[name].validate(ret => {
        if (!ret) {
          this.$Message.error("表单校验失败")
          valid = false
        }
      })
      if (valid) {
        this.$emit('submit', this.value)
      }
    },
    handleReset (name) {
      this.$nextTick(function () {
        this.$refs[name].resetFields()
        this.$forceUpdate()
        console.log(this.value)
        this.$emit('input', this.value)
      })
    },
    handleCancel () {
      this.$router.go(-1)
    },
    handleChange (opt) {
      this.$emit('on-change', opt, this.value)
    },
    validate () {
      let valid = true
      this.$refs['$form'].validate(ret => {
        if (!ret) {
          valid = false
        }
      })
      return valid
    }
  }
}
</script>

<style scoped>
.sub-form .ivu-form-item-error-tip {
  top: 24px;
  left: 20px;
}

.options {
  width: 60px;
  display: inline-block;
}

.suffix-tooltip {
  font-size: 18px;
  color: #999c9e;
  line-height: 22px;
  height: 22px;
  vertical-align: middle;
  display: inline-block;
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
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.v-select .el-select .el-input__inner:focus {
  border-color: #57a3f3;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}

.ws-header {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid #fff;
}
.ws-header .header {
  font-size: 15px;
  font-weight: bold;
}
.ws-header .creator {
  font-size: 15px;
  font-weight: bold;
  float: right;
}
.device.add {
  padding: 0px;
  width: 80%;
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
  left: calc(100% - 5px);
}
.lw-label {
  display: inline-block;
  width: 100px;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
</style>
