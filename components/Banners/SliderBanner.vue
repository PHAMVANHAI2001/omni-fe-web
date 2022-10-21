<template>
<div>
     <div class="main-banner col-lg-8">
        <div class="slider-indexhome">
        <carousel
        id="carousel-no-animation"
        style="text-shadow: 0px 0px 2px #000"
        :perPageCustom="[
            [320, 1],
            [768, 1],
            [1024, 1],
            ]"
        :autoplay="false"
        :loop="true"
        :paginationEnabled="false"
        >
        <slide v-for="(item, i) in banners" :key="i" >
            <img :src="item.image_url" alt=""  >
        </slide>
        </carousel>
        </div>
    </div>
    
</div>

 
</template>

<script>
export default {
  data() {
    return {
      banners: [],
    };
  },
  methods: {
       prev() {
        this.$refs.myCarousel.prev()
      },
      next() {
        this.$refs.myCarousel.next()
      },
    getBanners() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/slider-banner")
        .then(resp => {
          if (resp.data) {
            this.banners = resp.data.details;
          }
        })
        .catch(err => {
          // console.log("get banner error:", err);
        });
    }
  },
  created(){
      this.getBanners();
  }
};
</script>
<style lang="scss" scoped>
.VueCarousel-pagination {
    display: none;
}
</style>