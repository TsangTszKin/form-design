<template>
  <div>
    <el-row>
      <el-col :span="6">
        <FDMenu/>
      </el-col>
      <el-col :span="12" style="height:100%;">
        <Panel :formAttr="formAttr"/>

        <!-- <nestedExample /> -->
      </el-col>
      <el-col :span="6">
        <el-tabs
          v-show="$store.state.formDesign.showType"
          class="form-design"
          v-model="activeName"
          @tab-click="handleClick"
          style="border-left: 1px solid #eee;padding: 0 10px;overflow: scroll;height: 100%;"
        >
          <el-tab-pane label="字段属性" name="1">
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
                <el-input-number v-model="formAttr.labelWidth" :min="80" :max="200"></el-input-number>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FDInput from '@/components/form-design/FDInput';
import FDTextArea from '@/components/form-design/FDTextArea';
import FDNumber from '@/components/form-design/FDNumber';
import FDRadio from '@/components/form-design/FDRadio';
import FDCheckbox from '@/components/form-design/FDCheckbox';
import FDDateTime from '@/components/form-design/FDDateTime';
import FDSelect from '@/components/form-design/FDSelect';
import FDSwitch from '@/components/form-design/FDSwitch';
import FDImg from '@/components/form-design/FDImg';
import Panel from '@/components/form-design/Panel';
import Test from '@/components/form-design/Test';
import FDMenu from '@/components/form-design/FDMenu';
import nestedExample from '@/components/form-design/nestedExample';

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
    nestedExample
  },
  data() {
    return {
      activeName: '1',
      formAttr: {
        align: 'top',
        size: 'medium',
        labelWidth: 80
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    sendMesgToIframe(data) {
      document.getElementById('iframe').contentWindow.postMessage(data, '*');
    }
  },
  mounted() {

  },

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
</style>

