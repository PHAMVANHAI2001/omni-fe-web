import webpack from "webpack";

export default {
  mode: 'universal',
  head() {
    return {
      title: "Mua Sữa Online, Chính Hãng, Giá Tốt, Freeship tại Nutifood Shop",
      meta:[
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
              'width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no',
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          hid: "og:url",
          name: "og:url",
          property: "og:url",
          content: process.env.baseUrl,
        },
        // {
        //   hid: "og:image",
        //   name: "og:image",
        //   property: "og:image",
        //   content: process.env.baseUrl + require('~/assets/images/nutifood/logo-share-link.png'),
        // },
        { 
          hid: 'og:image:secure_url', 
          name:"og:image:secure_url", 
          property: 'og:image:secure_url', 
          content: process.env.baseUrl,
          },
        { 
          hid: 'og:image:alt', 
          name:"og:image:alt", 
          property: 'og:image:alt', 
          content: process.env.baseUrl 
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Mua Sữa Online, Chính Hãng, Giá Tốt, Freeship tại Nutifood Shop",
        },
        {
          hid: "description",
          name: "description",
          property: "description",
          content: "Sữa Nutifood Chính Hãng, Ưu Đãi Mỗi Ngày, Freeship, Thanh Toán An Toàn, Giao Hàng Tận Nơi, Mua Ngay! Xem Nhanh!",
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content: "Sữa Nutifood Chính Hãng, Ưu Đãi Mỗi Ngày, Freeship, Thanh Toán An Toàn, Giao Hàng Tận Nơi, Mua Ngay! Xem Nhanh!",
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
        },
        {
          name: "google-signin-scope", content: "profile email"
        },
        {
          name: "google-signin-client_id",
          content: "891853366440-kh2rs1d3sppbdee1tbo716cgqa2var9j.apps.googleusercontent.com"
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico?v=sam.one",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200;300;400&display=swap",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Libre Barcode 39",
        },
        {
          rel: "stylesheet",
          href:
            "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        },
      ],
      script: [
        { src: "/js/popper.min.js" },
        // {
        //   src:
        //     "https://cdnjs.cloudflare.com/ajax/libs/alpinejs/2.8.2/alpine.js",
        // },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js",
        },
        {
          src:
            "https://unpkg.com/feather-icons/dist/feather.min.js",
        },
        {
          src:
            "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js",
        },
        {
          src:
            "https://unpkg.com/vue-star-rating/dist/VueStarRating.umd.min.js",
        },
        { src: "/js/bootstrap.min.js" },
        { src: "https://sp.zalo.me/plugins/sdk.js" },
        { src: "https://apis.google.com/js/platform.js" },
        // { src: "~/assets/js/con-cung/product.min.js" , body: true},
        // { src: "~/assets/js/con-cung/core.min.js" , body: true},
        // { src: "/assets/js/con-cung/product.min.js" , body: true},
        // { src: "/assets/js/con-cung/core.min.js" , body: true},
      ],
    }
  },
  server: {
    port: 7795, // default: 3000
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#000" },
  /*
   ** Global CSS
   */
  css: [
    
    "@/assets/fonts/font-awesome/css/font-awesome.min.css",
    "~/assets/styles/styles.scss",
    "~/assets/styles/nutifood/style-nutifood.css",
    "~/assets/styles/nutifood/main-nutifood.css",
    '~/node_modules/vue-inner-image-zoom/lib/vue-inner-image-zoom.css',
    "~/node_modules/aos/dist/aos.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/validator",
    { src: "~/plugins/carousel", ssr: false },
    "@/plugins/filters",
    "~/plugins/vee-validate",
    "~/plugins/directives",
    "~/plugins/share",
    "~/plugins/axios",
    "~/plugins/icon",
    "~/plugins/alert",
    // "~/plugins/fb-login",
    { src: "~/plugins/nestable", ssr: false },
    { src: "~/plugins/main", mode: "client" },
    { src: "~/plugins/vue-carousel", ssr: false },
    { src: "~/plugins/vue-agile", ssr: false },
    { src: '~/plugins/vue-fb-customer-chat.js', ssr: false },
    { src: "~/plugins/start-rating", ssr: false },
    { src: '~/plugins/chat.js', ssr: false },
    { src: "~plugins/ga.js", mode: "client" },

  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
      "@nuxt/typescript-build",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "vue-sweetalert2/nuxt",
    "@nuxtjs/auth",
    "@nuxtjs/toast",
    "cookie-universal-nuxt",
    'nuxt-socket-io',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap'
    // "vue-star-rating",
  ],
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'https://socket-video-call.2nong.vn:8443'
    }]
  },
  toast: {
    position: "top-right",
    register: [
      // Register custom toasts
      {
        name: "need_to_login",
        message: "Bạn cần đăng nhập để sử dụng chức năng này",
        options: {
          type: "info",
        },
      },
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "https://api.nutifoodshop.com",
    proxyHeaders: false,
    credentials: false,
    retry: { retries: 2 },
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    routes: [] // all the dynamic routes
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    /**
     * add external plugins
     */
    vendor: ["jquery", "bootstrap", "ez-plus"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
      }),
    ],
    html: {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    },
    transpile: ["vee-validate/dist/rules"],
    extend(config, ctx) {},
  },
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:7795",
    store_token:
      "3a080de28c50bc0e83c54d841d3b200fdc95b09df70e7ea19b716a1c28910eb8",
  },
  router: {},
  // auth: {
  //   strategies: {
  //     google: {
  //       client_id: '891853366440-kh2rs1d3sppbdee1tbo716cgqa2var9j.apps.googleusercontent.com', //'837211177230-pqudr2c52ovl974svuc4q5le5iltggg3.apps.googleusercontent.com' 
  //       scope: ['openid', 'profile', 'email'],
  //       redirect_uri:'http://localhost:7795/'
  //     },
  //     facebook: {
  //       client_id: "373687113206791",
  //       userinfo_endpoint:"https://graph.facebook.com/v11.0/me?fields=id,name,picture{url}",
  //       scope: ["public_profile", "email"],
  //     }
  //   }
  // },
  pwa: {    icon : false   },
};
