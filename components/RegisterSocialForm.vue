<template>
  <div>
    <b-modal
        v-model="modalShow"
        id="bv-modal-login"
        ref="register-social-modal"
        hide-footer
        hide-header
        cancel-only:
        false
    >
      <!-- no-close-on-backdrop -->
      <ValidationObserver ref="form">
        <form v-on:submit.prevent="noop" novalidate>
          <div class="form-group">
            <h4 class="text-center clearfix p-2 mb-4">
              <b>Xin chào!</b>
            </h4>
            <ValidationProvider rules="phone" v-slot="{ errors }">
              <!-- ------------ PHONE ------------ -->
              <div class="form-field">
                <input
                    type="tel"
                    v-model.trim="phone"
                    name="Số điện thoại"
                    maxlength="10"
                    id="txtphone"
                    ref="txtphone"
                    placeholder=" "
                    v-b-tooltip.hover
                    class="form-input txtphone"
                    @input="inputPhone($event)"
                />
                <span class="form-labels"
                >Số điện thoại</span
                >
                <p class="error-message">{{ errors[0] }}</p>
                <p class="error-message">{{ errorPhone }}</p>
              </div>

              <!-- ------------ ######### ------------ -->
            </ValidationProvider>
          </div>
          <div class="form-group" v-if="phone && isSend">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <span class="label">Nhập mã xác thực</span>
              <div class="input-b">
                <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="sms1" />
                <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="sms2" />
                <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="sms3" />
                <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="sms4" />
                <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="sms5" />
                <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="sms6" />
              </div>
              <p class="error-message">{{ errors[0] }}</p>
              <span class="note">
              {{!resendSMS ? `Gửi lại mã sau: ${down_count}` : `Không nhận được?`}}
                  <a class="resend" v-if="resendSMS" @click="getSmsSocial">Gửi lại</a>
            </span>
            </ValidationProvider>
          </div>
          <b-button
              v-if="!isSend"
              type="button"
              block
              :disabled="!phone"
              class="btn register-button btn-lg btn-block"
              @click="getSmsSocial"
          >Gửi mã xác thực</b-button>
          <b-button
              v-if="isSend"
              type="button"
              block
              :disabled="!phone"
              class="btn register-button btn-lg btn-block"
              @click="verifySmsCodeSocial"
          >Xác thực</b-button>
          <p class="text-center" v-if="errorPhone">
            Đăng nhập với số điện thoại? <br />
            <a class="text-primary" @click="showModalLogin()">
              Đăng nhập ngay
            </a>
          </p>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { debounce } from "debounce";
export default {
  data() {
    return {
      isSend: false,
      isDisable: true,
      phone: null,
      name: "",
      sms1: "",
      sms2: "",
      sms3: "",
      sms4: "",
      sms5: "",
      sms6: "",
      modalShow: false,
      down_count: 60,
      resendSMS: false,
      errorPhone: null,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "user/showRegisterSocialModal") {
        this.modalShow = true;
      }
    });
  },
  methods: {
    showModalLogin() {
      this.$store.commit("user/showLoginModal");
    },
    inputPhone: debounce(function($event) {
      this.searchUser($event);
    }),
    searchUser($event) {
      this.resetFormSms();
      const value = $event.target.value;
      if (value && value.length == 10) {
        this.getUserByPhone(value);
      }
    },
    getUserByPhone(phone) {
      this.$store.dispatch("user/getUserByPhone", phone)
          .then((resp) => {
            if(resp && resp["data"]) {
              this.errorPhone = 'Số điện thoại đã đăng kí tài khoản';
            } else {
              this.isSend = true;
            }
          })
          .catch((err) => {
            console.log("error getUserByPhone:", err);
          });
    },
    resetFormSms() {
      this.down_count = 60;
      this.sms1 = null;
      this.sms2 = null;
      this.sms3 = null;
      this.sms4 = null;
      this.sms5 = null;
      this.sms6 = null;
    },
    downCount() {
      const itevl = setInterval(() => {
        this.resendSMS = false;
        if (this.down_count == 0) {
          this.resendSMS = true;
          clearInterval(itevl);
        }
        this.down_count--;
      }, 1000);
    },
    mergerSmsCode() {
      const smsCode = this.sms1 + this.sms2 + this.sms3 + this.sms4 + this.sms5 + this.sms6;
      return smsCode;
    },
    getSmsSocial() {
      this.$store.dispatch("user/getSmsSocial", { phone: this.phone})
      .then((res) => {
        res ? this.downCount() : '';
        this.verifySmsCodeSocial();
        this.isSend = true;
      })
      .catch((err) => console.log(err));
    },
    verifySmsCodeSocial() {
      this.$store.dispatch("user/verifySmsCodeSocial", {code_otp: this.mergerSmsCode(), phone: this.phone})
      .then((res) => {
        this.modalShow = false;
        this.$router.push("/");
        location.reload()
      })
      .catch((err) => console.log(err));
    },
    focusNext(elem) {
      const maxLength = parseInt(elem.attributes["maxlength"].value, 10);
      const myLength = elem.value.length;
      const currentIndex = Array.from(elem.form.elements).indexOf(elem);
      elem.form.elements.item(myLength >= maxLength ? currentIndex + 1 : myLength == 0 ? currentIndex - 1 : 0).focus();
    },
  },
};
</script>

<style lang="scss"></style>
