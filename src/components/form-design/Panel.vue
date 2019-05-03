<template>
  <div class="main">
    <el-form
      ref="form"
      :label-position="align"
      label-width="80px"
      size="mini"
      :class="{'dragArea-empty':$store.state.formDesign.formList.length > 0}"
    >
      <draggable class="dragArea" @change="log" :list="list" :group="{ name: 'form-design'}">
        <Cell
          :data="item"
          v-for="(item, i) in $store.state.formDesign.formList"
          :key="i"
          @syncList="syncList"
        />
      </draggable>
    </el-form>
    <!-- 表单未空的时候默认是一个空容器 -->
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

export default {
  props: {
    align: {
      type: String,
      default: 'top'
    }

  },
  components: {
    Cell,
    draggable
  },
  mounted() {
    window.localStorage.formList = [];
  },
  data() {
    return {
      "list": [
      ],
      "config": {
        "labelWidth": 100,
        "labelPosition": "top",
        "size": "small"
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
        this.$store.commit('formDesign/updateActiveKey', form.key)
        this.$store.dispatch('formDesign/setFormList', newFormList);
      }
      if (evt.moved) {
        form = evt.moved.element;
        let newIndex = evt.moved.newIndex;
        let oldIndex = evt.moved.oldIndex;
        //先直接在新位置插入表单，然后旧位置索引+1的位置表单直接减掉
        // newFormList.splice(newIndex, 0, form);
        // newFormList.splice(oldIndex, oldIndex + 1);
        this.$store.commit('formDesign/updateShowType', form.type);
        this.$store.commit('formDesign/updateActiveKey', form.key)
        this.$store.dispatch('formDesign/setFormList', common.deepClone(this.list));
      }
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

