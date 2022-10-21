<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="notify-product-in-cart-modal"
      id="notify-product-in-cart-modal"
      :title="`Có ${arrayProduct.length} sản phẩm không thể mua`"
    >
      <button
        type="button"
        class="btn btn-close"
        data-dismiss="modal"
        @click="closemodal"
      >
        <i class="fa fa-close"></i>
      </button>
      <div class="section p-0">
        <div v-for="(item, i) in arrayProduct" :key="i">
          <div class="news-item px-2 w-100 mb-2 pt-0">
            <div class="news-image max-width-70 mr-2 position-relative">
              <nuxt-link :to="{ path: `/product/${item.product_slug}` }">
                <img
                  class="img-fluid box-shadow-none"
                  :src="item.product_thumb + `/h110-w110`"
                  :alt="item.product_name"
                />
              </nuxt-link>
            </div>
            <div class="news-summary w-100">
              <div class="d-flex justify-content-space-between w-100">
                <div class="col-md-12 col-12" style="padding: 0 !important">
                  <h4 class="font-weight-bold color-555 font-12">
                    <nuxt-link
                      class="title-product"
                      :to="{ path: `/product/${item.product_slug}` }"
                    >
                      {{ item.product_name }}
                    </nuxt-link>
                  </h4>
                  <div class="box-price-mobile">
                    <p
                      v-if="item.promoted_price > 0"
                      class="price-product-mobile d-flex flex-row"
                    >
                      <span style="font-weight: 700; color: #006e43"
                        >{{ item.promoted_price_formatted }}/{{
                          item.unit
                        }}</span
                      >
                      &nbsp;
                      <del class="origin-price">{{ item.price_formatted }}</del>
                    </p>
                    <p
                      v-if="item.promoted_price == 0"
                      class="price-product-mobile"
                    >
                      <span class="current-price"
                        >{{ item.price_formatted }}/{{ item.unit }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
              <span
                v-if="item['notify']"
                class=" pull-left mt-2 clear d-flex border-radius text-left notify p-1 " >
                <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                </i>
                <p class="m-0 text-notify">{{ item["notify"] }}</p>
              </span>
              <span v-if="item['notify_limit']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                  <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                  </i>
                  <p class="m-0 text-notify">{{ item["notify_limit"] }}</p>
              </span>
              <span v-if="item['limit_qty_sale']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                </i>
                <p class="m-0 text-notify">Bạn chỉ được mua tối đa {{item['limit_qty_sale']}} sản phẩm</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center">
        <span>Bạn có muốn bỏ qua các sản phẩm trên để tiếp tục mua hàng?</span>
      </div>
      <template #modal-footer="{}">
        <button type="button" class="btn btn-outline-primary mr-2" @click="closemodal">Quay về</button>
        <button type="button" class="btn btn-success float-right" @click="removeItemInCart(arrayProduct)">Tiếp tục</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    arrayProduct: Array,
  },
  data() {
    return {
      errors: [],
      modalShow: false,
      itemId: [],
    };
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "cart/showNotifyProductInCart") {
        setTimeout(() => {
          this.modalShow = true;
        }, 250);
      }
    });
  },
  methods: {
    closemodal() {
      this.modalShow = false;
    },
    removeItemInCart(data) {
      data && data.filter((res) => {
        if(this.itemId && this.itemId.find((x) => x == res['id'])) {

        } else {
          this.itemId.push(res && res['id']);
        }
      })
      this.$store.dispatch('cart/removeProductInCart', 
      {
        cart_detail: this.itemId.join(','), 
        session_id: this.$store.state.app.session_id
      })
      .then((res) => {
        this.modalShow = false;
        this.$emit('removeProductInCart');
      })
      .catch((err) => console.log(err))
    }
  },
};
</script>

<style lang="scss">
.btn-close {
  position: fixed;
  right: -5px;
  top: -5px;
  width: 40px;
  font-size: 20px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* background: #fff; */
  color: #000;
  padding: 0;
}
.btn {
  box-shadow: none !important;
}
.btn:hover {
  color: #fff;
  box-shadow: none !important;
}
</style>
