<template>
  <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'form-design' }" @change="log">
    <el-row>
      <el-col :span="col.span" v-for="(col, i) in data.cols" :key="i" class="col">
        aaa
      </el-col>
    </el-row>
  </draggable>
</template>

<script>
import Cell from '@/components/form-design/Cell.vue';
import draggable from "vuedraggable";
import common from '@/utils/common';
import bus from '@/utils/bus';

export default {
  props: {
    propData: {
      type: Object,
      default: function () {
        return {
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
  },
  mounted() {
  },
  watch: {
    data: {
      handler: function (value, oldValue) {
        let newFormList = common.deepClone(this.$store.state.formDesign.formList);
        let activeIndex;
        for (let i = 0; i < newFormList.length; i++) {
          const element = newFormList[i];
          if (element.key === this.$store.state.formDesign.activeKey) {
            activeIndex = i;
          }
        }
        newFormList[activeIndex] = value;
        bus.$emit('formDesign.syncList', common.deepClone(newFormList));
        this.$store.dispatch('formDesign/setFormList', common.deepClone(newFormList));
        this.$store.commit('formDesign/updateActiveKey', value.key);
      },
      deep: true
    },
    propData: {
      handler: function (value) {
        this.data = common.deepClone(value);
      },
      deep: true,
      // immediate: true
    }
  }
}
</script>

<style scoped>
.col {
  min-height: 100px;
  outline: 1px dashed;
  margin: 10px;
}
</style>
