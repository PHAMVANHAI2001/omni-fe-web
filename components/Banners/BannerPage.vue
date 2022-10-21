<template>
  <section class="section-banner mb-2" style="margin-top: -10px;">
    <div class="">
      <carousel
        id="carousel-no-animation"
        :perPageCustom="[
          [320, 1],
          [768, 1],
          [1024, 1],
        ]"
        :autoplay="false"
        :autoplayTimeout="2000"
        :loop="true"
        :navigationEnabled="true"
        :paginationEnabled="true"
        :paginationColor="MM006e43"
        :paginationActiveColor="MMffcd00"
      >
        <slide v-for="item in itemBanner" :key="item.id">
          <div class="">
            <a
              v-if="item.type == 'LINK-CUSTOM'"
              :href="item.router"
              target="_blank"
            >
              <img :src="item.image_url + '/w-1920'" alt="" class="w-100" />
            </a>
            <nuxt-link
              v-if="item.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item.category_id}` }"
            >
              <img class="w-100" :src="item.image_url + '/h354-w1150'" alt="" />
            </nuxt-link>
          </div>
        </slide>
      </carousel>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    itemBanner: Array,
  },
  data() {
    return {
      // banners: [],
      MM006e43: "#006e43",
      MMffcd00: "#ffcd00",
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
