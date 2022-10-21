<template>
  <div class="container" style="z-index: 9999 !important">
    <div v-if="bannerForBaby && bannerForBaby.image_url">
      <img
        :src="bannerForBaby.image_url"
        :alt="bannerForBaby.image_url"
        width="100%"
      />
    </div>
    <div class="d-flex flex-row" v-if="forBaby">
      <a v-for="(item, i) in forBaby" :key="i" width="25%">
        <img
          :src="item.image_url"
          :alt="item.image_url"
          @click="getId(item)"
          v-if="isMobile"
        />
        <figure class="snip1205 green" @click="getId(item)" v-if="!isMobile">
          <img :src="item['image_url']" :alt="item['image_url']" />
          <i class="fa fa-info-circle"></i>
        </figure>
      </a>
    </div>
    <!-- <br />
    <div>
      <client-only style="padding: 0px 25px !important;">
        <div class="hot-deal">
          <carousel
            :perPageCustom="[
              [320, 2],
              [767, 3],
              [768, 3],
              [1024, 4],
              [1200, 5],
            ]"
            :autoplay="false"
            :loop="true"
            :autoplayHoverPause="true"
            :autoplayTimeout="5000"
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
    </div> -->
  </div>
</template>
<script>
import Product from "~/components/Product";
import PaginationVue from "~/components/Pagination.vue";
import Skeleton from "~/components/Skeleton";
import Loading2 from "~/components/Loading2";
import { mapMutations, mapState } from "vuex";
import { isMobile } from "~/plugins/util";
export default {
  //   props: {
  //     forBaby: Array,
  //   },
  data() {
    return {
      bannerForBaby: {},
      forBaby: [],
      cat_id: 180,
      productAll1: [],
      isMobile: false,
    };
  },
  computed: mapState({
    categories: (state) => state.category.categories,
  }),
  components: {
    pagination: PaginationVue,
    Product,
    Loading2,
    skeleton: Skeleton,
  },
  created() {
    // this.getForBaby();
    this.getProductAll(1);
    this.$store
      .dispatch("app/fetchData", "/v1/client/banners/for-baby")
      .then((resp) => {
        if (resp.data) {
          this.bannerForBaby = resp.data.details.shift();
          this.forBaby = resp.data.details;
        }
      })
      .catch((err) => {
        // //console.log("get banner error:", err);
      });
  },
  mounted() {
    $(".hover").mouseleave(function() {
      $(this).removeClass("hover");
    });
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  methods: {
    getId(item) {
      this.cat_id = item.category_id;
      console.log("this.cat_id", this.cat_id);
      this.getProductAll(1);
    },
    getProductAll(page = 1) {
      let cat = this.cat_id;
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

<style lang="scss">
figure.snip1205 {
  position: relative;
  overflow: hidden;
  // margin: 10px;
  // min-width: 220px;
  // max-width: 310px;
  width: 100%;
  background: #000000;
  text-align: center;
}
figure.snip1205 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
figure.snip1205 img {
  max-width: 100%;
  vertical-align: top;
}
figure.snip1205 i {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  font-size: 34px;
  color: #000000;
  width: 60px;
  height: 60px;
  line-height: 60px;
  background: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  -webkit-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  transition: all 300ms 0ms cubic-bezier(0.6, -0.28, 0.735, 0.045);
}
figure.snip1205 a {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}
figure.snip1205.blue {
  background-color: #2472a4;
}
figure.snip1205.blue i {
  color: #20638f;
}
figure.snip1205.red {
  background-color: #ab3326;
}
figure.snip1205.red i {
  color: #962d22;
}
figure.snip1205.yellow {
  background-color: #e08e0b;
}
figure.snip1205.yellow i {
  color: #c87f0a;
}
figure.snip1205.green {
  background-color: #229955;
}
figure.snip1205.green i {
  color: #006e43;
}
figure.snip1205.orange {
  background-color: #d67118;
}
figure.snip1205.orange i {
  color: #bf6516;
}
figure.snip1205.navy {
  background-color: #2b3c4e;
}
figure.snip1205.navy i {
  color: #222f3d;
}
figure.snip1205:hover img,
figure.snip1205.hover img {
  opacity: 0.3;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
figure.snip1205:hover i,
figure.snip1205.hover i {
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
  transition: all 300ms 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.tab-baby {
  z-index: 99999 !important;
}
</style>
