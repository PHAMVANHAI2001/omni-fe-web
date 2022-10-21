<template>
  <main role="main">
    <h2 class="cp-page-title">Thống kê tình trạng đơn hàng</h2>

    <div class="row" v-if="orderStatus">
      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Mới</p>
          <h3>{{orderStatus.new}}</h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đã duyệt</p>
          <h3>{{orderStatus.approved}}</h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đã nhận</p>
          <h3>{{orderStatus.received}}</h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đã hoàn thành</p>
          <h3>{{orderStatus.completed}}</h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Bị từ chối</p>
          <h3>{{orderStatus.rejected}}</h3>
        </b-card>
      </div>

			<div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Huỷ đơn</p>
          <h3>{{orderStatus.canceled}}</h3>
        </b-card>
      </div>

			
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import UserMenuPanel from "~/components/UserMenuPanel";
import { mapState, mapActions } from "vuex";
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "Tình trạng đơn hàng"
  },
  data() {
    return {
      orderStatus: null
    };
  },
  components: {
    UserMenuPanel
  },
  middleware: "authenticated",
  created() {
    this.getOrderStatus();
  },
  methods: {
    getOrderStatus() {
      this.$store
        .dispatch("user/getOrderStatus")
        .then(data => {
          this.orderStatus = data.data;
        });
    }
  }
};
</script>

<style lang="scss">
</style>
