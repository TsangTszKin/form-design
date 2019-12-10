<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-30 12:28:12
 * @LastEditTime: 2019-10-22 11:19:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item :label="item.title" :prop="item.code">
    <el-input
      v-if="item.type === 'input'"
      :placeholder="item.options.placeholder"
      :disabled="item.options.disabled"
      :readonly="item.options.readonly"
      :style="{width: item.options.width}"
      v-model="item.options.defaultValue"
    ></el-input>
    <el-input
      v-if="item.type === 'textarea'"
      :placeholder="item.options.placeholder"
      :disabled="item.options.disabled"
      :readonly="item.options.readonly"
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 20}"
      :style="{width: item.options.width}"
      v-model="item.options.defaultValue"
    ></el-input>
    <template v-if="item.type === 'idea'">
      <el-input
        :placeholder="item.options.placeholder"
        :disabled="item.options.disabled"
        :readonly="item.options.readonly"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 20}"
        :style="{width: item.options.width}"
        :id="item.key"
        v-model="item.options.defaultValue"
      ></el-input>
      <el-button type="text" :disabled="item.options.disabled" @click="selectIdeaList(item)">选择快捷意见</el-button>
    </template>
    <el-input-number
      v-if="item.type === 'number'"
      :disabled="item.options.disabled"
      :readonly="item.options.readonly"
      :style="{width: item.options.width}"
      :min="item.options.min"
      :max="item.options.max"
    ></el-input-number>
    <el-radio-group
      v-if="item.type === 'radio'"
      :disabled="item.options.disabled"
      :readonly="item.options.readonly"
      :style="{width: item.options.width}"
      v-model="item.options.defaultValue"
    >
      <el-radio v-for="(item, i) in item.options.option" :label="item.value" :key="i">{{item.label}}</el-radio>
    </el-radio-group>
    <template v-if="item.type == 'checkbox'">
      <el-checkbox-group
        :disabled="item.options.disabled"
        :style="{width: item.options.width}"
        v-model="item.options.defaultValue"
      >
        <el-checkbox
          v-for="(itm, j) in item.options.option"
          :label="itm.value"
          :key="j"
        >{{itm.label}}</el-checkbox>
      </el-checkbox-group>
    </template>
    <el-select
      v-if="item.type === 'select'"
      :placeholder="item.options.placeholder"
      :style="{width: item.options.width}"
      :readonly="item.options.readonly"
      :disabled="item.options.disabled"
      v-model="item.options.defaultValue"
    >
      <el-option
        v-for="(item, i) in item.options.option"
        :key="i"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-switch
      v-if="item.type === 'switch'"
      active-color="#13ce66"
      inactive-color="#EEEEEE"
      :style="{width: item.options.width}"
      :readonly="item.options.readonly"
      :disabled="item.options.disabled"
      v-model="item.options.defaultValue"
    ></el-switch>
    <template v-if="item.type === 'datetime'">
      <el-time-select
        v-if="isTime(item.options.type)"
        :placeholder="item.options.placeholder"
        :style="{width: item.options.width}"
        :disabled="item.options.disabled"
        v-model="item.options.defaultValue"
        :value-format="item.options.type | time"
      ></el-time-select>
      <el-date-picker
        v-else
        :type="getType(item.options.type)"
        :placeholder="item.options.placeholder"
        :style="{width: item.options.width}"
        :disabled="item.options.disabled"
        v-model="item.options.defaultValue"
        :format="item.options.type | date"
        :value-format="item.options.type | date"
      ></el-date-picker>
    </template>
    <el-upload
      v-if="item.type === 'img'"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      :file-list="[{name: '图片.jpeg', url: item.options.defaultValue}]"
      :disabled="item.options.disabled"
      :readonly="true"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <el-dialog
      title="选择意见"
      :visible.sync="ideaDialogVisible"
      append-to-body
      modal-append-to-body
      width="500px"
    >
      <el-tabs v-model="ideaTabIndex">
        <el-tab-pane label="个人意见" name="1">
          <el-table :data="idea.personal" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="ideaNotes" label="意见内容">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  @click="appendNote(scope.row.ideaNotes)"
                >{{scope.row.ideaNotes}}</a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公共意见" name="2" style="height:300px;overflow: auto;">
          <el-table :data="idea.public" style="width: 100%;">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="ideaNotes" label="意见内容">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  @click="appendNote(scope.row.ideaNotes)"
                >{{scope.row.ideaNotes}}</a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ideaDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-form-item>
</template>
<script>
import common from '@/utils/common'
import bus from '@/utils/bus'

export default {
  props: {
    item: {
      type: Object
    },
    formList: {
      type: Array
    },
    idea: {
      type: Object,
      default: function () {
        return {
          personal: [
            {
              ideaId: '402880ee6c3df518016c3e5251980008',
              mainType: 1,
              userId: null,
              ideaNotes: '这是一条模拟个人意见文本',
              sortOrder: null,
              state: 1
            }
          ],
          public: [
            {
              ideaId: '402880ee6c3df518016c3e5251980008',
              mainType: 1,
              userId: null,
              ideaNotes: '这是一条模拟公共意见文本',
              sortOrder: null,
              state: 1
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      ideaDialogVisible: false,
      ideaTabIndex: '1'
    }
  },
  filters: {
    date (value) {
      return value && value.length ? value[1] : 'yyyy-MM-dd'
    },
    time (value) {
      return value && value.length ? value[1] : 'HH:mm:ss'
    },
    rule (value) {
      let rules = []
      if (value.options && value.options.required) {
        rules.push({
          required: true,
          message: '必填项不能为空',
          trigger: 'blur'
        })
      }
      return rules
    },
    deepClone (value) {
      return common.deepClone(value)
    }
  },
  methods: {
    isTime (type) {
      return type && type.length && ['hm', 'hms'].indexOf(type[0]) >= 0
    },
    getType (type) {
      if (!type || type.length === 0) {
        return 'date'
      } else if (type[0] === 'y') {
        return 'year'
      } else if (type[0] === 'ym' || type[0] === 'ymd') {
        return 'date'
      } else {
        return 'datetime'
      }
    },
    markIdeaKey (ideaKey) {
      sessionStorage.ideaKey = ideaKey
    },
    appendNote (note) {
      console.log('this.formList', this.formList)
      const realname = '管理员'
      const nowDate = common.formatDateCN(new Date().getTime())
      const result = `${note}\n\n                                                  ${realname}\n                                                  ${nowDate}`
      let newFormList = this.formList
      newFormList.forEach(el => {
        if (el.type === 'idea' && el.key === sessionStorage.ideaKey) {
          el.options.defaultValue = result
          this.$emit('updateFormList', newFormList)
          this.$store.dispatch(
            'formDesign/setFormList',
            common.deepClone(newFormList)
          )
        }
      })

      this.ideaDialogVisible = false
      // window.document.getElementById(sessionStorage.ideaKey).value = result
    },
    selectIdeaList (item) {
      bus.$emit('getIdeaList')
      this.ideaDialogVisible = true
      this.markIdeaKey(item.key)
    }
  },
  mounted () {
    console.log('item', this.item)
    console.log('formList', this.formList)
  }
}
</script>
<style scoped>
</style>