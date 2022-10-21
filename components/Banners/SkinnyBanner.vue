<template>
  <section>
    <div class="mt-2">
      <div
        class="row"
        v-if="SkinnyItem.length <= 3 && !isMobile"
        v-bind:class="[
          SkinnyItem.length == 2
            ? 'mr-skinny-row'
            : SkinnyItem.length == 3
            ? 'mr-skinny-row'
            : '',
        ]"
      >
        <div
          class=""
          v-for="item in SkinnyItem"
          :key="item.id"
          v-bind:class="[
            SkinnyItem.length == 2
              ? 'col-6 pl-pr-0'
              : SkinnyItem.length == 3
              ? 'col-4 pl-pr-0'
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
              v-bind:class="[
                SkinnyItem.length == 2
                  ? 'w-99-5'
                  : SkinnyItem.length == 3
                  ? 'w-99-5'
                  : 'w-100',
              ]"
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
              v-bind:class="[
                SkinnyItem.length == 2
                  ? 'w-99-5'
                  : SkinnyItem.length == 3
                  ? 'w-99-5'
                  : 'w-100',
              ]"
            />
          </nuxt-link>
          <a
            v-if="item.type == 'LINK-CUSTOM'"
            :href="item.router"
            target="_blank"
          >
            <img
              :src="item.image_url"
              :alt="item.router"
              class="item-img"
              v-bind:class="[
                SkinnyItem.length == 2
                  ? 'w-99-5'
                  : SkinnyItem.length == 3
                  ? 'w-99-5'
                  : 'w-100',
              ]"
            />
          </a>
          <a v-if="item.type == 'NEWS'" :href="item.router">
            <img
              :src="item.image_url"
              :alt="item.router"
              class="item-img"
              v-bind:class="[
                SkinnyItem.length == 2
                  ? 'w-99-5'
                  : SkinnyItem.length == 3
                  ? 'w-99-5'
                  : 'w-100',
              ]"
            />
          </a>
          <nuxt-link
            v-if="item.type == 'PRODUCT_SEARCH'"
            :to="{
              path: `/product?product-promotion=${item.product_search_query}`,
            }"
          >
            <img
              :src="item.image_url"
              :alt="item.name"
              class="item-img"
              v-bind:class="[
                SkinnyItem.length == 2
                  ? 'w-99-5'
                  : SkinnyItem.length == 3
                  ? 'w-99-5'
                  : 'w-100',
              ]"
            />
          </nuxt-link>
        </div>
      </div>

      <div class="row" v-if="SkinnyItem.length == 1 && isMobile">
        <div
          class=""
          v-for="item in SkinnyItem"
          :key="item.id"
          v-bind:class="[
            SkinnyItem.length == 2
              ? 'col-6'
              : SkinnyItem.length == 3
              ? 'col-4'
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
          <a v-if="item.type == 'NEWS'" :href="item.router">
            <img :src="item.image_url" :alt="item.router" class="item-img" />
          </a>
          <nuxt-link
            v-if="item.type == 'PRODUCT_SEARCH'"
            :to="{
              path: `/product?product-promotion=${item.product_search_query}`,
            }"
          >
            <img :src="item.image_url" :alt="item.name" class="item-img" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <div
      class=""
      v-if="SkinnyItem.length >= 4 || (isMobile && SkinnyItem.length != 1)"
    >
      <carousel
        id="carousel-no-animation"
        :perPageCustom="[
          [320, 1],
          [768, 2],
          [1024, 2],
        ]"
        :loop="true"
        :navigationEnabled="true"
        :paginationEnabled="true"
        :paginationColor="MM006e43"
        :paginationActiveColor="MMffcd00"
      >
        <slide v-for="item in SkinnyItem" :key="item.id">
          <div class="text-center">
            <a
              v-if="item.type == 'LINK-CUSTOM'"
              :href="item.router"
              target="_blank"
              class="SkinnyItem-a text-center"
            >
              <img
                :src="item.image_url"
                alt=""
                style="width: 99.5% !important"
              />
            </a>
            <nuxt-link
              v-if="item.type == 'LANDING-PAGE'"
              :to="{ path: `/landing-page/${item.slug}` }"
              class="text-center"
            >
              <img
                :src="item.image_url"
                :alt="item.category_name"
                class="item-img"
                style="width: 99.5% !important"
              />
            </nuxt-link>
            <nuxt-link
              v-if="item.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item.category_id}` }"
              class="SkinnyItem-a text-center"
            >
              <img
                :src="item.image_url"
                alt=""
                class="slider-img"
                style="width: 99.5% !important"
              />
            </nuxt-link>
            <a
              v-if="item.type == 'NEWS'"
              :href="item.router"
              class="text-center"
            >
              <img
                :src="item.image_url"
                :alt="item.router"
                class="item-img"
                style="width: 99.5% !important"
              />
            </a>
            <nuxt-link
              v-if="item.type == 'PRODUCT_SEARCH'"
              :to="{
                path: `/product?product-promotion=${item.product_search_query}`,
              }"
              class="text-center"
            >
              <img
                :src="item.image_url"
                :alt="item.name"
                class="item-img"
                style="width: 99.5% !important"
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
    SkinnyItem: Array,
  },
  data() {
    return {
      checkLenght: false,
      isMobile: false,
      lenghts: true,
      isActive: true,
      hasError: false,
      MM006e43: "#006e43",
      MMffcd00: "#ffcd00",
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
  padding: 1px 7px 1px 7px;
}
.SkinnyItem-a {
  // padding: 0px 10px 0px 10px;
}
.main-SkinnyItem-sl {
  margin: 0px 10px 0px 10px;
}
</style>
