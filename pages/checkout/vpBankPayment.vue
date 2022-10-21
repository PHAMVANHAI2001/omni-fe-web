<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="vpBankPayment-modal"
      id="vpBankPayment-modal"
      title="Vui lòng nhập chi tiết thanh toán"
      hide-footer
    >
      <button
        type="button"
        class="btn btn-close"
        data-dismiss="modal"
        @click="closemodal"
      >
        <i class="fa fa-close"></i>
      </button>
      <div class="content row">
        <div class="col-md-6 col-sm-12">
            Số thẻ:
            <input
              type="text"
              id="card-number"
              class="input-field form-control"
              title="card number"
              aria-label="enter your card number"
              placeholder="NHẬP SỐ IN TRÊN THẺ"
              tabindex="1"
              readonly
            />
          <p class="error-message">{{errs['cardNumber']}}</p>
        </div>
        <div class="col-md-6">
          Tên in trên thẻ:
          <input
            type="text"
            id="cardholder-name"
            class="input-field form-control"
            title="cardholder name"
            aria-label="enter name on card"
            placeholder="NHẬP TÊN IN TRÊN THẺ"
            tabindex="2"
            readonly
          />
        </div>
        <div class="col-md-6">
          Tháng hết hạn:
          <input
            type="text"
            id="expiry-month"
            class="input-field form-control"
            title="expiry month"
            aria-label="two digit expiry month"
            placeholder="NHẬP THÁNG HẾT HẠN"
            tabindex="3"
            readonly
          />
          <p class="error-message">{{errs['expiryMonth']}}</p>
        </div>
        <div class="col-md-6">
          Năm hết hạn:
          <input
            type="text"
            id="expiry-year"
            class="input-field form-control"
            title="expiry year"
            aria-label="two digit expiry year"
            placeholder="NHẬP NĂM HẾT HẠN"
            tabindex="4"
            readonly
          />
          <p class="error-message">{{errs['expiryYear']}}</p>
        </div>
        <div class="col-md-6">
            CCV:
          <input
            type="text"
            id="security-code"
            class="input-field form-control"
            title="security code"
            aria-label="three digit CCV security code"
            placeholder="NHẬP MÃ BẢO MẬT"
            tabindex="5"
            readonly
          />
          <p class="error-message">{{errs['securityCode']}}</p>
        </div>
        <div class="col-md-12 fload-right">
          <b-button id="payButton" @click="pay('card')">Xác nhận</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      modalShow: false,
      isDisable: true,
      session_id: null,
      merchant: null,
      errs: {
        cardNumber: null,
        securityCode: null,
        expiryMonth: null,
        expiryYear: null,
        request_timeout: null,
        system_error: null,
      },
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
    cart: (state) => state.cart.cart,
  }),
  head() {
    return {
      script: [
            {
              src:`https://test-gateway.mastercard.com/form/version/61/merchant/${this.merchant}/session.js`,
            },
          ],
    }
    
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "cart/showVpBankModal") {
        this.merchant = mutation.payload && mutation.payload['merchant'];
        this.session_id = mutation.payload && mutation.payload['session'] && mutation.payload['session']['id'];
        console.log('aaaaaa', this.merchant, this.session_id);
        // this.getSessionPayment();
        setTimeout(() => {
          this.modalShow = true;
          if(this.session_id) this.paymentSession();
        }, 250);
      }
    });
  },
  methods: {
    closemodal() {
      this.modalShow = false;
    },
    updateCheckSession() {
      const cart = this.$store.state.cart.cart;
      let data = {
        cart_id: cart["id"],
        payment_method: cart['payment_method'],
        type: "PAYMENT",
        url: `${process.env.BASE_URL}/checkout/checkout-payment`,
        session_id: this.session_id,
      };
      this.$store.dispatch("cart/updateCheckSessionVpBank", data)
        .then((res) => {
          console.log('eeeee', res)
          return res && res['data'];
          
        })
        .catch((err) => console.log(err))
    },
    paymentSession() {
      PaymentSession.configure({
        session: this.session_id,
        fields: {
          // ATTACH HOSTED FIELDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
          card: {
            number: "#card-number",
            securityCode: "#security-code",
            expiryMonth: "#expiry-month",
            expiryYear: "#expiry-year",
            nameOnCard: "#cardholder-name",
          },
        },
        //SPECIFY YOUR MITIGATION OPTION HERE
        frameEmbeddingMitigation: ["javascript"],
        callbacks: {
          initialized: function(response) {
            console.log("xxxx", response);
            // HANDLE INITIALIZATION RESPONSE
          },
          formSessionUpdate: function(response) {
            console.log("response", response);
            // HANDLE RESPONSE FOR UPDATE SESSION
            if (response.status) {
              if ("ok" == response.status) {
                console.log(
                  "Session updated with data: " + response.session.id
                );
                //check if the security code was provided by the user
                if (response.sourceOfFunds.provided.card.securityCode) {
                  console.log("Security code was provided.");
                }

                //check if the user entered a Mastercard credit card
                if (
                  response.sourceOfFunds.provided.card.scheme == "MASTERCARD"
                ) {
                  console.log("The user entered a Mastercard credit card.");
                }
              } else if ("fields_in_error" == response.status) {
                console.log("Session update failed with field errors.", this.errs);
                if (response.errors.cardNumber) {
                  this.errs['cardNumber'] = 'Số thẻ không hợp lệ.';
                }
                if (response.errors.expiryYear) {
                  console.log("Expiry year invalid or missing.");
                  this.errs['expiryYear'] = 'Năm hết hạn không hợp lệ.';
                }
                if (response.errors.expiryMonth) {
                   this.errs['expiryMonth'] = 'Tháng hết hạn không hợp lệ.';
                }
                if (response.errors.securityCode) {
                  this.errs['securityCode'] = 'Mã bảo mật không hợp lệ.';
                }
              } else if ("request_timeout" == response.status) {
                console.log(
                  "Session update failed with request timeout: " +
                    response.errors.message
                );
              } else if ("system_error" == response.status) {
                console.log(
                  "Session update failed with system error: " +
                    response.errors.message
                );
              }
            } else {
              console.log("Session update failed: " + response);
            }
          },
        },
        interaction: {
          displayControl: {
            formatCard: "EMBOSSED",
            invalidFieldCharacters: "REJECT",
          },
        },
      });
    },
    pay() {
      // UPDATE THE SESSION WITH THE INPUT FROM HOSTED FIELDS
      PaymentSession.updateSessionFromForm("card");
    },
  },
};
</script>
