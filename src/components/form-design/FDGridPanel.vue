<template>
  <el-row>
    <el-col :span="col.span" v-for="(col, i) in data.cols" :key="i" class="col">
      <draggable class="dragArea" @change="log" :list="col.list" :group="{ name: 'form-design'}">
        <GridCell
          :data="item"
          v-for="(item, i) in col.list"
          :key="i"
          @syncList="syncList"
          :formAttr="formAttr"
          :isGrid="true"
          :FDkey="FDkey"
          :FDindex="i"
        />
        <!-- 
        <el-form-item label="（必填）">
          <el-input :readonly="true"></el-input>
        </el-form-item>-->
      </draggable>
    </el-col>
  </el-row>
</template>

<script>
import GridCell from '@/components/form-design/GridCell';
import draggable from "vuedraggable";
import common from '@/utils/common';
import bus from '@/utils/bus';

export default {
  components: {
    draggable,
    GridCell
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
    FDkey: {
      type: String,
      default: ''
    },
    propData: {
      type: Object,
      default: function () {
        return {
          title: '栅格布局',
          type: 'grid',
          icon: '/src/assets/img/form-design/grid.png',
          cols: [{
            span: 12,
            list: [{
              title: '多行文本',
              type: 'textarea',
              icon: '/src/assets/img/form-design/textarea.png',
              options: {
                width: "100%",
                defaultValue: "",
                required: false,
                disabled: false,
                placeholder: "",
                regEx: '',
              },
              key: ''
            }]
          }, {
            span: 12,
            list: []
          }],
          key: common.getGuid()
        }
      }
    }
  },
  data() {
    return {
      data: {
        title: '栅格布局',
        type: 'grid',
        icon: '/src/assets/img/form-design/grid.png',
        cols: [{
          span: 12,
          list: []
        }, {
          span: 12,
          list: []
        }],
        key: common.getGuid()
      }
    }
  },
  methods: {
    log: function (evt) {
      console.log("FDGridPanel")
      window.console.log(evt);
    },
    syncList(value, index) {
      this.data.cols[index] = common.deepClone(value);
    }
  },
  mounted() {
  },
  watch: {
    data: {
      handler: function (value, oldValue) {
        for (let i = 0; i < value.cols.length; i++) {
          const element = value.cols[i];
          for (let j = 0; j < element.list.length; j++) {
            const element2 = element.list[j];
            if (common.isEmpty(element2.key)) {
              element2.key = common.getGuid();
              this.$store.commit('formDesign/updateActiveKey', element2.key);
            }
          }
        }
        console.log("value.key, common.deepClone(value)", this.FDkey, common.deepClone(value))
        this.$store.commit('formDesign/updateGrid', { key: this.FDkey, value: common.deepClone(value) });

      },
      deep: true
    },
    propData: {
      handler: function (value) {
        this.data = common.deepClone(value);
      },
      deep: true,
      // immediate: true
    },
  }
}
</script>

<style scoped>
.col {
  min-height: 100px;
  outline: 1px dashed;
  /* margin: 10px; */
}
.dragArea {
  min-height: 100px;
}
</style>