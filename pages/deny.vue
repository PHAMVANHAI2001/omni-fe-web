<template>
  <main role="main">
    <div class="container section">
      <div class="col text-center p-2"></div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: null
    };
  },
  components: { ValidationProvider, ValidationObserver },
  head: {
    title: "Thông báo"
  },
  created() {
    this.logout();
    this.$swal({
      icon: "warning",
      text: "Tài khoản của bạn bị đăng nhập ở một nơi khác.",
      confirmButtonText: "Xác nhận",
      allowOutsideClick: false
    }).then(result => {
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      });
      this.$nextTick(() => {});
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("userid");
      localStorage.removeItem("phone");
      localStorage.removeItem("group_code");
    }
  }
};
</script>

<style lang="scss">
</style>
