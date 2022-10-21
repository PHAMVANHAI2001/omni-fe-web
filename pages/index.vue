<template>
  <main role="main" class="homepage-wrap" id="main">
    <div class="main-top mb-2">
      <div class="container">
        <PopUpAds></PopUpAds>
        <BannerLeftRight v-if="!isMobile"></BannerLeftRight>
        <div class="main-top-grid row">
          <CategoryLeftMenu
            class="rep-mobile-x992"
            v-if="!isMobile"
          ></CategoryLeftMenu>
          <div class="main-banner col-lg-8" v-if="!isMobile">
            <div
              class="slider-indexhome"
              v-bind:style="{
                width: widthPx + 'px',
                height: heightPx + 'px',
              }"
            >
              <carousel
                id="carousel-no-animation"
                :perPageCustom="[
                  [320, 1],
                  [768, 1],
                  [1024, 1],
                ]"
                :autoplay="false"
                :autoplayTimeout="5000"
                :loop="true"
                :scrollPerPage="false"
                :navigationEnabled="true"
                :paginationEnabled="true"
                :paginationColor="MM006e43"
                :paginationActiveColor="MMffcd00"
              >
                <slide v-for="(item, i) in bannersSlider" :key="i">
                  <div class="scale-slide">
                    <a
                      v-if="item.type == 'LINK-CUSTOM'"
                      :href="item.router"
                      target="_blank"
                    >
                      <img
                        :src="item.image_url + '/w1080'"
                        alt=""
                        v-bind:style="{
                          width: widthPx + 'px',
                          height: heightPx + 'px',
                        }"
                      />
                    </a>
                    <nuxt-link
                      v-if="item.type == 'LANDING-PAGE'"
                      :to="{ path: `/landing-page/${item.slug}` }"
                    >
                      <img
                        :src="item.image_url + '/w1080'"
                        :alt="item.category_name"
                        v-bind:style="{
                          width: widthPx + 'px',
                          height: heightPx + 'px',
                        }"
                      />
                    </nuxt-link>
                    <nuxt-link
                      v-if="item.type == 'CATEGORY'"
                      :to="{ path: `/product?cat=${item.category_id}` }"
                    >
                      <img
                        :src="item.image_url + '/w1080'"
                        alt=""
                        v-bind:style="{
                          width: widthPx + 'px',
                          height: heightPx + 'px',
                        }"
                      />
                    </nuxt-link>
                    <nuxt-link
                      v-if="item.type == 'NEWS'"
                      :to="{ path: `/blog/post/${item.post_slug}` }"
                    >
                      <img
                        :src="item.image_url + '/w1080'"
                        alt=""
                        v-bind:style="{
                          width: widthPx + 'px',
                          height: heightPx + 'px',
                        }"
                      />
                    </nuxt-link>
                  </div>
                </slide>
              </carousel>
            </div>
          </div>

          <div
            class="right-news col-lg-3"
            v-if="bannerCheck && !isMobile"
            v-bind:style="{ height: heightPx + 'px' }"
          >
            <ul class="news-list list-unstyled">
              <li>
                <div class="card">
                  <div
                    class="banner-right mb-2"
                    v-for="item in banners"
                    :key="item.id"
                  >
                    <a
                      v-if="item.type == 'LINK-CUSTOM'"
                      :href="item.router"
                      target="_blank"
                    >
                      <img :src="item.image_url + '/w280'" alt="" />
                    </a>
                    <nuxt-link
                      v-if="item.type == 'LANDING-PAGE'"
                      :to="{ path: `/landing-page/${item.slug}` }"
                    >
                      <img
                        :src="item.image_url + '/w280'"
                        :alt="item.category_name"
                      />
                    </nuxt-link>
                    <nuxt-link
                      v-if="item.type == 'CATEGORY'"
                      :to="{ path: `/product?cat=${item.category_id}` }"
                    >
                      <img :src="item.image_url + '/w280'" alt="" />
                    </nuxt-link>
                    <nuxt-link
                      v-if="item.type == 'NEWS'"
                      :to="{ path: `/blog/post/${item.post_slug}` }"
                    >
                      <img :src="item.image_url + '/w280'" alt="" />
                    </nuxt-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style="width: 100%" v-if="isMobile">
        <carousel
          v-if="isMobile"
          id="carousel-no-animation"
          :perPageCustom="[
            [320, 1],
            [768, 1],
            [1024, 1],
          ]"
          :autoplay="false"
          :autoplayTimeout="5000"
          :loop="true"
          :navigationEnabled="true"
          :paginationEnabled="true"
          :paginationColor="MM006e43"
          :paginationActiveColor="MMffcd00"
        >
          <slide v-for="item in bannersSlider" :key="item.id">
            <div class="scale-slide">
              <a
                v-if="item.type == 'LINK-CUSTOM'"
                :href="item.router"
                target="_blank"
              >
                <img :src="item.image_url + '/w720'" alt="" width="100%" />
              </a>
              <nuxt-link
                v-if="item.type == 'LANDING-PAGE'"
                :to="{ path: `/landing-page/${item.slug}` }"
              >
                <img
                  :src="item.image_url + '/w720'"
                  :alt="item.category_name"
                  width="100%"
                />
              </nuxt-link>
              <nuxt-link
                v-if="item.type == 'CATEGORY'"
                :to="{ path: `/product?cat=${item.category_id}` }"
              >
                <img :src="item.image_url + '/w720'" alt="" width="100%" />
              </nuxt-link>
              <nuxt-link
                v-if="item.type == 'NEWS'"
                :to="{ path: `/blog/post/${item.post_slug}` }"
              >
                <img :src="item.image_url + '/w720'" alt="" width="100%" />
              </nuxt-link>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
    <SlidePartner class="mt-5"></SlidePartner>
    <!-- content -->

    <div id="main-content">
      <div class="mb-6">
        <!-- --- FlashSale --- -->
        <FlashSale></FlashSale>

        <!-- skinny banner long (SKINNY-BANNER-LONG)  -->
        <div class="container" v-if="skinnyLong.length > 0" data-aos="fade-up">
          <SkinnyBanner :SkinnyItem="skinnyLong"></SkinnyBanner>
        </div>

        <!-- skinny banner 1 đên 5 (SKINNY-BANNER-SHORT) -->

        <div class="container" v-if="skinnyShort.length > 0" data-aos="fade-up">
          <SkinnyBanner :SkinnyItem="skinnyShort"></SkinnyBanner>
        </div>

        <!-- sản phẩm mới nhất -->
        <ProductsNews></ProductsNews>
        <!-- sản phẩm bán chạy -->
        <ProductsTop></ProductsTop>

        <!-- skinny banner long2 (SKINNY-BANNER-LONG2)  -->
        <div class="container" v-if="skinnyLong2.length > 0" data-aos="fade-up">
          <SkinnyBanner :SkinnyItem="skinnyLong2"></SkinnyBanner>
        </div>

        <!-- (TOP-CATEGORY)  -->
        <div
          class="mt-2 container"
          v-if="categoryTop.length > 0"
          data-aos="fade-up"
        >
          <TopCategory :TopCategory="categoryTop"></TopCategory>
        </div>

        <WidgetBanner2 data-aos="fade-up"> </WidgetBanner2>

        <!-- -----  Product Brand  ------- -->
        <!-- cấu hình giao diện (Brand) -->
        <BrandSection class="container"></BrandSection>

        <WidgetBanner data-aos="fade-up"> </WidgetBanner>

        <!-- skinny banner long3 (SKINNY-BANNER-LONG3)  -->
        <div class="container" v-if="skinnyLong3.length > 0" data-aos="fade-up">
          <SkinnyBanner :SkinnyItem="skinnyLong3"></SkinnyBanner>
        </div>
      </div>

      <FloatingIconRight></FloatingIconRight>
    </div>
  </main>
</template>
<script>
// --- Category ---
import CategoryLeftMenu from "~/components/CategoryLeftMenu";
import Category from "~/components/Category";
// --- Product ---
import BrandSection from "~/components/ProductsComponent/BrandSection";
import ProductsBrand from "~/components/ProductsComponent/ProductsBrand";
import ProductForBaby from "~/components/ProductsComponent/ProductForBaby";
import ProductsTop from "~/components/ProductsComponent/ProductsTop";
import Product from "~/components/Product";
import ProductsNews from "~/components/ProductsComponent/ProductsNews";
import FlashSale from "~/components/ProductsComponent/FlashSale";
// --- Banner ---
import BannerLeftRight from "~/components/Banners/BannerLeftRight";
import SkinnyBanner from "~/components/Banners/SkinnyBanner";
import SlidePartner from "~/components/Banners/SlidePartner";
import WidgetBanner from "~/components/Banners/WidgetBanner";
import WidgetBanner2 from "~/components/Banners/WidgetBanner2";
import PopUpAds from "~/components/Banners/PopUpAds";
import FloatingIconRight from "~/components/Banners/FloatingIconRight";
import TopCategory from "~/components/Banners/TopCategory";
// --- Component ---
import { mapState, mapActions } from "vuex";
import Skeleton from "~/components/Skeleton";
import treeviewnav from "~/components/treeviewnav";
import Loading2 from "~/components/Loading2";
import NotifySection from "~/components/NotifySection";
import Header from "~/components/Header";
import CategoryHeaderSlide from "~/components/CategoryHeaderSlide";
import { isMobile, isIndex } from "~/plugins/util";
// --- Footer ---
import Footer from "~/components/Footer";

export default {
  data() {
    return {
      MM006e43: "#006e43",
      MMffcd00: "#ffcd00",
      skinnyShort: [],
      skinnyLong: [],
      skinnyLong2: [],
      skinnyLong3: [],
      categoryTop: [],
      widthPx: 920,
      heightPx: 532,
      banners: [],
      bannersSlider: [],
      bannerCheck: false,
      products: null,
      productAll: null,
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      searchkey: null,
      productSearch: null,
      slide: 0,
      sliding: null,
      boxTwo: "",
      popUpAds: [],
      popUpAdsUse: {},
      isMobile: false,
      isIndex: 0,
      dataProductsForPCIdx: [],
      dataProductsForMobileIdx: [],
    };
  },
  components: {
    // --- Compnent Banner ---
    SlidePartner,
    BannerLeftRight,
    FloatingIconRight,
    SkinnyBanner,
    WidgetBanner,
    WidgetBanner2,
    CategoryLeftMenu,
    PopUpAds,
    TopCategory,
    // --- Compnent Product ---
    Product,
    BrandSection,
    ProductsBrand,
    ProductForBaby,
    ProductsTop,
    ProductsNews,
    Category,
    FlashSale,
    skeleton: Skeleton,
    treeviewnav,
    Loading2,
    NotifySection,
    Footer,
    Header,
    CategoryHeaderSlide,
  },
  created() {
    if (!process.server) this.scroll();
    this.$store.dispatch("app/showLoadingOverlay");
    this.getSkinnyLong();
    this.getSkinnyLong2();
    this.getSkinnyLong3();
    this.getSkinnyShort();
    this.getSliderShow();
    this.getBanners();
  },
  computed: mapState({
    cart: (state) => state.cart.cart,
    categories: (state) => state.products.categories,
    user: (state) => state.user.user,
  }),
  head: {
    title: "Mua Sữa Online, Chính Hãng, Giá Tốt, Freeship tại Nutifood Shop",
    meta: [
      {
        hid: "og:url",
        name: "og:url",
        property: "og:url",
        content: process.env.baseUrl,
      },
      {
        hid: "og:title",
        name: "og:title",
        property: "og:title",
        content:
          "Mua Sữa Online, Chính Hãng, Giá Tốt, Freeship tại Nutifood Shop",
      },
      {
        hid: "og:description",
        name: "og:description",
        property: "og:description",
        content:
          "Sữa Nutifood Chính Hãng, Ưu Đãi Mỗi Ngày, Freeship, Thanh Toán An Toàn, Giao Hàng Tận Nơi, Mua Ngay! Xem Nhanh!",
      },
      {
        hid: "description",
        name: "description",
        property: "description",
        content:
          "Sữa Nutifood Chính Hãng, Ưu Đãi Mỗi Ngày, Freeship, Thanh Toán An Toàn, Giao Hàng Tận Nơi, Mua Ngay! Xem Nhanh!",
      },
      {
        hid: "og:image",
        name: "og:image",
        property: "og:image",
        content:
          process.env.baseUrl +
          require("~/assets/images/nutifood/logo-share-link.png"),
      },
      {
        hid: "og:image:secure_url",
        name: "og:image:secure_url",
        property: "og:image:secure_url",
        content:
          process.env.baseUrl +
          require("~/assets/images/nutifood/logo-share-link.png"),
      },
      {
        hid: "og:image:alt",
        name: "og:image:alt",
        property: "og:image:alt",
        content: process.env.baseUrl,
      },
      {
        hid: "og:image:width",
        name: "og:image:width",
        property: "og:image:width",
        content: "1200",
      },
      {
        hid: "og:image:height",
        name: "og:image:height",
        property: "og:image:height",
        content: "630",
      },
    ],
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        if (window.pageYOffset !== document.body.scrollTop) {
          if (document.querySelector("#categoryHeaderSlide")) {
            let elementCategory = document.querySelector(
              "#categoryHeaderSlide"
            );
            elementCategory.classList.add("boxShadow");
          }
        } else {
          if (document.querySelector("#categoryHeaderSlide")) {
            let elementCategory = document.querySelector(
              "#categoryHeaderSlide"
            );
            elementCategory.classList.remove("boxShadow");
          }
        }
      };
    },
    
    getCartItemId(item) {
      const cartItem = this.$store.state.cart.cart.details.find((itm) => {
        return item["id"] == itm["product_id"];
      });
      if (cartItem) {
        item["cartAddedQty"] = cartItem["quantity"];
        item["cart_item_id"] = cartItem["id"];
      }
      return cartItem;
    },
    // ******* Banner + Banner Branch + Banner slide *********

    getBanners() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/right-banner-home")
        .then((resp) => {
          if (resp.data) {
            this.banners = resp.data.details;
          }
          if (this.banners.length) {
            if (this.banners.length != 0) {
              this.bannerCheck = true;
              this.widthPx = 700;
              this.heightPx = 406;
            }
          } else {
            this.bannerCheck = false;
            this.widthPx = 920;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },

    getSkinnyLong() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/SKINNY-BANNER-LONG")
        .then((resp) => {
          if (resp.data) {
            this.skinnyLong = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    getSkinnyLong2() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/SKINNY-BANNER-LONG2")
        .then((resp) => {
          if (resp.data) {
            this.skinnyLong2 = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    getSkinnyLong3() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/SKINNY-BANNER-LONG3")
        .then((resp) => {
          if (resp.data) {
            this.skinnyLong3 = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },

    getSkinnyShort() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/SKINNY-BANNER-SHORT")
        .then((resp) => {
          if (resp.data) {
            this.skinnyShort = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },

    getSliderShow() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/slider-banner")
        .then((resp) => {
          if (resp.data) {
            this.bannersSlider = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },

    getRandomOnePopupBy() {
      console.log(this.ArrTempPopup, this.popupUseArr);
    },
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
};
</script>
<style lang="scss">
#sectionBannerHome {
  margin: 50px 0 30px 0;
  display: none;
}
.wrapper-new {
  max-width: 1375px;
  margin: 0 auto;
  padding: 0 40px;
}
.sectionTitleTab {
  margin: 0px 0 5px 0;
  text-align: left;
  border-bottom: 1px solid #f8f8f8;
  padding: 0 0px 5px 0;
}
.sectionTitleTab h2 {
  margin-bottom: 0;
  margin-top: 10px;
  a {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.9rem;
    color: #3a3938;
    background: #ffffff;
    display: block;
    padding: 10px 20px 8px 5px;
  }
}
.module.highlight {
  .module-title {
    background: #ed3941;
    color: #fff;
    font-size: 1.3rem;
    text-align: center;
    border-radius: 30px 30px 0 0;
  }
}
.top-banner-menu {
  margin-bottom: 20px;
  .navigation_cat {
    background-color: #fff;
    border-radius: 5px 0 0 5px;
  }
}
.top-new-banner {
  img {
    width: 100%;
  }
}
.top-slide-banner {
  margin-bottom: 5px;
  img {
    width: 100%;
    border-radius: 5px;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

.stick-right {
  padding: 5px !important;
}
.stick-right a img {
  margin-left: auto;
  width: 100%;
  height: 150px;
}
.boxShadow {
  box-shadow: 2px 2px 4px #000;
  z-index: 9999;
}
</style>
