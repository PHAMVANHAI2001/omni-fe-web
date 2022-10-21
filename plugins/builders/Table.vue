<template>
  <table>
    <thead v-if="componentData && componentData['header']">
      <tr>
        <th
          v-text="item.column_title"
          @blur="onEditColumnTitle($event,item)"
          contenteditable
          v-for="(item,i) in componentData['header']"
          :key="i"
        ></th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    componentData: Object
  },
  methods: {
    onEditColumnTitle(evt, item) {
      var value = evt.target.innerText;
      item["column_title"] = value;
    }
  }
};
</script>
<style lang="scss" scoped>
table {
  td,
  th {
    border: 1px solid #ccc;
  }
}
</style>