<template>
  <main role="main" class="clearfix">
    <div class="container">
      <div class="">
        <span class="line-8 d-block p-2"></span>
        <div class="container mb"></div>
        <span class="line-8 d-block"></span>
        <div class="container" v-for="item in childrens" :key="item.id">
          <div class="row">
            <div
              class="category-list col-4 text-center pt-2 pl-1 pr-1"
              v-for="items in item.children" :key="items.id"
            >
              <!-- <div class="product-img mb-2">
                <a @click="getCat(item)" class="border-0 p-0">
                  <img
                    class="list img-category"
                    :src="item.image_url"
                    :alt="item.name"
                  />
                </a>
              </div> -->
              <h5 class="item-title-cate font-11 mb-0 card-title-children-category" style="height: 70px !important" >
                <!-- <a @click="getCat(items)" style="font-size: 11px !important;" >
                  {{ items.item.title }}
                </a> -->

                <nuxt-link
                  :to="
                    items.children && items.children.length > 0
                      ? `/category/catchildren?id=${items.id}&cat=${items.item.cate}&slug=${items.item.slug}`
                      : `/product?cat=${items.item.cate}`
                  "
                  class="border-0 p-0"
                >
                {{ items.item.title }}
                </nuxt-link>
              </h5>
            </div>
          </div>
        </div>
        <div class="line-1 d-block mt-3"></div>
      </div>
      <section class="section container mb-6">
        <nuxt-link
          :to="{ path: `/product?cat=${catId}` }" 
          class="float-right text-primary pt-1"
          ><small>Xem thêm</small></nuxt-link
        >
        <h3 class="the-title section-title mb-2 font-bold">
          Sản phẩm liên quan
        </h3>

        <div class="hot-deal row" v-if="products">
              <div
                class=" col-sm-4 col-lg-3 col-6"
                v-for="(item, i) in products"
                :key="i"
              >
                <Product class="product-item" :item="item"></Product>
              </div>
            </div>
      </section>
    </div>
  </main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Product from "~/components/Product";

export default {
  data() {
    return {
      catId: null,
      products: null,
      childrens: [],
      dataMega: [],
    };
  },
  components: {
    Product,
  },
  created() {
    this.getProduct();
    this.getChildrenCat();
    this.catId = this.$router.currentRoute.query.cat;
  },
  mounted() {},
  computed: mapState({
    categories: (state) => state.products.categories,
  }),
  methods: {
    getCat(item) {
      if (item.children && item.children.length > 0) {
        this.$router.push({
          path: `/category/catchildren?id=${item.id}&cat=${item.item.cate}&slug=${item.item.slug}`, 
        });
        this.getChildrenCat()
      } else {
        this.$router.push({
          path: `/product?cat=${item.item.cate}`, 
        });
      }
    },
    getProduct(page = 1) {
      const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
      const name = this.$route.query["name"] ? this.$route.query["name"] : "";
      const sort = this.$route.query["sort"]
        ? this.$route.query["sort"]
        : "date_added";
      const order = this.$route.query["order"]
        ? this.$route.query["order"]
        : "desc";
      // commit to store
      this.$store.dispatch("app/showLoadingOverlay", true);
      // console.log('cat:',cat)
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=24&name=${name}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&status=1`,
        })
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.products = resp.data.data;
        })
        .catch((err) => {
          // console.log("err:", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getChildrenCat() {
     this.childrens = []
     this.$store
      .dispatch("category/getMegaMenu")
      .then((resp) => {
        var id = this.$route.query["id"] ? this.$route.query["id"] : "";
        this.dataMega =  resp && resp["data"] && resp["data"]["data"]
            ? JSON.parse(resp.data.data)
            : [];
        this.dataMega.filter((item) => {
          if(item.children){
            item.children.filter((item_id) => {
              if(item_id.id == id){
                this.childrens.push(item_id)
              }
            })
          }
          if(id == item.id){
            this.childrens.push(item) 
          }
        })
      })
      .catch((err) => {
        console.log("err:", err);
      });
    },
  },
  watch: {
    "$route.query"(q) {
      this.getChildrenCat();
      this.getProduct(1);
    },
  },
};
</script>
