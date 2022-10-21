<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="reset-password-modal"
      id="reset-password-modal"
      hide-footer
      hide-header
    >
      <ValidationObserver ref="form">
        <form @submit.prevent="submit">
          <div class="form-header">
            <h3>Quên mật khẩu?</h3>
            <p class="mb-4">
              Vui lòng cung cấp số điện thoại để lấy lại mật khẩu.
            </p>
          </div>
          <ValidationProvider rules="required|phone" v-slot="{ errors }">
            <div class="form-field">
              <input
                type="text"
                v-md-style
                maxlength="10"
                placeholder=" " 
                autocomplete="off"
                v-model.trim="form.phone"
                @keyup="checkPhone"
                id="txtfullname"
                class="form-input"
              />
              <!-- <label for="txtfullname">Nhập số điện thoại</label> -->
              <span for="txtfullname" class="form-labels">Nhập số điện thoại</span>
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

          <button
            type="submit"
            block
            :disabled="isDisable"
            class="btn register-button btn-lg btn-block btn-danger"
          >
            GỬI
          </button>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      modalShow: false,
      isDisable: true,
      form: {
        phone: "",
      },
    };
  },
  validations: {
    phone: {
      minLength: minLength(10),
      required,
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "app/showResetPasswordModal") {
        setTimeout(() => {
          this.modalShow = true;
        }, 250);
      }
    });
  },
  methods: {
     checkPhone() {
       this.$refs.form.validate().then((success) => {
         success ? this.isDisable = false : this.isDisable = true;
       })
    },
    resetForm(){
      this.form.phone = null
    },
    closemodal() {
      this.modalShow = false;
    },
    getSMSCode() {
      const formsend = {
        data: { phone: this.form.phone },
        url: "/client/auth/reset-password/send-phone",
      };
      console.log('zzzzz', formsend)
      this.$store
        .dispatch("app/postData_3", formsend)
        .then((resp) => {
          this.$toast.success(resp.status ? resp.status : 'Mã OTP đã được gửi thành công! Vui lòng kiểm tra tin nhắn').goAway(2500);
          this.resetForm()
          this.closemodal();
          this.$store.commit("app/showVerifySmsCodeModal");
          console.log("phone", resp);
        })
        .catch((err) => {
          console.log("phone", err);
        });
    },
    submit() {
      this.getSMSCode()
    },
  },
};
</script>

<style lang="scss">

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
