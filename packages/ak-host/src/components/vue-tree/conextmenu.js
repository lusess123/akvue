class ContextMenu {
  install (tree) {
    this.init(tree)
  }
  init (tree) {
    this.supportedActions = ['add', 'delete']
    this.ctx = tree.contextmenu = {callback: {}, actions: this.supportedActions, show: false}
    this.setEmit()
  }
  addActions (actions) {
    if (!!actions && actions.length) {
      this.ctx.actions = actions
    }
  }
  addActionCallback (action, callback) {
    // TODO: add callback checker
    this.ctx.callback[action] = callback
  }
  setEmit () {
    this.ctx.emit = (e) => {
      this.ctx.show = false
      setTimeout(() => {
        this.ctx.show = true
        this.ctx.target = e
      })
    }
  }
}

export default new ContextMenu()
