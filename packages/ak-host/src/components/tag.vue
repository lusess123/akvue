<template>
        <div :class="classes" @click.stop="check">
            <span :class="dotClasses" v-if="showDot"></span><span :class="textClasses"><slot></slot></span>
        </div>
</template>
<script>
import { oneOf } from '@/utils/tool'
const prefixCls = 'ivu-tag'
export default {
  name: 'lwTag',
  props: {
    closable: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      validator (value) {
        return oneOf(value, ['blue', 'green', 'red', 'yellow', 'default'])
      }
    },
    type: {
      validator (value) {
        return oneOf(value, ['border', 'dot'])
      }
    },
    name: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isChecked: this.value
    }
  },
  computed: {
    classes: {
      cache: false,
      get () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.color}`]: !!this.color,
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-closable`]: this.closable,
            [`${prefixCls}-checked`]: this.isChecked
          }
        ]
      }
    },
    textClasses () {
      return `${prefixCls}-text`
    },
    dotClasses () {
      return `${prefixCls}-dot-inner`
    },
    showDot () {
      return !!this.type && this.type === 'dot'
    }
  },
  watch: {
    value (val) {
      this.isChecked = this.value 
    }
  },
  methods: {
    close (event) {
      if (this.name === undefined) {
        this.$emit('on-close', event)
      } else {
        this.$emit('on-close', event, this.name)
      }
    },
    check () {
      if (!this.checkable) return
      const checked = !this.isChecked
      this.isChecked = checked
      this.$emit('input', checked)
      if (this.name === undefined) {
        this.$emit('on-change', checked)
      } else {
        this.$emit('on-change', checked, this.name)
      }
    }
  }
}
</script>
