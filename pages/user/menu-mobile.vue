<template>
  <ul class="m-menu clearfix">
    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user/profile" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-user"></span>Thông tin tài khoản
        </span> -->
        <i class="fa fa-user"></i> Thông tin tài khoản
      </nuxt-link>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-dashboard"></span>Thống kê nhanh
        </span> -->
        <i class="fa fa-dashboard"></i> Thống kê nhanh
      </nuxt-link>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user/order" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-cart-plus"></span>Đơn hàng của tôi
        </span> -->
        <i class="fa fa-cart-plus"></i> Đơn hàng của tôi
      </nuxt-link>
    </li>
    <li class="menu-item" v-if="user && user.role_code == 'SHIPPER'">
      <nuxt-link to="/user/shipper" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-cart-plus"></span>Đơn hàng của tôi
        </span> -->
        <i class="fa fa-cart-plus"></i> Đơn hàng của tôi
      </nuxt-link>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user/locations" class="color-nuti">
        <!-- <span class="links-text">
          <span data-feather="map-pin"></span>Sổ địa chỉ
        </span> -->
        <i class="fa fa-map-marker"></i> Sổ địa chỉ
      </nuxt-link>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user/wishlist" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-heart-o"></span>Yêu thích
        </span> -->
        <i class="fa fa-heart-o"></i> Yêu thích
      </nuxt-link>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user/products-purchased" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-heart-o"></span>Sản phẩm đã mua
        </span> -->
        <i class="fa fa-history"></i> Sản phẩm đã mua
      </nuxt-link>
    </li>

    <!--    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">-->
    <!--      <nuxt-link to="/blog">-->
    <!--        <span class="links-text">-->
    <!--          <span class="fa fa-info-circle"></span> Tin tức-->
    <!--        </span>-->
    <!--      </nuxt-link>-->
    <!--    </li>-->

    <li
      class="menu-item"
      v-if="user && user.group_code == 'AGENT' && user.role_code !== 'SHIPPER'"
    >
      <nuxt-link to="/user/referral" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-calendar-check-o"></span> Nhóm thành viên
        </span> -->
        <i class="fa fa-calendar-check-o"></i> Nhóm thành viên
      </nuxt-link>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <div id="accordion">
          <span class="card-header" data-toggle="collapse" href="#id" style="
          display: block;
          border-bottom: 1px solid #dad3d3;
          padding: 20px !important;
          font-size: 1.3rem;
          color: #006e43;">
            <i class="collapsed  fa fa-question-circle">&emsp;</i>  Hỗ trợ
          </span>
          <div id="id" class="collapse " data-parent="#accordion"> 
            <div class="card questiontab" id="myData">
              <div class="card-header" data-toggle="collapse" href="#idcauhoi" style="
              display: block;
              border-bottom: 1px solid #dad3d3;
              padding: 15px;
              font-size: 18px
              ">
                <li class="question " id="content" style="color: #006e43;">&emsp;NutifoodShop</li>
                <div id="idcauhoi" class="collapse noidung" data-parent="#idcauhoi">
                  <div class="card-body answer">
                    <div id="idcauhoi" class="collapse">
                    <li v-for="(item, i) in footerSystem" :key="i">
                      <nuxt-link
                      style="
                      color: #006e43;
                      padding: 10px;
                      font-size: 15px;
                      "
                        :to="{ path: `/information/${aboutSystem}?key=${item.key}` }"
                        >-  {{ item.name }}</nuxt-link
                      >
                    </li>
                  </div>
                  </div>
                </div>
              </div>
              <div class="card-header" data-toggle="collapse" href="#idcauhoi2" style="
              display: block;
              border-bottom: 1px solid #dad3d3;
              padding: 15px;
              font-size: 18px;
              color: #006e43;">
                <li class="question" id="content">&emsp;Chăm Sóc Khách hàng</li>
                <div id="idcauhoi2" class="collapse noidung" data-parent="#idcauhoi2">
                  <div class="card-body answer">
                    <div id="idcauhoi2" class="collapse">
                    <li v-for="(item, i) in footerSupport" :key="i">
                      <nuxt-link
                      style="
                      color: #006e43 ;
                      padding: 10px;
                      font-size: 15px;
                      "
                        :to="{ path: `/information/${aboutSupport}?key=${item.key}` }"
                        >-  {{ item.name }}</nuxt-link
                      >
                    </li>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </li>

    <li class="menu-item" v-if="user && user.role_code !== 'SHIPPER'">
      <nuxt-link to="/user/notification" class="color-nuti">
        <!-- <span class="links-text">
          <span class="fa fa-cart-plus"></span>Thông báo
        </span> -->
        <i class="fa fa-bell"></i> Thông báo
      </nuxt-link>
    </li>
    <li class="menu-item" v-if="user">
      <a class="btn btn-danger text-white" @click="logout()">Đăng Xuất</a>
    </li>
    <li class="none-desktop p-4"></li>
  </ul>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      footerSystem: [],
      footerSupport: [],
      aboutSystem: null,
      aboutSupport: null,
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  middleware: "authenticated",
  created() {
    this.getSettingSystem();
    this.getSettingSupport();

  },
  methods: {
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
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/");
        setTimeout(() => {
              location.reload();
            });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.m-menu {
  li {
    a {
      display: block;
      border-bottom: 1px solid #dad3d3;
      padding: 20px;
      font-size: 1.3rem;
      .fa {
        width: 35px;
      }
    }
  }
}    
</style>
