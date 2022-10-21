import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1f67bd16 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _7cab6419 = () => interopDefault(import('..\\pages\\category\\index.vue' /* webpackChunkName: "pages/category/index" */))
const _6c0f56d1 = () => interopDefault(import('..\\pages\\checkout\\index.vue' /* webpackChunkName: "pages/checkout/index" */))
const _4513231d = () => interopDefault(import('..\\pages\\comming-soon.vue' /* webpackChunkName: "pages/comming-soon" */))
const _252c88a5 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _414a17d7 = () => interopDefault(import('..\\pages\\deny.vue' /* webpackChunkName: "pages/deny" */))
const _455b2100 = () => interopDefault(import('..\\pages\\forgot-pass.vue' /* webpackChunkName: "pages/forgot-pass" */))
const _06d037b2 = () => interopDefault(import('..\\pages\\landing-page\\index.vue' /* webpackChunkName: "pages/landing-page/index" */))
const _442c1819 = () => interopDefault(import('..\\pages\\location-distributors\\index.vue' /* webpackChunkName: "pages/location-distributors/index" */))
const _0eb41eae = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5e33c80e = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _8cf621cc = () => interopDefault(import('..\\pages\\promotion\\index.vue' /* webpackChunkName: "pages/promotion/index" */))
const _68d9d48e = () => interopDefault(import('..\\pages\\quanly\\index.vue' /* webpackChunkName: "pages/quanly/index" */))
const _4fa1f79e = () => interopDefault(import('..\\pages\\question\\index.vue' /* webpackChunkName: "pages/question/index" */))
const _eacf8206 = () => interopDefault(import('..\\pages\\ranking-bestseller\\index.vue' /* webpackChunkName: "pages/ranking-bestseller/index" */))
const _402c1434 = () => interopDefault(import('..\\pages\\register-agent.vue' /* webpackChunkName: "pages/register-agent" */))
const _dcaa089a = () => interopDefault(import('..\\pages\\register-agent-nuti.vue' /* webpackChunkName: "pages/register-agent-nuti" */))
const _1e1db5a4 = () => interopDefault(import('..\\pages\\register-success.vue' /* webpackChunkName: "pages/register-success" */))
const _eaf40e98 = () => interopDefault(import('..\\pages\\sale-off.vue' /* webpackChunkName: "pages/sale-off" */))
const _d0c6a2ee = () => interopDefault(import('..\\pages\\scan-order.vue' /* webpackChunkName: "pages/scan-order" */))
const _0841d0b3 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _e0a16490 = () => interopDefault(import('..\\pages\\supend-account.vue' /* webpackChunkName: "pages/supend-account" */))
const _67ad3ca8 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _2f9b19b0 = () => interopDefault(import('..\\pages\\user-rated-gallery\\index.vue' /* webpackChunkName: "pages/user-rated-gallery/index" */))
const _a8626bc4 = () => interopDefault(import('..\\pages\\about\\history-of-formation-and-development.vue' /* webpackChunkName: "pages/about/history-of-formation-and-development" */))
const _7f179403 = () => interopDefault(import('..\\pages\\about\\vision-and-mission.vue' /* webpackChunkName: "pages/about/vision-and-mission" */))
const _1fa26a5c = () => interopDefault(import('..\\pages\\category\\catchildren.vue' /* webpackChunkName: "pages/category/catchildren" */))
const _37567f1e = () => interopDefault(import('..\\pages\\checkout\\cart.vue' /* webpackChunkName: "pages/checkout/cart" */))
const _1ecaecd0 = () => interopDefault(import('..\\pages\\checkout\\checkout-payment.vue' /* webpackChunkName: "pages/checkout/checkout-payment" */))
const _ae062002 = () => interopDefault(import('..\\pages\\checkout\\confirm.vue' /* webpackChunkName: "pages/checkout/confirm" */))
const _06e37068 = () => interopDefault(import('..\\pages\\checkout\\coupons.vue' /* webpackChunkName: "pages/checkout/coupons" */))
const _91c285d0 = () => interopDefault(import('..\\pages\\checkout\\paymentModal.vue' /* webpackChunkName: "pages/checkout/paymentModal" */))
const _3701b102 = () => interopDefault(import('..\\pages\\checkout\\shipping.vue' /* webpackChunkName: "pages/checkout/shipping" */))
const _177430c2 = () => interopDefault(import('..\\pages\\checkout\\shipping-unit.vue' /* webpackChunkName: "pages/checkout/shipping-unit" */))
const _75df021d = () => interopDefault(import('..\\pages\\checkout\\shipping.bak.vue' /* webpackChunkName: "pages/checkout/shipping.bak" */))
const _4b5d26b6 = () => interopDefault(import('..\\pages\\checkout\\transactionProcessor.vue' /* webpackChunkName: "pages/checkout/transactionProcessor" */))
const _2124110f = () => interopDefault(import('..\\pages\\checkout\\vpBankPayment.vue' /* webpackChunkName: "pages/checkout/vpBankPayment" */))
const _27812af3 = () => interopDefault(import('..\\pages\\product\\flashsale.vue' /* webpackChunkName: "pages/product/flashsale" */))
const _45137273 = () => interopDefault(import('..\\pages\\user-rated-gallery\\rating\\index.vue' /* webpackChunkName: "pages/user-rated-gallery/rating/index" */))
const _29c6f574 = () => interopDefault(import('..\\pages\\user\\address\\index.vue' /* webpackChunkName: "pages/user/address/index" */))
const _a8a687fe = () => interopDefault(import('..\\pages\\user\\commission.vue' /* webpackChunkName: "pages/user/commission" */))
const _0b888dda = () => interopDefault(import('..\\pages\\user\\form.vue' /* webpackChunkName: "pages/user/form" */))
const _2d4f0c4a = () => interopDefault(import('..\\pages\\user\\locations\\index.vue' /* webpackChunkName: "pages/user/locations/index" */))
const _bf2405ac = () => interopDefault(import('..\\pages\\user\\menu-mobile.vue' /* webpackChunkName: "pages/user/menu-mobile" */))
const _36394081 = () => interopDefault(import('..\\pages\\user\\notification.vue' /* webpackChunkName: "pages/user/notification" */))
const _f3fa154c = () => interopDefault(import('..\\pages\\user\\order\\index.vue' /* webpackChunkName: "pages/user/order/index" */))
const _b6e8d832 = () => interopDefault(import('..\\pages\\user\\order-status.vue' /* webpackChunkName: "pages/user/order-status" */))
const _23d3d070 = () => interopDefault(import('..\\pages\\user\\policy.vue' /* webpackChunkName: "pages/user/policy" */))
const _068af3f0 = () => interopDefault(import('..\\pages\\user\\products-purchased.vue' /* webpackChunkName: "pages/user/products-purchased" */))
const _60cfb683 = () => interopDefault(import('..\\pages\\user\\profile.vue' /* webpackChunkName: "pages/user/profile" */))
const _224d0d9a = () => interopDefault(import('..\\pages\\user\\referral.vue' /* webpackChunkName: "pages/user/referral" */))
const _d7030432 = () => interopDefault(import('..\\pages\\user\\shipper\\index.vue' /* webpackChunkName: "pages/user/shipper/index" */))
const _14e4082a = () => interopDefault(import('..\\pages\\user\\transactions.vue' /* webpackChunkName: "pages/user/transactions" */))
const _59f66fbb = () => interopDefault(import('..\\pages\\user\\update-profile.vue' /* webpackChunkName: "pages/user/update-profile" */))
const _61355f5b = () => interopDefault(import('..\\pages\\user\\wishlist.vue' /* webpackChunkName: "pages/user/wishlist" */))
const _cd50415e = () => interopDefault(import('..\\pages\\user\\order\\check-order.vue' /* webpackChunkName: "pages/user/order/check-order" */))
const _12cf4e86 = () => interopDefault(import('..\\pages\\blog\\post\\_id.vue' /* webpackChunkName: "pages/blog/post/_id" */))
const _566d8838 = () => interopDefault(import('..\\pages\\checkout\\repayment\\_id.vue' /* webpackChunkName: "pages/checkout/repayment/_id" */))
const _3bb1759b = () => interopDefault(import('..\\pages\\user-rated-gallery\\rating\\_id.vue' /* webpackChunkName: "pages/user-rated-gallery/rating/_id" */))
const _ce30cd9c = () => interopDefault(import('..\\pages\\user\\locations\\_id.vue' /* webpackChunkName: "pages/user/locations/_id" */))
const _16baf37c = () => interopDefault(import('..\\pages\\user\\order\\_id.vue' /* webpackChunkName: "pages/user/order/_id" */))
const _f4de63e2 = () => interopDefault(import('..\\pages\\user\\shipper\\_id.vue' /* webpackChunkName: "pages/user/shipper/_id" */))
const _dbb96ac0 = () => interopDefault(import('..\\pages\\category\\_cat.vue' /* webpackChunkName: "pages/category/_cat" */))
const _9b2d71aa = () => interopDefault(import('..\\pages\\information\\_code.vue' /* webpackChunkName: "pages/information/_code" */))
const _2ae31e4e = () => interopDefault(import('..\\pages\\information\\_id.vue' /* webpackChunkName: "pages/information/_id" */))
const _afe702cc = () => interopDefault(import('..\\pages\\landing-page\\_id.vue' /* webpackChunkName: "pages/landing-page/_id" */))
const _bedbb1c0 = () => interopDefault(import('..\\pages\\page\\_slug.vue' /* webpackChunkName: "pages/page/_slug" */))
const _109075f6 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))
const _1fd7f002 = () => interopDefault(import('..\\pages\\promotion\\_id.vue' /* webpackChunkName: "pages/promotion/_id" */))
const _113b424e = () => interopDefault(import('..\\pages\\question\\_id.vue' /* webpackChunkName: "pages/question/_id" */))
const _5183c818 = () => interopDefault(import('..\\pages\\user-rated-gallery\\_id.vue' /* webpackChunkName: "pages/user-rated-gallery/_id" */))
const _450c7b97 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog",
    component: _1f67bd16,
    name: "blog"
  }, {
    path: "/category",
    component: _7cab6419,
    name: "category"
  }, {
    path: "/checkout",
    component: _6c0f56d1,
    name: "checkout"
  }, {
    path: "/comming-soon",
    component: _4513231d,
    name: "comming-soon"
  }, {
    path: "/contact",
    component: _252c88a5,
    name: "contact"
  }, {
    path: "/deny",
    component: _414a17d7,
    name: "deny"
  }, {
    path: "/forgot-pass",
    component: _455b2100,
    name: "forgot-pass"
  }, {
    path: "/landing-page",
    component: _06d037b2,
    name: "landing-page"
  }, {
    path: "/location-distributors",
    component: _442c1819,
    name: "location-distributors"
  }, {
    path: "/login",
    component: _0eb41eae,
    name: "login"
  }, {
    path: "/product",
    component: _5e33c80e,
    name: "product"
  }, {
    path: "/promotion",
    component: _8cf621cc,
    name: "promotion"
  }, {
    path: "/quanly",
    component: _68d9d48e,
    name: "quanly"
  }, {
    path: "/question",
    component: _4fa1f79e,
    name: "question"
  }, {
    path: "/ranking-bestseller",
    component: _eacf8206,
    name: "ranking-bestseller"
  }, {
    path: "/register-agent",
    component: _402c1434,
    name: "register-agent"
  }, {
    path: "/register-agent-nuti",
    component: _dcaa089a,
    name: "register-agent-nuti"
  }, {
    path: "/register-success",
    component: _1e1db5a4,
    name: "register-success"
  }, {
    path: "/sale-off",
    component: _eaf40e98,
    name: "sale-off"
  }, {
    path: "/scan-order",
    component: _d0c6a2ee,
    name: "scan-order"
  }, {
    path: "/search",
    component: _0841d0b3,
    name: "search"
  }, {
    path: "/supend-account",
    component: _e0a16490,
    name: "supend-account"
  }, {
    path: "/user",
    component: _67ad3ca8,
    name: "user"
  }, {
    path: "/user-rated-gallery",
    component: _2f9b19b0,
    name: "user-rated-gallery"
  }, {
    path: "/about/history-of-formation-and-development",
    component: _a8626bc4,
    name: "about-history-of-formation-and-development"
  }, {
    path: "/about/vision-and-mission",
    component: _7f179403,
    name: "about-vision-and-mission"
  }, {
    path: "/category/catchildren",
    component: _1fa26a5c,
    name: "category-catchildren"
  }, {
    path: "/checkout/cart",
    component: _37567f1e,
    name: "checkout-cart"
  }, {
    path: "/checkout/checkout-payment",
    component: _1ecaecd0,
    name: "checkout-checkout-payment"
  }, {
    path: "/checkout/confirm",
    component: _ae062002,
    name: "checkout-confirm"
  }, {
    path: "/checkout/coupons",
    component: _06e37068,
    name: "checkout-coupons"
  }, {
    path: "/checkout/paymentModal",
    component: _91c285d0,
    name: "checkout-paymentModal"
  }, {
    path: "/checkout/shipping",
    component: _3701b102,
    name: "checkout-shipping"
  }, {
    path: "/checkout/shipping-unit",
    component: _177430c2,
    name: "checkout-shipping-unit"
  }, {
    path: "/checkout/shipping.bak",
    component: _75df021d,
    name: "checkout-shipping.bak"
  }, {
    path: "/checkout/transactionProcessor",
    component: _4b5d26b6,
    name: "checkout-transactionProcessor"
  }, {
    path: "/checkout/vpBankPayment",
    component: _2124110f,
    name: "checkout-vpBankPayment"
  }, {
    path: "/product/flashsale",
    component: _27812af3,
    name: "product-flashsale"
  }, {
    path: "/user-rated-gallery/rating",
    component: _45137273,
    name: "user-rated-gallery-rating"
  }, {
    path: "/user/address",
    component: _29c6f574,
    name: "user-address"
  }, {
    path: "/user/commission",
    component: _a8a687fe,
    name: "user-commission"
  }, {
    path: "/user/form",
    component: _0b888dda,
    name: "user-form"
  }, {
    path: "/user/locations",
    component: _2d4f0c4a,
    name: "user-locations"
  }, {
    path: "/user/menu-mobile",
    component: _bf2405ac,
    name: "user-menu-mobile"
  }, {
    path: "/user/notification",
    component: _36394081,
    name: "user-notification"
  }, {
    path: "/user/order",
    component: _f3fa154c,
    name: "user-order"
  }, {
    path: "/user/order-status",
    component: _b6e8d832,
    name: "user-order-status"
  }, {
    path: "/user/policy",
    component: _23d3d070,
    name: "user-policy"
  }, {
    path: "/user/products-purchased",
    component: _068af3f0,
    name: "user-products-purchased"
  }, {
    path: "/user/profile",
    component: _60cfb683,
    name: "user-profile"
  }, {
    path: "/user/referral",
    component: _224d0d9a,
    name: "user-referral"
  }, {
    path: "/user/shipper",
    component: _d7030432,
    name: "user-shipper"
  }, {
    path: "/user/transactions",
    component: _14e4082a,
    name: "user-transactions"
  }, {
    path: "/user/update-profile",
    component: _59f66fbb,
    name: "user-update-profile"
  }, {
    path: "/user/wishlist",
    component: _61355f5b,
    name: "user-wishlist"
  }, {
    path: "/user/order/check-order",
    component: _cd50415e,
    name: "user-order-check-order"
  }, {
    path: "/blog/post/:id?",
    component: _12cf4e86,
    name: "blog-post-id"
  }, {
    path: "/checkout/repayment/:id?",
    component: _566d8838,
    name: "checkout-repayment-id"
  }, {
    path: "/user-rated-gallery/rating/:id?",
    component: _3bb1759b,
    name: "user-rated-gallery-rating-id"
  }, {
    path: "/user/locations/:id",
    component: _ce30cd9c,
    name: "user-locations-id"
  }, {
    path: "/user/order/:id",
    component: _16baf37c,
    name: "user-order-id"
  }, {
    path: "/user/shipper/:id",
    component: _f4de63e2,
    name: "user-shipper-id"
  }, {
    path: "/category/:cat",
    component: _dbb96ac0,
    name: "category-cat"
  }, {
    path: "/information/:code?",
    component: _9b2d71aa,
    name: "information-code"
  }, {
    path: "/information/:id?",
    component: _2ae31e4e,
    name: "information-id"
  }, {
    path: "/landing-page/:id?",
    component: _afe702cc,
    name: "landing-page-id"
  }, {
    path: "/page/:slug?",
    component: _bedbb1c0,
    name: "page-slug"
  }, {
    path: "/product/:id",
    component: _109075f6,
    name: "product-id"
  }, {
    path: "/promotion/:id",
    component: _1fd7f002,
    name: "promotion-id"
  }, {
    path: "/question/:id",
    component: _113b424e,
    name: "question-id"
  }, {
    path: "/user-rated-gallery/:id",
    component: _5183c818,
    name: "user-rated-gallery-id"
  }, {
    path: "/",
    component: _450c7b97,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
