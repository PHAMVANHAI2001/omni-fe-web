<template></template>

<script>
export default {
  middleware: "authenticated",
  head: {
    title: "Quản lý"
  },
  created() {
    if (process.browser) {
      this.islogged = localStorage.getItem("id_token");
    }
    if (this.islogged) {
      this.$router.push("/user/order");
    } else {
    }
  }
};
</script>
<style lang="scss">
</style>
