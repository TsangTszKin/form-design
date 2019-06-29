<template>
  <div>
    <el-row>
      <el-col style="width: 230px;position: fixed;top: 127px;">
        <FDMenu/>
      </el-col>
      <el-col
        style="height:100%; width: calc(100% - 480px); margin-left:230px;"
        :class="{'fd-main': $store.state.formDesign.formList.length == 0}"
      >
        <div style="padding: 10px;">
          <a @click="showPreview">预览</a>
        </div>
        <Panel :formAttr="formAttr" v-if="!formAttr.isTabs"/>
        <el-tabs :type="formAttr.tabType" v-else v-model="tabIndex" @tab-click="tabHandleClick">
          <el-tab-pane
            :label="item.name"
            :name="String(i)"
            v-for="(item, i) in formAttr.tabs"
            :key="i"
          >
            <Panel ref="Panel" :formAttr="formAttr" @callBack="formListCallBack"/>
          </el-tab-pane>
        </el-tabs>

        <!-- <nestedExample /> -->
      </el-col>
      <el-col style="width: 250px;position: fixed;top: 127px;right: 0;">
        <el-tabs
          class="form-design"
          v-model="activeName"
          @tab-click="handleClick"
          style="border-left: 1px solid #eee;padding: 0 10px;overflow-y: auto;height: 100%;"
        >
          <el-tab-pane v-if="$store.state.formDesign.showType" label="字段属性" name="1">
            <FDInput
              v-show="$store.state.formDesign.showType === 'input'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDTextArea
              v-show="$store.state.formDesign.showType === 'textarea'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDRadio
              v-show="$store.state.formDesign.showType === 'radio'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDNumber
              v-show="$store.state.formDesign.showType === 'number'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDCheckbox
              v-show="$store.state.formDesign.showType === 'checkbox'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDDateTime
              v-show="$store.state.formDesign.showType === 'datetime'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDSelect
              v-show="$store.state.formDesign.showType === 'select'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDSwitch
              v-show="$store.state.formDesign.showType === 'switch'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDImg
              v-show="$store.state.formDesign.showType === 'img'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDTitle
              v-show="$store.state.formDesign.showType === 'title'"
              :propData="$store.state.formDesign.activeForm"
            />
            <FDGrid
              v-show="$store.state.formDesign.showType === 'grid'"
              :propData="$store.state.formDesign.activeForm"
            />
          </el-tab-pane>
          <el-tab-pane label="表单属性" name="2">
            <el-form label-position="top" label-width="80px" size="mini">
              <el-form-item label="标签对齐方式">
                <el-radio-group v-model="formAttr.align">
                  <el-radio-button label="left">左对齐</el-radio-button>
                  <el-radio-button label="right">右对齐</el-radio-button>
                  <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="组件尺寸">
                <el-radio-group v-model="formAttr.size">
                  <el-radio-button label="large">大</el-radio-button>
                  <el-radio-button label="medium">中等</el-radio-button>
                  <el-radio-button label="small ">小</el-radio-button>
                  <el-radio-button label="mini ">迷你</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="表单字段宽度">
                <el-input v-model="formAttr.labelWidth"></el-input>
              </el-form-item>

              <el-form-item label="启用tab表单">
                <el-switch v-model="formAttr.isTabs"></el-switch>
              </el-form-item>
              <el-form-item label="tab模式" v-show="formAttr.isTabs">
                <el-radio-group v-model="formAttr.tabType">
                  <el-radio-button label>简洁</el-radio-button>
                  <el-radio-button label="card">选项卡</el-radio-button>
                  <el-radio-button label="border-card ">卡片化</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="tab选项配置" v-show="formAttr.isTabs">
                <div>
                  <ul>
                    <li v-for="(item, i) in formAttr.tabs" :key="i">
                      <el-input
                        size="small"
                        style="width:200px;"
                        :title="item.name"
                        v-model="item.name"
                      ></el-input>
                      <i class="el-icon-circle-close" style="color: red;" @click="subOption(i)"></i>
                    </li>
                    <li style="margin: 10px;">
                      <i
                        class="el-icon-circle-plus"
                        style="color: #17B3A3;"
                        title="增加选项"
                        @click="addOption"
                      ></i>
                    </li>
                  </ul>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="表单预览" :visible.sync="dialogFormVisible">
      <el-form
        :label-position="formAttr.align"
        :label-width="formAttr.labelWidth"
        :size="formAttr.size"
        :rules="$store.state.formDesign.rules"
        v-if="!formAttr.isTabs"
      >
        <template v-for="(item, i) in $store.state.formDesign.formList">
          <el-form-item
            :label="item.title"
            :prop="item.key"
            v-if="item.type !== 'grid' && item.type !== 'title'"
          >
            <el-input
              v-if="item.type === 'input'"
              :placeholder="item.options.placeholder"
              :disabled="item.options.disabled"
              :readonly="item.options.readonly"
              :style="{width: item.options.width}"
            ></el-input>
            <el-input
              v-if="item.type === 'textarea'"
              :placeholder="item.options.placeholder"
              :disabled="item.options.disabled"
              :readonly="item.options.readonly"
              type="textarea"
              :rows="5"
              :style="{width: item.options.width}"
            ></el-input>
            <el-input-number
              v-if="item.type === 'number'"
              :disabled="item.options.disabled"
              :readonly="item.options.readonly"
              :style="{width: item.options.width}"
            ></el-input-number>
            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="item.options.defaultValue"
              :disabled="item.options.disabled"
              :readonly="item.options.readonly"
              :style="{width: item.options.width}"
            >
              <el-radio
                v-for="(item, i) in item.options.option"
                :label="item.value"
                :key="i"
              >{{item.label}}</el-radio>
            </el-radio-group>
            <el-checkbox-group
              v-if="item.type === 'checkbox'"
              v-model="item.options.defaultValue"
              :disabled="item.options.disabled"
              :readonly="item.options.readonly"
              :style="{width: item.options.width}"
            >
              <el-checkbox
                v-for="(item, i) in item.options.option"
                :label="item.value"
                :key="i"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <el-select
              v-if="item.type === 'select'"
              :placeholder="item.options.placeholder"
              :style="{width: item.options.width}"
              :readonly="item.options.readonly"
              :disabled="item.options.disabled"
            >
              <el-option
                v-for="(item, i) in item.options.option"
                :key="i"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-switch
              v-if="item.type === 'switch'"
              v-model="item.options.defaultValue"
              active-color="#13ce66"
              inactive-color="#EEEEEE"
              :style="{width: item.options.width}"
              :readonly="item.options.readonly"
              :disabled="item.options.disabled"
            ></el-switch>
            <el-date-picker
              type="datetime"
              v-if="item.type === 'datetime'"
              :placeholder="item.options.placeholder"
              :style="{width: item.options.width}"
              :disabled="item.options.disabled"
            ></el-date-picker>
          </el-form-item>
          <p
            v-if="item.type === 'title'"
            :style="{'text-align': item.options.align, 'font-size': item.options.fontSize, 'margin-bottom': '5px'}"
          >{{item.value}}</p>
          <el-row v-if="item.type === 'grid'">
            <el-col
              :span="col.span"
              v-for="(col, j) in item.cols"
              :key="j"
              class="col"
              style="padding: 5px;"
            >
              <template v-for="(item2, j) in col.list">
                <el-form-item :label="item2.title" :prop="item2.key" v-if="item2.type !== 'title'">
                  <el-input
                    v-if="item2.type === 'input'"
                    :placeholder="item2.options.placeholder"
                    :disabled="item2.options.disabled"
                    :readonly="item2.options.readonly"
                    :style="{width: item2.options.width}"
                  ></el-input>
                  <el-input
                    v-if="item2.type === 'textarea'"
                    :placeholder="item2.options.placeholder"
                    :disabled="item2.options.disabled"
                    :readonly="item2.options.readonly"
                    type="textarea"
                    :rows="5"
                    :style="{width: item2.options.width}"
                  ></el-input>
                  <el-input-number
                    v-if="item2.type === 'number'"
                    :disabled="item2.options.disabled"
                    :readonly="item2.options.readonly"
                    :style="{width: item2.options.width}"
                  ></el-input-number>
                  <el-radio-group
                    v-if="item2.type === 'radio'"
                    v-model="item2.options.defaultValue"
                    :disabled="item2.options.disabled"
                    :readonly="item2.options.readonly"
                    :style="{width: item2.options.width}"
                  >
                    <el-radio
                      v-for="(item2, i) in item2.options.option"
                      :label="item2.value"
                      :key="i"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-checkbox-group
                    v-if="item2.type === 'checkbox'"
                    v-model="item2.options.defaultValue"
                    :disabled="item2.options.disabled"
                    :readonly="item2.options.readonly"
                    :style="{width: item2.options.width}"
                  >
                    <el-checkbox
                      v-for="(item2, i) in item2.options.option"
                      :label="item2.value"
                      :key="i"
                    >{{item2.label}}</el-checkbox>
                  </el-checkbox-group>
                  <el-select
                    v-if="item2.type === 'select'"
                    :placeholder="item2.options.placeholder"
                    :style="{width: item2.options.width}"
                    :readonly="item2.options.readonly"
                    :disabled="item2.options.disabled"
                  >
                    <el-option
                      v-for="(item2, i) in item2.options.option"
                      :key="i"
                      :label="item2.label"
                      :value="item2.value"
                    ></el-option>
                  </el-select>
                  <el-switch
                    v-if="item2.type === 'switch'"
                    v-model="item2.options.defaultValue"
                    active-color="#13ce66"
                    inactive-color="#EEEEEE"
                    :style="{width: item2.options.width}"
                    :readonly="iitem2tem.options.readonly"
                    :disabled="item2.options.disabled"
                  ></el-switch>
                  <el-date-picker
                    type="datetime"
                    v-if="item2.type === 'datetime'"
                    :placeholder="item2.options.placeholder"
                    :style="{width: item2.options.width}"
                    :disabled="item2.options.disabled"
                  ></el-date-picker>
                </el-form-item>
                <p
                  v-if="item2.type === 'title'"
                  :style="{'text-align': item2.options.align, 'font-size': item2.options.fontSize, 'margin-bottom': '5px'}"
                >{{item2.value}}</p>
              </template>
            </el-col>
          </el-row>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submitForm('rules')">模拟提交表单</el-button>
        </el-form-item>
      </el-form>
      <el-tabs
        :type="formAttr.tabType"
        v-else
        @tab-click="tabHandleClick_preview"
        v-model="tabIndex"
      >
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
            :rules="$store.state.formDesign.rules"
          >
            <template v-for="(item, i) in $store.state.formDesign.formList">
              <el-form-item
                :label="item.title"
                :prop="item.key"
                v-if="item.type !== 'grid' && item.type !== 'title'"
              >
                <el-input
                  v-if="item.type === 'input'"
                  :placeholder="item.options.placeholder"
                  :disabled="item.options.disabled"
                  :readonly="item.options.readonly"
                  :style="{width: item.options.width}"
                ></el-input>
                <el-input
                  v-if="item.type === 'textarea'"
                  :placeholder="item.options.placeholder"
                  :disabled="item.options.disabled"
                  :readonly="item.options.readonly"
                  type="textarea"
                  :rows="5"
                  :style="{width: item.options.width}"
                ></el-input>
                <el-input-number
                  v-if="item.type === 'number'"
                  :disabled="item.options.disabled"
                  :readonly="item.options.readonly"
                  :style="{width: item.options.width}"
                ></el-input-number>
                <el-radio-group
                  v-if="item.type === 'radio'"
                  v-model="item.options.defaultValue"
                  :disabled="item.options.disabled"
                  :readonly="item.options.readonly"
                  :style="{width: item.options.width}"
                >
                  <el-radio
                    v-for="(item, i) in item.options.option"
                    :label="item.value"
                    :key="i"
                  >{{item.label}}</el-radio>
                </el-radio-group>
                <el-checkbox-group
                  v-if="item.type === 'checkbox'"
                  v-model="item.options.defaultValue"
                  :disabled="item.options.disabled"
                  :readonly="item.options.readonly"
                  :style="{width: item.options.width}"
                >
                  <el-checkbox
                    v-for="(item, i) in item.options.option"
                    :label="item.value"
                    :key="i"
                  >{{item.label}}</el-checkbox>
                </el-checkbox-group>
                <el-select
                  v-if="item.type === 'select'"
                  :placeholder="item.options.placeholder"
                  :style="{width: item.options.width}"
                  :readonly="item.options.readonly"
                  :disabled="item.options.disabled"
                >
                  <el-option
                    v-for="(item, i) in item.options.option"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-switch
                  v-if="item.type === 'switch'"
                  v-model="item.options.defaultValue"
                  active-color="#13ce66"
                  inactive-color="#EEEEEE"
                  :style="{width: item.options.width}"
                  :readonly="item.options.readonly"
                  :disabled="item.options.disabled"
                ></el-switch>
                <el-date-picker
                  type="datetime"
                  v-if="item.type === 'datetime'"
                  :placeholder="item.options.placeholder"
                  :style="{width: item.options.width}"
                  :disabled="item.options.disabled"
                ></el-date-picker>
              </el-form-item>
              <p
                v-if="item.type === 'title'"
                :style="{'text-align': item.options.align, 'font-size': item.options.fontSize, 'margin-bottom': '5px'}"
              >{{item.value}}</p>
              <el-row v-if="item.type === 'grid'">
                <el-col
                  :span="col.span"
                  v-for="(col, j) in item.cols"
                  :key="j"
                  class="col"
                  style="padding: 5px;"
                >
                  <template v-for="(item2, j) in col.list">
                    <el-form-item
                      :label="item2.title"
                      :prop="item2.key"
                      v-if="item2.type !== 'title'"
                    >
                      <el-input
                        v-if="item2.type === 'input'"
                        :placeholder="item2.options.placeholder"
                        :disabled="item2.options.disabled"
                        :readonly="item2.options.readonly"
                        :style="{width: item2.options.width}"
                      ></el-input>
                      <el-input
                        v-if="item2.type === 'textarea'"
                        :placeholder="item2.options.placeholder"
                        :disabled="item2.options.disabled"
                        :readonly="item2.options.readonly"
                        type="textarea"
                        :rows="5"
                        :style="{width: item2.options.width}"
                      ></el-input>
                      <el-input-number
                        v-if="item2.type === 'number'"
                        :disabled="item2.options.disabled"
                        :readonly="item2.options.readonly"
                        :style="{width: item2.options.width}"
                      ></el-input-number>
                      <el-radio-group
                        v-if="item2.type === 'radio'"
                        v-model="item2.options.defaultValue"
                        :disabled="item2.options.disabled"
                        :readonly="item2.options.readonly"
                        :style="{width: item2.options.width}"
                      >
                        <el-radio
                          v-for="(item2, i) in item2.options.option"
                          :label="item2.value"
                          :key="i"
                        >{{item.label}}</el-radio>
                      </el-radio-group>
                      <el-checkbox-group
                        v-if="item2.type === 'checkbox'"
                        v-model="item2.options.defaultValue"
                        :disabled="item2.options.disabled"
                        :readonly="item2.options.readonly"
                        :style="{width: item2.options.width}"
                      >
                        <el-checkbox
                          v-for="(item2, i) in item2.options.option"
                          :label="item2.value"
                          :key="i"
                        >{{item2.label}}</el-checkbox>
                      </el-checkbox-group>
                      <el-select
                        v-if="item2.type === 'select'"
                        :placeholder="item2.options.placeholder"
                        :style="{width: item2.options.width}"
                        :readonly="item2.options.readonly"
                        :disabled="item2.options.disabled"
                      >
                        <el-option
                          v-for="(item2, i) in item2.options.option"
                          :key="i"
                          :label="item2.label"
                          :value="item2.value"
                        ></el-option>
                      </el-select>
                      <el-switch
                        v-if="item2.type === 'switch'"
                        v-model="item2.options.defaultValue"
                        active-color="#13ce66"
                        inactive-color="#EEEEEE"
                        :style="{width: item2.options.width}"
                        :readonly="iitem2tem.options.readonly"
                        :disabled="item2.options.disabled"
                      ></el-switch>
                      <el-date-picker
                        type="datetime"
                        v-if="item2.type === 'datetime'"
                        :placeholder="item2.options.placeholder"
                        :style="{width: item2.options.width}"
                        :disabled="item2.options.disabled"
                      ></el-date-picker>
                    </el-form-item>
                    <p
                      v-if="item2.type === 'title'"
                      :style="{'text-align': item2.options.align, 'font-size': item2.options.fontSize, 'margin-bottom': '5px'}"
                    >{{item2.value}}</p>
                  </template>
                </el-col>
              </el-row>
            </template>
            <el-form-item>
              <el-button type="primary" @click="submitForm('rules')">模拟提交表单</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FDInput from '@/components/form-design/FDInput'
import FDTitle from '@/components/form-design/FDTitle'
import FDTextArea from '@/components/form-design/FDTextArea'
import FDNumber from '@/components/form-design/FDNumber'
import FDRadio from '@/components/form-design/FDRadio'
import FDCheckbox from '@/components/form-design/FDCheckbox'
import FDDateTime from '@/components/form-design/FDDateTime'
import FDSelect from '@/components/form-design/FDSelect'
import FDSwitch from '@/components/form-design/FDSwitch'
import FDImg from '@/components/form-design/FDImg'
import Panel from '@/components/form-design/Panel'
import Test from '@/components/form-design/Test'
import FDMenu from '@/components/form-design/FDMenu'
import FDGrid from '@/components/form-design/FDGrid'
import nestedExample from '@/components/form-design/nestedExample'
import common from '@/utils/common'

export default {
  components: {
    FDInput,
    FDTextArea,
    FDNumber,
    FDRadio,
    FDCheckbox,
    FDDateTime,
    FDSelect,
    FDSwitch,
    FDImg,
    Panel,
    Test,
    FDMenu,
    nestedExample,
    FDGrid,
    FDTitle
  },
  data () {
    return {
      activeName: '2',
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
      dialogFormVisible: false,
      tabIndex: '0'
    }
  },
  methods: {
    showPreview () {
      this.tabIndex = '0'
      this.dialogFormVisible = true
      this.$store.dispatch('formDesign/setFormList', this.formAttr.tabs[0].formList)
    },
    formListCallBack (formList) {
      this.formAttr.tabs[Number(this.tabIndex)].formList = this.$store.state.formDesign.formList
      console.log('this.formAttr', this.formAttr)
    },
    tabHandleClick (tab, event) {
      console.log('this.$store.state.formDesign.formList = ', this.$store.state.formDesign.formList)
      console.log(tab, event)
      this.$refs.Panel[Number(this.tabIndex)].init(common.deepClone(this.formAttr.tabs[Number(this.tabIndex)].formList))
      // this.$refs.Panel[Number(this.tabIndex)].init(this.$store.state.formDesign.formList);
    },
    tabHandleClick_preview (tab, event) {
      console.log('tab.index', tab.index)
      this.$store.dispatch('formDesign/setFormList', common.deepClone(this.formAttr.tabs[Number(tab.index)].formList))
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    sendMesgToIframe (data) {
      document.getElementById('iframe').contentWindow.postMessage(data, '*')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addOption () {
      this.formAttr.tabs.push({
        name: `tab${this.formAttr.tabs.length + 1}`,
        formList: []
      })
    },
    subOption (index) {
      this.formAttr.tabs.splice(index, 1)
    }
  },
  mounted () {

  },
  filters: {
    labelWidth (value) {
      return `${value}px`
    }
  }
}
</script>

<style lang="css" scoped>
.form-design .el-tabs__nav {
  width: 100%;
}
.form-design .el-tabs__nav .el-tabs__active-bar {
  width: 50%;
  transform: translateX(0px);
}
.form-design .el-tabs__nav .el-tabs__item {
  width: 50%;
  text-align: center;
}
.form-design .el-tabs__header {
  position: fixed;
  width: 232px;
  height: 40px;
  z-index: 1;
  background-color: #fff;
}
.form-design .el-tabs__content {
  position: relative;
  top: 55px;
}
.form-design .el-form-item__label {
  line-height: 20px;
}
.fd-main {
  background: url(data:image/png;base64,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)
    no-repeat center 100px;
}
</style>

