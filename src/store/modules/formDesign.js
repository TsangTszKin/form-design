export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    formAttr: {
      align: 'top',
      size: 'medium'
    },
  },
  mutations: {
    setFormAttr(state, key, value) {
      state.formAttr[key] = value
    }
  }
}
