<template>
  <div class="main">
    <el-row>
      <el-col :span="6">
        <h3>Draggable 1</h3>
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          @change="log"
        >
          <div
            class="list-group-item"
            style="cursor:move;"
            v-for="element in list1"
            :key="element.name"
          >{{ element.name }}</div>
        </draggable>
      </el-col>

      <el-col :span="6">
        <h3>Draggable 2</h3>
        <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element.name"
          >{{ element.name }}</div>
        </draggable>
      </el-col>

      <!-- <rawDisplayer class="col-3" :value="list1" title="List 1"/>

      <rawDisplayer class="col-3" :value="list2" title="List 2"/>-->
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'clone',
  display: 'Clone',
  order: 2,
  components: {
    draggable
  },
  data () {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 }
      ]
    }
  },
  methods: {
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>
<style lang="css" scoped>
.main {
  height: 100%;
  position: absolute;
  top: 0px;
  width: calc(100% - 490px);
  left: 200px;
}
</style>