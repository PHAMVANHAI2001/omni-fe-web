<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="verify-sms-code-modal"
      id="verify-sms-code-modal"
      hide-footer
      hide-header
    >
      <ValidationObserver ref="form">
        <form @submit.prevent="submit">
          <div class="form-header">
            <h3>Vui lòng nhập mã xác minh</h3>
            <p>
              Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến (+84)
              {{ phone }}
            </p>
          </div>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="input-b">
              <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="form.sms1" />
              <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="form.sms2" />
              <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="form.sms3" />
              <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="form.sms4" />
              <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="form.sms5" />
              <input class="text-center" maxlength="1" type="text" @keyup="focusNext($event.target)" v-model.trim="form.sms6" />
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="form-field">
              <input
                type="text"
                v-md-style
                placeholder=" " 
                autocomplete="off"
                v-model.trim="form.password"
                id="txtfullname"
                class="form-input"
                @keyup="checkOTP"
              />
              <span for="txtfullname" class="form-labels">Mật khẩu mới<span class="text-danger">(*)</span></span>
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

          <button
            type="submit"
            block
            :disabled="isDisable"
            class="btn register-button btn-lg btn-block btn-danger"
          >
            Xác nhận
          </button>
          <span class="note" v-if="!resendSMS"
            >Vui lòng chờ <span>{{ downcount }} giây</span> để gửi
            lại</span
          >
          <a class="note" v-if="resendSMS" @click="getSMSCode">Gửi lại</a>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      modalShow: false,
      isDisable: true,
      resendSMS: false,
      downcount: 300,
      phone: null,
      form: {
        phone: "",
        sms1: "",
        sms2: "",
        sms3: "",
        sms4: "",
        sms5: "",
        sms6: "",
        password: ""
      },
    };
  },
  mounted() {
    this.downCount();
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "app/showVerifySmsCodeModal") {
        setTimeout(() => {
          this.modalShow = true;
          this.phone = this.$store.state.app.phoneSmsCode;
        }, 250);
      }
    });
  },
  methods: {
    checkOTP() {
      this.$refs.form.validate().then((success) => {
        success ? (this.isDisable = false) : (this.isDisable = true);
      });
    },
    focusNext(elem) {
      const maxLength = parseInt(elem.attributes["maxlength"].value, 10);
      const myLength = elem.value.length;
      const currentIndex = Array.from(elem.form.elements).indexOf(elem);
      elem.form.elements.item(myLength >= maxLength ? currentIndex + 1 : myLength == 0 ? currentIndex - 1 : 0).focus();
    },
    resetForm() {
      this.downcount = 300;
      this.form.phone = null;
      this.form.sms1 = null;
      this.form.sms2 = null;
      this.form.sms3 = null;
      this.form.sms4 = null;
      this.form.sms5 = null;
      this.form.sms6 = null;
    },
    downCount() {
      const itevl = setInterval(() => {
        this.resendSMS = false;
        if (this.downcount == 0) {
          this.resendSMS = true;
          clearInterval(itevl);
        }
        this.downcount--;
      }, 1000);
    },
    closemodal() {
      this.modalShow = false;
    },
    getSession() {
      this.$store
        .dispatch("app/fetchData", `/v1/client/session?phone=${this.phone}`)
        .then((resp) => {
          if (resp["data"]["session_id"]) {
            this.$store.commit("app/setSession", resp["data"]["session_id"]);
            localStorage.setItem("session_id", resp["data"]["session_id"]);
            this.$router.push("/");
            setTimeout(() => {
              location.reload();
            });
          }
        });
    },
    verifyLogin() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("user/verylogin", {
          phone: this.phone,
          password: this.form['password']
        })
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          localStorage.setItem("phone", this.phone);
          localStorage.setItem("temp_phone", this.phone);
          this.getSession();
        })
        .catch((error) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("err login:", error);
        });
    },
     getSMSCode() {
      this.resetForm();
      const formsend = {
        data: { phone: this.phone },
        url: "/auth/forgot-password",
      };
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/postData_3", formsend)
        .then((resp) => {
          this.downCount();
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$toast
            .success(
              resp.status
                ? resp.status
                : "Mã OTP đã được gửi thành công! Vui lòng kiểm tra tin nhắn"
            )
            .goAway(2500);
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    verifySmsCode() {
      const formsend = {
        data: {
          phone: this.phone,
          sms_code: this.mergerSmsCode(),
          password: this.form['password'],
        },
        url: "/client/auth/reset-password",
      };
      console.log('xzzzzzzzz', formsend)
      this.$store
        .dispatch("app/postData_4", formsend)
        .then((resp) => {
          this.verifyLogin();
          this.modalShow = false;
          this.resetForm();
        })
        .catch((err) => {
          this.modalShow = false;
          this.resetForm();
          console.log("phone", err);
        });
    },
    mergerSmsCode() {
      const smsCode =
        this.form.sms1 +
        this.form.sms2 +
        this.form.sms3 +
        this.form.sms4 +
        this.form.sms5 +
        this.form.sms6;
      return smsCode;
    },
    submit() {
      this.closemodal();
      this.verifySmsCode();
    },
  },
};
</script>

<style lang="scss">
.form-header {
  text-align: center;
}

.input-b {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-b input {
  width: 40px;
  border: none;
  border-bottom: 1px solid grey;
  margin-right: 10px;
  outline: none;
}

.input-b input:last-child {
  margin-right: 0;
}

.note {
  text-align: center;
  display: block;
  margin-top: 20px;
}

.select-old .custom-radio {
  margin: 9px 10px 0 0;
}
.form-check {
  label {
    color: #5f5f5f;
  }
}

.md-style-group {
  display: flex;
  align-items: center;
}

.btn-sms {
  font-size: 12px;
  color: white;
  background-color: #c92332;
  font-weight: bold;
  border: none;
  outline: none;
  height: 40px;
}
</style>
