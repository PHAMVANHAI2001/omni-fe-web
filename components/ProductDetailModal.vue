<template>
  <main>
    <b-modal
      v-model="modalShow"
      ref="product-detail-modal"
      id="product-detail-modal"
      hide-header
      hide-footer
      size="lg"
      style="height: 400px !important; overflow: scroll; margin: 200px 0;"
    >
      <button
        type="button"
        class="btn btn-close"
        data-dismiss="modal"
        @click="closemodal"
      >
        <i class="fa fa-close"></i>
      </button>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <div class="product-gallery-image">
              <div class="big-product-image">
                <!-- <img :src="currentProduct.thumbnail + '/h600-w600'" /> -->
                <inner-image-zoom
                  :src="currentProduct.thumbnail + '/h600-w600'"
                  :zoomSrc="currentProduct.thumbnail + '/h1000-w1000'"
                />
              </div>
              <div id="gal1" class="product-gallery-image-thumb">
                <client-only>
                  <carousel
                    v-if="currentProduct && currentProduct.gallery_images"
                    :loop="false"
                    :items="4"
                    :nav="true"
                    :dots="false"
                    :margin="5"
                    :navText="navText"
                  >
                    <div
                      v-for="(item, i) in currentProduct.gallery_images"
                      :key="i"
                    >
                      <a>
                        <img
                          :src="item.url + '/h90-w90'"
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
          <div class="col-sm-6">
            <h1 class="product-title">{{ currentProduct.name }}</h1>
            <span v-if="currentProduct['qty'] == 0" class="badge badge-danger"
              >Hết hàng</span
            >
            <span v-if="currentProduct['qty'] !== 0" class="badge badge-success"
              >Còn hàng</span
            >
            <div>
              <h4 v-if="currentProduct.special" class="price-detail">
                {{ currentProduct.special_formatted }}
              </h4>
              <span
                v-bind:class="{ has_special: currentProduct.special > 0 }"
                class="price-detail"
              >
                {{ currentProduct.price_formatted }}
              </span>
            </div>

            <div
              class="short_des_detail"
              v-if="currentProduct.short_description"
              v-html="currentProduct.short_description"
            ></div>
            <!-- <span
              style="cursor:pointer"
              v-if="currentProduct.short_description"
              class="badge badge-secondary float-right"
              @click="loadMore()"
              >{{ !countText ? "Xem thêm" : countText ? "Thu gọn" : "" }}</span
            > -->
            <br />
            <div
              class="short_des_detail"
              v-if="!currentProduct.short_description"
            >
              Chưa có mô tả
            </div>
            <p v-if="currentProduct.brand">
              <strong>Hãng sản xuất: </strong>
              {{ currentProduct.brand.name }}
            </p>
            <div class="col-md-12 product-right-body-modal">
              <b-button
                style="float:left !important"
                variant="outline-secondary"
                ref="addCartBtn"
                v-if="
                  (!currentProduct['cartAddedQty'] ||
                    currentProduct['cartAddedQty'] == 0) &&
                    currentProduct['qty'] > 0
                "
                @click="addToCart(currentProduct, $event)"
                class="buy-modal add-to-cart"
                v-bind:class="{
                  'buy-block-modal':
                    (!currentProduct['cartAddedQty'] ||
                      currentProduct['cartAddedQty'] == 0) &&
                    currentProduct['qty'] > 0,
                }"
                >Thêm vào giỏ hàng</b-button
              >
              <br/>
              <div class="row">
                <div class="col-4 col-sm-4 col-md-4">
                  <div
                    v-if="
                      currentProduct['cartAddedQty'] &&
                        currentProduct['cartAddedQty'] > 0 &&
                        currentProduct['qty'] > 0
                    "
                    class="qty-update-group d-inline-flex"
                  >
                    <span class="input-group-btn">
                      <button
                        @click="changeCartQty(-1)"
                        class="btn btn-number btn-number-minus"
                        type="button"
                        data-type="minus"
                      >
                        <span class="fa fa-minus"></span>
                      </button>
                    </span>
                    <input
                      type="number"
                      pattern="[0-9]*"
                      min="1"
                      @change="typeChangeCartQty($event)"
                      :value="currentProduct.cartAddedQty"
                      :max="currentProduct.qty"
                      maxlength="50"
                      class="form-control input-number"
                      style="text-align: center; width: 40px;"
                    />
                    <span class="input-group-btn">
                      <button
                        @click="changeCartQty(1)"
                        class="btn btn-number btn-number-plus"
                        type="button"
                        data-type="plus"
                      >
                        <span class="fa fa-plus"></span>
                      </button>
                    </span>
                  </div>
                </div>
                <div class="col-8 col-sm-8 col-md-8" style="padding-left: 20px !important; padding-right: 10px !important">
                  <b-button
                    variant="outline-secondary"
                    v-if="
                      currentProduct['cartAddedQty'] &&
                        currentProduct['cartAddedQty'] > 0 &&
                        currentProduct['qty'] > 0
                    "
                    @click="viewCart"
                  >
                    Thanh toán
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </main>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import InnerImageZoom from "~/node_modules/vue-inner-image-zoom";
let carousel;
if (process.client) {
  carousel = require("vue-owl-carousel");
  // ezPlus = require("ez-plus");
}
export default {
  data() {
    return {
      errors: [],
      modalShow: false,
      currentProduct: {},
      currentImage: { thumbnail: "" },
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
      phone: null,
      products: null,
      tempt: null,
      countText: false,
    };
  },
  components: {
    carousel,
    "inner-image-zoom": InnerImageZoom,
  },
  computed: mapState({
    cart: (state) => state.cart.cart,
  }),
  created() {
    if (process.browser) {
      this.phone = localStorage.getItem("phone");
    }
    this.$store.subscribe((mutation) => {
      if (mutation.type == "products/showProductDetailModal") {
        this.viewDetailData(mutation.payload);
        this.modalShow = true;
      }
    });
  },
  methods: {
    viewCart() {
      if (this.cart && this.cart.details) {
        this.$router.push("/checkout/shipping");
        this.modalShow = false;
      }
    },
    viewDetailData(data) {
      this.currentProduct = data;
      // this.tempt = data.short_description;
      // let strArray = data.short_description.split(" ");
      // let subArray = strArray.slice(0, 40);
      // data.short_description = subArray.join(" ");
      this.currentImage = {
        thumbnail: data.thumbnail,
      };
    },
    loadMore() {
      if (this.currentProduct.short_description.length > 200) {
        let strArray = this.tempt.split(" ");
        let subArray = strArray.slice(0, 40);
        this.currentProduct.short_description = subArray.join(" ");
        this.countText = false;
      } else {
        this.currentProduct.short_description = this.tempt;
        this.countText = true;
      }
    },
    closemodal() {
      this.currentProduct = {};
      this.currentImage = {
        thumbnail: "",
      };
      this.modalShow = false;
    },
    setCurrentImage(img, k) {
      this.currentProduct.thumbnail = img.url;
    },
    // getProduct(page = 1) {
    //   const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
    //   const name = this.$route.query["name"] ? this.$route.query["name"] : "";
    //   const store_id = this.$route.query["store_id"]
    //     ? this.$route.query["store_id"]
    //     : "";
    //   const sort = this.$route.query["sort"]
    //     ? this.$route.query["sort"]
    //     : "date_added";
    //   const order = this.$route.query["order"]
    //     ? this.$route.query["order"]
    //     : "desc";

    //   this.products = null;

    //   // commit to store
    //   this.$store.commit("products/setSearchProduct", { name: name });
    //   // this.$store.dispatch("app/showLoadingOverlay", true);
    //   this.$store
    //     .dispatch("products/getProduct", {
    //       params: `?limit=24&store_id=${store_id}&name=${name}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}`,
    //     })
    //     .then((resp) => {
    //       // //console.log("products :", resp.data.meta.pagination);
    //       // this.$store.dispatch("app/showLoadingOverlay", false);
    //       // set cart item id
    //       const products = resp.data.data;
    //       if (
    //         this.$store.state.cart &&
    //         this.$store.state.cart.cart &&
    //         this.$store.state.cart.cart.details
    //       ) {
    //         products.forEach((pro) => {
    //           pro = this.getCartItemId(pro);
    //         });
    //       }
    //       this.products = products;
    //     })
    //     .catch((err) => {
    //       console.log("err:", err);
    //       // this.$store.dispatch("app/showLoadingOverlay", false);
    //     });
    // },
    getCartItemId(item) {
      const cartItem = this.$store.state.cart.cart.details.find((itm) => {
        return item["id"] == itm["product_id"];
      });
      if (cartItem) {
        // set số lượng đã mua.
        item["cartAddedQty"] = cartItem["quantity"];
        // set id item trong detail giỏ hàng.
        item["cart_item_id"] = cartItem["id"];
      }
      return cartItem;
    },
    addToCart(product, $event) {
      Vue.set(this.currentProduct, "adding_to_cart", true);
      this.$store
        .dispatch("cart/add", {
          product_id: product.id,
          quantity: this.quantity,
          options: [],
          session_id: this.$store.state.app.session_id,
        })
        .then((res) => {
          Vue.set(this.currentProduct, "cart_item_id", res["id"]);
          Vue.set(this.currentProduct, "cartAddedQty", 1);
          Vue.set(this.currentProduct, "adding_to_cart", false);
          this.$store.dispatch("cart/getCart");
        })
        .catch((err) => {
          // this.$toast
          //   .error("Lỗi thêm vào giỏ hàng", {
          //     position: "top-right",
          //   })
          //   .goAway(3500);
          Vue.set(this.currentProduct, "adding_to_cart", false);
        });
    },
    changeCartQty(type) {
      this.currentProduct["tem_qty"] = this.currentProduct["cartAddedQty"];
      if (type == -1) {
        console.log(this.currentProduct["cartAddedQty"]);
        if (this.currentProduct["cartAddedQty"] > 0) {
          this.currentProduct["tem_qty"]--;
        }
      } else {
        this.currentProduct["tem_qty"]++;
        Vue.set(
          this.currentProduct,
          "cartAddedQty",
          this.currentProduct["tem_qty"]
        );
      }
      this.updateQty(this.currentProduct);
    },
    updateQty(product, $event = "") {
      let data = { product_id: product.id, quantity: product["tem_qty"] };
      if (product["adding_to_cart"]) {
        return;
      }
      Vue.set(this.currentProduct, "adding_to_cart", true);
      this.$store
        .dispatch("app/updateData", {
          param: `/v1/client/update-product-in-cart/${this.currentProduct["cart_item_id"]}`,
          data: data,
        })
        .then((res) => {
          Vue.set(this.currentProduct, "adding_to_cart", false);
          Vue.set(
            this.currentProduct,
            "cartAddedQty",
            this.currentProduct["tem_qty"]
          );
          this.$store.dispatch("cart/getCart");
          // this.$toast.success("Cập nhật số lượng thành công").goAway(1500);
        })
        .catch((err) => {
          if ($event && $event.target) {
            $event.target.value = this.currentProduct["cartAddedQty"];
          }
          Vue.set(this.currentProduct, "adding_to_cart", false);
        });
    },
    typeChangeCartQty($event) {
      if ($event["target"]["value"]) {
        this.currentProduct["tem_qty"] = $event["target"]["value"];
        this.updateQty(this.currentProduct, $event);
      }
    },
  },
};
</script>

<style>
.btn-close {
  position: fixed;
  right: -5px;
  top: -5px;
  width: 40px;
  font-size: 20px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* background: #fff; */
  color: #000;
  padding: 0;
}
.btn {
  box-shadow: none !important;
}
.btn:hover {
  color: #fff;
  box-shadow: none !important;
}

.buy {
  border-radius: 20px !important;
}
.product-right-body-modal {
  float: left;
}
button {
  float: right;
}
.buy-modal {
  display: inline-block;
  /* padding: 5px 12px; */
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  border-radius: 20px;
  margin-top: 10px;
  width: 100% !important;
  /* color: #fff !important; */
  /* background: #d45050; */
}
.buy.buy-block-modal {
  opacity: 1;
}
</style>
