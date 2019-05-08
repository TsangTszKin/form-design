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
            <img :src="item.icon">
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
            <img :src="item.icon">
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
            <img :src="item.icon">
          </p>
          <p class="right">{{item.title}}</p>
        </div>
      </draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import draggable from "vuedraggable";
import common from '@/utils/common';

export default {
  components: {
    draggable
  },
  data() {
    return {
      base: {
        title: '基础字段',
        child: [{
          title: '单行文本',
          type: 'input',
          icon: '/src/assets/img/form-design/input.png',
          value: '',
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            disabled: false,
            dataType: "string",
            placeholder: "",
            regEx: '',
            option: [{
              value: 'string',
              label: '字符串'
            }, {
              value: 'bool',
              label: '布尔值'
            }, {
              value: 'int',
              label: '整数'
            }, {
              value: 'float',
              label: '浮点数'
            }, {
              value: 'url',
              label: 'URL地址'
            }, {
              value: 'email',
              label: '邮箱地址'
            }]
          },
          key: ''
        },
        {
          title: '多行文本',
          type: 'textarea',
          icon: '/src/assets/img/form-design/textarea.png',
          value: '',
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            disabled: false,
            placeholder: "",
            regEx: '',
          },
          key: ''
        },
        {
          title: '计数器',
          type: 'number',
          icon: '/src/assets/img/form-design/number.png',
          value: '',
          options: {
            width: "120px",
            min: 0,
            max: 100,
            required: false,
            disabled: false,
          },
          key: ''
        },
        {
          title: '单选框组',
          type: 'radio',
          icon: '/src/assets/img/form-design/radio.png',
          value: '',
          options: {
            width: "100%",
            required: false,
            disabled: false,
            option: [{
              value: "值1",
              label: "选项1"
            }, {
              value: "值2",
              label: "选项2"
            }, {
              value: "值3",
              label: "选项3"
            }],
          },
          key: ''
        },
        {
          title: '多选框组',
          type: 'checkbox',
          icon: '/src/assets/img/form-design/checkbox.png',
          value: '',
          options: {
            width: "100%",
            required: false,
            disabled: false,
            option: [{
              value: "值1",
              label: "选项1"
            }, {
              value: "值2",
              label: "选项2"
            }, {
              value: "值3",
              label: "选项3"
            }],
          },
          key: ''
        },
        {
          title: '时间选择器',
          type: 'datetime',
          icon: '/src/assets/img/form-design/datetime.png',
          value: '',
          options: {
            width: "100%",
            type: ['ymd', 'yyyy-MM-dd'],
            defaultValue: "",
            required: false,
            disabled: false,
            placeholder: "",
          },
          key: ''
        },
        {
          title: '下拉选择框',
          type: 'select',
          icon: '/src/assets/img/form-design/select.png',
          value: '',
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            disabled: false,
            placeholder: "",
            option: [{
              value: "值1",
              label: "选项1"
            }, {
              value: "值2",
              label: "选项2"
            }, {
              value: "值3",
              label: "选项3"
            }]
          },
          key: ''

        },
        {
          title: '开关',
          type: 'switch',
          icon: '/src/assets/img/form-design/switch.png',
          value: false,
          options: {
            defaultValue: false,
            required: false,
            disabled: false,
          },
          key: ''
        }]
      },
      senior: {
        title: '高级字段',
        child: [{
          title: '图片上传',
          type: 'img',
          icon: '/src/assets/img/form-design/img.png'
        }],
        key: ''
      },
      layout: {
        title: '布局字段',
        child: [{
          title: '栅格布局',
          type: 'grid',
          icon: '/src/assets/img/form-design/grid.png',
          cols: [{
            span: 12,
            list: [
            ]
          }, {
            span: 12,
            list: []
          }],
          key: ''
        }],
        key: ''
      }
    }
  },
  methods: {
    log: function (evt) {
      console.log("menu")
      window.console.log(evt);
      // let formSimple;
      // if (evt.removed) {
      //   formSimple = {
      //     "type": evt.removed.element.type,
      //     "name": evt.removed.element.title,
      //   }
      // }
      // if (evt.moved) {
      //   formSimple = {
      //     "type": evt.moved.element.type,
      //     "name": evt.moved.element.title,
      //   }
      // }



      // let form = {
      //   "type": formSimple.type,
      //   "name": formSimple.name,
      //   "options": {
      //     "width": "100%",
      //     "defaultValue": "",
      //     "required": false,
      //     "dataType": "string",
      //     "placeholder": ""
      //   },
      //   "key": common.getGuid()
      // }

      // let newFormList = common.deepClone(this.$store.state.formDesign.formList);
      // newFormList.push(form);
      // console.log("newFormList", newFormList)
      // this.$store.dispatch('formDesign/addFormList', form);
      // this.$store.commit('formDesign/updateShowType', evt.removed.element.type);
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
}
</style>

