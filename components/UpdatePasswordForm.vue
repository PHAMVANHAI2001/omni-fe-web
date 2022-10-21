<template>
  <div>
    <b-modal
      ref="update-password-modal"
      id="update-password-modal"
      hide-footer
      hide-header
    >
      <ValidationObserver ref="form">
        <form @submit.prevent="submit">
          <div class="form-header">
            <h3>Cập nhập mật khẩu</h3>
          </div>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="form-group md-style-group">
              <input
                type="password"
                v-md-style
                autocomplete="off"
                v-model.trim="form.password"
                id="txtfullname"
                class="form-control"
              />
              <label for="txtfullname">Nhập mật khẩu mới</label>
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="form-group md-style-group">
              <input
                type="password"
                v-md-style
                autocomplete="off"
                v-model.trim="form.rePassword"
                id="txtfullname"
                class="form-control"
              />
              <label for="txtfullname">Nhập lại mật khẩu</label>
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

          <button
            type="submit"
            block
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
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      errors: [],
      form: {
        phone: "",
        password: "",
        rePassword: "",
      },
    };
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "app/showUpdatePasswordModal") {
        setTimeout(() => {
          this.$refs["update-password-modal"].show();
        }, 250);
      }
    });
  },
  methods: {
    resetForm() {
      this.form.phone = null;
      this.form.password = null;
      this.form.rePassword = null;
    },
    updatePassword() {
      if (this.password == this.rePassword) {
        const formsend = {
          data: {
            phone: this.$store.state.app.phoneSmsCode,
            password: this.form.password,
          },
          url: "/client/auth/reset-password",
        };
        console.log(formsend);
        this.$store
          .dispatch("app/postData_5", formsend)
          .then((resp) => {
            this.$toast
              .success("Bạn vừa thay đổi mật khẩu thành công")
              .goAway(2000);
            this.resetForm();
            this.closemodal();
          })
          .catch((err) => {
            console.log("phone", err);
          });
      } else {
        this.$toast.error("Mật khẩu không khớp").goAway(2000);
      }
    },
    closemodal() {
      this.$refs["update-password-modal"].hide();
    },
    submit() {
      this.closemodal();
      this.updatePassword();
      // this.$store.commit("app/showVerifySmsCodeModal");
    },
  },
};
</script>

<style lang="scss">
#reset-password-modal {
}

.close {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background-color: grey;
  right: 0;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
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
