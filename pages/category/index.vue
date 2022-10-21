<template>
  <div class="" id="main-content">
    <div v-if="PromotionProgram && PromotionProgram.length > 0">
      <!-- Just an image -->
      <div class="container w-100 mt-2">
        <nuxt-link to="/promotion" class="float-right color-nuti">Xem thêm</nuxt-link>
        <b><h6>Tin khuyến mãi</h6></b>
      </div>
      <div class="hashtag-isScroll">
          <div
            v-for="item in PromotionProgram"
            :key="item.id"
            class="pr-1 pl-1 post-sale-in-category"
          >
            <div class="item-card-post-sale">
              <nuxt-link
                style="padding-left: 0 !important;"
                class="thumb-img mt-0"
                :to="{ path: `/blog/post/${item.slug}` }"
                :alt="item.title"
              >
                <img
                  class="border-block-shadow"
                  style="width:100%;"
                  :src="item.thumbnail_url"
                  :alt="item.title"
                />
              </nuxt-link>
              <nuxt-link
                class="the-title-post-sale"
                :alt="item.title"
                :to="{ path: `/blog/post/${item.slug}` }"
              >
                {{ item.title | truncate(60) }}
              </nuxt-link>
            </div>
          </div>
        </div>
      <!-- <b-navbar variant="faded" type="light" style="background: #fff">
        <carousel
          :perPageCustom="[
            [320, 2],
            [768, 2],
            [1024, 3],
          ]"
          :paginationEnabled="false"
          :loop="true"
        >
          <slide v-for="item in PromotionProgram" :key="item.id">
            <nuxt-link
              class="thumb-img"
              :to="
                item.type == 'PRODUCT'
                  ? `/product?product-promotion=${item.code}`
                  : `/promotion/${item.id}`
              "
              :alt="item.name"
            >
              <img
                class="border-block-shadow"
                style="width:100%;"
                :src="item.thumbnail"
                :alt="item.name"
              />
            </nuxt-link>
            <nuxt-link
              class="the-title-post-sale"
              :alt="item.name"
              :to="
                item.type == 'PRODUCT'
                  ? `/product?product-promotion=${item.code}`
                  : `/promotion/${item.id}`
              "
            >
              {{ item.name | truncate(60) }}
            </nuxt-link>
          </slide>
        </carousel>
        <div class="hashtag-isScroll">
          <div
            v-for="item in PromotionProgram"
            :key="item.id"
            class="pr-3 post-sale-in-category"
          >
            <div class="item-card-post-sale">
              <nuxt-link
                style="padding-left: 0 !important;"
                class="thumb-img mt-0"
                :to="
                  item.type == 'PRODUCT'
                    ? `/product?product-promotion=${item.code}`
                    : `/promotion/${item.id}`
                "
                :alt="item.name"
              >
                <img
                  class="border-block-shadow"
                  style="width:100%;"
                  :src="item.thumbnail"
                  :alt="item.name"
                />
              </nuxt-link>
              <nuxt-link
                class="the-title-post-sale"
                :alt="item.name"
                :to="
                  item.type == 'PRODUCT'
                    ? `/product?product-promotion=${item.code}`
                    : `/promotion/${item.id}`
                "
              >
                {{ item.name | truncate(60) }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </b-navbar> -->
    </div>
    <hr>
    <span class="line-8 d-block p-2"></span>
    <div class="container mb"></div>
    <span class="line-8 d-block"></span>
    <div class="container">
      <div class="hot-deal row mb-5">
        <div
          class="category-list col-sm-4 col-lg-3 col-4 text-center mb"
          v-for="item in allMenu"
          :key="item.id"
        >
          <div class="product-img mb-2">
            <!-- <a
              @loading="loading()"
              @click="click(item)"
              class="border-0 p-0"
            >
              <img
                class="list img-category"
                :src="item.item.cate_img"
                :alt="item.item.title"
              />
            </a> -->

            <nuxt-link
              :to="
                item.children && item.children.length > 0
                  ? `/category/catchildren?id=${item.id}&cat=${item.item.cate}&slug=${item.item.slug}`
                  : `/product?cat=${item.item.cate}`
              "
              class="border-0 p-0"
            >
              <img
                class="list img-category"
                :src="item.item.cate_img"
                :alt="item.item.title"
              />
            </nuxt-link>
          </div>
          <h5 class="item-title font-11 mb-0">
            <nuxt-link
              :to="
                item.children && item.children.length > 0
                  ? `/category/catchildren?id=${item.id}&cat=${item.item.cate}&slug=${item.item.slug}`
                  : `/product?cat=${item.item.cate}`
              "
            >
              {{ item.item.title }}
            </nuxt-link>
          </h5>
        </div>
      </div>
    </div>
    <div class="line-1 d-block"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      categoriesAll: [],
      PromotionProgram: [],
      allMenu:[],
    };
  },
  created() {
    this.getPostPromotion();

    this.$store
      .dispatch("category/getMegaMenu")
      .then((resp) => {
        this.allMenu =
          resp && resp["data"] && resp["data"]["data"]
            ? JSON.parse(resp.data.data)
            : [];
      })
      .catch((err) => {
        console.log("err:", err);
      });

  },
  mounted() {},
  methods: {
    getChildrenCat() {
      this.$axios
        .get(`v1/client/categories/hierarchy`)
        .then((resp) => {
          let isActiveCategory = resp.data;
          isActiveCategory.forEach((item) => {
            if (item && item.category_publish == 1) {
              this.categoriesAll.push(item);
            }
          });
              // console.log("categoriesAll :", this.categoriesAll);
          this.$$store.commit("");
        })
        .catch((err) => {
          // console.log("err:", err);
        });
    },
    getPostPromotion(){
      this.$axios
        .get(
          `/v1/client/post/list?title&category_id=28&limit=9999&sort[created_at]=desc&page=`
        )
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          let ArrPromotion = res.data;
          ArrPromotion.filter((item) => {
            item.created_at = item.created_at.replace(/\-/g, "/");
            if (item && item.is_show == 1) {
              this.PromotionProgram.push(item);
            }
          });
        })
        .catch((e) => {
          //console.log("request failed", e);
          this.$store.dispatch("app/showLoadingOverlay", false);
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
            if (item && item.status == 1 && item.thumbnail) {
              this.PromotionProgram.push(item);
            }
          });
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
  },
  watch: {
    $route: function(q) {
      this.getChildrenCat();
    },
  },
};
</script>
