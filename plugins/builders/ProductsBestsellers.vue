<template>
  <div class="widget widget-sidebar">
    <h4 class="widget-title">Sản phẩm bán chạy</h4>
    <div class="container">
    <div class="row products-bestsellers" v-for="(item, i) in productBestSellers" :key="i">
      <div class="col product-image">
        <nuxt-link :key="$route.fullPath" :to="{ path: '/product/' + item.product_id}">
          <img class="'img-thumbnail img-fluid rounded" :src="item.thumb" alt="item.thumb" />
        </nuxt-link>
      </div>
      <div class="col">
        <h4 class="product-title">
          <nuxt-link
            :key="$route.fullPath"
            :to="{ path: '/product/' + item.product_id}"
          >{{item.name}}</nuxt-link>
        </h4>
        <div class="short_des">{{item.short_des}}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    // Carousel,
    // Slide
  },
  computed: mapState({
    productBestSellers: state => state.products.productBestSellers
  }),
  created() {
    this.$store.dispatch("products/getProductBestSellers");
  },
  methods: {
    viewProudct(id) {
      this.$router.push({ path: "/products/" + id });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>