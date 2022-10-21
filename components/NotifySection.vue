<template>
  <main role="main">
    <b-modal
      v-model="modalShow"
      ref="notification-popup"
      id="notification-popup"
      hide-footer
      hide-header
    >
    <button type="button" class="btn btn-close" data-dismiss="modal" @click="closemodal" >
        <i class="fa fa-close"></i>
      </button>
    <div class="">
      <div class="alert m-0 alert-warning alert-dismissible fade show text-center p-1" role="alert"
        v-if="key == 'limitOrder'"
      >
        <strong>THÔNG BÁO!</strong> <br> 
        Để đảm bảo chất lượng phục vụ, Nutifood xin tạm ngưng nhận đơn hàng mới. Quý khách vui lòng đặt lại đơn vào ngày mai. Rất xin lỗi quý khách vì sự bất tiện này, mong quý khách thông cảm.<br>
        <b>Mong Quý khách thông cảm và tiếp tục ủng hộ NutiFood!</b>
      </div>
    </div>
    </b-modal>
  </main>
</template>

<script>
export default {
    data() {
        return {
            phone: null,
            modalShow: false,
            key: null,
        }
    },
   created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "app/showNotifySection") {
        setTimeout(() => {
          this.key = mutation.payload;
          this.modalShow = true;
        }, 250);
      }
    });
  },
  methods: {
    closemodal() {
      this.modalShow = false;
    },
  },
};
</script>

<style>
</style>