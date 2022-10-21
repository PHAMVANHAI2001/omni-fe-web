<template>
  <div class="sort-product-bar">
    <div class="form-group form-inline">
      <!-- <label class="d-md-none" for="sorter">Sắp xếp:</label> -->
      <select
        @change="onChange($event)"
        class="form-control"
        id="sorter"
      >
        <option value="">Mới nhất</option>
        <option value="asc">Giá từ thấp đến cao</option>
        <option value="desc">Giá từ cao đến thấp</option>
      </select>
    </div>
  </div>
  
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    productsArr: Array
  },
  computed: {
    ...mapState({
      order: (state) => state.products.searchParam.order,
      currentProductCategory: (state) => state.products.currentProductCategory,
    }),
  },
  methods: {
    onChange(event) {
      this.productsArr.sort((a, b) => {
        if(event.target.value === 'asc'){
          return a.price - b.price;
        }
        if(event.target.value === 'desc'){
          return b.price - a.price;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  margin-right: 10px;
}
</style>
