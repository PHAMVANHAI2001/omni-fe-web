<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="coupon-modal"
      id="coupon-modal"
      title="Khuyến mãi"
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
      <div class="styles__StyledCouponInput-rjzjn4-0 eKGiKS">
        <input
          data-view-id="cart_coupon_input"
          placeholder="Nhập Mã Khuyến Mãi"
          class="input"
          v-model="promocode_code"
        />
        <button
          data-view-id="cart_coupon_apply.button"
          class="button m-0"
          :disabled="promocode_code ? false : true"
          @click="applyCouponCodeInCart(promocode_code)"
        >
          Áp Dụng
        </button>
      </div>
      <span class="error-message"></span>

      <div>
        <b-tabs content-class="mt-3" justified>
          <b-tab title="Mã vận chuyển" active>
              <div class="body-scroll">
                <div class="styles__GroupedCouponWrapper-n32exf-1 iZwskv">
                  <div class="group-header">
                    <div class="group-header__title">Mã vận chuyển</div>
                    <div class="group-header__condition">Áp dụng tối đa: 1</div>
                  </div>
                </div>
                <span v-if="!shipping_method" class="pull-left p-2 mt-2 clear width-full d-block border-radius mb-2 text-center"
                              style=" background: rgb(255, 241, 241); color: rgb(0, 0, 0);"
                            > Vui lòng chọn đơn vị vận chuyển để được sử dụng mã vận chuyển.
                        </span>
                <div v-for="(item, i) in couponList" :key="i">
                  <div
                    class="pcmall-cart_1lvtEY"
                    v-bind:class="[item['is_apply'] == 0 || ship_fee == 0 ? 'op' : '' ]"
                    v-if="item['type_discount'] == 'shipping'"
                  >
                    <div
                      class="pcmall-cart_3MqDeu pcmall-cart_3z8BGP pcmall-cart_2Qskno row"
                    >
                      <div class="pcmall-cart_1QJ7zC col-sm-3">
                        <div class="pcmall-cart_K3HAZn">
                          <div class="pcmall-cart_2VySU8 pcmall-cart_2T7ZiM">
                            <img src="../../assets/images/icon/free.jpg" />
                          </div>
                          <div class="pcmall-cart_2I-THp"></div>
                        </div>
                      </div>
                      <div
                        class="pcmall-cart_2fRb_s pcmall-cart_2q3ebD pcmall-cart_1id9dV col-sm-9 pt-3 pb-3"
                      >
                        <div class="pcmall-cart_3-btfj pcmall-cart_1CteMs">
                          <div class="pcmall-cart_1C_LLX">
                            <a class="float-right info-coupon-position" :id="item.code">
                              <!-- <img src="../../assets/images/icon/answer_icon.png" alt="" style="width: 8%; vertical-align: text-bottom; float: right;"/> -->
                              <i class="fa fa-question-circle color-nuti"></i>
                            </a>
                            <b-tooltip
                              :target="item.code"
                              triggers="hover"
                              placement="bottom"
                            >
                              <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                <div class="col-4 pl-1 pr-1 text-left">Mã:</div>
                                <div class="col-8 pl-1 pr-1 text-left">
                                  <strong>{{ item.code }}</strong>
                                </div>
                              </div>
                              <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                <div class="col-4 pl-1 pr-1 text-left">Hạn sử dụng:</div>
                                <div class="col-8 pl-1 pr-1 text-left">
                                  {{ item.date_end }}
                                </div>
                              </div>
                              <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                <div class="col-12 pl-1 pr-1 text-left">Điều kiện:</div>
                                <div class="col-12 pl-1 pr-1 text-left">
                                  <div v-html="item.content"></div>
                                </div>
                              </div>
                            </b-tooltip>
                            <div class="pcmall-cart_e3EAjE pcmall-cart_1dmf75">
                              {{ item.name }}
                            </div>
                          </div>
                          <span
                            class="pcmall-cart_xQ6YPD pcmall-cart_2yruZF pcmall-cart_1vqHNj pcmall-cart_3q_swI"
                            >HSD: {{ item.date_end }}</span
                          >
                        </div>
                        <div
                          class="pcmall-cart_W1fPIy pcmall-cart_2hLLwQ pcmall-cart_dbI-tP"
                        >
                          <div class="pcmall-cart_21pzsn">
                            <div class="pcmall-cart_3tbmX3 pcmall-cart_2j0qsr">
                              <div
                                class="custom-control custom-radio custom-radio-mb"
                                v-if="item['is_apply'] == 1"
                              >
                                <input
                                  type="radio"
                                  class="custom-control-input radio-input-resposive"
                                  style="margin: 0 !important;"
                                  name="applay_cart_fee"
                                  :id="item.code"
                                  @change="onCheckedFreeShip()"
                                  v-model.trim="applay_cart_fee"
                                  v-bind:value="item.code"
                                  :disabled="!shipping_method || ship_fee == 0 ? true : false"
                                />
                                <label
                                  class="custom-control-label"
                                  :for="item.code"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </b-tab>
          <b-tab title="Mã Giảm Giá">
              <div class="body-scroll">
                <div class="styles__GroupedCouponWrapper-n32exf-1 iZwskv">
                  <div class="group-header">
                    <div class="group-header__title">Mã Giảm Giá</div>
                    <div class="group-header__condition">Áp dụng tối đa: 1</div>
                  </div>
                </div>
                <div v-for="(item, i) in couponList" :key="i">
                  <div
                    class="pcmall-cart_1lvtEY"
                    v-bind:class="[item['is_apply'] == 0 ? 'op' : '' ]"
                    v-if="item['type_discount'] == 'cart'"
                  >
                    <div
                      class="pcmall-cart_3MqDeu pcmall-cart_3z8BGP pcmall-cart_2Qskno row"
                    >
                      <div class="pcmall-cart_1QJ7zC col-sm-3">
                        <div class="pcmall-cart_K3HAZn">
                          <div class="pcmall-cart_2VySU8 pcmall-cart_2T7ZiM">
                            <img src="../../assets/images/icon/vnd.jpg" />
                          </div>
                          <div class="pcmall-cart_2I-THp"></div>
                        </div>
                      </div>
                      <div
                        class="pcmall-cart_2fRb_s pcmall-cart_2q3ebD pcmall-cart_1id9dV col-sm-9 pt-3 pb-3"
                      >
                        <div class="pcmall-cart_3-btfj pcmall-cart_1CteMs">
                          <div class="pcmall-cart_1C_LLX">
                            <a class="float-right info-coupon-position" :id="item.code">
                              <!-- <img src="../../assets/images/icon/answer_icon.png" alt="" style="width: 10%; vertical-align: text-bottom;"/> -->
                              <i class="fa fa-question-circle color-nuti"></i>
                            </a>
                            <b-tooltip
                              :target="item.code"
                              triggers="hover"
                              placement="bottom"
                            >
                              <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                <div class="col-4 pl-1 pr-1 text-left">Mã:</div>
                                <div class="col-8 pl-1 pr-1 text-left">
                                  <strong>{{ item.code }}</strong>
                                </div>
                              </div>
                              <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                <div class="col-4 pl-1 pr-1 text-left">Hạn sử dụng:</div>
                                <div class="col-8 pl-1 pr-1 text-left">
                                  {{ item.date_end }}
                                </div>
                              </div>
                              <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                <div class="col-12 pl-1 pr-1 text-left">Điều kiện:</div>
                                <div class="col-12 pl-1 pr-1 text-left">
                                  <div v-html="item.content"></div>
                                </div>
                              </div>
                            </b-tooltip>
                            <div class="pcmall-cart_e3EAjE pcmall-cart_1dmf75">
                              {{ item.name }}
                            </div>
                          </div>
                          <span
                            class="pcmall-cart_xQ6YPD pcmall-cart_2yruZF pcmall-cart_1vqHNj pcmall-cart_3q_swI"
                            >HSD: {{ item.date_end }}</span
                          >
                        </div>
                        <div
                          class="pcmall-cart_W1fPIy pcmall-cart_2hLLwQ pcmall-cart_dbI-tP"
                        >
                          <div class="pcmall-cart_21pzsn">
                            <div class="pcmall-cart_3tbmX3 pcmall-cart_2j0qsr">
                              <div
                                class="custom-control custom-radio custom-radio-mb"
                                v-if="item['is_apply'] == 1"
                              >
                                <input
                                  type="radio"
                                  class="custom-control-input radio-input-resposive"
                                  name="applay_cart_price"
                                  :id="item.code"
                                  v-model.trim="applay_cart_price"
                                  v-bind:value="item.code"
                                  @change="onCheckedCart()"
                                />
                                <label
                                  class="custom-control-label"
                                  :for="item.code"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </b-tab>
        </b-tabs>
      </div>
      <b-button
        type="button"
        @click="applyCouponInCart()"
        :disabled ="isDisable"
        class="btn btn btn-lg btn-nuti btn-secondary btn-block"
        >Áp dụng</b-button
      >
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
    couponList: Array,
  },
  data() {
    return {
      modalShow: false,
      applay_cart_price: null,
      isDisable: true,
      applay_cart_fee: null,
      promocode_code: null,
      shipping_method: null,
      ship_fee: 0,
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "cart/showCoupons") {
        setTimeout(() => {
          this.modalShow = true;
          this.applay_cart_price = mutation.payload["coupon_code"];
          this.applay_cart_fee = mutation.payload["coupon_delivery_code"];
          this.shipping_method = mutation.payload["shipping_method_code"];
          this.ship_fee = mutation.payload['ship_fee'];
        }, 250);
      }
    });
    if (this.couponList) {
      this.couponList.forEach((item) => {
        item.date_end = item.date_end.replace(/\-/g, "/");
      });
    }
  },
  methods: {
    closemodal() {
      this.modalShow = false;
    },
    onCheckedFreeShip() {
      this.isDisable = false;
      if(!this.shipping_method) {
        this.$toast.error('Vui lòng chọn đơn vị vận chuyển');
        return this.applay_cart_fee = '';
      }
    },
    onCheckedCart() {
      this.isDisable = false;
    },
 
    applyCouponInCart() {
      let data = {
        coupon_code: this.applay_cart_price,
        coupon_delivery_code: this.applay_cart_fee,
        session_id: this.$store.state.app.session_id,
      };

      if (this.$store.state.user.user) {
        this.$store
          .dispatch("cart/addCoupon", data)
          .then(() => {
            this.modalShow = false;
            this.$emit("checkCoupon");
            // this.$store.dispatch("cart/getCart");
          })
          .catch((err) => {
            console.log("error:", err);
          });
      }
    },
    applyCouponCodeInCart(code) {
      this.$store
        .dispatch("cart/addCoupon", { coupon_code: code })
        .then((res) => {
          this.modalShow = false;
          this.$emit("checkCoupon");
          this.promocode_code = "";
        }).catch((err) => {
            console.log("error:", err);
          });
    },
  },
};
</script>

<style lang="scss">
.op{
  opacity: 0.4;
}
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
.styles__GroupedCouponWrapper-n32exf-1 {
  margin-bottom: 10px;
}
.custom-radio {
  margin-top: 3%;
}
.pcmall-cart_mP1Jww {
  float: right;
}
.custom-control-input {
  // margin-bottom: 20px;
}
.eKGiKS {
  background: rgb(242, 242, 242);
  padding: 10px;
  // margin: 0px 32px;
  display: block;
  border-radius: 4px;
}
.eKGiKS .input {
  background-color: #fff;
  flex: 1 1 0%;
  border-radius: 4px;
  border: 1px solid rgb(224, 224, 224);
  height: 40px;
  width: calc(100% - 108px);
  color: rgb(36, 36, 36);
  font-size: 13px;
  line-height: 1.54;
  margin-right: 12px;
  background-image: url(https://frontend.tikicdn.com/_desktop-next/static/img/mycoupon/coupon_icon.svg);
  background-repeat: no-repeat;
  background-position: 12px center;
  padding: 10px 12px 10px 40px !important;
  outline: 0px;
  display: inline-block;
  vertical-align: top;
}
.eKGiKS .button {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  color: rgb(255, 255, 255);
  border: none;
  outline: 0px;
  background-color: rgb(13, 92, 182);
  border-radius: 4px;
  opacity: 1;
  width: 96px;
  height: 40px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  vertical-align: top;
}
.body-scroll {
  // overflow-y: scroll;
  // margin: 0px 3px 0px 27px;
  padding-left: 2rem;
}
.iZwskv {
  margin-top: 15px;
  margin-right: 25px;
}
.iZwskv .group-header {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(36, 36, 36);
  margin: 0px 5px;
}
.iZwskv .group-header__title {
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
}
.iZwskv .group-header__condition {
  font-size: 11px;
  font-weight: 400;
  // line-height: 20px;
  color: rgb(120, 120, 120);
  text-transform: uppercase;
}
.pcmall-cart_6ZRl5x {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.9375rem;
}
.pcmall-cart_1363Pp {
  height: 7.375rem;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

// =========
.pcmall-cart_1lvtEY {
  width: 100%;
  position: relative;
  margin-bottom: 0.9375rem;
}
.pcmall-cart_3z8BGP {
  height: 7.375rem;
  max-width: 97%;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.pcmall-cart_2Qskno {
  box-shadow: 2px 2px 5px 0px rgba(165, 165, 165, 0.29);
  padding: 0;
  border: none;
  border-radius: 5px;
}

.cart_1QJ7zC {
  position: relative;
}
.pcmall-cart_K3HAZn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 7.375rem;
  height: 100%;
  position: relative;
  display: flex;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, transparent),
    color-stop(0.1875rem, transparent),
    color-stop(0.1875rem, #ee4d2d)
  );
  background: linear-gradient(
    to right,
    transparent 0,
    transparent 0.1875rem,
    #5eb672 0.1875rem
  );
}
.pcmall-cart_2T7ZiM {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.pcmall-cart_2VySU8 {
  position: relative;
}
.pcmall-cart_2hjb6y {
  width: 100%;
  height: 100%;
}
.pcmall-cart_2an_cV {
  opacity: 1;
  -webkit-transition: opacity 0.2s ease;
  transition: opacity 0.2s ease;
}
.pcmall-cart_2an_cV {
  opacity: 1;
  -webkit-transition: opacity 0.2s ease;
  transition: opacity 0.2s ease;
}
.pcmall-cart_1rkxa0 {
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.75rem;
  line-height: 0.875rem;
  max-height: 1.75rem;
  max-width: 90%;
  color: #fff;
  text-align: center;
  -webkit-box-pack: center;
  word-break: break-word;
  margin-top: 0.3125rem;
  padding: 0 0.5rem;
}

.pcmall-cart_2I-THp {
  position: absolute;
  top: 0.3125rem;
  left: 0;
  width: 0.25rem;
  height: -webkit-calc(100% - 0.4375rem);
  height: calc(100% - 0.4375rem);
  background: radial-gradient(
    circle at 0,
    at 0.25rem,
    transparent 0,
    transparent 0.1875rem,
    #a2483600 0.1875rem
  );
  background: radial-gradient(
    circle at 0 0.25rem,
    transparent 0,
    transparent 0.1875rem,
    #a2483600 0.1875rem
  );
  background-size: 0.25rem 0.625rem;
  background-repeat: repeat-y;
}
.pcmall-cart_2I-THp::before {
  content: "";
  position: absolute;
  top: -0.3125rem;
  width: 100%;
  height: 0.3125rem;
  background: #a2483600;
  border-radius: 0.125rem 0 0 0;
}
.pcmall-cart_2I-THp::after {
  content: "";
  position: absolute;
  bottom: -0.125rem;
  left: 0;
  width: 100%;
  height: 0.125rem;
  background: #a2483600;
  border-radius: 0 0 0 0.125rem;
}
.pcmall-cart_1id9dV {
  background: #fff;
  -webkit-transition: background 1s ease;
  transition: background 1s ease;
}
.pcmall-cart_2q3ebD {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.pcmall-cart_2fRb_s {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  min-width: 0;
  height: -webkit-calc(100% - 0.125rem);
  height: calc(100% - 0.125rem);
  background: #ffffff;
  // border: 1px solid #e8e8e8;
  border-radius: 0 0.125rem 0.125rem 0;
  border-left: 0 solid transparent;
}
.pcmall-cart_1CteMs {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  // -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  // justify-content: center;
}
.pcmall-cart_3-btfj {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  max-width: 100%;
  // padding: 0 1.25rem;
  min-width: 0;
}
.pcmall-cart_1C_LLX {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.25rem;
  max-height: 2.6875rem;
  word-break: break-word;
}
.pcmall-cart_1dmf75 {
  display: inline;
}
.pcmall-cart_e3EAjE {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  word-break: break-word;
}
.pcmall-cart_3VguH- {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.3125rem;
}
.pcmall-cart_3VguH- > div:first-of-type {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -moz-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin-right: 0.3125rem;
  max-width: 80%;
}
.pcmall-cart_2GvmmZ {
  overflow: hidden;
  border-radius: 0.125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: #ee4d2d;
  border: 1px solid #ee4d2d;
}
.pcmall-cart_13VFRp {
  margin: 0 0.375rem;
  padding: 0.125rem 0;
  font-size: 0.75rem;
  line-height: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.pcmall-cart_2GvmmZ {
  overflow: hidden;
  border-radius: 0.125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: #ee4d2d;
  border: 1px solid #ee4d2d;
}
.pcmall-cart_13VFRp {
  margin: 0 0.375rem;
  padding: 0.125rem 0;
  font-size: 0.75rem;
  line-height: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.pcmall-cart_1vqHNj {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.cart_xQ6YPD {
  text-transform: capitalize;
}
.pcmall-cart_3q_swI {
  color: rgba(0, 0, 0, 0.54);
}
.pcmall-cart_2yruZF {
  font-size: 0.75rem;
  line-height: 0.875rem;
  margin-top: 0.3125rem;
  color: rgba(0, 0, 0, 0.54);
}
.pcmall-cart_dbI-tP {
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 1.125rem 0.25rem 0.625rem 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.pcmall-cart_2hLLwQ {
  -webkit-box-align: end;
  -webkit-align-items: flex-end;
  -moz-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
}
.pcmall-cart_W1fPIy {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.pcmall-cart_21pzsn {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

@media screen and(max-width: 430px) {
  .pcmall-cart_3z8BGP {
    height: 5.375rem;
    max-width: 100%;
  }
  .pcmall-cart_1QJ7zC {
    max-width: 30%;
  }
  .pcmall-cart_2fRb_s {
    max-width: 70%;
    padding-left: 0px;
    padding-right: 0px;
  }
  .pcmall-cart_2yruZF {
    font-size: 0.65rem;
  }
  .pcmall-cart_K3HAZn {
    width: auto;
  }
  .pcmall-cart_2T7ZiM {
    height: 4.5rem;
    width: 4.5rem;
    overflow: hidden;
  }
  .pcmall-cart_3-btfj {
    padding: 0rem;
  }
  .pcmall-cart_e3EAjE {
    font-size: 12px;
  }
  .pcmall-cart_mP1Jww {
    display: none;
  }
  .custom-control {
    padding-left: 2.5rem;
  }
}
@media screen and(max-width: 330px) {
  .group-header__title {
    font-size: 0.75rem;
  }
  .group-header__condition {
    font-size: 0.65rem;
  }
  .pcmall-cart_3z8BGP {
    height: 5.375rem;
    max-width: 100%;
  }
  .pcmall-cart_1QJ7zC {
    max-width: 30%;
  }
  .pcmall-cart_2fRb_s {
    max-width: 70%;
    padding-left: 0px;
    padding-right: 0px;
  }
  .pcmall-cart_2yruZF {
    font-size: 0.65rem;
  }
  .pcmall-cart_K3HAZn {
    width: auto;
  }
  .pcmall-cart_2T7ZiM {
    height: 1.5rem;
    width: 1.5rem;
    overflow: hidden;
  }
  .pcmall-cart_3-btfj {
    padding: 0rem;
  }
  .pcmall-cart_e3EAjE {
    font-size: 12px;
  }
  .pcmall-cart_mP1Jww {
    display: none;
  }
  .custom-control {
    padding-left: 2.5rem;
  }
}
</style>
