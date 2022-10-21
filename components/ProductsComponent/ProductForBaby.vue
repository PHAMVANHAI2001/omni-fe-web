<template>
  <section class="section container">
    <!-- <nuxt-link
      :to="{ path: `/product?cat=182` }"
      class="float-right text-primary pt-1"
      ><small>Xem thêm</small></nuxt-link
    > -->
    
    <client-only style="padding: 0px 25px !important;">
      <div class="hot-deal">
        <carousel
          :perPageCustom="[
            [320, 2],
            [768, 2],
            [1024, 5],
          ]"
          :loop="true"
          :paginationEnabled="false"
          :navigationEnabled="true"
        >
          <slide
            class="product-slide"
            v-for="(item, j) in productAll1"
            :key="j"
          >
            <Product :item="item"></Product>
          </slide>
        </carousel>
      </div>
    </client-only>
    <!-- <div class="row" v-if="!productAll1">
          <div class="text-center col-md-12 justify-content-center">
            <Loading2></Loading2>
          </div>
        </div> -->
  </section>
</template>
<script>
import Product from "~/components/Product";
import PaginationVue from "~/components/Pagination.vue";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      productAll1: null,
    };
  },
  computed: mapState({
    categories: (state) => state.category.categories,
  }),
  created() {
    this.getProductAll(1);
  },
  components: {
    pagination: PaginationVue,
    Product,
  },

  methods: {
    getProductAll(page = 1) {
      const cat = 182;
      const name = this.$route.query["name"] ? this.$route.query["name"] : "";
      const store_id = this.$route.query["store_id"]
        ? this.$route.query["store_id"]
        : "";
      const sort = this.$route.query["sort"]
        ? this.$route.query["sort"]
        : "updated_at";
      const manufacturer = this.$route.query["manufacturer"]
        ? this.$route.query["manufacturer"]
        : "";
      const order = this.$route.query["order"]
        ? this.$route.query["order"]
        : "desc";
      const limit = this.$route.query["limit"]
        ? this.$route.query["limit"]
        : 101;
      this.productAll1 = null;

      // commit to store
      this.$store.commit("products/setSearchProduct", { name: name });
      // this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=${limit}&store_id=${store_id}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&status=1`,
        })
        .then((resp) => {
          // //console.log("products :", resp.data.meta.pagination);
          // this.$store.dispatch("app/showLoadingOverlay", false);
          // set cart item id
          const productAll = resp.data.data;
          if (
            this.$store.state.cart &&
            this.$store.state.cart.cart &&
            this.$store.state.cart.cart.details
          ) {
            // productAll.forEach((pro) => {
            //   pro = this.getCartItemId(pro);
            // });
          }
          this.productAll1 = productAll;
          this.productSearch = productAll;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch((err) => {
          console.log("err:", err);
          // this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
  },
};
</script>
