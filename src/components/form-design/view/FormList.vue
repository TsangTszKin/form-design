<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 08:31:36
 * @LastEditTime: 2019-09-16 16:23:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form-design-main">
    <template v-for="(item, i) in formList">
      <form-item
        v-if="item.type !== 'grid' && item.type !== 'title'"
        :item="item"
        :formList="formList"
        :key="i"
        :idea="idea"
      />
      <p
        v-if="item.type === 'title'"
        :style="{'text-align': item.options.align, 'font-size': item.options.fontSize, 'margin-bottom': '20px'}"
        :key="i"
      >{{item.value}}</p>
      <el-row v-if="item.type === 'grid'" :key="i" :gutter="20">
        <el-col :span="col.span" v-for="(col, j) in item.cols" :key="j" class="col">
          <template v-for="(item2, j) in col.list">
            <form-item v-if="item2.type !== 'title'" :key="j" :item="item2" :formList="formList" :idea="idea" />
            <p
              v-if="item2.type === 'title'"
              :style="{'text-align': item2.options.align, 'font-size': item2.options.fontSize, 'margin-bottom': '20px'}"
              :key="j"
            >{{item2.value}}</p>
          </template>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import common from '@/utils/common'
import FormItem from './FormItem'
import bus from '@/utils/bus'

export default {
  components: { FormItem },
  props: {
    formListProp: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      formList: [],
      idea: {
        personal: [],
        public: []
      }
    }
  },
  mounted () {
    this.$on('updateFormList', (value) => {
      this.formList = value
    })
    bus.$on('getIdeaList', () => {
      this.getIdeaList()
    })
  },
  created () {
    this.formList = this.formListProp
  },
  methods: {
    getIdeaList () {
      this.$http({
        url: this.$http.adornUrl(`/api-oa/system/ideaman/selectList`),
        method: 'post'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          const {personList, publicList} = data.resultData
          if (!common.isEmpty(personList)) this.idea.personal = personList
          if (!common.isEmpty(publicList)) this.idea.public = publicList
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  watch: {
    formListProp: {
      handler: function (value, oldValue) {
        this.formList = value
      },
      deep: true,
      immediate: true
    },
    formList: {
      handler: function (value, oldValue) {
        console.log('formList 组件', common.deepClone(value))
        this.$emit('callBack', value)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
