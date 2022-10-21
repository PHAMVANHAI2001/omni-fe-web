<template>
  <!-- Dành riêng cho bố mẹ -->
    <!-- Navbar -->
  <section  class="py-12">
    <ul class="flex justify-center flex-wrap">
      <li v-for="(item, i) in categories" :key="i">
        <button class="text-gray-900 px-6 py-2 border-2 mr-5 hover:border-green-600 rounded-full font-semibold bg-white text-sm mb-5 focus:outline-none transition-colors duration-500">
          <nuxt-link
                    :key="$route.fullPath"
                    :to="{ path: `/?c=${item.code}&cat=${item.id}`}"
                  >{{ item.name }}
          </nuxt-link>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { isMobile } from "~/plugins/util";
export default {
  data() {
    return {
      isPlatformMobile: null,
      options1: {
        autoplay: false,
				dots: false,
				navButtons: false,
				slidesToShow: 4,
				responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 5
                    }
                },
                
                {
                    breakpoint: 1000,
                    settings: {
                        navButtons: true
                    }
                }
            ]
          },
    };
  },
  computed: mapState({
    categories: state => state.category.categories
  }),
  mounted() {
    this.hanndelCategoryActive(this.$route.query.cat);
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      if (newRoute != oldRoute) {
        this.hanndelCategoryActive(newRoute.query.cat);
      }
    }
  },
  components: {},
  methods: {
    hanndelCategoryActive(id) {
      this.$store.dispatch("category/categorySelected", {
        data: this.categories,
        idCat: id
      });
    }
  },
  created() {
    if (!process.server) {
      this.isPlatformMobile = isMobile();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
