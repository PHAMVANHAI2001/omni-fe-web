<template>
  <main role="main">
    <h2 class="cp-page-title">Sản phẩm yêu thích</h2>
    <div class="block-section">
      <div class="user-dashboard-menu">
        <div class="table-responsive-md">
          <table class="table">
            <thead>
              <tr>
                <th style="width:100px">Hình ảnh</th>
                <th style="width:300px">Sản phẩm</th>
                <th style="width:50px"></th>
              </tr>
            </thead>
            <tbody v-if="wishlist && wishlist.length">
              <tr v-for="(item, i) in wishlist" :key="i">
                <td>
                  <img
                    class="product-img"
                    style="width:80px"
                    :src="item.thumbnail ? item.thumbnail : item.thumbnail"
                    :alt="item.name"
                  />
                </td>
                <td>
                  {{item.name}}
                </td>
                <td>
                  <a class="btn btn-danger btn-sm" title="Xoá" @click="deleteWishlist(item)">
                    <i class="fa fa-close"></i> Xoá
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="!wishlist"
          class="alert alert-warning"
          role="alert"
        >Bạn chưa có sản phẩm yêu thích nào</div>
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
    title: "Sản phẩm yêu thích"
  },
  components: {
    UserMenuPanel
  },
  data() {
    return {
      wishlist: []
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
          data: ""
        })
        .then(res => {
          this.$toast.success("Xóa thành công").goAway(1500);
          this.getWishlist();
        })
        .catch(err => {});
    },
    getWishlist() {
      this.$store
        .dispatch("user/fetchData", "v1/product-favorites")
        .then(data => {
          // //console.log(data)
          this.wishlist = data.data;
        });
    }
  }
};
</script>
<style>
</style>
