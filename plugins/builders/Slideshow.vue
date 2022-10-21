<template>
  <div id="slide-show">
    <b-carousel
      id="carousel-no-animation"
      style="text-shadow: 0px 0px 2px #000"
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide v-for="(item, i) in banners" :key="i" :img-src="item.image_url"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  methods: {
    getBanners() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/SLIDESHOW")
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
</style>