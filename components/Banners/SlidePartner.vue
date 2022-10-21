<template>
  <section class="">
    <div class="" v-if="myService && isMobile">
      <div class="container" style="padding:0px 5px">
        <div class="">
          <carousel
            id="carousel-no-animation"
            :perPageCustom="[
              [320, 4],
              [768, 8],
              [1024, 10],
            ]"
            :navigationEnabled="true"
            :centerMode="false"
            :autoplay="false"
            :autoplayTimeout="2000"
            :loop="false"
            :paginationEnabled="false"
          >
            <!-- <slide v-for="item in ArrIconChan.slice(0, number)" :key="item.id"> -->
            <slide v-for="item in myService" :key="item.id">
              <div class="item-home-task" style="">
                <a
                  v-if="item.type == 'LINK-CUSTOM'"
                  :href="item.router"
                  target="_blank"
                >
                  <img
                    :src="item.image_url + '/h60-w60'"
                    :alt="item.name"
                    class="ls-is-cached lazyloaded icon-task "
                  />
                  <p class="text-center text-services">
                    <span>{{ item.name }}</span>
                  </p>
                </a>
                <nuxt-link
                  v-if="item.type == 'CATEGORY'"
                  :to="{ path: `/product?cat=${item.category_id}` }"
                >
                  <span>
                    <img
                      class="ls-is-cached lazyloaded "
                      :src="item.image_url + '/h60-w60'"
                      :alt="item.name"
                    />
                    <p class="text-center text-services">
                      <span>
                        {{ item.name }}
                      </span>
                    </p>
                  </span>
                </nuxt-link>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
      <!-- <div class="container" style="padding:0px 5px">
        <div class="">
          <carousel
            id="carousel-no-animation"
            :perPageCustom="[
              [320, 4],
              [768, 8],
              [1024, 10],
            ]"
            :navigationEnabled="true"
            :centerMode="false"
            :autoplay="false"
            :autoplayTimeout="2000"
            :loop="false"
            :paginationEnabled="false"
          >
            <slide v-for="item in ArrIconLe.slice(10, number2)" :key="item.id">
              <div class="item-home-task" style="">
                <a
                  v-if="item.type == 'LINK-CUSTOM'"
                  :href="item.router"
                  target="_blank"
                >
                  <img
                    :src="item.image_url + '/h60-w60'"
                    :alt="item.name"
                    class="ls-is-cached lazyloaded icon-task "
                  />
                  <p class="text-center text-services">
                    {{ item.name }}
                  </p>
                </a>
                <nuxt-link
                  v-if="item.type == 'CATEGORY'"
                  :to="{ path: `/product?cat=${item.category_id}` }"
                >
                  <span>
                    <img
                      class="ls-is-cached lazyloaded "
                      :src="item.image_url + '/h60-w60'"
                      :alt="item.name"
                    />
                    <p class="text-center text-services">
                      <span>
                        {{ item.name }}
                      </span>
                    </p>
                  </span>
                </nuxt-link>
              </div>
            </slide>
          </carousel>
        </div>
      </div> -->
    </div>

    <div class="container" v-if="myService && !isMobile">
      <div class="row justify-content-center">
        <div class="col-1 pd-partner" v-for="item in myService" :key="item.id">
          <div
            class="text-center justify-content-center"
            style="display: flex; "
          >
            <a
              v-if="item.type == 'LINK-CUSTOM'"
              :href="item.router"
              target="_blank"
            >
              <img
                :src="item.image_url + '/h60-w60'"
                :alt="item.name"
                class="ls-is-cached lazyloaded icon-task "
              />
              <p class="text-center text-services">
                <span>{{ item.name }}</span>
              </p>
            </a>
            <nuxt-link
              v-if="item.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${item.category_id}` }"
            >
              <span>
                <img
                  class="ls-is-cached lazyloaded "
                  :src="item.image_url + '/h60-w60'"
                  :alt="item.name"
                />
                <p class="text-center text-services">
                  <span>
                    {{ item.name }}
                  </span>
                </p>
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <SkinnyBanner :SkinnyItem="myServicebaner"></SkinnyBanner>
  </section>
</template>

<script>
import SkinnyBanner from "~/components/Banners/SkinnyBanner";
import { mapMutations } from "vuex";
import { isMobile } from "~/plugins/util";
export default {
  data() {
    return {
      number: 10,
      number2: 10,
      myService: [],
      ArrIconChan: [],
      ArrIconLe: [],
      myServicebaner: [],
      animate: true,
      isMobile: false,
    };
  },
  components: {
    SkinnyBanner,
  },
  created() {
    this.getContentService();
    this.getbannerService();
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  methods: {
    getContentService() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/myService")
        .then((resp) => {
          if (resp.data) {
            this.myService = resp.data.details;

            if (this.myService.length <= 10) {
              this.number = 10;
              this.ArrIconChan = this.myService;
              this.ArrIconLe = [];
            }
            if (this.myService.length > 10) {
              this.number = 10;
              this.number2 = this.myService.length;
              this.ArrIconChan = this.myService;
              this.ArrIconLe = this.myService;
            }
          }
        })
        .catch((err) => {
          // console.log("get banner error:", err);
        });
    },
    getbannerService() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/myServicebaner")
        .then((resp) => {
          if (resp.data) {
            this.myServicebaner = resp.data.details;
          }
        })
        .catch((err) => {
          // console.log("get banner error:", err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.pd-partner {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.item-home-task {
  text-align: center;
  height: 120px;
  width: 117px;
}
.icon-task {
  // padding: 0px 10px;
}
.text-services span {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  color: rgb(36, 36, 36);
  width: 81px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
.service {
  padding: 10px 0;
  font-size: 12px;
  float: left;
  width: 100%;
}
.service-bannner {
  padding: 5px 0;
  float: left;
}
.service .service-item {
  display: inline-block;
  padding-left: 20px;
  overflow: hidden;
}
.service .service-item h3 {
  margin: 0;
  padding: 0 0 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  color: #315399;
}
.service .service-item .icon {
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 12px;
}
.service .service-item span {
  font-size: 13px;
  color: #315399;
  font-weight: 300;
}

.service .service-item .info {
  padding-top: 7px;
}
@media (min-width: 768px) {
  .col-sm-3 {
    width: 25%;
  }
  @media screen and (max-width: 480px) {
    .service .service-item {
      padding-left: 3px;
    }
  }
}
@media screen and (max-width: 991px) {
  .service .service-item h3 {
    text-transform: inherit;
    font-size: 12px;
  }
  .service .service-item .icon img {
    width: 100%;
  }
  .service .service-item .icon {
    width: 30px;
    height: 30px;
  }
  .service .service-item .info {
    padding-left: 40px;
  }
  .service .service-item .info {
    padding-left: 40px;
  }
}
.col-nt-1 {
  flex: 0 0 9.333333%;
  max-width: 18.333333%;
}
.section-home-task {
  display: flex !important;
}
</style>
