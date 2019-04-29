<template>
  <el-form label-position="top" label-width="80px" >
    <el-form-item label="标题">
      <el-input v-model="name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="高度">
      <el-input v-model="height" size="small"></el-input>
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
      name: '图片上传',
      url: '',
      width: '',
      height: '',
      key: '',
      required: false,
      disabled: false,
    }
  },
  methods: {
    packData() {
      return {
        name: this.name,
        url: this.url,
        width: this.width,
        height: this.height,
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
