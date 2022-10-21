<template>
  <main role="main">
    <div class="step-checkout-section">
      <div class="container">
        <div class="row checkout-step">
          <div class="col d-flex justify-content-center">
            <ul class="progressbar">
              <li class="active"><nuxt-link to="/checkout/cart">Giỏ hàng</nuxt-link></li>
              <li class="">Giao hàng</li>
              <li>Thanh toán</li>
              <li>Xác nhận</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="main-page container">

       <div class="row justify-content-center">
          <div class="col-md-8">
      
      <h1>2. Địa chỉ giao hàng</h1>

      <div v-if="shippingaddress && shippingaddress.length">
        <p>Chọn địa chỉ giao hàng có sẵn bên dưới:</p>

        <div class="row">
          <div class="col-md-4" v-for="(item, i) in shippingaddress" :key="i">
            <div class="card user-address">
              <div class="card-body">
                <h5 class="card-title">{{item.full_name}}</h5>
                <p class="card-text">
                  {{item.city_name}}
                  <br />
                  {{item.district_name}}
                  <br />
                  {{item.ward_name}}
                  <br />
                  <br />
                  {{item.street_address}}
                  {{item.phone}}
                </p>
                <a @click="setAddressToOrder(item.id)" class="btn btn-primary">Giao đến địa chỉ này</a>
                <a class="btn btn-danger" href="#form-address-shiping" @click="edit(item)">Cập nhật</a>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-15">
          Bạn muốn giao hàng đến địa chỉ khác?
          <a
            href="#form-address-shiping"
            class="text-primary"
            @click="addNew()"
          >Thêm địa chỉ giao hàng mới</a>
        </p>
      </div>

          </div></div>

      <div class="container" id="form-address-shiping">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <ValidationObserver ref="form">
              <form
                class="mt-15 form-address-shiping"
                @submit.prevent="onSubmit"
                v-if="form_state == 'new' || form_state == 'edit'"
              >
                <h2 class="text-center">THÔNG TIN GIAO HÀNG</h2>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Họ và tên</label>
                  <div class="col-sm-9">
                    <ValidationProvider rules="required|min:5|full_name" v-slot="{ errors }">
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
                  <label class="col-sm-3 col-form-label">Số điện thoại</label>
                  <div class="col-sm-9">
                    <ValidationProvider rules="required|phone" v-slot="{ errors }">
                      <input
                        type="tel"
                        placeholder="+84"
                        class="form-control"
                        v-model="formshippingaddress.phone"
                      />
                      <p class="error-message">{{ errors[0] }}</p>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tỉnh/Thành phố</label>
                  <div class="col-sm-9">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <select
                        @change="getDistrict(formshippingaddress.city_id)"
                        v-model.trim="formshippingaddress.city_id"
                        class="form-control"
                      >
                        <option value>Vui lòng chọn Tỉnh/Thành phố</option>
                        <option :value="item.id" v-for="(item, i) in cities" :key="i">{{item.name}}</option>
                      </select>
                      <p class="error-message">{{ errors[0] }}</p>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Quận/Huyện</label>
                  <div class="col-sm-9">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <select
                        :disabled="!formshippingaddress.city_id"
                        class="form-control"
                        v-model="formshippingaddress.district_id"
                        @change="getWard(formshippingaddress.district_id)"
                      >
                        <option value>Vui lòng chọn Quận/Huyện</option>
                        <option
                          :value="item.id"
                          v-for="(item, i) in districts"
                          :key="i"
                        >{{item.name}}</option>
                      </select>
                      <p class="error-message">{{ errors[0] }}</p>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Phường/xã</label>
                  <div class="col-sm-9">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <select
                        :disabled="!formshippingaddress.district_id"
                        class="form-control"
                        v-model="formshippingaddress.ward_id"
                      >
                        <option value>Vui lòng chọn Phường/xã</option>
                        <option :value="item.id" v-for="(item, i) in wards" :key="i">{{item.name}}</option>
                      </select>
                      <p class="error-message">{{ errors[0] }}</p>
                    </ValidationProvider>
                  </div>
                </div>

                <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Địa chỉ</label>
                    <div class="col-sm-9">
                      <textarea
                        name="Địa chỉ"
                        v-model.trim="formshippingaddress.street_address"
                        class="form-control"
                        rows="3"
                        placeholder="Số nhà, tên đường, toà nhà (nếu có), phường xã"
                      ></textarea>
                      <p class="error-message">{{ errors[0] }}</p>
                    </div>
                    <p class="mt-15">Ví dụ: 70 Lữ Gia , Toà nhà Lữ Gia Plaza, phường 15</p>
                  </div>
                </ValidationProvider>

                <div class="btn-checkout">
                  <button
                    type="submit"
                    v-if="form_state == 'new'"
                    class="btn btn-danger btn-lg"
                  >GIAO ĐẾN ĐỊA CHỈ NÀY</button>
                  <button
                    type="submit"
                    v-if="form_state == 'edit'"
                    class="btn btn-danger btn-lg"
                  >CẬP NHẬT</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>

      <div class="btn-checkout mb-20">
        <button type="button" @click="goBack" class="btn btn-secondary btn-lg">QUAY LẠI</button>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import Logo from "~/components/Logo.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  layout: 'no-footer',
  data() {
    return {
      shippingaddress: null,
      paymentaddress: [],
      countries: [],
      cities: [],
      wards: [],
      districts: [],
      submitted: false,
      form_state: "",
      formshippingaddress: {
        full_name: "",
        phone: "",
        city_id: "",
        district_id: "",
        ward_id: "",
        street_address: "",
        is_default: 0
      }
    };
  },
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ValidationProvider,
    ValidationObserver
  },
  created() {
    this.getShippingAddress();

    // this.$store.dispatch("user/fetchData", "/paymentaddress").then(data => {
    //   this.paymentaddress = data;
    //   //console.log(">> paymentaddress:", data);
    // });

    // get tinh thanh mac dinh cua VN
    this.getCities();
  },
  methods: {
    getShippingAddress() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("user/getShippingAddress")
        .then(data => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.shippingaddress = data.data;
          // //console.log("getShippingAddress:", data);
          if (!this.shippingaddress || this.shippingaddress.length == 0) {
            this.addNew();
            // //console.log("set new");
          }
        })
        .catch(err => {
          // //console.log("getShippingAddress err: ", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getCities() {
      this.$store.dispatch("app/fetchData", "v1/1/cities").then(data => {
        // //console.log("cities:", data.data);
        this.cities = data.data;
      });
    },
    getDistrict(city_id) {
      if (!this.formshippingaddress.ward_id) {
        this.formshippingaddress.ward_id = "";
      }

      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v1/${city_id}/districts`)
        .then(data => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // //console.log("districts:", data);
          this.districts = data.data;
        })
        .catch(err => {
          // //console.log("err get districts: ", err);
          // this.$toast.error(
          //   "Không thể lấy được Quận huyện, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getWard(district_id) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${district_id}/wards`)
        .then(data => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // //console.log("wards:", data);
          this.wards = data.data;
        })
        .catch(err => {
          // //console.log("err get wards: ", err);
          // this.$toast.error(
          //   "Không thể lấy được Phường/xã, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    createShipAddress() {
      this.$store
        .dispatch("user/createShippingAddress", this.formshippingaddress)
        .then(res => {
          this.$toast.success("Tạo địa chỉ giao hàng thành công").goAway(1500);
          this.setAddressToOrder(res.data["id"]);
        })
        // .catch(err => {
        //   this.$toast
        //     .error("Tạo địa chỉ giao hàng không thành công")
        //     .goAway(1500);
        //   // //console.log("Lỗi tạo địa chỉ giao hàng:", err);
        // });
    },
    getCityNameByID() {
      const city = this.cities.find(city => {
        return city.zone_id == this.formshippingaddress.zone_id;
      });
      if (city) {
        return city["name"];
      } else {
        this.$toast
          .error("Không nhận dạng được tên Tỉnh/Thành phố")
          .goAway(1500);
      }
    },
    addNew() {
      this.form_state = "new";
      this.formshippingaddress = {
        full_name: "",
        phone: "",
        city_id: "",
        district_id: "",
        ward_id: "",
        street_address: "",
        is_default: 0
      };
    },
    setAddressToOrder(id) {
      // /existing
      this.$router.push("/checkout/payment");
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("order/setShippingaddressToOrder", id)
        .then(() => {
          this.$toast
            .success("Ghi nhận địa chỉ giao hàng thành công")
            .goAway(1500);
          setTimeout(() => {
            this.$router.push("/checkout/payment");
          }, 500);
          this.$store.dispatch("app/showLoadingOverlay", false);
        })
        .catch(err => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast
          //   .error("Ghi nhận địa chỉ giao hàng không thành công")
          //   .goAway(1500);
          // //console.log(err);
        });
    },
    setPaymentaddress(address_id) {
      // /existing
      //this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("order/setPaymentaddress", { address_id: address_id })
        .then(() => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          setTimeout(() => {
            this.$router.push("/checkout/payment?address_id=" + address_id);
          }, 500);
        })
        .catch(err => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast.error("Không thể set địa chỉ thanh toán").goAway(1500);
          // //console.log(err);
        });
    },
    edit(ship) {
      this.form_state = "edit";
      this.formshippingaddress = ship;
      if (ship.district_id) {
        this.getDistrict(ship.city_id);
        this.getWard(ship.district_id);
      }
    },
    onSubmit(e) {
      this.$refs.form
        .validate()
        .then(success => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            if (this.form_state == "edit") {
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
        .catch(err => {
          // //console.log("validate form err: ", err);
        });
    },
    updateShippingAddress() {
      this.$store
        .dispatch("app/updateData", {
          param: `/v1/shipping_address/${this.formshippingaddress.id}`,
          data: this.formshippingaddress
        })
        .then(data => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$swal({
            title: "Cập nhật thành công",
            showCancelButton: true,
            icon: "success",
            confirmButtonText: "Giao đến địa chỉ này",
            cancelButtonText: "Đóng"
          }).then(result => {
            if (result.value) {
              this.setAddressToOrder(this.formshippingaddress.id);
            }
            this.form_state = "";
            this.getShippingAddress();
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          });
        });
    },
    goBack() {
      window.history.back();
    }
  },
  head: {
    title: "Địa chỉ giao hàng"
  }
};
</script>

<style lang="scss">
</style>
