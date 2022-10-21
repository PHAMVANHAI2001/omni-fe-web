<template>
  <main role="main" class="clearfix">
    <div class="">
      <breadcrumbs
        :title="this.$route.matched[0].instances.default.$metaInfo.title"
        v-if="!isMobile"
      ></breadcrumbs>
      <div class="container" style="padding:15px 7px">
        <div class="col-md-12 order-first order-md-2">
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
            <!-- / sorter -->
            <div class="top-page-product-bar clearfix">
              <div class="row" id="top-product-list">
                <div class="col-md-6 col-sm-9 col-9">
                  <h2 class="pl-3">
                    {{
                      currentProductCategory.name
                        ? currentProductCategory.name
                        : "Top sản phẩm bán chạy"
                    }}
                  </h2>
                </div>
              </div>
            </div>

            <!-- Danh sach san pham -->
            <div class="hot-deal row" v-if="products">
              <p
                class=" col-sm-4 col-lg-3 col-6"
                v-for="(item, i) in products"
                :key="i"
              >
                <ProductRanking :item="item" :stt="i + 1"></ProductRanking>
              </p>
            </div>

            <div
              v-if="products && !products.length"
              class="alert alert-warning"
              role="alert"
            >
              Không tìm thấy sản phẩm nào.
            </div>
             <pagination
              v-if="products"
              v-show="total_page"
              :total-pages="total_page"
              :total="totalrowcount"
              :per-page="pagesize"
              :current-page="pagenumber"
              @pagechanged="onPageChange"
            />
            <!-- / skeleton -->
            <div class="row" v-if="!products">
              <div class="col-12 col-md-6 col-lg-4" :key="n" v-for="n in 10">
                <skeleton></skeleton>
              </div>
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
import ProductRanking from "~/components/ProductRanking";
import Skeleton from "~/components/Skeleton";
import PaginationVue from "~/components/Pagination.vue";
import $ from "jquery";
import { isMobile, isIndex } from "~/plugins/util";
import Breadcrumbs from "~/components/builders/Breadcrumbs.vue";
export default {
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ProductRanking,
    isMobile,
    breadcrumbs: Breadcrumbs,
    pagination: PaginationVue,
  },
  data() {
    return {
      itemBanner: null,
      isMobile: false,
      selectBrand: [],
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      products: [],
      currentProductCategory: { name: "" },
      maxPrice: "",
      minPrice: "",
      minPriceTemp: "",
      listBrand: [],
      listBrandTemp: [],
      showMoreBrand: false,
      lengthOfListBrand: 0,
      brandSelected: [],
      productTemp: [],
    };
  },
  watchQuery: ["cat"],
  asyncData({ store, params, route }) {
    if (route.query["cat"] !== undefined) {
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
    this.getSliderShow();
    this.getProduct();
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
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
      this.$route.query["top-sale"] == "top-sale"
      this.$store.dispatch("products/getProducTopSale", {
            params: `?limit=20&page=${page}`,
          })
          .then((resp) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            
            this.products = resp.data;
            this.totalrowcount = resp['meta']['pagination'].count;
            this.pagenumber = resp['meta']['pagination'].current_page;
            this.total_page = resp['meta']['pagination'].total_pages;
            this.pagesize = resp['meta']['pagination'].per_page;
          })
          .catch((err) => {
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
    handleScroll () {
      // Your scroll handling here
      if(document.documentElement.scrollHeight === window.pageYOffset + window.innerHeight) {
        this.getProduct(this.pagenumber++)
      console.log('xxxxx', window.innerHeight + window.pageYOffset, document.documentElement.scrollHeight)
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    "$route.query"(q) {
      this.getProduct();
    },
  },
};
</script>

<style>
.slider-wrap {
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
}
.play {
  width: 30px;
  height: 30px;
  background-color: #f07339;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.price {
  padding: 26px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.play img {
  width: 16px;
  height: 16px;
}

.panel-collapse {
  padding-bottom: 15px;
}
.category-price-slide {
  display: flex;
  flex-direction: column;
}
.slider-wrap .input {
  width: 95px;
  height: 30px;
  padding: 0 8px;
  background: rgb(252, 252, 252);
  border-radius: 4px;
  text-align: left;
  border: 1px solid #b8b8b8;
  outline: 0;
  font-size: 13px;
}

.slider-wrap-input {
  display: flex;
  flex-wrap: wrap;
}

.slider-wrap-input .input {
  border: 1px solid black;
  flex: 1;
  margin-right: 6px;
  border-radius: 4px;
  padding: 0 6px;
}

.input input {
  outline: none;
  border: none;
  background: none;
  width: 100%;
  height: 100%;
}

.brand {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.brand .form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.brand .form-group label {
  margin-bottom: 0;
  margin-left: 6px;
  cursor: pointer;
}

.brand .form-control {
  display: inline-block;
  width: unset;
  height: unset;
  cursor: pointer;
  outline: none;
  margin-right: 6px;
}

.brand .brand-more {
  text-align: center;
  cursor: pointer;
  font-weight: 600;
}

.btn-default {
  background: #fff;
  border: 1px solid #189eff;
  font-size: 12px;
  color: #189eff;
  padding: 5px 15px;
  width: 99px;
  margin-top: 8px;
  border-radius: 4px;
}
.slider-title {
  margin-bottom: 5px;
  font-size: 13px;
  text-align: left;
  color: #858585;
  font-weight: 300;
}
.panel-title a {
  line-height: 20px;
  display: block;
  color: #000;
  font-size: 14px;
  text-transform: uppercase;
  margin-left: 5px;
  margin-top: 10;
}
.background {
  background-color: rgb(252, 252, 252);
}
.list-group-item {
  font-size: 14px;
  color: #333;
  padding: 5px 0px;
  display: block;
  position: relative;
  border-radius: 0;
}
</style>
