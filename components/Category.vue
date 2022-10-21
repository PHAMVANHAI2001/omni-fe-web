<template>
  <div id="category-section" class="categories-menu container">
    <client-only>
      <div class="hot-deal"  >
        <carousel
          :perPageCustom="[
            [320, 4],
            [768, 4],
            [1024, 6],
          ]"
          :paginationEnabled="false"
          :loop="true"
        >
          <slide v-for="(item, i) in categories" :key="i">
            <div class="cat-item">
              <h6 class="cat-title" v-bind:class="{ active: item.isActive }">
                <nuxt-link
                  :key="$route.fullPath"
                  :to="{ path: `/?c=${item.code}&cat=${item.id}` }"
                  >{{ item.name }}</nuxt-link
                >
              </h6>
            </div>
          </slide>
        </carousel>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { isMobile } from "~/plugins/util";
export default {
  data() {
    return {
      isPlatformMobile: null,
    };
  },
  computed: mapState({
    categories: (state) => state.category.categories,
  }),
  mounted() {
    this.hanndelCategoryActive(this.$route.query.cat);
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      if (newRoute != oldRoute) {
        this.hanndelCategoryActive(newRoute.query.cat);
      }
    },
  },
  components: {},
  methods: {
    hanndelCategoryActive(id) {
      this.$store.dispatch("category/categorySelected", {
        data: this.categories,
        idCat: id,
      });
    },
  },
  created() {
    if (!process.server) {
      this.isPlatformMobile = isMobile();
    }
  },
};
</script>

<style lang="scss" scoped></style>
