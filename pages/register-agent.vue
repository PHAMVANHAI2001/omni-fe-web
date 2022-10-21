<template>
  <main role="main">
    <div class="header-app">
      <div class="container">
        <h4>Chào mừng quý khách, nhập đầy đủ thông tin để trở thành đối tác của NUTIFOOD</h4>
        <div class="flex-fill d-flex text-center">
          <!-- <div class="border col-12 rounded p-2 flex-fill btn-primary">
            <a href="#">
              <h6 class="m-0 text-white">Quy trình đăng ký đại lý cá nhân</h6>
            </a>
          </div> -->
          <!-- <div class="border col-4 rounded p-2 flex-fill btn-primary">
            <a href="#">
              <h6 class="m-0 text-white">Chính sách đại lý</h6>
            </a>
          </div>
          <div class="border col-4 rounded p-2 flex-fill btn-success">
            <a href="#">
              <h6 class="m-0 text-white">Cách thức tham gia</h6>
            </a>
          </div>
          <div class="border col-4 rounded p-2 flex-fill btn-success">
            <a href="#">
              <h6 class="m-0 text-white">Quy trình đăng ký đại lý</h6>
            </a>
          </div> -->
        </div>
      </div>
    </div>

    <div class="step-register-section">
      <div class="container">
        <h2 class="text-center color-nuti text-uppercase font-weight-bold p-4">ĐĂNG KÝ LÀM ĐỐI TÁC NUTIFOOD</h2>
      </div>
    </div>

    <div class="main-page container">
      <div class="container pb-6" id="form-address-shiping">
        <div class="row justify-content-center">
            <div class="sss">
              <ValidationObserver ref="form">
                <form class="mt-15 form-address-shiping">
                  <div class="block-section">
                    <div class>
                      <h2 class="color-nuti">
                        <i class="fa fa-user color-nuti"></i> Thông tin khách
                        hàng
                      </h2>
                      <!-- <p class="heading-register-desc">
                        Thông tin đăng ký bên dưới sẽ giúp Công ty thiết lập hợp
                        đồng hợp tác kinh doanh với Quý Khách Hàng
                      </p> -->

                      <!-- họ và tên -->
                      <ValidationProvider
                          name="name"
                          rules="required|min:5"
                          v-slot="{ errors }"
                        >
                      <div class="form-field mb-4">
                          <input
                            type="text"
                            maxlength="255"
                            name="Họ và tên"
                            ref="name"
                            placeholder=" "
                            class="form-control form-input"
                            tabindex="2"
                            v-model.trim="formsRegesterAgent.name"
                          />
                          <span class="form-labels"> Họ và tên <span class="colorR">(*)</span></span>
                      </div>
                      <p class="error-message">{{ errors[0] }}</p>
                     </ValidationProvider>

                      <!-- Số điện thoại -->
                      <ValidationProvider
                          name="phone"
                          rules="required|min:10|phone"
                          v-slot="{ errors }"
                        >
                      <div class="form-field mb-4">
                          <input
                            type="tel"
                            maxlength="10"
                            tabindex="4"
                            name="Số điện thoại"
                            class="form-control form-input"
                            placeholder=" "
                            v-model="formsRegesterAgent.phone"
                          />
                          <span  class="form-labels">Số điện thoại <span class="colorR">(*)</span></span>
                      </div>
                     <p class="error-message">{{ errors[0] }}</p>
                     </ValidationProvider>

                      <!-- Email -->
                      <ValidationProvider
                            name="email"
                            rules="required|email"
                            v-slot="{ errors }"
                          >
                      <div class="form-field mb-4">
                          <input
                            type="email"
                            maxlength="30"
                            placeholder=" "
                            name="email"
                            ref="email"
                            tabindex="3"
                            class="form-control form-input"
                            v-model.trim="formsRegesterAgent.email"
                          />
                          <span  class="form-labels">Email <span class="colorR">(*)</span></span>
                      </div>
                     <p class="error-message">{{ errors[0] }}</p>
                     </ValidationProvider>

                      <!-- Số CMND/Căn Cước Công Dân -->
                     <ValidationProvider
                          name="id_number"
                          rules="required|min:9|max:12"
                          v-slot="{ errors }"
                        >
                      <div class="form-field mb-4">
                          <input
                            type="tel"
                            name="CMND"
                            maxlength="12"
                            ref="id_number"
                            placeholder=" "
                            class="form-control form-input"
                            id="id_number"
                            tabindex="6"
                            v-on:keyup="setInputFilter()"
                            v-model="formsRegesterAgent.id_number"
                          />
                          <span class="form-labels"> Số CMND/Căn Cước Công Dân<span class="colorR">(*)</span></span>
                      </div>
                       <p class="error-message">{{ errors[0] }}</p>
                      </ValidationProvider>
                
                      <!-- Ảnh CMND -->
                      <div class="form-group">
                          <div class="row">
                            <label class="col-md-12"
                              >Ảnh CMND<span class="text-danger"
                                >(*)</span
                              ></label
                            >
                            <p class="col-md-12 m-0">
                              Vui lòng cập nhật mặt trước và mặt sau của CMND.
                              Có thể cập nhật tối đa 2 hình.
                            </p>
                            <FileUpload
                              @getFileUpload="getFileUpload"
                            ></FileUpload>
                          </div>
                      </div>
                      <!-- Mã số thuế thu nhập cá nhân -->
                      <div class="form-field mb-4">
                        <input
                          type="text"
                          maxlength="20"
                          class="form-input"
                          name="Mã số thuế"
                          ref="tax"
                          placeholder=" "
                          tabindex="7"
                          v-model="formsRegesterAgent.tax"
                        />
                        <span  class="form-labels"> Mã số thuế thu nhập cá nhân (Nếu có)</span>
                      </div>

                      <h2 class="text-info">
                        <i class="fa fa-list-alt text-info"></i> Thông tin ngân
                        hàng
                      </h2>
                      <p class="heading-register-desc">
                        Đây là thông tin quan trọng giúp Công ty thanh toán cho
                        Qúy Khách hàng Đại lý cá nhân
                      </p>

                      <!-- Tên ngân hàng -->
                      <div class="form-group">
                        <ValidationProvider
                          rules="required"
                          name="banksSearch"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Tên ngân hàng<span class="text-danger"
                              >(*)</span
                            ></label
                          >
                          <select
                            class="form-control"
                            ref="district_code"
                            tabindex="12"
                            v-model="formsRegesterAgent.bank_id"
                          >
                            <option value>Tên ngân hàng</option>
                            <option
                              :value="item.code"
                              v-for="(item, i) in banksSearch"
                              :key="i"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>

                      <!-- Số tài khoản Ngân Hàng -->
                      <ValidationProvider
                          name="bank_account_number"
                          rules="required"
                          v-slot="{ errors }"
                        >
                      <div class="form-field mb-4">
                          <input
                            type="tel"
                            placeholder=" "
                            ref="bank_account_number"
                            name="Số tài khoản ngân hàng"
                            class="form-input"
                            tabindex="9"
                            v-model="formsRegesterAgent.bank_account_number"
                          />
                          <span  class="form-labels">Số tài khoản Ngân Hàng <span class="text-danger">(*)</span> </span>
                      </div>
                          <p class="error-message">{{ errors[0] }}</p>
                      </ValidationProvider>

                      <!-- Tên chủ tài khoản    -->
                      <ValidationProvider
                          name="bank_account_name"
                          rules="required"
                          v-slot="{ errors }"
                        >
                      <div class="form-field mb-4">
                          <input
                            type="text"
                            placeholder=" "
                            ref="bank_account_name"
                            name="Tên chủ tài khoản"
                            class="form-control form-input"
                            tabindex="10"
                            v-model="formsRegesterAgent.bank_account_name"
                          />
                            <span  class="form-labels">Tên chủ tài khoản <span class="text-danger">(*)</span> </span>
                      </div>
                          <p class="error-message">{{ errors[0] }}</p>
                      </ValidationProvider>


                      <h2 class="color-nuti">
                        <i class="fas fa-map-marker-alt color-nuti"></i> Địa chỉ
                        nhận hàng
                      </h2>
                      <!-- Tỉnh/Thành phố -->
                      <div class="form-group">
                        <ValidationProvider
                          name="city_code"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Tỉnh/Thành phố<span class="text-danger"
                              >(*)</span
                            ></label
                          >

                          <select
                            @change="getDistrict(formsRegesterAgent.city_code)"
                            v-model.trim="formsRegesterAgent.city_code"
                            v-bind:key="item"
                            class="form-control"
                            ref="city_code"
                            tabindex="11"
                          >
                            <option value>Chọn Tỉnh/Thành phố</option>
                            <option
                              :value="item.code"
                              v-for="(item, i) in cities"
                              :key="i"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <!-- Quận/Huyện -->
                      <div class="form-group">
                        <ValidationProvider
                          name="district_code"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Quận/Huyện<span class="text-danger"
                              >(*)</span
                            ></label
                          >
                          <select
                            :disabled="!formsRegesterAgent.city_code"
                            class="form-control"
                            ref="district_code"
                            tabindex="12"
                            v-model="formsRegesterAgent.district_code"
                            @change="getWard(formsRegesterAgent.district_code)"
                          >
                            <option value>Chọn Quận/Huyện</option>
                            <option
                              :value="item.code"
                              v-for="(item, i) in districts"
                              :key="i"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <!-- Phường/Xã -->
                      <div class="form-group">
                        <ValidationProvider
                          name="ward_code"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Phường/Xã<span class="text-danger"
                              >(*)</span
                            ></label
                          >
                          <select
                            :disabled="!formsRegesterAgent.district_code"
                            class="form-control"
                            ref="ward_code"
                            tabindex="13"
                            v-model="formsRegesterAgent.ward_code"
                          >
                            <option value>Chọn Phường/xã</option>
                            <option
                              :value="item.code"
                              v-for="(item, i) in wards"
                              :key="i"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <!-- Địa chỉ -->
                      <ValidationProvider
                          name="address"
                          rules="required"
                          v-slot="{ errors }"
                        >
                      <div class="form-field mb-4">
                          <input
                            type="text"
                            placeholder=" "
                            class="form-input form-control"
                            ref="address"
                            tabindex="14"
                            v-model="formsRegesterAgent.address"
                          />
                           <span  class="form-labels">Địa chỉ<span class="text-danger">(*)</span></span>
                      </div>
                      <p class="error-message">{{ errors[0] }}</p>
                      </ValidationProvider>
                      
                      <div
                        class="form-group"
                        v-if="formsRegesterAgent.ward_code"
                      >
                        <label class="col-form-label"
                          >Địa chỉ: {{ formsRegesterAgent.address }},
                          {{ formsRegesterAgent.ward_name }},
                          {{ formsRegesterAgent.district_name }},
                          {{ formsRegesterAgent.city_name }}</label
                        >
                      </div>

                      <div class="form-group">
                        <label class="col-form-label">
                          Xác nhận thông tin:</label
                        >
                        <p
                          class="d-flex justify-content-center"
                          style="line-height: 30px"
                        >
                          1. Cá nhân đăng ký xác nhận đồng ý cung cấp những
                          thông tin cá nhân ở trên và sẽ tự chịu trách nhiệm về
                          những thông tin đã đăng ký; và (II) cho phép Nutifood liên lạc theo số điện thoại, Email
                          và địa chỉ đã đăng ký. <br />
                          2. Cá nhân đăng ký xác nhận đã đọc và đồng ý với ĐIỀU
                          KIỆN VÀ ĐIỀU KHOẢN CHÍNH SÁCH ĐẠI LÝ CÁ NHÂN của Nutifood <br />
                          3. Nutifood đã nhận thông tin của
                          cá nhân đăng ký và sẽ phản hồi lại qua email đã được
                          cung cấp. <br />
                          Bằng việc Nutifood xác nhận thông
                          tin đăng ký của cá nhân qua email, hành vi này sẽ cấu
                          thành hợp đồng giữa hai bên mà không cần phải in và ký
                          vào văn bản.
                        </p>
                      </div>
                      <div class="pt-4">
                        <input
                          type="checkbox"
                          id="isChecked"
                          name="isChecked"
                          v-model="isChecked"
                        />
                        <label style="display: initial" for="isChecked"
                          >Tôi đồng ý với tất cả các điều khoản trên.</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="btn-checkout">
                    <b-button
                      @click="nextStep()"
                      block
                      :disabled="!isChecked"
                      class="btn btn-success btn-lg"
                    >
                      Xác nhận đăng ký
                      <!-- <img src="~/assets/images/loadding.gif" alt=""> -->
                    </b-button>
                  </div>

                  <div class="btn-checkout color-nuti mb-20">
                    <b-button type="button" block @click="goBack" variant="outline-success" style="margin-top: 10px">QUAY LẠI</b-button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
  </main>
  <!-- /.container -->
</template>

<script>
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Autocomplete from "v-autocomplete";
import Vue from "vue";
Vue.use(Autocomplete);
import ItemAutocomplete from "../components/ItemAutocomplete";
import Loading2 from "~/components/Loading2";
import FileUpload from "~/components/FileUpload";
export default {
  data() {
    return {
      template: ItemAutocomplete,
      countries: [],
      cities: [],
      wards: [],
      districts: [],
      banks: [],
      item: null,
      banksSearch: [],
      submitted: false,
      isChecked: false,
      form_state: "",
      validPhone: false,
      formsRegesterAgent: {
        name: "",
        phone: "",
        city_code: "",
        district_code: "",
        ward_code: "",
        city_name: "",
        district_name: "",
        ward_name: "",
        id_number: "",
        address: "",
        bank_account_number: "",
        bank_account_name: "",
        bank_id: "",
        bank_branch: "",
        email: "",
        reference_phone: "",
        password: "",
        group_code: "" ,
        agent_register: 1,
        store_token: process.env.store_token,
        id_images: "",
      },
    };
  },
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ValidationProvider,
    ValidationObserver,
    Loading2,
    FileUpload,
  },
  computed: mapState({
    user_profile: (state) => state.user.user,
  }),
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
  },
  created() {
    this.getCities();
    this.getBanks();
  },
  methods: {
    getFileUpload(data) {
      console.log('data:', data)

      // if (data.length > 1) {
      //   const arrayFile = [];
      //   data.map((item) => {
      //     arrayFile.push(item.id);
      //   });
      //   this.formsRegesterAgent.id_images = arrayFile.join(",");
      // }
    },

    handleSelectedFiles() {
      let selectedFiles = this.$refs.fileInput.files;
      // console.log("selectedFiles", selectedFiles);
      for (let i = 0; i < selectedFiles.length; i++) {
        /*Check Already Has Been Selected Or Not ...*/
        this.files = selectedFiles[0];
      }
      this.uploadFile();
    },

    uploadFile() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      const formdata = new FormData();
      formdata.append("files[" + 0 + "]", this.files);
      this.$store
        .dispatch("app/uploadFile", {
          data: formdata,
          param: `${process.env.MEDIA_URL}/upload`,
        })
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.formProfile.avatar = `${process.env.MEDIA_URL}/file/${res.id}`;
          if (this.formProfile.avatar) {
            this.profile.avatar = this.formProfile.avatar;
          }
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },


    itemSelected(item) {
      this.formsRegesterAgent.bank_id = item.id;
    },
    updateBanks(text) {
      this.banksSearch = this.banks.filter((item) => {
        return new RegExp(text.toLowerCase()).test(item.name.toLowerCase());
      });
    },
    sendNotifyToAdmin() {
      console.log("send socket...");
      /* Emit events */
      const that = this;
      this.socket.emit(
        "ecom_sytem_message",
        {
          event: "NEW_AGENT",
          user_code: that.district_code,
          message: `Khách hàng ${that.formsRegesterAgent.name} đã đăng ký để trở thành đại lý.`,
        },
        (resp) => {
          /* Handle response, if any */
          console.log("send socket success:", resp);
        }
      );
    },
    getLabel(item) {
      return item ? item.name : "";
    },
    getGroups() {
      this.$store
        .dispatch("app/fetchData", "client/auth/user-group")
        .then((data) => {
          this.groups = data.user_groups;
        });
    },
    getBanks() {
      this.$store.dispatch("app/fetchData", `v0/banks`).then((data) => {
        this.banks = data.data;
        this.banksSearch = this.banks;
      });
    },

    getCities() {
      this.$store.dispatch("app/fetchData", `v0/1/cities`).then((data) => {
        this.cities = data.data;
      });
    },
    getDistrict(city_code) {
      this.formsRegesterAgent.ward_code = "";
      this.formsRegesterAgent.district_code = "";
      // this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${city_code}/districts`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.districts = data.data;
        })
        .catch((err) => {
          // this.$toast.error(
          //   "Không thể lấy được Quận huyện, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getWard(district_code) {
      // this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${district_code}/wards`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.wards = data.data;
        })
        .catch((err) => {
          // this.$toast.error(
          //   "Không thể lấy được Phường/xã, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getCityNameByID() {
      const city = this.cities.find((city) => {
        return city.zone_id == this.formsRegesterAgent.zone_id;
      });
      if (city) {
        return city["name"];
      } else {
        this.$toast
          .error("Không nhận dạng được tên Tỉnh/Thành phố")
          .goAway(1500);
      }
    },
    createAccount() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("user/register", this.formsRegesterAgent)
        .then((data) => {
          this.sendNotifyToAdmin();
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$router.push("/register-success");
          localStorage.removeItem("phone");
          this.$swal({
            icon: "success",
            title: "Đăng ký thành công",
            text:
              "Thông tin của quý khách hàng đã được chuyển đến Nutifood để xem xét và phê duyệt trong 3 ngày",
            confirmButtonText: "Hoàn tất",
            allowOutsideClick: false,
          }).then(() => {
            // localStorage.clear();
            // this.$router.push("/");
            this.$nextTick(() => {});
          });
        })
        .catch((err) => {
          console.log("error confirm order:", err);
        });
    },
    nextStep() {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            this.createAccount();
          } else {
            this.focusForm();
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          this.$nextTick(() => {});
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goBack() {
      window.history.back();
    },
    inputFilter(value) {
      return /^\d*$/.test(value);
    },
    setInputFilter() {
      [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
      ].forEach((event) => {
        if (this.inputFilter(this.formsRegesterAgent.id_number)) {
          let oldValue = this.formsRegesterAgent.id_number;
        } else if (this.hasOwnProperty("oldValue")) {
          this.formsRegesterAgent.id_number = oldValue;
        } else {
          this.formsRegesterAgent.id_number = "";
        }
      });
    },
  },
  head: {
    title: "Đăng ký đại lý",
  },
};
</script>

<style lang="scss">
.form-address-shiping h2 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.step-register-section .progressbar > li::before {
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 1.5em;
}
.step-register-section .progressbar > li::after {
  top: 30px;
}
.step-register-section .progressbar > li {
  font-size: 0.9em;
  text-transform: capitalize;
}
.step-register-section .progressbar {
  display: contents;
}
.step-register-section .progressbar .step-active::before {
  border-color: #b90943;
  background: #b90943;
  color: white;
}
.step-register-section .progressbar .step-active {
  color: #b90943;
}
.step-register-section .progressbar .step-active:after {
  background: #b90943;
}
.info-agent-agreement {
  overflow: scroll;
  background-color: #e6e6e6;
  max-height: 300px;
}
</style>
