<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="rows"/>
    </div>

    <rawDisplayer class="col-3" :value="rows" title="List"/>
  </div>
</template>

<script>
import nestedDraggable from "./nested";
import rawDisplayer from "./raw-displayer.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable,
    rawDisplayer
  },
  data() {
    return {
      rows: [
        {
          cols: [{
            name: '11',
            span: 12,
            rows: [{
              cols: [{
                name: '111',
                span: 12,
                rows: [],
              }]
            }],
          }, {
            name: '12',
            span: 12,
            rows: [],
          }],
        },
        {
          cols: [{
            name: '2',
            span: 12,
            rows: [{
              cols: []
            }],
          }],
        },
      ]
    };
  }
};
</script>
<style scoped></style>
