<template>
  <section
    class="section container"
    v-bind:class="{ isActive: is_active == 0 }"
  >
    <div class="">
      <SkinnyBanner :SkinnyItem="brandBanner" data-aos="fade-up"></SkinnyBanner>
    </div>
    <nuxt-link
      :to="{ path: `/search?id=${ArrId}` }"
      class="float-right text-primary pt-1"
      data-aos="fade-up"
      ><small>Xem thêm</small></nuxt-link
    >
    <h3 class="the-title section-title mb-2 font-bold" data-aos="fade-up">
      {{ nameCat }}
    </h3>
    <client-only style="padding: 0px 25px !important;">
      <div class="hot-deal" data-aos="fade-up">
        <carousel
          :perPageCustom="[
            [320, 2],
            [768, 3],
            [767, 3],
            [1024, 4],
            [1200, 5],
          ]"
          :autoplay="false"
          :loop="true"
          :autoplayHoverPause="true"
          :autoplayTimeout="5000"
          :paginationEnabled="false"
          :navigationEnabled="true"
          :scrollPerPage="false"
          
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
  </section>
</template>
<script>
import Product from "~/components/Product";
import PaginationVue from "~/components/Pagination.vue";
import { mapMutations, mapState } from "vuex";
import SkinnyBanner from "~/components/Banners/SkinnyBanner";
export default {
  props: {
    BrandItem: String,
  },
  data() {
    return {
      ArrId: [],
      nameSearch: null,
      is_active: null,
      productAll1: null,
      brandBanner: [],
      idCat: [],
      arrCat: [],
      nameCat: null,
    };
  },
  computed: mapState({
    categories: (state) => state.category.categories,
  }),
  created() {
    this.getBrandBanner();
    
  },
  components: {
    pagination: PaginationVue,
    Product,
    SkinnyBanner,
  },

  methods: {
    getProductAll(page = 2, categories_id) {
      const idCats = categories_id;
      // const idCats = categories_id.map((item) => item.id).join(",");
      const name = this.$route.query["name"] ? this.$route.query["name"] : "";
      const store_id = this.$route.query["store_id"]
        ? this.$route.query["store_id"]
        : "";
      const sort = this.$route.query["sort"]
        ? this.$route.query["sort"]
        : "order";
      const manufacturer = this.$route.query["manufacturer"]
        ? this.$route.query["manufacturer"]
        : "";
      const order = this.$route.query["order"]
        ? this.$route.query["order"]
        : "asc";
      const limit = this.$route.query["limit"]
        ? this.$route.query["limit"]
        : 20;
      this.productAll1 = null;

      // commit to store
      this.$store.commit("products/setSearchProduct", { name: name });
      // this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=${limit}&store_id=${store_id}&category_ids=${idCats}&sort[${sort}]=${order}&page=${page}&landing_page=show`,
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
    getBrandBanner() {
      const banner_code = this.BrandItem;
      const Arr = [];
      this.$axios.get;
      this.$store
        .dispatch("app/fetchData", `/v1/client/banners/${banner_code}`)
        .then((resp) => {
          if (resp.data) {
            this.is_active = resp.data.is_active;
            this.brandBanner = resp.data.details;
            this.nameSearch = resp.data.display_in_category_details[0].name;
            this.nameCat = resp.data.title;
            this.idCat = resp.data.display_in_category_details;
            this.idCat.forEach(function(value, index) {
              Arr.push(value.id);
            });
            this.ArrId = Arr;
            this.getProductAll(1, Arr);
          } else {
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
  },
};
</script>
<style scoped>
.isActive {
  display: none;
}
</style>
