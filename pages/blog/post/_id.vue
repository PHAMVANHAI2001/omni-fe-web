<template>
  <div v-if="post">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="isn-mobile">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Trang chủ</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/blog">Blog - Bài viết</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ post.title }}
              </li>
            </ol>
          </div>
          <div
            class="heading-page-blog"
            :class="['post-id-' + post.id]"
          >
            <div v-if="post" class="page-title">{{ post.title }}</div>
          </div>
          <div class="container section">
            <div class="row">
              <div class="col-12">
                <div
                  v-if="post"
                  class="post-content"
                  v-html="post.content"
                ></div>

                <div class="social-sharing">
                  <h4>Chia sẽ bài viết</h4>
                  <social-sharing
                    :url="href"
                    :title="post.title"
                    :description="post.short_desc"
                    hashtags
                    inline-template
                  >
                    <div class="share-buttons">
                      <network class="share-facebook" network="facebook">
                        <i class="fa fa-facebook"></i>
                      </network>
                      <network network="skype">
                        <i class="fa fa-skype"></i>
                      </network>
                      <network network="twitter">
                        <i class="fa fa-twitter"></i>
                      </network>
                      <network network="linkedin">
                        <i class="fa fa-linkedin"></i>
                      </network>
                    </div>
                  </social-sharing>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!post.content" class="post-skeleton"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      href: "",
      post: null,
      random_posts: [],
      postCategories: null,
    };
  },
  head() {
    const post = this.post;
    return post
      ? {
          title: post.title,
          meta: [
            {
              hid: "description",
              name: "description",
              property: "description",
              content: post.short_desc,
            },
            {
              hid: "og:url",
              name: "og:url",
              property: "og:url",
              content: process.env.baseUrl + 'blog/post/' + post.slug,
            },
            {
               hid: "og:title",
              name: "og:title",
              property: "og:title",
              content: post.title,
            },
            {
              hid: "og:description",
              name: "og:description",
              property: "og:description",
              content: post.short_desc,
            },
            {
              hid: "og:image",
              name: "og:image",
              property: "og:image",
              content: post.thumbnail_url
            },
            { 
              hid: 'og:image:width', 
              name:"og:image:width", 
              property: 'og:image:width', 
              content: '1200' 
            },
            { 
              hid: 'og:image:height', 
              name:"og:image:height", 
              property: 'og:image:height', 
              content: '630' 
            }
          ],
        }
      : {};
  },
  async asyncData({ store, params }) {},
  methods: {
    isValidPost() {
      return (
        Object.entries(this.post).length !== 0 &&
        this.post.constructor === Object
      );
    },
    getPostCategories() {
      const PostCategoryIDsString = this.post["post_categories"].join(",");
      this.$axios
        .get(
          `/v0/blog/posts?post_type=post&post_category_id=${PostCategoryIDsString}&limit=10&page=1`
        )
        .then((res) => {
          this.postCategories = res.data.data;
        })
        .catch((e) => {
          //console.log("request failed", e);
          // error({ statusCode: 404, message: e });
        });
    },
    getDetail() {
      this.$store
        .dispatch("app/fetchData", `/v0/blog/post/${this.$route.params["id"]}`)
        .then((data) => {
          this.post = data["data"];
        })
        .catch((err) => {
          //console.log("get post error:", err);
        });
    },
  },
  created() {
    //console.log("post detail created: ", this.post);
    // this.getPostCategories();
    if (!process.server) {
      this.href = window.location.href;
    }
    this.getDetail();
  },
};
</script>

<style lang="scss">
.heading-page-blog {
  padding: 20px 0px;
  position: relative;
  font-size: 1.4rem;
}
.post-content {
  padding: 10px;
  background: #fff;
  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  ul {
    margin: 10px;
    padding: 10px;
  }
}
.news-content {
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: auto;
  }
}
.ntc-video-container {
  position: relative;
  padding-top: 56.25%;
  embed,
  iframe,
  object {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
  }
}
.crayon-syntax {
  width: 100%;
  overflow: hidden;
  .crayon-main {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
    .crayon-nums {
      display: none;
    }
  }
}
.social-sharing {
  margin: 10px 0;
  h4 {
    font-size: 13px;
  }
}
</style>
