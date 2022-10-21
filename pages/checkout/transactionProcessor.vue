<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="transaction-modal"
      id="transaction-modal"
      hide-footer
      no-close-on-backdrop
    >
      <div
        slot="modal-title"
        class="d-flex"
        v-if="payment_method != 'bank_transfer'"
      >
        <div class="col-md-8 d-flex">
          <img
            :src="require(`assets/images/icon-payment/` + thumbnail_asset)"
            class="icon-payment"
          />
          <p class="m-0 font-weight-bold title">{{ title }}</p>
        </div>
        <div class="col-md-6">
          <button class="qr_btn" @click="viewOrderRePayment">
            Đổi phương thức khác
          </button>
        </div>
      </div>
      <div
        slot="modal-title"
        class="d-flex"
        v-if="payment_method == 'bank_transfer'"
      >
        <div class="col-md-12 d-flex">
          <img
            :src="require(`assets/images/icon-payment/` + thumbnail_asset)"
            class="icon-payment mr-2"
          />
          <p class="m-0 font-weight-bold title">{{ title }}</p>
        </div>
      </div>
      <div class="content" id="accordion">
        <div class="row">
          <div class="col-6">
            <h4 class="font-weight-bold">THÔNG TIN THANH TOÁN</h4>
            <div class="form-group m-0">
              Số tài khoản: <b>{{ virtual_account_code }}</b>
            </div>
            <br />
            <div class="form-group m-0">
              Ngân hàng:
              <b
                >VPBANK-Ngân Hàng TMCP <br />
                Việt Nam Thịnh Vượng</b
              >
              <img
                class="iconVpbank"
                src="../../assets/images/icon-payment/vpbank.svg"
                alt=""
              />
            </div>
            <br />
            <div class="form-group m-0">Người thụ hưởng: <b>NUTIFOOD</b></div>
            <br />
            <div class="form-group m-0">
              Tổng thanh toán: <b>{{ total_price | formatNumber }} đ</b>
            </div>
            <br />
            <div class="form-group m-0">
              Nội dung chuyển khoản: <b>{{ order_code }}&nbsp;{{ phone }}</b>
            </div>
            <br />
          </div>
          <div class="col-6">
            <h4 class="font-weight-bold">HƯỚNG DẪN THANH TOÁN</h4>
            <p class="mb-0">
              <b>Quý khách vui lòng thực hiện các bước sau:</b>
            </p>
            <b><i class="fa fa-check color-nuti"></i> Bước 1:</b>
            <p>Mở Mobile hoặc Web Banking</p>
            <b><i class="fa fa-check color-nuti"></i> Bước 2:</b>
            <p>
              Chọn hình thức Chuyển tiền bằng <br />
              số tài khoản
            </p>
            <b><i class="fa fa-check color-nuti"></i> Bước 3:</b>
            <p>Nhập đầy đủ, chính xác số tiền và thông tin thanh toán</p>
          </div>
        </div>
        <div class="row justify-content-center" v-if="payment_method == 'bank_transfer'">
            <b>Giao dịch kết thúc sau</b>
            <no-ssr>
              <flip-countdown
                :deadline="time_payment_qr"
                :showDays="false"
                :showHours="false"
                @timeElapsed="timeElapsedHandler"
              ></flip-countdown>
            </no-ssr>
        </div>
        <div class="row" v-if="payment_method != 'bank_transfer'">
          <div class="col-md-6">
            <div class="qr_content">
              <img
                v-if="payment_method == 'SPP'"
                width="220px"
                :src="url_payment_qr"
                class="img-thumbnail"
              />
              <img
                v-if="payment_method != 'SPP'"
                width="220px"
                :src="`http://api.qrserver.com/v1/create-qr-code/?data=${url_payment_qr}&size=300x300`"
                class="img-thumbnail"
              />
              <div class="qr__amount mt-2 pb-10">
                <span class="float-left">Tổng tiền:</span>
                <p class="float-right font-weight-bold">
                  {{ total_price | formatNumber }} đ
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h4 class="font-weight-bold">Quét mã QR để thanh toán</h4>
            <b>Bước 1</b>
            <p>
              Mở <b>Ứng dụng {{ payment_method_name }}</b> trên điện thoại
            </p>
            <b>Bước 2</b>
            <p>
              Trên {{ payment_method_name }}, chọn biểu tưởng
              <img
                class="iconScan"
                src="../../assets/images/icon-payment/scan.png"
                alt=""
              /><b> Quét mã</b>
            </p>
            <b>Bước 3</b>
            <p>Quét mã QR ở trang này và thanh toán</p>
            <div class="timeContent">
              <p>Giao dịch kết thúc sau</p>
              <no-ssr>
                <flip-countdown
                  :deadline="time_payment_qr"
                  :showDays="false"
                  :showHours="false"
                  @timeElapsed="timeElapsedHandler"
                ></flip-countdown>
              </no-ssr>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import FlipCountdown from "vue2-flip-countdown";
export default {
  components: {
    FlipCountdown,
  },
  data() {
    return {
      modalShow: false,
      isDisable: true,
      url_payment_qr: null,
      url_payment_qr_app: null,
      time_payment_qr: "2021-08-25 00:01:28",
      payment_method: null,
      payment_method_name: null,
      total_price: null,
      order_code: null,
      thumbnail_asset: "momo.png",
      title: null,
      order_id: null,
      statusQuery: 0,
      redirect_url: null,
      requestModal: 0,
      uid_payment: null,
      virtual_account_code: null,
      phone: null,
    };
  },

  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "cart/showTransactionProcessor") {
        console.log("xxxx", mutation.payload);
        setTimeout(() => {
          this.modalShow = true;
          this.url_payment_qr =
            mutation["payload"] &&
            mutation["payload"]["payment_method"] == "SPP"
              ? mutation["payload"] && mutation["payload"]["url_payment_qr"]
              : encodeURIComponent(
                  mutation["payload"] && mutation["payload"]["url_payment_qr"]
                );
          this.url_payment_qr_app =
            mutation["payload"] && mutation["payload"]["url_payment_qr_app"];
          var d1 = new Date();
          var d2 = new Date(d1);
          d2.setMinutes(d1.getMinutes() + 5);
          this.time_payment_qr =
            d2.getFullYear() +
            "-" +
            ("0" + (d2.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + d2.getDate()).slice(-2) +
            " " +
            ("0" + d2.getHours()).slice(-2) +
            ":" +
            ("0" + d2.getMinutes()).slice(-2) +
            ":" +
            ("0" + d2.getSeconds()).slice(-2);
          this.payment_method =
            mutation["payload"] && mutation["payload"]["payment_method"];
          this.payment_method_name =
            mutation["payload"] && mutation["payload"]["payment_method_name"];
          this.total_price =
            mutation["payload"] && mutation["payload"]["total_price"];
          this.order_code =
            mutation["payload"] && mutation["payload"]["order_code"];
          this.thumbnail_asset =
            mutation["payload"] && mutation["payload"]["thumbnail_asset"];
          this.title = mutation["payload"] && mutation["payload"]["title"];
          this.order_id =
            mutation["payload"] && mutation["payload"]["order_id"];
          this.uid_payment =
            mutation["payload"] && mutation["payload"]["uid_payment"];
          this.virtual_account_code =
            mutation["payload"] && mutation["payload"]["virtual_account_code"];
          this.phone = mutation["payload"] && mutation["payload"]["phone"];
          this.requestQueryStatus();
        }, 250);
      }
    });
  },
  methods: {
    closemodal() {
      this.modalShow = false;
    },
    viewOrderRePayment() {
      this.statusQuery = 3;
      this.modalShow = false;
      this.$router.push(`/checkout/repayment/${this.order_id}`);
    },
    requestQueryStatus() {
      const itevl = setInterval(() => {
        if (this.statusQuery != 0) {
          clearInterval(itevl);
          this.modalShow = false;
          if (this.statusQuery == 1 || this.statusQuery == 2) {
            window.location.href = this.redirect_url;
          }
          if (this.statusQuery == 3) {
            this.viewOrderRePayment();
          }
        }
        if (!this.modalShow) {
          clearInterval(itevl);
          return;
        }
        if (this.statusQuery == 0 && this.modalShow) {
          this.queryStatusPayment();
        }
      }, 3000);
    },
    queryStatusPayment() {
      let data = {
        order_code: this.order_code,
        type: this.payment_method,
        url: `${process.env.BASE_URL}/checkout/checkout-payment`,
        uid_payment: this.uid_payment,
      };
      this.$store
        .dispatch("cart/queryStatusPayment", data)
        .then((res) => {
          this.statusQuery = res && res["status"];
          this.redirect_url = res && res["redirect_url"];
        })
        .catch((err) => {
          this.statusQuery = 2;
        });
    },
    timeElapsedHandler: function () {
      this.queryStatusPayment();
      this.statusQuery = 2;
      this.modalShow = false;
      this.$swal({
        title: "Đặt hàng thành công",
        text: "Cảm ơn quý khách đã đặt hàng tại NutifoodShop.com",
        icon: "success",
        confirmButtonText: "Xác nhận",
      }).then((result) => {
        this.$router.push("/");
      });
    },
  },
};
</script>
<style scoped>
.iconScan {
  width: 20px;
}
.timeContent {
  background: rgb(255, 245, 236);
  border-radius: 4px;
  padding: 13px 0px;
  display: block;
  text-align: center;
  margin-top: 40px;
}
.qr_content {
  background: rgb(242, 242, 242);
  border-radius: 20px;
  padding: 20px;
  margin-right: 30px;
}
.icon-payment {
  width: 50px;
}
.title {
  line-height: 40px;
}
.qr_btn {
  display: inline-block;
  color: #006e43;
  font-size: 14px;
  text-decoration: none;
  float: left;
  line-height: 40px;
}
.iconVpbank {
  width: 80px;
}
</style>
