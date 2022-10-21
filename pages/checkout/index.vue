<template>
  <main role="main" class="container">
    
    <h1>GIỎ HÀNG</h1>

  </main>
  <!-- /.container -->
</template>

<script>
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import Logo from "~/components/Logo.vue";
import { mapMutations } from "vuex";
export default {
  middleware: "authenticated",
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton
  },
  computed: mapState({
    products: state => state.products.all
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      // //console.log("mutation:", mutation);
      // //console.log("state:", state);
      if (mutation.type == "cart/addCartSuccess") {
        this.$swal({
          showCancelButton: true,
          confirmButtonText: "Xem giỏ hàng",
          cancelButtonText: "Tiếp tục"
        }).then(result => {
          if (result.value) {
              this.$router.push({ name: 'checkout' })
          } 
        });
      }
    });
  },
  methods: {
    addToCart(product) {
      // //console.log("add to cart");
      this.$store.dispatch("cart/add", {
        product_id: product.id,
        quantity: product.qty ? product.qty : 1
      });
    }
  },
  head: {
    title: "Giỏ hàng"
  }
};
</script>

<style>
</style>
