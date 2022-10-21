<template>
  <section class="section container" v-if="productAll.length > 0">
    <!-- Nút xem thêm -->
    <nuxt-link
      :to="{ path: `/product` }"
      class="float-right text-primary pr-3 see_more"
      style="margin-top: 12px !important"
      data-aos="fade-up"
      ><span>Xem thêm</span></nuxt-link
    >
    <h3 class="the-title section-title mb-2 font-bold" data-aos="fade-up">
      Sản phẩm mới nhất
    </h3>
    <client-only>
      <!-- <div class="hot-deal">
        <carousel
          :perPageCustom="[
            [320, 2],
            [768, 3],
            [767, 3],
            [1024, 4],
            [1200, 5],
          ]"
          :loop="true"
          :paginationEnabled="false"
          :navigationEnabled="true"
          :scrollPerPage="false"
        >
          <slide class="product-slide" v-for="(item, i) in productAll" :key="i">
            <Product :item="item" data-aos="fade-up"></Product>
          </slide>
        </carousel>
      </div> -->
      <div
        class="hot-deal row ml-1 mr-1"
        v-if="!isMobile"
        style="transform: translateX(7px);"
      >
        <div
          class="col-sm-4 col-lg-3 col-6 pl-pr-0"
          data-aos="fade-up"
          v-for="(item, i) in dataProductsForPCIdx"
          :key="i"
          style="margin-bottom: 10px"
        >
          <Product class="product-item" :item="item"></Product>
        </div>
      </div>

      <div class="hot-deal row ml-1 mr-1" v-if="isMobile">
        <div
          class="col-sm-4 col-lg-3 col-6"
          data-aos="fade-up"
          v-for="(item, i) in dataProductsForMobileIdx"
          :key="i"
          style="margin-bottom: 10px"
        >
          <Product :item="item"></Product>
        </div>
      </div>
    </client-only>
    <!-- <div class="row" v-if="!productAll">
          <div class="text-center col-md-12 justify-content-center">
            <Loading2></Loading2>
          </div>
        </div> -->
  </section>
</template>
<script>
import Product from "~/components/Product";
import PaginationVue from "~/components/Pagination.vue";
import { isMobile } from "~/plugins/util";
export default {
  // props: {
  //   dataProductsForPC: Array,
  //   dataProductsForMobile: Array,
  // },
  data() {
    return {
      products: null,
      isMobile: false,
      dataProductsForPC: [],
      dataProductsForMobile: [],
      dataProductsForMobileIdx: [],
      dataProductsForPCIdx: [],
      productAll:[],

    };
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  created(){
     this.getProductAll(1)
  },
  components: {
    pagination: PaginationVue,
    Product,
  },
  methods: {
    getProductAll(page = 1) {
      const store_id = this.$route.query["store_id"]
        ? this.$route.query["store_id"]
        : "";
      const sort = this.$route.query["sort"]
        ? this.$route.query["sort"]
        : "created_at";
    ;
      const order = this.$route.query["order"]
        ? this.$route.query["order"]
        : "desc";

      const limit = this.$route.query["limit"]
        ? this.$route.query["limit"]
        : 10;

      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=${limit}&store_id=${store_id}&sort[${sort}]=${order}&page=${page}&status=1&is_new=1`,
        })
        .then((resp) => {
          this.productAll = resp.data.data;
          if (!process.server) {
            this.isMobile = isMobile();
            if (this.isMobile == true) {
              this.dataProductsForMobileIdx = this.productAll.splice(0, 6);
            } else {
              this.dataProductsForPCIdx = this.productAll.splice(0, 5);
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
          // this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
  }
};
</script>
