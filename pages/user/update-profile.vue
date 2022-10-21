<template>
  <main role="main">
    <h3>Thông tin cá nhân</h3>

    <div class="block-section">
      <div class="row">
        <div class="col-md-6">
          <ValidationObserver ref="form">
            <form @submit.prevent="submit">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-group md-style-group">
                  <input
                    type="text"
                    v-md-style
                    autocomplete="off"
                    v-model.trim="form.fullname"
                    id="txtfullname"
                    class="form-control"
                  />
                  <label for="txtfullname">Họ và tên</label>
                </div>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider rules="required" v-slot="{ errors }">
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
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider rules="required|phone" v-slot="{ errors }">
                <div class="form-group md-style-group">
                  <input
                    type="tel"
                    v-model.trim="form.telephone"
                    id="txtphone"
                    autocomplete="off"
                    name="Số điện thoại"
                    v-md-style
                    class="form-control"
                  />
                  <label for="txtphone">Số điện thoại</label>
                </div>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>

              <p>Ngày sinh</p>
              <div class="row">
                <div class="form-group col">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <select v-model.trim="date.day" class="form-control">
                      <option value>Ngày</option>
                      <option v-for="(i) in days" :key="i" :value="i">{{i}}</option>
                    </select>
                    <p class="error-message">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
                <div class="form-group col">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <select v-model.trim="date.month" class="form-control">
                      <option value>Tháng</option>
                      <option v-for="(i) in months" :key="i" :value="i">{{i}}</option>
                    </select>
                    <p class="error-message">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
                <div class="form-group col">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <select v-model.trim="date.year" class="form-control">
                      <option value>Năm</option>
                      <option v-for="(i) in years" :key="i" :value="i">{{i}}</option>
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
                          v-model.trim="form.custom_field.account['5']"
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
                          v-model.trim="form.custom_field.account['5']"
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
                  </div>
                </div>
              </div>

              <button
                type="submit"
                block
                class="btn register-button btn-lg btn-block btn-danger"
              >Cập nhật</button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import UserMenuPanel from "~/components/UserMenuPanel";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  layout: "admin",
  components: {
    ValidationProvider,
    ValidationObserver,
    UserMenuPanel
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
        fullname: null,
        firstname: null,
        lastname: null,
        email: null,
        confirm: true,
        telephone: "",
        newsletter: false,
        custom_field: {
          account: {
            "4": "", // ngay thang nam sinh
            "5": "" // giới tính
          }
        }
      }
    };
  },
  created() {
    // init datetime
    this.getDays();
    this.getMonth();
    this.getYears();
    this.$store.dispatch("user/fetchData", "/account").then(data => {
      this.form.fullname = data.firstname + " " + data.lastname;
      this.form.email = data.email;
      this.form.telephone = data.telephone;
      const brithdayArray = data.account_custom_field[4].split("/");
      this.date.day = brithdayArray[0];
      this.date.month = brithdayArray[1];
      this.date.year = brithdayArray[2];
      this.form.custom_field.account["5"] = data.account_custom_field[5];
    });
  },
  methods: {
    submit() {
      this.$refs.form
        .validate()
        .then(success => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            const brithday =
              this.date.day + "/" + this.date.month + "/" + this.date.year;
            this.form.custom_field.account["4"] = brithday;
            const firstName = this.form.fullname
              .split(" ")
              .slice(0, -1)
              .join(" ");
            const lastName = this.form.fullname
              .split(" ")
              .slice(-1)
              .join(" ");
            (this.form.firstname = firstName),
              (this.form.lastname = lastName),
              this.$store
                .dispatch("user/updateProfile", this.form)
                .then(() => {
                  this.$store.dispatch("app/showLoadingOverlay", false);
                  this.$toast.success("Update thành công").goAway(1500);
                  this.$router.push("/user/profile");
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
          // //console.log("validate register success", success);
          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch(err => {
          // //console.log("validate form err: ", err);
        });
    },
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
</style>