<template>
  <main role="main" v-if="post">
      <div class="section container">
          <div class="container">
          <div v-if="post" v-html="content"></div>
          </div>
        </div>
  </main>
  <!-- /.container -->
</template>

<script>
export default {
  data() {
    return {
      content:null, 
      post: null,
      layout: null
    };
  },
  methods: {
    getContent(){
       // get Banner
    const _code = this.$route.params["code"];
    if (_code) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/${_code}`)
        .then(res => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (res.data.data) {
            const key = this.$route.query["key"];
            this.post = res.data.data.map(item => {
              if( item.key == key) {
                  this.content =  item.value
              } 
            });
            //  this.$store.commit("app/setCurrentPost", res.data);
          }
        })
        .catch(err => {
          // //console.log("err:", err);
        });
    }
    }
  },
  created() {
   this.getContent();
  },
  watch: {
    "$route.query"(q) {
      this.getContent();
    }
  }
};
</script>
<style>
</style>