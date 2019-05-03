<template>
  <el-form label-position="top" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="width" size="small"></el-input>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="key" size="small"></el-input>
    </el-form-item>

    <el-form-item label="选项">
      <el-radio-group v-model="value">
        <div v-for="(item, i) in radioOption" :key="i" style="clearfix">
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
      name: "单选框组",
      width: '100%',
      key: "",
      required: false,
      disabled: false,
      value: "值1",
      radioOption: [
        {
          value: "值1",
          label: "选项1"
        },
        {
          value: "值2",
          label: "选项2"
        },
        {
          value: "值3",
          label: "选项3"
        }
      ]
    };
  },
  methods: {
    packData() {
      return {
        name: this.name,
        width: this.width,
        key: this.key,
        required: this.required,
        disabled: this.disabled,
        value: this.value,
        radioOption: this.radioOption
      };
    },
    addOption() {
      this.radioOption.push({
        value: `值${this.radioOption.length + 1}`,
        label: `选项${this.radioOption.length + 1}`
      });
    },
    subOption(index) {
      this.radioOption.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
