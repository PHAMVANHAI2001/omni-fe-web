<template>
  <main role="main">
    <div class=" breadcrumb-top">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link to="/">Trang chủ</nuxt-link>
            </li>
            <li class="breadcrumb-item">
              <nuxt-link to="/user/profile">Tài khoản</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Giao dịch</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <UserMenuPanel></UserMenuPanel>
        </div>
        <div class="col">
          <h3>Lịch sử giao dịch</h3>
          <div class="block-section">
            <div class="user-dashboard-menu">
              <h2 class>Danh sách</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Transactions</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in transactions" :key="i">
                    <td>{{item}}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="transactions.length == 0" class="alert alert-warning" role="alert">
                Bạn chưa có lịch sử giao dịch
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserMenuPanel from "~/components/UserMenuPanel";
export default {
  middleware: "authenticated",
  head: {
    title: "Lịch sử giao dịch"
  },
  components: {
    UserMenuPanel
  },
  data() {
    return {
      transactions: []
    };
  },
  created() {
    this.gettransactions();
  },
  methods: {
    gettransactions() {
      this.$store.dispatch("user/fetchData", "/transactions").then(data => {
        this.transactions = data;
      });
    }
  }
};
</script>
<style>
</style>
