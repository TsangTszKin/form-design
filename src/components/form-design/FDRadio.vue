<template>
  <el-form label-position="top" label-width="80px" :model="formLabelAlign">
    <el-form-item label="标题">
      <el-input v-model="name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="key" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-radio-group v-model="value">
        <div v-for="(item, i) in option" :key="i" style="clearfix">
          <el-radio :label="item.value" style="float: left;">
            <el-input size="small" style="width:80px;" v-model="item.label"></el-input>
            <el-input size="small" style="width:80px;" v-model="item.value"></el-input>
          </el-radio>
        </div>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="required" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="disabled" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      name: "计数器",
      width: "",
      key: "",
      required: false,
      disabled: false,
      value: "1",
      option: [
        {
          label: "1",
          value: "选项1"
        },
        {
          label: "2",
          value: "选项2"
        },
        {
          label: "3",
          value: "选项3"
        }
      ]
    };
  },
  methods: {
    packData() {
      return {
        name: this.name,
        width: this.width,
        min: this.min,
        max: this.max,
        key: this.key,
        required: this.required,
        disabled: this.disabled
      };
    }
  }
};
</script>

<style>
</style>
