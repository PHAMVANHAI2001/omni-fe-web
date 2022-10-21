<template>
  <main role="main">
    <h1 class="cp-page-title">Sản phẩm đã mua</h1>
    <div class="block-section">
      <div class="user-dashboard-menu">
        <div class="table-responsive-md">
          <table class="table" v-if="wishlist.length">
            <thead>
              <tr>
                <th style="width:100px">Hình ảnh</th>
                <th style="width:300px">Sản phẩm</th>
              </tr>
            </thead>
            <tbody v-if="wishlist != null">
              <tr v-for="(item, i) in wishlist" :key="i">
                <td>
                  <nuxt-link :to="{ path: `/product/${item.slug}` }">
                    <img
                      class="product-img"
                      style="width:80px"
                      :src="item.thumbnail ? item.thumbnail : item.thumbnail"
                      :alt="item.name"
                    />
                  </nuxt-link>
                </td>
                <td>
                  <nuxt-link :to="{ path: `/product/${item.slug}` }">{{
                    item.name
                  }}</nuxt-link>
                  <em class="text-danger" v-if="item.is_deleted == 1"
                    >Sản phẩm này không còn kinh doanh.</em
                  >
                  <br />
                  Đã mua: {{ item.qty }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!wishlist.length" class="alert alert-warning" role="alert">
          Bạn chưa mua sản phẩm nào.
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserMenuPanel from "~/components/UserMenuPanel";
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "Sản phẩm đã mua",
  },
  components: {
    UserMenuPanel,
  },
  data() {
    return {
      wishlist: [],
    };
  },
  created() {
    this.getWishlist();
  },
  methods: {
    deleteWishlist(item) {
      this.$store
        .dispatch("app/delete", {
          param: "v1/product-favorite/" + item.id,
          data: "",
        })
        .then((res) => {
          this.$toast.success("Xóa thành công").goAway(1500);
          this.getWishlist();
        })
        .catch((err) => {});
    },
    getWishlist() {
      this.$store
        .dispatch("user/fetchData", "v1/products-purchased")
        .then((data) => {
          // //console.log(data)
          this.wishlist = data.data;
        });
    },
  },
};
</script>
<style></style>
