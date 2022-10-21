<template>
  <div>
    <b-modal
      v-model="modalShow"
      no-close-on-backdrop
      id="bv-modal-account-pending"
      ref="account-pending-modal"
      hide-footer
      hide-header
      cancel-only:
      false
    >
      <div class="d-block text-center">
        <img src="../assets/images/staff.jpg" alt="" />
        <h4>Tài khoản đang chờ duyệt.</h4>
        <p>
          Thông tin của quý khách hàng đã được chuyển đến Nutifood để xem xét và phê
          duyệt trong 3 ngày.
        </p>
      </div>
      <b-button class="mt-3" variant="danger" block @click="closemodal"
        >Tiếp tục</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      modalShow: false,
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "user/showAccountPedingModal") {
        this.modalShow = true;
      }
    });
  },
  methods: {
    closemodal() {
      location.reload();
      localStorage.setItem("account_status", "");
      this.$refs["account-pending-modal"].hide();
    },
  },
};
</script>

<style lang="scss"></style>
