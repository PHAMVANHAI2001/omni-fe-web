<template>
  <div class="footer-mobile">
    <client-only>
      <ul>
        <li id="homePage">
          <!-- style="width: 72px" -->
          <nuxt-link to="/">
            <img  src="~assets/images/icon/mobile-footer/home-icon1.png" alt />
            <span class="txt">Trang chủ</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/category">
            <img src="~assets/images/icon/mobile-footer/cate.png" alt />
            <span class="txt">Danh mục</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/promotion">
            <img src="~assets/images/icon/mobile-footer/promotion.png" alt />
            <span class="txt">Khuyến mãi</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user-rated-gallery">
            <img src="~assets/images/icon/mobile-footer/comment1.png" alt />
            <span class="txt">Đánh giá</span>
          </nuxt-link>
        </li>
         <li >
          <nuxt-link to="/user/menu-mobile" v-if="islogged">
            <img
              src="~assets/images/icon/mobile-footer/register-user.png"
              alt
            />
            <span class="txt">Tài khoản</span>
          </nuxt-link>
          <a @click="showModalLogin()" v-if="!islogged">
            <img
              src="~assets/images/icon/mobile-footer/register-user.png"
              alt
            />
            <span class="txt">Tài khoản</span>
          </a>
        </li>
        <!-- <li >
          <a @click="showModalLogin" v-if="!islogged">
            <img
              src="~assets/images/icon/mobile-footer/bell.png"
              alt
            />
            <span class="txt">Thông báo</span>
          </a>
          <nuxt-link to="/user/notification" v-if="islogged">
            <img
              src="~assets/images/icon/mobile-footer/bell.png"
              alt
            />
            <span class="txt">Thông báo</span>
          </nuxt-link>
        </li> -->
      
        <!-- <li v-if="(user && user.role_code !== 'SHIPPER') || !user">
          <nuxt-link to="/checkout/shipping">
            <img
              src="~assets/images/icon/mobile-footer/cart.png"
              alt
              class="icon-add-to-cart"
            />
            <span
              class="badge badge-danger"
              style="position: absolute; z-index: 10; margin: 6px -10px;"
              >{{ cart && cart.total ? cart.details.length : 0 }}</span
            >
            <span class="txt">Giỏ hàng</span>
          </nuxt-link>
        </li> -->
        <!-- <li id="homePage">
          <nuxt-link to="/">
            <img style="width: 72px" src="~assets/images/icon/mobile-footer/home2.png" alt />
            <span class="txt">Trang chủ</span>
          </nuxt-link>
        </li> -->
        <!-- <li v-if="!user">
          <nuxt-link :to="linkOrder">
            <img src="~assets/images/icon/mobile-footer/order.png" alt />
            <span class="txt">Đơn hàng</span>
          </nuxt-link>
        </li> -->
        <!-- <li>
          <a @click="showModalLogin" v-if="!islogged">
            <img src="~assets/images/icon/mobile-footer/order.png" alt />
            <span class="txt">Đơn hàng</span>
          </a>
          <nuxt-link to="/user/order" v-if="islogged">
            <img src="~assets/images/icon/mobile-footer/order.png" alt />
            <span class="txt">Đơn hàng</span>
          </nuxt-link>
        </li> -->
        <!-- <li v-if="user && user.role_code == 'SHIPPER'">
          <nuxt-link to="/user/shipper">
            <img src="~assets/images/icon/mobile-footer/order.png" alt />
            <span class="txt">Đơn hàng</span>
          </nuxt-link>
        </li> -->
        <!-- <li v-if="islogged">
          <nuxt-link to="/user/menu-mobile">
            <img
              src="~assets/images/icon/mobile-footer/register-user.png"
              alt
            />
            <span class="txt">{{
              user && user.group_code == 'GUEST' ? "Cá nhân" : user && user.group_name
            }}</span>
          </nuxt-link>
        </li> -->

      </ul>
    </client-only>
  </div>
  
</template>

<script>
// import addThis from "~/components/addThis";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      linkOrder: "/user/order/check-order",
      phone: null,
      islogged: false,
    };
  },
  components:{
    // addThis,
  },
  computed: mapState({
    cart: (state) => state.cart.cart,
    user: (state) => state.user.user,
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "user/auth_success") {
        this.linkOrder = "/user/order";
      }
      if (mutation.type == "user/logout") {
        this.linkOrder = "/user/order/check-order";
      }
    });

    if (!process.server) {
      this.islogged = localStorage.getItem("id_token");
      this.phone = localStorage.getItem("phone");
    }
  },
  methods: {
    showModalLogin() {
      this.$store.commit("user/showLoginModal");
    },
    // showSelectLoginForm() {
    //   this.$store.commit("app/showSelectLoginModal");
    // },
    //  requestPhone() {
    //   if (!process.server && !localStorage.getItem("phone")) {
    //     // chưa nhập sdt lần nào sẽ dc hỏi lại.
    //     // this.$route.name !== "index"
    //     if (this.$route.name !== "information-code") {
    //       console.log('zzzzzzz', this.$route.name)
    //       this.$router.push("/");
    //       this.showModalLogin();
    //     }
    //   }
    // },
  },
  watch: {
    $router() {
      // this.requestPhone();
      let element = document.getElementById("homePage");
      element.classList.remove(".nuxt-link-exact-active");
    },
  },
};
</script>
<style lang="scss" scoped>
// .nuxt-link-active {
//   background: #006e43 !important;
// }
a.nuxt-link-active {
  font-weight: bold;
}
a.nuxt-link-exact-active {
  color: #006e43;
  background: #b7b7b72e;
  // box-shadow: 3px 6px 5px 4px #006e4347;
  // border: #ffcd001c solid 1px;
  // height: 68px;
}
</style>
