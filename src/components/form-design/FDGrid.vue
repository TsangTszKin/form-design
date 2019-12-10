<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-15 21:32:27
 * @LastEditTime: 2019-05-15 21:32:27
 * @LastEditors: your name
 -->
<template>
  <el-form label-position="top" label-width="80px"  size="mini">
    <el-form-item label="列配置项（每行占比总和最多为24）">
      <div v-for="(item, i) in data.cols" :key="i">
        <el-input-number v-model="item.span" :min="1" :max="24" label="列占比" size="small"></el-input-number>
        <i class="el-icon-circle-close" style="color: red;" @click="subOption(i)"></i>
      </div>

      <div style="width: 100%;">
        <i class="el-icon-circle-plus" style="color: #17B3A3;" title="增加选项" @click="addOption"></i>
      </div>
    </el-form-item>

    <!-- <el-form-item label="数据绑定key">
      <el-input v-model="data.width" size="small" :disabled="true"></el-input>
    </el-form-item> -->
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
          title: '栅格布局',
          type: 'grid',
          icon: '/static/img/form-design/grid.png',
          cols: [{
            span: 12,
            list: [
            ]
          }, {
            span: 12,
            list: []
          }]
        }
      }
    }
  },
  data () {
    return {
      data: {
        title: '栅格布局',
        type: 'grid',
        icon: '/static/img/form-design/grid.png',
        cols: [{
          span: 12,
          list: [
          ]
        }, {
          span: 12,
          list: []
        }],
        key: common.getGuid()
      }
    }
  },
  methods: {
    addOption () {
      this.data.cols.push({
        span: 12,
        list: [
        ]
      })
    },
    subOption (index) {
      this.data.cols.splice(index, 1)
    }
  },
  watch: {
    data: {
      handler: function (value, oldValue) {
        let newFormList = common.deepClone(this.$store.state.formDesign.formList)
        let activeIndex
        for (let i = 0; i < newFormList.length; i++) {
          const element = newFormList[i]
          if (element.key === this.$store.state.formDesign.activeKey) {
            activeIndex = i
          }
        }
        if (!common.isEmpty(activeIndex)) {
          newFormList[activeIndex] = value
          this.$store.commit('formDesign/updateActiveKey', value.key)
          this.$store.dispatch('formDesign/setFormList', common.deepClone(newFormList))
          bus.$emit('formDesign.syncList', common.deepClone(newFormList))
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
