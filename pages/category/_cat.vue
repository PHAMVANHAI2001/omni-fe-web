<template>
  <main role="main" class="clearfix">
    <div class="container">
      <nav id="breadcrumb" aria-label="breadcrumb" class="clearfix">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">Trang chủ</nuxt-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">Mua</li>
          <li
            v-if="currentProductCategory"
            class="breadcrumb-item active"
            aria-current="page"
          >
            {{
              currentProductCategory.name
                ? currentProductCategory.name
                : "Sản phẩm"
            }}
          </li>
        </ol>
      </nav>

      <div class="container-fluid">
        <div class="row">
          <!-- <div class="sidebar-cate" v-b-toggle.sidebar-cate v-if="isMobile">
            <h3>
              <i class="fa fa-bars"></i>
            </h3>
          </div> -->
          <div class="col-md-3">
            <aside class="sidebar-product-category">
              <ProductSidebarCategory></ProductSidebarCategory>
              <!-- <ProductsBestsellers></ProductsBestsellers> -->
            </aside>
          </div>
          <div class="col-md-9 order-first order-md-2">
            <div class="main-right">
              <div
                class="cat-sub-category"
                v-if="
                  currentProductCategory &&
                    currentProductCategory.sub_categories &&
                    currentProductCategory.sub_categories.length
                "
              >
                <div class="row">
                  <div
                    class="col-2"
                    v-for="(item, i) in currentProductCategory.sub_categories"
                    :key="i"
                  >
                    <div class="sub-cat-item">
                      <nuxt-link
                        :to="{ path: `/product?cat=${item.category_id}` }"
                      >
                        <img
                          class="'img-thumbnail img-fluid rounded"
                          :src="item.image"
                          alt
                        />
                      </nuxt-link>
                      <h4>
                        <nuxt-link
                          :to="{ path: `/product?cat=${item.category_id}` }"
                          >{{ item.name }}</nuxt-link
                        >
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <ProductCategoryBanner></ProductCategoryBanner>

              <!-- / sorter -->
              <div class="top-page-product-bar clearfix">
                <div class="row" id="top-product-list">
                  <div class="col-md-6">
                    <h2 class="float-left">
                      {{
                        currentProductCategory.name
                          ? currentProductCategory.name
                          : "Sản phẩm"
                      }}
                    </h2>
                  </div>
                  <div class="col-md-6">
                    <Sorter class="float-md-right"></Sorter>
                  </div>
                </div>
              </div>

              <!-- Danh sach san pham -->
              <div class="products row" v-if="products">
                <div
                  class="col-md-4 col-sm-6 col-6"
                  v-for="(item, i) in products"
                  :key="i"
                >
                  <Product :item="item"></Product>
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
                v-show="total_page"
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
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import ProductsBestsellers from "~/components/ProductsBestsellers";
import Product from "~/components/Product";
import ProductCategoryBanner from "~/components/ProductCategoryBanner";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import Sorter from "~/components/Sorter";
import { mapMutations } from "vuex";
import PaginationVue from "~/components/Pagination.vue";
import { isMobile } from "~/plugins/util";
import $ from "jquery";
export default {
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ProductsBestsellers: ProductsBestsellers,
    Product,
    Sorter,
    ProductCategoryBanner,
    pagination: PaginationVue,
  },
  data() {
    return {
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      products: null,
      currentProductCategory: { name: "" },
      isMobile: false,
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
          // console.log("change cat:", resp);
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
        : "Sản phẩm",
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
          property: "og:title",
          content: this.currentProductCategory.name,
        },
        {
          hid: "og:image",
          name: "og:image",
          property: "og:image",
          content: this.currentProductCategory.original_image,
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
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  methods: {
    getProduct(page = 1) {
      const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
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
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=24&name=${name}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&status=1`,
        })
        .then((resp) => {
          // console.log("products :", resp.data.meta.pagination);
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.products = resp.data.data;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch((err) => {
          // console.log("err:", err);
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
  },
  watch: {
    "$route.query"(q) {
      this.getProduct();
    },
  },
};
</script>

<style></style>
