<template>
  <div>
    <b-modal
      v-model="InstallAppModal"
      ref="install-app"
      hide-footer
      hide-header
      content-class="modal-content-install-app"
      cancel-only:
      false
      centered
    >
      <div class="close-btn-install-app">
        <a @click="closemodal()">
          <i class="fa fa-times-circle"></i>
        </a>
      </div>
      <div id="install-app">
        <div class="container">
          <!-- <div class="row mb-4">
            <div class="col-md-6 col-6 pl-pr-0">
              <img
                src="../assets/images/nutifood/layout-phone.png"
                alt=""
                width="100%"
              />
            </div>
            <div class="col-md-6 col-6 ml-mr-0">
              <h6>Quý khách tải NutifoodShop App để được hưởng nhiều ưu đãi:</h6>
              <ul class="list-promotion" v-if="!isMobile">
                <li class="promotion-item mb-3 ti-1">
                  <i class="fa fa-check-circle color-nuti"></i> Mua hàng nhanh
                  chóng, tiện lợi
                </li>
                <li class="promotion-item mb-3 ti-1">
                  <i class="fa fa-check-circle color-nuti"></i> Dễ dàng quản lý
                  lịch sử đơn hàng
                </li>
                <li class="promotion-item mb-3 ti-1">
                  <i class="fa fa-check-circle color-nuti"></i> Ưu đãi dành
                  riêng cho Quý khách
                </li>
                <li class="promotion-item mb-3 ti-1">
                  <i class="fa fa-check-circle color-nuti"></i> Nhận thông báo
                  chương trình khuyến mãi hấp dẫn
                </li>
              </ul>
              <ul class="list-promotion" v-if="isMobile">
                <li class="promotion-item mb-1">
                  <i class="fa fa-check-circle color-nuti"></i> Mua hàng nhanh
                  chóng, tiện lợi
                </li>
                <li class="promotion-item mb-1">
                  <i class="fa fa-check-circle color-nuti"></i> Dễ dàng quản lý
                  lịch sử đơn hàng
                </li>
                <li class="promotion-item mb-1">
                  <i class="fa fa-check-circle color-nuti"></i> Ưu đãi dành
                  riêng cho Quý khách
                </li>
                <li class="promotion-item mb-1">
                  <i class="fa fa-check-circle color-nuti"></i> Nhận thông báo
                  chương trình khuyến mãi hấp dẫn
                </li>
              </ul>
              <div class="col-md-12 col-12" v-if="!isMobile">
                <div class="row">
                  <div class="col-12">
                    <div class="btn btn-download-now">TẢI NGAY</div>
                  </div>
                  <div class="col-12 text-center mt-3">
                    <img
                      src="../assets/images/nutifood/qr-install-app.png"
                      alt=""
                      width="60%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="isMobile">
            <div class="col-12">
              <div class="btn btn-download-now">TẢI NGAY</div>
            </div>
            <div class="col-12 text-center mt-3">
              <img
                src="../assets/images/nutifood/qr-install-app.png"
                alt=""
                width="60%"
              />
            </div>
          </div> -->
          <div class="text-center">
            <img src="~/assets/images/bao-tri.webp" alt="" width="100%" />
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { isMobile } from "~/plugins/util";
export default {
  data() {
    return {
      isMobile: false,
      InstallAppModal: true,
      // isDisable: true,
      // imagesAds: [],
    };
  },
  components: {},
  created() {
    // if (process.browser) {
    //   if (
    //     !sessionStorage.getItem(`UzxvLSJKsdg78243sLDKlsldkgkslxcvnbmxcnh`, true)
    //   ) {
    //     // window.setTimeout(() => {
    //     //   this.showPopup();
    //     // }, 20000);

    //   }

    //   if (
    //     sessionStorage.getItem(`UzxvLSJKsdg78243sLDKlsldkgkslxcvnbmxcnh`, true)
    //   ) {
    //     this.InstallAppModal = false;
    //   }
    // }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "app/showBuildingModal") {
        this.InstallAppModal = true;
      }
    });
    this.showPopup();
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  methods: {
    showPopup() {
      this.InstallAppModal = true;
    },
    closemodal(id) {
      this.$refs["install-app"].hide();
      this.InstallAppModal = false;
      // sessionStorage.setItem(`UzxvLSJKsdg78243sLDKlsldkgkslxcvnbmxcnh`, true);
    },
  },
};
</script>

<style lang="scss">
.forget-pass {
  text-align: center;
  display: block;
  margin-top: 20px;
  cursor: pointer;
  color: #c92332;
}
.modal-header .close {
  display: none;
}
.login-note {
  text-align: justify;
  padding: 0 20px 20px 0;
  font-size: 0.9rem;
}
.login-note-column {
  background: #f9f9f9;
  padding: 20px 10px;
  border-radius: 10px;
}
.btn-download-now {
  width: 100%;
  text-align: center;
  background: #006e43;
  border: 1px solid #006e43;
  color: #ffffff;
}
.btn-download-now:hover {
  text-align: center;
  background: #004b2e;
  border: 1px solid #004b2e;
  color: #ffcd00 !important;
}
.btn-download-now:active {
  text-align: center;
  background: #003b25;
  border: 1px solid #003b25;
  color: #ffcd00 !important;
}
.ti-1 {
  text-indent: 0.5rem;
}
</style>
