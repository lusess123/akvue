<template>
  <Select 
    :multiple="multiple" 
    :placehoder="placeholder" 
    :value.sync="selected" 
    :debounce="debounce"
    :filterable="true"
    remote
    :remote-method="loaderDevices"
    :loading="loading"
    @on-change="onDeviceChange">
    <Option v-for="(option, index) in devices" :value="option.value" :key="option.id">{{option.value}}</Option>
  </Select>  
</template>

<script>
//import deviceApi from '@/requests/cmdb.http'
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入设备名/ip...'
    },
    value: {
      type: [Array, String],
      default: []
    }
  },
  data () {
    return {
      devices: [],
      selected: this.value,
      debounce: 500,
      loading: false
    }
  },
  methods: {
    onDeviceChange (devices) {
      this.$emit('on-device-change', devices)
      this.$emit('input', devices)
    },
    loaderDevices (key) {
      this.loading = true
      deviceApi.getDevices({keyword: key, query_type: 3}).then(resp => {
        this.devices = []
        this.devices = resp.data.data.datas.map(device => {
          return {label: device.hostname, value: device.ip, id: device.id}
        })
        this.loading = false 
      })
    }
  }
}
</script>

