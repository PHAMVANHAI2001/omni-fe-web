<template>
  <main role="main" class="container mb-6">
    <h1 class="cp-page-title">Thống kê nhanh</h1>

    <div class="row" v-if="profile">
      <div class="col-md-4" v-if="profile.group_code == 'AGENT'">
        <b-card class="card-summary-dashboard">
          <p>
            Doanh số trong tháng
            <i
              class="fa fa-question-circle"
              v-b-tooltip.hover
              title="Chỉ tính đơn hàng 'Đại lý' trong tháng này và trạng thái đơn đã hoàn thành."
            ></i>
          </p>

          <h3 v-if="profile.total_order_price_month"><a class="nav-link">{{profile.total_order_price_month | vndformat}}</a></h3>
          <h3 v-if="!profile.total_order_price_month"><a class="nav-link">0đ</a></h3>
        </b-card>
      </div>

      <div class="col-md-4" v-if="profile.group_code == 'AGENT'">
        <b-card class="card-summary-dashboard" v-if="profile.profile.commission_rate">
          <p>
            Hạng mức hoa hồng
            <i id="tooltip-target-1" class="fa fa-question-circle"></i>
          </p>

          <h3><a class="nav-link">{{profile.profile.commission_rate.rate}}</a></h3>
        </b-card>

        <b-tooltip
          target="tooltip-target-1"
          triggers="hover"
          v-if="profile.profile.commission_rate"
        >
          <div class="text-left">
            DS cá nhân: {{profile.profile.commission_rate.total_sale | vndformat}}.
            <br />
            DS nhóm: {{profile.profile.commission_rate.total_group_sale | vndformat}}
          </div>
        </b-tooltip>

        <b-card class="card-summary-dashboard" v-if="!profile.profile.commission_rate">
          <p>Hạng mức hoa hồng</p>
          <h3><a class="nav-link">0%</a></h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Điểm tích luỹ</p>
          <h3><a class="nav-link">{{profile.profile.point ? profile.profile.point : 0}}</a></h3>
        </b-card>
      </div>

      <div class="col-md-4" v-if="profile.group_code == 'AGENT'">
        <b-card class="card-summary-dashboard">
          <p>Cấp độ đại lý</p>
          <h3><a class="nav-link">{{profile.user_level}}</a></h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>
            Tổng doanh số
            <i
              class="fa fa-question-circle"
              v-b-tooltip.hover
              title="Tổng tiền đơn hàng đã hoàn thành, không loại trừ loại đơn hàng nào."
            ></i>
          </p>
          <h3><a class="nav-link">{{profile.total_sales_formatted ? profile.total_sales_formatted : 0}}</a></h3>
        </b-card>
      </div>

      <div class="col-md-4" v-if="profile.group_code == 'AGENT'">
        <b-card class="card-summary-dashboard">
          <p>
            Thành viên nhóm
            <i
              class="fa fa-question-circle"
              v-b-tooltip.hover
              title="Tổng số đại lý bạn đã giới thiệu."
            ></i>
          </p>
          <h3>
            <nuxt-link to="/user/referral">{{profile.total_members}}</nuxt-link>
          </h3>
        </b-card>
      </div>
    </div>

    <h2 class="cp-page-title">Tình trạng đơn hàng trong tháng</h2>

    <div class="row" v-if="orderStatus">
      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Chờ xử lý</p>
          <h3>
            <nuxt-link class="nav-link" :to="{ path: '/user/order?status=NEW'}">
            {{orderStatus ? orderStatus.new : 0}}
            </nuxt-link>
          </h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đã xác nhận</p>
          <h3>
            <nuxt-link
              class="nav-link"
              :to="{ path: '/user/order?status=APPROVED'}"
            >{{orderStatus ? orderStatus.approved : 0}}</nuxt-link>
          </h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đang giao hàng</p>
          <h3>
            <nuxt-link
              class="nav-link"
              :to="{ path: '/user/order?status=SHIPPING'}"
            >{{orderStatus ? orderStatus.shipping : 0}}</nuxt-link>
          </h3>
        </b-card>
      </div>


      <div class="col-md-4">
          <b-card class="card-summary-dashboard">
            <p>Giao hàng thành công</p>
            <h3>
              <nuxt-link
                class="nav-link"
                :to="{ path: '/user/order?status=SHIPPED'}"
              >{{orderStatus ? orderStatus.shipped : 0}}</nuxt-link>
            </h3>
          </b-card>
        </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đã hoàn thành</p>
          <h3>
            <nuxt-link
              class="nav-link"
              :to="{ path: '/user/order?status=COMPLETED'}"
            >{{orderStatus ? orderStatus.completed  : 0}}</nuxt-link>
          </h3>
        </b-card>
      </div>

      <div class="col-md-4">
        <b-card class="card-summary-dashboard">
          <p>Đã hủy</p>
          <h3>
            <nuxt-link
              class="nav-link"
              :to="{ path: '/user/order?status=CANCELED'}"
            >{{orderStatus ?  orderStatus.canceled : 0}}</nuxt-link>
          </h3>
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
    title: "Trang cá nhân"
  },
  data() {
    return {
      profile: null,
      orderStatus: null
    };
  },
  components: {
    UserMenuPanel
  },
  middleware: "authenticated",
  created() {
    this.$store.dispatch("app/fetchData", "/v1/users/profile").then(data => {
      this.profile = data.data;
    });
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
.card-menu-user {
  border: 1px solid #ccc;
  text-align: center;
  margin-bottom: 25px;
  padding: 10px;
  .card-img-top {
    width: 50%;
    display: inline-block;
    margin: 0 auto;
  }
  .card-title {
    font-size: 1rem;
    margin-bottom: 0;
  }
  .card-body {
    padding: 10px 0 0 0;
  }
}
.card-summary-dashboard {
  margin-bottom: 20px !important;
  h3 {
    margin-top: 10px;
    font-size: 1.8rem;
    margin-bottom: 0;
  }
  a {
    color: rgb(197, 30, 30);
  }
}
</style>