<template>
  <div class="left-nav">
    <div class="main-menu">
      <ul class="menu-main" style="list-style:none;overflow:auto;" id="style-2">
        <li class="menu-1 " v-for="(item, i) in categories" :key="i">
          <nuxt-link
            :to="{ path: `/product?c=${item.code}&cat=${item.id}` }"
            class="px-0 font-medium  font-14 border-bottom d-flex"
            style="margin-left: 12px"
            title=""
          >
            <img :src="item.image_url" alt width="15px" height="15" />
            &nbsp;&nbsp;
            <span style="font-size: 0.8250rem;">{{ item.name }}</span>
            <!-- <img src="themes/desktop4.1/image/icon-deal-online.svg" style="margin-right:-2px; float:right;" /> -->
          </nuxt-link>
        </li>
      </ul>
    </div>
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
  getCategory() {
    this.$store
      .dispatch("category/getCategory", this.$route.query.cat)
      .then((resp) => {
        if (!this.$route.query["cat"] && resp.length) {
          const firstcat = resp[0];
          this.$router.push({
            path: `/category?cat=${firstcat.id}`,
          });
        }
      });
  },
  created() {
    if (!process.server) {
      this.isPlatformMobile = isMobile();
    }
  },
};
</script>
<style lang="scss" scoped></style>
