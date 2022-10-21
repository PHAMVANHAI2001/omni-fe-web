import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

Vue.use(VueFbCustomerChat, {
  page_id: "",
  // page_id: "111138414539018",
  theme_color:"#67b868",
  logged_in_greeting:"Xin chào, Quý khách muốn Siêu Thị hỗ trợ gì không ạ?",
  logged_out_greeting:"Xin chào, Quý khách muốn Siêu Thị hỗ trợ gì không ạ?",
  locale: 'vi_VN', // default 'en_US'
});


