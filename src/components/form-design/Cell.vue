<template>
  <div class="cell" :class="{'cell-active': data.key === $store.state.formDesign.activeKey}">
    <div>
      <el-form-item
        v-if="data.type !== 'grid' && data.type !== 'title'"
        :label="data.title"
        :prop="data.key"
        @click.native="activeCell"
      >
        <el-input
          v-if="data.type === 'input'"
          value=""
          :placeholder="data.options.placeholder"
          :disabled="data.options.disabled"
          :readonly="true"
          :style="{width: data.options.width}"
        ></el-input>
        <el-input
          v-if="data.type === 'textarea'"
          :placeholder="data.options.placeholder"
          :disabled="data.options.disabled"
          :readonly="true"
          type="textarea"
          :rows="5"
          :style="{width: data.options.width}"
        ></el-input>
        <template v-if="data.type === 'idea'">
          <el-input
            :placeholder="data.options.placeholder"
            :disabled="data.options.disabled"
            :readonly="true"
            type="textarea"
            :rows="5"
            :style="{width: data.options.width}"
            :id="data.key"
          ></el-input>
          <el-button type="text" @click="ideaDialogVisible = true; markIdeaKey(data.key);">选择快捷意见</el-button>
        </template>
        <el-input-number
          v-if="data.type === 'number'"
          :disabled="data.options.disabled"
          :readonly="true"
          :style="{width: data.options.width}"
        ></el-input-number>
        <el-radio-group
          v-if="data.type === 'radio'"
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
        <el-upload
          v-if="data.type === 'img'"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :file-list="[]"
          :disabled="data.options.disabled"
          :readonly="true"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <p
        v-if="data.type === 'title'"
        :style="{'text-align': data.options.align, 'font-size': data.options.fontSize}"
        @click="activeCell"
      >{{data.value}}</p>
      <FDGridPanel
        v-else
        :propData="data"
        :formAttr="formAttr"
        :FDkey="data.key"
        @syncList="syncList"
      />
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

    <el-dialog
      title="选择意见"
      :visible.sync="ideaDialogVisible"
      append-to-body
      modal-append-to-body
      width="30%"
    >
      <el-tabs v-model="ideaTabIndex">
        <el-tab-pane label="个人意见" name="1">
          <el-table :data="idea.personal" style="width: 100%">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="ideaNotes" label="意见内容" width="180">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  @click="appendNote(scope.row.ideaNotes)"
                >{{scope.row.ideaNotes}}</a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公共意见" name="2">
          <el-table :data="idea.public" style="width: 100%">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="ideaNotes" label="意见内容" width="180">
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
  </div>
</template>

<script>
import common from '@/utils/common'
import FDGridPanel from '@/components/form-design/FDGridPanel'
import bus from '@/utils/bus'

export default {
  components: {
    FDGridPanel
  },
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
          code: '',
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
    FDindex: {
      type: Number
    },
    idea: {
      type: Object,
      default: function () {
        return {
          personal: [
            {
              'ideaId': '402880ee6c3df518016c3e5251980008',
              'mainType': 1,
              'userId': null,
              'ideaNotes': '这是一条模拟个人意见文本',
              'sortOrder': null,
              'state': 1
            }
          ],
          public: [
            {
              'ideaId': '402880ee6c3df518016c3e5251980008',
              'mainType': 1,
              'userId': null,
              'ideaNotes': '这是一条模拟公共意见文本',
              'sortOrder': null,
              'state': 1
            }
          ]
        }
      }
    }
  },
  methods: {
    copyForm () {
      let formList = common.deepClone(this.$store.state.formDesign.formList)

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
      copyForm.code = `code_${common.getGuid2()}`
      formList.splice(newIndex + 1, 0, copyForm)
      this.$store.commit(
        'formDesign/updateActiveForm',
        common.deepClone(copyForm)
      )
      this.$store.commit('formDesign/updateActiveKey', copyForm.key)
      this.$emit('syncList', formList)
      this.$store.dispatch('formDesign/setFormList', formList)
    },
    deleteForm () {
      let formList = common.deepClone(this.$store.state.formDesign.formList)
      let newIndex
      for (let i = 0; i < formList.length; i++) {
        const element = formList[i]
        if (element.key === this.data.key) {
          newIndex = i
          break
        }
      }
      formList.splice(newIndex, 1)

      this.$emit('syncList', formList)
      this.$store.dispatch(
        'formDesign/setFormList',
        common.deepClone(formList)
      )

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
      bus.$emit('update.activeName', '1')
      this.$store.commit('formDesign/updateActiveKey', this.data.key)
      this.$store.commit('formDesign/updateShowType', this.data.type)
      this.$store.commit(
        'formDesign/updateActiveForm',
        common.deepClone(this.data)
      )
    },
    syncList (value) {
      this.$emit('syncList', value)
    },
    markIdeaKey (ideaKey) {
      sessionStorage.ideaKey = ideaKey
    },
    appendNote (note) {
      const realname = '管理员'
      const nowDate = common.formatDateCN(new Date().getTime())
      const result = `${note}\n\n                                                  ${realname}\n                                                  ${nowDate}`
      // let newFormList = common.deepClone(this.$store.state.formDesign.formList)
      // newFormList.forEach((el) => {
      //   if (el.type === 'idea' && el.key === sessionStorage.ideaKey) {
      //     el.options.defaultValue = result
      //     this.$emit('syncList', newFormList)
      //     this.$store.dispatch(
      //       'formDesign/setFormList',
      //       common.deepClone(newFormList)
      //     )
      //   }
      // })

      this.ideaDialogVisible = false
      window.document.getElementById(sessionStorage.ideaKey).value = result
    }
  },
  data () {
    return {
      ideaDialogVisible: false,
      ideaTabIndex: '1'
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
