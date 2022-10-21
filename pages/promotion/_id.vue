<template>
  <div class="container">
    <div class="isn-mobile">
      <breadcrumbs
        :title="this.$route.matched[0].instances.default.$metaInfo.title"
        v-if="!isMobile"
      ></breadcrumbs>
    </div>
    <div class="row mb-5">
      <div class="col-md-7 col-lg-8">
        <section class="section pl-md-4">
          <div v-html="PromotionProgram.description"></div>
        </section>
        <div class="container d-flex">
          <social-sharing
            :image="currentPostSale.thumbnail"
            :url="href"
            :title="currentPostSale.name"
            :description="
              `${currentPostSale.start_date} - ${currentPostSale.end_date}`
            "
            hashtags
            inline-template
          >
            <div class="share-buttons">
              <network class="share-facebook" network="facebook">
                <i class="fa fa-facebook"></i>
              </network>
              <network network="skype">
                <i class="fa fa-skype"></i>
              </network>
              <network network="twitter">
                <i class="fa fa-twitter"></i>
              </network>
              <network network="linkedin">
                <i class="fa fa-linkedin"></i>
              </network>
            </div>
          </social-sharing>
          <div
            class="share-buttons"
            style="margin-left: 5px"
            @click="copyLinkToClipboard"
          >
            <span><i class="fa fa-link"></i></span>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-4 col-12">
        <div class="container info_box">
          <nuxt-link to="/promotion" class="float-right mt-2 color-nuti"
            >Xem thêm</nuxt-link
          >
          <h3 class="the-title">Tin tức khuyến mãi</h3>
          <section class="mt-0">
            <div
              class="item-new-similar"
              v-for="post_item in posts"
              :key="post_item.id"
            >
              <div class="sp_tuongtu tt_lienquan">
                <nuxt-link
                  :to="
                    post_item.type == 'PRODUCT'
                      ? `/product?product-promotion=${post_item.code}`
                      : `/promotion/${post_item.id}`
                  "
                  style="width: 100%"
                  class=" thumb-2x1"
                >
                  <img
                    class="border-block-shadow"
                    width="100%"
                    :src="post_item.thumbnail"
                    :alt="post_item.name"
                  />
                </nuxt-link>
                <div
                  class="caption mt-1 pl-1 pr-1"
                  style="float: left; width: 100%"
                >
                  <nuxt-link
                    style="color: #000"
                    :to="
                      post_item.type == 'PRODUCT'
                        ? `/product?product-promotion=${post_item.code}`
                        : `/promotion/${post_item.id}`
                    "
                    :title="post_item.title"
                  >
                    {{ post_item.name }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

     <section class="section container">
            <nuxt-link
              :to="{ path: `/product` }"
              class="float-right text-primary pt-1"
              data-aos="fade-up"
              ><small>Xem thêm</small></nuxt-link
            >
            <h3
              class="the-title section-title mb-2 font-bold"
              data-aos="fade-up"
            >
              Sản phẩm dành cho chương trình
            </h3>
            <client-only style="padding: 0px 25px !important;">
              <div class="hot-deal">
                <carousel
                  :perPageCustom="[
                    [320, 2],
                    [768, 3],
                    [767, 3],
                    [1024, 4],
                    [1200, 5],
                  ]"
                  :loop="true"
                  :paginationEnabled="false"
                  :navigationEnabled="true"
                  :scrollPerPage="false"
                >
                  <slide
                    class="product-slide "
                    v-for="(item, i) in productAll1"
                    :key="i"
                  >
                    <Product
                      :item="item"
                      data-aos="fade-up"
                      class="product-item"
                    ></Product>
                  </slide>
                </carousel>
              </div>
            </client-only>
          </section>
  </div>
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
export default {
  components: {
    skeleton: Skeleton,
    Product,
    Sorter,
    breadcrumbs: Breadcrumbs,
    pagination: PaginationVue,
  },
  data() {
    return {
      PromotionProgram: [],
      isMobile: false,
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      ratedGallery: [],
      product: null,
      posts: [],
      products: [],
      productAll1: [],
      currentPostSale: {},
      href: null,
    };
  },
  computed: {},
  created() {
    if (!process.server) {
      this.href = window.location.href;
    }
    this.getPost(1);
    this.getPromotionProgram();
    // this.getProduct();
    // this.getProductPromotion();
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  head() {
    return {
      title: this.PromotionProgram.name
        ? this.PromotionProgram.name
        : "Chương trình khuyến mãi",
      // meta: [
      //   {
      //     hid: "description",
      //     name: "description",
      //     content: this.currentProductCategory.description,
      //   },
      //   {
      //     hid: "og:description",
      //     property: "og:description",
      //     content: this.currentProductCategory.description,
      //   },
      //   {
      //     hid: "og:title",
      //     property: "og:title",
      //     content: this.currentProductCategory.name,
      //   },
      //   {
      //     hid: "og:image",
      //     name: "og:image",
      //     property: "og:image",
      //     content: this.currentProductCategory.original_image,
      //   },
      //   {
      //     hid: "og:url",
      //     property: "og:url",
      //     content: process.env.baseUrl + this.$nuxt.$route.fullPath,
      //   },
      // ],
    };
  },
  methods: {
    copyLinkToClipboard() {
      let pathNow = this.$router.currentRoute.fullPath;
      let fullCurrentUrl = `${process.env.BASE_URL}${pathNow}`;
      var el = document.createElement("textarea");
      el.value = fullCurrentUrl;
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      this.$toast.success("Sao chép đường dẫn thành công!").goAway(1500);
      // fullCurrentUrl.select();
      // fullCurrentUrl.setSelectionRange(0, 99999);
      // document.execCommand("copy");
    },
    getPost(page) {
      // this.$axios
      //   .get(
      //     `/v1/client/post/list?category_code=${category_code}&limit=20&sort[created_at]=desc`
      //   )
      //   .then((res) => {
      //     this.posts = res.data;
      //     this.pagination = res["data"]["meta"]["pagination"];
      //   })
      //   .catch((e) => {
      //     //console.log("request failed", e);
      //   });
      this.$store
        .dispatch("products/getPromotions", {
          params: `?limit=10&sort[created_at]=desc`,
        })
        .then((resp) => {
          let ArrPromotion = resp.data.data;
          let ArrPromotionOther = ArrPromotion.filter((item) => {
            if (item) {
              let currentId = this.$router.currentRoute.params.id;
              if (item.id == currentId) {
                this.currentPostSale = item;
              }
              return item.id != currentId;
            }
          });
          ArrPromotionOther.filter((item) => {
            if (item) {
              item.start_date = item.start_date.replace(/\-/g, "/");
              item.end_date = item.end_date.replace(/\-/g, "/");
              if (item && item.status == 1) {
                this.posts.push(item);
              }
            }
          });
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    getPromotionProgram(page = 1) {
      const _id = this.$route.params["id"] ? this.$route.params["id"] : "";
      this.$axios
        .get(`/v1/client/promotion-program/${_id}`)
        .then((resp) => {
          this.PromotionProgram = resp.data;
          var cat = [];
          this.PromotionProgram.actions.act_categories.forEach((item) => {
            cat.push(item.category_id);
          });
          this.getProduct(1, cat);
          // this.getProductPromotion(this.PromotionProgram.code);
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },

    getProduct(page = 1, _cat) {
      const cat = _cat;
      // commit to store
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=24&category_ids=${cat}&status=1`,
        })
        .then((resp) => {
          // console.log("products :", resp.data.meta.pagination);
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.productAll1 = resp.data.data;
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

    getProductPromotion(_code) {
      console.log("code", _code);
      this.$store
        .dispatch("app/fetchData", `/v1/client/product-promotion/${_code}`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.products = resp.data;
          console.log("this.products", this.products);
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
      return;
    },
  },
};
</script>
<style>
  .product-item {
    height: 380px;
}
</style>