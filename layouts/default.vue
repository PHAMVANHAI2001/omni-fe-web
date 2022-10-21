<template>
  <div class="">
    <client-only>
      <div class="" id="NutifoodShop">
        <div id="headerAds" class="display-none isMobile-headerAds">
          <HeaderAds v-if="!isMobile"></HeaderAds>
          <NotificationInstallApp
            :InstallAppModal="InstallAppModal"
          ></NotificationInstallApp>
        </div>
        <Header :logoHeader="logoHeader"></Header>
        <SearchBar :logoHeader="logoHeader"></SearchBar>
        <nuxt :class="[isMobile ? 'mb-5' : 'mb-2']"/>
        <div id="buttontotop" class="" @click="scrollToTop()">
          <img
            style="width: 3.8rem"
            src="~/assets/images/nutifood/img/top.svg"
            alt="#"
          />
        </div>
        <!-- <div
        style="margin-right: 13px;margin-bottom: 190px"
        class="zalo-chat-widget"
        data-oaid="579745863508352884"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="10"
        data-width="350"
        data-height="420"
      ></div>
     
      <addThis></addThis> -->
        <Footer></Footer>
      </div>
    </client-only>
  </div>
</template>

<script>
import $ from "jquery";
// import addThis from "~/components/addThis.vue";
import Footer from "~/components/Footer";
import FooterMobile from "~/components/FooterMobile";
import Header from "~/components/Header";
import HeaderAds from "~/components/Banners/HeaderAds";
import SearchBar from "~/components/SearchBar";
import NotificationInstallApp from "~/components/NotificationInstallApp";
import CollapseCategorySidebar from "~/components/CollapseCategorySidebar";
import { isMobile, isIndex } from "~/plugins/util";
import AOS from "~/node_modules/aos";
export default {
  data() {
    return {
      isMobile: false,
      isIndex: false,
      logoHeader: {},
      message: "NoRightClicking",
      InstallAppModal: true,
      islogged: null,
    };
  },
  components: {
    Footer,
    // addThis,
    FooterMobile,
    Header,
    HeaderAds,
    SearchBar,
    CollapseCategorySidebar,
    NotificationInstallApp,
  },
  mounted() {
    if (process.browser) {
      this.islogged = localStorage.getItem("id_token");
      this.isMobile = isMobile();
      AOS.init();
      this.getSession();
      window.addEventListener("scroll", () => {
        this.scroll();
      });
      window.addEventListener("mousemove", () => {
        if (this.$router.currentRoute.path == "/") {
          if (document.getElementById("headerAds")) {
            let headerAds = document.getElementById("headerAds");
            headerAds.classList.remove("display-none");
          }
        } else {
          if (document.getElementById("headerAds")) {
            let headerAds = document.getElementById("headerAds");
            headerAds.classList.add("display-none");
          }
        }
      });
     
    }
  },
  created() {
    this.getLogoHeader();
  },
  methods: {
    getLogoHeader() {
      this.$store
        .dispatch("app/fetchData", "/v1/client/banners/LOGO-HEADER")
        .then((resp) => {
          if (resp.data) {
            let ArrLogoHeader = resp.data.details;
            this.logoHeader = ArrLogoHeader[0];
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    scroll() {
      window.onscroll = () => {
        if (window.pageYOffset == document.body.scrollTop) {
          if (document.getElementById("buttontotop")) {
            let element = document.getElementById("buttontotop");
            element.classList.remove("show-by-visibility");
          }
        } else {
          if (document.getElementById("buttontotop")) {
            let element = document.getElementById("buttontotop");
            element.classList.add("show-by-visibility");
          }
        }
      };
    },
    scrollToTop() {
      if (!process.server) {
        $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
    getSession() {
      if (
        !localStorage.getItem("session_id") &&
        !localStorage.getItem("phone")
      ) {
        this.$store
          .dispatch("app/fetchData", `/v1/client/session`)
          .then((resp) => {
            if (resp["data"]["session_id"]) {
              this.$store.commit("app/setSession", resp["data"]["session_id"]);
              localStorage.setItem("session_id", resp["data"]["session_id"]);
            }
          });
      }
    },
    showBuildingModal(type = true) {
      this.$store.commit("app/showBuildingModal", type);
    },
    showNotifySectionModal(data) {
      this.$store.commit("app/showNotifySection", data);
    },
    checkOrderInDistributor() {
      this.$store.dispatch('order/checkOrderInDistributor')
        .then((res) => {
          if(res && res['data'] && res['data']['check_order'] != 0) this.showNotifySectionModal('limitOrder');
        })
    }
  },
  watch: {
    $route(to, from) {
      this.showBuildingModal();
      if(this.islogged) this.checkOrderInDistributor();
    },
  },
};
</script>
<style lang="scss" scoped>
.fade {
  display: none;
}
.display-none {
  display: none;
}
</style>
