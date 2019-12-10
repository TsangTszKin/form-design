<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 13:53:44
 * @LastEditTime: 2019-11-19 12:04:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-col :span="12" style="border-right: 1px solid gray;">
    <el-divider content-position="left">受理材料</el-divider>
    <el-table size="mini" :data="materialList" style="width: 100%;margin-bottom: 60px;">
      <el-table-column header-align="center" align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            type="success"
            v-if="scope.row.state === 1 && scope.row.fileVoList && scope.row.fileVoList.length"
            :title="scope.row.materialsNote"
          >已上传</el-tag>
          <el-tag size="mini" type="danger" v-else :title="scope.row.materialsNote">待上传</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="materialsName" label="受理材料名称">
        <template slot-scope="scope">
          <template v-if="scope.row.fileVoList && scope.row.fileVoList.length">
            <a
              style="cursor: pointer;"
              @click.stop="downloadFile(scope.row)"
              :title="scope.row.materialsNote"
            >
              <span
                v-if="scope.row.required"
                style="margin-right: 5px;color: red;"
                :title="scope.row.materialsNote"
              >*</span>
              <span :title="scope.row.materialsNote">{{scope.row.materialsName}}</span>
            </a>
          </template>
          <template v-else>
            <span
              v-if="scope.row.required"
              style="margin-right: 5px;color: red;"
              :title="scope.row.materialsNote"
            >*</span>
            <span style="cursor: help;" :title="scope.row.materialsNote">{{scope.row.materialsName}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="100" v-if="!readOnly">
        <template slot-scope="scope">
          <el-upload
            ref="upload"
            :action="$http.adornUrl(`/api-oa/file/multiple`)"
            :headers="$http.getAuthHeader()"
            :show-file-list="false"
            :on-success="uploaded"
            :before-upload="beforeUpload"
          >
            <el-button
              type="text"
              size="small"
              :title="scope.row.materialsNote"
              @click="willUpload(scope.$index)"
            >{{scope.row.fileVoList.length?'附加上传':'上传'}}</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>

    <el-divider content-position="left">其他材料</el-divider>
    <div style="margin: 10px;">
      <el-button v-if="!readOnly" type="info" size="mini" @click="dialogVisibleFile = true">新增电子材料</el-button>
      <el-button v-if="!readOnly" type="info" size="mini" @click="dialogVisibleFile2 = true">新增纸质说明</el-button>
    </div>

    <el-table size="mini" :data="otherMaterialList" style="width: 100%">
      <el-table-column header-align="center" align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="fileVo.fileName" label="其他材料名称">
        <template slot-scope="scope">
          <a
            style="cursor: pointer;"
            @click.stop="downloadFile(scope.row, true)"
            :title="scope.row.fileVo.fileName"
            v-if="scope.row.type === 1"
          >
            <span :title="scope.row.fileVo.fileName">{{scope.row.fileVo.fileName}}</span>
          </a>
          <span v-else :title="scope.row.fileVo.fileName">{{scope.row.fileVo.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="电子/纸质">
        <template slot-scope="scope">
          <el-tag size="mini" type="info" v-if="scope.row.type === 1">电子</el-tag>
          <el-tag size="mini" type="info" v-if="scope.row.type === 2">纸质</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fileVo.fileSize" label="页数/大小(字节)"></el-table-column>
      <el-table-column prop="action" label="操作" width="100" v-if="!readOnly">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="removeOtherMaterialList(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="说明">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>

    <!-- 电子材料 -->
    <el-dialog title="电子材料" :visible.sync="dialogVisibleFile" width="30%" append-to-body>
      <el-form :model="currentCaiLiao" ref="currentCaiLiao">
        <el-form-item label="说明" prop="remark">
          <el-input
            type="textarea"
            v-model="currentCaiLiao.remark"
            :autosize="{ minRows: 6, maxRows: 6}"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        ref="uploadAddOtherMaterial"
        :action="$http.adornUrl(`/api-oa/file/single`)"
        :headers="$http.getAuthHeader()"
        :show-file-list="true"
        :on-success="uploaded2"
        :multiple="false"
        :limit="1"
        :on-exceed="onExceed"
      >
        <el-button type="info" size="small">选择文件上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOtherMaterial(1)">确定</el-button>
      </span>
    </el-dialog>

    <!-- 纸质说明 -->
    <el-dialog title="纸质说明" :visible.sync="dialogVisibleFile2" width="30%" append-to-body>
      <el-form :model="currentCaiLiao" ref="currentCaiLiao" label-position="top">
        <el-form-item label="名称" prop="name">
          <el-input v-model="currentCaiLiao.fileVo.fileName"></el-input>
        </el-form-item>
        <el-form-item label="页数" prop="name">
          <el-input-number v-model="currentCaiLiao.fileVo.fileSize"></el-input-number>
        </el-form-item>
        <el-form-item label="说明" prop="remark">
          <el-input
            type="textarea"
            v-model="currentCaiLiao.remark"
            :autosize="{ minRows: 6, maxRows: 6}"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOtherMaterial(2)">确定</el-button>
      </span>
    </el-dialog>
  </el-col>
</template>

<script>
import common from '@/utils/common'
// import {download} from '@/utils/download'

export default {
  props: {
    materialListProp: {
      type: Array,
      default: function () {
        return []
      }
    },
    otherMaterialListProp: {
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
      materialList: [],
      otherMaterialList: [],
      dialogVisibleFile: false,
      dialogVisibleFile2: false,
      currentCaiLiao: {
        type: '',
        remark: '',
        fileVo: {
          contentType: '',
          fileName: '',
          fileSize: '',
          objId: ''
        }
      }
    }
  },
  methods: {
    downloadFile (row, single = false) {
      console.warn('row', row)
      let url
      if (single) {
        url = `/api-oa/system/common/downloadBatchByFile?access_token=${this.$http.getAccessToken()}&objIds=${row.fileVo.objId}`
      } else {
        let ids = row.fileVoList.map(itm => itm.objId)
        if (!ids || !ids.length) {
          this.$message.error('文件不存在~')
          return
        }
        url = `/api-oa/system/common/downloadBatchByFile?access_token=${this.$http.getAccessToken()}`
        ids.forEach(itm => {
          url += '&objIds=' + itm
        })
      }
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
    addOtherMaterial (type) {
      if (type === 1) {
        if (common.isEmpty(this.currentCaiLiao.fileVo.objId)) {
          this.$message({
            message: '文件不能为空',
            type: 'warning',
            duration: 1500
          })
          return
        }
        this.currentCaiLiao.type = 1
        this.otherMaterialList.push(this.currentCaiLiao)
        this.$refs.uploadAddOtherMaterial.clearFiles()
      } else if (type === 2) {
        if (common.isEmpty(this.currentCaiLiao.fileVo.fileName)) {
          this.$message({
            message: '名称不能为空',
            type: 'error',
            duration: 1500
          })
          return
        }
        this.currentCaiLiao.type = 2
        this.otherMaterialList.push(this.currentCaiLiao)
      }
      this.dialogVisibleFile = false
      this.dialogVisibleFile2 = false
      this.resetFile()
    },
    removeOtherMaterialList (index) {
      this.otherMaterialList.splice(index, 1)
    },
    resetFile () {
      this.currentCaiLiao = {
        type: '',
        remark: '',
        fileVo: {
          contentType: '',
          fileName: '',
          fileSize: '',
          objId: ''
        }
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
    uploaded (res, file, fileList) {
      this.loading.close()
      if (res && res.code === 0) {
        let materia = this.materialList[this.uploadIndex]

        if (!materia.fileVoList) {
          materia.fileVoList = []
        }

        materia.fileVoList = materia.fileVoList.concat(res.fileList)
        materia.state = 1

        this.materialList.splice(this.uploadIndex, 1, materia)
      } else {
        this.$message({
          message: '上传文件失败',
          type: 'error',
          duration: 1500
        })
      }
    },
    uploaded2 (res, file, fileList) {
      if (res && res.code === 0) {
        this.currentCaiLiao.fileVo = res.fileList[0]
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
    materialListProp: {
      handler: function (value, oldValue) {
        if (Array.isArray(value)) {
          value.forEach(element => {
            if (!Array.isArray(element.fileVoList)) element.fileVoList = []
          })
        } else {
          value = []
        }

        this.materialList = value
      },
      deep: true,
      immediate: true
    },
    otherMaterialListProp: {
      handler: function (value, oldValue) {
        if (!Array.isArray(value)) {
          value = []
        }

        this.otherMaterialList = value
      },
      deep: true,
      immediate: true
    },
    materialList: {
      handler: function (value, oldValue) {
        this.$emit('materialListCallBack', value)
      },
      deep: true
    },
    otherMaterialList: {
      handler: function (value, oldValue) {
        this.$emit('otherMaterialListCallBack', value)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
