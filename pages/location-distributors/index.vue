<template>
  <main role="main">
    <div class="clearfix mb-5">
      <div class="container">
        <div class="isn-mobile">
          <b-breadcrumb :items="title"></b-breadcrumb>
        </div>
        <div class="col-md-12 col-12 mb-6 mt-3">
          <h1 class="text-center color-nuti fs-25">
            DANH SÁCH TRUNG TÂM PHÂN PHỐI VÀ NHÀ PHÂN PHỐI NUTIFOOD TRÊN CẢ NƯỚC
          </h1>
          <!-- <section class="mt-3 mb-3">
            <div class="row">
              <div class="col-md-6 col-sm-12 col-12">
                <div class="row" v-if="isMobile">
                  <div class=" col-md-6 col-sm-6 col-12 text-center">
                    <img
                      class="icon-number-distributors"
                      src="~/assets/images/icon/icon-number-distributors-1.png"
                      alt=""
                      width="50%"
                    />
                  </div>
                  <div class="col-md-6 col-sm-6 col-12 pl-pr-0 text-center-mb">
                    <h4 class="mt-3 mb-1">TRUNG TÂM PHÂN PHỐI</h4>
                    <h2>8</h2>
                  </div>
                </div>
                <b-card
                  img-src="~/assets/images/icon/icon-number-distributors-1.png"
                  img-alt="Card image"
                  img-left
                  class="mb-3"
                  v-if="!isMobile"
                >
                  <b-card-text>
                    <h4>TRUNG TÂM PHÂN PHỐI</h4>
                    <h1>8</h1>
                  </b-card-text>
                </b-card>
              </div>
              <div class="col-md-6 col-sm-12 col-12">
                <div class="row" v-if="isMobile">
                  <div class=" col-md-6 col-sm-6 col-12 text-center">
                    <img
                      class="icon-number-distributors"
                      src="~/assets/images/icon/icon-number-distributors-2.png"
                      alt=""
                      width="50%"
                    />
                  </div>
                  <div class="col-md-6 col-sm-6 col-12 pl-pr-0 text-center-mb">
                    <h4 class="mt-3 mb-1">NHÀ PHÂN PHỐI</h4>
                    <h2>130</h2>
                  </div>
                </div>
                <b-card
                  img-src="~/assets/images/icon/icon-number-distributors-2.png"
                  img-alt="Card image"
                  img-left
                  class="mb-3"
                  v-if="!isMobile"
                >
                  <b-card-text>
                    <h4>NHÀ PHÂN PHỐI</h4>
                    <h1>130</h1>
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </section> -->
          <section>
            <div>
              <form>
                <div class="row ml-3 mr-3">
                  <div class="col-md-4 col-12">
                    <div class="form-group row pl-3 pr-3">
                      <!-- <ValidationProvider
                          name="city_code"
                          v-slot="{ errors }"
                        > -->
                      <select
                        @change="getDistrict(formlocation.city_code)"
                        v-model.trim="formlocation.city_code"
                        class="form-control"
                        ref="city_code"
                      >
                        <option value>Tất cả tỉnh / thành</option>
                        <option
                          :value="item.code"
                          v-for="(item, i) in cities"
                          :key="i"
                          >{{ item.name }}</option
                        >
                      </select>
                      <!-- <p class="error-message">{{ errors[0] }}</p> -->
                      <!-- </ValidationProvider> -->
                    </div>
                  </div>
                  <div class="col-md-4 col-12">
                    <div class="form-group row pl-3 pr-3">
                      <!-- <ValidationProvider
                          name="city_code"
                          v-slot="{ errors }"
                        > -->
                      <select
                        @change="getWard(formlocation.district_code)"
                        :disabled="!formlocation.city_code"
                        class="form-control"
                        v-model.trim="formlocation.district_code"
                      >
                        <option value>Tất cả quận / huyện</option>
                        <option
                          :value="item.code"
                          v-for="(item, i) in districts"
                          :key="i"
                          >{{ item.name }}</option
                        >
                      </select>
                      <!-- <p class="error-message">{{ errors[0] }}</p> -->
                      <!-- </ValidationProvider> -->
                    </div>
                  </div>
                  <div class="col-md-4 col-12">
                    <div class="form-group row pl-3 pr-3">
                      <!-- <ValidationProvider
                          name="city_code"
                          v-slot="{ errors }"
                        > -->
                      <select
                        @change="pushRouter(formlocation.ward_code)"
                        :disabled="!formlocation.district_code"
                        class="form-control"
                        v-model.trim="formlocation.ward_code"
                      >
                        <option value selected>Tất cả phường / xã</option>
                        <option
                          :value="item.code"
                          v-for="(item, i) in wards"
                          :key="i"
                          >{{ item.name }}</option
                        >
                      </select>
                      <!-- <p class="error-message">{{ errors[0] }}</p> -->
                      <!-- </ValidationProvider> -->
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="color-nuti w-125px">
                    TTPP / NPP
                    <i class="fa fa-info-circle fs-12" id="tooltip-target-1"></i
                    ><b-tooltip target="tooltip-target-1" triggers="hover">
                      Trung tâm phân phối/Nhà phân phối
                    </b-tooltip>
                  </th>
                  <th class="color-nuti">Tên</th>
                  <th class="color-nuti">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in locationDistributors" :key="i">
                  <td class="w-125px">{{ item.group_name }}</td>
                  <td>{{ item.full_name }}</td>
                  <td>
                    {{ item.address }},{{ item.ward_name }},{{
                      item.district_name
                    }},{{ item.city_name }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="locationDistributors && !locationDistributors.length"
              class="alert alert-warning"
              role="alert"
            >
              Không tìm thấy Trung tâm phân phối hay Nhà phân phối nào.
            </div>

            <!-- / skeleton -->
            <div class="row" v-if="!locationDistributors">
              <div class="col-12 col-md-6 col-lg-4" :key="n" v-for="n in 10">
                <skeleton></skeleton>
              </div>
            </div>
            <pagination
              v-show="total_page"
              :total-pages="total_page"
              :total="totalrowcount"
              :per-page="pagesize"
              :current-page="pagenumber"
              @pagechanged="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { isMobile } from "~/plugins/util";
import form from "../user/form.vue";
import Skeleton from "~/components/Skeleton";
import PaginationVue from "~/components/Pagination.vue";
import $ from "jquery";
export default {
  components: { form },
  data() {
    return {
      title: [
        {
          text: "Trang chủ",
          href: "/",
        },
        {
          text: "Danh sách trung tâm phân phối",
          active: true,
        },
      ],
      isMobile: false,
      //page
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,

      //get location
      locationDistributors: [],
      cities: [],
      districts: [],
      wards: [],
      formlocation: {
        city_code: "",
        district_code: "",
        wards: "",
      },
    };
  },
  components: {
    pagination: PaginationVue,
    skeleton: Skeleton,
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  created() {
    this.getCities();
    this.getLocationDistributors();
    this.$router.push("/location-distributors");
  },
  methods: {
    getCities() {
      this.$store.dispatch("app/fetchData", "v0/1/cities").then((data) => {
        this.cities = data.data;
      });
    },
    getDistrict(city_code) {
      this.$router.push(`?city_code=${city_code}`);
      this.getLocationDistributors();
      this.$store.dispatch("app/showLoadingOverlay", true);
      if (city_code) {
        this.$store
          .dispatch("app/fetchData", `/v0/${city_code}/districts`)
          .then((data) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            this.districts = data.data;
          })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      }
    },
    getWard(district_code) {
      this.$router.push(
        `?city_code=${this.formlocation.city_code}&district_code=${district_code}`
      );
      this.getLocationDistributors();
      this.$store.dispatch("app/showLoadingOverlay", true);
      if (district_code) {
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
      }
    },
    pushRouter(ward_code) {
      this.$router.push(
        `?city_code=${this.formlocation.city_code}&district_code=${this.formlocation.district_code}&ward_code=${ward_code}`
      );
      this.getLocationDistributors();
    },
    getLocationDistributors(page = 1) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      const city_code = this.formlocation.city_code
        ? this.formlocation.city_code
        : "";
      const district_code = this.formlocation.district_code
        ? this.formlocation.district_code
        : "";
      const ward_code = this.formlocation.ward_code
        ? this.formlocation.ward_code
        : "";
      this.$store
        .dispatch("sitebuilder/getLocationDistributors", {
          params: `?limit=24&city_code=${city_code}&district_code=${district_code}&ward_code=${ward_code}&page=${page}`,
        })
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.locationDistributors = resp.data;
          this.totalrowcount = resp.meta.pagination.count;
          this.pagenumber = resp.meta.pagination.current_page;
          this.total_page = resp.meta.pagination.total_pages;
          this.pagesize = resp.meta.pagination.per_page;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    // onPageChange(page) {
    //   this.pagenumber = page;
    //   this.getLocationDistributors(page);
    //   if (!process.server) {
    //      $("html, body").animate({ scrollTop: 0 }, "");
    //   }
    // },
    onPageChange(page) {
      this.pagenumber = page;
      this.getLocationDistributors(page);
      if (!process.server) {
        $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@media (max-width: 575px) {
  .text-center-mb {
    text-align: center !important;
  }
  .icon-number-distributors {
    width: 40% !important;
  }
  .card-img-left {
    width: 40% !important;
  }
}
@media (max-width: 991px) {
  .icon-number-distributors {
    width: 80% !important;
  }
  .card-img-left {
    width: 80% !important;
  }
}
.card-img-left {
  width: 25% !important;
}
</style>
