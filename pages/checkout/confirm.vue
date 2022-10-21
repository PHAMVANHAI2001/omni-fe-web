<template>
  <main role="main" class="container">
    <div class="step-checkout-section">
      <div class="container">
        <div class="row checkout-step">
          <div class="col d-flex justify-content-center">
            <ul class="progressbar">
              <li class="active">
                <nuxt-link to="/checkout/cart">Giỏ hàng</nuxt-link>
              </li>
              <li class="active">
                <nuxt-link to="checkout/shipping">Giao hàng</nuxt-link>
              </li>
              <li class="active">
                <nuxt-link to="checkout/payment">Thanh toán</nuxt-link>
              </li>
              <li class="active">Xác nhận</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="orderReview">
      <div class="col-md-12">
        <div class="block-style-2">
          <h4 class="block-style-style-2">Đơn hàng</h4>

          <table class="table table-bordered confirm-table">
            <thead>
              <tr>
                <th>Mặt hàng</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in orderReview.details" :key="i">
                <td>
                  {{item.product_name}}
                  <div>
                    <span
                      v-if="item.promotion_price > 0"
                      class="special_excluding_tax product-price"
                    >{{item.special_formatted}}</span>

                    <span
                      v-bind:class="{ 'has_special': item.promotion_price > 0}"
                      class="product-price"
                    >{{item.price_formatted}}</span>
                  </div>
                </td>
                <td>{{item.quantity}}</td>
                <td>
                  <div>
                    <span>{{item.total_formatted}}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr :class="totalItem.code" v-for="(totalItem, i) in orderReview['totals']" :key="i">
                <td colspan="2">{{totalItem.title}}</td>
                <td>{{totalItem.text}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="col-md-6">
        <div class="block-style-2">
          <h4 class="block-style-style-2">ĐỊA CHỈ GIAO HÀNG</h4>
          <p>
            <strong>Người nhận:</strong>
            {{orderReview.shipping_address_full_name}}
          </p>
          <p>
            <strong>Tỉnh/Thành Phố:</strong>
            {{orderReview.shipping_address_city}}
          </p>
          <p>
            <strong>Quận/Huyện:</strong>
            {{orderReview.shipping_address_district}}
          </p>
          <p>
            <strong>Địa chỉ:</strong>
            {{orderReview.street_address}}
          </p>
          <p>
            <strong>Phone:</strong>
            {{orderReview.phone}}
          </p>
        </div>
      </div>

      <div class="col-md-6">
        <div class="block-style-2">
          <h4 class="block-style-style-2">HÌNH THỨC THANH TOÁN</h4>

          <p>{{orderReview.payment_method_name}}</p>

          <h4 class="block-style-style-2">HÌNH THỨC GIAO HÀNG</h4>

          <p>{{orderReview.shipping_method_name}}</p>
        </div>
      </div>

      <div class="col-md-12 text-center">
        <div class="btn-checkout">
          <button type="button" @click="submitOrder()" class="btn btn-danger btn-lg">ĐẶT HÀNG</button>
        </div>
        <p>(Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt Mua)</p>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import Logo from "~/components/Logo.vue";
import { mapMutations } from "vuex";
export default {
  middleware: "authenticated",
  data() {
    return {
      orderReview: null
    };
  },
  components: {},
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("cart/getCart")
        .then(res => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // //console.log("orderReview:", res);
          if (res) {
            this.orderReview = res;
          } else {
            this.cart = null;
            this.$toast.error("Giỏ hàng trống").goAway(1500);
            this.$router.push("/");
          }
        })
        .catch(err => {
          // //console.log("get cart err:", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast.error("Không thể thực thi").goAway(1500);
        });
    },
    submitOrder() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/updateData", {
          param: "/v1/confirm-order",
          data: { order_channel: "WEB" }
        })
        .then(data => {
          // //console.log("dat hang thanh cong:", data);
          this.$store.dispatch("cart/getCart");
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$swal({
            title: "ĐẶT HÀNG THÀNH CÔNG",
            icon: "success",
            focusConfirm: true,
            confirmButtonText: "TIẾP TỤC"
          }).then(result => {
            // //console.log("confirm order :", data);
            this.$router.push("/user/order/" + data.order_id);
          });

          // //console.log("Create order success");
        })
        .catch(err => {
          // //console.log("confirm order error:", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    goBack() {
      window.history.back();
    }
  },
  head: {
    title: "Xác nhận đơn hàng"
  }
};
</script>

<style lang="scss">
.btn-checkout {
  button {
    width: 40%;
  }
}
</style>
