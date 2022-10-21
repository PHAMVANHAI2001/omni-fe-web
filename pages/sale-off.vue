<template>
  <main role="main" class="clearfix">
    <nav id="breadcrumb" aria-label="breadcrumb" class="clearfix">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/">Trang chủ</nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Sale off</li>
      </ol>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-12 order-first order-md-2">

           <div class="banner-sale-off">
              <!-- <img src="~/assets/images/sale-2thang9.png" width="100%" alt=""> -->
            </div>

          <div class="main-right">
        
            <!-- Danh sach san pham -->
            <div class="products row" v-if="products">
              <div class="col-md-3 col-sm-6 col-6" v-for="(item, i) in products" :key="i">
                <Product :item="item"></Product>
              </div>
            </div>

           

            <div
              v-if="products && !products.length"
              class="welcome-quee-sale"
            >Không tìm thấy chương trình khuyến mãi nào, hoặc chưa đến thời gian khuyến mãi, vui lòng quay lại sau....</div>

            <!-- / skeleton -->
            <div class="row" v-if="!products">
              <div class="col-12 col-md-6 col-lg-4" :key="n" v-for="(n) in 10">
                <skeleton></skeleton>
              </div>
            </div>

            <pagination v-if="products"
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
import $ from "jquery";
export default {
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ProductsBestsellers: ProductsBestsellers,
    Product,
    Sorter,
    ProductCategoryBanner,
    pagination: PaginationVue
  },
  data() {
    return {
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      products: null,
      searchkey: null,
      currentProductCategory: { name: "" }
    };
  },
  watchQuery: ["cat"],
  async asyncData({ store, params, route }) {
    if (route.query["cat"]) {
      return store
        .dispatch("products/getCurrentProductCategory", {
          id: route.query["cat"]
        })
        .then(resp => {
          // //console.log("change cat:", resp);
          return {
            currentProductCategory: resp.data
          };
        });
    }
  },
  head() {
    return {
      title:  "Khuyến mãi - SaleOff",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Siêu sale, sale 2/9, sale bùng bổ, hàng chất, chính hãng."
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Sale banh nóc"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.currentProductCategory.name
        },
        {
          hid: "og:image",
          name: "og:image",
          property: "og:image",
          content: this.currentProductCategory.original_image
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.baseUrl + this.$nuxt.$route.fullPath
        }
      ]
    };
  },
  created() {
    this.getProduct();
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
        .dispatch("products/getSaleOff", {
          params: `?limit=100&name=${name}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&status=1`
        })
        .then(resp => {
          // //console.log("products :", resp.data.meta.pagination);
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.products = resp.data.data;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch(err => {
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
    }
  },
  watch: {
    "$route.query"(q) {
      this.getProduct();
    }
  }
};
</script>

<style>
.banner-sale-off{
  margin: 10px 0;
}
.welcome-quee-sale{
  font-size: 1.1rem;
  text-align: center;
  padding: 10vh 5px;
  margin: 10px;

}
</style>