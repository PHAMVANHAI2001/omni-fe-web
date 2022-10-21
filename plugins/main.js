import Vue from 'vue'
import GoogleAuth from '~/plugins/google-login'
const gauthOption = {
  clientId: '891853366440-kh2rs1d3sppbdee1tbo716cgqa2var9j.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false