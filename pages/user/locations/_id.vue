<template>
  <main role="main">
    <div class="col-12">
      <h2 class="cp-page-title">Thêm địa chỉ mới</h2>
    </div>

    <div class="block-section">
      <b-card-footer class="mb-2 order-item">
        <div class="row">
          <div class="col-7">
            <span class="d-flex flex-row">
              <h6 style="font-family: Roboto, Helvetica, Arial, sans-serif;">
                <strong>Nguyễn Hữu Tiến</strong>
              </h6>
              &nbsp;
              <p><em style="color: #006e43">(Địa chỉ mặc định)</em></p>
            </span>

            <p>
              Địa chỉ:
              <strong
                >KC36 D5A, Phước Long B, TP. Thủ Đức, TP. Hồ Chí Minh</strong
              >
            </p>
            <p>Điện thoại: <strong>0834686303</strong></p>
          </div>
          <div class="col-5 text-right">
            <em
              ><em><nuxt-link to="">Chỉnh sửa</nuxt-link></em></em
            >
          </div>
        </div>
      </b-card-footer>

      <div
        v-if="notifications && notifications.length == 0"
        class="alert alert-warning"
        role="alert"
      >
        Bạn chưa có thông báo nào.
      </div>

      <pagination
        v-if="notifications"
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
    title: "Thông báo của bạn",
  },
  components: {
    UserMenuPanel,
    pagination: PaginationVue,
  },
  data() {
    return {
      notifications: null,
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
    };
  },
  created() {
    this.getNotification();
  },
  methods: {
    getNotification(page = 1) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `v1/notifies?limit=10&page=${page}`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.notifications = resp.data;
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
      this.getNotification(page);
      if (!process.server) {
         $("html, body").animate({ scrollTop: 0 }, "");
      }
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
