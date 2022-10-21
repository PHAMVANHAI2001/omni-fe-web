<template>
  <main role="main">
    <h2 class="cp-page-title">Hoa hồng đại lý</h2>

    <div class="row" v-if="profile">
      <div class="col-md-6" v-if="profile.group_code == 'AGENT'">
        <b-card class="card-summary-dashboard" v-if="profile.profile.commission_rate">
          <p>
            Hạng mức hoa hồng trong tháng của bạn:
          </p>

          <h3>{{profile.profile.commission_rate.rate}}</h3>
          <br />
          <p>Doanh số cá nhân: <strong>{{profile.profile.commission_rate.total_sale | vndformat}}</strong>.</p>

          <p>Doanh số nhóm: <strong>{{profile.profile.commission_rate.total_group_sale | vndformat}}</strong></p>

          <p>Hoa hồng dự kiến : <strong>{{profile.profile.commission_rate.commission | vndformat}}</strong>.</p>
        </b-card>

        <b-card class="card-summary-dashboard" v-if="!profile.profile.commission_rate">
          <p>Hạng mức hoa hồng</p>
          <h3>0%</h3>
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
    title: "Báo cáo hoa hồng đại lý"
  },
  computed: mapState({
    profile: state => state.user.user
  }),
  components: {
    UserMenuPanel
  },
  middleware: "authenticated"
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
    color: rgb(197, 30, 30);
    margin-bottom: 0;
  }
}
</style>
