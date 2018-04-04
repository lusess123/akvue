class CheckBox {
  install (tree) {
    this.addProperties(tree)
    this.addClickHook(tree)
  }
  addProperties (tree) {
    tree.addNodeProperties('checked', [0, 1, 2], ['fa fa-check-square-o', 'fa fa-square-o', 'fa fa-minus-square-o'])
  }
  addClickHook (tree) {
    tree.addClickHook('checked')
  }
}

export default CheckBox
