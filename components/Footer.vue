<template>
  <footer class="footer" id="footer">
    <LoginSelectForm></LoginSelectForm>
    <!-- <addThis v-if="!isMobile"></addThis> -->
    <FooterNoCollapse v-if="!isMobile" ></FooterNoCollapse>
    <NotifySection></NotifySection>
    <ProductDetailModal></ProductDetailModal>
    <LoginForm></LoginForm>
    <FooterMobile v-if="isMobile"></FooterMobile>
    <reset-password-form></reset-password-form>
    <verify-sms-code-form></verify-sms-code-form>
    <RegisterSocialForm></RegisterSocialForm>
  </footer>
</template>
<script>
import { mapState } from "vuex";
import RegisterForm from "~/components/RegisterForm";
import ResetPasswordForm from "~/components/ResetPasswordForm";
import VerifySmsCodeForm from "~/components/VerifySmsCodeForm";
import UpdateNewPasswordForm from "~/components/UpdatePasswordForm";
import NotifyLoginForm from "~/components/NotifyLoginForm";
import FooterMobile from "~/components/FooterMobile";
import FooterCollapse from "~/components/FooterCollapse";
import FooterNoCollapse from "~/components/FooterNoCollapse";
import LoginForm from "~/components/LoginForm";
// import addThis from "~/components/addThis";
import AccountPending from "~/components/AccountPending";
import LoginSelectForm from "~/components/SelectLoginModalForm";
import ProductDetailModal from "~/components/ProductDetailModal";
import { isMobile } from "~/plugins/util";
import RegisterSocialForm from "./RegisterSocialForm";
import NotifySection from "./NotifySection";
export default {
  components: {
    "register-form": RegisterForm,
    "reset-password-form": ResetPasswordForm,
    "verify-sms-code-form": VerifySmsCodeForm,
    "update-new-password-form": UpdateNewPasswordForm,
    "notify-login-form": NotifyLoginForm,
    LoginForm,
    FooterMobile,
    AccountPending,
    LoginSelectForm,
    // addThis,
    ProductDetailModal,
    FooterCollapse,
    FooterNoCollapse,
    RegisterSocialForm,
    NotifySection
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
     
    };
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  created() {
    this.modalShow = false;
    this.getSettingContact();
    this.getSettingContact1();
    this.getSettingSystem();
    this.getSettingSupport();
    if (!process.server) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  
  methods: {
    getSettingContact() {
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/ABOUT-CONTACT`)
        .then((data) => {
          this.footerContact = data.data;
        });
    },
    getSettingContact1() {
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/ABOUT-CONTACT1`)
        .then((data) => {
          this.footerContact = data.data;
        });
    },
    getSettingSystem() {
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/FOOTER-SETTING`)
        .then((data) => {
          this.footerSystem = data.data;
        });
    },
    getSettingSupport() {
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/ABOUT-SUPORT`)
        .then((data) => {
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
