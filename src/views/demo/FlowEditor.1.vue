<template>
  <div>
    <iframe
      width="200px"
      src="/static/flow-editor/demo/html/index/flow/flow.html"
      frameborder="0"
      id="iframe"
    ></iframe>

    <!-- <Panel/> -->
    <Test />

    <el-tabs
      v-show="showType"
      class="form-design"
      v-model="activeName"
      @tab-click="handleClick"
      style="position: absolute;top: 0;right: 16px; width: 270px;border-left: 1px solid #eee;padding: 0 10px;overflow: scroll;height: 100%;"
    >
      <el-tab-pane label="字段属性" name="1">
        <FDInput v-show="showType === 'input'"/>
        <FDTextArea v-show="showType === 'textarea'"/>
        <FDRadio v-show="showType === 'radio'"/>
        <FDNumber v-show="showType === 'number'"/>
        <FDCheckbox v-show="showType === 'checkbox'"/>
        <FDDateTime v-show="showType === 'dateTime'"/>
        <FDSelect v-show="showType === 'select'"/>
        <FDSwitch v-show="showType === 'switch'"/>
        <FDImg v-show="showType === 'img'"/>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="2">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="标签对齐方式">
            <el-radio-group v-model="formAttr.align">
              <el-radio label="left">左对齐</el-radio>
              <el-radio label="right">右对齐</el-radio>
              <el-radio label="top">顶部对齐</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组件尺寸">
            <el-radio-group v-model="formAttr.size">
              <el-radio label="large">大</el-radio>
              <el-radio label="medium">中等</el-radio>
              <el-radio label="small ">小</el-radio>
              <el-radio label="mini ">迷你</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
    Test
  },
  data() {
    return {
      activeName: '1',
      formAttr: {
        align: 'top',
        size: 'medium'
      },
      showType: ''
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
    /**
         * iframe-宽高自适应显示   
         */
    const oIframe = document.getElementById('iframe');
    // const deviceWidth = 163;
    const deviceHeight = document.documentElement.clientHeight;
    // oIframe.style.width = (Number(deviceWidth)); //数字是页面布局宽度差值
    oIframe.style.height = (Number(deviceHeight)) - 170 + 'px'; //数字是页面布局高度差
    const self = this;
    window.addEventListener('message', function (e) {
      if (e != undefined) {
        console.log("message e = ", e);
        if (typeof e.data != 'string') return
        let data = JSON.parse(e.data);
        console.log('vue,我接受到了来自iframe的信息：', data);
        if (data.code == 0) {
          self.showType = data.value.name;
        }
      }
    }, false);
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

