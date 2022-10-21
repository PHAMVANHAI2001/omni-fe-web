<template>
  <div class="stsr-shop-info clearfix">
    <div class="row">
      <div class="col-md-12">
        <div class="shop-main-info" v-if="shop">
          <div
            class="stsr-shop-avata"
            v-bind:style="{ backgroundImage: `url(${ shop['avatar'] ? shop['avatar'] : require('@/assets/images/logo.png')})` }"
          ></div>
          <div class="stsr-shop-info-lbl">
            <h4>{{shop['name']}}</h4>
            <p>Chuối liên kết Siêu Thị Siêu Rẻ</p>
            <div class="shop-button">
              <button class="btn btn-info">
                <i class="fa fa-weixin"></i> Chat ngay
              </button>
              <b-button @click="viewShop()" variant="outline-primary">
                <i class="fa fa-home"></i> Xem shop
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    shop: Object
  },
  created() {},
  methods: {
    viewShop() {
      this.$router.push({ path: `/product?shop_id=${this.shop['id']}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-main-info {
  display: flex;
}
.stsr-shop-avata {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin-right: 10px;
  background-position: center center;
  background-size: 69%;
  padding: 11px;
  background-repeat: no-repeat;
}
.stsr-shop-info {
  padding: 10px;
  background: #fff;
  margin: 10px 0;
}
.stsr-shop-info-right {
}
.shop-button {
  display: flex;
}
.stsr-shop-info-lbl {
  h4 {
    font-size: 1rem;
    margin: 5px 0 0 0;
    text-transform: uppercase;
    color: rgb(173, 13, 13);
  }
  p {
    font-size: 0.9rem;
    color: rgb(14, 129, 182);
  }
}
.shop-button {
  button {
    margin: 0 5px 0 0;
  }
}
</style>