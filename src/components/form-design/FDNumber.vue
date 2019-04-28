<template>
  <el-form label-position="top" label-width="80px" :model="formLabelAlign">
    <el-form-item label="标题">
      <el-input v-model="name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="最小值">
      <el-input-number v-model="min" :min="0" :max="100" label="描述文字" size="small"></el-input-number>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="max" :min="0" :max="100" label="描述文字" size="small"></el-input-number>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="key" size="small"></el-input>
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
      name: '计数器',
      width: '',
      min: 0,
      max: 1,
      key: '',
      required: false,
      disabled: false,
    }
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
        disabled: this.disabled,
      }
    }
  }
}
</script>

<style>
</style>
