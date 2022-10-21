import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_bootstrapvue_bf0ec008 from 'nuxt_plugin_bootstrapvue_bf0ec008' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_googleanalytics_dabdb18e from 'nuxt_plugin_googleanalytics_dabdb18e' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_nuxtsocketio_faab4196 from 'nuxt_plugin_nuxtsocketio_faab4196' // Source: .\\nuxt-socket-io.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_1d557716 from 'nuxt_plugin_cookieuniversalnuxt_1d557716' // Source: .\\cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_toast_02012b7c from 'nuxt_plugin_toast_02012b7c' // Source: .\\toast.js (mode: 'client')
import nuxt_plugin_vuesweetalert2_4f86a424 from 'nuxt_plugin_vuesweetalert2_4f86a424' // Source: .\\vue-sweetalert2.js (mode: 'client')
import nuxt_plugin_workbox_f23656ae from 'nuxt_plugin_workbox_f23656ae' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_7ce91029 from 'nuxt_plugin_metaplugin_7ce91029' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_axios_35d0decd from 'nuxt_plugin_axios_35d0decd' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_validator_5e67c7de from 'nuxt_plugin_validator_5e67c7de' // Source: ..\\plugins\\validator (mode: 'all')
import nuxt_plugin_carousel_1978b254 from 'nuxt_plugin_carousel_1978b254' // Source: ..\\plugins\\carousel (mode: 'client')
import nuxt_plugin_filters_2abc1387 from 'nuxt_plugin_filters_2abc1387' // Source: ..\\plugins\\filters (mode: 'all')
import nuxt_plugin_veevalidate_6e5ad03a from 'nuxt_plugin_veevalidate_6e5ad03a' // Source: ..\\plugins\\vee-validate (mode: 'all')
import nuxt_plugin_directives_d0867c0c from 'nuxt_plugin_directives_d0867c0c' // Source: ..\\plugins\\directives (mode: 'all')
import nuxt_plugin_share_337a23ae from 'nuxt_plugin_share_337a23ae' // Source: ..\\plugins\\share (mode: 'all')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ..\\plugins\\axios (mode: 'all')
import nuxt_plugin_icon_6a81acef from 'nuxt_plugin_icon_6a81acef' // Source: ..\\plugins\\icon (mode: 'all')
import nuxt_plugin_alert_3571b0b4 from 'nuxt_plugin_alert_3571b0b4' // Source: ..\\plugins\\alert (mode: 'all')
import nuxt_plugin_nestable_3f7b7928 from 'nuxt_plugin_nestable_3f7b7928' // Source: ..\\plugins\\nestable (mode: 'client')
import nuxt_plugin_main_6a83762f from 'nuxt_plugin_main_6a83762f' // Source: ..\\plugins\\main (mode: 'client')
import nuxt_plugin_vuecarousel_6c010c3d from 'nuxt_plugin_vuecarousel_6c010c3d' // Source: ..\\plugins\\vue-carousel (mode: 'client')
import nuxt_plugin_vueagile_726cdbff from 'nuxt_plugin_vueagile_726cdbff' // Source: ..\\plugins\\vue-agile (mode: 'client')
import nuxt_plugin_vuefbcustomerchat_0b9d4ea4 from 'nuxt_plugin_vuefbcustomerchat_0b9d4ea4' // Source: ..\\plugins\\vue-fb-customer-chat.js (mode: 'client')
import nuxt_plugin_startrating_0bbd9fde from 'nuxt_plugin_startrating_0bbd9fde' // Source: ..\\plugins\\start-rating (mode: 'client')
import nuxt_plugin_chat_12dc7b69 from 'nuxt_plugin_chat_12dc7b69' // Source: ..\\plugins\\chat.js (mode: 'client')
import nuxt_plugin_ga_fb0a2534 from 'nuxt_plugin_ga_fb0a2534' // Source: ..\\plugins\\ga.js (mode: 'client')
import nuxt_plugin_plugin_4abfc0bc from 'nuxt_plugin_plugin_4abfc0bc' // Source: .\\auth\\plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: function() {
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

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_bootstrapvue_bf0ec008 === 'function') {
    await nuxt_plugin_bootstrapvue_bf0ec008(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_dabdb18e === 'function') {
    await nuxt_plugin_googleanalytics_dabdb18e(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtsocketio_faab4196 === 'function') {
    await nuxt_plugin_nuxtsocketio_faab4196(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_1d557716 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_1d557716(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_02012b7c === 'function') {
    await nuxt_plugin_toast_02012b7c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuesweetalert2_4f86a424 === 'function') {
    await nuxt_plugin_vuesweetalert2_4f86a424(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_f23656ae === 'function') {
    await nuxt_plugin_workbox_f23656ae(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_7ce91029 === 'function') {
    await nuxt_plugin_metaplugin_7ce91029(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_35d0decd === 'function') {
    await nuxt_plugin_axios_35d0decd(app.context, inject)
  }

  if (typeof nuxt_plugin_validator_5e67c7de === 'function') {
    await nuxt_plugin_validator_5e67c7de(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_carousel_1978b254 === 'function') {
    await nuxt_plugin_carousel_1978b254(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_2abc1387 === 'function') {
    await nuxt_plugin_filters_2abc1387(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_6e5ad03a === 'function') {
    await nuxt_plugin_veevalidate_6e5ad03a(app.context, inject)
  }

  if (typeof nuxt_plugin_directives_d0867c0c === 'function') {
    await nuxt_plugin_directives_d0867c0c(app.context, inject)
  }

  if (typeof nuxt_plugin_share_337a23ae === 'function') {
    await nuxt_plugin_share_337a23ae(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (typeof nuxt_plugin_icon_6a81acef === 'function') {
    await nuxt_plugin_icon_6a81acef(app.context, inject)
  }

  if (typeof nuxt_plugin_alert_3571b0b4 === 'function') {
    await nuxt_plugin_alert_3571b0b4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nestable_3f7b7928 === 'function') {
    await nuxt_plugin_nestable_3f7b7928(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_main_6a83762f === 'function') {
    await nuxt_plugin_main_6a83762f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuecarousel_6c010c3d === 'function') {
    await nuxt_plugin_vuecarousel_6c010c3d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueagile_726cdbff === 'function') {
    await nuxt_plugin_vueagile_726cdbff(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuefbcustomerchat_0b9d4ea4 === 'function') {
    await nuxt_plugin_vuefbcustomerchat_0b9d4ea4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_startrating_0bbd9fde === 'function') {
    await nuxt_plugin_startrating_0bbd9fde(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_chat_12dc7b69 === 'function') {
    await nuxt_plugin_chat_12dc7b69(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_ga_fb0a2534 === 'function') {
    await nuxt_plugin_ga_fb0a2534(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_4abfc0bc === 'function') {
    await nuxt_plugin_plugin_4abfc0bc(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
