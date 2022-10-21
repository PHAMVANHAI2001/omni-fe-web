<template>
  <div class="floating-icon" v-if="floatingIcons && floatingIcons.length > 0">
    <div class="close-floating-icon-right">
      <a @click="closeFloatingIcon">
        <i class="fa fa-times-circle"></i>
      </a>
    </div>
    <div class="right-floating" v-for="(image, i) in floatingIcons" :key="i">
      <nuxt-link
        v-if="image.type == 'CATEGORY'"
        :to="{ path: `/category?cat=${image.category_id}` }"
      >
        <img
          :src="image.image_url"
          :alt="image.image_url + `/h300-w300`"
          width="100px"
        />
      </nuxt-link>
      <a
        v-if="image.type == 'LINK-CUSTOM'"
        :href="image.router"
        target="_blank"
      >
        <img
          :src="image.image_url"
          :alt="image.image_url + `/h300-w300`"
          width="100px"
        />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      floatingIcons: [],
    };
  },
  created() {
    if (process.browser) {
      if (!sessionStorage.getItem("Visited-float", true)) {
        this.getFloatingIconRight();
      }
    }
  },
  methods: {
    closeFloatingIcon() {
      this.floatingIcons = null;
      sessionStorage.setItem("Visited-float", true);
    },

    getFloatingIconRight() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/floating-icon-right")
        .then((resp) => {
          if (resp.data) {
            this.floatingIcons = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
  },
};
</script>

<style lang="scss">
.floating-icon {
  position: fixed;
  z-index: 999;
  bottom: 32px;
  right: 100px;
}
</style>
