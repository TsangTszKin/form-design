<!--
 * @Description: 审批主面板
 * @Author: zzj
 * @Date: 2019-08-09 08:37:25
 * @LastEditTime: 2019-11-11 14:10:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-row :gutter="20" style="border: 1px solid gray;border-bottom: none;">
    <Document
      :readOnly="readOnly"
      :dfileListProp="dfileList"
      @dfileListCallBack="dfileListCallBack"
    />
    <el-col :span="12" v-loading="loadingForm" style="border-left: 1px solid gray;margin-left: -1px;padding: 0 20px;">
      <el-divider content-position="left">表单</el-divider>
      <el-form
        :label-position="formAttr.align"
        :label-width="formAttr.labelWidth"
        :size="formAttr.size"
        :rules="rules"
        v-if="!formAttr.isTabs"
        :model="formValue"
        ref="formValue"
      >
        <FormList :formListProp="formList" @callBack="formListCallBack" />
      </el-form>

      <el-tabs :type="formAttr.tabType" v-else v-model="tabIndex">
        <el-tab-pane
          :label="item.name"
          :name="String(i)"
          v-for="(item, i) in formAttr.tabs"
          :key="i"
        >
          <el-form
            :label-position="formAttr.align"
            :label-width="formAttr.labelWidth"
            :size="formAttr.size"
            :model="formValue"
            :rules="rules"
            :ref="'formValue'+i"
          >
            <FormList :formListProp="formList" @callBack="formListCallBack" />
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import common from '@/utils/common'
import FormList from '@/components/form-design/view/FormList'
import Document from '@/components/form-design/view/Document'

export default {
  props: {
    // 表单数据
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表单
    dycForm: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 受理材料
    materialList: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 其他材料
    dfileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 申请表单域
    applyFormList: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 预审表单域
    precheckFormList: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 系统默认值大全
    formDefaultValue: {
      type: Object,
      default: function () {
        return {}
      }
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: true,
      dialogVisible: false,
      formAttr: {
        align: 'left',
        size: 'medium',
        labelWidth: '80px',
        isTabs: false,
        tabType: 'card',
        tabs: [
          {
            name: 'tab1',
            formList: []
          }
        ]
      },
      tabIndex: '0',
      rules: {},
      formValue: {},
      formList: [],
      loading: null,
      loadingForm: true
    }
  },
  mounted () { },
  components: { FormList, Document },
  activated () {
    // this.getDataList();
  },
  methods: {
    // 子组件回调模块 start
    formListCallBack (value) {
      console.log(
        'ApprovalPanl formListCallBack value',
        common.deepClone(value)
      )
      this.formList = value
    },
    dfileListCallBack (value) {
      this.$emit('dfileListCallBack', value)
    },
    // 子组件回调模块 end
    reset () {
      this.formAttr = {
        align: 'left',
        size: 'medium',
        labelWidth: '80px',
        isTabs: false,
        tabType: 'card',
        tabs: [
          {
            name: 'tab1',
            formList: []
          }
        ]
      }
      this.tabIndex = '0'
      this.rules = {}
      this.formValue = {}
      this.formList = []
    },
    verifyFile () {
      // for (let i = 0; i < this.materialDatas.length; i++) {
      //   const element = this.materialDatas[i]
      //   if (
      //     element.required === 1 &&
      //     (element.state === 0 ||
      //       !element.fileVoList ||
      //       !element.fileVoList.length)
      //   ) {
      //     this.$message({
      //       message: `请上传受理材料【${element.materialsName}】`,
      //       type: 'warning',
      //       duration: 1500
      //     })
      //     return false
      //   }
      // }
      return true
    },
    verifyTabForm (index, maxIndex, resolve, reject) {
      let validateFun = () => {
        this.$refs['formValue' + index][0].validate((valid, obj) => {
          if (valid) {
            if (index < maxIndex - 1) {
              this.verifyTabForm(index + 1, maxIndex, resolve, resolve)
            } else {
              resolve()
            }
          } else {
            reject(obj)
            this.$emit('formDataNotFinishCallBack')
            return false
          }
        })
      }
      if (index.toString() !== this.tabIndex) {
        this.tabIndex = index.toString()
        this.$nextTick(_ => validateFun())
      } else {
        validateFun()
      }
    },
    verifyForm (resolve, reject) {
      this.$refs['formValue'].validate((valid, obj) => {
        if (valid) {
          resolve()
        } else {
          reject(obj)
          this.$emit('formDataNotFinishCallBack')
          return false
        }
      })
    },
    // 最多五层tabs校验
    save (isSubmit = false) {
      if (!isSubmit) {
        // rules为空则代表是保存，不是提交，此时文件不提交状态
        this.tabIndex = '0'
        this.saveForApi(isSubmit)
      } else {
        if (!this.verifyFile()) {
          this.$emit('formDataNotFinishCallBack')
          return
        }
        // 验证

        let verifyFailed = valid => {
          this.$message.error('必填项不能为空，请补充表单信息！')
        }

        let verifySuccess = () => {
          this.tabIndex = '0'
          this.saveForApi(isSubmit)
        }

        if (this.formAttr.isTabs) {
          this.verifyTabForm(
            0,
            this.formAttr.tabs.length,
            verifySuccess,
            verifyFailed
          )
        } else {
          this.verifyForm(verifySuccess, verifyFailed)
        }
      }
    },
    saveForApi (isSubmit) {
      // 组装formData
      let formData = {}

      let setFormData = formList => {
        formList.forEach(element => {
          if (element.type === 'grid') {
            element.cols.forEach(element2 => {
              element2.list.forEach(element3 => {
                if (!common.isEmpty(element3.options.defaultValue)) {
                  formData[element3.code] = element3.options.defaultValue
                }
              })
            })
          } else {
            if (!common.isEmpty(element.options.defaultValue)) {
              let value = element.options.defaultValue
              if (element.type === 'idea') {
                const realname = '管理员'
                const nowDate = common.formatDateCN(new Date().getTime())
                if (value.indexOf(realname) === -1 && value.indexOf('年') === -1 && value.indexOf('月') === -1 && value.indexOf('日') === -1) {
                  value = `${value}\n\n                                                  ${realname}\n                                                  ${nowDate}`
                }
              }
              formData[element.code] = value
            }
          }
        })
      }

      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(tab => {
          setFormData(tab.formList)
        })
      } else {
        setFormData(this.formList)
      }

      console.log('save formData', formData)
      this.$emit('formDataCallBack', formData, isSubmit)
    },
    fillValueToFormList (formList, formData) {
      const oldFormValue = formData

      // let keys = [...this.applyFormList, ...this.precheckFormList]

      // 设置默认值
      formList.forEach(element => {
        if (element.type === 'grid') {
          element.cols.forEach(element2 => {
            element2.list.forEach(element3 => {
              if (this.formDefaultValue.hasOwnProperty(element3.options.defaultValue)) {
                if (!common.isEmpty(this.applyFormList) && this.applyFormList.includes(element3.code)) {
                  element3.options.defaultValue = this.formDefaultValue[element3.options.defaultValue]
                }
                if (!common.isEmpty(this.precheckFormList) && this.precheckFormList.includes(element3.code)) {
                  element3.options.defaultValue = this.formDefaultValue[element3.options.defaultValue]
                }
              }
            })
          })
        } else {
          if (this.formDefaultValue.hasOwnProperty(element.options.defaultValue)) {
            if (!common.isEmpty(this.applyFormList) && this.applyFormList.includes(element.code)) {
              element.options.defaultValue = this.formDefaultValue[element.options.defaultValue]
            }
            if (!common.isEmpty(this.precheckFormList) && this.precheckFormList.includes(element.code)) {
              element.options.defaultValue = this.formDefaultValue[element.options.defaultValue]
            }
          }
        }
      })

      // start
      formList.forEach(element => {
        for (const key in oldFormValue) {
          if (oldFormValue.hasOwnProperty(key)) {
            if (element.type === 'grid') {
              element.cols.forEach(element2 => {
                element2.list.forEach(element3 => {
                  if (key === element3.code) {
                    element3.options.defaultValue = oldFormValue[key]
                    if (this.formDefaultValue.hasOwnProperty(element3.options.defaultValue)) {
                      if (!common.isEmpty(this.applyFormList) && this.applyFormList.includes(element3.code)) {
                        element3.options.defaultValue = this.formDefaultValue[element3.options.defaultValue]
                      }
                      if (!common.isEmpty(this.precheckFormList) && this.precheckFormList.includes(element3.code)) {
                        element3.options.defaultValue = this.formDefaultValue[element3.options.defaultValue]
                      }
                    }
                  }
                })
              })
            } else {
              if (key === element.code) {
                element.options.defaultValue = oldFormValue[key]
                if (this.formDefaultValue.hasOwnProperty(element.options.defaultValue)) {
                  if (!common.isEmpty(this.applyFormList) && this.applyFormList.includes(element.code)) {
                    element.options.defaultValue = this.formDefaultValue[element.options.defaultValue]
                  }
                  if (!common.isEmpty(this.precheckFormList) && this.precheckFormList.includes(element.code)) {
                    element.options.defaultValue = this.formDefaultValue[element.options.defaultValue]
                  }
                }
              }
            }
          }
        }
      })

      return formList
    },
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.loadingForm = true
        this.reset()
        let content = JSON.parse(this.dycForm.content)
        this.formAttr = content.formAttr
        let formList = content.formList
        if (this.formAttr.isTabs) {
          // tab多页
          this.tabIndex = '0'

          // 把原来的formData的值设置进去
          this.formAttr.tabs.forEach(element => {
            element.formList = this.fillValueToFormList(
              element.formList,
              this.formData
            )
          })
          this.$store.dispatch(
            'formDesign/setFormList',
            common.deepClone(this.formAttr.tabs[0].formList)
          )
          this.formList = common.deepClone(this.formAttr.tabs[0].formList)

          this.initFormRule(
            this.formList,
            this.applyFormList,
            this.precheckFormList
          )
          this.initDisabledField(this.applyFormList, this.precheckFormList)
        } else {
          // 单页

          // 把原来的formData的值设置进去
          let formListFilled = this.fillValueToFormList(
            formList,
            this.formData
          )
          this.$store.dispatch(
            'formDesign/setFormList',
            common.deepClone(formListFilled)
          )
          this.formList = common.deepClone(formListFilled)

          this.initFormRule(
            this.formList,
            this.applyFormList,
            this.precheckFormList
          )
          this.initDisabledField(this.applyFormList, this.precheckFormList)
        }
        this.loadingForm = false
      })
    },
    initFormRule (formList, applyFormList = [], precheckFormList = []) {
      let keys = (() => {
        if (!common.isEmpty(applyFormList) && !common.isEmpty(precheckFormList)) { return [...applyFormList, ...precheckFormList] }
        if (!common.isEmpty(applyFormList)) return applyFormList
        if (!common.isEmpty(precheckFormList)) return precheckFormList
        return []
      })()
      let rules = {}
      formList.forEach(element => {
        if (element.type === 'grid') {
          element.cols.forEach(element2 => {
            element2.list.forEach(element3 => {
              if (element3.options.required && keys.includes(element3.code)) {
                rules[element3.code] = [
                  {
                    required: element3.options.required,
                    message: '必填项不能为空',
                    trigger: 'blur'
                  }
                ]
              } else {
                rules[element3.code] = [
                  {
                    required: false
                  }
                ]
              }
            })
          })
        } else {
          if (element.options.required && keys.includes(element.code)) {
            rules[element.code] = [
              {
                required: element.options.required,
                message: '必填项不能为空',
                trigger: 'blur'
              }
            ]
          }
        }
      })
      this.rules = rules

      console.log('form rules', rules)

      let formValue = {}
      for (const key in this.rules) {
        if (this.rules.hasOwnProperty(key)) {
          formValue[key] = ''
        }
      }
      this.formValue = formValue
    },
    initDisabledField (applyFormList = [], precheckFormList = []) {
      let keys = (() => {
        if (!common.isEmpty(applyFormList)) return applyFormList
        if (!common.isEmpty(precheckFormList)) return precheckFormList
        return []
      })()
      // this.dycForm.columnList.forEach(element => {
      //   if ([...applyFormList, ...precheckFormList].includes(element.tableColumnCode)) {
      //     keys.push(element.code)
      //   }
      // })

      this.formList.forEach(element => {
        if (element.type === 'grid') {
          element.cols.forEach(element2 => {
            element2.list.forEach(element3 => {
              if (!keys.includes(element3.code)) {
                element3.options.disabled = true
              }
            })
          })
        } else {
          if (!keys.includes(element.code)) {
            element.options.disabled = true
          }
        }
      })
    }
  },
  watch: {
    tabIndex: {
      handler: function (newValue, oldValue) {
        // this.loadingForm = true
        // 切换tab之前，赋值给formAttr
        this.formAttr.tabs[oldValue].formList = common.deepClone(this.formList)

        if (newValue === -1 || newValue === '-1') return

        // 赋值新tab
        this.$store.dispatch(
          'formDesign/setFormList',
          common.deepClone(this.formAttr.tabs[Number(newValue)].formList)
        )
        this.formList = common.deepClone(
          this.formAttr.tabs[Number(newValue)].formList
        )
        let formList = this.formAttr.tabs[Number(newValue)].formList
        this.initFormRule(formList, this.applyFormList, this.precheckFormList)
        this.initDisabledField(this.applyFormList, this.precheckFormList)

        // setTimeout(() => {
        //   this.loadingForm = false
        // }, 500)
      },
      deep: true
    },
    formValue: {
      handler: function (value, oldValue) {
        // console.log('watch formValue', value)
      },
      deep: true
    },
    // materialList: {
    //   handler (value) {
    //     this.materialDatas = value
    //   },
    //   immediate: true,
    //   deep: true
    // },
    formList: {
      handler: function (value, oldValue) {
        console.log('watch formList', value)

        if (common.isEmpty(value)) return

        let keys = [...this.applyFormList, ...this.precheckFormList]

        common.deepClone(value).forEach(element => {
          for (const key in this.formValue) {
            if (this.formValue.hasOwnProperty(key)) {
              if (element.type === 'grid') {
                element.cols.forEach(element2 => {
                  element2.list.forEach(element3 => {
                    if (key === element3.code && keys.includes(key)) {
                      this.formValue[key] = element3.options.defaultValue
                    }
                  })
                })
              } else {
                if (key === element.code && keys.includes(key)) {
                  this.formValue[key] = element.options.defaultValue
                }
              }
            }
          }
        })

        console.log('this.formValue', this.formValue)
      },
      deep: true
    },
    formData: {
      handler: function () {
        this.init()
      },
      deep: true
    },
    dycForm: {
      handler: function () {
        this.init()
      },
      deep: true
    },
    applyFormList: {
      handler: function () {
        this.init()
      },
      deep: true
    },
    precheckFormList: {
      handler: function () {
        this.init()
      },
      deep: true
    },
    formDefaultValue: {
      handler: function () {
        this.init()
      },
      deep: true
    }
  }
}
</script>
