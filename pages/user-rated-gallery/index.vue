<template>
  <main role="main" class="clearfix">
    <div style="margin-bottom: 3rem">
      <div class="container" style="padding:15px 0px">
        <div class="col-md-12 order-first order-md-2">
          <div class="isn-mobile">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Trang chủ</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Thư viện đánh giá
              </li>
            </ol>
          </div>
          <div class="main-right">
            <div class="top-page-product-bar clearfix">
              <div class="col-md-12 col-sm-12 col-12">
                <h1 class="float-left fs-25">
                  Thư viện đánh giá
                </h1>
              </div>
            </div>

            <div class="row mr-1 ml-1 mb-2">
              <div class="col-md-6 col-sm-12 col-12 mt-mobile-1">
                <select
                  @change="getRatedGalleryByCat(category_id_selected)"
                  v-model.trim="category_id_selected"
                  class="form-control"
                  ref="cat_id"
                >
                  <option value selected>Tất cả danh mục</option>
                  <option
                    :value="item.id"
                    v-for="item in categories"
                    :key="item.id"
                    >{{ item.name }}</option
                  >
                </select>
              </div>
              <div class="col-md-6 col-sm-12 col-12 mt-mobile-1">
                <select
                  @change="
                    getRatedGalleryByChildrenCat(children_category_id_selected)
                  "
                  v-model.trim="children_category_id_selected"
                  class="form-control"
                  ref="cat_id"
                  id="childrenCategory"
                  disabled="true"
                >
                  <option value="">Tất cả danh mục con</option>
                  <option
                    :value="item.id"
                    v-for="item in childs_of_category"
                    :key="item.id"
                    >{{ item.name }}</option
                  >
                </select>
              </div>
            </div>

            <div class="hot-deal" v-if="ratedGallery">
              <div
                class="row"
                style="margin-left: 0px !important; margin-right: 0px !important;"
              >
                <div
                  class=" col-sm-4 col-lg-3 col-6"
                  style="padding: 0 3px !important"
                  v-for="(item, i) in ratedGallery"
                  :key="i"
                  data-aos="fade-up"
                >
                  <Rated :rated="item"></Rated>
                </div>
              </div>
            </div>

            <div
              v-if="ratedGallery && ratedGallery.length == 0"
              class="alert alert-warning"
              role="alert"
            >
              Chưa có bài đánh giá nào.
            </div>

            <!-- / skeleton -->
            <div class="row" v-if="!ratedGallery">
              <div class="col-6 col-md-6 col-lg-4" :key="n" v-for="n in 10">
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
  </main>
  <!-- /.container -->
</template>

<script>
import Product from "~/components/Product";
import Rated from "~/components/Rated";
import Skeleton from "~/components/Skeleton";
import Sorter from "~/components/Sorter";
import PaginationVue from "~/components/Pagination.vue";
import $ from "jquery";
import { isMobile, isIndex } from "~/plugins/util";
import Breadcrumbs from "~/components/builders/Breadcrumbs.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    skeleton: Skeleton,
    Product,
    Rated,
    Sorter,
    pagination: PaginationVue,
    breadcrumbs: Breadcrumbs,
  },
  data() {
    return {
      isMobile: false,
      page: 1,
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      category_selected: {},
      ratedGallery: [],
      product: null,
      category_id_selected: "",
      childs_of_category: [],
      children_category_id_selected: "",
      search_id: "",
      categories: [],
    };
  },
  watchQuery: ["cat"],
  computed: {},
  created() {
    this.getRatedGallery();
    this.getCat();
    if (!process.server) {
      if (document.getElementById("childrenCategory")) {
        let elementchildrenCategory = document.getElementById(
          "childrenCategory"
        );
        if (this.category_id_selected == "") {
          elementchildrenCategory.setAttribute("disabled", "true");
        }
      }
    }
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  // computed: mapState({
  //   categories: (state) => state.products.categories,
  // }),
  methods: {
    getCat() {
      this.$store
        .dispatch("products/getCategory")
        .then((resp) => {
          if (resp && resp.data) {
            this.categories = resp.data.filter((cat) => {
              return cat.category_publish == 1;
            });
          }
        })
        .catch((err) => {
          // console.log("err:", err);
        });
    },
    getRatedGalleryByCat(category) {
      this.search_id = this.category_id_selected;
      this.getRatedGallery();
      this.$store
        .dispatch("products/getCategory")
        .then((resp) => {
          this.childs_of_category = [];
          this.category_selected = {};
          let isActiveCategory = resp.data;
          isActiveCategory.filter((item) => {
            if (item && item.id == category) {
              this.category_selected = item;
              this.childs_of_category = this.category_selected.children;
              if (document.getElementById("childrenCategory")) {
                let elementchildrenCategory = document.getElementById(
                  "childrenCategory"
                );
                if (
                  this.childs_of_category &&
                  this.childs_of_category.length == 0
                ) {
                  elementchildrenCategory.setAttribute("disabled", "true");
                }
                if (
                  this.childs_of_category &&
                  this.childs_of_category.length > 0
                ) {
                  elementchildrenCategory.removeAttribute("disabled", "true");
                }
              }
            }
          });
        })
        .catch((err) => {
          // console.log("err:", err);
        });
    },
    getRatedGalleryByChildrenCat(category) {
      if (this.children_category_id_selected) {
        this.search_id = this.children_category_id_selected;
      } else {
        this.search_id = this.category_id_selected;
      }

      this.getRatedGallery();
    },
    getRatedGallery(page = 1) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      const code = this.$route.query["code"] ? this.$route.query["code"] : "";
      const product_name = this.$route.query["slug"]
        ? this.$route.query["slug"]
        : "";
      const is_active = this.$route.query["is_active"]
        ? this.$route.query["is_active"]
        : "";
      const category_id = this.search_id ? this.search_id : "";
      this.$store
        .dispatch("products/getRatedGallery", {
          params: `?code=${code}&product_name=${product_name}&category_id=${category_id}&limit=20&sort[rate]=desc&page=${page}`,
        })
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.ratedGallery = resp.data.data;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    onPageChange(page) {
      this.pagenumber = page;
      this.getRatedGallery(page);
      if (!process.server) {
         $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
  },
  //   watch: {
  //     "$route.query"(q) {
  //       this.getProduct();
  //     },
  //   },
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
  font-size: 15px;
  color: #595959;
  padding: 5px 0px;
  display: block;
  position: relative;
  border-radius: 0;
}
</style>
