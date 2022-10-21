<template>
<div class="">
  <div class="container">
   <div class="main-top-grid row ">
      <div class="left-nav col-lg-3 " v-if="!isMobile">
         <div class="inner-menu">
            <a class="show-menu" href="#">
            <i class="icons icon-menu mr-2 fa fa-bars"></i>DANH MỤC SẢN PHẨM</a>
            <CategoryLeftMenu class="rep-mobile-x992"></CategoryLeftMenu>
         </div>
      </div>
      <div class="col-lg-9" style="">
      </div>
      <div class="right-news col-lg-9">
      <div class="breadcrumb" itemscope="" itemtype="http://schema.org/WebPage">
            <ul itemprop="breadcrumb">
               <li class="breadcrumb-item">
                  <nuxt-link to="/">Trang chủ</nuxt-link>
                </li>
                <li v-if="this.$route.query.cat || this.$route.params.id || this.$route.path == '/search'" class="breadcrumb-item" aria-current="page">
                    <nuxt-link to="/product">Sản phẩm</nuxt-link>
                </li>
                <li
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  {{ this.title }}
                </li>
            </ul>
         </div>
      </div>
   </div>
     </div>

</div>
   
</template>
<script>
import CategoryLeftMenu from "~/components/CategoryLeftMenu";
import { isMobile, isIndex } from "~/plugins/util";
   export default {
     components:{
       CategoryLeftMenu,
     },
       props:['title'],
       data(){
          return {
             isMobile: false,
          }
       },
       created(){
       },
       mounted(){
          if (!process.server) {
      this.isMobile = isMobile();
    }
       }

   }
</script>
<style>
.icons.icon-menu {
        width: 33px;
    font-size: 33px;
    color: #136f43;
    height: 31px;
    margin: -7px -3px 0px -2px;
}
.bars-icon{
  margin: -9px 0px 0px 0px;
      font-size: 29px;
    height: 30px;
    color: #136f43;
    width: 34px;
}
</style>