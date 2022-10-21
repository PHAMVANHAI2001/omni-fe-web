<template>
  <section class="section container" v-if="productAll.length > 0">
    <!-- Nút xem thêm -->
    <nuxt-link
      :to="{ path: '/ranking-bestseller?top-sale=top-sale' }"
      class="float-right text-primary pr-3 see_more"
      style="margin-top: 12px !important"
      data-aos="fade-up"
      ><span>Xem thêm</span></nuxt-link
    >
    <h3 class="the-title section-title mb-2 font-bold" data-aos="fade-up">
      Sản phẩm bán chạy
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
          <slide class="product-slide mb-slide-768 " v-for="(item, i) in productAll" :key="i">
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
          v-for="(item, i) in dataProductsForPC"
          :key="i"
          style="margin-bottom: 10px"
        >
          <ProductRanking :item="item" :stt="i + 1"></ProductRanking>
        </div>
      </div>

      <div class="hot-deal row ml-1 mr-1" v-if="isMobile">
        <div
          class="col-sm-4 col-lg-3 col-6"
          data-aos="fade-up"
          v-for="(item, i) in dataProductsForMobile"
          :key="i"
          style="margin-bottom: 10px"
        >
          <ProductRanking :item="item" :stt="i + 1"></ProductRanking>
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
import { mapState } from "vuex";
import ProductRanking from "~/components/ProductRanking";
import { isMobile, isIndex } from "~/plugins/util";
export default {
  components: {
    ProductRanking,
  },
  props: ["productid"],
  data() {
    return {
      isMobile: false,
      productAll: [],
      productRelated: [],
      dataProductsForPC: [],
      dataProductsForMobile: [],
    };
  },
   created(){},
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
        this.$store
          .dispatch("products/getProducTopSale", {
            params: `?limit=10&is_hot=1`,
          })
          .then((resp) => {
            this.productAll = resp.data;
            if (this.isMobile == false) {
              this.dataProductsForPC = this.productAll.splice(0, 5);
            }
            if (this.isMobile == true) {
              this.dataProductsForMobile = this.productAll.splice(0, 6);
            }
          })
          .catch((err) => {
            console.log("err:", err);
          });
      }
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
// .VueCarousel-navigation-button {
//   &.VueCarousel-navigation-prev {
//     &:before {
//       content: url("~assets/images/icon/mobile-footer/right.png");
//       position: absolute;
//       top: 0;
//       right: 0;
//       width: 54px;
//       height: 54px;
//     }
//     &:hover {
//       &:before {
//         content: url("~assets/images/icon/mobile-footer/list.png");
//       }
//     }
//   }
//   &.VueCarousel-navigation-next {
//     &:before {
//       content: url("~assets/images/icon/mobile-footer/right.png");
//       position: absolute;
//       top: 0;
//       right: 0;
//       width: 54px;
//       height: 54px;
//     }
//     &:hover {
//       &:before {
//         content: url("~assets/images/icon/mobile-footer/list.png");
//       }
//     }
//   }
// }
// .VueCarousel
//   .VueCarousel-navigation
//   .VueCarousel-navigation-button
//   .VueCarousel-navigation-prev {
//   color: rgb(233, 10, 10) !important;
// }
</style>
