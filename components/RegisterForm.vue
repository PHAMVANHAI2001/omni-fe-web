<template>
  <div>
    <b-modal ref="register-modal" id="register-modal" hide-header hide-footer>
      <ValidationObserver ref="form">
        <form @submit.prevent="submit">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="form-group md-style-group">
              <input
                type="text"
                v-md-style
                autocomplete="off"
                v-model.trim="form.name"
                id="txtfullname"
                class="form-control"
              />
              <label for="txtfullname">Họ và tên</label>
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

            <div class="form-group md-style-group">
              <input
                type="email"
                v-model.trim="form.email"
                id="txtemail"
                v-md-style
                autocomplete="off"
                class="form-control"
              />
              <label for="txtemail">Địa chỉ email</label>
            </div>

          <ValidationProvider rules="required|phone" v-slot="{ errors }">
            <div class="form-group md-style-group">
              <input
                type="tel"
                v-model.trim="form.phone"
                id="txtphone"
                autocomplete="off"
                name="Số điện thoại"
                v-md-style
                class="form-control"
                style="flex:1"
              />
              <label for="txtphone">Số điện thoại</label>
              <button type="button" class="btn-sms" @click="getSMSCode()">
                Gửi mã xác thực
              </button>
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="form-group md-style-group">
              <input
                v-model.trim="form.sms_code"
                type="tel"
                autocomplete="off"
                name="Số điện thoại"
                v-md-style
                class="form-control"
              />
              <label for="txtphone"
                >Nhập mã xác thực gửi tới số điện thoại trên</label
              >
            </div>
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="form-group md-style-group">
              <input
                type="password"
                class="form-control"
                id="txtpass"
                v-md-style
                autocomplete="off"
                v-model.trim="form.password"
              />
              <label for="txtpass">Mật khẩu</label>
            </div>

            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>

          <p>Ngày sinh</p>
          <div class="row">
            <div class="form-group col">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <select v-model.trim="date.day" class="form-control">
                  <option value>Ngày</option>
                  <option v-for="i in days" :key="i" :value="i">{{ i }}</option>
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
            <div class="form-group col">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <select v-model.trim="date.month" class="form-control">
                  <option value>Tháng</option>
                  <option v-for="i in months" :key="i" :value="i">{{
                    i
                  }}</option>
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
            <div class="form-group col">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <select v-model.trim="date.year" class="form-control">
                  <option value>Năm</option>
                  <option v-for="i in years" :key="i" :value="i">{{
                    i
                  }}</option>
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="form-group select-old form-inline">
                <div class="custom-radio">
                  <div class="pretty p-default p-round p-thick">
                    <input
                      type="radio"
                      value="1"
                      class="custom-control-input"
                      id="men"
                      name="Sex"
                      checked="checked"
                    />
                    <div class="state">
                      <label class="custom-control-label" for="men">Nam</label>
                    </div>
                  </div>
                </div>
                <div class="custom-radio">
                  <div class="pretty p-default p-round p-thick">
                    <input
                      type="radio"
                      value="2"
                      name="Sex"
                      class="custom-control-input"
                      id="women"
                    />

                    <div class="state">
                      <label class="custom-control-label" for="women">Nữ</label>
                    </div>
                  </div>
                </div>
                <div class="custom-radio">
                  <div class="pretty p-default p-round p-thick">
                    <input
                      type="radio"
                      value="3"
                      name="Sex"
                      class="custom-control-input"
                      id="other"
                    />

                    <div class="state">
                      <label class="custom-control-label" for="other"
                        >Khác</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            block
            class="btn register-button btn-lg btn-block btn-danger"
          >
            ĐĂNG KÝ
          </button>

          <b-button block @click="$bvModal.hide('register-modal')">Huỷ</b-button>
          
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
    ValidationObserver
  },
  data() {
    return {
      date: {
        day: "",
        month: "",
        year: ""
      },
      days: [],
      months: [],
      years: [],
      form: {
        name: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        phone: "",
        sms_code: null,
        store_token: process.env.store_token,
      }
    };
  },
  created() {
    this.$store.subscribe(mutation => {
      if (mutation.type == "app/showRegisterModal") {
        setTimeout(() => {
          this.$refs["register-modal"].show();
        }, 250);
      }
    });

    // init datetime
    this.getDays();
    this.getMonth();
    this.getYears();
  },
  methods: {
    closemodal() {
      this.$refs["register-modal"].hide();
    },
    resetForm() {
      this.date.day = null;
      this.date.month = null;
      this.date.year = null;
      this.form.name = null;
      this.form.firstname = null;
      this.form.lastname = null;
      this.form.email = null;
      this.form.password = null;
      this.form.phone = null;
      this.form.sms_code = null;
    },
    submit() {
      this.$refs.form
        .validate()
        .then(success => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            const brithday = this.date.year+'-'+this.date.month+'-'+this.date.day ;
            // console.log("ready to submit !", this.form);
            const firstName = this.form.name
              .split(" ")
              .slice(0, -1)
              .join(" ");
            const lastName = this.form.name
              .split(" ")
              .slice(-1)
              .join(" ");
            (this.form.firstname = firstName),
              (this.form.lastname = lastName),

              this.$store
                .dispatch("user/register", this.form)
                .then(() => {
                  this.resetForm()
                  this.closemodal()
                  this.$refs["register-modal"].hide();
                  this.$store.dispatch("app/showLoadingOverlay", false);
                  this.$toast.success("Đăng ký thành công").goAway(1500);
                  this.$router.push("user");
                  this.$store.dispatch("app/showLoadingOverlay", false);
                })
                .catch(err => {
                  this.$store.dispatch("app/showLoadingOverlay", false);
                  // if (err.data && err.data.error) {
                  //   this.$toast.error(err.data.error[0]).goAway(2500);
                  // }
                });
          } else {
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          // console.log("validate register success", success);
          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch(err => {
          // console.log("validate form err: ", err);
        });
    },
    getSMSCode()
    {
       const formsend = {
        data: {phone:this.form.phone},
        url: "/client/auth/get-sms-code",
      };
      this.$store.dispatch("app/postData_2",formsend)
                .then((resp) => {
                  console.log("phone",resp)
                })
                .catch(err => {
                  console.log("phone",err)
                });
    }
    ,
    getDays() {
      for (let i = 1; i <= 31; i++) {
        this.days.push(i);
      }
    },
    /**
     * @param {int} The month number, 0 based
     * @param {int} The year, not zero based, required to account for leap years
     * @return {Date[]} List with date objects for each day of the month
     */
    getDaysInMonth(month, year) {
      var date = new Date(year, month, 1);
      var days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      this.days = days;
    },
    getMonth() {
      for (let i = 1; i <= 12; i++) {
        this.months.push(i);
      }
    },
    getYears() {
      for (let i = 1901; i < 2005; i++) {
        this.years.push(i);
      }
    }
  }
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
