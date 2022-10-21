<template>
  <div class="widget product-related">
    <h2 class="widget-title">Sản phẩm liên quan</h2>
    <div class="widget-content">
      <client-only>
        <carousel
          :perPageCustom="[
            [320, 2.4],
            [768, 2],
            [767, 3],
            [1024, 4],
          ]"
          :paginationEnabled="false"
          :loop="true"
        >
          <slide
            class="product-slide"
            v-for="(item, i) in productRelated"
            :key="i"
          >
            <Product :item="item"></Product>
          </slide>
        </carousel>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Product from "~/components/Product";
export default {
  components: {
    Product,
  },
  props: ["productid"],
  data() {
    return {
      productRelated: [],
    };
  },
  created() {
    this.$axios
      .get(`v1/client/advance-related-product/${this.productid}`)
      .then((res) => {
        this.productRelated = res.data;
      });
  },
  methods: {
    viewProudct(id) {
      this.$router.push({ path: "/products/" + id });
    },
  },
};
</script>
<style lang="scss" scoped>
.product-related {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
