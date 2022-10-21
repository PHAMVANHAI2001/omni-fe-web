<template>
  <main role="main">
    <div class="header-app">
      <div class="container">
        <h4>Đơn hàng của bạn</h4>
      </div>
    </div>
    <div class="main-page container">
      <div class="container" id="form-address-shiping">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="alert alert-info" role="alert">
              Quý khách vui lòng đăng ký thành viên để xem tất cả thông tin đơn
              hàng của quý khách
            </div>

            <div class="block-section">
              <h5>
                Vui lòng nhập 4 số cuối của mã đơn hàng đã được gửi cho quý
                khách qua email
              </h5>

              <form>
                <div class="form-group input-order-code">
                  <input
                    type="tel"
                    id="txtphone"
                    ref="txtphone"
                    :autofocus="'autofocus'"
                    placeholder="●●●●"
                    @input="getOrderByPhone($event)"
                    autocomplete="off"
                    maxlength="4"
                    name="4 số cuối của mã đơn hàng"
                    v-md-style
                    class="form-control"
                    style="flex:1"
                  />
                </div>
                <div class="alert alert-danger" role="alert" v-if="error">
                  {{ error.error }}
                </div>

                <!-- <div class="btn-checkout">
                    <b-button
                      type="submit"
                      block
                      class="btn btn-primary btn-lg"
                    >Xem đơn hàng</b-button>
                </div>-->
              </form>
            </div>
            <div class="block-section" v-if="order && order.length">
              <div class="container">
                <div class="row">
                  <div class="col d-flex justify-content-center">
                    <ul class="list-unstyled d-flex">
                      <li class="flex-fill active border-bottom border-success">
                        <a>Thông tin đơn hàng</a>
                      </li>
                      <!-- <li class><a>Phiếu mua hàng</a></li>
                      <li><a>Đơn hàng mua dùm</a></li>-->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class v-if="order">
              <div v-for="(item, i) in order" :key="i">
                <div class="block-section">
                  <div class="row border-bottom">
                    <div class="col-md-9 justify-content-left order-code">
                      <div class="d-flex flex-column">
                        <label>
                          <b>#ĐH {{ item.code }}</b>
                        </label>
                      </div>

                      <div class="d-flex flex-column">
                        <h6>
                          <b>Phương thức thanh toán: </b>
                          <i class="fa fa-bitcoin text-warning"></i>
                          {{ item.payment_method_name }}
                        </h6>
                      </div>
                      <div class="d-flex">
                        <b>Người nhận: </b>
                        <p class="text-muted">
                          {{ item.shipping_address_full_name }}
                        </p>
                      </div>
                      <div>
                        <b>Địa chỉ: </b>
                        <p class="text-muted">{{ item.shipping_address }}</p>
                      </div>
                      <div class="d-flex">
                        <b>Nhà phân phối: </b>
                        <p class="text-muted">{{ item.distributor_name }}</p>
                      </div>
                      <div class="d-flex">
                        <b>Đặt hàng lúc: </b>
                        <p class="text-muted">{{ item.created_at }}</p>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label>
                        <b>Trạng thái đơn hàng</b>
                        <span
                          class="badge badge-success"
                          v-if="
                            item.status == 'COMPLETED' ||
                              item.status == 'SHIPPED'
                          "
                          >Giao hàng thành công</span
                        >
                        <span
                          class="badge badge-info"
                          v-if="item.status == 'APPROVED'"
                          >Đã xác nhận</span
                        >
                        <span
                          class="badge badge-warning"
                          v-if="item.status == 'SHIPPING'"
                          >Đang giao hàng</span
                        >
                        <span
                          class="badge badge-danger"
                          v-if="item.status == 'CANCELED'"
                          >Đã huỷ</span
                        >
                        <span
                          class="badge badge-warning"
                          v-if="item.status == 'NEW'"
                          >Chờ xử lý</span
                        >
                      </label>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(itm, i) in item.details"
                    :key="`D` + i"
                  >
                    <div class="col-md-8 col-8 justify-content-left">
                      <div class="d-flex bd-highlight">
                        <div class="p-2">
                          <img
                            v-bind:src="itm.thumbnail"
                            alt
                            style="width: 80px;"
                          />
                        </div>
                        <div class="d-flex flex-column p-2">
                          <p>{{ itm.product_name }}</p>
                          <p class="text-muted">Số lượng: {{ itm.qty }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 col-4 justify-content-right p-2">
                      <div class="d-flex flex-column">
                        <p class="text-danger text-right">
                          {{ itm.total_price_formatted }}
                        </p>
                        <span
                          v-if="itm.total > 0"
                          v-bind:class="{ has_special: itm.total > 0 }"
                          class="product-price text-right"
                          >{{ itm.total_formatted }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(itm, i) in item.totals"
                    :key="`T` + i"
                  >
                    <div
                      class="col-md-8 col-8 justify-content-right text-right"
                    >
                      {{ itm.title }}:
                    </div>
                    <div
                      class="col-md-4 col-4 justify-content-left text-danger text-right"
                    >
                      {{ itm.text }}
                    </div>
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
import Skeleton from "~/components/Skeleton";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { debounce } from "debounce";
export default {
  components: {
    skeleton: Skeleton,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      order_code: null,
      phone: "",
      error: null,
      order: null,
    };
  },
  mounted() {
    this.formfocus();
  },
  created() {},
  methods: {
    formfocus() {
      this.$refs.txtphone.focus();
    },
    getOrderByPhone: debounce(function($event) {
      this.error = null;
      this.phone = localStorage.getItem("phone");
      this.order_code = $event.target.value;
      this.order = null;

      if (!this.order_code || (this.order_code && this.order_code.length < 4)) {
        return false;
      }
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch(
          "app/fetchData",
          `/v1/client/order-by-phone/${this.phone}?order_code=${this.order_code}`
        )
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (resp["data"] && resp["data"].length == 0) {
            this.error = {
              name: null,
              error:
                "Không tìm thấy thông tin đơn hàng, vui lòng nhập đúng 4 số cuối của mã đơn hàng đã gửi qua email và được mua bằng số điện thoại " +
                this.phone,
            };
          } else {
            this.order = resp["data"];
            // fill vào form.
          }
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("error confirm order:", err);
        });
    }),
    goBack() {
      window.history.back();
    },
  },
  head: {
    title: "Thông tin đơn hàng",
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
.text-muted {
  font-size: 0.9em;
  display: contents;
}
#txtphone {
  font-size: 33px;
  border: none;
  background: #f9f9f9;
  outline: none;
  text-align: center;
  letter-spacing: 20px;
  width: 50%;
  margin: 0 auto;
  border-radius: 30px;
  &:focus {
    box-shadow: none;
  }
}
.register-link {
  color: rgb(216, 12, 12) !important;
  text-decoration: underline !important;
}
.input-order-code {
  margin-top: 20px;
}
h5 {
  font-size: 13px;
  text-align: center;
}
</style>
