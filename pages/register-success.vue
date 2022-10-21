<template>
  <div class="container">
    <div class="row justify-content-center section">
      <div class="col-md-6">
        <div class="block-section text-center">
          <img src="../assets/images/market-store.png" alt="" />
          <h4>Đăng ký thành công <img src="../assets/images/icon/checked_2.png" width="25px" alt="" /></h4>
          <p class="p-2">
            Thông tin của quý khách hàng đã được chuyển đến Nutifood để xem xét và
            phê duyệt trong 3 ngày
          </p>
          <nuxt-link
            to="/"
            class="btn register-button btn-lg btn-block btn-primary m-2"
            >Tiếp tục</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss"></style>
