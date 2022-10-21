<template>
  <div>
    <b-modal
      v-model="modalShow"
      id="add-location-modal"
      ref="add-location-modal"
      hide-footer
      hide-header
      cancel-only:
      false
    >
    <button
        type="button"
        class="btn btn-close"
        data-dismiss="modal"
        @click="closemodal"
      >
        <i class="fa fa-close"></i>
      </button>
      <!-- no-close-on-backdrop -->
      <ValidationObserver ref="form">
        <form
          class="mt-15 form-address-shiping"
          @submit.prevent="onSubmit"
          v-if="form_state == 'new' || form_state == 'edit'"
        >
          <h2 class="text-center">THÔNG TIN GIAO HÀNG</h2>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Số điện thoại:</label>
            <div class="col-sm-9">
              <ValidationProvider rules="required|phone" v-slot="{ errors }">
                <input
                  type="phone"
                  maxlength="10"
                  placeholder="+84"
                  class="form-control"
                  v-model="formshippingaddress.phone"
                  @input="inputPhone($event)"
                />
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Họ và tên:</label>
            <div class="col-sm-9">
              <ValidationProvider
                rules="required|min:5"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  maxlength="255"
                  name="Họ và tên"
                  class="form-control"
                  v-model.trim="formshippingaddress.full_name"
                />
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Tỉnh/Thành phố:</label>
            <div class="col-sm-9">
              <ValidationProvider name="city_code" v-slot="{ errors }">
                <select
                  @change="getDistrict(formshippingaddress.city_code)"
                  v-model.trim="formshippingaddress.city_code"
                  class="form-control"
                  ref="city_code"
                >
                  <option value>Vui lòng chọn Tỉnh/Thành phố</option>
                  <option
                    :value="item.code"
                    v-for="(item, i) in cities"
                    :key="i"
                    >{{ item.name }}</option
                  >
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Quận/Huyện:</label>
            <div class="col-sm-9">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <select
                  :disabled="!formshippingaddress.city_code"
                  class="form-control"
                  v-model.trim="formshippingaddress.district_code"
                  @change="getWard(formshippingaddress.district_code)"
                >
                  <option value>Vui lòng chọn Quận/Huyện</option>
                  <option
                    :value="item.code"
                    v-for="(item, i) in districts"
                    :key="i"
                    >{{ item.name }}</option
                  >
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Phường/xã:</label>
            <div class="col-sm-9">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <select
                  :disabled="!formshippingaddress.district_code"
                  class="form-control"
                  v-model.trim="formshippingaddress.ward_code"
                >
                  <option value>Vui lòng chọn Phường/xã</option>
                  <option
                    :value="item.code"
                    v-for="(item, i) in wards"
                    :key="i"
                    >{{ item.name }}</option
                  >
                </select>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider rules="required|min:3" v-slot="{ errors }">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Địa chỉ:</label>
              <div class="col-sm-9">
                <textarea
                  :disabled="formshippingaddress['ward_code'] ? submitted : true"
                  name="Địa chỉ"
                  v-model.trim="formshippingaddress.street_address"
                  class="form-control"
                  rows="3"
                  placeholder="Số nhà, tên đường, toà nhà (nếu có)"
                ></textarea>
                <p class="error-message">{{ errors[0] }}</p>
              </div>
            </div>
          </ValidationProvider>

          <div class="form-group row" v-if="user">
            <label class="col-sm-3 col-form-label"
              ></label>
            <div class="col-sm-9">
              <b-form-checkbox
                v-model="formshippingaddress.is_default"
                name="is_default"
                value="1"
                unchecked-value="0"
              >
                Đặt làm địa chỉ mặc định
              </b-form-checkbox>
            </div>
          </div>

          <div class="btn-checkout">
            <b-button
            type="submit"
            :disabled="formshippingaddress['street_address'] ? submitted : true"
            class="btn btn btn-lg btn-nuti btn-secondary btn-block"
            >{{form_state == 'new' ? 'Xác nhận' : 'Cập nhật'}}</b-button
          >
          </div>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import Skeleton from "~/components/Skeleton";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";
import { debounce } from "debounce";
export default {
  data() {
    return {
      modalShow: false,
      shippingaddress: null,
      paymentaddress: [],
      countries: [],
      cities: [],
      wards: [],
      districts: [],
      submitted: false,
      form_state: "",
      islogged: false,
      formshippingaddress: {
        id: "",
        session_id: "",
        full_name: "",
        phone: "",
        city_code: "",
        district_code: "",
        ward_code: "",
        street_address: "",
        is_default: 0,
        city_name: "",
        district_name: "",
        ward_name: "",
      },
    };
  },
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ValidationProvider,
    ValidationObserver,
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  created() {
    this.getCities();
    this.islogged = localStorage.getItem("id_token");
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "user/showAddLocationModal") {
        this.formshippingaddress['session_id'] = localStorage.getItem("session_id");
        mutation && mutation.payload ? (this.form_state = "edit") : (this.form_state = "new");
        if (mutation.payload && mutation.payload != "new") {
          this.editForm(mutation.payload);
        } else {
          this.addForm();
        }
        this.modalShow = true;
      }
    });
  },
  methods: {
     showModalLogin(type) {
      this.$store.commit("user/showLoginModal", type);
    },
    getUserPhone(phone) {
      this.$store
        .dispatch("app/fetchData", `/v1/client/get-user-by-phone/${phone}`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (!resp["data"]) {
          } else {
            this.$swal({
              icon: "warning",
              text: "Số điện thoại đã tồn tại trong hệ thống vui lòng đăng nhập",
              confirmButtonText: "Xác nhận",
            }).then((result) => {
              this.showModalLogin();
            });
          }
        })
        .catch((err) => {
          console.log("error :", err);
        });
    },
    checkPhone() {
      if (this.formshippingaddress.phone.length > 9) {
        this.getUserPhone(this.formshippingaddress.phone);
      } else if (this.formshippingaddress.phone.length < 10) {
        this.user_info = {
          name: null,
          error: null,
        };
      }
    },
    addForm() {
      this.formshippingaddress['full_name'] = "";
      this.formshippingaddress['phone'] = "";
      this.formshippingaddress['city_code'] = "";
      this.formshippingaddress['district_code'] = "";
      this.formshippingaddress['ward_code'] = "";
      this.formshippingaddress['street_address'] = "";
      this.formshippingaddress['is_default'] = 0;
      this.formshippingaddress['city_name'] = "";
      this.formshippingaddress['district_name'] = "";
      this.formshippingaddress['ward_name'] = "";
    },
    editForm(data) {
      this.formshippingaddress['id'] = data['id'];
      this.formshippingaddress['full_name'] = data['full_name'];
      this.formshippingaddress['phone'] = data['phone'];
      this.formshippingaddress['city_code'] = data['city_code'] ? data['city_code'] : data['customer_city_code'];
      this.formshippingaddress['district_code'] = data['district_code'] ? data['district_code'] : data['customer_district_code'];
      this.formshippingaddress['ward_code'] = data['ward_code'] ? data['ward_code'] : data['customer_ward_code'];
      this.formshippingaddress['street_address'] = data['street_address'];
      this.formshippingaddress['is_default'] = data['is_default'];
      this.formshippingaddress['city_name'] = data['city_name'] ? data['city_name'] : data['customer_city_name'];
      this.formshippingaddress['district_name'] = data['district_name'] ? data['district_name'] : data['customer_district_name'];
      this.formshippingaddress['ward_name'] = data['ward_name'] ? data['ward_name'] : data['customer_ward_name'];
      // this.formshippingaddress = data;
      this.getDistrict(this.formshippingaddress['city_code']);
      this.getWard(this.formshippingaddress['district_code']);
    },
     closemodal() {
      this.modalShow = false;
    },
    getCities() {
      this.$store.dispatch("app/fetchData", "v0/1/cities").then((data) => {
        this.cities = data.data;
      });
    },
    getDistrict(city_code) {
      if (!this.formshippingaddress.ward_code) {
        this.formshippingaddress.ward_code = "";
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
      this.$store
        .dispatch("user/createShippingAddress", this.formshippingaddress)
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$emit('shippingAddress');
          this.$toast.success("Tạo địa chỉ giao hàng thành công").goAway(1500);
          this.modalShow = false;
        })
        .catch((err) => {
          this.$toast
            .error("Tạo địa chỉ giao hàng không thành công")
            .goAway(1500);
          // //console.log("Lỗi tạo địa chỉ giao hàng:", err);
        });
    },
    updateShippingAddress() {
      this.$store
        .dispatch("app/updateData", {
          param: `/v1/shipping_address/${this.formshippingaddress['id']}`,
          data: this.formshippingaddress,
        })
        .then((data) => {
          this.$emit('shippingAddress');
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$toast
            .success("Cập nhật địa chỉ giao hàng thành công")
            .goAway(1500);
          this.modalShow = false;
        });
    },
    setShippingAddress() {
          const city = this.cities.find((res) => {
          return this.formshippingaddress['city_code'] == res['code'];
          });
          const district = this.districts.find((res) => {
          return this.formshippingaddress['district_code'] == res['code'];
          });
          const ward = this.wards.find((res) => {
          return this.formshippingaddress['ward_code'] == res['code'];
          });
          this.formshippingaddress['city_name'] = city['name'];
          this.formshippingaddress['district_name'] = district['name'];
          this.formshippingaddress['ward_name'] = ward['name'];
          this.$store.dispatch("user/setShippingAddressClient", this.formshippingaddress);
          this.$emit('shippingAddress', this.formshippingaddress);

          this.modalShow = false;
    },
    onSubmit(e) {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            if(!this.islogged) {
              this.setShippingAddress();
            } else if (this.form_state == "edit") {
              this.updateShippingAddress();
            } else {
              this.createShipAddress();
            }
          } else {
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          // //console.log("validate success", success);
          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch((err) => {
          // //console.log("validate form err: ", err);
        });
    },
    inputPhone: debounce(function($event) {
      this.searchUser($event);
    }),
    searchUser($event) {
       const value = $event.target.value;
      if (!this.islogged && value && value.length == 10) {
        this.getUserByPhone(value);
      }
    },
    getUserByPhone(phone) {
      this.$store
        .dispatch("user/getUserByPhone", phone)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log('data', resp['data'])
          if(resp && resp['data']) {
            this.$swal({
              icon: "warning",
              text: "Số điện thoại quý khách đã tồn tại trong hệ thống.Vui lòng đăng nhập để mua hàng!",
              confirmButtonText: "Xác nhận",
            }).then((result) => {
              this.modalShow = false;
              this.showModalLogin()
            });
          } else {
            localStorage.setItem('phone', this.formshippingaddress['phone'])
            localStorage.setItem("temp_phone", this.formshippingaddress['phone']);
          }
        })
        .catch((err) => {
          console.log("error getUserByPhone:", err);
        });
    },
    showModalLogin() {
      this.$store.commit("user/showLoginModal");
    },
    goBack() {
      window.history.back();
    },
  },
  head: {
    title: "Địa chỉ giao hàng",
  },
};
</script>
