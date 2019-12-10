<template>
  <el-form label-position="top" label-width="80px"  size="mini">
    <el-form-item label="标题内容">
      <el-input v-model="data.value" size="small"></el-input>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="data.options.fontSize" size="small"></el-input>
    </el-form-item>
    <el-form-item label="标题对齐方式">
      <el-radio-group v-model="data.options.align" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="center">居中对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="数据绑定key">
      <el-input :title="data.key" v-model="data.key" size="small" :disabled="true"></el-input>
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
          title: '表单标题',
          type: 'title',
          icon: 'biaoti',
          value: '标题',
          options: {
            align: 'center',
            fontSize: '18px'
          },
          key: common.getGuid()
        }
      }
    }
  },
  data () {
    return {
      data: {
        title: '表单标题',
        type: 'title',
        icon: 'biaoti',
        value: '标题',
        options: {
          align: 'center',
          fontSize: '18px'
        },
        key: common.getGuid()
      }
    }
  },
  methods: {
  },
  mounted () {
  },
  watch: {
    data: {
      handler: function (value, oldValue) {
        console.log('FDTitle watch', value)
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
        console.log('propData', value)
        this.data = common.deepClone(value)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>
