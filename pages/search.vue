<template>
  <main role="main" class="clearfix" id="top-product-list">
    <breadcrumbs
      :title="this.$route.matched[0].instances.default.$metaInfo.title"
    ></breadcrumbs>
    <div class="container mb-6">
      <div class="container">
        <BannerPage :itemBanner="itemBanner"></BannerPage>
        <div class="row">
          <div class="col-md-12 order-first order-md-2">
            <div class="main-right">
              <!-- Danh sach san pham -->
              <div class="hot-deal row" v-if="products">
                <div
                  class="col-sm-4 col-lg-3 col-6"
                  v-for="(item, i) in products"
                  :key="i"
                  style="margin-bottom: 10px"
                >
                  <Product :item="item" data-aos="fade-up"></Product>
                </div>
              </div>

              <div
                v-if="products && !products.length"
                class="alert alert-warning"
                role="alert"
              >
                Không tìm thấy sản phẩm nào.
              </div>

              <!-- / skeleton -->
              <div class="row" v-if="!products">
                <div class="col-12 col-md-6 col-lg-4" :key="n" v-for="n in 10">
                  <skeleton></skeleton>
                </div>
              </div>

              <pagination
                v-show="total_page && products && products.length"
                :total-pages="total_page"
                :total="totalrowcount"
                :per-page="pagesize"
                :current-page="pagenumber"
                @pagechanged="onPageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import BannerPage from "~/components/Banners/BannerPage.vue";
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import ProductsBestsellers from "~/components/ProductsBestsellers";
import Product from "~/components/Product";
import ProductCategoryBanner from "~/components/ProductCategoryBanner";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import Sorter from "~/components/Sorter";
import { mapMutations } from "vuex";
import PaginationVue from "~/components/Pagination.vue";
import Breadcrumbs from "~/components/builders/Breadcrumbs.vue";
import $ from "jquery";
export default {
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ProductsBestsellers: ProductsBestsellers,
    Product,
    Sorter,
    Breadcrumbs,
    BannerPage,
    ProductCategoryBanner,
    pagination: PaginationVue,
  },
  data() {
    return {
      itemBanner: null,
      pagenumber: 1,
      pagesize: 2,
      totalrowcount: 0,
      total_page: 0,
      products: null,
      searchkey: null,
      currentProductCategory: { name: "" },
    };
  },
  watchQuery: ["cat"],
  async asyncData({ store, params, route }) {
    if (route.query["cat"]) {
      return store
        .dispatch("products/getCurrentProductCategory", {
          id: route.query["cat"],
        })
        .then((resp) => {
          // //console.log("change cat:", resp);
          return {
            currentProductCategory: resp.data,
          };
        });
    }
  },
  head() {
    return {
      title: this.currentProductCategory.name
        ? this.currentProductCategory.name
        : "Tìm kiếm",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.currentProductCategory.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.currentProductCategory.description,
        },
        {
          hid: "og:title",
          name: "og:image",
          property: "og:title",
          content: this.currentProductCategory.name,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.baseUrl + this.$nuxt.$route.fullPath,
        },
      ],
    };
  },
  created() {
    this.getProduct();
    this.getSliderShow();
  },
  methods: {
    getSliderShow() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/banner-page-product")
        .then((resp) => {
          if (resp.data) {
            this.itemBanner = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    getProduct(page = 1) {
      const cat = this.$route.query["id"] ? this.$route.query["id"] : "";
      const name = this.$route.query["name"] ? this.$route.query["name"] : "";
      const sort = this.$route.query["sort"]
        ? this.$route.query["sort"]
        : "date_added";
      const manufacturer = this.$route.query["manufacturer"]
        ? this.$route.query["manufacturer"]
        : "";
      const order = this.$route.query["order"]
        ? this.$route.query["order"]
        : "desc";

      // commit to store
      this.$store.commit("products/setSearchProduct", { name: name });
      this.$store.dispatch("app/showLoadingOverlay", true);
      var result = encodeURIComponent(name);
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=25&name=${result}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&status=1`,
        })
        .then((resp) => {
          // //console.log("products :", resp.data.meta.pagination);
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.products = resp.data.data;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch((err) => {
          // //console.log("err:", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    onPageChange(page) {
      this.pagenumber = page;
      this.getProduct(page);
      if (!process.server) {
        $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
    search() {
      this.$router.push({ path: `/search?name=${this.searchkey}` });
    },
  },
  watch: {
    "$route.query"(q) {
      this.getProduct();
    },
  },
};
</script>

<style></style>
