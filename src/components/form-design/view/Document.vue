<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 13:53:44
 * @LastEditTime: 2019-11-12 12:21:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-col :span="12" style="border-right: 1px solid gray;">
    <el-divider content-position="left">正文</el-divider>
    <!-- <div class="edit_container_doc">
      <quill-editor ref="myQuillEditor" :options="editorOption" class="code-editor"></quill-editor>
    </div> -->
    <WebOffice />
    <el-divider content-position="left">附件</el-divider>
    <div style="margin: 10px;">
      <el-upload
        ref="uploadAddOtherMaterial"
        :action="$http.adornUrl(`/api-oa/file/single`)"
        :headers="$http.getAuthHeader()"
        :show-file-list="false"
        :on-success="uploaded2"
        :multiple="false"
        :limit="1"
        :on-exceed="onExceed"
      >
        <el-button v-if="!readOnly" type="info" size="mini">新增</el-button>
      </el-upload>
    </div>

    <el-table size="mini" :data="dfileList" style="width: 100%">
      <el-table-column header-align="center" align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="fileName" label="其他材料名称"></el-table-column>
      <el-table-column prop="fileSize" label="大小(字节)"></el-table-column>
      <el-table-column prop="action" label="操作" width="100" v-if="!readOnly">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="removeOtherMaterialList(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script>
// import common from '@/utils/common'
// import {download} from '@/utils/download'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import WebOffice from '@/components/common/WebOffice'

export default {
  props: {
    dfileListProp: {
      type: Array,
      default: function () {
        return []
      }
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dfileList: [],
      editorOption: {
        height: '300px',
        theme: 'snow', // or 'bubble'
        placeholder: '请输入内容'
      }
    }
  },
  components: {
    quillEditor, WebOffice
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    downloadFile (row) {
      let ids = row.fileVoList.map(itm => itm.objId)
      if (!ids || !ids.length) {
        this.$message.error('文件不存在~')
        return
      }
      let url = `/api-oa/system/common/downloadBatchByFile?access_token=${this.$http.getAccessToken()}`
      ids.forEach(itm => {
        url += '&objIds=' + itm
      })

      window.open(this.$http.adornUrl(url))
      /*
      let filename = ids.length === 1 ? row.fileVoList[0].fileName : row.materialsName + '.zip'
      download(ids, filename)
      .catch(e => {
        this.$message.error(e.message)
      }) */
    },
    onExceed () {
      this.$message({
        message: '最多上传一个文件',
        type: 'warning',
        duration: 1500
      })
    },
    removeOtherMaterialList (index) {
      this.dfileList.splice(index, 1)
    },
    resetFile () {
      this.currentCaiLiao = {
        contentType: '',
        fileName: '',
        fileSize: '',
        objId: '',
        state: 0
      }
    },
    willUpload (index) {
      this.uploadIndex = index
    },
    beforeUpload () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    uploaded2 (res, file, fileList) {
      if (res && res.code === 0) {
        this.dfileList.push(Object.assign(res.fileList[0], {state: 1}))
        this.$refs.uploadAddOtherMaterial.clearFiles()
        this.resetFile()
      } else {
        this.$message({
          message: '上传文件失败',
          type: 'error',
          duration: 1500
        })
      }
    }
  },
  watch: {
    dfileListProp: {
      handler: function (value, oldValue) {
        if (!Array.isArray(value)) {
          value = []
        }

        this.dfileList = value
      },
      deep: true,
      immediate: true
    },
    dfileList: {
      handler: function (value, oldValue) {
        this.$emit('dfileListCallBack', value)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
