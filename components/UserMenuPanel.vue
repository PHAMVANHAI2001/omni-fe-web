<template>
  <ul class="j-menu hidden-sm clearfix">
    <li class="menu-item">
      <nuxt-link to="/user">
        <span class="links-text">
          <span class="fa fa-dashboard"></span>Tổng quan
        </span>
      </nuxt-link>
    </li>

    <li class="menu-item">
      <nuxt-link to="/user/order">
        <span class="links-text">
          <span class="fa fa-cart-plus"></span>Đơn hàng
        </span>
      </nuxt-link>
    </li>

    <li class="menu-item">
      <nuxt-link to="/user/wishlist">
        <span class="links-text">
          <span class="fa fa-heart-o"></span>Yêu thích
        </span>
      </nuxt-link>
    </li>

    <li class="menu-item">
      <nuxt-link to="/blog">
        <span class="links-text">
          <span class="fa fa-info-circle"></span> Tin tức
        </span>
      </nuxt-link>
    </li>

    <li class="menu-item">
      <nuxt-link to="/user/referral">
        <span class="links-text">
          <span class="fa fa-calendar-check-o"></span> Danh sách giới thiệu
        </span>
      </nuxt-link>
    </li>

    <li class="menu-item">
      <nuxt-link to="/user/profile">
        <span class="links-text">
          <span class="fa fa-user"></span>Tài khoản
        </span>
      </nuxt-link>
    </li>

    <li class="menu-item">
      <nuxt-link to="/user/notification">
        <span class="links-text">
          <span class="fa fa-cart-plus"></span>Thông báo
        </span>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: mapState({
    user: state => state.user.user
  })
};
</script>