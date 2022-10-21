<template>
  <header id="header">
    <div class="top-bar pt-0 pb-0">
      <div
        class="container text-left"
        style="padding-top:5px;height: 30px; padding-left: 10px !important; padding-right: 10px !important;"
      >
        <!-- <a href="https://nutifoodsweden.com/vi/" target="_blank" class="mr-3">
          <img
            src="~/assets/images/NNRIS TRẮNG.png"
            height="25px"
            style="margin-top: -5px"
          />
        </a> -->
        <a
          v-if="logoHeader && logoHeader.type == 'LINK-CUSTOM' && !isMobile"
          :href="logoHeader.router"
          target="_blank"
          class="mr-3"
        >
          <img
            :src="logoHeader.image_url"
            alt=""
            height="25px"
            style="margin-top: -5px"
          />
        </a>
        <nuxt-link
          v-if="logoHeader && logoHeader.type == 'CATEGORY' && !isMobile"
          :to="{ path: `/product?cat=${logoHeader.category_id}` }"
          class="mr-3"
        >
          <img
            :src="logoHeader.image_url"
            alt=""
            height="25px"
            style="margin-top: -5px"
          />
        </nuxt-link>
        <span v-for="(item, i) in items1" :key="i">
          <a class="linestore mr-3" :href="`tel:${item.value}`">
            <img
              src="~/assets/images/icon/phone-white.svg"
              style=" width:18px; margin-top:-6px;"
            />
            <strong class="font-15">{{ item.value }}</strong>
            <span class="text-light">{{ item.name }}</span>
          </a>
        </span>
        <nuxt-link class="linestore mr-3" to="/location-distributors">
          <picture>
              <source type="image/webp" srcset="~/assets/images/icon/location-ttpp.webp" alt="Blog - Bài viết">
              <img class="img-fluid" src="~/assets/images/icon/location-ttpp.png" alt="Blog - Bài viết" style=" width:18px; margin-top:-6px;"/>
            </picture>
          <strong class="font-15">{{ locationDistributors }}</strong>
          <span class="text-light">TTPP</span>
        </nuxt-link>

        <!-- <a class="mr-3" href="VIP.html">
          <img
            src="~/assets/images/icon/gray-diamond.png"
            height="16"
            style="margin-top: -6px;"
          />
          Thẻ VIP
        </a> -->
        <!-- <a class="mr-3" href="tim-sieu-thi.html">
          <img
            src="~/assets/images/icon/ic-localtion-white.svg"
            style="margin-top: -8px; height:18px;"
          />
          463 Siêu thị
        </a> -->
        <nuxt-link class="mr-3" to="/blog" title="Blog - Bài viết" v-if="!isMobile">
          <picture>
              <source type="image/webp" srcset="~/assets/images/icon/icon-blog.webp" alt="Blog - Bài viết">
              <img class="img-fluid" src="~/assets/images/icon/icon-blog.png" alt="Blog - Bài viết" style=" width:15px; margin-top:-6px;"/>
            </picture>
          Blog - Bài viết
        </nuxt-link>
        <nuxt-link
          class="mr-3"
          to="/user-rated-gallery"
          title="Thư viện đánh giá"
          v-if="!isMobile"
        >
            <picture>
              <source type="image/webp" srcset="~/assets/images/icon/star.webp" alt="Thư viện đánh giá">
              <img class="img-fluid" src="~/assets/images/icon/star.png" alt="Thư viện đánh giá" style=" width:15px; margin-top:-6px;"/>
            </picture>
          Thư viện đánh giá
        </nuxt-link>

        <nuxt-link
          class="mr-3"
          to="/promotion"
          title="Khuyến mãi hot"
          v-if="!isMobile"
        >
          <picture>
            <source type="image/webp" srcset="~/assets/images/icon/hot-sale.webp" alt="Khuyến mãi hot">
            <img class="img-fluid" src="~/assets/images/icon/hot-sale.png" alt="Khuyến mãi hot" style=" width:15px; margin-top:-6px;"/>
          </picture>
          Khuyến mãi hot
        </nuxt-link>

         <!-- <nuxt-link
          class="mr-3"
          to="/promotion"
          title="Khuyến mãi hot"
          v-if="!isMobile"
        >
          <img
            src="~/assets/images/nutifood/img/icon/hot-sale.png"
            style=" width:15px; margin-top:-6px;"
            alt="Khuyến mãi hot"
          />
          Đăng ký mặt bằng
        </nuxt-link>

         <nuxt-link
          class="mr-3"
          to="/register-agent"
          title="Khuyến mãi hot"
          v-if="!isMobile"
        >
          <img
            src="~/assets/images/nutifood/img/icon/hot-sale.png"
            style=" width:15px; margin-top:-6px;"
            alt="Khuyến mãi hot"
          />
          Đăng ký kinh doanh
        </nuxt-link> -->

        <span v-for="item in topship" :key="item.id">
          <img
            :src="item.image_url"
            width="208"
            class="pull-right"
            style="margin-top: -5px;float:right"
            v-if="!isMobile"
          />

        </span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { isMobile, isIndex } from "~/plugins/util";
export default {
  props: {
    logoHeader: Object,
  },
  data() {
    return {
      topship: null,
      footerSystem: [],
      items1: null,
      isMobile: false,
      locationDistributors: null,
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  middleware: "authenticated",
  created() {
    this.getBanners();
    if (!process.server) {
      this.getSettingSystem();
      this.isMobile = isMobile();
    }
    this.getLocationDistributors();
  },
  methods: {
    getBanners() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/TOP-SHIP")
        .then((resp) => {
          if (resp.data) {
            this.topship = resp.data.details;
          }
        })
        .catch((err) => {
          console.log("get banner error:", err);
        });
    },
    getSettingSystem() {
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/header`)
        .then((data) => {
          this.items1 = data.data.data;
        });
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/");
      });
    },
    getLocationDistributors(page = 1) {
      this.$store
        .dispatch("sitebuilder/getLocationDistributors", {
          params: `?limit=24&city_code=&district_code=&ward_code=&page=${page}`,
        })
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.locationDistributors = resp.meta.pagination.total;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// .welcome {
//   .user-link {
//     display: inline-block;
//     margin: 0 2px;
//   }
// }
// .header{
//   background: #20b352;
// }
// .bg-nav:hover {
//   .text-a{
//     color: #ffffff !important
//   }
//   background: #148138;
// }
</style>
