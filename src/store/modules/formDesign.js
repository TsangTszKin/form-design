/*
 * @Author: your name
 * @Date: 2019-10-31 14:43:17
 * @LastEditTime: 2019-12-10 11:17:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-oa\src\store\modules\formDesign.js
 */
import common from '@/utils/common'

export default {
  namespaced: true,
  state: {
    showType: '',
    activeKey: '',
    formList: [],
    activeForm: null,
    rules: {},
    grid: {}
    // ruleForm: {}
  },
  mutations: {
    updateShowType (state, value) {
      state.showType = value
    },
    updateActiveKey (state, value) {
      state.activeKey = value
    },
    updateFormList (state, value) {
      state.formList = value
      value.forEach(element => {
        if (element.type !== 'grid') {
          state.rules[element.key] = [{ required: element.options.required, message: '必填项不能为空', trigger: 'blur' }]
        } else {
          element.cols.forEach(element2 => {
            element2.list.forEach(element3 => {
              if (element3.type !== 'grid') { state.rules[element3.key] = [{ required: element3.options.required, message: '必填项不能为空', trigger: 'blur' }] }
            })
          })
        }
        // state.ruleForm[element.key] = element.value
      })
      console.log('state.rules', state.rules)
    },
    updateActiveForm (state, value) {
      state.activeForm = value
    },
    updateRules (state, value) {
      state.rules = value
    },
    updateGrid (state, value) {
      state.grid[value.key] = value.value
    }
  },
  actions: {
    setFormList ({ commit }, value) {
      window.localStorage.formList = JSON.stringify(value)
      commit('updateFormList', value)
    },
    addFormList ({ commit, state }, form) {
      console.log('addFormList')
      // let newFormList = JSON.parse(window.localStorage.formList).push(form);

      let newFormList = common.deepClone(state.formList)
      newFormList.push(form)
      window.localStorage.formList = JSON.stringify(newFormList)
      commit('updateFormList', newFormList)
    },
    removeFormList ({ commit }, key) {
      let newFormList = JSON.parse(window.localStorage.formList)
      let delIndex = -1
      for (let i = 0; i < newFormList.length; i++) {
        const element = newFormList[i]

        if (element.key === key) {
          delIndex = i
        }
      }
      if (delIndex !== -1) {
        newFormList.splice(delIndex, 1)
      } else {
        console.warn('未找到此表单key', key)
      }
      window.localStorage.formList = JSON.stringify(newFormList)
      commit('updateFormList', newFormList)
    }
  },
  getters: {
    getFormRules (state) {
      let rules = {}
      state.formList.forEach(element => {
        rules[element.key] = [{ required: element.options.required, message: '必填项不能为空', trigger: 'blur' }]
      })
      console.log('rules', rules)
      return rules
    }
  }
}
