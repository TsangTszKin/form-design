<template>
  <el-row>
    <el-col :span="col.span" v-for="(col, i) in data.cols" :key="i" class="col">
      <draggable class="dragArea" @change="log" :list="col.list" :group="{ name: 'form-design'}">
        <GridCell
          :data="item"
          v-for="(item, j) in col.list"
          :key="j"
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
      <div class="bottom-area" @click="activeCell"></div>
    </el-col>
  </el-row>
</template>

<script>
import GridCell from '@/components/form-design/GridCell'
import draggable from 'vuedraggable'
import common from '@/utils/common'

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
          cols: [
            {
              span: 12,
              list: [
                // {
                //   title: "多行文本",
                //   type: "textarea",
                //   icon: "/src/assets/img/form-design/textarea.png",
                //   options: {
                //     width: "100%",
                //     defaultValue: "",
                //     required: false,
                //     disabled: false,
                //     placeholder: "",
                //     regEx: ""
                //   },
                //   key: ""
                // }
              ]
            },
            {
              span: 12,
              list: []
            }
          ],
          key: common.getGuid()
        }
      }
    }
  },
  data () {
    return {
      data: {
        title: '栅格布局',
        type: 'grid',
        icon: '/src/assets/img/form-design/grid.png',
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
        key: common.getGuid()
      }
    }
  },
  methods: {
    log: function (evt) {
      console.log('FDGridPanel')
      window.console.log(evt)
      // let newFormList = common.deepClone(this.$store.state.formDesign.grid[this.FDkey]);
      // console.log("newFormList", newFormList)
      // let form;
      // if (evt.added) {
      //   form = evt.added.element;
      //   let newIndex = evt.added.newIndex;
      //   form.key = common.getGuid();
      //   newFormList.splice(newIndex, 0, form);
      //   this.$store.commit('formDesign/updateShowType', form.type);
      //   this.$store.commit('formDesign/updateActiveKey', form.key);
      //   this.$store.commit('formDesign/updateActiveForm', common.deepClone(form));
      //   this.$store.commit('formDesign/updateGrid', this.FDkey, common.deepClone(newFormList));
      // }
      // if (evt.moved) {
      //   form = evt.moved.element;
      //   let newIndex = evt.moved.newIndex;
      //   let oldIndex = evt.moved.oldIndex;
      //   //先直接在新位置插入表单，然后旧位置索引+1的位置表单直接减掉
      //   // newFormList.splice(newIndex, 0, form);
      //   // newFormList.splice(oldIndex, oldIndex + 1);
      //   this.$store.commit('formDesign/updateShowType', form.type);
      //   this.$store.commit('formDesign/updateActiveKey', form.key);
      //   this.$store.commit('formDesign/updateActiveForm', common.deepClone(form));
      //   this.$store.commit('formDesign/updateGrid', this.FDkey, common.deepClone(newFormList));
      // }
    },
    syncList (value, index) {
      // this.data.cols[index].list = common.deepClone(value);
      let formList = common.deepClone(this.$store.state.formDesign.formList)
      for (let i = 0; i < this.$store.state.formDesign.formList.length; i++) {
        const element = this.$store.state.formDesign.formList[i]
        if (element.key === this.FDkey) {
          formList[i] = this.data
        }
      }
      console.log('formList', formList)
      this.$emit('syncList', formList)
    },
    activeCell () {
      this.$store.commit('formDesign/updateActiveKey', this.FDkey)
      this.$store.commit('formDesign/updateShowType', 'grid')
      this.$store.commit(
        'formDesign/updateActiveForm',
        common.deepClone(this.data)
      )
    }
  },
  mounted () {},
  watch: {
    data: {
      handler: function (value, oldValue) {
        console.log('value', value)
        let newData = common.deepClone(value)
        let haveEmptyKey = false
        for (let i = 0; i < newData.cols.length; i++) {
          const element = newData.cols[i]
          for (let j = 0; j < element.list.length; j++) {
            const element2 = element.list[j]
            if (common.isEmpty(element2.key)) {
              element2.key = common.getGuid()
              this.$store.commit('formDesign/updateActiveKey', element2.key)
              haveEmptyKey = true
            }
          }
        }
        if (haveEmptyKey) {
          this.data = newData

          let formListAll = common.deepClone(
            this.$store.state.formDesign.formList
          )
          for (
            let i = 0;
            i < this.$store.state.formDesign.formList.length;
            i++
          ) {
            const element = this.$store.state.formDesign.formList[i]
            if (element.key === this.FDkey) {
              formListAll[i] = common.deepClone(newData)
            }
          }
          this.$store.dispatch(
            'formDesign/setFormList',
            common.deepClone(formListAll)
          )
        }
        console.log('newData.key', this.FDkey)
        console.log(
          'this.$store.state.formDesign.activeKey',
          this.$store.state.formDesign.activeKey
        )
        console.log(
          'this.$store.state.formDesign.grid',
          this.$store.state.formDesign.grid
        )
        this.$store.commit('formDesign/updateGrid', {
          key: this.FDkey,
          value: common.deepClone(newData)
        })

        this.$emit('syncList', this.$store.state.formDesign.formList)
      },
      deep: true
    },
    propData: {
      handler: function (value) {
        this.data = common.deepClone(value)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
.col {
  min-height: 100px;
  outline: 1px dashed;
  /* margin: 10px; */
}
.bottom-area {
  width: 100%;
  height: 50px;
}
.dragArea {
  min-height: 100px;
}
</style>