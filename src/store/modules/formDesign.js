import common from '@/utils/common';

export default {
  namespaced: true,
  state: {
    showType: '',
    activeKey: '',
    formList: []
  },
  mutations: {
    updateShowType(state, value) {
      state.showType = value
    },
    updateActiveKey(state, value) {
      state.activeKey = value
    },
    updateFormList(state, value) {
      state.formList = value;
    }
  },
  actions: {
    setFormList({ commit }, value) {
      window.localStorage.formList = JSON.stringify(value);
      commit('updateFormList', value);
    },
    addFormList({ commit, state }, form) {
      console.log("addFormList")
      // let newFormList = JSON.parse(window.localStorage.formList).push(form);

      
      let newFormList = common.deepClone(state.formList);
      newFormList.push(form);
      window.localStorage.formList = JSON.stringify(newFormList);
      commit('updateFormList', newFormList);
    },
    removeFormList({ commit }, key) {
      let newFormList = JSON.parse(window.localStorage.formList);
      let delIndex = -1;
      for (let i = 0; i < newFormList.length; i++) {
        const element = newFormList[i];

        if (element.key === key) {
          delIndex = i;
        }

      }
      if (delIndex !== -1) {
        newFormList.splice(delIndex, 1);
      } else {
        console.warn("未找到此表单key", key);
      }
      window.localStorage.formList = JSON.stringify(newFormList);
      commit('updateFormList', newFormList);
    },
  },
  getters: {

  }
}
