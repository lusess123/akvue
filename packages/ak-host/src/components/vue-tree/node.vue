<template>
    <div class="tree-node">
        <div class="node">
      <span class="icon" @click="handleFold">
        <i class="fa" :class="iconClass"></i>
      </span>
      <span class="icon blue" v-if="isNotLeaf">
        <i class="fa" :class="nodeIconClass"></i>
      </span>

      <span class="name" :class="isSelected" @click="handleSelect" :title="name">{{name}}</span>
      <span class="add pointer" v-if="isNotLeaf" @click="handleAddNode"><i class="fa fa-plus-square-o"></i></span>
      <span class="del pointer" @click="handleDelNode" v-if="isNotRoot"><i class="fa fa-minus-square-o"></i></span>
    </div>
    <div class="children" v-if="hasChildren && isOpen">
      <Tree-node v-for="(node, key) in root.children"
                       :root="node" :key="node.id()" :node-add="nodeAdd" :node-del="nodeDel"
                       :node-expand="nodeExpand" :node-select="nodeSelect" :options="options"></Tree-node>
    </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'TreeNode',
  props: {
    root: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: {}
    },
    nodeExpand: {
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
    }
  },
  data () {
    return {
      emitter: this.$store.getters['ecs/emitter']
    }
  },
  computed: {
    name () {
      return this.root.name ? this.root.name() : '未知'
    },
    hasChildren () {
      return this.root.children
    },
    isOpen () {
      return this.root.open
    },
    isLeaf () {
      return this.root.ref().leaf
    },
    isNotLeaf () {
      return !this.root.ref().leaf
    },
    isNotRoot () {
      return this.root.ref().id
    },
    iconClass () {
      const icon = this.root.ref().icon || {}
      const isLeaf = this.root.ref().leaf
      if (isLeaf) {
        if (this.options.icon) {
          return this.options.icon[this.root.ref().category]
        }
        return icon
      }
      return this.root.loading
        ? 'fa-spinner spinner'
        : this.root.open ? 'fa-minus-square-o' : 'fa-plus-square-o'
    },
    nodeIconClass () {
      const icon = this.root.ref().icon
      if (_.isString(icon)) {
        return icon
      } else if (this.options.icon) {
        return this.options.icon[this.root.ref().category]
      } else if (!icon) {
        return this.root.open ? 'fa-folder-open-o' : 'fa-folder-o'
      }
      return this.root.open
        ? icon.open || 'fa-folder-open-o'
        : icon.closed || 'fa-folder-o'
    },
    isSelected () {
      let cls = ''
      if (this.isLeaf) {
        cls = 'leaf'
      }
      return this.root.selected ? `selected ${cls}` : cls
    }
  },
  methods: {
    handleFold () {
      if (this.root.open) {
        this.root.fold()
      } else {
        this.root.unfold()
        if (this.root.hasChildren() && this.root.loaded) {
          return
        }
        this.root.loading = true
        const children = this.nodeExpand('node-expand', this.root)
        if (_.isArray(children)) {
          this.$refs.tree.addNodes(this.root, children)
          this.root.loading = false
          this.root.loaded = true 
        } else if (_.isObject(children) && _.isFunction(children.then)) {
          children.then(
            data => {
              if (data && data.length) {
                this.$refs.tree.addNodes(this.root, data)
              }
              this.root.loading = false
              this.root.loaded = true 
            },
            () => {
              this.root.loading = false
              this.root.fold()
            }
          )
        } else {
          this.root.loading = false
        }
      }
    },
    handleSelect () {
      let path = this.$refs.tree.pathUp(this.root)
      if (!this.root.selected) {
        this.$refs.tree.select(this.root)
        this.nodeSelect('node-select', this.root, path)
      } else {
        this.nodeSelect('node-select', this.root, path)
      }
      path = null
    },
    handleAddNode () {
      const r = this.nodeAdd('node-add', this.root)
      if (_.isObject(r) && _.isFunction(r.then)) {
        r.then(data => {
          this.$refs.tree.addNode(this.root, data) 
        })
      } else if (_.isObject(r)) {
        this.$refs.tree.addNode(this.root, r)
      } else {
        console.log('please return a valid node info')
      }
    },
    handleDelNode () {
      const r = this.nodeDel('node-del', this.root)
      if (_.isObject(r) && _.isFunction(r.then)) {
        r.then(data => {
          this.$refs.tree.delNode(this.root) 
        })
      } else if (_.isObject(r) && r.code === 0) {
        this.$refs.tree.delNode(this.root)
      } else {
        console.log('please return a valid result')
      }
    }
  },
  created () {
    this.$refs.tree = this.$parent.$refs.tree
  },
  mounted () {
    this.self = this.$refs
  }
}
</script>

<style scoped>
.vue-tree,
.vue-tree .tree-node,
.vue-tree .node {
  text-align: left;
  position: relative;
}

.vue-tree .tree-node {
  padding-left: 20px;
}

.vue-tree > .tree-node:first-child {
  padding-left: 5px;
}

.vue-tree > .tree-node:first-child > .node::before {
  width: 0px;
}

.vue-tree .node::before {
  content: "";
  top: 10px;
  left: -9px;
  position: absolute;
  width: 9px;
  border-top: dashed 1px #333;
}

.vue-tree .children .tree-node::before {
  content: "";
  top: -5px;
  left: 10px;
  position: absolute;
  height: calc(100% - 2px);
  border-left: dashed 1px #333;
}

.vue-tree .children .tree-node:last-child::before {
  height: 16px;
}

.node .icon {
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  display: inline-block;
  width: 20px;
  height: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  cursor: pointer;
  vertical-align: bottom;
}

.icon.blue {
  color: #676a6c;
}

.node .name.leaf {
  width: calc(100% - 39px);
}

.node .name {
  display: inline-block;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  width: calc(100% - 77px);
  text-overflow: ellipsis;
  cursor: pointer;
  padding: 0px 5px 0px 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: bottom;
}

.node .name:hover,
.node .icon:hover {
  color: #57a3f3;
  background-color: #fff;
}

.node .name.selected {
  background-color: #dddee1;
  color: #333;
  border-radius: 3px;
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    -ms-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
.spinner {
  animation: spin 1.5s linear infinite;
}
.pointer {
  cursor: pointer;
}
.pointer:hover {
  color: #57a3f3;
}
</style>
