<template>
  <main role="main">
     <div class="header-app">
          Giỏ hàng
     </div>
    <div class="shopping-cart">
      <div class="container">
        <div class="card">
          <div class="card-header">Giỏ hàng của bạn</div>
          <div class="card-body">
            <div v-if="cart" class="row">
              <div class="col-12">
                <div>
                  <div
                    class="cart-item white-widget row"
                    v-for="(item, i) in cart['details']"
                    :key="i"
                  >
                    <div class="col-md-2 col-2">
                      <img :src="item.product_thumb + + '/h110-w110'" class="'img-thumbnail img-fluid rounded" />
                    </div>
                    <div class="col-md-8 col-6">
                      <h4>{{item.product_name}}</h4>

                      <span
                        v-if="item.special"
                        class="special_excluding_tax product-price"
                      >{{item.special_formatted}}</span>

                      <span
                        v-bind:class="{ 'has_special': item.special}"
                        class="product-price"
                      >{{item.price_formatted}}</span>

                      <div class="qty-update-group">
                        <div class="input-group" v-show="!item.free_gift">
                          <span class="input-group-btn">
                            <button
                              type="button"
                              class="btn btn-number"
                              data-type="minus"
                              @click="decreaseCartItemQty(item)"
                            >
                              <span class="fa fa-minus"></span>
                            </button>
                          </span>
                          <input
                            type="number"
                            class="form-control input-number"
                            value="1"
                            v-model="item.quantity"
                            min="1"
                            @change="onChange(item)"
                            max="1000"
                          />
                          <span class="input-group-btn">
                            <button
                              type="button"
                              @click="increaseCartItemQty(item)"
                              class="btn btn-number"
                              data-type="plus"
                            >
                              <span class="fa fa-plus"></span>
                            </button>
                          </span>
                        </div>
                      </div>

                    </div>
                     <div class="col-md-2 col-4 text-right">
                       <h4>{{item.total_formatted}}</h4>
                      <a @click="deleteCartItem(item,i)" class="btn delete-cart-item">
                        <span class="fa fa-trash"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 total" v-if="cart && cart.details.length">
                <ul class="cart-total list-group">
                  <li
                    class="list-group-item"
                    :class="totalItem.code"
                    v-for="(totalItem, i) in cart['totals']"
                    :key="i"
                  >
                    {{totalItem.title}} :
                    <span class="float-right">{{totalItem.text}}</span>
                  </li>
                  <li v-if="cart.coupon" class="list-group-item ttl-cart">
                    <p>Mã giảm giá:</p>
                    <h4>{{cart.coupon}}</h4>
                    <a
                      title="Xoá mã giảm giá này"
                      @click="removeCoupon()"
                      class="text-danger"
                    >Xoá mã</a>
                  </li>
                </ul>

                <nuxt-link
                  v-if="cart.details && cart.details.length"
                  to="/checkout/shipping"
                  class="btn mt-10 btn-danger btn-lg btn-block"
                >Tiến hành đặt hàng</nuxt-link>
              </div>
            </div>

            <div v-if="!cart" class="empty-page-warning">
              <div class="empty-page-content">
                <span>
                  <img src="~/assets/images/shopping-empty.svg" alt />
                </span>
                <h4>
                  Giỏ hàng trống,
                  <nuxt-link to="/product">bấm vào đây để mua hàng</nuxt-link>
                </h4>
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
import { mapState, mapActions } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      coupon: "",
      reward: null,
      cart: null,
      giftProduct: {},
      promotions: null,
      giftInCart: false
    };
  },
  computed: mapState({
    user: state => state.user.user
  }),
  components: {},
  created() {
    this.getCart();
  },
  methods: {
    increaseCartItemQty(item) {
      item.quantity++;
      this.updateCartItemQty(item);
    },

    decreaseCartItemQty(item) {
      item.quantity--;
      this.updateCartItemQty(item);
    },
    updateCartItemQty(item) {
      this.$store
        .dispatch("cart/updateCartItemQty", {
          product_id: item.product_id,
          quantity: item.quantity
        })
        .then(() => {
          this.$toast.success("Cập nhật số lượng thành công").goAway(1500);
          this.getCart();
        })
        .catch(err => {
          // this.$toast.error("Không thể cập nhật số lượng").goAway(1500);
          // //console.log("Không thể cập nhật số lượng item :", err);
        });
    },
    onChange(item) {
      this.updateCartItemQty(item);
    },

    deleteCartItem(item, index) {
      this.$store
        .dispatch("cart/deleteCartItem", {
          key: item.id,
          index: index
        })
        .then(() => {
          this.$toast.success("Xoá sản phẩm thành công").goAway(1500);
          this.getCart();
        })
        .catch(err => {
          // //console.log("Không thể xoá cart item :", err);
        });
    },
    addCoupon() {
      this.$store
        .dispatch("cart/addCoupon", {
          coupon: this.coupon
        })
        .then(() => {
          this.$toast
            .success("Xin chúc mừng, bạn đã được giảm giá")
            .goAway(1500);
          this.getCart();
        })
        .catch(err => {
          // this.$toast.error(err).goAway(1500);
        });
    },
    addReward() {
      this.$store
        .dispatch("app/postData", {
          param: "/reward",
          data: {
            reward: this.reward
          }
        })
        .then(() => {
          this.$toast
            .success("Xin chúc mừng, bạn đã đổi điểm thành công")
            .goAway(1500);
          this.getCart();
        })
        .catch(err => {
          // this.$toast.error(err).goAway(1500);
        });
    },
    getCart() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("cart/getCart")
        .then(res => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // //console.log("cart:", res);
          if (res) {
            this.cart = res;
            // this.getFreeProductPromotion();
          } else {
            this.cart = null;
          }
        })
        .catch(err => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast.error("Không thể thực thi").goAway(1500);
        });
    },
    getFreeProductPromotion() {
      try {
        let promotions;
        promotions = this.cart.data.totals.filter(pro => {
          return (
            pro.promotions &&
            pro.promotions["1"]["mainSelect"] == "add_product_cart"
          );
        });
        if (promotions) {
          this.promotions = promotions;

          promotions.forEach(promotionItem => {
            // //console.log("Chương trình:", promotionItem);
            if (
              promotionItem.promotions["1"] &&
              promotionItem.promotions["1"]["product"][0]
            ) {
              const productId = promotionItem.promotions["1"]["product"][0];
              // //console.log("product id:", productId);

              // auto add to card
              // check product_id chua ton tai trong gio hang.
              const isAddedToCard = this.cart.data.products.find(pro => {
                // //console.log("cart item pro ", pro.product_id, " + ", productId);
                return pro.product_id == productId;
              });
              // //console.log("isAddedToCard:", isAddedToCard);
              if (!isAddedToCard) {
                // //console.log("tu dong them qua vao gio hang:", isAddedToCard);
                this.addToCart(productId);
              } else {
                this.giftInCart = true;
              }
              this.getGiftProduct(productId);
            }
          });

          if (promotions["1"] && promotions["1"]["product"]) {
            const productId = promotions["1"]["product"][0];
            // get product

            // this.getGiftProduct(productId);
          }
        }
      } catch (error) {
        // //console.log("error get gift:", error);
      }
    },
    addToCart(id) {
      this.$store
        .dispatch("app/postData", {
          param: "/cart",
          data: {
            product_id: id,
            quantity: 1
          }
        })
        .then(res => {
          this.getCart();
        })
        .catch(err => {});
    },
    getGiftProduct(id) {
      this.$store.dispatch("products/detail", { id: id }).then(data => {
        this.giftProduct = data;
        this.cart.data.products.forEach(item => {
          if (this.giftProduct.id == item.product_id) {
            item["free_gift"] = true;
            this.giftInCart = true;
          }
        });
      });
    },
    removeCoupon() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("cart/removeCoupon")
        .then(res => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.getCart();
        })
        .catch(err => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast.err("Không thể thực thi").goAway(1500);
        });
    }
  },
  head: {
    title: "Giỏ hàng"
  }
};
</script>

<style lang="scss" scope>
  .input-group-btn{
    .btn{
      background-color: #ccc;
      padding: 2px 5px;
      font-size: 0.8rem;
      line-height: 1.5;
    }
  }
  .input-number{
    border: none;
    height: 25px;
    padding: 0;
  }
</style>