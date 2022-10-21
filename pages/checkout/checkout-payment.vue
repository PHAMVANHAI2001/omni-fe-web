<template>
  <div class="container">
    <div class="row justify-content-center section">
      <div class="block-section text-center col-md-12 p-5">
        <div class="col-md-6 mx-auto">
          <div class="error-block" v-if="paramQuery['status'] != 'success'">
            <div class="info">
                <h2 class='text-danger'>Thanh toán không thành công</h2>
                <span class="pull-left mt-2 clear width-full d-block border-radius pt-2 pb-2 mb-2"
                      style=" background: rgb(255, 241, 241); color: rgb(0, 0, 0);"
                    > <p class="text-danger m-0">Thanh toán thất bại.</p>
                      Vui lòng thanh toán lại hoặc chọn phương thức thanh toán khác
                </span>
            </div>
            
            <div class="order-info-fail">
              <div class="row">
                <div class="col-sm-4 text-left">
                  <p>Mã đơn hàng</p>
                </div>
                <div class="col-sm-8 text-right">
                  <b>{{ paramQuery['code'] }}</b>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 text-left">
                  <p>Phương thức thanh toán</p>
                </div>
                <div class="col-sm-6 text-right">
                  <b>{{ paramQuery['payment_method'] }}</b>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4 text-left">
                  <p>Tổng thanh toán</p>
                </div>
                <div class="col-sm-8 text-right">
                  <b>{{ paramQuery['price'] | formatNumber }} đ</b>
                </div>
              </div>
            </div>
          </div>
          <img v-if="paramQuery['status'] == 'success'" src="~/assets/images/staff.jpg" alt="" />
          <h2 class="text-success" v-if="paramQuery['status'] == 'success'">Thanh toán thành công</h2>
          <span v-if="paramQuery && paramQuery['payment_amount']">Số tiền đã thanh toán: <b>{{ paramQuery['payment_amount'] }}</b></span>
          <p v-if="paramQuery['status'] == 'success'">Cảm ơn bạn đã sử dụng dịch vụ thanh toán online của chúng tôi</p>
          <button
            @click="goBack"
            block
            class="btn btn-lg btn-block btn-danger"
            v-bind:class="{ 'btn-secondary': paramQuery['status'] == 'success'}"
            >{{ paramQuery['status'] == 'success' ? 'Tiếp tục mua hàng' : 'Thanh toán lại'}}</button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramQuery: null,
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
  },
  components: {},
  created() {
     this.paramQuery = this.$route.query;
     console.log('this.paramQuery', this.paramQuery);
    this.checkConfirm();
  },
  methods: {
    checkConfirm() {
      this.$store.dispatch('cart/getCart').then((data) => {
            console.log('data', data);
            setTimeout(() => {
              this.paramQuery['status'] == 'success' ? this.sendNotifyToAdmin() : this.$store.dispatch("app/showLoadingOverlay", false);
            }, 1000)
          });
    },
    sendNotifyToAdmin() {
      console.log("send socket...");
      /* Emit events */
      const that = this;
      this.socket.emit(
        "ecom_sytem_message",
        {
          event: "NEW_ORDER",
          user_code: that.paramQuery['distributor_code'],
          message: `Khách hàng ${that.paramQuery['full_name']} đã đặt hàng thành công.`,
        },
        (resp) => {
          /* Handle response, if any */
          console.log("send socket success:", resp);
        }
      );
    },
    viewOrderRePayment() {
      this.$router.push(`/checkout/repayment/${this.paramQuery['order_id']}`);
    },
    goBack() {
      this.paramQuery['status'] == 'success' ? this.$router.push("/") : this.viewOrderRePayment();
    },
  },
};
</script>

<style lang="scss"></style>
