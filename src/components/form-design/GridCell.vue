<template>
  <div class="cell" :class="{'cell-active': data.key === $store.state.formDesign.activeKey}">
    <div @click="activeCell">
      <el-form-item
        v-if="data.type !== 'title'"
        :label="data.title+`${data.options.required?'（必填）':''}`"
        :prop="data.key"
      >
        <el-input
          v-if="data.type === 'input'"
          v-model="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          :disabled="data.options.disabled"
          :readonly="true"
          :style="{width: data.options.width}"
        ></el-input>
        <el-input
          v-if="data.type === 'textarea'"
          v-model="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          :disabled="data.options.disabled"
          :readonly="true"
          type="textarea"
          :rows="5"
          :style="{width: data.options.width}"
        ></el-input>
        <el-input-number
          v-if="data.type === 'number'"
          :disabled="data.options.disabled"
          :readonly="true"
          :style="{width: data.options.width}"
        ></el-input-number>
        <el-radio-group
          v-if="data.type === 'radio'"
          v-model="data.options.defaultValue"
          :disabled="data.options.disabled"
          :readonly="true"
          :style="{width: data.options.width}"
        >
          <el-radio
            v-for="(item, i) in data.options.option"
            :label="item.value"
            :key="i"
          >{{item.label}}</el-radio>
        </el-radio-group>
        <el-checkbox-group
          v-if="data.type === 'checkbox'"
          v-model="data.options.defaultValue"
          :disabled="data.options.disabled"
          :readonly="true"
          :style="{width: data.options.width}"
        >
          <el-checkbox
            v-for="(item, i) in data.options.option"
            :label="item.value"
            :key="i"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-select
          v-if="data.type === 'select'"
          :placeholder="data.options.placeholder"
          :style="{width: data.options.width}"
          :readonly="true"
          :disabled="data.options.disabled"
        >
          <el-option
            v-for="(item, i) in data.options.option"
            :key="i"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-switch
          v-if="data.type === 'switch'"
          v-model="data.options.defaultValue"
          active-color="#13ce66"
          inactive-color="#EEEEEE"
          :style="{width: data.options.width}"
          :readonly="true"
          :disabled="data.options.disabled"
        ></el-switch>
        <el-date-picker
          type="datetime"
          v-if="data.type === 'datetime'"
          :placeholder="data.options.placeholder"
          :style="{width: data.options.width}"
          :disabled="data.options.disabled"
        ></el-date-picker>
      </el-form-item>
      <p
        v-if="data.type === 'title'"
        :style="{'text-align': data.options.align, 'font-size': data.options.fontSize}"
        @click="activeCell"
      >{{data.value}}</p>
    </div>
    <i
      class="action-copy"
      title="复制"
      v-show="data.key === $store.state.formDesign.activeKey && data.type != 'grid'"
      @click="copyForm"
    ></i>
    <i
      class="action-delete"
      title="删除"
      v-show="data.key === $store.state.formDesign.activeKey"
      @click="deleteForm"
    ></i>
  </div>
</template>

<script>
import common from '@/utils/common'

export default {
  components: {},
  props: {
    formAttr: {
      type: Object,
      default: function () {
        return {
          align: 'top',
          size: 'medium',
          labelWidth: 80
        }
      }
    },
    data: {
      type: Object,
      default: function () {
        return {
          type: '',
          name: '',
          options: {
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            placeholder: ''
          },
          key: '1556775967000_4898'
        }
      }
    },
    isGrid: {
      type: Boolean,
      default: false
    },
    FDkey: {
      type: String,
      default: ''
    },
    FDindex: {
      type: Number
    }
  },
  methods: {
    copyForm () {
      let formList
      let grid
      let formListAll = common.deepClone(this.$store.state.formDesign.formList)
      formList = common.deepClone(this.$store.state.formDesign.grid[this.FDkey])
        .cols[this.FDindex].list
      grid = common.deepClone(this.$store.state.formDesign.grid[this.FDkey])
      let newIndex
      for (let i = 0; i < formList.length; i++) {
        const element = formList[i]
        if (element.key === this.data.key) {
          newIndex = i
          break
        }
      }
      let copyForm = common.deepClone(formList[newIndex])
      copyForm.key = common.getGuid()
      formList.splice(newIndex + 1, 0, copyForm)
      this.$store.commit(
        'formDesign/updateActiveForm',
        common.deepClone(copyForm)
      )
      this.$store.commit('formDesign/updateActiveKey', copyForm.key)
      grid.cols[this.FDindex].list = formList

      this.$store.commit('formDesign/updateGrid', {
        key: this.FDkey,
        value: common.deepClone(grid)
      })
      for (let i = 0; i < this.$store.state.formDesign.formList.length; i++) {
        const element = this.$store.state.formDesign.formList[i]
        if (element.key === this.FDkey) {
          formListAll[i] = common.deepClone(grid)
        }
      }
      this.$store.dispatch(
        'formDesign/setFormList',
        common.deepClone(formListAll)
      )
      this.$emit('syncList', formList, this.FDindex)
    },
    deleteForm () {
      let formList
      let grid
      let formListAll = common.deepClone(this.$store.state.formDesign.formList)
      formList = common.deepClone(this.$store.state.formDesign.grid[this.FDkey])
        .cols[this.FDindex].list
      grid = common.deepClone(this.$store.state.formDesign.grid[this.FDkey])
      let newIndex
      for (let i = 0; i < formList.length; i++) {
        const element = formList[i]
        if (element.key === this.data.key) {
          newIndex = i
          break
        }
      }
      formList.splice(newIndex, 1)
      grid.cols[this.FDindex].list = formList
      console.log('formList', formList)
      console.log('grid', grid)
      console.log('formListAll', formListAll)
      console.log('this.FDindex', this.FDindex)

      for (let i = 0; i < this.$store.state.formDesign.formList.length; i++) {
        const element = this.$store.state.formDesign.formList[i]
        if (element.key === this.FDkey) {
          formListAll[i] = grid
        }
      }

      this.$store.dispatch(
        'formDesign/setFormList',
        common.deepClone(formListAll)
      )

      // this.$emit("syncList", formList, this.FDindex);

      this.$store.commit('formDesign/updateGrid', {
        key: this.FDkey,
        value: common.deepClone(grid)
      })

      if (newIndex !== 0) {
        this.$store.commit(
          'formDesign/updateActiveKey',
          formList[newIndex - 1].key
        )
        this.$store.commit(
          'formDesign/updateActiveForm',
          common.deepClone(formList[newIndex - 1])
        )
      } else {
        if (formList.length > 0) {
          this.$store.commit('formDesign/updateActiveKey', formList[0].key)
          this.$store.commit(
            'formDesign/updateActiveForm',
            common.deepClone(formList[0])
          )
        }
      }
    },
    activeCell () {
      this.$store.commit('formDesign/updateActiveKey', this.data.key)
      this.$store.commit('formDesign/updateShowType', this.data.type)
      this.$store.commit(
        'formDesign/updateActiveForm',
        common.deepClone(this.data)
      )
    }
  }
}
</script>

<style lang="css" scoped>
.cell {
  background-color: #eee;
  padding: 10px 10px 20px 10px;
  position: relative;
  cursor: move;
}
.cell-active {
  background-color: #b3d8ff;
  border-left: 5px solid #409eff;
}
.el-form-item {
  margin-bottom: 0;
}
.action-copy {
  position: absolute;
  bottom: -15px;
  right: 60px;
  height: 30px;
  width: 30px;
  background: url("../../assets/img/copy.png") no-repeat center;
  background-size: 18px 18px;
  background-color: #ecf5ff;
  border-color: #409eff;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #409eff;
  z-index: 1;
}
.action-copy:hover {
  background: url("../../assets/img/copy-active.png") no-repeat center;
  background-color: #409eff;
}
.action-delete {
  position: absolute;
  bottom: -15px;
  right: 15px;
  height: 30px;
  width: 30px;
  background: url("../../assets/img/delete.png") no-repeat center;
  background-size: 15px 15px;
  background-color: #fef0f0;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #f56c6c;
  z-index: 1;
}
.action-delete:hover {
  background: url("../../assets/img/delete-active.png") no-repeat center;
  background-color: #f56c6c;
}
</style>
