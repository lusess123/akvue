<template>
  <Select 
    :multiple="multiple" 
    :placehoder="placeholder" 
    :value.sync="selected" 
    :filterable="true"
    remote
    :remote-method="loaderUsers"
    :loading="loading"
    @on-change="onUserChange">
    <Option v-for="(option, index) in users" :value="option.label" :key="option.value">{{option.label}}</Option>
  </Select>  
</template>

<script>
import _ from 'lodash'
import userApi from '@/requests/user.http'
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入用户名...'
    },
    value: {
      type: [Array, String],
      default: []
    }
  },
  data () {
    return {
      users: [],
      selected: this.value,
      debounce: 500,
      loading: false
    }
  },
  methods: {
    onUserChange (users) {
      this.$emit('on-user-change', users)
      this.$emit('input', users)
    },
    loaderUsers (key) {
      this.loading = true
      userApi.search_user({key: key}).then(resp => {
        if (!_.isArray(resp.data.content)) {
          return []
        }
        this.users = resp.data.content.map(user => {
          return {label: user.name, value: user.userName}
        })
        this.loading = false 
      })
    }
  },
  mounted() {
    if (this.value) {
      this.selected = this.value
    }
  }
}
</script>

