<template>
  <section class="section" v-bind:class="{ isActive: is_active == 0 }">
    <div v-for="(item, i) in dataBrands" :key="item.id">
      <div v-if="item.is_active > 0">
        <!-- ----- banner Brand ----- -->
        <div>
          <div
            class="row"
            v-if="item.banners.length <= 4 && !isMobile"
          >
            <div
              class=""
              v-for="item_banner in item.banners"
              :key="item_banner.id"
              v-bind:class="[
                item.banners.length == 2
                  ? 'col-6'
                  : item.banners.length == 3
                  ? 'col-4'
                  : item.banners.length == 4
                  ? 'col-3'
                  : 'col-12',
              ]"
            >
              <nuxt-link
                v-if="item_banner.type == 'CATEGORY'"
                :to="{ path: `/product?cat=${item_banner.category_id}` }"
              >
                <img
                  :src="item_banner.image_url + '/w1080'"
                  :alt="item_banner.category_name"
                  width="100%"
                  class="item-img"
                />
              </nuxt-link>
              <nuxt-link
                v-if="item_banner.type == 'LANDING-PAGE'"
                :to="{ path: `/landing-page/${item_banner.slug}` }"
              >
                <img
                  :src="item_banner.image_url + '/w1080'"
                  :alt="item_banner.category_name"
                  width="100%"
                  class="item-img"
                />
              </nuxt-link>
              <nuxt-link
                v-if="item_banner.type == 'NEWS'"
                :to="{ path: `/blog/post/${item_banner.post_slug}` }"
              >
                <img
                  :src="item_banner.image_url + '/w1080'"
                  :alt="item_banner.category_name"
                  width="100%"
                  class="item-img"
                />
              </nuxt-link>
              <a
                v-if="item_banner.type == 'LINK-CUSTOM'"
                :href="item_banner.router"
                target="_blank"
              >
                <img
                  :src="item_banner.image_url + '/w1080'"
                  :alt="item_banner.router"
                  width="100%"
                  class="item-img"
                />
              </a>
            </div>
          </div>

          <div
            class="row"
            v-if="item.banners.length == 1 && isMobile"
          >
            <div
              class=""
              v-for="item_banner in item.banners"
              :key="item_banner.id"
              v-bind:class="[
                item.banners.length == 2
                  ? 'col-6'
                  : item.banners.length == 3
                  ? 'col-4'
                  : item.banners.length == 4
                  ? 'col-3'
                  : 'col-12',
              ]"
            >
              <nuxt-link
                v-if="item_banner.type == 'CATEGORY'"
                :to="{ path: `/product?cat=${item_banner.category_id}` }"
              >
                <img
                  :src="item_banner.image_url + '/w720'"
                  :alt="item_banner.category_name"
                  width="100%"
                  class="item-img"
                />
              </nuxt-link>
              <nuxt-link
                v-if="item_banner.type == 'LANDING-PAGE'"
                :to="{ path: `/landing-page/${item.slug}` }"
              >
                <img
                  :src="item_banner.image_url + '/w720'"
                  :alt="item_banner.category_name"
                  width="100%"
                  class="item-img"
                />
              </nuxt-link>
              <a
                v-if="item_banner.type == 'LINK-CUSTOM'"
                :href="item_banner.router"
                target="_blank"
              >
                <img
                  :src="item_banner.image_url + '/w720'"
                  :alt="item_banner.router"
                  width="100%"
                  class="item-img"
                />
              </a>
            </div>
          </div>

          <div
            class="main-SkinnyItem-sl"
            v-if="
              item.banners.length >= 5 || (isMobile && item.banners.length != 1)
            "
          >
            <carousel
              id="carousel-no-animation"
              :perPageCustom="[
                [320, 1],
                [768, 1],
                [1024, 4],
              ]"
              :autoplay="false"
              :autoplayTimeout="2000"
              :loop="true"
              :paginationEnabled="false"
            >
              <slide
                v-for="item_banner in item.banners"
                :key="item_banner.id"
              >
                <div class="">
                  <a
                    v-if="item_banner.type == 'LINK-CUSTOM'"
                    :href="item_banner.router"
                    target="_blank"
                    class="SkinnyItem-a"
                  >
                    <img :src="item_banner.image_url + '/w1080'" alt="" class="slider-img" width="100%"/>
                  </a>
                  <nuxt-link
                    v-if="item_banner.type == 'CATEGORY'"
                    :to="{ path: `/product?cat=${item_banner.category_id}` }"
                    class="SkinnyItem-a"
                  >
                    <img :src="item_banner.image_url + '/w1080'" alt="" class="slider-img" width="100%"/>
                  </nuxt-link>
                  <nuxt-link
                    v-if="item_banner.type == 'LANDING-PAGE'"
                    :to="{ path: `/landing-page/${item.slug}` }"
                  >
                    <img
                      :src="item_banner.image_url + '/w1080'"
                      :alt="item_banner.category_name"
                      width="100%"
                      class="slider-img"
                    />
                  </nuxt-link>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
        <!-- -----End banner Brand ----- -->
        <a 
          @click="readMoreBrand(item)"
          class="float-right text-primary pr-3 see_more"
          style="margin-top: 12px !important"
          v-if="item.products && item.products.length > 0 && item.name"
         ><span>Xem thêm</span></a>
        <h3 class="the-title mb-2 section-title font-bold">
         <span> {{ item.name }} </span>
        </h3>
        <br v-if="!item.name">
        <!-- ----- Product Slide ----- -->
        <client-only v-if="item.is_show == 'slide'">
          <div class="hot-deal">
            <carousel
              :perPageCustom="[
                [320, 2],
                [768, 3],
                [767, 3],
                [1024, 4],
                [1200, 5],
              ]"
              :autoplay="false"
              :loop="true"
              :autoplayHoverPause="true"
              :autoplayTimeout="5000"
              :paginationEnabled="false"
              :navigationEnabled="true"
            >
              <slide
                class="product-slide"
                v-for="(item, j) in item.products"
                :key="j"
              >
                <Product class="product-item" :item="item"></Product>
              </slide>
            </carousel>
          </div>
        </client-only>
        <!-- ----- End Product Slide ----- -->

        <!-- ----- Product List ----- -->

        <div class="" id="top-product-list" v-if="item.is_show == 'list'">
          <div
            class="hot-deal row ml-1 mr-1"
            v-if="item.products && !isMobile"
            style="transform: translateX(7px);"
          >
            <div
              class="col-sm-4 col-lg-3 col-6 pl-pr-0"
              v-for="(item, i) in item['products'].slice(0, number)"
              :key="i"
              style="margin-bottom: 10px"
            >
              <Product class="product-item" :item="item"></Product>
            </div>
          </div>

          <div class="hot-deal row ml-1 mr-1" v-if="item.products && isMobile">
            <div
              class="col-sm-4 col-lg-3 col-6"
              v-for="(itm, i) in item['products'].slice(0, numberMB)"
              :key="i"
              style="margin-bottom: 10px"
            >
              <Product class="product-item" :item="itm"></Product>
            </div>
          </div>

          <!-- <div
            v-if="item.products && !item.products.length"
            class="alert alert-warning"
            role="alert"
          >
            Không tìm thấy sản phẩm nào.
          </div> -->

          <!-- / skeleton -->
          <div class="hot-deal row" v-if="!item.products">
            <div
              class="col-sm-4 col-lg-3 col-6"
              :key="n"
              v-for="n in 5"
            >
              <skeleton></skeleton>
            </div>
          </div>
          <div
            class="text-center mt-2 mb-2 "
            style="position: relative;"
            v-if="!isMobile && item.products.length > 5 || isMobile && item.products.length > 6"
          >
            <a 
              class="btn btnSee btn-rounded font-13 px-4 py-1 mb-3 load_more_page_index"
              v-on:click="seeMore(i)"
              v-if="item.products.length"
            >
              {{ btnSee ? "Xem thêm" : !btnSee ? "Thu gọn" : "" }}
              <span class="count_page_showindex">
                <!-- ({{ btnSee ? item.products.length - 5 : !btnSee ? item.products.length : item.products.length }}) -->
                ({{ btnSee && !isMobile ? item.products.length - 5 : btnSee && isMobile ? item.products.length - 6 : !btnSee ? item.products.length : item.products.length
                }})
              </span>
            </a>
          </div>
        </div>

        <!-- ----- End Product List ----- -->

        <!-- ----- Product full load ----- -->

        <div class="" id="top-product-list" v-if="item.is_show == 'full-load'">
          <div class="hot-deal row ml-1 mr-1" v-if="item.products">
            <div
              class="col-sm-4 col-lg-3 col-6"
              v-for="(itm, i) in item['products']"
              :key="i"
              style="margin-bottom: 10px"
            >
              <Product class="product-item" :item="itm"></Product>
            </div>
          </div>

          <!-- / skeleton -->
          <div class="hot-deal row" v-if="!item.products">
            <div
              class="col-sm-4 col-lg-3 col-6"
              :key="n"
              v-for="n in 5"
            >
              <skeleton></skeleton>
            </div>
          </div>
        </div>

        <!-- ----- End Product full load ----- -->
      </div>
    </div>
  </section>
</template>
<script>
import EventBus from "~/store/modules/EventBus";
import Skeleton from "~/components/Skeleton";
import Product from "~/components/Product";
import PaginationVue from "~/components/Pagination.vue";
import { isMobile, isIndex } from "~/plugins/util";
import { mapMutations, mapState } from "vuex";
import Search from "~/pages/search.vue";
export default {
  props: {
    BrandItem: String,
  },
  data() {
    return {
      btnSee: true,
      number: 5,
      numberMB: 6,
      pagenumber: 2,
      pagesize: 2,
      totalrowcount: 0,
      total_page: 0,
      nameSearch: null,
      is_active: null,
      dataBrands: [],
      brandBanner: [],
      isMobile: false,
      lenghts: true,
      isActive: true,
      productAll:[],
    };
  },
  components: {
    pagination: PaginationVue,
    Product,
    skeleton: Skeleton,
    Search,
  },
  computed: mapState({
    categories: (state) => state.category.categories,
    productsA: state => state.products.all
  }),
  created() {
    if(!process.server) {
      if(localStorage.getItem("productsAll")){
        this.productAll = JSON.parse(localStorage.getItem("productsAll"));
        this.getSettingSystem();
      }
      else{
        this.getProduct();
      }
    }
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },

  methods: {
    readMoreBrand(data){
      this.$router.push(`/product?code_brand=${data.code}`);
      sessionStorage.setItem("dataBrands", JSON.stringify(data.products));
    },
    getProduct() {
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=200&status=1&landing_page=show`,
        })
        .then((resp) => {
          this.productAll = resp && resp['data'] && resp['data']['data'];
          this.getSettingSystem();
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },

    seeMore(i) {
      if (this.number == 5 && this.numberMB == 6) {
        this.number = this.dataBrands[i].products.length;
        this.numberMB = this.dataBrands[i].products.length;
        this.btnSee = false;
      } else {
        this.number = 5;
        this.numberMB = 6;
        this.btnSee = true;
        $("html, body").animate(
          {
            scrollTop: $("#top-product-list").offset().top,
          },
          1000
        );
      }
    },
    getSettingSystem() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/CONFIG-BRAND?is_client=1`)
        .then((data) => {
          this.dataBrands = data.data.data
          this.dataBrands.filter((item_langding) => {
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
          if(data && data['data'] && data['data']) this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
  },
};
</script>
<style scoped>
.isActive {
  display: none;
}
.btnSee:hover {
  background: #136f43f0;
  color: #fff !important;
  font-weight: 400;
}
.btnSee {
  background: #e8fcf2f0;
  color: #136f43f0 !important;
  border: 2px solid #006e43;
  font-weight: 400;
}
</style>
