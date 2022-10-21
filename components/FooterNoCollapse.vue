<template>
  <div class="nav footer-nav">
    <div class="container">
      <div class="row">
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
          <h5 class="widget-title">CÔNG TY CỔ PHẦN <br/>THỰC PHẨM DINH DƯỠNG NUTIFOOD</h5> 
            <div class="row">
              <div class="col-md-11 ml-3 pr-0 pl-0">
                <li v-for="(item, i) in footerContact" :key="i">
                     <!--<nuxt-link
                    class="text"
                    :to="{ path: `/information/${aboutContact}?key=${item.key}` }"
                    >{{ item.name }}</nuxt-link
                    >-->
                    <a>{{ item.name }}</a>
                  </li>
                  <li class="">
                    <a href='http://online.gov.vn/Home/WebDetails/86192'>
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/icon/bo-gach-cong-thuong.webp" alt="THÔNG BÁO BỘ CÔNG THƯƠNG">
                        <img class="img-fluid" src="~/assets/images/icon/bo-gach-cong-thuong.png" alt="THÔNG BÁO BỘ CÔNG THƯƠNG"/>
                      </picture>
                    </a>
                  </li>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
            <h5 class="widget-title ml-2">THÔNG TIN HỖ TRỢ</h5>
            <div class="row">
              <div class="col-md-11 ml-4 pr-0 pl-0">
                <li v-for="(item, i) in footerContact1" :key="i">
                  <!-- <nuxt-link
                    class="text"
                    :to="{ path: `/information/${aboutContact1}?key=${item.key}` }"
                    >{{ item.name }}</nuxt-link
                    > -->
                  <a
                    :href="`mailto:${item.value}`"
                    v-if="
                      item.value && item.value == 'nutifood@nutifood.com.vn'
                    "
                    >{{ item.name }}</a
                  >
                  <a
                    :href="`tel:${item.value}`"
                    class="text"
                    v-if="item.value && item.value == '02838255777'"
                    >{{ item.name }}</a
                  >
                  <a v-if="!item.value || item.value == ''">{{ item.name }}</a>
                  <nuxt-link
                    class="text"
                    to="/contact"
                    v-if="item.value && item.value == '/contact'"
                  >
                    {{ item.name }}
                  </nuxt-link>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
          <h5 class="widget-title ml-2">NUTIFOODSHOP</h5> 
            <div class="row">
              <div class="col-md-10 ml-4 pr-0 pl-0">
                <li v-for="(item, i) in footerSystem" :key="i">
                    <nuxt-link
                    class="text"
                    :to="{ path: `/information/${aboutSystem}?key=${item.key}` }"
                    >{{ item.name }}</nuxt-link
                    >
                  </li>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
          <h5 class="widget-title">CHĂM SÓC KHÁCH HÀNG</h5> 
            <div class="row">
              <div class="col-md-10 ml-4 pr-0 pl-0">
                <li v-for="(item, i) in footerSupport" :key="i">
                    <nuxt-link v-if="item.type == 'TEXTAREA'"
                    class="text"
                    :to="{ path: `/information/${aboutSupport}?key=${item.key}` }"
                    >{{ item.name }}</nuxt-link>

                    <nuxt-link v-if="item.type == 'TEXT'"
                    class="text"
                    :to="{ path: `/question` }"
                    >{{ item.name }}</nuxt-link>
                  </li>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
            <h5 class="widget-title">ĐƠN VỊ VẬN CHUYỂN</h5>
            <div class="logo-list row">
              <div class="col-6">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                     <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/img/viettel@3x.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/img/viettel@3x.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/img/Logo_VNP_234x105.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/img/Logo_VNP_234x105.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                       <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/img/grab-express.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/img/grab-express.png" alt="#"/>
                      </picture>
                     </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
            <h5 class="widget-title">CÁCH THỨC THANH TOÁN</h5>
            <div class="logo-list row">
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                       <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/COD.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/COD.png" alt="#"/>
                      </picture>
                      </a>
                  </div>
                </div>
              </div>

              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/ATM.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/ATM.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/Vnpay.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/Vnpay.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                     <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/ViSa.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/ViSa.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/MasterCard.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/MasterCard.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/JCB.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/JCB.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/Zalopay.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/Zalopay.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/momo.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/momo.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
               <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/IBG.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/IBG.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
               <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/logopttt/SP.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/logopttt/SP.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
            <div class="logo-list row">
              <div class="col-12">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                     <a href='http://online.gov.vn/Home/WebDetails/86192'>
                        <img alt='~/assets/images/nutifood/img/cod2x.png' src='http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png'/>
                     </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
          <div class="text-center mr-3 ml-3 p-3" style="background-color: rgba(0, 0, 0, 0.2); width: 100%;">
            Công ty thành lập và hoạt động theo Giấy chứng nhận đăng ký doanh nghiệp số 3700521162 do Sở KHĐT Tỉnh Bình Dương cấp ngày 04/08/2003<br/>© Copyright 2021 by Nutifood Corp. All Rights Reserved
          </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapState, mapActions } from "vuex";
import RegisterForm from "~/components/RegisterForm";
import ResetPasswordForm from "~/components/ResetPasswordForm";
import VerifySmsCodeForm from "~/components/VerifySmsCodeForm";
import UpdateNewPasswordForm from "~/components/UpdatePasswordForm";
import NotifyLoginForm from "~/components/NotifyLoginForm";
import HeaderMobile from "~/components/HeaderMobile";
import FooterMobile from "~/components/FooterMobile";
import AccountPending from "~/components/AccountPending";
import LoginSelectForm from "~/components/SelectLoginModalForm";
import ProductDetailModal from "~/components/ProductDetailModal";
import { isMobile } from "~/plugins/util";
export default {
  components: {
    "register-form": RegisterForm,
    "reset-password-form": ResetPasswordForm,
    "verify-sms-code-form": VerifySmsCodeForm,
    "update-new-password-form": UpdateNewPasswordForm,
    "notify-login-form": NotifyLoginForm,
    FooterMobile,
    AccountPending,
    LoginSelectForm,
    ProductDetailModal,
  },
  computed: mapState({
    showLoadingOverlay: (state) => state.app.showLoadingOverlay,
  }),
  data() {
    return {
      showGoTopBtn: false,
      isMobile: false,
      footerContact: [],
      footerContact1: [],
      footerSystem: [],
      footerSupport: [],
      aboutContact: null,
      aboutSystem: null,
      aboutSupport: null,
    };
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  created() {
    this.getSettingContact();
    if (!process.server) {
      window.addEventListener("scroll", this.handleScroll);
    }
    this.getSettingContact1();
    this.getSettingSystem();
    this.getSettingSupport();
  },
  methods: {
    getSettingContact() {
      const about = "ABOUT-CONTACT";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutContact = about;
          this.footerContact = data.data.data;
        });
    },
    getSettingContact1() {
      const about = "ABOUT-CONTACT1";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutContact1 = about;
          this.footerContact1 = data.data.data;
        });
    },
    getSettingSystem() {
      const about = "ABOUT-NUTIFOOD";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutSystem = about;
          this.footerSystem = data.data.data;
        });
    },
    getSettingSupport() {
      const about = "ABOUT-SUPORT";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutSupport = about;
          this.footerSupport = data.data.data;
        });
    },

    handleScroll() {
      if (
        document.body.scrollTop > 600 ||
        document.documentElement.scrollTop > 600
      ) {
        this.showGoTopBtn = true;
      } else {
        this.showGoTopBtn = false;
      }
    },
    scrollToTop() {
      if (!process.server) {
        window.scrollTo(0, 0);
      }
    },
  },
};
</script>
