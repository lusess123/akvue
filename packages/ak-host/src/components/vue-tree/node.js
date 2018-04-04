import { uuidV4 } from './util'
import _ from 'lodash'

class Node {
  constructor (options) {
    this._data = _.extend({}, options)
    this._id = uuidV4()
    this.children = []
    this.parent = null
    this.init()
  }
  init () {
    this.selected = false
    this.loading = false
    this.depth = 0
    this.open = !!this._data.open || false
  }
  set (key, val) {
    this._data[key] = val
    return this
  }
  get (key) {
    return this._data[key]
  }
  name () {
    return this._data.name
  }
  data () {
    return this._data
  }
  id () {
    return this._id
  }
  ref () {
    return this._data
  }
  setParent (node) {
    this.parent = node
  }
  getParent () {
    return this.parent
  }
  hasChildren () {
    return this.children && this.children.length
  }
  addChild (child) {
    this.children.push(child)
    child.setParent(this)
    child.depth = this.depth + 1
    return true
  }
  delChild (nodeId) {
    let nIndex = -1
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].id() === nodeId) {
        nIndex = i
        break
      }
    }
    if (nIndex > -1) {
      this.children.splice(nIndex, 1)
      return true
    }
    return false
  }
  clearChildren () {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].setParent(null)
    }
    this.children = []
  }
  findChild (node) {
    let exist = false
    for (let i = 0; i < this.children.length; i++) {
      if (node.ref().id === this.children[i].ref().id) {
        exist = true
        break
      }
    }
    return exist
  }
  fold () {
    this.open = false
  }
  unfold () {
    this.open = true
  }
  select () {
    this.selected = true
  }
  unselect () {
    this.selected = false
  }
}

export default Node
