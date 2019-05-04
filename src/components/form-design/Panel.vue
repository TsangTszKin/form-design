<template>
  <div class="main">
    <el-form
      ref="form"
      :label-position="formAttr.align"
      :label-width="formAttr.labelWidth | labelWidth"
      :size="formAttr.size"
      :class="{'dragArea-empty':$store.state.formDesign.formList.length > 0}"
      :rules="$store.getters.getFormRules"
    >
      <draggable class="dragArea" @change="log" :list="list" :group="{ name: 'form-design'}">
        <Cell
          :data="item"
          v-for="(item, i) in $store.state.formDesign.formList"
          :key="i"
          @syncList="syncList"
          :formAttr="formAttr"
        />
      </draggable>
    </el-form>
    <!-- 表单为空的时候默认是一个空容器 -->
    <draggable
      class="dragArea-empty"
      @change="log"
      :list="list"
      :group="{ name: 'form-design', pull: 'move' }"
      v-if="$store.state.formDesign.formList.length == 0"
    ></draggable>
  </div>
</template>

<script>
import Cell from '@/components/form-design/Cell.vue';
import draggable from "vuedraggable";
import common from '@/utils/common';
import bus from '@/utils/bus';
import FDGridPanel from '@/components/form-design/FDGridPanel';

export default {
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
    }
  },
  components: {
    Cell,
    draggable,
    FDGridPanel
  },
  mounted() {
    window.localStorage.formList = [];
    bus.$on('formDesign.syncList', (list) => {
      this.syncList(list);
    })
  },
  data() {
    return {
      "list": [
      ],
      rules: {
        e878f1c6_3c5c_b1b3_b785_9897b52a904f: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    log: function (evt) {
      console.log("panel")
      window.console.log(evt);
      let formSimple;
      let insertIndex = this.$store.state.formDesign.formList.length;
      let newFormList = common.deepClone(this.$store.state.formDesign.formList);
      let form;
      if (evt.added) {
        form = evt.added.element;
        let newIndex = evt.added.newIndex;
        form.key = common.getGuid();
        newFormList.splice(newIndex, 0, form);
        this.$store.commit('formDesign/updateShowType', form.type);
        this.$store.commit('formDesign/updateActiveKey', form.key);
        this.$store.commit('formDesign/updateActiveForm', common.deepClone(form));
        this.$store.dispatch('formDesign/setFormList', common.deepClone(newFormList));
      }
      if (evt.moved) {
        form = evt.moved.element;
        let newIndex = evt.moved.newIndex;
        let oldIndex = evt.moved.oldIndex;
        //先直接在新位置插入表单，然后旧位置索引+1的位置表单直接减掉
        // newFormList.splice(newIndex, 0, form);
        // newFormList.splice(oldIndex, oldIndex + 1);
        this.$store.commit('formDesign/updateShowType', form.type);
        this.$store.commit('formDesign/updateActiveKey', form.key);
        this.$store.commit('formDesign/updateActiveForm', common.deepClone(form));
        this.$store.dispatch('formDesign/setFormList', common.deepClone(this.list));
      }
      // let rules = {};
      // this.$store.state.formDesign.formList.forEach(element => {
      //   rules[element.key] = [{ required: element.options.required, message: '必填项不能为空', trigger: 'blur' }]
      // });
      // console.log("rules", rules);
      // this.$store.commit('formDesign/updateRules', common.deepClone(rules));
    },
    syncList(value) {
      this.list = common.deepClone(value);
    }
  },
  watch: {
    list: {
      handler: function (value) {
        console.log("watch list", value);
        // this.$store.dispatch('formDesign/setFormList', common.deepClone(value));
      },
      deep: true
    }
  },
  filters: {
    labelWidth(value) {
      return `${value}px`
    }
  }
}
</script>

<style lang="css" scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
.dragArea-empty {
  min-height: 500px;
}
</style>

