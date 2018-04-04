<template>
  <transition name="fade">
  <div class="rich-form" v-show="visible">
  <Form :label-width="100" ref="optionForm" @submit.native.prevent>
      <div v-for="val in options" :key="val.value">
          <Form-item :label="val.label" :prop="val.value">
              <div v-if="val.type == 'select'">
                  <Select v-model="applyForm[val.key]" placeholder="请选择">
                      <Option v-for="item in val.selectList" :value="item.value" :key="item.value">
                        {{item.label}}
                      </Option>
                  </Select>
                  <a v-if="val.refresh" class="abs-suffix" @click="getBugCategories"><Icon type="refresh"></Icon></a>
              </div>
              <div v-else-if="val.type == 'checkboxList'">
                  <Checkbox :indeterminate="val.indeterminate" :value="val.checkAll" @on-change="toggleChecked(val)">全部</Checkbox>
                  <CheckboxGroup v-model="val.checkAllGroup" @on-change="checkAllGroupChange(val)">
                    <Checkbox :label="item.value" v-for="item in val.tags" :key="item.value" :value="item.checked">
                      <span>{{item.label}}</span>
                    </Checkbox>
                  </CheckboxGroup>
              </div>
              <div v-else-if="val.type == 'tags'">
                  <lw-tag :checkable="!val.all" v-model="val.all" class="transitioned" color="blue"  @on-change="toggleTagAll(val)">全部</lw-tag>
                  <lw-tag checkable v-model="item.checked" class="transitioned" v-for="item in val.tags" color="blue"  :key="item.value" @on-change="toggleTag(item, val)">{{item.label}}</lw-tag>
              </div>

              <div v-else-if="val.type == 'radio'">
                  <Radio-group v-model="val.radios">
                      <Radio v-for="item in val.radioList" :label="item.value" :key="item.value">{{item.label}}</Radio>
                  </Radio-group>
                  </div>
              <div v-else-if="val.type == 'textarea'">
                  <Input v-model="val.value" type="textarea" :autosize="{minRows: 1,maxRows: 2}" :placeholder="val.notes"></Input>
              </div>
              <div v-else>
              </div>
          </Form-item>
      </div>
      <Form-item label="条件过滤">
        <div v-for="(opt, index) in searchs" :key="opt.name" style="margin-bottom:5px;">
          <Select v-model="opt.name" class="filter-search-name" placeholder="关键字" placement="top">
            <Option v-for="item in conditions.options" :value="item.value" :key="item.value">
              {{item.label}}
            </Option>
          </Select>
          <Select v-model="opt.rule" class="filter-search-rule" placeholder="条件" placement="top">
            <Option v-for="item in dynamicRules(opt.name)" :value="item.value" :key="item.value">
              {{item.label}}
            </Option>
          </Select>
          <Input v-model="opt.value" class="filter-search-value" placeholder="数值"></Input>
          <Icon type="close" @click.native="handleDel(index)" class="filter-search-close"></Icon>
        </div>
        <Button type="dashed" @click="handleAdd" icon="plus-round">增加过滤项</Button>
        <Button type="primary" @click="handleSearch" icon="search">搜索</Button>
      </Form-item>
  </Form>
    <div class="form-footer" @click="close">
      <Icon type="ios-close-outline"></Icon> 
    </div>
  </div>
  </transition>
</template>

<script>
import _ from 'lodash'
import LwTag from '@/components/tag'
export default {
  components: { LwTag },
  props: {
    options: {
      type: [Array, Object],
      default: []
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: {},
      visible: this.value,
      search: '',
      formOptions: _.merge([], this.options),
      conditions: {options: []},
      searchs: [{name: '', value: '', rule: ''}]
    }
  },
  methods: {
    handleAdd () {
      this.searchs.push({name: '', value: '', rule: ''})
    },
    handleDel (index) {
      this.searchs.splice(index, 1)
    },
    dynamicRules (name) {
      let rules = []
      this.conditions.options.map(item => {
        if (item.value === name) {
          rules = item.rules
        }
      })
      return rules
    },
    toggleChecked (option) {
      if (option.indeterminate) {
        option.checkAll = false
      } else {
        option.checkAll = !option.checkAll
      }
      option.indeterminate = false
      if (option.checkAll) {
        option.checkAllGroup = []
        option.tags.map(tag => {
          option.checkAllGroup.push(tag.value)
        })
      } else {
        option.checkAllGroup = []
      }
    },
    checkAllGroupChange (data) {
      if (data.checkAllGroup.length === data.tags.length) {
        data.indeterminate = false
        data.checkAll = true
      } else if (data.checkAllGroup.length > 0) {
        data.indeterminate = true
        data.checkAll = false
      } else {
        data.indeterminate = false
        data.checkAll = false
      }
    },
    toggleTag (item, option) {
      let isAllUnchecked = true 
      option.tags.map(tag => {
        if (tag.checked) {
          isAllUnchecked = false
        }
      })
      if (isAllUnchecked) {
        option.all = true 
      } else {
        option.all = false
      }
      this.$emit('on-change', this.options, this.searchs)
    },
    toggleTagAll (option) {
      option.all = true
      option.tags.map(tag => {
        tag.checked = false
      })
      this.$emit('on-change', this.options, this.searchs)
    },
    isChecked (item) {
      return item.checked
    },
    clearInput (val) {
      if(this.search) {
        this.search = ''
        val.value = ''
        this.$emit('on-change', this.options, this.searchs)
      }
    },
    handleInput (val) {
      val.value = this.search
      this.$emit('on-change', this.options, this.searchs)
    },
    close () {
      this.visible = false
      this.reset()
      this.$emit('input', false)
      this.$emit('on-close', this.options)
    },
    reset () {
      this.options.map( option => {
        if (option.type === 'tags') {
          option.all = true 
          option.tags.map(tag => {
            tag.checked = false
          })
        } else if (option.type === 'search') {
          this.search = ''
          option.value = ''
        }
      })
      this.searchs = [{value: '', name: '', rule: ''}]
    },
    getSearchTag () {
      cmdbApi.getSearchTag({}).then(resp => {
        this.conditions.options = resp.data.data.options
      })
    },
    handleSearch () {
      this.$emit('on-change', this.options, this.searchs)
    }
  },
  watch: {
    value (val) {
      this.visible = val
    }
  },
  mounted () {
    //this.getSearchTag() 
  }
}
</script>

<style scoped>
.rich-form .ivu-form-item {
  margin-bottom: 0px;
}
.transitioned {
  transition: all 0.2s linear;
}
.search-input {
  width: 300px;
}
.rich-form {
  position: relative;
  border: 1px solid #dddee1;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
.rich-form .form-footer {
  position: relative;
  bottom: -20px;
  left: -20px;
  width: calc(100% + 40px);
  text-align: center;
  cursor: pointer;
}
.form-footer i {
  font-size: 20px;
  line-height: 30px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s linear;
}
.fade-enter,
.fade-leave-to {
  height: 0;
  overflow: hidden;
  padding: 0;
  opacity: 0;
}

.filter-search-name {
  display: inline-block;
  width: 150px;
}
.filter-search-rule {
  display: inline-block;
  width: 100px;
}
.filter-search-value {
  display: inline-block;
  width: 200px;
}
.filter-search-close {
  margin-left: 5px;
  cursor: pointer;
}
</style>

