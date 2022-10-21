<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="payment-modal"
      id="payment-modal"
      title="Phương thức thanh toán"
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
    <div class="content" id="accordion">
        <div class="custom-control custom-radio">
            <div class="card" v-for="(item, i) in payments" :key="i">
              <div v-for="(itemStatus, j) in paymentStatus" :key="j">
                  <div class="card-header" v-if="item['code'] == itemStatus['key'] && itemStatus['value'] == 1">
                    <input  type="radio"
                            class="custom-control-input"
                            @click="onChecked(item.code)"
                            v-model="payment_method"
                            :value="item.code"
                            :id="item.code"
                            data-toggle="collapse">
                    <label class="custom-control-label transporters" :for="item.code">{{itemStatus['name']}}
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
        </div>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    payments: Array,
  },
  data() {
    return {
      modalShow: false,
      payment_method: null,
      isDisable: true,
      paymentStatus: null,
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "cart/showPaymentModal") {
        setTimeout(() => {
          this.modalShow = true;
          this.payment_method = mutation.payload;
        }, 250);
      }
    });
    this.getPaymentStatus();
  },
  methods: {
    closemodal() {
        this.modalShow = false;
      },
    onChecked(value) {
      this.payment_method = value;
      this.$store.dispatch('cart/addPaymentMethod', 
          { payment_method : value, session_id: this.$store.state.app.session_id })
          .then((res) => {
            this.modalShow = false;
            this.$store.dispatch('cart/getCart');
            this.$emit("updatePayment", value);
          })
    },
    getPaymentStatus() {
      this.$store.dispatch("cart/getSettingSystem", `PAYMENT-STATUS`)
        .then((data) => {
          this.paymentStatus = data['data']['data'];
        });
    },
  },
};
</script>
<style scoped>
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
.card-header {
    background-color: rgba(21, 193, 58, 0);
}
.transporters {
    font-weight: bold;
    font-size: 17px !important;
    color: rgb(75, 75, 75) !important;
}
.card-body {
    border-top: 1px rgba(189, 189, 189, 0.4) solid;
}
.input:focus ~ label, input:valid ~ label, textarea:focus ~ label, textarea:valid ~ label {
    margin-left: 10px;
    font-size: 13px;
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
.price {
    font-size: 15px;
    padding-right: 10%;
    text-align: right;
    color: rgb(255, 153, 0);
}
@media (max-width: 430px) {
    input[type=radio] {
        font-size: 10px
    }
    .content {
        margin-top: -10px;
    }
    .transporters {
        font-size: 14px !important;
    }
    .custom-control {
        padding-left: 0rem;
    }
    .custom-control-label {
        padding-left: -20px;
    }
    .custom-control-label p {
        font-size: 10px;
        color: gray;
    }
    .custom-control-label h5 {
        font-size: 12px !important;
    }
    .price {
        font-size: 12px
    }
}
</style>