<template>
  <main role="main">
    <div class="container section">
      <div class="col text-center">
        <h2>Trang này đang được cập nhật</h2>
        <nuxt-link to="/" class="btn btn-danger">Về trang chủ</nuxt-link>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: null
    };
  },
  components: { ValidationProvider, ValidationObserver },
  head: {
    title: "Đang cập nhật dữ liệu"
  },
  methods: {
  
  }
};
</script>

<style lang="scss">
</style>
