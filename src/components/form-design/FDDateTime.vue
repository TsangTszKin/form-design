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
    <el-form-item label="显示类型/格式">
      <el-cascader :options="dateTimeTypeOptions" v-model="type" @change="handleChange"></el-cascader>
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
    <el-form-item label="是否只读">
      <el-switch v-model="readonly" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      name: '时间日期选择器',
      width: '100%',
      placeholder: '',
      type: ['ymd', 'yyyy-MM-dd'],
      key: '',
      required: false,
      disabled: false,
      readonly: false,

      dateTimeTypeOptions: [{
        value: 'y',
        label: '年',
        children: [{
          value: 'yyyy',
          label: 'yyyy'
        }, {
          value: 'yyyy年',
          label: 'yyyy年'
        }]
      }, {
        value: 'ym',
        label: '年月',
        children: [{
          value: 'yyyy-MM',
          label: 'yyyy-MM'
        }, {
          value: 'yyyy/MM',
          label: 'yyyy/MM'
        }, {
          value: 'yyyy年MM月',
          label: 'yyyy年MM月'
        }]
      }, {
        value: 'ymd',
        label: '年月日',
        children: [{
          value: 'yyyy-MM-dd',
          label: 'yyyy-MM-dd'
        }, {
          value: 'yyyy/MM/dd',
          label: 'yyyy/MM/dd'
        }, {
          value: 'yyyy年MM月dd日',
          label: 'yyyy年MM月dd日'
        }]
      }, {
        value: 'hm',
        label: '时分',
        children: [{
          value: 'HH:mm',
          label: 'HH:mm'
        }, {
          value: 'HH时mm分',
          label: 'HH时mm分'
        }]
      }, {
        value: 'hms',
        label: '时分秒',
        children: [{
          value: 'HH:mm:ss',
          label: 'HH:mm:ss'
        }, {
          value: 'HH时mm分ss秒',
          label: 'HH时mm分ss秒'
        }]
      }, {
        value: 'ymdhm',
        label: '年月日时分',
        children: [{
          value: 'yyyy-MM-dd HH:mm',
          label: 'yyyy-MM-dd HH:mm'
        }, {
          value: 'yyyy/MM/dd HH:mm',
          label: 'yyyy/MM/dd HH:mm'
        }, {
          value: 'yyyy年MM月dd日 HH时mm分',
          label: 'yyyy年MM月dd日 HH时mm分'
        }]
      }, {
        value: 'ymdhms',
        label: '年月日时分秒',
        children: [{
          value: 'yyyy-MM-dd HH:mm:ss',
          label: 'yyyy-MM-dd HH:mm:ss'
        }, {
          value: 'yyyy/MM/dd HH:mm:ss',
          label: 'yyyy/MM/dd HH:mm:ss'
        }, {
          value: 'yyyy年MM月dd日 HH时mm分ss秒',
          label: 'yyyy年MM月dd日 HH时mm分ss秒'
        }]
      }]
    }
  },
  methods: {
    packData() {
      return {
        name: this.name,
        width: this.width,
        placeholder: this.placeholder,
        type: this.type,
        key: this.key,
        required: this.required,
        disabled: this.disabled,
        readonly: this.readonly
      }
    },
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>

<style>
</style>
