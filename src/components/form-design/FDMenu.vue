<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-03 08:37:07
 * @LastEditTime: 2019-12-10 11:29:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-collapse :value="['1','2', '3']" style="width: 100%;">
    <el-collapse-item title="基础字段" name="1">
      <draggable
        :list="base.child"
        :group="{ name: 'form-design', pull: 'clone', put: false }"
        @change="log"
      >
        <div class="cell" v-for="(item, i) in base.child" :key="i">
          <p class="left">
            <span :class="`iconfont icon-${item.icon}`"></span>
          </p>
          <p class="right">{{item.title}}</p>
        </div>
      </draggable>
    </el-collapse-item>
    <el-collapse-item title="高级字段" name="2">
      <draggable
        :list="senior.child"
        :group="{ name: 'form-design', pull: 'clone', put: false }"
        @change="log"
      >
        <div class="cell" v-for="(item, i) in senior.child" :key="i">
          <p class="left">
           <span :class="`iconfont icon-${item.icon}`"></span>
          </p>
          <p class="right">{{item.title}}</p>
        </div>
      </draggable>
    </el-collapse-item>
    <el-collapse-item title="布局字段" name="3">
      <draggable
        :list="layout.child"
        :group="{ name: 'form-design', pull: 'clone', put: false }"
        @change="log"
      >
        <div class="cell" v-for="(item, i) in layout.child" :key="i">
          <p class="left">
           <span :class="`iconfont icon-${item.icon}`"></span>
          </p>
          <p class="right">{{item.title}}</p>
        </div>
      </draggable>
    </el-collapse-item>
    <el-collapse-item title="其它字段" name="3">
      <draggable
        :list="elseItem.child"
        :group="{ name: 'form-design', pull: 'clone', put: false }"
        @change="log"
      >
        <div class="cell" v-for="(item, i) in elseItem.child" :key="i">
          <p class="left">
           <span :class="`iconfont icon-${item.icon}`"></span>
          </p>
          <p class="right">{{item.title}}</p>
        </div>
      </draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import draggable from 'vuedraggable'
import common from '@/utils/common'
import bus from '@/utils/bus'
const base = {
  title: '基础字段',
  child: [
    {
      title: '单行文本',
      type: 'input',
      icon: 'danhangwenben',
      value: '',
      options: {
        width: '100%',
        defaultValue: '',
        required: false,
        disabled: false,
        dataType: 'string',
        placeholder: '',
        regEx: '',
        option: [
          {
            value: 'string',
            label: '字符串'
          },
          {
            value: 'bool',
            label: '布尔值'
          },
          {
            value: 'int',
            label: '整数'
          },
          {
            value: 'float',
            label: '浮点数'
          },
          {
            value: 'url',
            label: 'URL地址'
          },
          {
            value: 'email',
            label: '邮箱地址'
          }
        ]
      },
      key: ''
    },
    {
      title: '多行文本',
      type: 'textarea',
      code: '',
      icon: 'duohangwenben',
      value: '',
      options: {
        width: '100%',
        defaultValue: '',
        required: false,
        disabled: false,
        placeholder: '',
        regEx: ''
      },
      key: ''
    },
    {
      title: '数字文本框',
      type: 'number',
      code: '',
      icon: 'jishubiaoqian',
      value: '',
      options: {
        width: '120px',
        min: 0,
        max: 100,
        required: false,
        disabled: false
      },
      key: ''
    },
    {
      title: '单选框组',
      type: 'radio',
      code: '',
      icon: 'danxuankuang',
      value: '',
      options: {
        width: '100%',
        required: false,
        disabled: false,
        defaultValue: '',
        option: [
          {
            value: '值1',
            label: '选项1'
          },
          {
            value: '值2',
            label: '选项2'
          },
          {
            value: '值3',
            label: '选项3'
          }
        ]
      },
      key: ''
    },
    {
      title: '多选框组',
      type: 'checkbox',
      code: '',
      icon: 'duoxuankuang1',
      value: '',
      options: {
        defaultValue: [],
        width: '100%',
        required: false,
        disabled: false,
        option: [
          {
            value: '值1',
            label: '选项1'
          },
          {
            value: '值2',
            label: '选项2'
          },
          {
            value: '值3',
            label: '选项3'
          }
        ]
      },
      key: ''
    },
    {
      title: '时间选择器',
      type: 'datetime',
      code: '',
      icon: 'shijianxuanzeqi',
      value: '',
      options: {
        width: '100%',
        type: ['ymd', 'yyyy-MM-dd'],
        defaultValue: '',
        required: false,
        disabled: false,
        placeholder: ''
      },
      key: ''
    },
    {
      title: '下拉选择框',
      type: 'select',
      code: '',
      icon: 'xialaxuanze',
      value: '',
      options: {
        width: '100%',
        defaultValue: '',
        required: false,
        disabled: false,
        placeholder: '',
        option: [
          {
            value: '值1',
            label: '选项1'
          },
          {
            value: '值2',
            label: '选项2'
          },
          {
            value: '值3',
            label: '选项3'
          }
        ]
      },
      key: ''
    },
    {
      title: '开关',
      type: 'switch',
      code: '',
      icon: 'kaiguan',
      value: false,
      options: {
        defaultValue: false,
        required: false,
        disabled: false
      },
      key: ''
    }
  ]
}
const senior = {
  title: '高级字段',
  child: [
    // {
    //   title: '图片上传',
    //   type: 'img',
    //   code: '',
    //   icon: 'tupianshangchuan',
    //   options: {
    //     defaultValue: '',
    //     required: false,
    //     disabled: false
    //   }
    // }
    {
      title: '意见框',
      type: 'idea',
      code: '',
      icon: 'duohangwenben',
      value: '',
      options: {
        width: '100%',
        defaultValue: '',
        required: false,
        disabled: false,
        placeholder: '',
        regEx: ''
      },
      key: ''
    }
  ],
  key: ''
}
const layout = {
  title: '布局字段',
  child: [
    {
      title: '栅格布局',
      type: 'grid',
      icon: 'ai211',
      cols: [
        {
          span: 12,
          list: []
        },
        {
          span: 12,
          list: []
        }
      ],
      key: ''
    }
  ],
  key: ''
}
const elseItem = {
  title: '其它字段',
  child: [{
    title: '表单标题',
    type: 'title',
    icon: 'biaoti',
    value: '标题',
    options: {
      align: 'center',
      fontSize: '18px'
    },
    key: ''
  }],
  key: ''
}
export default {
  components: {
    draggable
  },
  data () {
    return {
      base: {
        title: '基础字段',
        child: [
          {
            title: '单行文本',
            type: 'input',
            icon: 'danhangwenben',
            value: '',
            code: '',
            options: {
              width: '100%',
              defaultValue: '',
              required: false,
              disabled: false,
              dataType: 'string',
              placeholder: '',
              regEx: '',
              maxlength: 30,
              option: [
                {
                  value: 'string',
                  label: '字符串'
                },
                {
                  value: 'bool',
                  label: '布尔值'
                },
                {
                  value: 'int',
                  label: '整数'
                },
                {
                  value: 'float',
                  label: '浮点数'
                },
                {
                  value: 'url',
                  label: 'URL地址'
                },
                {
                  value: 'email',
                  label: '邮箱地址'
                }
              ]
            },
            key: ''
          },
          {
            title: '多行文本',
            type: 'textarea',
            icon: 'duohangwenben',
            value: '',
            code: '',
            options: {
              width: '100%',
              defaultValue: '',
              required: false,
              disabled: false,
              placeholder: '',
              regEx: '',
              maxlength: 100
            },
            key: ''
          },
          {
            title: '数字文本框',
            type: 'number',
            icon: 'jishubiaoqian',
            value: '',
            code: '',
            options: {
              width: '120px',
              min: 0,
              max: 100,
              required: false,
              disabled: false
            },
            key: ''
          },
          {
            title: '单选框组',
            type: 'radio',
            icon: 'danxuankuang',
            value: '',
            code: '',
            options: {
              width: '100%',
              required: false,
              disabled: false,
              defaultValue: '',
              option: [
                {
                  value: '值1',
                  label: '选项1'
                },
                {
                  value: '值2',
                  label: '选项2'
                },
                {
                  value: '值3',
                  label: '选项3'
                }
              ]
            },
            key: ''
          },
          {
            title: '多选框组',
            type: 'checkbox',
            icon: 'xialaxuanze',
            value: '',
            code: '',
            options: {
              width: '100%',
              required: false,
              disabled: false,
              defaultValue: [],
              option: [
                {
                  value: '值1',
                  label: '选项1'
                },
                {
                  value: '值2',
                  label: '选项2'
                },
                {
                  value: '值3',
                  label: '选项3'
                }
              ]
            },
            key: ''
          },
          {
            title: '时间选择器',
            type: 'datetime',
            icon: 'shijianxuanzeqi',
            value: '',
            code: '',
            options: {
              width: '100%',
              type: ['ymd', 'yyyy-MM-dd'],
              defaultValue: '',
              required: false,
              disabled: false,
              placeholder: ''
            },
            key: ''
          },
          {
            title: '下拉选择框',
            type: 'select',
            icon: 'xialaxuanze',
            value: '',
            code: '',
            options: {
              width: '100%',
              defaultValue: '',
              required: false,
              disabled: false,
              placeholder: '',
              option: [
                {
                  value: '值1',
                  label: '选项1'
                },
                {
                  value: '值2',
                  label: '选项2'
                },
                {
                  value: '值3',
                  label: '选项3'
                }
              ]
            },
            key: ''
          },
          {
            title: '开关',
            type: 'switch',
            icon: 'kaiguan',
            value: false,
            code: '',
            options: {
              defaultValue: false,
              required: false,
              disabled: false
            },
            key: ''
          }
        ]
      },
      senior: {
        title: '高级字段',
        child: [
          {
            title: '意见框',
            type: 'idea',
            code: '',
            icon: 'duohangwenben',
            options: {
              width: '100%',
              defaultValue: '',
              required: false,
              disabled: false,
              placeholder: '',
              regEx: '',
              maxlength: 300
            }
          }
        ],
        key: ''
      },
      layout: {
        title: '布局字段',
        child: [
          {
            title: '栅格布局',
            type: 'grid',
            icon: 'ai211',
            cols: [
              {
                span: 12,
                list: []
              },
              {
                span: 12,
                list: []
              }
            ],
            key: ''
          }
        ],
        key: ''
      },
      elseItem: {
        title: '其它字段',
        child: [{
          title: '表单标题',
          type: 'title',
          icon: 'biaoti',
          value: '标题',
          options: {
            align: 'center',
            fontSize: '18px'
          },
          key: ''
        }],
        key: ''
      }
    }
  },
  mounted () {
    bus.$on('formMenu.init', () => {
      this.initMenu()
    })
  },
  methods: {
    log: function (evt) {
      console.log('menu')
      window.console.log(evt)
    },
    initMenu () {
      this.base = common.deepClone(base)
      this.senior = common.deepClone(senior)
      this.layout = common.deepClone(layout)
      this.elseItem = common.deepClone(elseItem)
    }
  }
}
</script>

<style scoped>
.cell {
  cursor: move;
  float: left;
  height: 30px;
  line-height: 30px;
  width: 100px;
  background-color: #ecf5ff;
  margin: 0 10px 10px 0;
}
.cell .left {
  float: left;
  width: 27px;
  height: 100%;
  margin: 0;
}
.cell .left img {
  position: relative;
  top: -1px;
  left: 5px;
}
.cell .right {
  float: left;
  width: 73px;
  height: 100%;
  margin: 0;
}
.iconfont  {
  margin-left: 5px;
}
</style>

