<template>
  <main role="main" v-if="post">
    <h1>DANG BAO TRI H1</h1>
    <!-- <slot v-if="post.category_name === 'Page - No Heading'">
        <div class="container">
          <div v-if="post" v-html="post.content"></div>
        </div>
    </slot>
    <div v-if="post.category_name === 'Page'"> 
      <div class="heading-page-blog">
        <div class="container" v-if="post">
          <div class="page-title">{{post.name}}</div>
        </div>
      </div>
      <div class="container section">
        <div v-if="post" v-html="post.content"></div>
      </div> 
    </div>-->
  </main>
  <!-- /.container -->
</template>

<script>
export default {
  data() {
    return {
      post: null,
      layout: null
    };
  },
  // head: {
  //   title:
  //     "Nội Thất Vincty | Chuyên sản xuất, xuất-nhập khẩu và phân phối hàng tiêu dùng"
  // },
  methods: {},
  created() {
    // get Banner
    const _slug = this.$route.params["slug"];
    // //console.log("page slug:", _slug);
    if (_slug) {
      this.$store
        .dispatch("app/fetchDataNoHeader", "/post&keyword=" + _slug)
        .then(res => {
          if (res.data) {
            this.post = res.data;
            //  this.$store.commit("app/setCurrentPost", res.data);
          }
        })
        .catch(err => {
          // //console.log("err:", err);
        });
    }
  }
};
</script>
<style>
</style>