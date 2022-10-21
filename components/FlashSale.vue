<template>
  <div class="module container-custom clearfix" id="category-section">
    <div class="sectionTitleTab clearfix">
      <h2>
        <a>Flash Sale</a>
      </h2>
    </div>
    <div class="container-fluid">
      <div class="module-content">
        <carousel
          :scrollPerPage="false"
          :perPageCustom="[[428, 2], [768, 3], [1024, 8]]"
          :navigationEnabled="true"
          :loop="true"
          :paginationEnabled="false"
        >
          <slide v-for="(item, i) in flashSale" :key="i" style="padding: 10px">
            <div class="product-item pro-child-component">
              <span class="out-stock" v-if="item.qty == 0">SẮP CÓ HÀNG</span>
              <nuxt-link
                :key="$route.fullPath"
                :to="{ path: `/product/${item.id}` }"
                class="thumbnail"
              >
                <span v-bind:style="{ backgroundImage: 'url(' + item.thumbnail + ')' }"></span>
              </nuxt-link>
              <div class="product-body">
                <h4 class="product-title">
                  <nuxt-link
                    :key="$route.fullPath"
                    :to="{ path: '/product/' + (item.id ? item.id : item.product_id) }"
                  >{{item.name | truncate(20)}}</nuxt-link>
                </h4>

                <span
                  v-if="item.price > 0"
                  v-bind:class="{ 'has_special': item.special > 0}"
                  class="product-price"
                >{{item.price | vndformat}}</span>

                <span v-if="item.price == 0" class="product-price">&nbsp;</span>

                <span
                  v-if="item.special > 0"
                  class="special_excluding_tax product-price"
                >{{item.special_formatted}}</span>
                <b-progress
                  :value="item.order_count"
                  variant="danger"
                  :animated="animate"
                  class="mt-3"
                ></b-progress>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      flashSale: [],
      animate: true
    };
  },
  components: {},
  methods: {
    getFlashSale() {
      this.$store
        .dispatch("products/getProduct", {
          params: `?category_ids=&limit=10&sort[order_count]=desc`
        })
        .then(resp => {
          this.flashSale = resp.data.data;
          // console.log("getFlashSale:", this.flashSale);
        })
        .catch(err => {});
    }
  },
  created() {
    this.getFlashSale();
  }
};
</script>
<style lang="scss" scoped>
</style>