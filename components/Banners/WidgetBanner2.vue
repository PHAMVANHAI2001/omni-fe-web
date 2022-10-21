<template>
  <section class="position-relative section-nummer">
    <div class="container">
      <div class="row ml-0 mr-0">
        <div
          data-aos="fade-up"
          class=" ml-0 mr-0 pl-0 pr-0 "
          v-if="fist"
          v-bind:class="[
            banners.length == 0
              ? 'col-12'
              : banners.length == 2
              ? 'col-4'
              : 'col-3',
          ]"
        >
          <div class="style-margin-top">
            <div>
              <a
                v-if="itemFist.type == 'LINK-CUSTOM'"
                :href="itemFist.router"
                target="_blank"
              >
                <img class="main-img" :src="itemFist.image_url" alt="" />
              </a>
              <nuxt-link
                v-if="itemFist.type == 'CATEGORY'"
                :to="{ path: `/product?cat=${itemFist.category_id}` }"
              >
                <img class="main-img" :src="itemFist.image_url" alt="" />
              </nuxt-link>
              <nuxt-link
                  v-if="itemFist.type == 'LANDING-PAGE'"
                  :to="{ path: `/landing-page/${item.slug}` }">
                  <img :src="itemFist.image_url" :alt="itemFist.category_name" class="item-img" />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          class="row pr-0"
          data-aos="fade-up"
          v-bind:class="[
            lengthBanner == 3
              ? 'pl-0 ml-0 col-8'
              : lengthBanner == 5 || lengthBanner == 7
              ? 'pl-0 ml-0 col-9'
              : 'col-12',
          ]"
        >
          <div
            class="pr-xl-0 pl-xl-0 pl-sm-0 pr-sm-0 mb-0"
            v-for="item in banners"
            :key="item.id"
            v-bind:class="[
              banners.length == 2 || length3
                ? 'col-12'
                : banners.length == 4 || length2
                ? 'col-6'
                : banners.length == 6
                ? 'col-4'
                : 'col-2',
            ]"
          >
            <div class="d-flex mr-0 pl-sm-0 pr-sm-0 align-items-center">
              <div class="pl-pr-0">
                <a
                  v-if="item.type == 'LINK-CUSTOM'"
                  :href="item.router"
                  target="_blank"
                >
                  <img class="main-img2" :src="item.image_url" alt="" />
                </a>
                <nuxt-link
                    v-if="item.type == 'LANDING-PAGE'"
                    :to="{ path: `/landing-page/${item.slug}` }">
                    <img :src="item.image_url" :alt="item.category_name" class="item-img" />
                </nuxt-link>
                <nuxt-link
                  v-if="item.type == 'CATEGORY'"
                  :to="{ path: `/product?cat=${item.category_id}` }"
                >
                  <img class="main-img2" :src="item.image_url" alt="" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      itemFist: null,
      fist: false,
      lengthBanner: null,
      length2: false,
      length3: false,
    };
  },
  methods: {
    checkLengthImg() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/widget-banner2")
        .then((resp) => {
          if (resp.data) {
            this.banners = resp.data.details;
            this.lengthBanner = this.banners.length;

            if (this.banners.length) {
              if (this.banners.length % 2 == 0) {
                if (
                  (this.lengthBanner =
                    this.banners.length && this.lengthBanner == 2)
                ) {
                  this.length2 = true;
                }
                this.fist = false;
              }
              if (this.banners.length % 2 != 0) {
                if (this.lengthBanner == 3 || this.banners.length == 2) {
                  this.length3 = true;
                }
                this.fist = true;
                this.itemFist = this.banners.shift();
              }
            }
          }
        })
        .catch((err) => {
          // console.log("get banner error:", err);
        });
    },
  },
  created() {
    this.checkLengthImg();
  },
};
</script>
<style lang="scss" scoped>
.main-img {
  width: 750px;
}
.main-img2 {
  width: 100%;
}
</style>
