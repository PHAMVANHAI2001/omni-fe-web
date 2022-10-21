<template>
  <main role="main" class="clearfix">
    <section class="container mb-6">
      <div class="" v-if="!isMobile">
        <hr />
        <div class="container" style="display: flex">
          <ul class="w-100">
            <li class="flash_sale-li">
              <h3 class="title_flash section-title mb-2 font-bold">
                <span
                  >F<img
                    class="flash_icon"
                    src="~/assets/images/flash_sale.svg"
                    alt
                  />ash Sale</span
                >
              </h3>
            </li>
            <li class="flash_text">Sẽ kết thúc trong</li>
            <li
              class=""
              aria-current="page"
              style="float: left; line-height: 1.6rem"
            >
              <no-ssr>
                <flip-countdown
                  :deadline="end_date"
                  :showDays="false"
                ></flip-countdown>
              </no-ssr>
            </li>
          </ul>
        </div>
        <hr />
      </div>
      <BannerPage :itemBanner="itemBanner"></BannerPage>
      <div class="container">
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
                  <nuxt-link :to="{ path: `/product?cat=${item.category_id}` }">
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
          <br />

          <!-- / sorter -->
          <!-- <div class="top-page-product-bar clearfix">
            <div class="row" id="top-product-list">
              <div class="col-lg-2 col-md-2 col-sm-3 col-4">
                <p class="mb-0 text-center" style="font-weight: bolder">
                  {{ start_date }}
                </p>
                <p class="text-center mb-1" v-if="!status_active">
                  Đang diễn ra
                </p>
                <p class="text-center mb-1" v-if="status_active">
                  Sắp diễn ra
                </p>
              </div>
            </div>
          </div> -->

          <!-- Danh sach san pham -->
          <div class="hot-deal row" v-if="productAll">
            <div
              class="col-sm-4 col-lg-3 col-6 mb-1"
              v-for="(item, i) in productAll"
              :key="i"
            >
              <div class="product-item item-card item-card-1" style="margin: 0 auto">
                <div class="product-img">
                  <nuxt-link
                    :to="{ path: `/product/${item.slug}` }"
                    class="thumb-img box-shadow-none"
                  >
                    <img
                      class="img-fluid lazy"
                      :src="item.thumbnail + '/h280-w280'"
                      :alt="item.slug"
                    />
                  </nuxt-link>
                </div>
                <div class="container-hover">
                  <!-- <h4 class="item-title font-weight-normal " v-if="!isMobile">
                    <nuxt-link :to="{ path: `/product/${item.slug}` }">{{
                      item.name | truncate(80)
                    }}</nuxt-link>
                  </h4>

                  <h4 class="item-title font-weight-normal " v-if="isMobile">
                    <nuxt-link :to="{ path: `/product/${item.slug}` }">{{
                      item.name | truncate(40)
                    }}</nuxt-link>
                  </h4> -->
                  <div class="title-container item-title">
                    <p class="mb-0">
                      <nuxt-link :to="{ path: `/product/${item.slug}` }">
                        {{ item.name }}
                      </nuxt-link>
                    </p>
                    <div v-for="items in item.promotion_tags" :key="items.id">
                      <p
                        class="coupon-product"
                        style="color: white; border: 1px solid #f57224"
                      >
                        {{ items.name }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div class="block-prices">
                      <span>
                        <strong
                          class="product-price"
                          v-if="item.special == null"
                        >
                          {{ item.price_formatted }}
                        </strong>
                        <strong class="product-price" v-if="item.special > 0">
                          {{ item.special_formatted }}
                        </strong>
                        <div
                          class="float-right special badge-promotion-custom"
                          v-if="item.special > 0"
                        >
                          <span class="">-{{ item.special_percentage }}%</span>
                        </div>
                        <div v-if="item.special > 0" class="special">
                          <span
                            class="product-old-price"
                            v-bind:class="{ has_special: item.special }"
                          >
                            <del>{{ item.price_formatted }}</del>
                          </span>
                        </div>
                      </span>
                    </div>
                    <div class="product-saled">
                      <div class="d-flex">
                        <!-- <b-progress
                              :max="item.qty_flash_sale"
                              class="w-100"
                            >
                              <b-progress-bar
                                :value="item.qty_sale"
                              ></b-progress-bar>
                              <span
                                class="flash-sale-progress-bar_text"
                                v-if="item.qty_flash_sale > 0"
                                >Đã bán: {{ item.qty_sale }}</span
                              >
                              <span
                                class="flash-sale-progress-bar_text"
                                v-if="item.qty_flash_sale == 0"
                                >Hết hàng</span
                              >
                            </b-progress> -->
                        <b-progress :max="item.qty_flash_sale" class="w-100">
                          <b-progress-bar
                            :value="item.qty_sale"
                          ></b-progress-bar>
                          <span
                            class="flash-sale-progress-bar_text"
                            v-if="item.qty_flash_sale > 0"
                            >{{
                              item.qty_status == 0
                                ? `Đã bán: ${item.qty_sale}`
                                : item.qty_status == 1
                                ? "Sắp hết"
                                : "Đã hết"
                            }}</span
                          >
                          <!-- <span class="flash-sale-progress-bar_text" v-if="item.qty_flash_sale == 0">Hết hàng</span> -->
                        </b-progress>
                      </div>
                    </div>
                  </div>

                  <div
                    class="group-buy-price-mobile"
                    v-if="
                      isMobile && item['qty_flash_sale'] != item['qty_sale']
                    "
                  >
                    <div class="">
                      <div v-if="item.adding_to_cart"></div>
                      <div class="d-flex flex-row">
                        <a
                          v-if="item.qty_flash_sale > 0"
                          class="col-12 col-sm-12 col-md-12 group-product-btn"
                          @click="addToCart(item, $event)"
                        >
                          <div class="choose-buy">
                            <i class="fa fa-cart-plus"></i>
                          </div>
                        </a>

                        <a
                          v-if="item.qty_flash_sale <= 0"
                          class="col-12 col-sm-12 col-md-12 group-product-btn"
                          @click="addToCart(item, $event)"
                          disabled="disabled"
                        >
                          <div class="choose-buy" style="color: ">
                            <i>Hết hàng</i>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    class="btn-fnc"
                    id="btn-fnc"
                    v-if="
                      !isMobile && item['qty_flash_sale'] != item['qty_sale']
                    "
                  >
                    <div class="d-flex">
                      <div
                        class="box-fcn-cart col-md-6 col-12 add-to-cart"
                        style="
                          background: #60a511;
                          font-size: 12px;
                          padding: 0px 0px 0px 0px;
                          font-weight: 600;
                        "
                        @click="addToCart(item, $event)"
                        v-bind:class="{
                          'buy-block':
                            (!item['cartAddedQty'] ||
                              item['cartAddedQty'] == 0) &&
                            item['qty'] > 0,
                        }"
                      >
                        <div>CHỌN MUA</div>
                        <!-- <i class="fa fa-cart-arrow-down"></i> -->
                      </div>
                      &nbsp;
                      <div
                        class="box-fcn-cart col-md-6 col-12"
                        @click="showProductDetailModal(item)"
                        style="
                          background: rgb(0, 110, 67);
                          font-size: 12px;
                          padding: 0px 0px 0px 0px;
                          font-weight: 600;
                        "
                      >
                        XEM NHANH
                      </div>
                    </div>
                  </div>

                  <div
                    class="btn-fnc"
                    id="btn-fnc"
                    v-if="!isMobile && item.qty_flash_sale <= 0"
                  >
                    <div class="d-flex">
                      <div
                        class="
                          box-fcn-cart
                          col-md-6 col-12
                          add-to-cart
                          disabledbutton
                        "
                        style="
                          background: #60a511;
                          font-size: 12px;
                          padding: 0px 0px 0px 0px;
                          font-weight: 600;
                        "
                        @click="addToCart(item, $event)"
                        v-bind:class="{
                          'buy-block':
                            (!item['cartAddedQty'] ||
                              item['cartAddedQty'] == 0) &&
                            item['qty'] > 0,
                        }"
                      >
                        <div>CHỌN MUA</div>
                        <!-- <i class="fa fa-cart-arrow-down"></i> -->
                      </div>
                      &nbsp;
                      <div
                        class="box-fcn-cart col-md-6 col-12"
                        @click="showProductDetailModal(item)"
                        style="
                          background: rgb(0, 110, 67);
                          font-size: 12px;
                          padding: 0px 0px 0px 0px;
                          font-weight: 600;
                        "
                      >
                        XEM NHANH
                      </div>
                    </div>
                  </div>
                </div>
                 <span class="out-stock" v-if="item.qty == 0">SẮP CÓ HÀNG</span>
              </div>
            </div>
          </div>

          <div
            v-if="productAll && !productAll.length"
            class="alert alert-warning"
            role="alert"
          >
            Không tìm thấy sản phẩm nào.
          </div>

          <!-- / skeleton -->
          <div class="row" v-if="!productAll">
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
    </section>
  </main>
  <!-- /.container -->
</template>

<script>
import Vue from "vue";
import FlipCountdown from "vue2-flip-countdown";
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
import $ from "jquery";
import { max_value, max } from "vee-validate/dist/rules";
import { isMobile, isIndex } from "~/plugins/util";
import Breadcrumbs from "~/components/builders/Breadcrumbs.vue";
export default {
  components: {
    FlipCountdown,
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ProductsBestsellers: ProductsBestsellers,
    Product,
    Sorter,
    BannerPage,
    isMobile,
    ProductCategoryBanner,
    pagination: PaginationVue,
    breadcrumbs: Breadcrumbs,
  },
  data() {
    return {
      status_active: true,
      start_date: "2021-12-25 00:00:00",
      end_date: "2021-12-25 00:00:00",
      productAll: [],
      itemBanner: null,
      isMobile: false,
      selectBrand: [],
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      products: null,
      currentProductCategory: { name: "" },
      maxPrice: "",
      minPrice: "",
      minPriceTemp: "",
      listBrand: [],
      listBrandTemp: [],
      showMoreBrand: false,
      lengthOfListBrand: 0,
      brandSelected: [],
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
        : "Flash sale - NutifoodShop",
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
  computed: {
    price() {},
  },
  created() {
    this.getSliderShow();
    this.getProduct();
    // this.getBrand();
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  methods: {
    showProductDetailModal(item) {
      // console.log("item:", item);
      this.$store.commit("products/showProductDetailModal", item);
    },
    addToCart(product, $event) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      Vue.set(product, "adding_to_cart", true);
      Vue.set(product, "adding_to_cart_promotion", true);
      this.$store
        .dispatch("cart/add", {
          product_id: product.id,
          quantity: this.quantity,
          options: [],
          session_id: this.$store.state.app.session_id,
        })
        .then((res) => {
          Vue.set(product, "cart_item_id", res["id"]);
          Vue.set(product, "cartAddedQty", 1);
          Vue.set(product, "adding_to_cart", false);
          this.$store.dispatch("cart/getCart");
          this.clicked = false;
          this.isActive = true;
          this.$toast
            .success("Đã thêm vào giỏ hàng", {
              position: "top-right",
            })
            .goAway(1500);
        })
        .catch((err) => {
          this.clicked = false;
          // this.$toast
          //   .error("Lỗi thêm vào giỏ hàng", {
          //     position: "top-right",
          //   })
          //   .goAway(350000);
          Vue.set(product, "adding_to_cart", false);
        });
    },
    getSliderShow() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/FLASH-SALE")
        .then((resp) => {
          if (resp.data) {
            this.itemBanner = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    getPriceInState(value) {
      const payload = {
        target: {
          value: value,
        },
      };
      return payload;
    },
    format2(number) {
      const n = number.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return n;
    },
    changePrice(event, type) {
      const price = this.formatStringVndToNumber(event.target.value);
      if (type == 1) this.minPrice = this.formatMoney(price, 3, ".", ",");
      else this.maxPrice = this.formatMoney(price, 3, ".", ",");
    },
    // changePriceMax(event) {
    //   const price = this.formatStringVndToNumber(event.target.value);
    //   this.maxPrice = this.formatMoney(price, 3, ".", ",");
    // },
    formatMoney(n, c, d, t) {
      var c = isNaN((c = Math.abs(c))) ? 2 : c,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
        j = (j = i.length) > 3 ? j % 3 : 0;

      return (
        s +
        (j ? i.substr(0, j) + t : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
      );
    },
    formatStringVndToNumber(string) {
      let reString = "";
      for (let i = 0; i < string.length; i++) {
        if (string[i] != ",") reString += string[i];
      }
      return reString;
    },
    AddZero(num) {
      return num >= 0 && num < 10 ? "0" + num : num + "";
    },
    getProduct(page = 1) {
      this.$store
        .dispatch("products/getProducFlashSale")
        .then((resp) => {
          if (resp && resp.data.length > 0) {
            this.productAll = resp.data;
            this.productAll.forEach((item) => {
              if (
                item &&
                item.qty_flash_sale &&
                item.qty_out_min &&
                item.qty_sale
              ) {
                if (item.qty_sale >= item.qty_flash_sale) {
                  //Hết hàng
                  item.qty_status = 2;
                }
                let saledPercent = (item.qty_sale / item.qty_flash_sale) * 100;
                if (saledPercent >= 90 && saledPercent < 100) {
                  //Sắp hết
                  item.qty_status = 1;
                }
                if (saledPercent < 90) {
                  item.qty_status = 0;
                }
              }
            });
            this.end_date = this.productAll[0].flash_sale[0].end_date;
            var timeStart = this.productAll[0].flash_sale[0].start_date;

            var date_start = new Date(
              this.productAll[0].flash_sale[0].start_date
            );
            var hour =
              date_start.getHours() - (date_start.getHours() >= 12 ? 12 : 0);
            this.start_date = [
              [this.AddZero(hour), this.AddZero(date_start.getMinutes())].join(
                ":"
              ),
              date_start.getHours() >= 12 ? " " : " ",
            ].join(" ");

            var now = new Date();
            var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);
            var timeNow = [
              [this.AddZero(hour), this.AddZero(now.getMinutes())].join(":"),
              now.getHours() >= 12 ? " " : " ",
            ].join(" ");

            if (this.start_date >= timeNow) {
              this.status_active = true;
              //  console.log('this.start_date ',this.start_date   )
              //  console.log('timeStart ',timeStart   )
              //   console.log('Đang diễn ra')
            } else {
              this.status_active = false;
              //   console.log('this.start_date ',this.start_date   )
              //   console.log('timeStart ',timeStart)
              //  console.log('sắp diễn ra')
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    showMoreBrandFunction() {
      let array = [];
      array = this.listBrand.concat(this.listBrandTemp);
      this.listBrandTemp = [];
      this.listBrand = array;
      this.showMoreBrand = true;
    },
    onPageChange(page) {
      this.pagenumber = page;
      this.getProduct(page);
      if (!process.server) {
        $("html, body").animate(
          {
            scrollTop: $("#top-product-list").offset().top,
          },
          1000
        );
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

<style>
a[disabled="disabled"] {
  pointer-events: none;
  opacity: 0.4;
}
.disabledbutton {
  pointer-events: none;
  opacity: 0.4;
}
.flash-sale-progress-bar_text {
  text-transform: uppercase;
  color: #fff;
  z-index: 2;
  position: absolute;
  bottom: 7px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}
.isActive {
  display: none;
}
.product-related {
  margin-top: 30px;
  margin-bottom: 30px;
}
.flash_icon {
  height: 10%;
  width: 10%;
  margin: 1px 0px 11px;
  animation-name: stretch;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
}
.flash_text {
  width: auto;
  padding-left: 20px;
  font-size: 1.3rem;
  float: left;
  font-weight: 500;
}
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
  color: #595959;
  padding: 5px 0px;
  display: block;
  position: relative;
  border-radius: 0;
}
.flash_icon {
  height: 10%;
  width: 10%;
  margin: 1px 0px 11px;
}
.title_flash {
  background: -webkit-linear-gradient(rgb(255, 155, 5), rgb(240, 10, 10));
  font-weight: bold;
  font-size: 1.6rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
