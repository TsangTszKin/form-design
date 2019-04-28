<template>
  <div>
    <iframe
      width="170px"
      src="/static/flow-editor/demo/html/index/flow/flow.html"
      frameborder="0"
      id="iframe"
    ></iframe>

    <el-tabs
      class="form-design"
      v-model="activeName"
      @tab-click="handleClick"
      style="position: absolute;top: 0;right: 16px; width: 270px;border-left: 1px solid #eee;padding: 0 10px;overflow: scroll;height: 100%;"
    >
      <el-tab-pane label="字段属性" name="1">
        <!-- <FDInput/> -->
        <!-- <FDTextArea /> -->
        <FDNumber />
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="2">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input v-model="formLabelAlign.region" size="small"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="formLabelAlign.type" size="small"></el-input>
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

export default {
  components: {
    FDInput,
    FDTextArea,
    FDNumber
  },
  data() {
    return {
      activeName: '1',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
  }
}
</script>

<style lang="css">
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

