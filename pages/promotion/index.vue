<template>
  <div class="container mb-6 mt-3">
    <div class="isn-mobile">
      <breadcrumbs
        :title="this.$route.matched[0].instances.default.$metaInfo.title"
        v-if="!isMobile"
      ></breadcrumbs>
    </div>
    <div class="list_menu">
      <div class="top-page-product-bar clearfix">
        <div class="col-md-12 col-sm-12 col-12">
          <h1 class="float-left fs-25">
            Chương trình khuyến mãi
          </h1>
        </div>
      </div>
      <div id="cate_list" class="row">
        <input type="hidden" id="link_cate" name="link_cate" value="" />
        <div
          class="col-lg-6 col-md-6 mb-3"
          v-for="item in PromotionProgram"
          :key="item.id"
        >
          <nuxt-link
            class="mb-3 thumb-img"
            :to="
              item.type == 'PRODUCT'
                ? `/product?product-promotion=${item.code}`
                : `/promotion/${item.id}`
            "
            :alt="item.name"
          >
            <img
              v-if="item.thumbnail"
              class="border-block-shadow"
              style="width:100%;"
              :src="item.thumbnail"
              :alt="item.name"
            />
          </nuxt-link>
          <span> </span>
          <span class="span_date"
            >{{ item.start_date }} - {{ item.end_date }} &nbsp;&nbsp;
            <i class="iconknh-eyecyan"></i>{{ item.view }}&nbsp;lượt xem</span
          >
          <!-- Comment facebook -->
          <div
            class="comment_promotion-hot"
            style="display:block; float:right; margin-top: 3px;"
            v-if="!isMobile"
          >
            <span style="  margin-bottom: 5px;height: 30px;  overflow: hidden;">
              <!-- <iframe
                src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FNutifood-Shop-111138414539018%2F&width=150&layout=button_count&action=like&size=small&share=true&height=46&appId"
                width="150"
                height="20"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe> -->
              <iframe
                v-if="item && item.type == 'CART'"
                :src="
                  `https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnutifoodshop.com%2Fpromotion%2F${item.id}&width=120&layout=button&action=like&size=small&share=true&height=65&appId`
                "
                width="150"
                height="20"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
              <iframe
                v-if="item && item.type == 'PRODUCT'"
                :src="
                  `https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnutifoodshop.com%2Fproduct%3Fproduct-promotion%3D${item.code}&width=120&layout=button&action=like&size=small&share=true&height=65&appId`
                "
                width="150"
                height="20"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
              <div style="clear:both;"></div>
            </span>
          </div>
          <!-- End comments facebook -->
          <h2
            style=" font-size: 16px;font-weight: 600;line-height: 18px;margin: 5px 0 0 0 !important;"
          >
            <nuxt-link
              class="the-title"
              :alt="item.name"
              :to="
                item.type == 'PRODUCT'
                  ? `/product?product-promotion=${item.code}`
                  : `/promotion/${item.id}`
              "
            >
              <h5 class="mb-0 mt-2">
                <span class="bold">{{ item.name }}</span>
              </h5>
            </nuxt-link>
          </h2>
          <div
            class="comment_promotion-hot"
            style="display:block;"
            v-if="isMobile"
          >
            <span style="  margin-bottom: 5px;height: 30px;  overflow: hidden;">
              <!-- <iframe
                src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FNutifood-Shop-111138414539018%2F&width=150&layout=button_count&action=like&size=small&share=true&height=46&appId"
                width="150"
                height="20"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe> -->
              <iframe
                v-if="item && item.type == 'CART'"
                :src="
                  `https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnutifoodshop.com%2Fpromotion%2F${item.id}&width=120&layout=button&action=like&size=small&share=true&height=65&appId`
                "
                width="150"
                height="20"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
              <iframe
                v-if="item && item.type == 'PRODUCT'"
                :src="
                  `https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnutifoodshop.com%2Fproduct%3Fproduct-promotion%3D${item.code}&width=120&layout=button&action=like&size=small&share=true&height=65&appId`
                "
                width="150"
                height="20"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
              <div style="clear:both;"></div>
            </span>
          </div>
        </div>
      </div>
      <div style="clear:both;"></div>
      <div class="khoangcach"></div>
    </div>
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
      posts: null,
    };
  },

  computed: {},
  created() {
    this.getPost(1);
    this.getPromotionProgram();
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
    getPost(page) {
      const category_code = "PROMOTIONNEW";
      this.$axios
        .get(
          `/v1/client/post/list?category_code=${category_code}&limit=20&sort[created_at]=desc`
        )
        .then((res) => {
          this.posts = res.data;
          this.pagination = res["data"]["meta"]["pagination"];
        })
        .catch((e) => {
          //console.log("request failed", e);
        });
    },
    getPromotionProgram(page = 1) {
      this.$store
        .dispatch("products/getPromotions", {
          params: `?limit=20&sort[created_at]=desc`,
        })
        .then((resp) => {
          let ArrPromotion = resp.data.data;
          ArrPromotion.filter((item) => {
            item.start_date = item.start_date.replace(/\-/g, "/");
            item.end_date = item.end_date.replace(/\-/g, "/");
            if (item && item.status == 1) {
              this.PromotionProgram.push(item);
            }
          });
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
  },
};
</script>
