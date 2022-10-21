<template>
  <main role="main">

        <div class="col">
          <h1>Sổ địa chỉ</h1>
          <div class="block-section">
          <div class="container">
            <div class="row">
              <p class="mt-15">
                <a class="text-primary" @click="addNew()" href="#form-address-shiping">
                  <span class="fa fa-plus"></span> Thêm địa chỉ giao hàng mới
                </a>
              </p>
            </div>
            <div class="row">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">SĐT</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in shippingaddress" :key="i">
                    <td>{{item.full_name}}</td>
                    <td>

                        <p>{{item.city_name}},{{item.district_name}},{{item.district_name}},{{item.ward_name}}</p>
                        <p>{{item.street_address}}</p>
                      
                    </td>
                    <td>{{item.phone}}</td>
                    <td>
                      <a href="#form-address-shiping" @click="edit(item)">
                        <i class="fa fa-cog"></i>
                      </a>
                      <a href="#form-address-shiping" @click="removeAddress(item)">
                        <i class="fa fa-close"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="row justify-content-center">
                <div class="col-8 text-center">
                  <ValidationObserver ref="form">
                    <form
                      class="mt-15 form-address-shiping"
                      id="form-address-shiping"
                      @submit.prevent="onSubmit"
                      v-if="form_state == 'new' || form_state == 'edit'"
                    >
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Họ và tên</label>
                        <div class="col-sm-9">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <input
                              type="text"
                              class="form-control"
                              v-model="formshippingaddress.fullname"
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
                              placeholder="+84."
                              class="form-control"
                              v-model="formshippingaddress.telephone"
                            />
                            <p class="error-message">{{ errors[0] }}</p>
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Quốc gia</label>
                        <div class="col-sm-9">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <select
                              @change="getCountryDetail()"
                              v-model.trim="formshippingaddress.country_id"
                              class="form-control"
                            >
                              <option value>Vui lòng chọn Quốc gia</option>
                              <option
                                :value="item.country_id"
                                v-for="(item, i) in countries"
                                :key="i"
                              >{{item.name}}</option>
                            </select>
                            <p class="error-message">{{ errors[0] }}</p>
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Tỉnh/Thành phố</label>
                        <div class="col-sm-9">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <select
                              @change="getDistrict(formshippingaddress.zone_id)"
                              v-model.trim="formshippingaddress.zone_id"
                              class="form-control"
                            >
                              <option value>Vui lòng chọn Tỉnh/Thành phố</option>
                              <option
                                :value="item.zone_id"
                                v-for="(item, i) in cities"
                                :key="i"
                              >{{item.name}}</option>
                            </select>
                            <p class="error-message">{{ errors[0] }}</p>
                          </ValidationProvider>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Quận/Huyện</label>
                        <div class="col-sm-9">
                          <select
                            :disabled="!formshippingaddress.zone_id"
                            class="form-control"
                            v-model="formshippingaddress.district_id"
                          >
                            <option value>Vui lòng chọn Quận/Huyện</option>
                            <option
                              :value="item.id"
                              v-for="(item, i) in districts"
                              :key="i"
                            >{{item.name}}</option>
                          </select>
                        </div>
                      </div>

                      <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Địa chỉ</label>
                          <div class="col-sm-9">
                            <textarea
                              name="Địa chỉ"
                              v-model.trim="formshippingaddress.address_1"
                              class="form-control"
                              rows="3"
                              placeholder="Số nhà, tên đường, toà nhà (nếu có), phường xã"
                            ></textarea>
                            <p class="error-message">{{ errors[0] }}</p>
                          </div>
                          <p class="mt-15">Ví dụ: 70 Lữ Gia , Toà nhà Lữ Gia PlazaPlaza, phường 15</p>
                        </div>
                      </ValidationProvider>

                      <div class="btn-checkout">
                        <button
                          type="submit"
                          v-if="form_state == 'new'"
                          class="btn btn-danger btn-lg"
                        >TẠO</button>
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

              <div v-if="shippingaddress && shippingaddress.length == 0" class="alert alert-warning" role="alert">
                Bạn chưa có địa chỉ nào.
              </div>

            </div>
          </div>
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
import UserMenuPanel from "~/components/UserMenuPanel";
import axios from "axios";
export default {
  layout: "admin",
  data() {
    return {
      shippingaddress: null,
      countries: [],
      cities: [],
      zones: [],
      districts: [],
      submitted: false,
      form_state: "",
      formshippingaddress: {
        firstname: "",
        lastname: "",
        fullname: "",
        city: "",
        telephone: "",
        address_1: "",
        address_2: "",
        country_id: "230",
        postcode: "",
        zone_id: "",
        district_id: ""
      }
    };
  },
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ValidationProvider,
    ValidationObserver,
    UserMenuPanel
  },
  computed: {},
  created() {
    this.getShippingAddress();
    // this.$store.dispatch("user/fetchData", "/countries").then(data => {
    //   this.countries = data;
    // });
    // get tinh thanh mac dinh cua VN
    this.getCountryDetail();
  },
  methods: {
    getShippingAddress() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("user/getShippingAddress")
        .then(data => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.shippingaddress = data.data;
        })
        .catch(err => {
          // //console.log("getShippingAddress err: ", err);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getCountryDetail() {
      this.$store
        .dispatch(
          "user/fetchData",
          "/countries/" + this.formshippingaddress.country_id
        )
        .then(data => {
          this.cities = data.zone;
        });
    },
    createShipAddress() {
      this.generatorLastandFirstname();
      this.$store
        .dispatch("user/createShippingAddress", this.formshippingaddress)
        .then(res => {
          this.$toast.success("Tạo địa chỉ giao hàng thành công").goAway(1500);
          this.$store.dispatch("user/getShippingAddress").then(data => {
            this.getShippingAddress();
          });
        })
        .catch(err => {
          // this.$toast
          //   .error("Tạo địa chỉ giao hàng không thành công")
          //   .goAway(1500);
          // //console.log(err);
        });
    },
    generatorLastandFirstname() {
      const firstName = this.formshippingaddress.fullname
        .split(" ")
        .slice(0, -1)
        .join(" ");
      const lastName = this.formshippingaddress.fullname
        .split(" ")
        .slice(-1)
        .join(" ");
      this.formshippingaddress.city = this.getCityNameByID();
      this.formshippingaddress.firstname = firstName;
      this.formshippingaddress.lastname = lastName;
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
        firstname: "",
        lastname: "",
        fullname: "",
        city: "",
        telephone: "",
        address_1: "",
        address_2: "",
        country_id: "230",
        postcode: "",
        zone_id: ""
      };
    },
    async getDistrict(zoneId) {
      if (!this.formshippingaddress.address_id) {
        this.formshippingaddress.district_id = "";
      }
      this.$store
        .dispatch("app/fetchDataNoHeader", "/district&zone_id=" + zoneId)
        .then(res => {
          this.districts = res.data;
        })
        .catch(err => {});
    },
    edit(ship) {
      this.form_state = "edit";
      this.formshippingaddress = ship;
      // create fullname
      this.formshippingaddress.fullname = ship.firstname.concat(
        " ",
        ship.lastname
      );
      if (ship.district_id) {
        this.getDistrict(ship.zone_id);
      }
    },
    removeAddress(item) {
      this.$store
        .dispatch("app/delete", {
          param: "/account/address/" + item.address_id,
          data: ""
        })
        .then(res => {
          this.$toast.success("Xóa thành công").goAway(1500);
          this.getShippingAddress();
        })
        .catch(err => {});
    },
    onSubmit(e) {
      // //console.log("submit:", this.$refs.form);
      this.$refs.form
        .validate()
        .then(success => {
          if (success) {
            if (this.form_state == "new") {
              this.createShipAddress();
            } else {
              this.updateShippingAddress();
            }
          } else {
            return;
          }
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch(err => {
          // //console.log("validate not oke", err);
        });
    },
    updateShippingAddress() {
      this.generatorLastandFirstname();
      this.$store
        .dispatch("app/updateData", {
          param: `/account/address/${this.formshippingaddress.address_id}`,
          data: this.formshippingaddress
        })
        .then(data => {
          this.$toast.success("Cập nhật thành công").goAway(1500);
          this.form_state = "";
          this.getShippingAddress();
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        });
    }
  },
  head: {
    title: "Sổ địa chỉ"
  }
};
</script>

<style lang="scss">
</style>
