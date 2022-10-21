<template>
  <div class="container mb-6">
    <div class="col-md-12 col-12">
      <div class="isn-mobile">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">Trang chủ</nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Blog - Bài viết
          </li>
        </ol>
      </div>
      <h1 class="active-cat fs-25">Blog - Bài viết</h1>
      <div class="row mr-1 ml-1">
        <div class="col-md-6 col-sm-12 col-12">
          <b-input-group>
            <b-form-input
              placeholder="Tìm theo tiêu đề"
              class="bd-input-group"
              v-model="form_search.keyword"
              v-on:input="search()"
              @keyup.enter="searchPost"
            >
            </b-form-input>
            <b-input-group-append>
              <b-button
                variant="outline-danger"
                @click="reset"
                class="pl-3 pr-3"
                v-if="form_search.keyword"
                style="border-color: #ccc !important"
                ><i class="fa fa-times"></i
              ></b-button>
            </b-input-group-append>
            <b-input-group-append>
              <b-button variant="secondary" @click="searchPost"
                ><i class="fa fa-search"></i
              ></b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="col-md-6 col-sm-12 col-12 mt-mobile-1">
          <select
            @change="getCatSelected(form_search.cat_id)"
            v-model.trim="form_search.cat_id"
            class="form-control"
            ref="cat_id"
          >
            <option value="">Tất cả chuyên mục</option>
            <option :value="item.id" v-for="item in cats_blog" :key="item.id">{{
              item.title
            }}</option>
          </select>
        </div>
      </div>
      <div v-if="posts">
        <div class="news-category-block">
          <ul class="list-news-cates">
            <ListPostItem
              :post="post"
              v-bind:class="[j == 0 ? 'first-item' : 'nth-item']"
              v-for="(post, j) in posts"
              :key="j"
              data-aos="fade-up"
            ></ListPostItem>
          </ul>
        </div>
      </div>

      <div v-if="!posts">
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
      </div>

      <!-- <b-button
        @click="viewMore()"
        block
        v-if="
          pagination && pagination['current_page'] < pagination['total_pages']
        "
        variant="outline-primary"
        >Xem thêm</b-button
      > -->

      <div v-if="posts && posts.length == 0" class="not-found">
        <h4>Không tìm thấy bài viết nào.</h4>
        <nuxt-link to="/">Về trang chủ...</nuxt-link>
      </div>

      <pagination
        v-show="total_page"
        :total-pages="total_page"
        :total="totalrowcount"
        :per-page="pagesize"
        :current-page="pagenumber"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import ListPostItem from "~/components/ListPostItem";
import Skeleton from "~/components/Skeleton";
import PaginationVue from "~/components/Pagination.vue";
import { isMobile } from "~/plugins/util";
export default {
  name: "category",
  components: { ListPostItem, Skeleton, pagination: PaginationVue },
  // key: (to) => to.fullPath,
  watchQuery: ["page", "title", "catId"],
  data() {
    return {
      title: [
        {
          text: "Trang chủ",
          href: "/",
        },
        {
          text: "Blog",
          active: true,
        },
      ],
      keyword_searched: "",
      isMobile: false,
      posts: null,
      random_posts: [],
      currentPage: 1,
      cat: {},
      totalPosts: 0,
      totalPages: 0,
      pagination: null,
      catId: "",
      title: "Blog",
      page: 1,
      pagenumber: 1,
      pagesize: 21,
      totalrowcount: 0,
      total_page: 0,
      form_search: {
        cat_id: "",
        keyword: "",
      },
      cats_blog: [],
    };
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  // transition(to, from) {
  //   if (!from) {
  //     return "page";
  //   }
  //   return +to.query.page < +from.query.page ? "slide-right" : "slide-left";
  // },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Blog - Bài biết",
        },
      ],
    };
  },
  created() {
    this.getCatPost();
    this.getPost(1);
  },
  methods: {
    // viewMore() {
    //   const page = this.pagination["current_page"] + 1;
    //   this.getPost(page);
    // },
    searchPost() {
      var result = encodeURIComponent(this.form_search.keyword);
      this.$router.push(`?title=${result}`);
    },
    reset() {
      this.form_search.keyword = null;

      // this.$router.push("/");
    },
    search() {
      // this.debounce(this.getPost(), 1000);
    },
    debounce(func, wait) {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), wait);
      };
    },
    getCatPost() {
      this.$axios.get(`/v1/client/category/list`).then((res) => {
        this.cats_blog = res.data;
      });
    },
    searchTitleBlog() {
      this.$router.push(`?title=${this.keyword_searched}`);
    },
    getCatSelected(cat_id) {
      this.$router.push(`?category_id=${cat_id}`);
    },
    getPost(page) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      const title = this.$route.query["title"]
        ? this.$route.query["title"]
        : "";
      const category_id = this.$route.query["category_id"]
        ? this.$route.query["category_id"]
        : "";
      this.$axios
        .get(
          `/v1/client/post/list?title=${title}&category_id=${category_id}&limit=7&sort[created_at]=desc&page=${page}`
        )
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.posts = res.data;
          this.totalrowcount = res.meta.pagination.count;
          this.pagenumber = res.meta.pagination.current_page;
          this.total_page = res.meta.pagination.total_pages;
          this.pagesize = res.meta.pagination.per_page;
        })
        .catch((e) => {
          //console.log("request failed", e);
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    onPageChange(page) {
      this.pagenumber = page;
      this.getPost(page);
      if (!process.server) {
        $("html, body").animate({ scrollTop: 0 }, "");
      }
    },
  },
  watch: {
    "$route.query"(q) {
      this.getPost(1);
    },
  },
};
</script>

<style lang="scss">
.list-news {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.active-cat {
  padding: 10px 5px;
}
</style>
