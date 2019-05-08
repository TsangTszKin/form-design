<template>
  <el-form label-position="top" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="data.title" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="data.options.width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="data.key" size="small" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="选项">
      <el-radio-group>
        <div v-for="(item, i) in data.options.option" :key="i" style="clearfix">
          <el-radio :label="item.value" style="float: left;">
            <el-input size="small" style="width:80px;" v-model="item.label" title="删除选项"></el-input>
            <el-input size="small" style="width:80px;" v-model="item.value" title="删除选项"></el-input>
            <i class="el-icon-circle-close" style="color: red;" @click="subOption(i)"></i>
          </el-radio>
        </div>
      </el-radio-group>

      <div>
        <i class="el-icon-circle-plus" style="color: #17B3A3;" title="增加选项" @click="addOption"></i>
      </div>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.options.required" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.options.disabled" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import common from '@/utils/common';
import bus from '@/utils/bus';

export default {
  props: {
    propData: {
      type: Object,
      default: function () {
        return {
          title: '单选框组',
          type: 'radio',
          icon: '/src/assets/img/form-design/radio.png',
          options: {
            width: "100%",
            required: false,
            disabled: false,
            option: [{
              value: "值1",
              label: "选项1"
            }, {
              value: "值2",
              label: "选项2"
            }, {
              value: "值3",
              label: "选项3"
            }],
          },
          key: common.getGuid()
        }
      }
    }
  },
  data() {
    return {
      data: {
        title: '单选框组',
        type: 'radio',
        icon: '/src/assets/img/form-design/radio.png',
        options: {
          width: "100%",
          required: false,
          disabled: false,
          option: [{
            value: "值1",
            label: "选项1"
          }, {
            value: "值2",
            label: "选项2"
          }, {
            value: "值3",
            label: "选项3"
          }],
        },
        key: common.getGuid()
      }
    };
  },
  methods: {
    addOption() {
      this.data.options.option.push({
        value: `值${this.data.options.option.length + 1}`,
        label: `选项${this.data.options.option.length + 1}`
      });
    },
    subOption(index) {
      this.data.options.option.splice(index, 1);
    }
  },
  watch: {
    data: {
      handler: function (value, oldValue) {
        let newFormList = common.deepClone(this.$store.state.formDesign.formList);
        let activeIndex;
        for (let i = 0; i < newFormList.length; i++) {
          const element = newFormList[i];
          if (element.key === this.$store.state.formDesign.activeKey) {
            activeIndex = i;
          }
        }
        if (!common.isEmpty(activeIndex)) {
          newFormList[activeIndex] = value;
          this.$store.commit("formDesign/updateActiveKey", value.key);
          this.$store.dispatch("formDesign/setFormList", common.deepClone(newFormList));
          bus.$emit("formDesign.syncList", common.deepClone(newFormList));
        }
      },
      deep: true
    },
    propData: {
      handler: function (value) {
        this.data = common.deepClone(value);
      },
      deep: true,
      // immediate: true
    }
  }
};
</script>

<style>
</style>
