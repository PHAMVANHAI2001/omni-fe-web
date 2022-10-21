<template>
  <li class="clearfix" v-if="post.is_show && post.is_show == 1">
    <!-- <div class="wrap-thumb"> -->
    <nuxt-link :to="{ path: '/blog/post/' + post.slug }">
      <b-card no-body class="overflow-hidden" v-if="!isMobile">
        <b-row no-gutters>
          <b-col md="4" class="box-img-blog text-center">
            <b-card-img
              :src="post.thumbnail_url"
              alt="post.thumbnail_url"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body class="h-100 pt-1 pb-0 border-card-blog">
              <b-card-text>
                <em class="float-right"><p>{{post.created_at}}</p></em>
                <b class="mb-0">Chuyên mục: {{post.category_title}}</b>
                <h4 class="title-blog">{{ post.title }}</h4>
                <!-- <h6>
                  Thuộc danh mục:
                  <span class="category-title-blog">{{
                    post.category_title
                  }}</span>
                </h6> -->
                <p class="mb-0">{{ post.short_description | truncate(300) }}</p>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-card
        :img-src="post.thumbnail_url"
        img-alt="Card image"
        img-top
        v-if="isMobile"
        style="border: 0.5px solid #006e43;"
      >
        <b-card-text>
          <h5 class="title-blog">{{ post.title }}</h5>
          <h6>
            Thuộc danh mục:
            <span class="category-title-blog">{{ post.category_title }}</span>
          </h6>
          <em><p class="created-at-blog">{{post.created_at}}</p></em>
          <p class="short-desc-blog">
            {{ post.short_description | truncate(300) }}
          </p>
        </b-card-text>
      </b-card>
    </nuxt-link>
    <!-- </div> -->
    <!-- <div class="post-body">
      <h4 class="title">
        <nuxt-link :to="{ path: '/blog/post/' + post.id }">{{
          post.title
        }}</nuxt-link>
      </h4>
      <p class="short_desc">{{ post.short_desc }}</p>
    </div> -->
  </li>
</template>

<script>
import { isMobile } from "~/plugins/util";
export default {
  name: "ListPostItem",
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  created(){
    this.post.created_at = this.post.created_at.replace(/\-/g,"/")
  }
};
</script>

<style scoped lang="scss">
.wrap-thumb {
  width: 25%;
}
.post-body {
  width: 79%;
  float: right;
}
.short_desc {
  font-size: 0.85rem;
}
</style>
