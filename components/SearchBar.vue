<template>
  <div class="search-bar" id="search-bar">
    <div
      class="container"
      style="padding-left: 5px !important; padding-right: 5px !important;"
    >
      <div class="search-bar-control">
        <nuxt-link to="/" class="logo">
          <img
            class="img-fluid"
            src="~/assets/images/nutifood/logo-ntf.svg"
            alt="Chuỗi hệ thống siêu thị sữa nutifood"
          />
        </nuxt-link>
        <div class="search-box top-search search-header">
          <div>
            <input
              type="text"
              v-model="searchkey"
              v-on:input="search()"
              @keyup.enter="searchPage"
              placeholder="Tìm sản phẩm..."
            />
            <button
              @click="reset()"
              type="button"
              class="reset"
              v-if="searchkey"
            >
              <span class="bhx-closemenu fa fa-close"></span>
            </button>
            <button @click="searchPage()" type="button" class="search-btn">
              <span class="fa fa-search"></span>
            </button>
          </div>
        </div>
        <div
          v-if="products && !products.length"
          class="alert alert-warning"
          role="alert"
          style="position: absolute"
        >
          Không tìm thấy sản phẩm nào.
        </div>
        <div
          id="autocomplete-list"
          v-if="products !== null && products && products.length && searchkey"
        >
         <!-- && searchkey.length -->
          <ul class="autocomplete-items" >
            <li v-for="(item, i) in products" :key="i" v-show="i < 5">
              <div class="item">
                <div class="flex search-item">
                  <div class="viewdetail">
                    <div class="image">
                      <img :src="item.thumbnail" />
                    </div>
                    <div class="info">
                      <a @click="viewDetail(item)" class="thumbnail">
                        <h3>
                          {{ item.name }}
                        </h3>

                        <div class="block-prices d-block">
                          <span>
                            <strong
                              class="product-price"
                              v-if="item.special == null"
                            >
                              {{ item.price_formatted }}
                            </strong>
                            <strong
                              class="product-price"
                              v-if="item.special > 0"
                            >
                              {{ item.special_formatted }}
                            </strong>
                          </span>

                          <!-- <b-button
                          variant="success"
                          v-if="item['qty'] > 0"
                          @click="addToCart(item)"
                          >Mua ngay</b-button
                        > -->

                          <div v-if="item.special > 0" class="special-price">
                            <span
                              class="product-old-price"
                              v-bind:class="{ has_special: item.special }"
                            >
                              <del>{{ item.price_formatted }}</del>
                            </span>
                            <span
                              class=""
                              style="color: red; font-weight: bolder;"
                              >-{{ item.special_percentage }}%</span
                            >
                          </div>
                        </div>
                      </a>
                      <!-- <div class="price">
                          
                        </div> -->
                    </div>
                  </div>

                  <!-- <div class="buys">
                      <a
                        v-if="item.qty > 0"
                        @click="addToCart(item)"
                        class="btnbuy"
                        >Chọn mua</a
                      >
                      <a v-if="item.qty == 0" class="btnbuy danger"
                        >Hết hàng</a
                      >
                    </div> -->
                </div>
              </div>
            </li>
            <li class="viewmore" v-if="products && products.length > 1">
              <a class="" @click="searchPage()"
                >Xem thêm <b>{{ products ? products.length : 0 }}</b> kết quả
                với từ khóa "<b>{{ searchkey }}</b
                >"</a
              >
            </li>
          </ul>
        </div>
        <!-- <a
          class="ml-3 mr-3"
          style="position: relative;"
          title="Danh sách Trust&amp;Love"
        >
          <i class="fa fa-bell" style="font-size:25px; color: #fff"></i>
          <span
            class="sup-text  text-center"
            style="background:#f5a623;    border-radius: 100%;
              padding: 3px 1px;    height: 16px;    min-width: 16px;    text-align: center;    font-size: 10px;    font-weight: 700;    line-height: 11px;    top: -5px;   left: 16px;"
            >16</span
          >
        </a> -->
        <!-- <nuxt-link
          
          to="/user/order/check-order"
          class="histories text-center"
          v-if="!user && !isMobile"
          >Đơn hàng<br />của bạn</nuxt-link
        > -->
        <nuxt-link
          to="/user/order"
          class="histories text-center"
          v-if="user && user.role_code !== 'SHIPPER' && !isMobile"
          >Đơn hàng<br />của bạn</nuxt-link
        >

        <div
          class="navbar-right"
          v-if="!isMobile"
          v-on:mouseover="iactive = 1"
          @mouseleave="iactive = 0"
        >
          <nuxt-link to="/checkout/shipping" id="cart" class="temcart">
            <i
              class="fa fa-shopping-cart"
              style="font-size: 24px; margin: 9px 4px;"
            ></i>
            {{
              cart && cart.details && cart.details.length
                ? "THANH TOÁN"
                : "GIỎ HÀNG"
            }}
            <span
              class="badge"
              style="position: absolute; z-index: 10;  margin: 1px -95px;"
              v-if="cart && cart.details && cart.details.length"
              >{{ cart.details.length }}</span
            >
          </nuxt-link>
          <div
            class="shopping-cart "
            v-bind:class="[iactive == 1 ? 'active' : '']"
            v-if="cart && cart.details && cart.details.length"
          >
            <div class="shopping-cart-header">
              <i class="fa fa-shopping-cart cart-icon"></i
              ><span
                class="badge"
                v-if="cart && cart.details && cart.details.length"
                >{{ cart.details.length }}</span
              >
              <div class="shopping-cart-total">
                <span class="lighter-text">Tổng tiền:</span>
                <span class="main-color-text total sumorder">{{
                  cart && cart.total_fortmated ? cart.total_fortmated : "0 đ"
                }}</span>
              </div>
            </div>

            <ul class="shopping-cart-items">
              <li
                class="clearfix color-nuti"
                v-for="(product_item, i) in cart.details.slice(0, 5)"
                :key="product_item.id"
              >
                <img :src="product_item.product_thumb" alt="item1" />
                <a
                  style="float: right; font-size: 18px; margin: -4px -2px 0px 0px;"
                  @click="deleteCartItem(product_item, i)"
                >
                  <i class="fa fa-times-circle"></i>
                  <span class="fs-13">Xóa</span>
                </a>
                <span class="item-name">{{ product_item.product_name }}</span>
                <span class="item-price">{{
                  product_item.price_formatted
                }}</span>
                <span class="item-quantity"
                  >Số lượng: {{ product_item.quantity }}
                </span>
              </li>
            </ul>
            <nuxt-link
              to="/checkout/shipping"
              class="color-nuti fs-16"
              style="padding: 10px;text-align: center;font-weight: 500;"
              >Bạn đang có {{ cart && cart.details && cart.details.length }} sản phẩm trong giỏ
              hàng</nuxt-link
            >
            <nuxt-link to="/checkout/shipping" class="button"
              >Thanh toán <i class="fa fa-chevron-right"></i
            ></nuxt-link>
          </div>

          <div
            v-if="!isMobile && !cart"
            v-on:mouseover="iactive = 1"
            @mouseleave="iactive = 0"
          >
            <div
              class="shopping-cart"
              v-bind:class="[iactive == 1 ? 'active' : '']"
            >
              <p
                class="color-nuti fs-16"
                style="padding: 10px;text-align: center;font-weight: 600;"
              >
                Giỏ hàng bạn đang trống!
              </p>
            </div>
          </div>
        </div>

        <nuxt-link
          to="/checkout/shipping"
          class="temcart-ismobile"
          v-if="isMobile"
        >
          <div class="" style="line-height: 50px">
            <!-- <span class="cart-total_quantity" v-if="cart && cart.details">
              {{ cart.details.length }}
            </span> -->
            <i class="fa fa-shopping-cart" style="font-size: 24px;"></i>
            <span
              class="badge badge-danger"
              style="position: absolute; z-index: 99999; margin: 0 -10px;"
              v-if="cart && cart.details && cart.details.length"
              >{{ cart.details.length }}</span
            >
          </div>
          <div id="cart-header">
            <b class="cart">{{
              cart && cart.details && cart.details.length
                ? "THANH TOÁN"
                : "GIỎ HÀNG"
            }}</b>
            <b class="sumorder">{{
              cart && cart.total_fortmated ? cart.total_fortmated : "0 đ"
            }}</b>
          </div>
        </nuxt-link>
        <div class="notification-bell" v-if="!isMobile && user">
          <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-bell"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            style="width: 400px; transform: translate3d(1000px, 45px, 0px) !important; overflow: scroll;"
            :style="{ height: innerHeightDV + 'px !important' }"
          >
            <div class="type-notification">
              <div class="notification">
                <nuxt-link to="/user/notification" class="view-all float-right"
                  >Xem tất cả</nuxt-link
                >
                <h4>Thông báo</h4>
              </div>
              <div
                class="item-notification"
                v-if="
                  !notifications || (notifications && notifications.length == 0)
                "
              >
                <em>Chưa có thông báo</em>
              </div>
              <div
                class="item-notification"
                v-for="(item, i) in notifications"
                :key="i"
              >
                <div class="d-flex flex-row">
                  <div class="avatar-notification">
                    <b-avatar
                      icon="cart-check-fill"
                      size="3rem"
                      v-if="item.title == 'Đơn hàng Đã xác nhận'"
                    ></b-avatar>
                    <b-avatar
                      icon="patch-check-fill"
                      size="3rem"
                      v-if="item.title == 'Đơn hàng Đã hoàn thành'"
                    ></b-avatar>
                  </div>
                  <div class="body-notification">
                    <h6 class="title-item-notification">{{ item.title }}</h6>
                    <p class="content-item-notification">{{ item.body }}</p>
                    <p class="time-notification">{{ item.created_at }}</p>
                  </div>
                  <div class="is-watched">
                    <i class="fa fa-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="customer-list ml-auto" v-if="!isMobile">
          <a
            v-if="!user"
            @click="showModalLogin()"
            class="btn btn-outline-light"
          >
            <strong>Đăng nhập | Đăng ký</strong>
          </a>
          <div v-if="user" class="dropdown show">
            <a
              class="user-infos"
              role="button"
              id="dropdownUser"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span class="user-name">
                <strong v-if="user">{{ user.full_name }}</strong>
              </span>

              <!-- <span v-if="user" class="user-avatars img-avatar">
                {{ user.full_name | truncate(4) }}
              </span> -->
              <b-avatar v-if="!user || user && !user.avatar" size="2.2rem"></b-avatar>
              <b-avatar
                v-if="user && user.avatar"
                variant="success"
                :src="user.avatar"
                size="2.2rem"
              ></b-avatar>
            </a>

            <div
              class="dropdown-menu"
              aria-labelledby="dropdownUser"
              x-placement="bottom-start"
            >
              <!-- <a
                v-if="!user && phone"
                @click="showModalLogin(1)"
                class="dropdown-item pl-2 text-primary"
                ><i class="fa fa-user mr-2"></i>Đăng ký thành viên
              </a> -->
              <nuxt-link
                v-if="user"
                to="/user/profile"
                class="dropdown-item pl-2 text-primary"
                ><i class="fa fa-user mr-2"></i>Thông tin tài khoản
              </nuxt-link>
              <!-- <a v-if="user" class="dropdown-item pl-2 text-primary"
                ><i class="fa fa-bell mr-2"></i> Thông báo của tôi<span
                  class="sup-text"
                  >16</span
                ></a
              > -->
              <nuxt-link
                v-if="user"
                to="/user/order"
                class="dropdown-item pl-2 text-primary"
                ><i class="fa fa-list-alt mr-2"></i>Đơn hàng đã đặt</nuxt-link
              >
              <nuxt-link
                v-if="!user && phone"
                to="/user/order/check-order"
                class="dropdown-item pl-2 text-primary"
                ><i class="fa fa-list-alt mr-2"></i>Đơn hàng đã đặt</nuxt-link
              >
              <!-- <a
                class="dropdown-item pl-2 "
                href="https://concung.com/san-pham-da-xem.html"
                ><i class="icons icon-prodviewed mr-2"></i>Sản phẩm đã xem</a
              > -->
              <!-- <a
                class="dropdown-item pl-2 "
                href="https://concung.com/trust-love.html"
                ><i class="icons icon-favlist mr-2"></i>Sản phẩm quan tâm</a
              > -->

              <a
                class="text-center pull-right btn btn-secondary mt-1 mr-1"
                @click="logout"
                >Đăng xuất</a
              >
            </div>
          </div>
        </div>
      </div>

      <b-nav v-if="isMobile">
        <div class="feature-header">
          <carousel
            :perPageCustom="[
              [320, 3],
              [768, 4],
              [1024, 7],
              [1200, 9],
            ]"
            :scrollPerPage="false"
            :paginationEnabled="false"
          >
            <slide class="product-slide text-center nav-item-slide">
              <b-nav-item class="nav-link-custom">
                <a
                  v-if="logoHeader && logoHeader.type == 'LINK-CUSTOM'"
                  :href="logoHeader.router"
                  target="_blank"
                  class="mr-3"
                >
                  <img :src="logoHeader.image_url" alt="" width="60px" />
                </a>
                <nuxt-link
                  v-if="logoHeader && logoHeader.type == 'CATEGORY'"
                  :to="{ path: `/product?cat=${logoHeader.category_id}` }"
                  class="mr-3"
                >
                  <img :src="logoHeader.image_url" alt="" width="60px" />
                </nuxt-link>
              </b-nav-item>
            </slide>

            <slide class="product-slide text-center nav-item-slide">
              <b-nav-item class="nav-link-custom">
                <nuxt-link to="/product">
                  Sản phẩm
                </nuxt-link>
              </b-nav-item>
            </slide>

            <!-- <slide class="product-slide text-center nav-item-slide">
              <b-nav-item class="nav-link-custom">
                <nuxt-link to="/promotion">
                  Khuyến mãi hot
                </nuxt-link>
              </b-nav-item>
            </slide> -->

            <slide class="product-slide text-center nav-item-slide">
              <b-nav-item class="nav-link-custom">
                <nuxt-link to="/blog">
                  Bài viết
                </nuxt-link>
              </b-nav-item>
            </slide>

            <!-- <slide class="product-slide text-center nav-item-slide">
              <b-nav-item class="nav-link-custom">
                <nuxt-link to="/user-rated-gallery">
                  Thư viện đánh giá
                </nuxt-link>
              </b-nav-item>
            </slide> -->

            <slide class="product-slide text-center nav-item-slide">
              <b-nav-item class="nav-link-custom">
                <nuxt-link to="/location-distributors">
                  Nhà phân phối
                </nuxt-link>
              </b-nav-item>
            </slide>
          </carousel>
        </div>
      </b-nav>
    </div>
    <div v-show="showLoadingOverlay" class="loading-container">
      <div class="lds-hourglass"></div>
      <!-- <span class="text">Đang xử lý...</span> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import addThis from "~/components/addThis";
import { isMobile } from "~/plugins/util";
export default {
  components: {
    // addThis,
  },
  props: {
    logoHeader: Object,
  },
  data() {
    return {
      iactive: 0,
      isActive: false,
      searchkey: null,
      productSearch: null,
      products: null,
      menus: [],
      langs: [],
      activeLang: "vi",
      modules: [],
      islogged: null,
      FooterLinks: null,
      PrimaryMenu: null,
      fakePrimaryMenu: [1, 2, 3, 4],
      showGoTopBtn: false,
      builderMode: 0,
      isMobile: false,
      displayBlock: false,
      account_status: null,
      phone: null,
      variantList: [],
      notifications: [],
      innerHeightDV: null,
      clicked: false,
      keyProduct: false,
      // cart: {},
    };
  },

  computed: mapState({
    cart: (state) => state.cart.cart,
    user: (state) => state.user.user,
    categories: (state) => state.products.categories,
    styleCss: (state) => state.sitebuilder.styleCss,
    showLoadingOverlay: (state) => state.app.showLoadingOverlay,
  }),
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },

  created() {
    this.getAllProduct();
     setInterval(() =>{
        this.getAllProduct();
      }, 60000);
    if (process.browser) {
      this.islogged = localStorage.getItem("id_token");
      this.phone = localStorage.getItem("phone");
      const session_id = localStorage.getItem("session_id");
      if (session_id) {
        this.$store.commit("app/setSession", session_id);
      } else {
        // ko thấy session_id.
        localStorage.removeItem("phone");
        //localStorage.removeItem("temp_phone");
      }
      if (window.innerHeight && window.innerHeight > 500) {
      let currentHeight = window.innerHeight - 100;
      if (currentHeight && currentHeight > 500) {
        this.innerHeightDV = currentHeight;
      }
    } else {
      this.innerHeightDV = 500;
    }
    }
    if (this.islogged) {
      this.getUserProfile();
      this.getNotification();
    }
    if (this.phone) {
      // set online user by phone
      this.socket = this.$nuxtSocket({
        channel: `/?userPhone=${this.phone}`,
      });
    }
    this.searchkey = this.$store.state.products.searchParam.name;
    this.$store.dispatch("cart/getCart");
    this.$store.dispatch("products/getCategory");
  },

  methods: {
    requestQueryProduct() {
      const itevl = setInterval(() => {
        if (this.keyProduct) {
          clearInterval(itevl);
        }
        this.getAllProduct();
      }, 60000);
    },
    deleteCartItem(item, index) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.$store
        .dispatch("cart/deleteCartItem", {
          key: item.id,
          index: index,
        })
        .then(() => {
          this.$store.dispatch("cart/getCart").then((data)=> {
           data ? this.clicked = false : this.clicked = true;
          });
         
        })
        .catch((err) => {
          // //console.log("Không thể xoá cart item :", err);
        });
    },
    getNotification(page = 1) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `v1/notifies?limit=5&page=${page}`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.notifications = resp.data;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("err:", err);
        });
    },
    changeCategory(id) {
      this.$store.commit("products/resetSearchParam");
    },
    showChildren(item) {
      // console.log("item", item);
      item["show"] = !item["show"];
    },

    removeAscent(str) {
      if (str === null || str === undefined) return str;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      return str;
    },
    filterProduct() {
      this.$router.push(`/`);
      this.products = this.productSearch.filter((item) => {
        return new RegExp(this.removeAscent(this.searchkey)).test(
          this.removeAscent(item.name)
        );
      });
    },
    showModalRegister() {
      this.$store.commit("app/showRegisterModal");
    },
    showModalLogin(type) {
      type === 1
        ? this.$store.commit("user/showLoginModal", 1)
        : this.$store.commit("user/showLoginModal");
    },
    reset() {
      this.searchkey = null;
      // this.$router.push("/");
      this.products = null;
    },
    search() {
      this.displayBlock = true;
      this.debounce(this.getProduct(), 2000);
    },
    debounce(func, wait) {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), wait);
      };
    },
    viewDetail(item) {
      this.reset();
      this.$router.push({ path: `/product/${item.slug}` });
    },
    searchPage() {
      var result = encodeURIComponent(this.searchkey);
      this.$router.push({ path: `/search?name=${result}` });
      this.reset();
    },
    getProduct() {
      const result = encodeURIComponent(this.searchkey);
      const limit =  10;
      this.products = null;
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=${limit}&name=${result}&status=1&landing_page=show`,
        })
        .then((resp) => {
          this.products = resp.data.data;
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    getAllProduct() {
      const limit = 200;
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=${limit}&status=1&landing_page=show`,
        })
        .then((resp) => {
          if(resp && resp['data'] && resp['data']['data']) {
            localStorage.setItem("productsAll", JSON.stringify(resp && resp['data'] && resp['data']['data']));
          } else {
            this.keyProduct = true;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    logout() {
      if(this.user.gg_id != null){
          this.$gAuth.signOut().then(GoogleUser => {

          }).catch(error => {
            console.log('error', error)
          });
        }
      if(this.user.fb_id != null){
        window.FB.logout(response => {

        },this.params)
      }
      this.$store.dispatch("user/logout").then(() => {
        localStorage.removeItem("session_id");
        localStorage.removeItem("id_token");
        this.$router.push("/");
        this.phone = localStorage.removeItem("phone");
        setTimeout(() => {
          location.reload();
        });
      });
    },
    viewCart() {
      if (this.cart && this.cart.details) {
        this.$router.push("/checkout/cart");
      }
    },
    viewProfile() {
      this.$router.push("/user/profile");
    },
    getUserProfile() {
      this.$store
        .dispatch("user/getAccount")
        .then((res) => {
          // save info to local
          localStorage.setItem("userid", res["data"]["id"]);
          localStorage.setItem("group_code", res["data"]["group_code"]);
          // this.getCart();
          this.$store.dispatch("cart/getCart");
        })
        .catch((err) => {
          console.log("get profile err:", err);
        });
    },
    requestPhone() {
      if (!process.server && !localStorage.getItem("phone")) {
        // chưa nhập sdt lần nào sẽ dc hỏi lại.
        // this.$route.name !== "index"
        if (this.$route.name !== "information-code") {
          // this.$router.push("/");
          this.showModalLogin();
        }
        // this.showModalLogin();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.checked-list h5 {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #4166d0;
}
.cart-count {
  margin-top: -7px !important;
  margin-left: 5px !important;
  background: #f5a623;
  color: #fff;
  line-height: 11px;
}
.btn-outline-light {
  padding-right: 9px;
  padding-left: 9px;
}
.dropdown-menu {
  position: absolute;
  will-change: transform;
  top: 0px;
  left: 0px;
  transform: translate3d(0px, 36px, 0px);
}
.dropdown-item {
  position: relative;
  span {
    background: #f5a623;
    font-size: 12px;
    left: 24px;
  }
}
.histories {
  float: left;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  line-height: 15px;
  width: 92px;
  height: 50px;
  text-align: center;
  font-size: 13px;
  color: #fff;
  padding: 10px 5px;
  box-sizing: border-box;
}
.histories:hover {
  color: #ffcd00;
}
.temcart {
  float: right;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  line-height: 20px;
  background: rgba(19, 18, 24, 0.16);
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  height: 50px;
  width: 150px;
  padding: 0 10px;
  text-align: center;
  border-radius: 8px;
}
.temcart-ismobile {
  float: right;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  line-height: 20px;
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  height: 50px;
  width: 150px;
  text-align: center;
}
.temcart-ismobile div {
  // line-height: 50%
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin-right: 10px;
  margin-top: 6px;
}

.temcart div {
  // line-height: 50%
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin-right: 6px;
  margin-top: 6px;
}
.temcart .bhx-cart {
  background-position: -256px -33px;
  width: 24px;
  height: 22px;
}
.hiscart .temcart span {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: #f00;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  position: absolute;
  top: 15px;
  text-align: center;
  left: 15px;
}
.hidden {
  display: none !important;
}
.temcart b {
  display: block;
  font-weight: bold;
}
.temcart b.sumorder {
  font-weight: bold;
  color: #ffcd00;
}
</style>
