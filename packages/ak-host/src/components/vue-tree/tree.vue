<template>
  <div class="vue-tree">
    <tree-node :root="rootNode" :node-expand="nodeExpandChange" :node-select="nodeSelect" 
               :node-add="nodeAdd" :node-del="nodeDel" :options="options"></tree-node>
  </div>
</template>

<script>
import Vue from 'vue'
import Tree from './tree'
import TreeNode from './node.vue'
import clickoutside from './clickoutside'
Vue.directive('clickoutside', clickoutside)
export default {
  name: 'VueTree',
  components: { TreeNode },
  props: {
    root: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: () => { return {} }
    },
    nodeExpandChange: {
      type: [Function, Promise],
      default: () => {}
    },
    nodeSelect: {
      type: [Function, Promise],
      default: () => {}
    },
    nodeAdd: {
      type: [Function, Promise],
      default: () => {}
    },
    nodeDel: {
      type: [Function, Promise],
      default: () => {}
    },
    init: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tree: {},
      self: this,
      contextAction: ['add', 'delete'],
      emitter: this.$store.getters['ecs/emitter']
    }
  },
  computed: {
    loaded () {
      return Object.keys(this.tree) > 0
    },
    rootNode: {
      get () {
        return this.tree.root() || {}
      },
      set () {}
    }
  },
  watch: {
    root: {
      deep: true,
      handler () {
        this.tree.update(this.root)
      }
    }
  },
  methods: {
  },
  created () {
    this.tree = new Tree(this.root)
    this.rootNode = this.tree.root()
    this.$refs.tree = this.tree
  },
  mounted () {
    if (this.init) {
      // this.nodeExpandChange('node-expand', this.tree.root())
    }
  }
}
</script>

<style>
    .vue-tree > .tree-node > .node::before {
      width: 0px;
      border-top: none;
    }
    * {
        box-sizing: border-box;
    }
</style>
