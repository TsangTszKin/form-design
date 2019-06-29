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
    <el-form-item label="显示类型/格式">
      <el-cascader :options="dateTimeTypeOptions" v-model="data.options.type"></el-cascader>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input v-model="data.key" size="small" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.options.required" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.options.disabled" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="data.options.readonly" active-color="#13ce66" inactive-color="#EEEEEE"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import common from '@/utils/common'
import bus from '@/utils/bus'

export default {
  props: {
    propData: {
      type: Object,
      default: function () {
        return {
          title: '时间选择器',
          type: 'datetime',
          icon: '/src/assets/img/form-design/datetime.png',
          options: {
            width: '100%',
            type: ['ymd', 'yyyy-MM-dd'],
            defaultValue: '',
            required: false,
            disabled: false,
            placeholder: ''
          },
          key: common.getGuid()
        }
      }
    }
  },
  data () {
    return {
      data: {
        title: '时间选择器',
        type: 'datetime',
        icon: '/src/assets/img/form-design/datetime.png',
        options: {
          width: '100%',
          type: ['ymd', 'yyyy-MM-dd'],
          defaultValue: '',
          required: false,
          disabled: false,
          placeholder: ''
        },
        key: common.getGuid()
      },

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
  },
  watch: {
    data: {
      handler: function (value, oldValue) {
        let newFormList = common.deepClone(
          this.$store.state.formDesign.formList
        )
        // eslint-disable-next-line no-unused-vars
        let activeIndex
        for (let i = 0; i < this.$store.state.formDesign.formList.length; i++) {
          const element = newFormList[i]
          if (element.type !== 'grid') {
            if (element.key === this.$store.state.formDesign.activeKey) {
              activeIndex = i

              newFormList[i] = value
              this.$store.commit('formDesign/updateActiveKey', element.key)
              this.$store.dispatch('formDesign/setFormList', common.deepClone(newFormList))
              bus.$emit('formDesign.syncList', common.deepClone(newFormList))
              break
            }
          } else {
            for (let j = 0; j < element.cols.length; j++) {
              const element2 = element.cols[j]
              for (let k = 0; k < element2.list.length; k++) {
                const element3 = element2.list[k]
                if (element3.key === this.$store.state.formDesign.activeKey) {
                  activeIndex = i

                  newFormList[i].cols[j].list[k] = value
                  this.$store.commit('formDesign/updateActiveKey', element3.key)
                  this.$store.dispatch('formDesign/setFormList', common.deepClone(newFormList))
                  bus.$emit('formDesign.syncList', common.deepClone(newFormList))
                  break
                }
              }
            }
          }
        }
      },
      deep: true
    },
    propData: {
      handler: function (value) {
        this.data = common.deepClone(value)
      },
      deep: true
      // immediate: true
    }
  }
}
</script>

<style>
</style>
