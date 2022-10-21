<template>
  <section>
    <!-- gắn mega menu dưới đây nè -->
    <div class="left-nav">
      <div class="main-menu">
        <ul class="menu-main" id="megamenu">
          <li
            id="liMain"
            v-for="(item, i) in allMenu"
            :key="i"
            :class="{
              'menu-1 has-submenu': item.children && item.children.length > 0,
            }"
            @mouseover="hover(item.item)"
          >
            <nuxt-link
              :to="
                item.item.cate
                  ? `/product?cat=${item.item.cate}`
                  : `${item.item.router}`
              "
              :title="item.item.title"
              class="pl-0 pr-3 font-medium font-14 border-bottom"
              style="/* margin-left: 12px; */margin-right: 10px;/* border-bottom: 1px solid rgb(255, 255, 255); */height: 42px;line-height: 14px;"
            >
              <img
                :src="item.item.img"
                alt
                class="icon-mega"
                v-if="item.item.is_img && item.item.is_img == true"
              />
              {{ item.item.title }}
            </nuxt-link>
            <!-- <ul
              v-if="
                item.item.is_img && item.children && item.children.length > 0
              "
              class="menu-child sub-menu"
              style="width: 400px !important; padding: 20px 0 !important"
              :style="{height: heightMenu+' !important'}"
            >
              <div class="row" style="padding: 0 20px">
                <div
                  class="col-md-4 col-6 border-img"
                  v-for="(cate, y) in item.children"
                  :key="y"
                >
                  <nuxt-link
                    :to="
                      cate.item.cate
                        ? `/product?cat=${cate.item.cate}`
                        : `${cate.item.router}`
                    "
                    :title="cate.item.title"
                    class="thumb-img shadow-index-manufacture"
                  >
                    <img class="img-fluid" :src="cate.item.img" />
                  </nuxt-link>
                </div>
              </div>
            </ul> -->
            <ul
              v-if="item.children && item.children.length > 0"
              class="menu-child sub-menu"
              :style="{
                width: widthPx + 'px !important',
                height: heightMenu + 'px !important',
              }"
            >
              <div class="row ml-mr-0 h-100" style="margin-top: 0 !important;">
                <div :class="'col-md-' + colNumber" class="pl-pr-0 h-100">
                  <li v-for="(cate, y) in item.children" :key="y">
                    <nuxt-link
                      :to="
                        cate.item.cate
                          ? `/product?cat=${cate.item.cate}`
                          : `${cate.item.router}`
                      "
                      :title="cate.item.title"
                    >
                      <img
                        :src="cate.item.img"
                        alt
                        class="icon-mega"
                        v-if="cate.item.is_img && cate.item.is_img == true"
                      />
                      {{ cate.item.title }}
                    </nuxt-link>
                    <div
                      class="ml-50px"
                      v-if="cate.children && cate.children.length > 0"
                    >
                      <nuxt-link
                        class="menu-level-3"
                        v-for="(val, z) in cate.children"
                        :key="z"
                        :to="
                          val.item.cate
                            ? `/product?cat=${val.item.cate}`
                            : `${val.item.router}`
                        "
                        :title="val.item.title"
                      >
                        <img
                          :src="val.item.img"
                          alt
                          class="icon-mega"
                          v-if="val.item.is_img && val.item.is_img == true"
                        />
                        {{ val.item.title }}
                      </nuxt-link>
                    </div>
                    <!-- <ul v-if="cate.children && cate.children.length > 0">
                      <div class="">
                        <li
                          v-for="(val, z) in cate.children"
                          :key="z"
                          style="height: 32px !important; "
                        >
                          <nuxt-link
                            :to="
                              val.item.cate
                                ? `/product?cat=${val.item.cate}`
                                : `${val.item.router}`
                            "
                            :title="val.item.title"
                          >
                            <img
                              :src="val.item.img"
                              alt
                              class="icon-mega"
                              v-if="val.item.is_img && val.item.is_img == true"
                            />
                            {{ val.item.title }}
                          </nuxt-link>
                        </li>
                      </div>
                    </ul> -->
                    <!-- <div
                      v-if="cate.children && cate.children.length > 0"
                      class="menu-child-3 sub-menu"
                      style="width: 685px !important;"
                    >
                      <ul style="margin: 0 !important;">
                        <div class="row">
                          <div class="col-md-6">
                            <li
                              v-for="(val, z) in cate.children"
                              :key="z"
                              class="menu-3"
                              style="height: 32px !important;"
                            >
                              <nuxt-link
                                :to="
                                  cate.item.cate
                                    ? `/product?cat=${cate.item.cate}`
                                    : `${cate.item.router}`
                                "
                                :title="val.item.title"
                              >
                                {{ val.item.title }}
                              </nuxt-link>
                            </li>
                          </div>
                          <div class="col-md-6">
                            <div
                              class="d-flex align-items-center"
                              style="width: 100%;"
                            >
                              <img
                                :src="cate.item.banner + '/h326-w177'"
                                alt
                                style="margin: 20px 0"
                              />
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div> -->
                  </li>
                </div>
                <div class="col-md-5 h-100">
                  <div
                    class="d-flex align-items-center h-100"
                    style="width: 100%;"
                  >
                    <img :src="item.item.banner" alt style="margin: 20px 0; " />
                  </div>
                </div>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { isMobile } from "~/plugins/util";
import $ from "jquery";
export default {
  props: {
    heightPx: Number,
  },
  data() {
    return {
      isPlatformMobile: null,
      height: 0,
      widthPx: 270,
      colNumber: 12,
      allMenu: [],
      heightMenu: null,
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
    hover(data) {
      if (data.banner) {
        this.widthPx = 600;
        this.colNumber = 7;
      }
      if (!data.banner) {
        this.widthPx = 270;
        this.colNumber = 12;
      }
      var element = document.getElementById("megamenu");
      let SizeElement = element.getBoundingClientRect();
      this.heightMenu = SizeElement.height;
    },
    hanndelCategoryActive(id) {
      this.$store.dispatch("category/categorySelected", {
        data: this.categories,
        idCat: id,
      });
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
  },

  created() {
    if (!process.server) {
      this.isPlatformMobile = isMobile();
      this.height = this.heightPx;
    }
    this.$store
      .dispatch("category/getMegaMenu")
      .then((resp) => {
        this.allMenu =
          resp && resp["data"] && resp["data"]["data"]
            ? JSON.parse(resp.data.data)
            : [];
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
};
</script>
<style lang="scss" scoped>
.icon-mega {
  width: 18.5px;
}
</style>
