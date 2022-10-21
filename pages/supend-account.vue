<template>
  <div class="container">
    <div class="row justify-content-center section">
      <div class="col-md-6">
        <div class="block-section text-center">
            <h1>Thông báo</h1>
                <img src="../assets/images/staff.jpg" alt="">
                <h4>Tài khoản đang chờ duyệt.</h4>
                <p>Một email sẽ gửi tới hòm thư của bạn khi được phê duyệt. Vui lòng chờ hoặc liên hệ tới số hotline.</p>
               <b-button
                @click="goBack"
                block
                class="btn register-button btn-lg btn-block btn-primary"
                >Tiếp tục</b-button
              >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  components: {
  },
  created() {},
  methods: {
    goBack() {
      this.$router.push("/");
    },
  }
}
</script>

<style lang="scss"></style>
