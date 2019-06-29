<template>
  <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'form-design' }" @change="log">
    <el-row v-for="(row, i) in tasks" :key="i">
      <el-col :span="col.span" v-for="(col, j) in row.cols" :key="j">
        <p>{{ col.name }}</p>
        <nested-draggable :tasks="col.rows"/>
      </el-col>
    </el-row>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  name: 'nested-draggable',
  methods: {
    log (e) {
      console.log('nested change', e)
    }
  }
}
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
  margin: 10px;
}
</style>
