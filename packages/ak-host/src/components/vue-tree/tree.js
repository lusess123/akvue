import _ from 'lodash'
import Node from './node'
import arrayDiff from './brute'

class Tree {
  constructor (root) {
    this._ref = root
    this._root = null
    this._stack = []
    this._nodes = []
    this.build()
  }
  _build (root) {
    let _root = new Node(root)
    this._stack.push(_root)
    while (this._stack.length) {
      const node = this._stack.pop()
      this._nodes.push(node)
      const orig = node.ref()
      if (orig.children && orig.children.length) {
        for (let i = 0; i < orig.children.length; i++) {
          const child = new Node(orig.children[i])
          node.addChild(child)
          this._stack.push(child)
        }
      }
    }
    return _root
  }
  build () {
    this._root = this._build(this._ref)
  }
  rebuild () {
    this._nodes = []
    this.build()
  }
  root () {
    return this._root
  }
  nodes () {
    return this._nodes
  }
  search (name) {
    return this._nodes.filter(item => {
      return item.name.includes(name)
    })
  }
  find (key, val) {
    return this._nodes.filter(item => {
      return Object.keys(item).indexOf(key) > -1 ? item[key].includes(val) : false
    })
  }
  index (nodeId) {
    let index = -1
    for (let i = 0; i < this._nodes.length; i++) {
      if (nodeId === this._nodes[i].id()) {
        index = i
        break
      }
    }
    return index
  }
  addNode (parent, option) {
    const node = new Node(option)
    if (parent.findChild(node)) {
      return 'Node already exists'
    }
    const r = parent.addChild(node) ? this._nodes.push(node) : 'Adding new node failed'
    return r
  }
  addChildren (parentId, options) {
    options.map(option => {
      this.addNode(parentId, option)
    })
  }
  delNode (node) {
    const r = node.getParent().delChild(node.id()) ? this._nodes.splice(this.index(node.id()), 1) : 'Deleting node failed'
    return r
  }
  addNodeProperties (name, defaultValue, stats, icons) {
    this._nodes.map(item => {
      item.set(name, defaultValue)
      item.set(name + '_stats', stats)
      item.set(name + '_icons', icons)
    })
  }
  addNodes (refNode, nodeArray) {
    if (_.isArray(nodeArray) && nodeArray.length) {
      for (let i = 0; i < nodeArray.length; i++) {
        this.addNode(refNode, nodeArray[i])
      }
    } else if (_.isObject(nodeArray)) {
      this.addNode(refNode, nodeArray)
    } else {
      console.log(nodeArray, 'invalid, should be array/object')
    }
    return refNode
  }
  update (root) {
    let nodeQueue = []
    let delQueue = []
    let insQueue = []
    let left = []
    let right = []
    nodeQueue.push({left: this._root, right: root})
    while (nodeQueue.length) {
      let parent = nodeQueue.shift()
      left = parent.left.children
      right = parent.right.children
      if (this._bad(right)) {
        right = []
      }
      const r = arrayDiff(left, right)
      for (let i = 0; i < r.DEL.length; i++) {
        delQueue.push({node: r.DEL[i], parent: parent.left})
      }
      for (let i = 0; i < r.ADD.length; i++) {
        insQueue.push({data: r.ADD[i], parent: parent.left})
      }
      for (let i = 0; i < r.SAME.length; i++) {
        nodeQueue.push({left: r.SAME[i].left, right: r.SAME[i].right})
      }
    }
    this._add(insQueue)
    this._del(delQueue)
  }
  pathUp (node) {
    let ref = node
    let path = []
    while (ref) {
      path.unshift(ref)
      ref = ref.getParent()
    }
    return path
  }
  _bad (a) {
    if (!a) {
      return true
    }
    return false
  }
  costFunc (a, b) {
    if (a.ref().name === b.name) {
      return 0
    }
    return 1
  }
  _del (delQueue) {
    while (delQueue.length) {
      const info = delQueue.shift()
      this.delNode(info.node)
    }
    delQueue = []
  }
  _add (insQueue) {
    while (insQueue.length) {
      const info = insQueue.shift()
      const node = this._build(info.data)
      info.parent.addChild(node)
    }
  }
  unSelect (node) {
    if (this.selected && node.id() !== this.selected.id()) {
      this.selected.unselect()
      this.selected = null
    }
  }
  select (node) {
    this.unSelect(node)
    node.select()
    this.selected = node
  }
  use (plugin) {
    plugin.install(this)
  }
}

export default Tree
