<template>
  <main role="main">
    
    <!-- <div v-if="post.title">
      <div class="heading-page-blog">
        <div class="container">
          <div class="page-title">{{post.title}}</div>
        </div>
      </div>
      <div class="section container">
        <div  v-html="post.description"></div>
      </div>
    </div> -->

    <div v-if="post.title">
        <div  v-html="post.description"></div>
    </div>

    <div v-if="!post.description" class="post-skeleton"></div>

  </main>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    };
  },
  components: {},
  created() {
    this.getInformation();
  },
  head() {
    return {
      titleTemplate: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.meta_description
        }
      ]
    };
  },
  methods: {
    getInformation() {
      // sử dung keyword thay vì post_id
      let url = this.$route.fullPath;
      let id = url.substring(url.lastIndexOf("-") + 1);
      if (id) {
        this.$store
          .dispatch("app/fetchData", `/information/${id}`)
          .then(res => {
            if (res) {
              this.post = res;
            }
          })
          .catch(err => {
            // //console.log("err:", err);
          });
      }
    }
  }
};
</script>

<style>
</style>
