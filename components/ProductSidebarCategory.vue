<template>
  <div class="widget">
    <h2 class="widget-title">Danh mục sản phẩm</h2>
    <ul class="product-categories" id="product_categories">
      <li @click="changeCategory(item.id)" v-for="(item, i) in categories" :key="i">
        <nuxt-link :key="$route.fullPath" :to="{ path: `/product?c=${item.code}&cat=${item.id}`}">
          {{item.name}}
        </nuxt-link>
        <ul v-if="item.children && item.children.length" class="sub-product-categories">
          <li @click="changeCategory(sub.id)" v-for="(sub, i) in item.children" :key="i">
            <nuxt-link
              :key="$route.fullPath"
              :to="{ path: `/product?c=${sub.code}&cat=${sub.id}`}"
            >{{sub.name}}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    categories: state => state.products.categories
  }),
  created() {
    this.$store.dispatch("products/getCategory");
  },
  methods: {
    changeCategory(id) {
      this.$store.commit("products/resetSearchParam");
      // this.$store.dispatch("products/getProduct", { catId: id });
    },
    showChildren(item) {
      // console.log("item", item);
      item["show"] = !item["show"];
    }
  }
};
</script>
<style lang="scss" scoped>
</style>