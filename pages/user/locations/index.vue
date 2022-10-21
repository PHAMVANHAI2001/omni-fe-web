<template>
  <main role="main">
    <div class="col-12">
      <a
        class="btn btn-secondary float-right"
        @click="showAddLocationModal()"
        >(+) Thêm địa chỉ mới</a
      >
      <h1 class="cp-page-title">Sổ địa chỉ</h1>
    </div>

    <div class="block-section" v-if="shippingaddress">
      <b-card-footer
        class="mb-2 order-item"
        v-for="(item, i) in shippingaddress"
        :key="i"
      >
        <div class="row">
          <div class="col-11">
            <span class="d-flex flex-row">
              <h5 class="font-default">
                <strong>{{ item.full_name }}</strong>
              </h5>
              &nbsp;
              <p>
                <em style="color: #006e43" v-if="item.is_default == 1"
                  >(Địa chỉ mặc định)</em
                >
              </p>
            </span>

            <p>
              Địa chỉ:
              <strong
                >{{ item.street_address }}, {{ item.ward_name }},
                {{ item.district_name }}, {{ item.city_name }}</strong
              >
            </p>
            <p>
              Điện thoại: <strong>{{ item.phone }}</strong>
            </p>
            <em class="is-default" v-if="item.is_default == 0">
              <a @click="setDefaultShippingAddress(item)"
                >Đặt làm địa chỉ mặc định</a
              >
            </em>
          </div>
          <div class="col-1">
            <div class="action-group-location text-right">
              <div class="edit-address">
                <em>
                  <a @click="showAddLocationModal(item)"
                    ><i class="fa fa-edit"></i
                  ></a>
                </em>
              </div>
              <div class="delete-address">
                <em v-if="item.is_default == 0">
                  <a @click="deleteShippingAddress(item)"
                    ><i class="fa fa-trash"></i
                  ></a>
                </em>
              </div>
            </div>
          </div>
        </div>
      </b-card-footer>

      <div
        v-if="!shippingaddress || shippingaddress.length == 0"
        class="alert alert-warning"
        role="alert"
      >
        Bạn chưa có địa chỉ nhận hàng nào.
      </div>

      <pagination
        v-if="shippingaddress && shippingaddress.length != 0"
        v-show="total_page"
        :total-pages="total_page"
        :total="totalrowcount"
        :per-page="pagesize"
        :current-page="pagenumber"
        @pagechanged="onPageChange"
      />
    </div>
    <AddLocationModal  @shippingAddress="shippingAddress"></AddLocationModal>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserMenuPanel from "~/components/UserMenuPanel";
import PaginationVue from "~/components/Pagination.vue";
import AddLocationModal from "~/components/AddLocationModal";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "Địa chỉ của tôi",
  },
  components: {
    UserMenuPanel,
    pagination: PaginationVue,
    ValidationProvider,
    ValidationObserver,
    AddLocationModal
  },
  data() {
    return {
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      shippingaddress: null,
    };
  },
  created() {
    this.getShippingAddress();
  },

  methods: {
    showAddLocationModal(data) {
      this.$store.commit("user/showAddLocationModal", data);
    },
    shippingAddress() {
       this.getShippingAddress();
    },
    getShippingAddress() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("user/getShippingAddress", {params: `?limit=20&sort[updated_at]=desc&page=1`})
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.shippingaddress = data.data;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    setDefaultShippingAddress(item) {
      this.$store
        .dispatch("user/setDefaultShippingAddress", item.id)
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.getShippingAddress();
          this.$toast.success("Đã thay đổi địa chỉ mặc định").goAway(1500);
          this.modalShow = false;
        })
        .catch((err) => {
          this.$toast.error("Lỗi khi chọn địa chỉ mặc định").goAway(1500);
          // //console.log("Lỗi tạo địa chỉ giao hàng:", err);
        });
    },
    deleteShippingAddress(item) {
      this.$store
        .dispatch("user/deleteShippingAddress", item.id)
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.getShippingAddress();
          this.$toast.success("Xóa địa chỉ thành công").goAway(1500);
          this.modalShow = false;
        })
        .catch((err) => {
          this.$toast.error("Lỗi khi xóa địa chỉ").goAway(1500);
          // //console.log("Lỗi tạo địa chỉ giao hàng:", err);
        });
    },
    onPageChange(page) {
      this.pagenumber = page;
      this.getShippingAddress(page);
      if (!process.server) {
         $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.is-default {
  color: #0026ff;
}
.is-default:hover {
  color: #001cbd;
}
.is-default:active {
  color: #001cb9;
}

.action-group-location {
  width: 100%;
}
.edit-address {
  // background: #fff;
  // width: 30px;
  // height: 30px;
  // // padding: 10px 15px;
  // border-bottom: 0.5px solid rgb(233, 233, 233);
  // border-right: 0.5px solid rgb(233, 233, 233);
}
.edit-address em a:hover {
  color: #006e43
}
.edit-address em a:active {
  color: #003621
}

.delete-address {
  // background: #ffcd00;
  // width: 30px;
  // height: 30px;
  // padding: 10px 15px;
  // border-bottom: 0.5px solid rgb(233, 233, 233);
  // border-right: 0.5px solid rgb(233, 233, 233);
}
.delete-address em a:hover {
  color: #ff1100;
}
.delete-address em a:active {
  color: #770800;
}

.font-default {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: unset !important;
}
</style>
