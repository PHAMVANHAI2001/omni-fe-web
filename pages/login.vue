<template>
  <div>
    <div class="header-app">
      <div class="container">
        <h4>Đăng nhập</h4>
      </div>
    </div>

    <div class="container">
      <ValidationObserver ref="form">
        <form class="p-2">
          <div class="">
            <ValidationProvider rules="required|phone" v-slot="{ errors }">
              <div class="form-field">
              <input
                type="tel"
                v-model.trim="phone"
                id="txtphone"
                placeholder=" "
                maxlength="10"
                class="form-control form-input"
                v-on:keyup="search()"
              />
               <span  class="form-labels">Nhập số điện thoại</span>
               <div class="alert alert-success" v-if="user.name && user.account_status !== 'pending'" role="alert">
                Xin chào <b>{{ user.group_name}} - {{ user.name }}</b> 
              </div>
              </div>
              <!-- <div class="alert alert-success" v-if="user.name && user.account_status == 'pending'" role="alert">
                <b>Tài khoản đại ký của bạn đang chờ, nhập mật khẩu để theo dõi tình trạng tài khoản.</b> 
              </div> -->
              <div
                class="alert alert-success"
                role="alert"
                v-if="!errors[0] && user.error"
              >
                {{ user.error }}
              </div>
              <div class="alert alert-danger" role="alert" v-if="errors[0]">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div v-if="validPhone">
            <ValidationProvider rules="required" v-slot="{ errors }">
             <div class="form-field" v-if="validPhone">
              <input
                type="password"
                v-model.trim="password"
                placeholder=" "
                id="txtpassword"
                class="form-control form-input"
              />
              <span  class="form-labels">Nhập mật khẩu của bạn</span>
             </div>
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>  
          <b-button
            type="button"
            v-on:click="checkPhone()"
            :disabled="isDisable"
            block
            v-if="!validPhone"
            class="btn register-button btn-lg btn-block btn-danger"
          >Tiếp tục</b-button>
          <b-button
            type="button"
            v-on:click="verifyLogin()"
            block
            v-if="validPhone"
            class="btn register-button btn-lg btn-block btn-danger"
          >Đăng nhập</b-button>
          <!-- <span class="forget-pass" v-on:click="showModalResetPassword()">Quên mật khẩu</span> -->
          <p class="text-center" @click="ridirectToRegister()">
            Chưa có tài khoản?
            <a class="text-primary" @click="ridirectToRegister()">Đăng ký</a>
          </p>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      errors: [],
      phone: null,
      validPhone: false,
      password: null,
      isNew: 0,
      store_token: process.env.store_token,
      submitStatus: null,
      modalShow: false,
      user: {
        name: null,
        error: null
      },
      isDisable: true,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  validations: {
    phone: {
      minLength: minLength(10),
      required
    },
    sms_code: {
      minLength: minLength(6),
      required
    }
  },
  created() {},
  methods: {
    resetForm() {
      this.phone = null;
      this.password = null;
    },
    checkPhone() {
      this.$refs.form.validate().then(success => {
        if (success && this.user.name !== null) {
          this.validPhone = true;
        } else if (this.user.name == null && success) {
          localStorage.setItem("phone",this.phone);
          this.$router.push("/");
          this.user = {
            name: null,
            error: null
          };
          this.resetForm();
        }
      });
    },
    ridirectToRegister() {
      this.$router.push("/register-agent");
    },
    async google() {
      await this.$auth.loginWith("google").catch(e => {
        this.$toast.show("Error", { icon: "fingerprint" });
      });
    },
    async facebook() {
      await this.$auth.loginWith("facebook").catch(e => {
        this.$toast.show("Error", { icon: "fingerprint" });
      });
    },
    showModalRegister() {
      // this.$store.commit("app/showRegisterModal");
    },
    showModalResetPassword() {
      this.$store.commit("app/showResetPasswordModal");
    },
    hasOTP() {
      this.validPhone = true;
      this.isNew = 1;
    },

    verifyLogin() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$store.dispatch("app/showLoadingOverlay", true);
           if(this.user && this.user['is_new'] == 1){
           this.createPassword();
         }
         else{
          this.$store
            .dispatch("user/verylogin", {
              phone: this.phone,
              store_token: process.env.store_token,
              password: this.password
            })
            .then((res) => {
              this.$store.dispatch("app/showLoadingOverlay", false);
              this.resetForm();
              this.user = {
                name: null,
                error: null
              };
              this.validPhone = false;
              // if(res.data.account_status == "approved"){
                  this.getUserProfile();
              if (this.$store.state.app["notifyLoginForm"]) {
                this.$store.state.app["notifyLoginForm"] = false;
                return;
              }
               this.$router.push("/user/order");
              //  }
            })
            .catch(error => {
              this.$store.dispatch("app/showLoadingOverlay", false);
              // console.log("Lỗi verify:", error);
              let msg = "";
              if (
                error.response &&
                error.response.data &&
                error.response.data.error
              ) {
                let errors = error.response.data.error.errors;
                Object.keys(errors).forEach(key => {
                  msg = errors[key];
                });
                this.$toast.error(msg).goAway(2500);
              }
            });
        }
        }
      });
    },
    getUserProfile() {
      this.$store
        .dispatch("user/getAccount")
        .then(() => {})
        .catch(() => {});
    },
    check() {
      // console.log(this.$auth.loggedIn);
    },
    addCart(product) {
      this.$store
        .dispatch("cart/add", {
          product_id: product.product_id,
          quantity: 1
        })
        .then(res => {
          this.$store
            .dispatch("cart/getCart")
            .then(res => {})
            .catch(err => {});
        })
        .catch(err => {});
    },
    search() {
      if (this.phone.length > 9) {
        this.getUserByPhone();
      } else if (this.phone.length < 10) {
        this.user = {
          name: null,
          error: null
        };
        this.validPhone = false;
      }
    },
    getUserByPhone() {
      this.$store
        .dispatch("app/fetchData", `/v1/client/get-user-by-phone/${this.phone}`)
        .then(resp => {
          this.$store.dispatch("app/showLoadingOverlay", false);
           this.isDisable = false;
          if (!resp["data"]) {
            this.user = {
              name: null,
              error: "Tiếp tục với hệ thống vãng lai hoặc đăng ký đại lý"
            };
          } else {  
            this.user = resp["data"];
            this.validPhone = true;
            // fill vào form.
          }
        })
        .catch(err => {
          console.log("error confirm order:", err);
        });
    }
  },
   createPassword(){
       this.$store
        .dispatch("user/createPassword", {
          user_id: this.user['id'], password: this.password}
        ).then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        })
        .catch((err) => {
          console.log("error confirm order:", err);
        });
    },
};
</script>

<style lang="scss">
.forget-pass {
  text-align: center;
  display: block;
  margin-top: 20px;
  cursor: pointer;
  color: #c92332;
}
.modal-header .close {
  display: none;
}
.login-note {
  text-align: justify;
  padding: 0 20px 20px 0;
  font-size: 0.9rem;
}
.login-note-column {
  background: #f9f9f9;
  padding: 20px 10px;
  border-radius: 10px;
}
</style>
