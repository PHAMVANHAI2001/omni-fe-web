<template>
  <section class="container pl-pr-0">
    <div>
      <div class="row ml-1" v-if="TopCategory.length <= 4 && !isMobile">
        <div
          class=""
          v-for="item in TopCategory"
          :key="item.id"
          v-bind:class="[
            TopCategory.length == 2
              ? 'col-6'
              : TopCategory.length == 3
              ? 'col-4'
              : TopCategory.length == 4
              ? 'col-3'
              : 'col-12',
          ]"
        >
          <nuxt-link
            v-if="item.type == 'CATEGORY'"
            :to="{ path: `/product?cat=${item.category_id}` }"
          >
            <img
              :src="item.image_url"
              :alt="item.category_name"
              class="item-img"
            />
          </nuxt-link>
          <nuxt-link
            v-if="item.type == 'LANDING-PAGE'"
            :to="{ path: `/landing-page/${item.slug}` }"
          >
            <img
              :src="item.image_url"
              :alt="item.category_name"
              class="item-img"
            />
          </nuxt-link>
          <a
            v-if="item.type == 'LINK-CUSTOM'"
            :href="item.router"
            target="_blank"
          >
            <img :src="item.image_url" :alt="item.router" class="item-img" />
          </a>
        </div>
      </div>

      <div class="row ml-1" v-if="TopCategory.length == 1 && isMobile">
        <div
          class=""
          v-for="item in TopCategory"
          :key="item.id"
          v-bind:class="[
            TopCategory.length == 2
              ? 'col-6'
              : TopCategory.length == 3
              ? 'col-4'
              : TopCategory.length == 4
              ? 'col-3'
              : 'col-12',
          ]"
        >
          <nuxt-link
            v-if="item.type == 'CATEGORY'"
            :to="{ path: `/product?cat=${item.category_id}` }"
          >
            <img
              :src="item.image_url"
              :alt="item.category_name"
              class="item-img"
            />
          </nuxt-link>
          <nuxt-link
            v-if="item.type == 'LANDING-PAGE'"
            :to="{ path: `/landing-page/${item.slug}` }"
          >
            <img
              :src="item.image_url"
              :alt="item.category_name"
              class="item-img"
            />
          </nuxt-link>
          <a
            v-if="item.type == 'LINK-CUSTOM'"
            :href="item.router"
            target="_blank"
          >
            <img :src="item.image_url" :alt="item.router" class="item-img" />
          </a>
        </div>
      </div>
    </div>
    <div
      class="main-SkinnyItem-sl ml-1 mr-1"
      v-if="TopCategory.length >= 5 || (isMobile && TopCategory.length != 1)"
    >
      <carousel
        id="carousel-no-animation"
        :perPageCustom="[
          [320, 2],
          [768, 4],
          [1024, 4],
        ]"
        :loop="true"
        :paginationEnabled="false"
        :navigationEnabled="true"
      >
        <slide v-for="item in TopCategory" :key="item.id" style="margin-right: 0px !important">
          <div class="h-100">
            <a
              v-if="item.type == 'LINK-CUSTOM'"
              :href="item.router"
              target="_blank"
              class="SkinnyItem-a"
            >
              <img :src="item.image_url" alt="" class="slider-img h-100" />
            </a>
            <nuxt-link
              v-if="item.type == 'LANDING-PAGE'"
              :to="{ path: `/landing-page/${item.slug}` }"
            >
              <img
                :src="item.image_url"
                :alt="item.category_name"
                class="item-img"
              />
            </nuxt-link>
            <nuxt-link
              v-if="item.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item.category_id}` }"
            >
              <img
                :src="item.image_url"
                :alt="item.category_name"
                class="item-img h-100"
              />
            </nuxt-link>
          </div>
        </slide>
      </carousel>
    </div>
    <!-- lớn hơn 4 -->
  </section>
</template>

<script>
import { isMobile, isIndex } from "~/plugins/util";
export default {
  props: {
    TopCategory: Array,
  },
  data() {
    return {
      checkLenght: false,
      isMobile: false,
      lenghts: true,
      isActive: true,
      hasError: false,
    };
  },
  methods: {},
  created() {},
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
};
</script>
<style lang="scss" scoped>
.item-img {
  // border-radius: 20px;
}
.slider-img {
  // border-radius: 20px;
  // padding: 1px 7px 1px 7px;
}
.SkinnyItem-a {
  // padding: 0px 10px 0px 10px;
}
.main-SkinnyItem-sl {
  // margin: 0px 10px 0px 10px;
}
</style>
