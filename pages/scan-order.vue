<template>
  <main role="main" class="clearfix">
    <div class="row">
      <div class="col-md-12">
        <div class="main-right">
          <div class="top-detail-product quick-checkout-view">
            <div class="row">
              <div class="col-md-6">
                <div class="product-gallery-image">
                  <div class="big-product-image">
                    <img
                      :src="currentImage.thumbnail"
                      :data-zoom-image="currentImage.thumbnail"
                      id="img_01"
                      alt
                    />
                  </div>
                  <div id="gal1" class="product-gallery-image-thumb">
                    <client-only>
                      <carousel
                        v-if="currentProduct && currentProduct.gallery_images"
                        :autoplay="false"
                        :loop="false"
                        :items="4"
                        :nav="true"
                        :dots="false"
                        :margin="5"
                        :navText="navText"
                      >
                        <div v-for="(item, i) in currentProduct.gallery_images" :key="i">
                          <a
                            :data-image="item.item"
                            :data-zoom-image="
                                currentProduct.gallery_images[i]
                              "
                          >
                            <img
                              id="img_01"
                              :src="item.url"
                              @click="setCurrentImage(item, i)"
                              class="img-thumb-gal"
                            />
                          </a>
                        </div>
                      </carousel>
                    </client-only>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h1 class="product-title">{{ currentProduct.name }}</h1>
                <div class="rating-detail-header-section">
                  <ul>
                    <li>SKU: {{ currentProduct.code }}</li>
                  </ul>
                </div>
                <p v-if="currentProduct.manufacturer">
                  Th????ng hi???u:
                  <strong>{{ currentProduct.manufacturer }}</strong>
                </p>
                <div>
                  <h4
                    v-bind:class="{ has_special: currentProduct.special }"
                    class="price-detail"
                  >{{ currentProduct.price | vndformat }}</h4>
                </div>
                <div v-if="currentProduct.special">
                  <h4 class="price-detail">{{ currentProduct.special_formatted }}</h4>
                </div>
                <div>
                  <div
                    class="product-versions"
                    v-if="
                        currentProduct &&
                          currentProduct.versions &&
                          currentProduct.versions.length
                      "
                  >
                    <div class="mt-3">Phi??n b???n c??ng lo???i</div>

                    <nuxt-link
                      @click="viewProductVersion(item)"
                      v-for="(item, j) in currentProduct.versions"
                      :key="j"
                      class="version-item"
                      :to="{ path: '/product/' + item.slug }"
                    >
                      <h4>{{ item.version }}</h4>
                      <p>{{ item.price_formatted }}</p>
                    </nuxt-link>
                  </div>
                </div>

                <div class="input-group input-group-qty bootstrap-touchspin">
                  <span class="input-group-btn">
                    <button
                      @click="decrementQty"
                      class="btn btn-default bootstrap-touchspin-down"
                      type="button"
                    >-</button>
                  </span>
                  <input
                    id="qty"
                    type="tel"
                    name="qty"
                    value="1"
                    min="1"
                    v-model="quantity"
                    max="100"
                    class="form-control"
                  />
                  <span class="input-group-btn">
                    <button
                      @click="incrementQty"
                      class="btn btn-default bootstrap-touchspin-up"
                      type="button"
                    >+</button>
                  </span>
                </div>

                <div class="row">
                  <div class="add-to-cart-detail lg-btn-add-cart" @click="buy()">
                    <span class="fa fa-cart-plus"></span> ?????T MUA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import PhoneNumber from "awesome-phonenumber";

export default {
  data() {
    return {
      currentProduct: {},
      currentImage: {},
      quantity: 1,
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
      ]
    };
  },
  async asyncData({ store, route, redirect }) {},

  head() {
    return {
      title: this.currentProduct.name ? this.currentProduct.name : "Mua h??ng nhanh",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.currentProduct.short_des
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.currentProduct.short_des
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.currentProduct.name
        },
        {
          hid: "og:image",
          name: "og:image",
          property: "og:image",
          content: this.currentProduct.thumbnail
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.baseUrl + this.$nuxt.$route.fullPath
        }
      ]
    };
  },
  components: {},
  created() {
    if (!process.server) {
      this.href = window.location.href;
    }
    
    const product_id = +this.$route.query["product_id"];
    if (product_id) {
      this.$store.dispatch("products/detailById", product_id).then(data => {
        this.currentProduct = data.data;
        this.currentImage = {
          thumbnail: data.data.thumbnail
        };
      });
    } else {
     //  this.$router.push({ path: `/` });
    }
  },
  computed: {},
  mounted() {},
  methods: {
    incrementQty() {
      this.quantity++;
    },
    decrementQty() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async buy() {
      const { value: phone } = await this.$swal({
        title: "X??c nh???n",
        text: "Vui l??ng nh???p s??? ??i???n tho???i c???a qu?? kh??ch.",
        input: "text",
        showCancelButton: true,
        cancelButtonText: "????ng",
        confirmButtonText: "X??c nh???n ????n h??ng",
        inputValidator: value => {
          let phone = new PhoneNumber("+84" + value);
          if (!phone.isValid()) {
            return "Vui l??ng nh???p s??? ??i???n tho???i ????ng!";
          }
        }
      });

      if (phone) {
        this.$store
          .dispatch("cart/quickOrder", {
            product_id: this.currentProduct["id"],
            phone: phone,
            quantity: this.quantity
          })
          .then(res => {
            // mua th??nh c??ng.
            this.$swal({
              title: "?????t h??ng th??nh c??ng",
              text: "C??m ??n qu?? kh??ch h??ng, ????n h??ng c???a b???n ??ang ???????c x??? l??.",
              showCancelButton: true,
              icon: "success",
              confirmButtonText: "X??c nh???n",
              cancelButtonText: "????ng"
            }).then(result => {
              this.$router.push({ path: `/` });
            });
          })
          .catch(err => {
            //console.log("erro add cart:", err);
            // this.$toast
            //   .error("L???i th??m v??o gi??? h??ng", {
            //     position: "top-right"
            //   })
            //   .goAway(3500);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.lg-btn-add-cart {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 15px 55px;
  font-size: 1.2rem;
  z-index: 999;
  margin: 0;
  left: 0;
  right: 0;
}
.quick-checkout-view {
  .input-group-qty {
    width: 50%;
    margin: 10px auto;
  }
}
</style>
