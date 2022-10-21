<template>
  <div class="nav footer-nav">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8 pr-0">
          <div class="widget">
            <div class="row">
              <div class="col-md-11 ml-3 pr-0 pl-0">
                <div id="accordion">
                    <span class="card-header" data-toggle="collapse show" href="#id" 
                        style="
                        display: block;
                        padding: 20px;
                        font-size: 1.3rem;
                        color: #006e43;">
                    <h5 class="widget-titles">Xin chào, NutifoodShop có thể giúp gì cho bạn?</h5>
                    </span>
                    <div id="id" class="collapse show " data-parent="#accordion"> 
                        <div class="card questiontab" id="myData">
                            <div class="card-header" data-toggle="collapse" href="#idcauhoi" 
                                style="
                                display: block;
                                border-bottom: 1px solid #dad3d3;
                                padding: 15px;
                                font-size: 18px
                                ">
                                <li class="question " id="content" style="color: #006e43;">&emsp;Mua hàng</li>
                                <div id="idcauhoi" class="collapse noidung" data-parent="#idcauhoi">
                                    <div class="card-body answer">
                                        <div id="idcauhoi" class="collapse">
                                            <li v-for="(item, i) in footerPurchase" :key="i">
                                                <nuxt-link  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                    " v-if="item.type == 'TEXTAREA'"
                                                    class="text"
                                                    :to="{ path: `/information/${aboutPurchase}?key=${item.key}` }"
                                                    >{{ item.name }}</nuxt-link>
                                                    <a  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                    " v-if="item.type == 'TEXT'"
                                                    :href="item.value"
                                                    >{{ item.name }}
                                                </a>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="card-header" data-toggle="collapse" href="#idcauhoi2" 
                            style="
                            display: block;
                            border-bottom: 1px solid #dad3d3;
                            padding: 15px;
                            font-size: 18px;
                            color: #006e43;">
                            <li class="question" id="content">&emsp;Thanh toán</li>
                            <div id="idcauhoi2" class="collapse noidung" data-parent="#idcauhoi2">
                                <div class="card-body answer">
                                    <div id="idcauhoi2" class="collapse">
                                        <li v-for="(item, i) in footerPayment" :key="i">
                                            <nuxt-link  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXTAREA'"
                                                class="text"
                                                :to="{ path: `/information/${aboutPayment}?key=${item.key}` }"
                                                >{{ item.name }}</nuxt-link>
                                                <a  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXT'"
                                                :href="item.value"
                                                >{{ item.name }}
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="card-header" data-toggle="collapse" href="#idcauhoi3" 
                            style="
                            display: block;
                            border-bottom: 1px solid #dad3d3;
                            padding: 15px;
                            font-size: 18px;
                            color: #006e43;">
                            <li class="question" id="content">&emsp;Giao hàng</li>
                            <div id="idcauhoi3" class="collapse noidung" data-parent="#idcauhoi3">
                                <div class="card-body answer">
                                    <div id="idcauhoi3" class="collapse">
                                        <li v-for="(item, i) in footerDelivery" :key="i">
                                            <nuxt-link  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXTAREA'"
                                                class="text"
                                                :to="{ path: `/information/${aboutDelivery}?key=${item.key}` }"
                                                >{{ item.name }}</nuxt-link>
                                                <a  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXT'"
                                                :href="item.value"
                                                >{{ item.name }}
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="card-header" data-toggle="collapse" href="#idcauhoi4" 
                            style="
                            display: block;
                            border-bottom: 1px solid #dad3d3;
                            padding: 15px;
                            font-size: 18px;
                            color: #006e43;">
                            <li class="question" id="content">&emsp;Trả hàng / Hoàn tiền</li>
                            <div id="idcauhoi4" class="collapse noidung" data-parent="#idcauhoi4">
                                <div class="card-body answer">
                                    <div id="idcauhoi4" class="collapse">
                                        <li v-for="(item, i) in footerReturnsrefund" :key="i">
                                            <nuxt-link  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXTAREA'"
                                                class="text"
                                                :to="{ path: `/information/${aboutReturnsrefund}?key=${item.key}` }"
                                                >{{ item.name }}</nuxt-link>
                                                <a  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXT'"
                                                :href="item.value"
                                                >{{ item.name }}
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="card-header" data-toggle="collapse" href="#idcauhoi5" 
                            style="
                            display: block;
                            border-bottom: 1px solid #dad3d3;
                            padding: 15px;
                            font-size: 18px;
                            color: #006e43;">
                            <li class="question" id="content">&emsp;Đánh giá</li>
                            <div id="idcauhoi5" class="collapse noidung" data-parent="#idcauhoi5">
                                <div class="card-body answer">
                                    <div id="idcauhoi5" class="collapse">
                                        <li v-for="(item, i) in footerReview" :key="i">
                                            <nuxt-link  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXTAREA'"
                                                class="text"
                                                :to="{ path: `/information/${aboutReview}?key=${item.key}` }"
                                                >{{ item.name }}</nuxt-link>
                                                <a  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXT'"
                                                :href="item.value"
                                                >{{ item.name }}
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="card-header" data-toggle="collapse" href="#idcauhoi6" 
                            style="
                            display: block;
                            border-bottom: 1px solid #dad3d3;
                            padding: 15px;
                            font-size: 18px;
                            color: #006e43;">
                            <li class="question" id="content">&emsp;Tích điểm</li>
                            <div id="idcauhoi6" class="collapse noidung" data-parent="#idcauhoi6">
                                <div class="card-body answer">
                                    <div id="idcauhoi6" class="collapse">
                                        <li v-for="(item, i) in footerCodepoints" :key="i">
                                            <nuxt-link  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXTAREA'"
                                                class="text"
                                                :to="{ path: `/information/${aboutCodepoints}?key=${item.key}` }"
                                                >{{ item.name }}</nuxt-link>
                                                <a  style="
                                                    display: block;
                                                    border-bottom: 1px solid #dad3d3;
                                                    padding: 15px;
                                                    font-size: 13px
                                                " v-if="item.type == 'TEXT'"
                                                :href="item.value"
                                                >{{ item.name }}
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
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
      footerPurchase: [],
      footerPayment: [],
      footerDelivery: [],
      footerReturnsrefund: [],
      footerReview: [],
      footerCodepoints: [],
      aboutPurchase: null,
      aboutPayment: null,
      aboutDelivery: null,
      aboutReturnsrefund: null,
      aboutReview: null,
      aboutCodepoints: null,
      
    };
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  created() {
    this.getSettingPurchase();
    this.getSettingPayment();
    this.getSettingDelivery();
    this.getSettingReturnsrefund();
    this.getSettingReview();
    this.getSettingCodepoints();
    if (!process.server) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    getSettingPurchase() {
      const about = "ABOUT-PURCHASE";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutPurchase = about;
          this.footerPurchase = data.data.data;
        });
    },
    getSettingPayment() {
      const about = "ABOUT-PAYMENT";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutPayment = about;
          this.footerPayment = data.data.data;
        });
    },
    getSettingDelivery() {
      const about = "ABOUT-DELIVERY";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutDelivery = about;
          this.footerDelivery = data.data.data;
        });
    },
    getSettingReturnsrefund() {
      const about = "ABOUT-RETURNS-REFUND";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutReturnsrefund = about;
          this.footerReturnsrefund = data.data.data;
        });
    },
    getSettingReview() {
      const about = "ABOUT-REVIEW";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutReview = about;
          this.footerReview = data.data.data;
        });
    },
    getSettingCodepoints() {
      const about = "ABOUT-CODE-POINTS";
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${about}`)
        .then((data) => {
          this.aboutCodepoints = about;
          this.footerCodepoints = data.data.data;
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
<style>
.widget-titles{
    background: #006e43;
    color: white;
    width: 1180px;
    height: 100%;
    font-size: 30px;
    text-align: center
}
@media (min-width: 320px) and (max-width: 767px){
    .widget-titles{
        margin: 0px 0px 0px -12px;
        width: 100%;
        font-size: 25px;
    }
    .collapse{
        width: auto;
        margin: auto;
    }
}
@media (min-width: 768px) and (max-width: 800px){
    .widget-titles{
        margin: auto;
        width: 100%;
        font-size: 25px;
    }
    .collapse{
        width: auto;
        margin: auto;
    }
}
@media (min-width: 801px) and (max-width: 1024px){
    .widget-titles{
        margin: auto;
        width: 880px;
        font-size: 25px;
    }
    .collapse{
        width: 880px;
        margin: 0px 0px 0px 20px;
    }
}
</style>
