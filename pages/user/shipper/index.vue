<template>
  <main role="main">
    <h2 class="cp-page-title">Đơn hàng của cần giao</h2>

    <div class="block-section search-form-block">
      <form v-on:submit.prevent="getOrder()">
        <div class="row">
          <div class="col-md-9">
            <label>Mã đơn hàng</label>
            <input
              type="text"
              class="form-control"
              v-model="code"
              placeholder="Nhập mã đơn hàng....."
            />
          </div>

          <div class="col-md-3">
            <label>Trạng thái</label>
            <select
              v-model="status"
              v-on:change="changeStatus()"
              class="form-control"
            >
              <option value="SHIPPING">Chờ giao hàng</option>
              <option value="SHIPPED">Đã hoàn thành</option>
            </select>
          </div>
          <div class="col-md-12 mt-10">
            <button class="btn btn-success" @click="getOrder()" type="button">
              <i class="fa fa-search"></i> Tìm đơn hàng
            </button>
            <button class="btn btn-warning" @click="reset()" type="button">
              <i class="fa fa-refresh"></i> Huỷ tìm kiếm
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="block-section">
      <b-card
        @click="viewOrder(item)"
        v-for="(item, i) in orders"
        :key="i"
        class="mb-2 order-item"
      >
        <div class="row">
          <div class="col-7">
            <h6>Đơn hàng: {{ item.code }}</h6>
            <em>{{ item.created_at }}</em>
            <p v-if="item.customer_point > 0">
              <img src="~assets/images/customer-point.svg" width="15" alt />
              {{ item.customer_point }} điểm thưởng
            </p>
          </div>
          <div class="col-5 text-right">
            <span class="badge text-danger">{{ item.status_name }}</span>
            <br />
            <p v-for="(itm, j) in item.totals" :key="j">
              <em v-if="itm.code === 'total'">{{ itm.text }}</em>
            </p>
          </div>
        </div>
      </b-card>

      <div
        v-if="orders && orders.length == 0"
        class="alert alert-warning"
        role="alert"
      >
        Bạn chưa có đơn hàng nào.
      </div>

      <pagination v-if="orders"
        v-show="total_page"
        :total-pages="total_page"
        :total="totalrowcount"
        :per-page="pagesize"
        :current-page="pagenumber"
        @pagechanged="onPageChange"
      />
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserMenuPanel from "~/components/UserMenuPanel";
import PaginationVue from "~/components/Pagination.vue";
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "My Order",
  },
  components: {
    UserMenuPanel,
    pagination: PaginationVue,
  },
  data() {
    return {
      orders: null,
      order_statuses: [],
      searchkey: null,
      code: "",
      status: "",
      orderSearch: null,
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
    };
  },
  created() {
    if (this.$route.query["status"]) {
      this.status = this.$route.query["status"];
    }
    this.getOrder();
  },
  methods: {
    reset() {
      this.code = "";
      this.status = "";
      this.getOrder();
    },
    changeStatus($event) {
      console.log("change status:", this.status);
      this.getOrder();
    },
    viewOrder(order) {
      this.$router.push(`/user/shipper/${order.id}`);
    },
    getOrder(page = 1) {
      this.status = this.status ? this.status : "SHIPPING";
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch(
          "app/fetchData",
          `v1/list-orders?limit=10&code=${this.code}&status=${this.status}&page=${page}`
        )
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.orders = resp.data;
          this.totalrowcount = resp.meta.pagination.count;
          this.pagenumber = resp.meta.pagination.current_page;
          this.total_page = resp.meta.pagination.total_pages;
          this.pagesize = resp.meta.pagination.per_page;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("err:", err);
        });
    },
    onPageChange(page) {
      this.pagenumber = page;
      this.getOrder(page);
      if (!process.server) {
         $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
  },
  watch: {
    "$route.query"(q) {
      // RESET STATUS
      this.status = q.status ? q.status : "";
      this.getOrder();
    },
  },
};
</script>
<style>
.order-item:hover {
  cursor: pointer;
  background-color: #f8f8f8;
}
</style>
