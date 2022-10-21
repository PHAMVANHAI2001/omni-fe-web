<template>
  <section
    class="section container"
    v-bind:class="{ isActive: productAll.length == 0 }"
  >
    <div class="w-100" style="display: flex" data-aos="fade-up">
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
        <li class="" aria-current="page">
          <nuxt-link
            :to="{ path: '/product/flashsale' }"
            class="float-right text-primary pr-3 see_more"
            style="margin-top: 4px !important"
            ><span>Xem thêm</span></nuxt-link
          >
        </li>
      </ul>
    </div>
    <!-- Nút xem thêm v-if="flash_sales" -->
    <client-only>
      <div class="hot-deal">
        <carousel
          :perPageCustom="[
            [428, 2],
            [768, 3],
            [767, 3],
            [1024, 5],
          ]"
          :autoplay="false"
          :loop="true"
          :navigationEnabled="true"
          :paginationEnabled="false"
          :scrollPerPage="false"
        >
          <slide
            class="product-slide mb-slide-768 c"
            v-for="(item, i) in productAll"
            :key="i"
          >
            <div class="product-item item-card item-card-1" data-aos="fade-up" style="margin: 0 auto">
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
                    item.name | truncate(75)
                  }}</nuxt-link>
                </h4>

                <h4 class="item-title font-weight-normal " v-if="isMobile">
                  <nuxt-link :to="{ path: `/product/${item.slug}` }">{{
                    item.name | truncate(50)
                  }}</nuxt-link>
                </h4> -->
                <div class="title-container item-title">
                  <p class="mb-0">
                    <nuxt-link :to="{ path: `/product/${item.slug}` }">
                      {{ item.name }}
                    </nuxt-link>
                  </p>
                  <!-- <div v-for="items in item.promotion_tags" :key="items.id">
                    <p
                      class="coupon-product"
                      style="color: white; border: 1px solid #f57224"
                    >
                      {{ items.name }}
                    </p>
                  </div> -->
                </div>

                <div v-if="!isMobile">
                  <div class="block-prices">
                    <span>
                      <strong class="product-price" v-if="item.special == null">
                        {{ item.price_formatted }}
                      </strong>
                      <strong class="product-price" v-if="item.special > 0">
                        {{ item.special_formatted }}
                      </strong>
                      <div v-if="item.special > 0" class="special">
                        <span
                          class="product-old-price"
                          v-bind:class="{ has_special: item.special }"
                        >
                          <del>{{ item.price_formatted }}</del>
                        </span>
                      </div>
                    </span>
                    <div class="badge-promotion" v-if="item.special > 0">
                      <span class="percent"
                        >-{{ item.special_percentage }}%</span
                      >
                    </div>
                  </div>
                  <div class="product-saled">
                    <div class="d-flex">
                      <b-progress :max="item.qty_flash_sale" class="w-100">
                        <b-progress-bar :value="item.qty_sale"></b-progress-bar>
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
                        <!-- <span
                          class="flash-sale-progress-bar_text"
                          v-if="
                            item.qty_flash_sale > 0 &&
                              qtyStatus &&
                              qtyStatus == 1
                          "
                          >Sắp hết</span
                        >
                        <span
                          class="flash-sale-progress-bar_text"
                          v-if="
                            item.qty_flash_sale > 0 &&
                              qtyStatus &&
                              qtyStatus == 2
                          "
                          >Đã hết</span
                        > -->
                      </b-progress>
                    </div>
                  </div>
                </div>

                <div class="group-buy-price-mobile" v-if="isMobile">
                  <div class="row">
                    <div class="col-8">
                      <div class="d-flex flex-row">
                        <strong
                          class="price-ismobile"
                          v-if="item.special == null"
                        >
                          {{ item.price_formatted }}
                        </strong>
                        <strong class="price-ismobile" v-if="item.special > 0">
                          {{ item.special_formatted }}
                        </strong>
                        &nbsp;
                        <del
                          class="float-right special-ismobile"
                          v-if="item.special > 0"
                          >{{ item.price_formatted }}</del
                        >
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="text-right" v-if="item.special > 0">
                        <span class="percent-ismobile hide-360"
                          >-{{ item.special_percentage }}%</span
                        >
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="float-right" v-if="item.special > 0">
                      <span class="percent-ismobile show-360"
                        >-{{ item.special_percentage }}%</span
                      >
                    </div>
                    <span class="saled"
                      >Đã bán: {{ item.sold_count_formatted }}</span
                    >
                    <div class="d-flex">
                      <star-rating
                        :rating="item.star.avg_star.avg"
                        :star-size="starSize"
                        :show-rating="showRating"
                        :increment="0.1"
                        read-only
                      ></star-rating>
                      &nbsp;
                      <span class="count-rating"
                        >({{ item.star.total_rate.total }})</span
                      >
                    </div>
                  </div>
                  <div class="product-saled pt-4">
                    <div class="d-flex">
                      <b-progress :max="item.qty_flash_sale" class="w-100">
                        <b-progress-bar :value="item.qty_sale"></b-progress-bar>
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
                        <!-- <span
                          class="flash-sale-progress-bar_text"
                          v-if="item.qty_flash_sale == 0"
                          >Hết hàng</span
                        > -->
                      </b-progress>
                    </div>
                  </div>
                  <div
                    class=""
                    v-if="item['qty_flash_sale'] != item['qty_sale']"
                  >
                    <div v-if="item.adding_to_cart"></div>
                    <div class="d-flex flex-row">
                      <a
                        class="col-12 col-sm-12 col-md-12 group-product-btn"
                        @click="addToCart(item, $event)"
                      >
                        <div class="choose-buy">
                          <i class="fa fa-cart-plus"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  class="btn-fnc"
                  id="btn-fnc"
                  v-if="!isMobile && item['qty_flash_sale'] != item['qty_sale']"
                >
                  <div class="d-flex">
                    <a
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
                    </a>
                    &nbsp;
                    <a
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
                    </a>
                  </div>
                </div>
              </div>
              <span class="out-stock" v-if="item.qty == 0">SẮP CÓ HÀNG</span>

            </div>
          </slide>
        </carousel>
      </div>
    </client-only>
  </section>
</template>
<script>
import { mapState } from "vuex";
import Vue from "vue";
import Product from "~/components/Product";
import { isMobile, isIndex } from "~/plugins/util";
import FlipCountdown from "vue2-flip-countdown";

export default {
  components: {
    Product,
    FlipCountdown,
  },
  props: ["productid"],
  data() {
    return {
      showRating: false,
      rating: 4,
      starSize: 13,
      end_date: "2021-12-25 00:00:00",
      isMobile: false,
      productAll: [],
      productRelated: [],
      qtyStatus: 0,
    };
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
      this.phone = localStorage.getItem("phone");
    }
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
              let saledPercent = (item.qty_sale / item.qty_flash_sale) * 100;
              if (item.qty_sale >= item.qty_flash_sale) {
                //Hết hàng
                item.qty_status = 2;
              }
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
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
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
    handleResize() {
      this.mediaScreen = window.innerWidth;
    },
    viewProudct(id) {
      this.$router.push({ path: "/products/" + id });
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
  },
};
</script>
<style lang="scss" scoped>
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

.title_flash {
  background: -webkit-linear-gradient(rgb(255, 155, 5), rgb(240, 10, 10));
  font-weight: bold;
  font-size: 1.6rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
}
.buy {
  display: inline-block;
  padding: 5px 12px;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.85rem;
  border-radius: 50%;
  margin-top: 10px;
  color: #fff !important;
  background: #136f43;
  opacity: 0;
}
.buy.buy-block {
  opacity: 1;
}
.product-item .input-group-qty {
  width: 100%;
  text-align: center;
  max-width: inherit;
  margin-top: 4px;
  input.form-control {
    text-align: center;
  }
}

.product-unit {
  color: rgb(163, 163, 163);
  font-size: 0.8rem;
}

@media (min-width: 1025px) {
  .product-item .product-body {
    position: relative;
  }

  .product-item:hover .actionLoop {
    opacity: 1;
    visibility: inherit;
  }
}

.product-item .thumbnail {
  width: 10%;
  float: left;
  padding-right: 5px;
}

.product-item .product-body {
  width: 90%;
  float: right;
}

.badge-promotion {
  margin: -6px -2px 0px 0px;
  background: red;
  float: right;
  position: inherit;
  top: 0px;
  right: 0;
  width: 39px;
  height: 25px;
  line-height: 24px;
  z-index: 9;
  color: #fff;
  /* font-size: 1px; */
  text-align: center;
  border-radius: 18%;
  .percent {
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
  }
  .promotion-text {
    font-size: 1rem;
    display: block;
  }
}
.product-right-body .lds-dual-ring {
  width: 20px;
  height: 20px;
  position: absolute;
  left: -35px;
  bottom: 9px;
  z-index: 99;
  &:after {
    width: 20px;
    height: 20px;
    margin: 0px;
  }
}
.promotion-price {
  font-size: 12px;
}
.count-rating {
  font-size: 12px;
  position: absolute;
  margin: 4px 63px;
}

@media (min-width: 921px) {
  .saled {
    float: right;
    margin: 3px 0;
  }
}
@media (max-width: 920px) {
  .saled {
    float: right;
    margin: 3px 0;
  }
}
</style>
