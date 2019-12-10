<!--
 * @Description: 审批主面板
 * @Author: zzj
 * @Date: 2019-08-09 08:37:25
 * @LastEditTime: 2019-10-18 11:22:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    :show-close="true"
    custom-class="form-preview"
    title="表单预览"
  >
    <span slot="title" class="dialog-btn-title">
      <span class="el-dialog__title" style="margin-right: 10px;">表单预览</span>
      <el-button type="primary" icon="el-icon-printer" v-print="'#form-preview-print'">打印</el-button>
    </span>

    <el-row :gutter="20" id="form-preview-print" style="margin-top: 15px;">
      <el-col :span="24" v-loading="loadingForm">
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

        <template v-else v-for="(item, i) in formAttr.tabs">
          <el-divider :key="i" content-position="left" style="background-color:#DCDFE6 !important;">{{item.name}}</el-divider>
          <el-form
            :key="i"
            :label-position="formAttr.align"
            :label-width="formAttr.labelWidth"
            :size="formAttr.size"
            :rules="rules"
            :model="formValue"
            ref="formValue"
          >
            <FormList :formListProp="item.formList" @callBack="formListCallBack" />
          </el-form>
          <p style="margin-bottom: 120px;" :key="i"></p>
          <div style="page-break-after:always" :key="i"></div>
        </template>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import common from '@/utils/common'
import FormList from '@/components/form-design/view/FormList'

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
        return []
      }
    }
  },
  data () {
    return {
      visible: false,
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
      saveData: {
        approvalPutinVo: {
          materialList: [],
          otherMaterialList: [],
          formData: {}
        },
        dycForm: { columnList: [] }
      },
      rules: {},
      formValue: {},
      formList: [],
      loading: null,
      loadingForm: true,
      fullscreenLoading: false
    }
  },
  mounted () { },
  components: { FormList },
  activated () {
    // this.getDataList();
  },
  methods: {
    formListCallBack (value) {
      console.log('ApprovalPanl formListCallBack value', common.deepClone(value))
      this.formList = value
    },
    // 子组件回调模块 end
    show () {
      this.visible = true
    },
    reset () {
      this.visible = false
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
    tabHandleClick_preview (tab, event) {
    },
    fillValueToFormList (formList, formData) {
      const oldFormValue = formData

      // start
      formList.forEach(element => {
        for (const key in oldFormValue) {
          if (oldFormValue.hasOwnProperty(key)) {
            if (element.type === 'grid') {
              element.cols.forEach(element2 => {
                element2.list.forEach(element3 => {
                  if (key === element3.code) {
                    element3.options.defaultValue = oldFormValue[key]
                  }
                  element3.options.disabled = true
                })
              })
            } else {
              if (key === element.code) {
                element.options.defaultValue = oldFormValue[key]
              }
              element.options.disabled = true
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
        }
        this.loadingForm = false
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
      },
      deep: true
    },
    formValue: {
      handler: function (value, oldValue) {
      },
      deep: true
    },
    formList: {
      handler: function (value, oldValue) {
        console.log('watch formList', value)

        if (common.isEmpty(value)) return

        let keys = []

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
    }
  }
}
</script>
