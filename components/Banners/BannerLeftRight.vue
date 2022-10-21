<template>
  <div class="container">
    <div
      style="display: flex; position: fixed; left: 50%;  transform: translateX(-50%);"
    >
      <a href="#">
        <div style="left: 8px; transform: translateX(-384%);">
          <img v-bind:src="bannerRight" style="width:150px;" />
        </div>
      </a>
      <a href="#">
        <div style="right: 8px; transform: translateX(384%);">
          <img v-bind:src="bannerLeft" style="width:150px;" />
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerRight: null,
      bannerLeft: null,
    };
  },
  created() {
    this.getBanners();
  },
  methods: {
    getBanners() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/BannerLeftRight")
        .then((resp) => {
          if (resp.data) {
            if (
              resp.data.details &&
              resp.data.details.length > 0 &&
              resp.data.details[0].image_url
            ) {
              this.bannerLeft = resp.data.details[0].image_url;
            }
            if (
              resp.data.details &&
              resp.data.details.length > 0 &&
              resp.data.details[1].image_url
            ) {
              this.bannerRight = resp.data.details[1].image_url;
            }
          }
        })
        .catch((err) => {
          console.log("get banner error:", err);
        });
    },
  },
};
</script>
