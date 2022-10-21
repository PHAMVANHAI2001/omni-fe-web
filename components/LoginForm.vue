<template>
  <div>
    <b-modal
      v-model="modalShow"
      id="bv-modal-login"
      ref="login-modal"
      hide-footer
      hide-header
      cancel-only:
      false
    >
      <!-- no-close-on-backdrop -->
      <ValidationObserver ref="form">
        <form v-on:submit.prevent="noop" novalidate>
          <div class="form-group">
            <h4
              class="text-center clearfix p-2 mb-4"
            >
             <b>Xin chào!</b>  <br /> Đăng nhập hoặc tạo tài khoản
            </h4>
            <ValidationProvider rules="phone" v-slot="{ errors }">
              <!-- ------------ PHONE ------------ -->
              <div class="form-field">
                <input
                  type="tel"
                  v-model.trim="userRegisterForm.phone"
                  name="Số điện thoại"
                  maxlength="10"
                  id="txtphone"
                  ref="txtphone"
                  placeholder=" "
                  v-b-tooltip.hover
                  class="form-input txtphone"
                  @paste="pastePhone($event)"
                  @input="inputPhone($event)"
                />
                <span class="form-labels"
                  >Số điện thoại của quý khách</span
                >
              </div>

              <!-- ------------ ######### ------------ -->
              <div v-if="phonechecking" class="text-center">
                <div class="lds-dual-ring"></div>
              </div>

              <div
                class="alert alert-success mb-4"
                style="z-index:99"
                v-if="user && user.name"
                role="alert"
              >
                Xin chào
                <b>{{ user.name }}</b>
              </div>
              <div
                class="alert alert-warning"
                v-if="user && user.name && user.account_status == 'pending'"
                role="alert"
              >
                Xin chào
                <b>{{ user.name }}</b>
              </div>
              <div
                class="alert alert-success"
                role="alert"
                v-if="user && !errors[0] && user.error"
              >
                {{ user.error }}
              </div>
              <div
                class="alert alert-danger mb-3"
                role="alert"
                v-if="errors[0]"
                style="z-index: 99"
              >
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </div>
          <div class="form-group" v-if="user_notfound && initForm">
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
              {{!resendSMS ? `Gửi lại mã sau: ${downcount}` : `Không nhận được?`}}
                  <a class="resend" v-if="resendSMS" @click="sendSmsRegister">Gửi lại</a>
            </span>
          </ValidationProvider>
          </div>
          <div>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <!-- ------------ password ------------ -->
              <div class="form-field" v-if="!user_notfound && !initForm || showModalRegister">
                <div class="input-group">
                  <input
                    :type="passwordFieldType"
                    name="Mật khẩu"
                    id="txtpassword"
                    ref="txtpassword"
                    v-model.trim="userRegisterForm.password"
                    placeholder=" "
                    class="form-input password"
                  />
                  <span class="form-labels"
                    >Mật khẩu <span class="text-danger">(*)</span></span
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-secondary"
                      aria-haspopup="true"
                      aria-expanded="false"
                      @click="switchVisibility"
                    >
                      <i
                        class="fa fa-eye"
                        aria-hidden="true"
                        v-if="passwordFieldType !== 'password'"
                      ></i
                      ><i
                        class="fa fa-eye-slash"
                        aria-hidden="true"
                        v-if="passwordFieldType === 'password'"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <p class="error-message">{{ errors[0] }}</p>
              <!-- ------------ ######### ------------ -->
            </ValidationProvider>
          </div>

          <div class="register-zone" v-if="showModalRegister == 1">
            <!-- ------ EMAIL -------- -->
            <!-- <ValidationProvider rules="required" v-slot="{ errors }">
              <div class="form-field">
                <input
                  type="email"
                  name="Email"
                  v-model.trim="userRegisterForm.email"
                  placeholder=" "
                  class="form-input"
                />
                <span class="form-labels">Email của Quý khách</span>
              </div>
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider> -->
            <!-- ------ EMAIL -------- -->

            <!-- ==========-------  NAME ------======= -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <div class="form-field">
                <input
                  type="text"
                  name="Họ và tên"
                  v-model.trim="userRegisterForm.name"
                  placeholder=" "
                  class="form-input"
                />
                <span class="form-labels">Họ và tên của Quý khách</span>
              </div>
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
            <!-- ==========-------  NAME ------======= -->
            <ValidationProvider rules="required" v-slot="{ errors }">
                <select 
                  v-model.trim="userRegisterForm.group_id" 
                  class="form-control"
                  @change="addGroupUser(userRegisterForm.group_id)" 
                  >
                  <option value disabled>Vui lòng chọn đối tượng</option>
                  <option v-for="item in groups" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
           
            <ValidationProvider name="city_code" v-slot="{ errors }">
                <select
                  @change="getDistrict(formShippingAddress.city_code)"
                  v-model.trim="formShippingAddress.city_code"
                  class="form-control"
                  ref="city_code"
                >
                  <option value disabled>Vui lòng chọn Tỉnh/Thành phố</option>
                  <option
                    :value="item.code"
                    v-for="(item, i) in cities"
                    :key="i"
                    >{{ item.name }}</option
                  >
                </select>
                <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
                <select
                  :disabled="!formShippingAddress.city_code"
                  class="form-control"
                  v-model.trim="formShippingAddress.district_code"
                  @change="getWard(formShippingAddress.district_code)"
                >
                  <option value disabled>Vui lòng chọn Quận/Huyện</option>
                  <option
                    :value="item.code"
                    v-for="(item, i) in districts"
                    :key="i"
                    >{{ item.name }}</option
                  >
                </select>
                <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
                <select
                  :disabled="!formShippingAddress.district_code"
                  class="form-control"
                  v-model.trim="formShippingAddress.ward_code"
                >
                  <option value disabled>Vui lòng chọn Phường/xã</option>
                  <option
                    :value="item.code"
                    v-for="(item, i) in wards"
                    :key="i"
                    >{{ item.name }}</option
                  >
                </select>
                <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
            <ValidationProvider rules="required|min:3" v-slot="{ errors }">
              <textarea
                  :disabled="formShippingAddress['ward_code'] ? submitted : true"
                  name="Địa chỉ"
                  v-model.trim="formShippingAddress.street_address"
                  class="form-control"
                  rows="1"
                  placeholder="Số nhà, tên đường, toà nhà (nếu có)"
                ></textarea>
                <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>
            <b-button 
              type="button"
              @click="register()"
              block
              class="btn register-button btn-lg btn-block btn-danger"
              >Đăng ký</b-button
            >
          </div>

          <!-- <div
            v-if="user_notfound == 1 && !showModalRegister && !user"
            class="alert alert-success"
          >
            Chào quý khách, bấm tiếp tục để đặt hàng.
          </div> -->
          <div id="fb-root"></div>
          <b-button
            type="button"
            @click="checkPhone()"
            block
            :disabled="isDisable"
            v-if="initForm"
            class="btn register-button btn-lg btn-block"
            >Tiếp tục</b-button
          >
          <b-button
            block
            type="submit"
            @click="verifyLogin()"
            v-if="user"
            :disabled="isDisable"
            class="btn register-button btn-lg btn-block"
            >Đăng nhập</b-button
          >
          <button
            block
            type="submit"
            @click.prevent="loginWithGoogle"
            class="btn btn-block btn-social btn-lg btn-google"
            ><i class="fa fa-google"> Đăng nhập bằng Google</i></button
          >
          <button
            block
            type="submit"
            @click.prevent="loginWithFacebook"
            class="btn btn-block btn-social btn-lg btn-facebook"
            ><i class="fa fa-facebook"> Đăng nhập bằng Facebook</i></button
          >
           <!-- <button
            block
            type="submit"
            @click.prevent="loginWithZalo"
            class="btn btn-block btn-social btn-lg btn-facebook"
            ><i class="fa fa-facebook"> Đăng nhập bằng Zalo</i></button
          >-->
          <span
            class="forget-pass"
            v-if="user"
            @click="showModalResetPassword()"
            >Quên mật khẩu</span
          >
          <!-- <p class="text-center" v-if="user_notfound == 1 && !showModalRegister">
            Để trở thành đại lý cá nhân? <br />
            <a class="text-primary" @click="ridirectToRegister()"
              >Đăng ký ngay</a
            >
          </p> -->
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, minLength, between } from "vuelidate/lib/validators";
import { debounce } from "debounce";
import { initFbsdk } from '~/plugins/fb-login';
export default {
  data() {
    return {
      errors: [],
      phone: null,
      name: "",
      email: "",
      validPhone: false,
      password: null,
      isNew: 0,
      user_notfound: null,
      store_token: process.env.store_token,
      modalShow: false,
      phonechecking: false,
      showModalRegister: 0,
      user: null,
      isDisable: true,
      passwordFieldType: "password",
      cart: null,
      submitted: false,
      userRegisterForm: {
        name: null,
        phone: null,
        password: null,
        firstname: null,
        lastname: null,
        verify_otp: 0,
        store_token: process.env.store_token,
        group_id: '',
        group_code: null,
        group_name: null,
      },
      formShippingAddress: {
        city_code: "",
        district_code: "",
        ward_code: "",
        street_address: "",
        is_default: 1,
      },
      socialUser:{
        name: null,
        type: 'CUSTOMER',
        id: null,
        social_type: null,
        email: null,
        avatar_url: null,
        store_token: process.env.store_token,
      },
      sms1: "",
      sms2: "",
      sms3: "",
      sms4: "",
      sms5: "",
      sms6: "",
      downcount: 60,
      resendSMS: false,
      initForm: 1,
      OACode: null,
      cities: [],
      wards: [],
      districts: [],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mounted () {
    initFbsdk()
  },
  created() {
    this.getCities();
    this.cart = this.$store.state.cart.cart;
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "user/showLoginModal") {
        this.userRegisterForm['phone'] && this.userRegisterForm['phone'].length ? this.isDisable = false : this.isDisable = true;
        this.modalShow = true;
      }
    });
    // lấy sdt đã login lần trước.
    if (process.browser) {
      this.getGroups();
      const temp_phone = localStorage.getItem("temp_phone");
      temp_phone ? this.userRegisterForm['phone'] = temp_phone : this.formfocusPhone();
    }
  },
  methods: {
    addGroupUser(_id){
      this.groups.find((item) => {
       if(item.id == _id) {
         this.userRegisterForm['group_id'] = item.id
         this.userRegisterForm['group_code'] = item.code
         this.userRegisterForm['group_name'] = item.name
        }
      })
    },

    getGroups() {
    this.$store
      .dispatch("app/fetchData", "v1/client/user_groups")
      .then((data) => {
        this.groups = data.data;
      });
    },
    noop() {
      // do nothing
    },
    mergerSmsCode() {
      const smsCode = this.sms1 + this.sms2 + this.sms3 + this.sms4 + this.sms5 + this.sms6;
      return smsCode;
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
    resetFormSms() {
      this.downcount = 60;
      this.sms1 = null;
      this.sms2 = null;
      this.sms3 = null;
      this.sms4 = null;
      this.sms5 = null;
      this.sms6 = null;
    },
    focusNext(elem) {
      const maxLength = parseInt(elem.attributes["maxlength"].value, 10);
      const myLength = elem.value.length;
      const currentIndex = Array.from(elem.form.elements).indexOf(elem);
      elem.form.elements.item(myLength >= maxLength ? currentIndex + 1 : myLength == 0 ? currentIndex - 1 : 0).focus();
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    resetForm() {
      this.password = null;
    },
    formfocusPhone() {
      setTimeout(() => {
        this.$refs.txtphone.focus();
      }, 250);
    },
    pastePhone($event) {
      this.searchUser($event);
    },
    checkPhone() {
      if(this.userRegisterForm['phone'].length == 10 && this.mergerSmsCode().length < 6) {
        this.getUserByPhone(this.userRegisterForm['phone']);
        localStorage.setItem("phone", this.userRegisterForm['phone']);
        localStorage.setItem("temp_phone", this.userRegisterForm['phone']);
      }
      if(this.userRegisterForm['phone'].length == 10 && this.mergerSmsCode().length == 6) {
        this.checkOTP(this.userRegisterForm['phone'], this.mergerSmsCode());
      }
    },
    addSession() {
      // chưa login thì khởi tạo session_id cho phiên làm việc.
      if (this.cart) {
        setTimeout(() => {
          location.reload();
          // window.location.href = '/';
        });
      } else {
        this.getSession();
      }
    },
    getSession() {
      this.$store
        .dispatch(
          "app/fetchData",
          `/v1/client/session?phone=${this.userRegisterForm['phone']}`
        )
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
    ridirectToRegister() {
      localStorage.setItem("phone", this.userRegisterForm['phone']);
      localStorage.setItem("temp_phone", this.userRegisterForm['phone']);
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.closemodal();
      this.$store
        .dispatch(
          "app/fetchData",
          `/v1/client/session?phone=${this.userRegisterForm['phone']}`
        )
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (resp["data"]["session_id"]) {
            this.$store.commit("app/setSession", resp["data"]["session_id"]);
            localStorage.setItem("session_id", resp["data"]["session_id"]);
            this.$router.push("/register-agent");
            setTimeout(() => {
              location.reload();
            }, 250);
          }
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    closemodal() {
      this.$refs["login-modal"].hide();
    },
    showModalResetPassword() {
      this.closemodal();
      this.$store.commit("app/showResetPasswordModal");
    },
    verifyLogin() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.$store.dispatch("app/showLoadingOverlay", true);
          if (this.user && this.user["is_new"] != 1) {
            this.createPassword();
          } else {
            this.$store
              .dispatch("user/verylogin", {
                phone: this.userRegisterForm['phone'],
                store_token: process.env.store_token,
                password: this.userRegisterForm['password'],
              })
              .then((res) => {
                if (res) {
                  this.$store.dispatch("app/showLoadingOverlay", false);
                  this.resetForm();
                  this.modalShow = false;
                  localStorage.setItem("phone", this.userRegisterForm['phone']);
                  localStorage.setItem("temp_phone", this.userRegisterForm['phone']);
                  this.addSession();
                }
              })
              .catch((error) => {
                this.$store.dispatch("app/showLoadingOverlay", false);
                console.log("err login:", error);
              });
          }
        }
      });
    },
    createPassword() {
      this.$store
        .dispatch("user/createPassword", {
          user_id: this.user["id"],
          password: this.userRegisterForm['password'],
        })
        .then((data) => {
          localStorage.setItem("phone", "");
          localStorage.setItem("temp_phone", this.userRegisterForm['phone']);
          this.$store.dispatch("app/showLoadingOverlay", false);
          // location.reload();
        })
        .then(() => {
          this.$store
            .dispatch("user/verylogin", {
              phone: this.userRegisterForm['phone'],
              store_token: process.env.store_token,
              password: this.userRegisterForm['password'],
            })
            .then(() => {
              localStorage.setItem("phone", this.userRegisterForm['phone']);
              localStorage.setItem("temp_phone", this.userRegisterForm['phone']);
              this.addSession();
            });
        })
        .catch((err) => {
          console.log("error createPassword:", err);
        });
    },
    register() {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            this.userRegisterForm['phone'] = this.userRegisterForm['phone'];
            this.$store
              .dispatch("user/registerSms", this.userRegisterForm)
              .then((resp) => {
                this.closemodal();
                this.createShipAddress();
                this.$store.dispatch("app/showLoadingOverlay", false);
                localStorage.setItem("phone", this.userRegisterForm['phone']);
                localStorage.setItem("temp_phone",this.userRegisterForm['phone']);
                this.$swal({
                  icon: "success",
                  text: "Xin chúc mừng quý khách đã đăng ký thành công.",
                  confirmButtonText: "Tiếp tục",
                  allowOutsideClick: false,
                }).then((result) => {
                  this.addSession();
                  this.$nextTick(() => {});
                });
              })
              .catch((err) => {
                this.$store.dispatch("app/showLoadingOverlay", false);
                console.log("err: ", err);
              });
          } else {
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", true);
          console.log("validate form err: ", err);
        });
    },
    inputPhone: debounce(function($event) {
      this.searchUser($event);
    }),
    searchUser($event) {
      this.resetFormSms();
      this.user = null;
      this.validPhone = false;
      this.user_notfound = null;
      const value = $event.target.value;
      if (value && value.length == 10) {
        this.getUserByPhone(value);
      } else if ( this.userRegisterForm['phone'] && this.userRegisterForm['phone'].length < 10 ) {
        this.isDisable = true;
      }
    },
    getUserByPhone(phone) {
      this.phonechecking = true;
      this.showModalRegister = null;
      this.user = null;
      this.$store
        .dispatch("app/fetchData", `/v1/client/get-user-by-phone/${phone}`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.isDisable = false;
          this.phonechecking = false;
          if(resp && resp["data"]) {
            this.user = resp && resp["data"];
            this.initForm = 0;
          } else {
            this.sendSmsRegister();
            this.user_notfound = 1;
            this.initForm = 1;
          }
        })
        .catch((err) => {
          this.phonechecking = false;
          console.log("error getUserByPhone:", err);
        });
    },
    sendSmsRegister() {
      this.$store.dispatch("user/sendSms", {phone: this.userRegisterForm['phone']})
      .then((res) => {
        res ? this.downCount() : '';
      })
    },
    checkOTP(phone, sms_code) {
      let data = {
        phone: phone,
        sms_code: sms_code,
      }
      this.$store.dispatch("user/checkOtp", data)
      .then((res) => {
        if(res) {
          this.initForm = 0;
          this.showModalRegister = 1;
        } else {
          this.initForm = 1
        }
      })
    },
    showModalRegisterSocial(data) {
      this.$store.commit("user/showRegisterSocialModal", data);
    },
    loginWithGoogle () {
      this.$gAuth.signIn().then(GoogleUser => {
          // on success do something
          this.socialUser.id = GoogleUser.getBasicProfile().getId();
          this.socialUser.name = GoogleUser.getBasicProfile().getName();
          this.socialUser.email = GoogleUser.getBasicProfile().getEmail();
          this.socialUser.social_type = "GOOGLE";
          this.socialUser.avatar_url = GoogleUser.getBasicProfile().getImageUrl();
          this.loginSocial(this.socialUser);
      })
      .catch(error => {
        console.log('error', error)
      })
    },
    loginWithFacebook () {
      window.FB.login(response => {
        if (response && response.authResponse) {
          window.FB.api(`/${response.authResponse.userID}`, userResponse => {
            if (userResponse) {
              this.socialUser.id = userResponse.id;
              this.socialUser.name = userResponse.name;
              // this.socialUser.email = null;
              this.socialUser.social_type = "FACEBOOK";
              // this.socialUser.avatar_url =null;
              this.loginSocial(this.socialUser);
            }
          }, this.params);

        }
      }, this.params)
    },
    loginWithZalo () {
    },
    loginSocial(socialUser) {
      this.$store.dispatch("user/socialLogin", socialUser).then((resp) => {
        this.closemodal();
        localStorage.setItem("id_token", resp && resp['token']);
        if(resp && !resp['user_phone']) {
          this.showModalRegisterSocial(resp);
          return;
        } else {
          this.$router.push("/");
          location.reload();
        }
        this.$store.dispatch("app/showLoadingOverlay", false);
      })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            console.log("err: ", err);
          });
    },
    getCities() {
      this.$store.dispatch("app/fetchData", "v0/1/cities").then((data) => {
        this.cities = data.data;
      });
    },
    getDistrict(city_code) {
      if (!this.userRegisterForm.ward_code) {
        this.userRegisterForm.ward_code = "";
      }
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${city_code}/districts`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.districts = data.data;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getWard(district_code) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${district_code}/wards`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // //console.log("wards:", data);
          this.wards = data.data;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    createShipAddress() {
      let data = {
        id: "",
        full_name: this.userRegisterForm['name'],
        phone: this.userRegisterForm['phone'],
        city_code: this.formShippingAddress['city_code'],
        district_code: this.formShippingAddress['district_code'],
        ward_code: this.formShippingAddress['ward_code'],
        street_address: this.formShippingAddress['street_address'],
        is_default: 1,
      }
      this.$store
        .dispatch("user/createShippingAddress", data)
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        })
        .catch((err) => {
          this.$toast
            .error("Tạo địa chỉ giao hàng không thành công")
            .goAway(1500);
          // //console.log("Lỗi tạo địa chỉ giao hàng:", err);
        });
    },
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
.form-group {
  // margin: 0 0 0 0;
}
.input-b {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;

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
.resend {
  color: rgb(13, 92, 182) !important;
}
.txtphone {
  font-size: 30px;
}
.btn-google {
  color: #fff;
  background-color: #dd4b39;
  border-color: rgba(0,0,0,.2);
}
.btn-social {
  font-size: 1.2em;
}
.btn-facebook {
  color: #fff;
  background-color: #3b5998;
  border-color: rgba(0,0,0,.2);
    
}
</style>
