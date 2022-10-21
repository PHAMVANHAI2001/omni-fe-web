<template>
  <div id="landingPage">
    <div>
      <div style="width 100%;">
        <carousel
          id="carousel-no-animation"
          :perPageCustom="[
            [320, 1],
            [768, 1],
            [1024, 1],
          ]"
          :autoplay="false"
          :loop="true"
          :navigationEnabled="true"
          :paginationEnabled="true"
          :paginationColor="MM006e43"
          :paginationActiveColor="MMffcd00"
          style="width: 100% !important"
        >
          <slide>
            <a
              v-if="top_banners_images_first.type == 'LINK-CUSTOM'"
              :href="top_banners_images_first.router"
              target="_blank"
            >
              <img
                :src="top_banners_images_first.image_url"
                alt=""
                width="100%"
                height="auto"
              />
            </a>
            <nuxt-link
              v-if="top_banners_images_first.type == 'CATEGORY'"
              :to="{
                path: `/product?cat=${top_banners_images_first.category_id}`,
              }"
            >
              <img
                :src="top_banners_images_first.image_url"
                alt=""
                width="100%"
                height="auto"
              />
            </nuxt-link>
            <a class="btn-circle-play" v-show="top_banners_video_first">
              <div class="background-play">
                <div
                  class="box-circle-play"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-play"></i>
                </div>
              </div>
            </a>
          </slide>
          <slide v-for="item in top_banners_images" :key="item.id">
            <a
              v-if="item.type == 'LINK-CUSTOM'"
              :href="item.router"
              target="_blank"
            >
              <img :src="item.image_url" alt="" width="100%" height="auto" />
            </a>
            <nuxt-link
              v-if="item.type == 'CATEGORY'"
              :to="{
                path: `/product?cat=${item.category_id}`,
              }"
            >
              <img :src="item.image_url" alt="" width="100%" height="auto" />
            </nuxt-link>
          </slide>
        </carousel>
        <div
          class="modal fade bd-example-modal-lg"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div
              class="modal-content"
              style="background: none !important; border: none !important;"
            >
              <div class="modal-body">
                <div>
                  <video
                    width="100%"
                    id="videoBanner"
                    v-if="top_banners_video_first"
                    :src="top_banners_video_first.image_url"
                    controls
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="voucher-banner" class="container mt-3">
      <div class="container">
        <div
          class="row"
          v-if="bottom_banners.length <= 3 && !isMobile"
          v-bind:class="[
            bottom_banners.length == 2
              ? 'mr-banner-voucher-row'
              : bottom_banners.length == 3
              ? 'mr-banner-voucher-row'
              : '',
          ]"
        >
          <div
            class=""
            v-for="item_banner in bottom_banners"
            :key="item_banner.id"
            v-bind:class="[
              bottom_banners.length == 2
                ? 'col-6 pl-1 pr-1'
                : bottom_banners.length == 3
                ? 'col-4 pl-1 pr-1'
                : 'col-12',
            ]"
          >
            <nuxt-link
              v-if="item_banner.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item_banner.category_id}` }"
            >
              <img
                :src="item_banner.image_url"
                :alt="item_banner.category_name"
                class="item-img"
              />
            </nuxt-link>
            <a
              v-if="item_banner.type == 'LINK-CUSTOM'"
              :href="item_banner.router"
              target="_blank"
            >
              <img
                :src="item_banner.image_url"
                :alt="item_banner.router"
                class="item-img"
              />
            </a>
          </div>
        </div>
        <div class="row" v-if="bottom_banners.length == 1 && isMobile">
          <div
            class=""
            v-for="item_banner in bottom_banners"
            :key="item_banner.id"
            v-bind:class="[
              bottom_banners.length == 2
                ? 'col-6 pl-1 pr-1'
                : bottom_banners.length == 3
                ? 'col-4 pl-1 pr-1'
                : bottom_banners.length == 4
                ? 'col-3 pl-1 pr-1'
                : 'col-12',
            ]"
          >
            <nuxt-link
              v-if="item_banner.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item_banner.category_id}` }"
            >
              <img
                :src="item_banner.image_url"
                :alt="item_banner.category_name"
                class="item-img"
              />
            </nuxt-link>
            <a
              v-if="item_banner.type == 'LINK-CUSTOM'"
              :href="item_banner.router"
              target="_blank"
            >
              <img
                :src="item_banner.image_url"
                :alt="item_banner.router"
                class="item-img"
              />
            </a>
          </div>
        </div>
        <div
          class="main-SkinnyItem-sl"
          v-if="
            bottom_banners.length >= 4 ||
              (isMobile && bottom_banners.length != 1)
          "
        >
          <carousel
            id="bannerBrandLdp"
            :perPageCustom="[
              [320, 1],
              [768, 2],
              [1024, 2],
            ]"
            :loop="true"
            :navigationEnabled="true"
            :paginationEnabled="true"
            :paginationColor="MM006e43"
            :paginationActiveColor="MMffcd00"
          >
            <slide v-for="item_banner in bottom_banners" :key="item_banner.id">
              <div class="text-center">
                <a
                  v-if="item_banner.type == 'LINK-CUSTOM'"
                  :href="item_banner.router"
                  class="SkinnyItem-a text-center"
                >
                  <img
                    :src="item_banner.image_url"
                    alt=""
                    class="slider-img"
                    width="99.5%"
                  />
                </a>
                <nuxt-link
                  v-if="item_banner.type == 'CATEGORY'"
                  :to="{
                    path: `/product?cat=${item_banner.category_id}`,
                  }"
                  class="SkinnyItem-a text-center"
                >
                  <img :src="item_banner.image_url" alt="" class="slider-img" />
                </nuxt-link>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="container">
        <section
          class="section container"
          v-bind:class="{ isActive: is_active == 0 }"
        >
          <div v-for="item in currentLangding.data" :key="item.id">
            <!-- ----- banner Brand ----- -->
            <div>
              <div class="main-SkinnyItem-sl">
                <carousel
                  id="bannerBrandLdp"
                  :perPageCustom="[
                    [320, 1],
                    [768, 1],
                    [1024, 1],
                  ]"
                  :loop="true"
                  :navigationEnabled="true"
                  :paginationEnabled="true"
                  :paginationColor="MM006e43"
                  :paginationActiveColor="MMffcd00"
                >
                  <slide
                    v-for="item_banner in item.banners"
                    :key="item_banner.id"
                  >
                    <div class="text-center">
                      <a
                        v-if="item_banner.type == 'LINK-CUSTOM'"
                        :href="item_banner.router"
                        class="SkinnyItem-a"
                      >
                        <img
                          :src="item_banner.image_url"
                          alt=""
                          class="slider-img"
                        />
                      </a>
                      <nuxt-link
                        v-if="item_banner.type == 'CATEGORY'"
                        :to="{
                          path: `/product?cat=${item_banner.category_id}`,
                        }"
                        class="SkinnyItem-a"
                      >
                        <img
                          :src="item_banner.image_url"
                          alt=""
                          class="slider-img"
                        />
                      </nuxt-link>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
            <!-- -----End banner Brand ----- -->

            <h3
              class="the-title section-title mb-1 text-center the-title-brand"
            >
              {{ item.name }}
            </h3>
            <!-- ----- Product Slide ----- -->
            <client-only
              style="padding: 0px 25px !important;"
              v-if="item.is_show == 'slide'"
            >
              <div class="collections">
                <carousel
                  :perPageCustom="[
                    [320, 2],
                    [768, 3],
                    [767, 3],
                    [1200, 5],
                  ]"
                  :loop="true"
                  :autoplay="false"
                  :autoplayHoverPause="true"
                  :autoplayTimeout="5000"
                  :paginationEnabled="false"
                  :navigationEnabled="true"
                  :scrollPerPage="false"
                >
                  <slide
                    class="product-slide"
                    v-for="(item, j) in item.products"
                    :key="j"
                    style="padding-right: 7px"
                  >
                  <Product class="product-item" :item="item"></Product>
                 </slide>
                </carousel>
              </div>
            </client-only>
            <!-- ----- End Product Slide ----- -->
            <!-- ----- Product List ----- -->

            <div class="main-right" v-if="item.is_show == 'list'">
              <div class="hot-deal row" v-if="products">
                <div
                  class=" col-sm-4 col-lg-3 col-6"
                  v-for="(item, i) in item.products"
                  :key="i"
                >
                  <Product class="product-item" :item="item"></Product>
                  <br>
                </div>
              </div>
            </div>

            <!-- ----- End Product List ----- -->
          </div>
        </section>
      </div>
    </section>
    <section class="mt-5 mb-6">
      <div class="container">
        <div v-html="currentLangding.data_cke"></div>
      </div>
    </section>
  </div>
</template>

<script>
import Product from "~/components/Product";
import Vue from "vue";
import { isMobile } from "~/plugins/util";
import { mapMutations, mapState } from "vuex";
import $ from "jquery";
export default {
  data() {
    return {
      number: 5,
      is_active: null,
      btnSee: true,
      isActive: true,
      headerBanner: [],
      products: [],
      isMobile: false,
      clicked: false,
      brandBanner: [],
      top_banners: [],
      top_banners_video: [],
      top_banners_video_first: {},
      top_banners_images: [],
      top_banners_images_first: {},
      bottom_banners: [],
      data_langding: [],
      currentLangding: [],
      MM006e43: "#006e43",
      MMffcd00: "#ffcd00",
      productAll:[],
    };
  },
  async asyncData({ store, params }) {
    store.dispatch("app/showLoadingOverlay", true);
    return store
      .dispatch("category/detailSettingBySlug", { slug: params["id"] })
      .then((data) => {
        store.dispatch("app/showLoadingOverlay", false);
        return {
          currentLangding: data.data,
          data_langding:data.data.data,
          currentImage: {
            thumbnail: data.data.thumbnail,
          },
        };
      })
      .catch((err) => {
        store.dispatch("app/showLoadingOverlay", false);
      });
  },
  components: {
    Product,
  },
  computed: mapState({
    categories: (state) => state.category.categories,
  }),
  created() {
    this.checkLangding();
    if (!process.server) {
      var checkDatastorage = JSON.parse(localStorage.getItem("productsAll"));
    if(checkDatastorage){
      this.productAll = checkDatastorage;
      this.getProducts_langding();
      }
      else{
       this.getProduct();
      }
    }
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
      if (document.getElementById("videoBanner")) {
        window.addEventListener("click", () => {
          if (document.getElementById("videoBanner")) {
            let video = document.getElementById("videoBanner");
            video.pause();
          }
        });
      }
    }
  },
  methods: {
    checkLangding(){
        const dataBrands = JSON.parse(this.currentLangding.value);
        const dataLandings = this.currentLangding.data;
        dataLandings.forEach((brands) => {
          if (brands.banners) {
            let ArrBannerIsActive = [];
            brands.banners.forEach((item) => {
              if (item && item.is_active == "1") {
                ArrBannerIsActive.push(item);
              }
            });
            brands.banners = ArrBannerIsActive;
          }
        });
        let ArrayTopBanner = dataBrands.top_banners;
        ArrayTopBanner.filter((item) => {
          if (item && item.is_active == true) {
            this.top_banners.push(item);
          }
        });
        this.top_banners.filter((item) => {
          if (item && item.image_type == "VIDEO") {
            this.top_banners_video.push(item);
          } else {
            this.top_banners_images.push(item);
          }
        });
        this.top_banners_images_first = this.top_banners_images.shift();
        this.top_banners_video_first = this.top_banners_video.shift();
        let ArrayBottomBanner = dataBrands.bottom_banners;
        ArrayBottomBanner.filter((item) => {
          if (item && item.is_active == true) {
            this.bottom_banners.push(item);
          }
        });
    },

    getProduct() {
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=200&status=1&landing_page=show`,
        })
        .then((resp) => {
          this.productAll = resp.data.data;
          this.getProducts_langding();
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },

     getProducts_langding() {
        this.data_langding.filter((item_langding) => {
          let temp = item_langding.products
          item_langding.products = []
            temp.filter((item_pro) => {
              this.productAll.filter((item_proAll) => {
                  if(item_pro.id == item_proAll.id){
                    item_langding.products.push(item_proAll)
                  }
                })
            })
        })
    },

    buyNow() {
      $(document).ready(function($) {
        $("html, body").animate(
          {
            scrollTop: 1500,
          },
          600
        );
        return false;
      });
    },
    showProductDetailModal(item) {
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
            .goAway(1000);
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
.isActive {
  display: none;
}
a {
  color: #0084ff;
}

a:hover,
a:focus {
  color: #003566;
}

.btn-primary {
  background: #0084ff;
}

.btn-warning {
  background: #f62;
}

.btn-block {
  background: #0084ff;
}

.btn {
  border-radius: 30px;
  font: 300 12px/26px "Poppins", sans-serif;
  padding: 2px 33px 0;
  color: #006e43;
  border-color: #006e43;
}

.btn:hover,
.btn:focus {
  background: #006e43;
  border-color: 2px solid #006e43;
  color: #fff;
}

.btn-primary {
  border: none;
  background: #0084ff;
  color: #fff;
  padding: 0 28px;
}

.btn-primary.btn-lg {
  padding: 0 85px;
  border-radius: 60px;
  font: 500 27px/72px "Poppins", sans-serif;
  margin-bottom: 77px;
}

@media (max-width: 991px) {
  .btn-primary.btn-lg {
    padding: 0 70px;
    font-size: 18px;
    line-height: 60px;
    margin-bottom: 15px;
  }
}

@media (max-width: 767px) {
  .btn-primary.btn-lg {
    padding: 0 65px;
  }
}


.btn-kickstarter.btn-lg {
  padding: 0 45px;
  border-radius: 60px;
  font: 500 22px/65px "Poppins", sans-serif;
  margin-bottom: 77px;
}

@media (max-width: 991px) {
  .btn-kickstarter.btn-lg {
    padding: 0 70px;
    font-size: 18px;
    line-height: 60px;
    margin-bottom: 15px;
  }
}

@media (max-width: 767px) {
  .btn-kickstarter.btn-lg {
    padding: 2px 40px 16px;
    line-height: 40px;
  }
  .btn-kickstarter.btn-lg img {
    display: block;
  }
}

.btn-kickstarter:hover,
.btn-kickstarter:focus {
  background-color: #10b157;
}

.btn-indegogo {
  border: none;
  background: #eb1478;
  color: #fff;
  padding: 0 28px;
}

.btn-indegogo.btn-lg {
  padding: 0 45px;
  border-radius: 60px;
  font: 500 22px/65px "Poppins", sans-serif;
  margin-bottom: 77px;
}

@media (max-width: 991px) {
  .btn-indegogo.btn-lg {
    padding: 0 70px;
    font-size: 18px;
    line-height: 60px;
    margin-bottom: 15px;
  }
}

@media (max-width: 767px) {
  .btn-indegogo.btn-lg {
    padding: 2px 40px 16px;
    line-height: 40px;
  }
  .btn-indegogo.btn-lg img {
    display: block;
  }
}

.btn-indegogo:hover,
.btn-indegogo:focus {
  background-color: #bc1060;
}

.btn-warning {
  text-transform: uppercase;
  font: 500 16px/40px "Poppins", sans-serif;
  padding: 0 35px;
  border-radius: 30px;
  color: #fff;
  border: none;
}

.btn-warning:hover,
.btn-warning:focus {
  background: #374048;
  color: #fff;
}

.btn-warning.btn-lg {
  padding: 0 85px;
  border-radius: 60px;
  font: 500 27px/72px "Poppins", sans-serif;
  margin-bottom: 77px;
}

@media (max-width: 991px) {
  .btn-warning.btn-lg {
    padding: 0 70px;
    font-size: 18px;
    line-height: 60px;
    margin-bottom: 15px;
  }
}

@media (max-width: 767px) {
  .btn-warning.btn-lg {
    padding: 0 65px;
  }
}

@media (max-width: 991px) {
  .btn-warning {
    margin-bottom: 35px;
  }
}

.btn-link {
  font: 300 15px/14px "Poppins", sans-serif;
  border-bottom: 1px solid;
  text-decoration: none;
  color: #007eff;
  border-color: #a3c5ff;
}

.btn-block {
  font: 600 19px/63px "Poppins", sans-serif;
  text-transform: uppercase;
  border: none;
  transition: all 300ms linear 0s;
  border-radius: 0;
  background: #0084ff;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-block.btn-rounded {
  border-radius: 4px;
  font: 600 26px/80px "Poppins", sans-serif;
}

@media (max-width: 767px) {
  .btn-block.btn-rounded {
    font: 600 18px/60px "Poppins", sans-serif;
  }
}

.form-control {
  border-radius: 0;
  box-shadow: none;
  font: 300 17px/24px "Poppins", sans-serif;
  padding: 12px 18px;
  height: 50px;
  border-color: #e0e8ee;
  background: #f8fbfd;
}

.form-control::-moz-placeholder {
  opacity: 1;
  font: 300 17px/24px "Poppins", sans-serif;
  color: #c0cad0;
}

.form-control:-ms-input-placeholder {
  font: 300 17px/24px "Poppins", sans-serif;
  color: #c0cad0;
}

.form-control::-webkit-input-placeholder {
  font: 300 17px/24px "Poppins", sans-serif;
  color: #c0cad0;
}

.form-control:focus {
  background: 0 0;
  box-shadow: none;
}

.form-control.alt {
  background: #fff;
  border-color: #ccc;
}

textarea.form-control {
  resize: none;
}

.form-group {
  margin-bottom: 20px;
}

.has-error .form-control,
.has-error .form-control:focus {
  box-shadow: none;
  border-color: #f96152;
  background: #fff;
}

.mb-lg {
  margin-bottom: 50px !important;
}

@-webkit-keyframes doublePulse {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes doublePulse {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

.mfp-fade.mfp-bg {
  opacity: 0;
  background: #fff;
  transition: all 0.3s;
}

.mfp-fade.mfp-bg.mfp-ready {
  opacity: 0.9;
}

.mfp-fade.mfp-bg.mfp-removing {
  opacity: 0;
}

.mfp-fade.mfp-wrap .mfp-content {
  opacity: 0;
  transition: all 0.3s;
}

.mfp-fade.mfp-wrap.mfp-ready .mfp-content {
  opacity: 1;
}

.mfp-fade.mfp-wrap.mfp-removing .mfp-content {
  opacity: 0;
}

.nav-pills > li > a {
  background-color: #eee;
  padding: 10px 20px 7px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.nav-pills > li > a:hover {
  background-color: #e7e7e7;
}

.nav-pills > li + li {
  margin-left: 0;
}

.nav-pills > li:not(:first-child):not(:last-child) a {
  border-radius: 0;
}

.nav-pills > li:first-child > a {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.nav-pills > li:last-child > a {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.nav-center {
  text-align: center;
}

.nav-center ul.nav {
  display: inline-block;
}

.nav-center ul.nav li {
  display: inline;
}

.nav-center ul.nav li a {
  float: left;
}

.nav-pills > li > a {
  color: #c2c2c2;
}

.back_to_top {
  display: none;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.back_to_top:hover {
  opacity: 0.5;
}

.gallery__image {
  border-radius: 3px;
  margin-bottom: 30px;
}

.m0 {
  margin: 0;
}
.m20 {
  margin: 50px 0;
}
.mar-200 {
  margin-top: -180px;
}

.p0 {
  padding: 0;
}

.m-t-0 {
  margin-top: 0 !important;
}

.m-b-20 {
  margin-bottom: 20px !important;
}

.m-b-40 {
  margin-bottom: 40px !important;
}

.m-b-80 {
  margin-bottom: 80px !important;
}

.m-t-20 {
  margin-top: 20px !important;
}

.m-t-40 {
  margin-top: 40px !important;
}

.m-t-80 {
  margin-top: 80px !important;
}

.m-v-40 {
  margin-top: 40px !important;
  margin-bottom: 40px !important;
}

.m-v-80 {
  margin-top: 80px !important;
  margin-bottom: 80px !important;
}

.m-t-100 {
  margin-top: 100px !important;
}

.m-b-100 {
  margin-bottom: 100px !important;
}

.p-t-0 {
  padding-top: 0 !important;
}

.display-block {
  display: block;
}

.no-bg-img {
  background-image: none !important;
}

.grey-bg {
  background-color: #f0f0f2 !important;
}

@media (min-width: 1600px) {
  .big-container {
    width: 1500px;
  }
}

@media (max-width: 992px) {
  .m-b-100-sm {
    margin-bottom: 100px !important;
  }
}

.h2 {
  margin: 20px 0;
  font: 600 65px/1 "Poppins", sans-serif;
  letter-spacing: -3px;
  color: #374048;
}

.btn-md {
  padding: 0 33px;
  font: 500 21px/58px "Poppins", sans-serif;
  margin-bottom: 10px;
  margin-top: 10px;
}

.btn-sm {
  padding: 0 30px;
  font: 500 18px/50px "Poppins", sans-serif;
  margin-bottom: 10px;
  margin-top: 10px;
}

.section-header {
  margin-bottom: 50px;
  text-align: center;
}

// .section-header:after {
//     content: '';
//     width: 82px;
//     height: 6px;
//     display: block;
//     margin: 0 auto
// }

.section-header h2 {
  text-transform: uppercase;
  font: 600 46px/52px "Poppins", sans-serif;
  padding-top: 5px;
  margin: 0 0 25px;
}

@media (max-width: 767px) {
  .section-header h2 {
    font-size: 30px;
    margin-bottom: 15px;
  }
}

.section-header p {
  // margin: 0 auto 20px;
  font: 300 20px/32px "Poppins", sans-serif;
}

@media (max-width: 767px) {
  .section-header p {
    max-width: 90%;
    font-size: 16px;
    line-height: 24px;
  }
}

.section-header.v3 {
  text-align: left;
  margin: -50px 0 44px;
}

.section-header.v3:after {
  margin-left: 0;
}

@media (max-width: 767px) {
  .section-header.v3 p {
    margin-left: 0;
  }
}

.mfp-iframe-scaler .mfp-close {
  color: #000;
}

.navbar {
  min-height: 55px;
  background: 0 0;
  padding: 20px 0 24px;
  margin: 0;
  border: none;
  box-shadow: none;
  transition: all 300ms linear 0s;
}

.navbar .navbar-header {
  margin: 0;
  transition: all 300ms linear 0s;
}

.navbar .navbar-header .btn-warning {
  margin-top: 6.5px;
}

@media (max-width: 499px) {
  .navbar .navbar-header .btn-warning {
    float: none !important;
    margin-top: 65px;
  }
}

.navbar .navbar-header .navbar-toggle {
  width: 42px;
  height: 42px;
  margin: 0;
  border-radius: 0;
}

.navbar .navbar-header .navbar-toggle span {
  margin-left: auto;
  margin-right: auto;
}

.navbar .navbar-header .navbar-brand {
  margin-left: 0;
  padding: 0;
  height: 55px;
  width: 203px;
  transition: all 300ms linear 0s;
}

@media (max-width: 991px) {
  .navbar .navbar-header .navbar-brand {
    width: 150px;
    height: 40px;
  }
}

.navbar .navbar-header .navbar-brand img {
  max-width: 100%;
  transition: all 300ms linear 0s;
}

.navbar.is-scrolling {
  padding: 20px 0;
}

.navbar.is-scrolling .navbar-header .navbar-brand {
  width: 150px;
  height: 40px;
}

.navbar.is-scrolling #main-navbar {
  padding-top: 0;
}

#main-navbar {
  padding-top: 8px;
  transition: all 300ms linear 0s;
}

#main-navbar .nav {
  padding-right: 8px;
  margin-right: 0;
}

#main-navbar .nav li a {
  padding: 0 17px;
  text-transform: uppercase;
  font: 500 16px/40px "Poppins", sans-serif;
}

.top-banner {
  margin: 0 !important;
  width: 100%;
  padding-top: 190px;
}

@media (max-width: 767px) {
  .top-banner {
    padding-top: 130px;
  }
}

.top-banner h2 {
  margin: 0 0 20px;
  font: 600 79px/1 "Poppins", sans-serif;
  letter-spacing: -3px;
}

@media (max-width: 1199px) {
  .top-banner h2 {
    font-size: 68px;
  }
}

@media (max-width: 991px) {
  .top-banner h2 {
    font-size: 54px;
  }
}

@media (max-width: 991px) {
  .top-banner h2 {
    font-size: 35px;
  }
}

.top-banner p {
  max-width: 780px;
  margin: 0 auto 40px;
  font: 300 27px/41px "Poppins", sans-serif;
  letter-spacing: -0.2px;
}

@media (max-width: 1199px) {
  .top-banner p {
    font-size: 24px;
    line-height: 36px;
  }
}

@media (max-width: 991px) {
  .top-banner p {
    font-size: 18px;
    line-height: 26px;
  }
}

@media (max-width: 767px) {
  .top-banner p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 25px;
  }
}

.top-banner .btn-primary img {
  margin: 0 15px;
}

@media (max-width: 991px) {
  .top-banner .btn-primary img {
    margin: 0 5px;
  }
}

.top-banner .main-product {
  margin: 0 auto 61px;
}

@media (max-width: 991px) {
  .top-banner .main-product {
    margin-bottom: 30px;
  }
}

.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:hover,
.navbar-default .navbar-nav > .active > a:focus {
  background-color: transparent;
}

.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
  border-top: none;
}

@media (max-width: 991px) {
  .navbar-default .navbar-collapse {
    background: #fff;
    margin: 20px 0;
    border-radius: 5px;
  }
  .alt-bg .navbar-default .navbar-collapse {
    background: rgba(0, 0, 0, 0.84);
  }
  .alt-bg .navbar-default.is-scrolling .navbar-collapse {
    background: #fff;
  }
  .alt-bg .navbar-default .navbar-nav .open .dropdown-menu > li > a {
    color: #a7a7a7;
  }
  .alt-bg .dropdown-menu .divider {
    background-color: #313131;
  }
  .alt-bg .is-scrolling .dropdown-menu .divider {
    background-color: #e5e5e5;
  }
}


.split-header p {
  font-size: 24px;
  max-width: 660px;
  margin-left: 0;
  line-height: 37px;
}

@media (max-width: 992px) {
  .split-header p {
    max-width: 100%;
  }
}

@media (max-width: 767px) {
  .split-header p {
    font-size: 20px;
    line-height: 28px;
  }
}

.top-banner .text-reverse h2 {
  color: #fff;
}

.top-banner .text-reverse p {
  color: rgba(255, 255, 255, 0.7);
}

.alt-bg .top-banner {
  background: rgba(0, 0, 0, 0.67);
  min-height: 800px;
}

.alt-bg .dark-logo {
  display: none;
}

.alt-bg .is-scrolling .dark-logo {
  display: block;
}

.alt-bg .is-scrolling .white-logo {
  display: none;
}

.top-banner .split-header {
  margin-top: 70px;
}

.top-banner .split-header h2 {
  color: #fff;
}

.top-banner .split-header p {
  color: #fff;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 992px) {
  .top-banner .split-header {
    margin-top: 0;
    margin-bottom: 100px;
    text-align: center;
  }
}

.dropdown-menu {
  border: 1px solid #f1f1f1;
  box-shadow: 0 2px 42px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  padding: 15px 0;
}

#main-navbar .dropdown-menu li a {
  padding: 0 25px;
}

.play-video-block {
  margin: 80px 0 0;
  position: relative;
}

.play-video-block .video-thumb {
  border-radius: 5px;
}

.play-video-block .play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  z-index: 2;
  transition: all 0.3s ease-in-out;
}

.play-video-block a {
  display: block;
  position: relative;
  z-index: 3;
}

.play-video-block a:hover .play-btn {
  -webkit-transform: scale(1.2, 1.2);
  -ms-transform: scale(1.2, 1.2);
  transform: scale(1.2, 1.2);
}

.play-video-block a:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.mfp-iframe-scaler iframe {
  box-shadow: none;
}

@media (min-width: 992px) {
  .navbar .navbar-nav > li.dropdown > ul {
    display: block;
    opacity: 0;
    visibility: hidden;
    transition: all 0.1s ease;
  }
  .navbar .navbar-nav > li.dropdown:hover > ul {
    display: block;
    opacity: 1;
    visibility: visible;
  }
}

.mb_YTPlayer:focus {
  outline: 0;
}

.mbYTP_wrapper {
  display: block;
  -webkit-transform: translateZ(0) translate3d(0, 0, 0);
  transform: translateZ(0) translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000;
  perspective: 1000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-sizing: border-box;
}

.mb_YTPlayer .loading {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.51);
  text-align: center;
  padding: 2px 4px;
  border-radius: 5px;
  font-family: droid sans, sans-serif;
  -webkit-animation: fade 0.1s infinite alternate;
  animation: fade 0.1s infinite alternate;
}

@-webkit-keyframes fade {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.YTPFullscreen {
  display: block !important;
  position: fixed !important;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  border: none !important;
  opacity: 1 !important;
}

.mbYTP_wrapper iframe {
  max-width: 4000px !important;
}

.inline_YTPlayer {
  margin-bottom: 20px;
  vertical-align: top;
  position: relative;
  left: 0;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.5);
}

.inline_YTPlayer img {
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
  -webkit-transform: none !important;
  -ms-transform: none !important;
  transform: none !important;
}
.mb_YTPBar .simpleSlider {
  position: relative;
  width: 100px;
  height: 10px;
  border: 1px solid #fff;
  overflow: hidden;
  box-sizing: border-box;
  margin-right: 10px;
  cursor: pointer !important;
  border-radius: 3px;
}

.mb_YTPBar.compact .simpleSlider {
  width: 40px;
}

.mb_YTPBar .simpleSlider.muted {
  opacity: 0.3;
}

.mb_YTPBar .level {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-sizing: border-box;
}

.mb_YTPBar .level.horizontal {
  height: 100%;
  width: 0;
}

.mb_YTPBar .level.vertical {
  height: auto;
  width: 100%;
}

.the-product {
  background-image: radial-gradient(#3db1de, #9fe4ff);
  padding: 110px 0;
}
.buynow-btn {
  width: 170px !important;
  padding: 20px 30px !important;
  background-image: radial-gradient(#156c8f, #16607e);
  border: 1px solid #156c8f;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

@media (max-width: 767px) {
  .the-product {
    text-align: center;
    overflow: hidden;
  }
}

@media (max-width: 767px) {
  .the-product img {
    max-width: 200px;
  }
}
.the-title-brand {
  font-weight: unset !important;
  font-size: 40px;
  // border: 0.5px solid #006e43;
  // border-radius: 20px;
}
@media (max-width: 768px) {
  .the-title-brand {
    text-align: left !important;
    font-size: 25px !important;
  }
}
#bannerBrandLdp .VueCarousel-wrapper {
  margin-left: -13px !important;
}
</style>
