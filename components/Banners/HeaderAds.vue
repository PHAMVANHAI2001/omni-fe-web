<template>
  <div class="header-ads" id="header-ads">
    <div class="" v-for="(item, i) in banners" :key="i">
          <nuxt-link
              v-if="item.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item.category_id}` }">
              <img :src="item.image_url" :alt="item.category_name" style=" width: 100%;" class="img-fluid" />
          </nuxt-link>
          <nuxt-link
              v-if="item.type == 'LANDING-PAGE'"
              :to="{ path: `/landing-page/${item.slug}` }">
              <img :src="item.image_url" :alt="item.category_name" style=" width: 100%;" class="img-fluid" />
          </nuxt-link>
          <a v-if="item.type == 'LINK-CUSTOM'" :href="item.router" target="_blank">
            <img :src="item.image_url" :alt="item.router" style=" width: 100%;" class="img-fluid" />
          </a>
          <a v-if="item.type == 'NEWS'" :href="item.router">
            <img :src="item.image_url" :alt="item.router" style=" width: 100%;" class="img-fluid" />
          </a>
          <nuxt-link
              v-if="item.type == 'PRODUCT_SEARCH'"
              :to="{ path: `/product?product-promotion=${item.product_search_query}` }">
              <img :src="item.image_url" :alt="item.name" style=" width: 100%;" class="img-fluid" />
          </nuxt-link>

<!-- 
      <a title="#" href="#" class="#" v-for="(item, i) in banners" :key="i">
        <img style=" width: 100%;" class="img-fluid" :src="item.image_url" />
      </a> -->
    </div>
  </div>
</template>
<script>
import { isMobile, isIndex } from "~/plugins/util";
export default {
  data() {
    return {
      banners: [],
    };
  },
  created() {},
  methods: {
    getBanners() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/banner-ads")
        .then((resp) => {
          if (resp.data) {
            this.banners = resp.data.details;
          }
        })
        .catch((err) => {
          console.log("get banner error:", err);
        });
    },
  },
  mounted() {
    this.getBanners();
  },
};
</script>
