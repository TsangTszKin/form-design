<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 12:08:49
 * @LastEditTime: 2019-12-10 11:28:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    fullscreen
    :show-close="false"
    custom-class="form-design-main"
  >
    <div>
      <el-row style="margin-top: 17px;">
        <el-col style="width: 230px;position: fixed;top: 28px;">
          <FDMenu />
        </el-col>
        <el-col
          style="height:100%; width: calc(100% - 505px); margin-left:240px;overflow-y: auto;"
          :class="{'fd-main': $store.state.formDesign.formList.length == 0}"
          id="form-center"
        >
          <Panel :formAttr="formAttr" v-if="!formAttr.isTabs" />
          <el-tabs :type="formAttr.tabType" v-else v-model="tabIndex" @tab-click="tabHandleClick">
            <el-tab-pane
              :label="item.name"
              :name="String(i)"
              v-for="(item, i) in formAttr.tabs"
              :key="i"
            >
              <Panel ref="Panel" :formAttr="formAttr" @callBack="formListCallBack" />
            </el-tab-pane>
          </el-tabs>
          <!-- <nestedExample /> -->
        </el-col>
        <el-col
          style="width: 265px;position: fixed;top: 15px;right: 0px;overflow-y: auto;"
          id="form-attr"
        >
          <div style="margin-bottom: 10px;">
            <el-button
              type="primary"
              @click="dialogVisible = true"
              icon="el-icon-check"
              size="mini"
              style="margin: 0 5px 10px 10px;"
            >保存</el-button>
            <el-button
              v-if="showNewVersion"
              type="primary"
              @click="dialogVisible_newVersion = true"
              icon="el-icon-check"
              size="mini"
              style="margin: 0 5px 10px 10px;"
            >保存新版本</el-button>
            <el-button
              type="info"
              @click="showPreview"
              icon="el-icon-view"
              size="mini"
              style="margin: 0 5px 10px 10px;"
            >预览</el-button>
            <el-button
              type="danger"
              plain
              @click="visible = false"
              icon="el-icon-close"
              size="mini"
              style="margin: 0 5px 10px 10px;"
            >关闭</el-button>
          </div>
          <el-tabs
            class="form-design"
            v-model="activeName"
            @tab-click="handleClick"
            style="border-left: 1px solid #eee;padding: 0 10px;overflow: auto;height: 100%;"
            id="form-design-right"
          >
            <el-tab-pane label="字段属性" name="1" v-show="$store.state.formDesign.showType">
              <FDInput
                v-show="$store.state.formDesign.showType === 'input'"
                :propData="$store.state.formDesign.activeForm"
                :defaultValueList="defaultValueList"
              />
              <FDTextArea
                v-show="$store.state.formDesign.showType === 'textarea'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDIdea
                v-show="$store.state.formDesign.showType === 'idea'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDRadio
                v-show="$store.state.formDesign.showType === 'radio'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDNumber
                v-show="$store.state.formDesign.showType === 'number'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDCheckbox
                v-show="$store.state.formDesign.showType === 'checkbox'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDDateTime
                v-show="$store.state.formDesign.showType === 'datetime'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDSelect
                v-show="$store.state.formDesign.showType === 'select'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDSwitch
                v-show="$store.state.formDesign.showType === 'switch'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDImg
                v-show="$store.state.formDesign.showType === 'img'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDTitle
                v-show="$store.state.formDesign.showType === 'title'"
                :propData="$store.state.formDesign.activeForm"
              />
              <FDGrid
                v-show="$store.state.formDesign.showType === 'grid'"
                :propData="$store.state.formDesign.activeForm"
              />
            </el-tab-pane>
            <el-tab-pane label="表单属性" name="2">
              <el-form label-position="top" label-width="80px" size="mini">
                <el-form-item label="标签对齐方式">
                  <el-radio-group v-model="formAttr.align">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="组件尺寸">
                  <el-radio-group v-model="formAttr.size">
                    <el-radio-button label="large">大</el-radio-button>
                    <el-radio-button label="medium">中等</el-radio-button>
                    <el-radio-button label="small ">小</el-radio-button>
                    <el-radio-button label="mini ">迷你</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="表单字段宽度">
                  <el-input v-model="formAttr.labelWidth"></el-input>
                </el-form-item>

                <el-form-item label="启用tab表单">
                  <el-switch v-model="formAttr.isTabs" @change="changeTabMode"></el-switch>
                </el-form-item>
                <el-form-item label="tab模式" v-show="formAttr.isTabs">
                  <el-radio-group v-model="formAttr.tabType">
                    <el-radio-button label>简洁</el-radio-button>
                    <el-radio-button label="card">选项卡</el-radio-button>
                    <el-radio-button label="border-card ">卡片化</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="tab选项配置" v-show="formAttr.isTabs">
                  <div>
                    <ul style="list-style: none;padding: 0;">
                      <li v-for="(item, i) in formAttr.tabs" :key="i" style="margin-bottom: 10px;">
                        <el-input
                          size="small"
                          style="width:200px;"
                          :title="item.name"
                          v-model="item.name"
                        ></el-input>
                        <i class="el-icon-circle-close" style="color: red;" @click="subOption(i)"></i>
                      </li>
                      <li style="margin: 10px;">
                        <i
                          class="el-icon-circle-plus"
                          style="color: #17B3A3;"
                          title="增加选项"
                          @click="addOption"
                        ></i>
                      </li>
                    </ul>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

      <el-dialog title="表单预览" :visible.sync="dialogFormVisible" append-to-body custom-class="form-design-main">
        <el-form
          :label-position="formAttr.align"
          :label-width="formAttr.labelWidth"
          :size="formAttr.size"
          :rules="rules"
          v-if="!formAttr.isTabs"
        >
          <template v-for="(item, i) in $store.state.formDesign.formList">
            <el-form-item
              :label="item.title"
              :prop="item.key"
              v-if="item.type !== 'grid' && item.type !== 'title'"
              :key="i"
            >
              <el-input
                v-if="item.type === 'input'"
                :placeholder="item.options.placeholder"
                :disabled="item.options.disabled"
                :readonly="item.options.readonly"
                :style="{width: item.options.width}"
              ></el-input>
              <el-input
                v-if="item.type === 'textarea'"
                :placeholder="item.options.placeholder"
                :disabled="item.options.disabled"
                :readonly="item.options.readonly"
                type="textarea"
                :rows="5"
                :style="{width: item.options.width}"
              ></el-input>
              <template v-if="item.type === 'idea'">
                <el-input
                  v-model="item.options.defaultValue"
                  :placeholder="item.options.placeholder"
                  :disabled="item.options.disabled"
                  :readonly="true"
                  type="textarea"
                  :rows="5"
                  :style="{width: item.options.width}"
                  :id="item.key"
                ></el-input>
                <el-button
                  type="text"
                  @click="ideaDialogVisible = true;markIdeaKey(item.key);"
                  :disabled="item.options.disabled"
                >选择快捷意见</el-button>
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
                v-model="item.options.defaultValue"
                :disabled="item.options.disabled"
                :readonly="item.options.readonly"
                :style="{width: item.options.width}"
              >
                <el-radio
                  v-for="(item, i) in item.options.option"
                  :label="item.value"
                  :key="i"
                >{{item.label}}</el-radio>
              </el-radio-group>
              <el-checkbox-group
                v-if="item.type === 'checkbox'"
                v-model="item.options.defaultValue"
                :disabled="item.options.disabled"
                :style="{width: item.options.width}"
              >
                <el-checkbox
                  v-for="(item, i) in item.options.option"
                  :label="item.value"
                  :key="i"
                >{{item.label}}</el-checkbox>
              </el-checkbox-group>
              <el-select
                v-if="item.type === 'select'"
                :placeholder="item.options.placeholder"
                :style="{width: item.options.width}"
                :readonly="item.options.readonly"
                :disabled="item.options.disabled"
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
                v-model="item.options.defaultValue"
                active-color="#13ce66"
                inactive-color="#EEEEEE"
                :style="{width: item.options.width}"
                :readonly="item.options.readonly"
                :disabled="item.options.disabled"
              ></el-switch>
              <el-date-picker
                type="datetime"
                v-if="item.type === 'datetime'"
                :placeholder="item.options.placeholder"
                :style="{width: item.options.width}"
                :disabled="item.options.disabled"
              ></el-date-picker>
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
            </el-form-item>
            <p
              v-if="item.type === 'title'"
              :style="{'text-align': item.options.align, 'font-size': item.options.fontSize, 'margin-bottom': '5px'}"
              :key="i"
            >{{item.value}}</p>
            <el-row v-if="item.type === 'grid'" :key="i" :gutter="10">
              <el-col :span="col.span" v-for="(col, j) in item.cols" :key="j" class="col">
                <template v-for="(item2, j) in col.list">
                  <el-form-item
                    :label="item2.title"
                    :prop="item2.key"
                    v-if="item2.type !== 'title'"
                    :key="j"
                  >
                    <el-input
                      v-if="item2.type === 'input'"
                      :placeholder="item2.options.placeholder"
                      :disabled="item2.options.disabled"
                      :readonly="item2.options.readonly"
                      :style="{width: item2.options.width}"
                    ></el-input>
                    <el-input
                      v-if="item2.type === 'textarea'"
                      :placeholder="item2.options.placeholder"
                      :disabled="item2.options.disabled"
                      :readonly="item2.options.readonly"
                      type="textarea"
                      :rows="5"
                      :style="{width: item2.options.width}"
                    ></el-input>
                    <el-input-number
                      v-if="item2.type === 'number'"
                      :disabled="item2.options.disabled"
                      :readonly="item2.options.readonly"
                      :style="{width: item2.options.width}"
                      :min="item2.options.min"
                      :max="item2.options.max"
                    ></el-input-number>
                    <el-radio-group
                      v-if="item2.type === 'radio'"
                      v-model="item2.options.defaultValue"
                      :disabled="item2.options.disabled"
                      :readonly="item2.options.readonly"
                      :style="{width: item2.options.width}"
                    >
                      <el-radio
                        v-for="(item2, i) in item2.options.option"
                        :label="item2.value"
                        :key="i"
                      >{{item.label}}</el-radio>
                    </el-radio-group>
                    <el-checkbox-group
                      v-if="item2.type === 'checkbox'"
                      v-model="item2.options.defaultValue"
                      :disabled="item2.options.disabled"
                      :readonly="item2.options.readonly"
                      :style="{width: item2.options.width}"
                    >
                      <el-checkbox
                        v-for="(item2, i) in item2.options.option"
                        :label="item2.value"
                        :key="i"
                      >{{item2.label}}</el-checkbox>
                    </el-checkbox-group>
                    <el-select
                      v-if="item2.type === 'select'"
                      :placeholder="item2.options.placeholder"
                      :style="{width: item2.options.width}"
                      :readonly="item2.options.readonly"
                      :disabled="item2.options.disabled"
                    >
                      <el-option
                        v-for="(item2, i) in item2.options.option"
                        :key="i"
                        :label="item2.label"
                        :value="item2.value"
                      ></el-option>
                    </el-select>
                    <el-switch
                      v-if="item2.type === 'switch'"
                      v-model="item2.options.defaultValue"
                      active-color="#13ce66"
                      inactive-color="#EEEEEE"
                      :style="{width: item2.options.width}"
                      :readonly="iitem2tem.options.readonly"
                      :disabled="item2.options.disabled"
                    ></el-switch>
                    <el-date-picker
                      type="datetime"
                      v-if="item2.type === 'datetime'"
                      :placeholder="item2.options.placeholder"
                      :style="{width: item2.options.width}"
                      :disabled="item2.options.disabled"
                    ></el-date-picker>
                  </el-form-item>
                  <p
                    v-if="item2.type === 'title'"
                    :style="{'text-align': item2.options.align, 'font-size': item2.options.fontSize, 'margin-bottom': '5px'}"
                    :key="j"
                  >{{item2.value}}</p>
                </template>
              </el-col>
            </el-row>
          </template>
          <el-form-item>
            <el-button type="primary" @click="submitForm('rules')">模拟提交表单</el-button>
          </el-form-item>
        </el-form>

        <el-tabs
          :type="formAttr.tabType"
          v-else
          @tab-click="tabHandleClick_preview"
          v-model="tabIndex"
        >
          <el-tab-pane
            :label="item.name"
            :name="String(i)"
            v-for="(item, i) in formAttr.tabs"
            :key="i"
          >
            <el-form
              :label-position="formAttr.align"
              :label-width="formAttr.labelWidth"
              :size="formAttr.size"
              :rules="rules"
            >
              <template v-for="(item, i) in $store.state.formDesign.formList">
                <el-form-item
                  :label="item.title"
                  :prop="item.key"
                  v-if="item.type !== 'grid' && item.type !== 'title'"
                  :key="i"
                >
                  <el-input
                    v-if="item.type === 'input'"
                    :placeholder="item.options.placeholder"
                    :disabled="item.options.disabled"
                    :readonly="item.options.readonly"
                    :style="{width: item.options.width}"
                  ></el-input>
                  <el-input
                    v-if="item.type === 'textarea'"
                    :placeholder="item.options.placeholder"
                    :disabled="item.options.disabled"
                    :readonly="item.options.readonly"
                    type="textarea"
                    :rows="5"
                    :style="{width: item.options.width}"
                  ></el-input>
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
                    v-model="item.options.defaultValue"
                    :disabled="item.options.disabled"
                    :readonly="item.options.readonly"
                    :style="{width: item.options.width}"
                  >
                    <el-radio
                      v-for="(item, i) in item.options.option"
                      :label="item.value"
                      :key="i"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-checkbox-group
                    v-if="item.type === 'checkbox'"
                    v-model="item.options.defaultValue"
                    :disabled="item.options.disabled"
                    :readonly="item.options.readonly"
                    :style="{width: item.options.width}"
                  >
                    <el-checkbox
                      v-for="(item, i) in item.options.option"
                      :label="item.value"
                      :key="i"
                    >{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                  <el-select
                    v-if="item.type === 'select'"
                    :placeholder="item.options.placeholder"
                    :style="{width: item.options.width}"
                    :readonly="item.options.readonly"
                    :disabled="item.options.disabled"
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
                    v-model="item.options.defaultValue"
                    active-color="#13ce66"
                    inactive-color="#EEEEEE"
                    :style="{width: item.options.width}"
                    :readonly="item.options.readonly"
                    :disabled="item.options.disabled"
                  ></el-switch>
                  <el-date-picker
                    type="datetime"
                    v-if="item.type === 'datetime'"
                    :placeholder="item.options.placeholder"
                    :style="{width: item.options.width}"
                    :disabled="item.options.disabled"
                  ></el-date-picker>
                </el-form-item>
                <p
                  v-if="item.type === 'title'"
                  :style="{'text-align': item.options.align, 'font-size': item.options.fontSize, 'margin-bottom': '5px'}"
                  :key="i"
                >{{item.value}}</p>
                <el-row v-if="item.type === 'grid'" :key="i">
                  <el-col
                    :span="col.span"
                    v-for="(col, j) in item.cols"
                    :key="j"
                    class="col"
                    style="padding: 5px;"
                  >
                    <template v-for="(item2, j) in col.list">
                      <el-form-item
                        :label="item2.title"
                        :prop="item2.key"
                        v-if="item2.type !== 'title'"
                        :key="j"
                      >
                        <el-input
                          v-if="item2.type === 'input'"
                          :placeholder="item2.options.placeholder"
                          :disabled="item2.options.disabled"
                          :readonly="item2.options.readonly"
                          :style="{width: item2.options.width}"
                        ></el-input>
                        <el-input
                          v-if="item2.type === 'textarea'"
                          :placeholder="item2.options.placeholder"
                          :disabled="item2.options.disabled"
                          :readonly="item2.options.readonly"
                          type="textarea"
                          :rows="5"
                          :style="{width: item2.options.width}"
                        ></el-input>
                        <el-input-number
                          v-if="item2.type === 'number'"
                          :disabled="item2.options.disabled"
                          :readonly="item2.options.readonly"
                          :style="{width: item2.options.width}"
                          :min="item2.options.min"
                          :max="item2.options.max"
                        ></el-input-number>
                        <el-radio-group
                          v-if="item2.type === 'radio'"
                          v-model="item2.options.defaultValue"
                          :disabled="item2.options.disabled"
                          :readonly="item2.options.readonly"
                          :style="{width: item2.options.width}"
                        >
                          <el-radio
                            v-for="(item2, i) in item2.options.option"
                            :label="item2.value"
                            :key="i"
                          >{{item.label}}</el-radio>
                        </el-radio-group>
                        <el-checkbox-group
                          v-if="item2.type === 'checkbox'"
                          v-model="item2.options.defaultValue"
                          :disabled="item2.options.disabled"
                          :readonly="item2.options.readonly"
                          :style="{width: item2.options.width}"
                        >
                          <el-checkbox
                            v-for="(item2, i) in item2.options.option"
                            :label="item2.value"
                            :key="i"
                          >{{item2.label}}</el-checkbox>
                        </el-checkbox-group>
                        <el-select
                          v-if="item2.type === 'select'"
                          :placeholder="item2.options.placeholder"
                          :style="{width: item2.options.width}"
                          :readonly="item2.options.readonly"
                          :disabled="item2.options.disabled"
                        >
                          <el-option
                            v-for="(item2, i) in item2.options.option"
                            :key="i"
                            :label="item2.label"
                            :value="item2.value"
                          ></el-option>
                        </el-select>
                        <el-switch
                          v-if="item2.type === 'switch'"
                          v-model="item2.options.defaultValue"
                          active-color="#13ce66"
                          inactive-color="#EEEEEE"
                          :style="{width: item2.options.width}"
                          :readonly="iitem2tem.options.readonly"
                          :disabled="item2.options.disabled"
                        ></el-switch>
                        <el-date-picker
                          type="datetime"
                          v-if="item2.type === 'datetime'"
                          :placeholder="item2.options.placeholder"
                          :style="{width: item2.options.width}"
                          :disabled="item2.options.disabled"
                        ></el-date-picker>
                      </el-form-item>
                      <p
                        v-if="item2.type === 'title'"
                        :style="{'text-align': item2.options.align, 'font-size': item2.options.fontSize, 'margin-bottom': '5px'}"
                        :key="j"
                      >{{item2.value}}</p>
                    </template>
                  </el-col>
                </el-row>
              </template>
              <el-form-item>
                <el-button type="primary" @click="submitForm('rules')">模拟提交表单</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="保存" :visible.sync="dialogVisible" append-to-body>
        <el-form :model="saveData" @keyup.enter.native="getDataList()" label-position="left">
          <el-form-item label="名称">
            <el-input v-model="saveData.name" placeholder="名称" clearable style="width: 100%;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="编码">
            <el-input v-model="saveData.code" placeholder="编码" clearable style="width: 100%;"></el-input>
          </el-form-item> -->
          <el-form-item label="备注">
            <el-input
              style="width: 100%;"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="saveData.remarks"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="保存新版本" :visible.sync="dialogVisible_newVersion" append-to-body>
        <el-form :model="saveData" @keyup.enter.native="getDataList()" label-position="left">
          <el-form-item label="名称">
            <el-input v-model="saveData.name" placeholder="名称" clearable style="width: 100%;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="编码">
            <el-input v-model="saveData.code" placeholder="编码" clearable style="width: 100%;"></el-input>
          </el-form-item> -->
          <el-form-item label="备注">
            <el-input
              style="width: 100%;"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="saveData.remarks"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveNewVersion">确 定</el-button>
        </div>
      </el-dialog>

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
  </el-dialog>
</template>

<script>
import FDInput from '@/components/form-design/FDInput'
import FDTextArea from '@/components/form-design/FDTextArea'
import FDIdea from '@/components/form-design/FDIdea'
import FDNumber from '@/components/form-design/FDNumber'
import FDRadio from '@/components/form-design/FDRadio'
import FDCheckbox from '@/components/form-design/FDCheckbox'
import FDDateTime from '@/components/form-design/FDDateTime'
import FDSelect from '@/components/form-design/FDSelect'
import FDSwitch from '@/components/form-design/FDSwitch'
import FDImg from '@/components/form-design/FDImg'
import Panel from '@/components/form-design/Panel'
import Test from '@/components/form-design/Test'
import FDMenu from '@/components/form-design/FDMenu'
import FDGrid from '@/components/form-design/FDGrid'
import nestedExample from '@/components/form-design/nestedExample'
import common from '@/utils/common'
import FDTitle from '@/components/form-design/FDTitle'
import bus from '@/utils/bus'
export default {
  components: {
    FDInput,
    FDTextArea,
    FDNumber,
    FDRadio,
    FDCheckbox,
    FDDateTime,
    FDSelect,
    FDSwitch,
    FDImg,
    Panel,
    Test,
    FDMenu,
    nestedExample,
    FDGrid,
    FDTitle,
    FDIdea
  },
  data () {
    return {
      visible: false,
      activeName: '2',
      formAttr: {
        align: 'left',
        size: 'medium',
        labelWidth: '80px',
        isTabs: false,
        tabType: 'card',
        tabs: [
          {
            name: 'tab1',
            formList: []
          }
        ]
      },
      dialogFormVisible: false,
      dataListLoading: false,
      dialogVisible: false,
      dialogVisible_newVersion: false,
      tabIndex: '0',
      saveData: {
        code: '',
        columnList: [
        ],
        content: '',
        name: '',
        remarks: ''
      },
      dataForm: {
        name: '',
        code: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      // eslint-disable-next-line no-dupe-keys
      dataListLoading: false,
      columnList: [],
      columnList_extend: [],
      rules: {},
      timer: null,
      idea: {
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
      },
      ideaDialogVisible: false,
      ideaTabIndex: '1',
      defaultValueList: [],
      id: ''
    }
  },
  computed: {
    showNewVersion () {
      return !common.isEmpty(this.id)
    }
  },
  methods: {
    reset () {
      this.saveData = {
        code: '',
        columnList: [
        ],
        content: '',
        name: '',
        remarks: ''
      }

      this.formAttr = {
        align: 'left',
        size: 'medium',
        labelWidth: '80px',
        isTabs: false,
        tabType: 'card',
        tabs: [
          {
            name: 'tab1',
            formList: []
          }
        ]
      }
      this.id = ''
    },
    showPreview () {
      this.dialogFormVisible = true
      this.tabIndex = '0'
      if (this.formAttr.isTabs) {
        this.$store.dispatch('formDesign/setFormList', this.formAttr.tabs[0].formList)
      }
      this.initFormRule()
    },
    formListCallBack (formList) {
      this.formAttr.tabs[Number(this.tabIndex)].formList = this.$store.state.formDesign.formList
      console.log('this.formAttr', this.formAttr)
    },
    tabHandleClick (tab, event) {
      console.log(
        'this.$store.state.formDesign.formList = ',
        this.$store.state.formDesign.formList
      )
      console.log(tab, event)
      this.$refs.Panel[Number(this.tabIndex)].init(
        common.deepClone(this.formAttr.tabs[Number(this.tabIndex)].formList)
      )
      // this.$refs.Panel[Number(this.tabIndex)].init(this.$store.state.formDesign.formList);
    },
    tabHandleClick_preview (tab, event) {
      console.log('tab.index', tab.index)
      this.$store.dispatch(
        'formDesign/setFormList',
        common.deepClone(this.formAttr.tabs[Number(tab.index)].formList)
      )
      let formList = this.formAttr.tabs[Number(tab.index)].formList
      let rules = {}
      formList.forEach(element => {
        if (element.options.required) {
          rules[element.key] = [{ required: element.options.required, message: '必填项不能为空', trigger: 'blur' }]
        }
      })
      this.rules = rules
    },
    addOption () {
      this.formAttr.tabs.push({
        name: `tab${this.formAttr.tabs.length + 1}`,
        formList: []
      })
    },
    subOption (index) {
      this.formAttr.tabs.splice(index, 1)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    packData (formList, tabName = null) {
      for (let i = 0; i < formList.length; i++) {
        const element = formList[i]
        if (element.type !== 'grid') {
          // eslint-disable-next-line no-unused-vars
          let exist = false

          this.columnList.forEach(element2 => {
            if (element2.code === element.code) {
              exist = true
              element2.code = element.code
              element2.placeholder = element.options.placeholder
              // element2.defaultValue = element.options.defaultValue
              element2.isReadonly = element.options.readonly
              element2.name = element.title
            }
          })

          if (exist) continue
          switch (element.type) {
            case 'input':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'textarea':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'idea':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'number':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'radio':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'checkbox':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                defaultValue: '',
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'datetime':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'select':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            case 'switch':
              this.columnList_extend.push({
                key: element.key,
                code: element.code,
                tableColumnCode: element.tableColumnCode,
                placeholder: element.options.placeholder,
                // defaultValue: element.options.defaultValue,
                formType: element.formType,
                isReadonly: element.options.readonly,
                len: element.options.maxlength,
                name: element.title,
                tabName: tabName
              })
              break
            default:
              break
          }
        } else {
          element.cols.forEach(element2 => {
            this.packData(element2.list, tabName)
          })
        }
      }
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
    },
    // 保存数据
    save () {
      console.log(this.saveData)
      if (!this.verify()) return
      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(element => {
          this.packData(common.deepClone(element.formList), element.name)
        })
      } else {
        this.packData(common.deepClone(this.$store.state.formDesign.formList))
      }
      console.log('this.columnList', this.columnList)
      console.log('this.columnList_extend', this.columnList_extend)
      // return
      // eslint-disable-next-line camelcase
      let all_columnList = []
      // eslint-disable-next-line camelcase
      let all_formListCode = []
      console.log('this.formAttr', this.formAttr)
      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(element => {
          element.formList.forEach(element2 => {
            if (element2.type === 'grid') {
              element2.cols.forEach(element3 => {
                element3.list.forEach(element4 => {
                  all_formListCode.push(element4.code)
                })
              })
            } else {
              if (element2.type !== 'title') { all_formListCode.push(element2.code) }
            }
          })
        })
      } else {
        this.$store.state.formDesign.formList.forEach(element => {
          if (element.type === 'grid') {
            element.cols.forEach(element2 => {
              element2.list.forEach(element3 => {
                all_formListCode.push(element3.code)
              })
            })
          } else {
            if (element.type !== 'title') { all_formListCode.push(element.code) }
          }
        })
      }
      console.log('all_formListCode', all_formListCode)
      let tempArray = [...this.columnList, ...this.columnList_extend]
      for (let i = 0; i < tempArray.length; i++) {
        const element = tempArray[i]
        if (all_formListCode.includes(element.code)) {
          all_columnList.push(element)
        }
      }
      // console.log('all_columnList', all_columnList)
      // console.log('this.formAttr.tabs', this.formAttr.tabs)

      let result = []
      // 解决排序问题
      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(el1 => {
          el1.formList.forEach(el2 => {
            if (el2.type === 'grid') {
              el2.cols.forEach(el3 => {
                el3.list.forEach(el4 => {
                  all_columnList.forEach(el5 => {
                    if (el4.key === el5.key && el4.code === el5.code) {
                      result.push(el5)
                    }
                  })
                })
              })
            } else {
              all_columnList.forEach(el5 => {
                if (el2.key === el5.key) {
                  result.push(el5)
                }
              })
            }
          })
        })
      } else {
        common.deepClone(this.$store.state.formDesign.formList).forEach(el2 => {
          if (el2.type === 'grid') {
            el2.cols.forEach(el3 => {
              el3.list.forEach(el4 => {
                all_columnList.forEach(el5 => {
                  if (el4.key === el5.key) {
                    result.push(el5)
                  }
                })
              })
            })
          } else {
            all_columnList.forEach(el5 => {
              if (el2.key === el5.key) {
                result.push(el5)
              }
            })
          }
        })
      }

      console.log('排序后columnListresult', common.deepClone(result))

      this.saveData.columnList = common.deepClone(result)
      this.saveData.content = JSON.stringify({
        formList: this.$store.state.formDesign.formList,
        formAttr: this.formAttr
      })
      this.columnList = []
      this.dataListLoading = true
      console.log('this.saveData', common.deepClone(this.saveData))
      common.loading.show()
      this.$http({
        url: this.$http.adornUrl('/api-flow/dycform/save'),
        method: 'put',
        data: this.$http.adornData(this.saveData)
      })
        .then(({ data }) => {
          common.loading.hide()
          if (data && data.code === 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.visible = false
            this.$emit('refreshDataList')
          } else {
            this.$message.error(data.msg)
          }
        })
        .catch(() => { common.loading.hide() })
    },
    saveNewVersion () {
      console.log(this.saveData)
      if (!this.verify()) return
      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(element => {
          this.packData(common.deepClone(element.formList), element.name)
        })
      } else {
        this.packData(common.deepClone(this.$store.state.formDesign.formList))
      }
      console.log('this.columnList', this.columnList)
      console.log('this.columnList_extend', this.columnList_extend)
      // return
      // eslint-disable-next-line camelcase
      let all_columnList = []
      // eslint-disable-next-line camelcase
      let all_formListCode = []
      console.log('this.formAttr', this.formAttr)
      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(element => {
          element.formList.forEach(element2 => {
            if (element2.type === 'grid') {
              element2.cols.forEach(element3 => {
                element3.list.forEach(element4 => {
                  all_formListCode.push(element4.code)
                })
              })
            } else {
              if (element2.type !== 'title') { all_formListCode.push(element2.code) }
            }
          })
        })
      } else {
        this.$store.state.formDesign.formList.forEach(element => {
          if (element.type === 'grid') {
            element.cols.forEach(element2 => {
              element2.list.forEach(element3 => {
                all_formListCode.push(element3.code)
              })
            })
          } else {
            if (element.type !== 'title') { all_formListCode.push(element.code) }
          }
        })
      }
      console.log('all_formListCode', all_formListCode)
      let tempArray = [...this.columnList, ...this.columnList_extend]
      for (let i = 0; i < tempArray.length; i++) {
        const element = tempArray[i]
        if (all_formListCode.includes(element.code)) {
          all_columnList.push(element)
        }
      }
      console.log('all_columnList', all_columnList)

      let result = []
      // 解决排序问题
      if (this.formAttr.isTabs) {
        this.formAttr.tabs.forEach(el1 => {
          el1.formList.forEach(el2 => {
            if (el2.type === 'grid') {
              el2.cols.forEach(el3 => {
                el3.list.forEach(el4 => {
                  all_columnList.forEach(el5 => {
                    if (el4.key === el5.key && el4.code === el5.code) {
                      result.push(el5)
                    }
                  })
                })
              })
            } else {
              all_columnList.forEach(el5 => {
                if (el2.key === el5.key) {
                  result.push(el5)
                }
              })
            }
          })
        })
      } else {
        common.deepClone(this.$store.state.formDesign.formList).forEach(el2 => {
          if (el2.type === 'grid') {
            el2.cols.forEach(el3 => {
              el3.list.forEach(el4 => {
                all_columnList.forEach(el5 => {
                  if (el4.key === el5.key) {
                    result.push(el5)
                  }
                })
              })
            })
          } else {
            all_columnList.forEach(el5 => {
              if (el2.key === el5.key) {
                result.push(el5)
              }
            })
          }
        })
      }

      this.saveData.columnList = common.deepClone(result)
      this.saveData.content = JSON.stringify({
        formList: this.$store.state.formDesign.formList,
        formAttr: this.formAttr
      })
      this.columnList = []
      this.dataListLoading = true
      console.log('this.saveData', common.deepClone(this.saveData))
      common.loading.show()
      this.$http({
        url: this.$http.adornUrl('/api-flow/dycform/saveAsNewVersion'),
        method: 'put',
        data: this.$http.adornData(this.saveData)
      })
        .then(({ data }) => {
          common.loading.hide()
          if (data && data.code === 0) {
            this.$message({
              message: '保存新版本成功',
              type: 'success'
            })
            this.dialogVisible_newVersion = false
            this.visible = false
            this.$emit('refreshDataList')
          } else {
            this.$message.error(data.msg)
          }
        })
        .catch(() => { })
    },
    init (id = '') {
      this.visible = true
      this.columnList = []
      this.columnList_extend = []
      this.activeName = '2'
      this.tabIndex = '0'
      this.reset()
      this.$nextTick(() => {
        if (common.isEmpty(id)) {
          this.$store.dispatch('formDesign/setFormList', [])
          return
        }
        this.id = id
        this.$http({
          url: this.$http.adornUrl('/api-flow/dycform/get2'),
          method: 'get',
          params: this.$http.adornParams({ id })
        })
          .then(({ data }) => {
            if (data && data.code === 0) {
              const {defaultValueList, dycFormVo} = data.resultData
              this.defaultValueList = defaultValueList
              this.saveData = common.deepClone(dycFormVo)
              this.columnList = common.deepClone(dycFormVo.columnList)
              this.columnList_extend = []
              // eslint-disable-next-line no-unused-vars

              let content = JSON.parse(dycFormVo.content)
              this.formAttr = content.formAttr

              if (this.formAttr.isTabs) {
                this.$store.dispatch(
                  'formDesign/setFormList',
                  this.formAttr.tabs[0].formList
                )
              } else {
                this.$store.dispatch('formDesign/setFormList', content.formList)
              }
            } else {
              this.$message.error(data.msg)
            }
          })
          .catch(() => { })
      })
    },
    verify () {
      if (common.isEmpty(this.saveData.name)) {
        this.$message({
          message: '表单名称不能为空',
          type: 'warning'
        })
        return false
      }
      // if (common.isEmpty(this.saveData.code)) {
      //   this.$message({
      //     message: '表单编码不能为空',
      //     type: 'warning'
      //   })
      //   return false
      // }
      // if (common.isEmpty(this.saveData.content)) {
      //   this.$message({
      //     message: '表单内容不能为空',
      //     type: 'warning'
      //   })
      //   return false
      // }
      return true
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/api-flow/dyctable/list'),
        method: 'post',
        params: this.$http.adornParams(
          {
            pageNo: this.pageIndex,
            pageSize: this.pageSize,
            name: this.dataForm.name,
            code: this.dataForm.code
          },
          false
        )
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.resultData.resultList
          this.totalPage = data.resultData.sum
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    changeTabMode (value) {
      if (value) {
        let formAttr = common.deepClone(this.formAttr)
        formAttr.tabType = 'card'
        formAttr.tabs = [
          {
            name: 'tab1',
            formList: this.$store.state.formDesign.formList
          }
        ]
        this.formAttr = formAttr
      }
    },
    initFormRule () {
      if (this.formAttr.isTabs) {
        let formList = this.formAttr.tabs[0].formList
        let rules = {}
        formList.forEach(element => {
          if (element.options.required) {
            rules[element.key] = [{ required: element.options.required, message: '必填项不能为空', trigger: 'blur' }]
          }
        })
        this.rules = rules
      } else {
        let formList = this.$store.state.formDesign.formList
        let rules = {}
        formList.forEach(element => {
          if (element.options.required) {
            rules[element.key] = [{ required: element.options.required, message: '必填项不能为空', trigger: 'blur' }]
          }
        })
        this.rules = rules
      }
    }
  },
  mounted () {
    this.reset()

    bus.$on('update.activeName', (value) => {
      this.activeName = value
    })
    this.timer = setInterval(() => {
      // console.log(document.body.clientHeight)
      // console.log(document.documentElement.clientHeight)
      let height = document.documentElement.clientHeight
      try {
        window.document.getElementById('form-attr').style.maxHeight = Number(height - 20) + 'px'
        window.document.getElementById('form-center').style.height = Number(height - 20) + 'px'
      } catch (error) {
        // console.info(error)
      }
      // window.document.getElementById('form-attr').style.height = Number(document.body.clientHeight - 80) + 'px'
      // window.document.getElementById('form-design-right').style.height = Number(document.body.clientHeight - 20) + 'px'
    }, 1000)

    this.init()
  },
  filters: {
    labelWidth (value) {
      return `${value}px`
    }
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    this.$store.dispatch('formDesign/setFormList', [])
  }
}
</script>

<style lang="css" scoped>
.form-design .el-tabs__nav {
  width: 100%;
}
.form-design .el-tabs__nav .el-tabs__active-bar {
  width: 50%;
  transform: translateX(0px);
}
.form-design .el-tabs__nav .el-tabs__item {
  width: 50%;
  text-align: center;
}
.form-design .el-tabs__header {
  position: fixed;
  width: 232px;
  height: 40px;
  z-index: 1;
  background-color: #fff;
}
.form-design .el-tabs__content {
  position: relative;
  top: 55px;
}
.form-design .el-form-item__label {
  line-height: 20px;
}
.fd-main {
  background: url(data:image/png;base64,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)
    no-repeat center 100px;
}
</style>

