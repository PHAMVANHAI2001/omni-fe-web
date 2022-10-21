<template>
<client-only>
  <div class="page-wrap" v-bind:class="[`page-${$route.name}`]">
    <Header :logoHeader="logoHeader"></Header>
    <SearchBar :logoHeader="logoHeader"></SearchBar>
    <div class="page-content">
      <div class="container">
        <div class="row">
          <nav class="d-none d-md-block bg-light" v-if="!isMobile" v-bind:class="[!isMobile ? 'col-4' :  'col-12']">
            <div class="sidebar-user-manage">
              <div class="account-info-vr" v-if="user">
                <p>
                  <strong>{{ user.group_name }}:</strong>
                  {{ user.full_name }}
                </p>
                <span
                  class="account-verify"
                  v-if="user && user.account_status !== 'approved'"
                >
                  <img src="~assets/images/not-approved.svg" alt /> Chưa xác
                  thực
                </span>
                <span
                  class="account-verify"
                  v-if="user && user.account_status == 'approved'"
                >
                  <img src="~assets/images/approved.svg" alt /> Đã xác thực
                </span>
              </div>

              <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              >
                <span>Tổng quan</span>
              </h6>

              <ul
                class="nav flex-column"
                v-if="user && user.role_code !== 'SHIPPER'"
              >
                <li class="nav-item nav-hover">
                  <nuxt-link class="nav-link color-nuti" to="/user/profile">
                    <span data-feather="user"></span>
                    Thông tin tài khoản
                  </nuxt-link>
                </li>
                <li class="nav-item nav-hover">
                  <nuxt-link class="nav-link color-nuti" to="/user/locations">
                    <span data-feather="map-pin"></span>
                    Sổ địa chỉ
                  </nuxt-link>
                </li>
                <li class="nav-item nav-hover">
                  <nuxt-link class="nav-link color-nuti" to="/user">
                    <span data-feather="pie-chart"></span>
                    Thống kê nhanh
                  </nuxt-link>
                </li>
                <li class="nav-item nav-hover">
                  <nuxt-link class="nav-link color-nuti" to="/user/order">
                    <span data-feather="shopping-bag"></span>
                    Quản lý đơn hàng
                  </nuxt-link>
                </li>
                <li class="nav-item nav-hover">
                  <nuxt-link class="nav-link color-nuti" to="/user/notification">
                    <span data-feather="inbox"></span>
                    Thông báo của tôi
                    <span class="sr-only">(current)</span>
                  </nuxt-link>
                </li>
                <li class="nav-item nav-hover">
                  <nuxt-link class="nav-link color-nuti" to="/user/products-purchased">
                    <span data-feather="shopping-cart"></span>
                    Sản phẩm đã mua
                  </nuxt-link>
                </li>
                <li class="nav-item nav-hover" v-if="user && user.group_code == 'AGENT'">
                  <nuxt-link class="nav-link color-nuti" to="/user/referral">
                    <span data-feather="users"></span>
                    Thành viên nhóm
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class=" ml-sm-auto  px-2" v-bind:class="[isMobile ? 'col-12' :  'col-8']">
            <div
              class="alert-message-admin"
              v-if="
                user &&
                  user.account_status == 'pending' &&
                  user.agent_register == 1 &&
                  isMobile
              "
            >
              <div
                class="alert m-0 alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>Thông báo!</strong> Tài khoản đại lý của quý khách đang
                chờ duyệt.
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <nuxt />
          </main>
        </div>
      </div>

      <Footer></Footer>
    </div>
  </div>
  </client-only>
</template>
<script>
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import SearchBar from "~/components/SearchBar";
import FooterMobile from "~/components/FooterMobile";
import HeaderMobile from "~/components/HeaderMobile";
import { mapState, mapActions } from "vuex";
import { isMobile } from "~/plugins/util";
export default {
  computed: mapState({
    user: (state) => state.user.user,
  }),
  middleware: "authenticated",
  components: {
    Footer,
    FooterMobile,
    HeaderMobile,
    Header,
    SearchBar,
  },
  data() {
    return {
      isMobile: null,
      logoHeader: {},
    };
  },
  created() {
    this.getLogoHeader()
    if (!process.server) {
      this.isMobile = isMobile();
    }
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
  }
};
</script>

<style lang="scss" scoped>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/* Sidebar */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.alert-message-admin {
  margin-top: 30px;
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.nuxt-link-exact-active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.account-info-vr {
  padding: 0.5rem 1rem;
  background: #ff842a;
  margin: 3px 0;
  border-radius: 5px;
  color: #fff;
  p {
    margin-bottom: 0;
  }
  img {
    width: 25px;
    vertical-align: middle;
  }
}

/* Content */

[role="main"] {
  padding-top: 10px; /* Space for fixed navbar */
}

/*  Navbar */

.navbar-brand {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
.bg-main {
  background-color: #115ca7 !important;
}
</style>
