<template>
  <div v-if="banners && banners.length">
    <client-only>
      <carousel
      :perPageCustom="[
          [320, 1],
          [768, 1],
          [1024, 1],
        ]"
        :items="1"
        :nav="true"
        :autoplay="false"
        class="banner-category-top"
        :loop="true"
        :navigationEnabled="true"
        :paginationEnabled="true"
        :paginationColor="MM006e43"
        :paginationActiveColor="MMffcd00"
      >
      
      <slide v-for="item in banners" :key="item.id">
         <nuxt-link
            v-if="item.type == 'LANDING-PAGE'"
            :to="{ path: `/landing-page/${item.slug}` }"
          >
            <img :src="item.image_url" alt />
          </nuxt-link>

          <nuxt-link
            v-if="item.type == 'CATEGORY'"
            :to="{ path: `/product?cat=${item.category_id}` }"
          >
            <img
              :src="item.image_url"
              :alt="item.category_name"
            />
          </nuxt-link>
          <nuxt-link
            v-if="item.type == 'LANDING-PAGE'"
            :to="{ path: `/landing-page/${item.slug}` }"
          >
            <img
              :src="item.image_url"
              :alt="item.category_name"
            />
          </nuxt-link>
          <a
            v-if="item.type == 'LINK-CUSTOM'"
            :href="item.router"
          >
            <img :src="item.image_url" :alt="item.router" />
          </a>
          <a v-if="item.type == 'NEWS'" :href="item.router">
            <img :src="item.image_url" :alt="item.router" />
          </a>
          <nuxt-link
            v-if="item.type == 'PRODUCT_SEARCH'"
            :to="{
              path: `/product?product-promotion=${item.product_search_query}`,
            }"
          >
            <img :src="item.image_url" :alt="item.name" />
          </nuxt-link>
      </slide>
      </carousel>
    </client-only>
  </div>
</template>



<script>
export default {
  data() {
    return {
      banners:[],
       MM006e43: "#006e43",
      MMffcd00: "#ffcd00",
    };
  },
  components: {
  },
  created() {
    this.BannerCategory();
  },
  methods: {
    BannerCategory() {
      this.banners = [];
      const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
      var arrBanners = [];
      this.$store
      .dispatch("app/fetchData", "/v1/client/banners/BANNER-CATEGORYS")
      .then(resp => {
        if (resp.data) {
          arrBanners = resp.data.details;
          arrBanners.forEach((item, index) => { 
           item.display_in_categories.forEach((item_id) =>{
            if(item_id.id == cat){
              this.banners.push(item)
            } 
           })
          })

        }
      })
      .catch(err => {
        console.log("get banner error:", err);
      });
    },
  },
   watch: {
    "$route.query"(q) {
      this.BannerCategory();
    },
  },
};

 
</script>
<style lang="scss" scoped>
</style>