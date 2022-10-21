<template>
  <!-- <div class=" col-sm-4 col-lg-3"> -->
  <div class="product-item item-card item-card-1" style="margin: 0 auto">
    <div class="product-img">
      <div
        class="text-label bg-hot d-block promotion_class"
        style="margin: 0px 0px -9px 0px;"
        v-if="flash_sales"
      ></div>
      <nuxt-link
        :to="{ path: `/product/${item.slug}` }"
        class="thumb-img box-shadow-none"
      >
        <img
          class="img-fluid lazy"
          :src="item.thumbnail + '/h280-w280'"
          :alt="item.slug"
        />

        <!-- <figure class="snip0054 green">
          <img :src="item.thumbnail + '/h280-w280'" :alt="item.slug" />
          <figcaption>
            <div class="space">
              &nbsp;
            </div>
            <div class="title-figcap">
              <p>{{ item.name }}</p>
            </div>
          </figcaption>
        </figure> -->
      </nuxt-link>

    </div>
    <div class="container-hover">
      <!-- <h4 class="item-title font-weight-normal ">
        <nuxt-link :to="{ path: `/product/${item.slug}` }"
          ><div class="tag">#{{ stt }}</div
          >{{ item.name | truncate(70) }}</nuxt-link
        >
      </h4> -->
      <div class="title-container item-title">
        <p class="mb-0">
          <nuxt-link :to="{ path: `/product/${item.slug}` }">
            <div class="tag">#{{ stt }}</div
          >{{ item.name }}
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

      <div v-if="!isMobile">
        <div class="block-prices">
          <span>
            <strong class="product-price">
              {{ item.promotion_price ? item.special_formatted : item.price_formatted }}
            </strong>
            <div v-if="item.promotion_price" class="special">
              <span
                class="product-old-price"
                v-bind:class="{ has_special: item.special }"
              >
                <del>{{ item.price_formatted }}</del>
              </span>
            </div>
            <!-- <div v-if="!item.promotion_price && item.old_product_price != item.price" class="special">
              <span
                class="product-old-price"
                v-bind:class="{ has_special: item.price }"
              >
                <del>{{ item.old_product_price_formatted }}</del>
              </span>
            </div> -->
          </span>
          <div class="badge-promotion" v-if="item.promotion_price">
            <span class="percent">-{{ item.special_percentage }}%</span>
          </div>
          <!-- <div class="badge-promotion" v-if="!item.promotion_price && item.old_product_price != item.price">
            <span class="percent">-{{ item.percentage_price_old }}</span>
          </div> -->
          <div
            class="dropup"
            v-if="item.product_gift && item.product_gift.length > 0"
          >
            <a class="dropbtn">
              <main class="card-container">
                <div class="card square-card">
                  <div class="down">
                    <div class="up">
                      <div class="squeeze">
                        <div class="rotate-in">
                          <div class="rotate-out">
                            <div class="square"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </a>
            <div class="dropup-content">
              <b><i class="fa fa-gift"></i> Quà tặng 0đ:</b>
              <div v-for="(gift, i) in item['product_gift']" :key="i">
                <p>
                  <nuxt-link
                    :to="{path :`/promotion/${gift.id_promotion}`}"
                    :id="`tooltip-info-promotion-${i}`"
                  >
                    <i class="fa fa-question-circle" style="color: #ffcd00"></i>
                  </nuxt-link>
                  <b-tooltip
                    :target="`tooltip-info-promotion-${i}`"
                    triggers="hover"
                    id="content-tooltip-promotion"
                  >
                    {{ gift.promotion_name }}
                  </b-tooltip>
                  {{ gift.product_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="product-saled">
          <span class="saled">Đã bán: {{ item.sold_count_formatted }}</span>
          <div class="d-flex" v-if="item.star">
            <star-rating
              :rating="item.star.avg_star.avg"
              :star-size="starSize"
              :show-rating="showRating"
              :increment="0.1"
              read-only
            ></star-rating>
            &nbsp;

            <span class="count-rating">({{ item.star.total_rate.total }})</span>
          </div>
        </div>
      </div>

      <div class="group-buy-price-mobile" v-if="isMobile">
        <div class="row">
          <div class="col-8">
            <div class="d-flex flex-row">
              <strong class="price-ismobile">
                {{ item.promotion_price ? item.special_formatted : item.price_formatted }}
              </strong>
              &nbsp;
              <del
                class="float-right special-ismobile"
                v-if="item.promotion_price"
                >{{ item.price_formatted }}</del
              >
               <!-- <del
                class="float-right special-ismobile"
                v-if="!item.promotion_price && item.old_product_price != item.price"
                >{{ item.old_product_price_formatted }}</del
              > -->
            </div>
          </div>
          <div class="col-4">
            <div class="text-right" v-if="item.promotion_price">
              <span class="percent-ismobile hide-360"
                >-{{ item.special_percentage }}%</span
              >
            </div>
            <!-- <div class="text-right" v-if="!item.promotion_price && item.old_product_price != item.price">
              <span class="percent-ismobile hide-360"
                >-{{ item.percentage_price_old }}</span
              >
            </div> -->
          </div>
        </div>
        <div>
          <div class="float-right" v-if="item.promotion_price">
            <span class="percent-ismobile show-360"
              >-{{ item.special_percentage }}%</span
            >
          </div>
          <!-- <div class="float-right" v-if="!item.promotion_price && item.old_product_price != item.price">
            <span class="percent-ismobile show-360"
              >-{{ item.percentage_price_old }}</span
            >
          </div> -->

          <span class="saled">Đã bán: {{ item.sold_count_formatted }}</span>
          <div class="d-flex" v-if="item.star">
            <star-rating
              :rating="item.star.avg_star.avg"
              :star-size="starSize"
              :show-rating="showRating"
              :increment="0.1"
              read-only
            ></star-rating>
            <!-- &nbsp; -->
            <span class="count-rating">({{ item.star.total_rate.total }})</span>
          </div>
        </div>
        <div
          class="col-12 pl-pr-0"
          v-if="!item.product_gift || item.product_gift.length == 0"
        >
          <a
            class="text-center float-right choose-buy-if-gift w-100"
            @click="addToCart(item, $event)"
            style="padding-left: 0 !important;padding-right: 0 !important"
            v-if="item.price && item.price > 0"
          >
            <i class="fa fa-cart-plus"></i>
          </a>
        </div>

        <div
          class="col-12 row pl-pr-0"
          style="margin-left: 5px"
          v-if="item.product_gift && item.product_gift.length > 0"
        >
          <div
            class="product-gift-content w-100 font-12 text-blue col-9"
            style="padding-left: 0 !important;padding-right: 0 !important"
          >
            <a
              class="text-center float-right choose-buy-if-gift w-100"
              @click="addToCart(item, $event)"
              style="padding-left: 0 !important;padding-right: 0 !important"
              v-if="item.price && item.price > 0"
            >
              <i class="fa fa-cart-plus"></i>
            </a>
          </div>
          <div class="col-3">
            <div
              class="dropup"
              v-if="item.product_gift && item.product_gift.length > 0"
            >
              <a class="dropbtn">
                <main class="card-container">
                  <div class="card square-card">
                    <div class="down">
                      <div class="up">
                        <div class="squeeze">
                          <div class="rotate-in">
                            <div class="rotate-out">
                              <div class="square"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </a>
              <div class="dropup-content">
                <b><i class="fa fa-gift"></i> Quà tặng 0đ:</b>
                <div v-for="(gift, i) in item['product_gift']" :key="i">
                  <p>
                    <nuxt-link
                      :to="{path :`/promotion/${gift.id_promotion}`}"
                      :id="`tooltip-info-promotion-${i}`"
                    >
                      <i
                        class="fa fa-question-circle"
                        style="color: #ffcd00"
                      ></i>
                    </nuxt-link>
                    <b-tooltip
                      :target="`tooltip-info-promotion-${i}`"
                      triggers="hover"
                      id="content-tooltip-promotion"
                    >
                      {{ gift.promotion_name }}
                    </b-tooltip>
                    {{ gift.product_name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="btn-fnc"
        id="btn-fnc"
        v-if="!isMobile && item.price && item.price > 0"
      >
        <div class="d-flex">
          <a
            class="box-fcn-cart col-md-6 col-12 add-to-cart"
            style="background: #60a511;
                  font-size: 12px;
                  padding: 0px 0px 0px 0px;
                  font-weight: 600;"
            @click="addToCart(item, $event)"
            v-bind:class="{
              'buy-block':
                (!item['cartAddedQty'] || item['cartAddedQty'] == 0) &&
                item['qty'] > 0,
            }"
          >
            <div>CHỌN MUA</div>
            <!-- <i class="fa fa-cart-arrow-down"></i> -->
          </a>
          &nbsp;
          <a
            class="box-fcn-cart col-md-6 col-12"
            @click="showProductDetailModal(item)"
            style="background: rgb(0, 110, 67);
                  font-size: 12px;
                  padding: 0px 0px 0px 0px;
                  font-weight: 600;"
          >
            <!-- <i class="fa fa-eye"></i> -->
            XEM NHANH
          </a>
        </div>
      </div>
    </div>
    <span class="out-stock" v-if="item.qty == 0">SẮP CÓ HÀNG</span>


    <!-- <div class="product-meta "> 
        <i class="icons icon-heart mr-2  love1_51318 "></i> 
          <span class="icon-top  item1_51318" data-id="51318">
              <span class="icon-text vote_count item51318">1707</span>
          </span>
          <a href="#comment_post"> 
            <i class="icons icon-comment mr-2  love1_51318 "></i> 
              <span class="icon-top-comment item2_51318" data-id="51318">
                <span class="icon-text">48</span>
              </span>
          </a>
      </div> -->
    <!-- <div class="product-gift-content d-inline-block w-100 font-12 text-blue"> 
        <i class="icons icon-gift mr-1"></i>
          Tặng Xe cân bằng khi mua đơn hàng tã quần.. 
      </div> -->
  </div>
  <!-- </div> -->
</template>
<script>
import Vue from "vue";
import { isMobile } from "~/plugins/util";
export default {
  props: {
    item: Object,
    stt: Number,
  },
  data() {
    return {
      flash_sales: false,
      end_date: null,
      countDown: null,
      distance: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      isActive: false,
      mediaScreen: 0,
      phone: null,
      clicked: false,
      cartItem: false,
      rating: 4,
      starSize: 13,
      showRating: false,
      isMobile: false,
    };
  },
  components: {
    // StarRating
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
      this.phone = localStorage.getItem("phone");
    }
    // this.getCartItemId(this.item);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    $("figure").mouseleave(function() {
      $(this).removeClass("hover");
    });
    if (!process.server) {
      this.isMobile = isMobile();
    }

    // const self = this;
    // $(".add-to-cart").on("click", function() {
    //   let cart;
    //   if (self.mediaScreen > 767) {
    //     cart = $("#cart-header" );
    //   }
    //   else {
    //     cart = $(".icon-add-to-cart");
    //   }
    //   var imgtodrag = $(this)
    //     .parents(".product-item")
    //     .find("img")
    //     .eq(0);
    //   if (imgtodrag) {
    //     var imgclone = imgtodrag
    //       .clone()
    //       .offset({
    //         top: imgtodrag.offset().top,
    //         left: imgtodrag.offset().left,
    //       })
    //       .css({
    //         opacity: "0.5",
    //         position: "absolute",
    //         height: "150px",
    //         width: "150px",
    //         "z-index": "9998",
    //       })
    //       .appendTo($("body"))
    //       .animate(
    //         {
    //           top: cart.offset().top + 10,
    //           left: cart.offset().left + 10,
    //           width: 75,
    //           height: 75,
    //         },
    //         1500
    //       );
    //     imgclone.animate(
    //       {
    //         width: 0,
    //         height: 0,
    //       },
    //       function() {
    //         $(this).detach();
    //       }
    //     );
    //   }
    // });
  },
  methods: {
    showProductDetailModal(item) {
      // console.log("item:", item);
      this.$store.commit("products/showProductDetailModal", item);
    },
    handleResize() {
      this.mediaScreen = window.innerWidth;
    },
    getCartItemId(productItem) {
      const cartItem =
        this.$store.state.cart.cart &&
        this.$store.state.cart.cart.details.find((itm) => {
          return productItem["id"] == itm["product_id"];
        });
      if (cartItem) {
        return (this.cartItem = true);
      }
    },
    addToCart(product, $event) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      Vue.set(this.item, "adding_to_cart", true);
      Vue.set(this.item, "adding_to_cart_promotion", true);
      this.$store
        .dispatch("cart/add", {
          product_id: product.id,
          quantity: this.quantity,
          options: [],
          session_id: this.$store.state.app.session_id,
        })
        .then((res) => {
          Vue.set(this.item, "cart_item_id", res["id"]);
          Vue.set(this.item, "cartAddedQty", 1);
          Vue.set(this.item, "adding_to_cart", false);
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
          Vue.set(this.item, "adding_to_cart", false);
        });
    },
  },
};
</script>
<style lang="scss">
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
.badge-promotion-custom {
  background: red;
  color: #fff;
  border-radius: 18%;
  text-align: center;
  padding: 0 5px;
  font-size: 13px;
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
    margin: 6px 0;
    font-size: 0.8rem;
  }
}
@media (max-width: 920px) {
  .saled {
    float: right;
    margin: 6px 0;
    font-size: 0.8rem;
  }
}

//hover
figure.snip0054 {
  font-family: "Raleway", Arial, sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
  // margin: 10px;
  // min-width: 220px;
  background: #000000;
  text-align: left;
}
figure.snip0054 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}
figure.snip0054 img {
  opacity: 1;
  width: 100%;
}
figure.snip0054 figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (max-width: 767px) {
  figure.snip0054 figcaption {
    display: none;
  }
}
figure.snip0054 figcaption > div {
  height: 50%;
  overflow: hidden;
  width: 100%;
  position: relative;
}
figure.snip0054 figcaption::before {
  position: absolute;
  top: 50%;
  right: 100%;
  left: 0;
  height: 2px;
  content: "";
  opacity: 0;
  background-color: rgba(255, 255, 255, 0);
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transition-delay: 0.6s;
  transition-delay: 0.6s;
}
figure.snip0054 i,
figure.snip0054 p {
  margin: 0;
  opacity: 0;
}
figure.snip0054 i {
  font-weight: 500;
  position: absolute;
  font-size: 28px;
  display: block;
  width: 38px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  bottom: 0;
  right: 30px;
  background: #000000;
  -webkit-transform: translate3d(0%, 50%, 0);
  transform: translate3d(0%, 50%, 0);
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}
figure.snip0054 p {
  width: 100%;
  padding: 10px 35px;
  font-weight: 300;
  -webkit-transform: translate3d(0%, -50%, 0);
  transform: translate3d(0%, -50%, 0);
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}
figure.snip0054 a {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}
figure.snip0054.blue {
  background: #091b27;
}
figure.snip0054.blue i {
  background: #2980b9;
}
figure.snip0054.red {
  background: #2e0e0a;
}
figure.snip0054.red i {
  background: #c0392b;
}
figure.snip0054.yellow {
  background: #4d2909;
}
figure.snip0054.yellow i {
  background: #e67e22;
}
figure.snip0054.green {
  background: #061c10;
}
figure.snip0054.green i {
  background: #006e43;
}
figure.snip0054:hover img,
figure.snip0054.hover img {
  opacity: 0.35;
}
figure.snip0054:hover figcaption i,
figure.snip0054.hover figcaption i,
figure.snip0054:hover figcaption p,
figure.snip0054.hover figcaption p,
figure.snip0054:hover figcaption h3,
figure.snip0054.hover figcaption h3 {
  -webkit-transform: translate3d(0%, 0%, 0);
  transform: translate3d(0%, 0%, 0);
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
  opacity: 1;
}
figure.snip0054:hover figcaption::before,
figure.snip0054.hover figcaption::before {
  background: #ffffff;
  right: 30px;
  opacity: 1;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

// animation gift

/* Square */

// .square-card::before {
//   background-color: rgba(0, 0, 0, 0.2);
//   border-radius: 50%;
//   // bottom: 2rem;
//   content: "";
//   height: 0.1rem;
//   // left: 25%;
//   position: absolute;
//   right: 25%;
// }
.card-container {
  margin-right: 0.3rem;
}
.down {
  animation: down 1.4s ease-in infinite both;
  // bottom: 2rem;
}

.down .up {
  animation: up 1.4s ease-in-out infinite both;
}

.down .up .squeeze {
  animation: squeeze 1.4s cubic-bezier(0.72, 0.03, 0.28, 0.97) infinite both;
  transform-origin: 50% 100%;
}

.down .up .squeeze .rotate-in {
  animation: rotate-in 1.4s ease-out infinite both;
}

.down .up .squeeze .rotate-in .rotate-out {
  animation: rotate-out 1.4s ease-in infinite both;
}

.square {
  content: url(../assets/images/icon/gift-item-2.png);
  height: 1.5rem;
  width: 1.5rem;
}

@keyframes down {
  0% {
    transform: translateY(-1rem);
  }
  20%,
  100% {
    transform: translateY(0);
  }
}

@keyframes up {
  0%,
  75% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1rem);
  }
}

@keyframes squeeze {
  0%,
  4% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.3, 0.7);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate-in {
  0% {
    transform: rotate(-135deg);
  }
  20%,
  100% {
    transform: rotate(0deg);
  }
}

@keyframes rotate-out {
  0%,
  80% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(135deg);
  }
}
.dropbtn {
  border: none;
}

.dropup {
  position: relative;
  display: inline-block;
}
.product_list .product-price {
    font-size: 12px;
    margin-left: -3px;
}
.badge-promotion {
    margin: -6px -2px 0px 0px;
    width: 30px;
}
.dropup-content {
  display: none;
  position: absolute;
  background-color: #006e43;
  min-width: 177px;
  bottom: 30px;
  right: -4px;
  z-index: 1;
  box-shadow: 2px 2px 4px #bdbdbd;
  opacity: 0.9;
}
@media (max-width: 800px) {
  .dropup-content {
    right: -9px;
  }
}
@media (max-width: 768px) {
  .dropup-content {
    right: -5px;
  }
}
@media (max-width: 428px) {
  .dropup-content {
    right: -20px;
    min-width: 202px;
  }
}

.dropup-content b {
  color: #ffcd00;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  text-decoration: none;
  display: block;
  margin-bottom: 0 !important;
}
.dropup-content div p {
  color: rgb(255, 255, 255);
  padding: 3px 15px;
  text-decoration: none;
  display: block;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}

.dropup-content a:hover {
  background-color: #ccc;
}

.dropup:hover .dropup-content {
  display: block;
}

.dropup:hover .dropbtn {
  background-color: #2980b9;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
