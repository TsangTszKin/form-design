<template>
  <el-form label-position="top" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="data.title" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="data.options.width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="占位内容">
      <el-input v-model="data.options.placeholder" size="small"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="data.options.defaultValue" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="data.key" size="small" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="数据类型">
      <el-select v-model="data.options.dataType" placeholder="请选择">
        <el-option
          v-for="item in data.options.option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.options.required" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.options.disabled" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="正则表达式">
      <el-input v-model="data.options.regEx" size="small"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import common from "@/utils/common";
import bus from "@/utils/bus";

export default {
  props: {
    propData: {
      type: Object,
      default: function () {
        return {
          title: "单行文本",
          type: "input",
          icon: "/src/assets/img/form-design/input.png",
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            disabled: false,
            dataType: "string",
            placeholder: "",
            regEx: "",
            option: [
              {
                value: "string",
                label: "字符串"
              },
              {
                value: "bool",
                label: "布尔值"
              },
              {
                value: "int",
                label: "整数"
              },
              {
                value: "float",
                label: "浮点数"
              },
              {
                value: "url",
                label: "URL地址"
              },
              {
                value: "email",
                label: "邮箱地址"
              }
            ]
          },
          key: common.getGuid()
        };
      }
    }
  },
  data() {
    return {
      data: {
        title: "单行文本",
        type: "input",
        icon: "/src/assets/img/form-design/input.png",
        options: {
          width: "100%",
          defaultValue: "",
          required: false,
          disabled: false,
          dataType: "string",
          placeholder: "",
          regEx: "",
          option: [
            {
              value: "string",
              label: "字符串"
            },
            {
              value: "bool",
              label: "布尔值"
            },
            {
              value: "int",
              label: "整数"
            },
            {
              value: "float",
              label: "浮点数"
            },
            {
              value: "url",
              label: "URL地址"
            },
            {
              value: "email",
              label: "邮箱地址"
            }
          ]
        },
        key: common.getGuid()
      }
    };
  },
  methods: {},
  mounted() { },
  watch: {
    data: {
      handler: function (value, oldValue) {
        let newFormList = common.deepClone(
          this.$store.state.formDesign.formList
        );
        let activeIndex;
        for (let i = 0; i < newFormList.length; i++) {
          const element = newFormList[i];
          if (element.key === this.$store.state.formDesign.activeKey) {
            activeIndex = i;
          }
        }
        newFormList[activeIndex] = value;

        this.$store.commit("formDesign/updateActiveKey", value.key);
        // console.log("newFormList", newFormList)
        bus.$emit("formDesign.syncList", common.deepClone(newFormList));
        this.$store.dispatch(
          "formDesign/setFormList",
          common.deepClone(newFormList)
        );
      },
      deep: true
    },
    propData: {
      handler: function (value) {
        this.data = common.deepClone(value);
      },
      deep: true
      // immediate: true
    }
  }
};
</script>

<style>
</style>
