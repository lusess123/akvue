<template>
  <div v-clickoutside="hideSelf" class="vue-tree context-menu" v-if="visible" :style="{left: offsetLeft(), top: offsetTop()}">
    <div class="menu-item" v-for="action in actions" :key="action" @click="popup(action)">
      <i class="fa" :class="actionClass(action)"></i>
      {{action}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      target: this.$refs.tree.contextmenu
    }
  },
  methods: {
    popup (action) {
      this.$refs.tree.contextmenu.show = false
      console.log(this.$refs.tree.contextmenu)
    },
    actionClass (action) {
      if (action === 'add') {
        return 'fa-plus'
      } else if (action === 'delete') {
        return 'fa-trash'
      } else {
        return 'fa-file'
      }
    },
    offsetLeft () {
      return `${this.$refs.tree.contextmenu.target.offset.left + 15}px`
    },
    offsetTop () {
      return `${this.$refs.tree.contextmenu.target.offset.top + 25}px`
    },
    hideSelf () {
      this.$refs.tree.contextmenu.show = false
    },
    forceUpdate () {
      this.$forceUpdate()
    }
  },
  computed: {
    visible () {
      return this.$refs.tree.contextmenu.show
    }
  },
  created () {
    this.$refs.tree = this.$parent.tree
  },
  mounted () {
  }
}
</script>

<style scoped>
  .context-menu {
    position: fixed;
    display: inline-block;
    width: 120px;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    white-space: nowrap;
  }
  .context-menu .menu-item {
    box-sizing:border-box;
    width: 100%;
    text-align: left;
    padding: 5px 0 5px 15px;
    cursor: pointer;
    border-bottom: 1px solid #dddee1;
    transition: all .15s linear;
  }
  .context-menu .menu-item:hover {
    color: #57a3f3;
    background-color: #fff;
  }
  .context-menu .menu-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .context-menu .menu-item:last-child {
    border-bottom: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .context-menu .menu-item > i {
    width: 20px;
  }
</style>
