<template>
  <div class="category-header-slide" id="categoryHeaderSlide">
    <client-only>
      <carousel
        :perPageCustom="[
          [320, 3],
          [414, 4],
          [768, 5],
          [1024, 6],
        ]"
        :loop="true"
        :paginationEnabled="false"
      >
        <slide v-for="(item, i) in categoriesAll" :key="i">
          <div class="text-center">
            <nuxt-link
              @loading="loading()"
              :to="
                item.children && item.children.length > 0
                  ? `/category/catchildren?cat=${item.id}`
                  : `/product?cat=${item.id}`
              "
              class="border-0 p-0"
            >
              <!-- <img
                class="list img-category"
                :src="item.image_url"
                :alt="item.name"
              /> -->
              <b-avatar :src="item.image_url" size="3rem"></b-avatar>
              <h6 class="title-category-slide">{{item.name}}</h6>
            </nuxt-link>
          </div>
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoriesAll: null,
    };
  },
  created() {
    this.getChildrenCat();
  },
  mounted() {},
  methods: {
    getChildrenCat() {
      this.$axios
        .get(`v1/client/categories/hierarchy`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", true);
          this.categoriesAll = resp.data;
          // console.log("categoriesAll :", this.categoriesAll);
          this.$$store.commit("");
        })
        .catch((err) => {
          // console.log("err:", err);
          this.$store.dispatch("app/showLoadingOverlay", true);
        });
    },
  },
  watch: {
    $route: function(q) {
      this.getChildrenCat();
    },
  },
};
</script>

<style lang="scss" scoped>
.badge-secondary {
    background-color: #fff !important;
}
</style>
