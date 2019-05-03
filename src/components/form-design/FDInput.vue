<template>
  <el-form label-position="top" label-width="80px" >
    <el-form-item label="标题">
      <el-input v-model="name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="占位内容">
      <el-input v-model="placeholder" size="small"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="defaultValue" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="key" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据类型">
      <el-select v-model="type" placeholder="请选择">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="required" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="disabled" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="正则表达式">
      <el-input v-model="regEx" size="small"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      name: '单行文本',
      width: '100%',
      placeholder: '',
      defaultValue: '',
      type: '',
      key: '',
      required: false,
      disabled: false,
      regEx: '',

      typeOptions: [{
        value: 'string',
        label: '字符串'
      }, {
        value: 'bool',
        label: '布尔值'
      }, {
        value: 'int',
        label: '整数'
      }, {
        value: 'float',
        label: '浮点数'
      }, {
        value: 'url',
        label: 'URL地址'
      }, {
        value: 'email',
        label: '邮箱地址'
      }],
    }
  },
  methods: {
    packData() {
      return {
        name: this.name,
        width: this.width,
        placeholder: this.placeholder,
        defaultValue: this.defaultValue,
        type: this.type,
        key: this.key,
        required: this.required,
        disabled: this.disabled,
        regEx: this.regEx
      }
    }
  }
}
</script>

<style>
</style>
