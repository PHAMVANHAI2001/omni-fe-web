<template>
  <main role="main">
      <div class="main-page container" v-if="order">
        <div class="row">
            <div class="col-lg-8 col-md-7 col-sm-6 d-block">
                <div class="block-section">
                    <b>Đơn hàng: {{order['code']}}</b>
                    <div class="order-product-list">
                        <div class="section p-0">
                            <div v-for="(item, i) in order['details']" :key="i">
                                <div class="news-item  px-2 w-100  mb-2 pt-0">
                                <div class="news-image max-width-70 mr-2 position-relative">
                                    <a>
                                    <img
                                        class="img-fluid box-shadow-none"
                                        :src="item.thumbnail + `/h110-w110`"
                                        :alt="item.product_name"
                                    />
                                    </a>
                                </div>
                                <div class="news-summary w-100">
                                    <div class="d-flex justify-content-space-between w-100">
                                    <div class="col-md-9 col-7" style="padding: 0 !important"
                                    >
                                        <h4 class="font-weight-bold color-555 font-12">
                                        <a class="title-product">
                                            {{ item.product_name }} x {{ item.qty }}
                                        </a>
                                        </h4>
                                    </div>

                                    <div
                                        class="col-md-3 col-5"
                                        style="padding: 0 !important"
                                    >
                                        <div class="total-price-product">
                                        <h4
                                            style="text-align: right !important; color: #006e43"
                                        >
                                            {{ item.total_formatted }}
                                        </h4>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block-section">
                    <b>Chọn hình thức thanh toán</b>
                    <!-- <div class="content" id="accordion"> -->
                        <div class="custom-control custom-radio">
                            <div v-for="(item, i) in payments" :key="i">
                                <div v-for="(itemStatus, j) in paymentStatus" :key="j">
                                    <div class="card-list" v-if="item['code'] == itemStatus['key'] && itemStatus['value'] == 1">
                                        <input  type="radio"
                                                class="custom-control-input"
                                                @click="onChecked(item.code)"
                                                v-model="payment_method"
                                                :value="item.code"
                                                :id="item.code"
                                                data-toggle="collapse">
                                        <label class="custom-control-label transporters" :for="item.code">{{item.name}}
                                        <img
                                                :src="
                                                    require(`assets/images/icon-payment/` +
                                                    item.thumbnail_asset)
                                                "
                                                class="icon-payment-30"
                                                />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- </div> -->
                </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-6">
                <div class="fixed-cart">
                    <div class="border-block mb-5">
                        <div class="order-prices mb-0">
                            <section class="section">
                                <b class="mb-1 title-main pb-1 p-0 text-left"
                                >Địa chỉ giao hàng</b>
                                <div class="list-group">
                                    <div class="cs-tran">
                                        <b>{{order['shipping_address_full_name']}} | {{order['shipping_address_phone']}}</b>
                                        <br/>
                                        <span>{{order['shipping_address']}}</span>
                                    </div>
                                </div>
                            </section>
                            <div class="total-padding-mobile-676" v-if="order">
                                <span class="line-4 d-block mt-2 row"></span>
                                <ul>
                                    <li
                                    class="list-group-item"
                                    :class="totalItem.code"
                                    v-for="(totalItem, i) in order['totals']"
                                    :key="i"
                                    >
                                    {{ totalItem.title }} :
                                    <span class="float-right">
                                        <strong>{{ totalItem.text }}</strong>
                                    </span>
                                    </li>
                                </ul>
                            </div>
                            <a class="payment_sub text-white text-center mt-1 d-block" style="width: 100%; border-radius:26px;height: 60px;" >
                                <div class="btn-checkout">
                                    <b-button
                                    @click="rePayment"
                                    block
                                    class="btn btn-lg btn-nuti"
                                    >Thanh toán lại</b-button
                                    >
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <transactionProcessor></transactionProcessor>
  </main>
  <!-- /.container -->
</template>

<script>
import { isMobile } from "~/plugins/util";
import transactionProcessor from "~/pages/checkout/transactionProcessor";
export default {
  components: {
    transactionProcessor
  },
  head: {
    title: "Thông tin thanh toán",
  },
  data() {
    return {
      order: null,
      paymentStatus: null,
      payments: null,
      payment_method: null,
      order_channel: 'WEB',
      isMobile: null,
    };
  },
  created() {
    this.getOrder();
    this.getPayment();
    this.getPaymentStatus();
  },
  mounted() {
      if (!process.server) {
      this.isMobile = isMobile();
      this.order_channel = this.isMobile == true ? 'MWEB' : 'WEB';

    }
  },
  methods: {
    getOrder() {
      const id = this.$route.params["id"];
      this.$store.dispatch("order/getOrderDetail", id).then((data) => {
        this.order = data;
      });
    },
    onChecked(value) {
      this.payment_method = value;
    },
    getPaymentStatus() {
      this.$store.dispatch("cart/getSettingSystem", `PAYMENT-STATUS`)
        .then((data) => {
          this.paymentStatus = data['data']['data'];
        });
    },
    getPayment() {
      this.$store.dispatch("cart/getPaymentMethod").then((data) => {
        this.payments = data;
      });
    },
    rePayment() {
        if(!this.payment_method) {
            this.$swal({
              icon: "warning",
              text: "Vui lòng chọn phương thức thanh toán!",
              confirmButtonText: "Xác nhận",
            }).then(() => {
                this.$nextTick(() => {});
            });
        }
        if(this.payment_method == 'CASH' || this.payment_method == 'bank_transfer') {
            
        }else {
          this.checkoutPayments(this.order)
        }
    },
     checkoutPayments(dataOrder) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      let data = {
        order_id: dataOrder["id"],
        payment_method: this.payment_method,
        type: "PAYMENT",
        device: this.order_channel,
        url: `${process.env.BASE_URL}/checkout/checkout-payment`,
      };
      this.$store.dispatch("cart/checkoutPayments", data)
      .then((res) => {
       this.$store.dispatch("app/showLoadingOverlay", false);
       if(this.payment_method == 'VNPAY') {
         window.location.href = res && res['data'] && res['data']['payUrl'];
       }
       if(res && res['data'] && res['data']['payment_method'] != 'VNPAY' && this.order_channel == 'MWEB') {
         window.location.href = res && res['data'] && res['data']['url_payment_qr_app'];
       }
       if(this.order_channel != 'MWEB') {
        res && res['data'] ? this.showTransactionModal(res['data']) : '';
       }
      })
      .catch((err) => console.log(err))
    },
    showTransactionModal(data) {
      this.$store.commit("cart/showTransactionProcessor", data);
    },
    checkoutIndirectPayment(dataOrder) {
      let data = {
        order_id: dataOrder["id"],
        payment_method: this.payment_method,
        url: `${process.env.BASE_URL}/checkout/checkout-payment`,
      };
      this.$store.dispatch("order/indirectPayment", data)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          window.location.href = data.payUrl;
        })
        .catch((err) => {
          console.log("error checkout payment order:", err);
        });
    },
  },
};
</script>
<style lang="scss">
.cart-item {
  padding: 5px 0;
  border-bottom: 1px solid rgb(230, 230, 230);
  h4 {
    font-size: 1rem;
  }
}
.cs-tran {
    padding: 0px 11px;
  }
.custom-control-label {
    padding-left: 10px;
}
.custom-control-label p {
    font-size: 12px;
    color: gray;
}
.custom-control-label h5 {
    font-size: 14px !important;
}
.transporters {
    font-weight: 400;
}
</style>
