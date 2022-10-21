<template>
  <li
    class="nav-item"
    :active_id="`nav-item-${catIdActive}`"
    v-bind:class="{ show_children: selectedCat['id'] ===  item.id}"
    v-if="item"
  >
    <h4>
      <span @click="selectCat(item)">
        <img v-if="item.image_url" :src="item.image_url + '?w=40&h=40&fit=crop'" />
        <nuxt-link
          :key="$route.fullPath"
          :to="{ path: `/product?c=${item.code}&cat=${item.id}` }"
        >{{ item.name }}</nuxt-link>
      </span>
      <span v-if="item.children && item.children.length" class="arrow-sub">
        <i class="fa fa-angle-down"></i>
        <i class="fa fa-angle-up"></i>
      </span>
    </h4>

    <ul class="sub-nav" v-if="item.children && item.children.length">
      <tree-menu
        v-bind:class="{ show_children: selectedCat['id'] ===  sub.id}"
        :item="sub"
        v-for="sub in item.children"
        :key="sub.id"
      ></tree-menu>
    </ul>
  </li>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      selectedCat: {},
      catIdActive: 0
    };
  },
  name: "tree-menu",
  methods: {
    selectCat(cat) {
      Vue.set(this.selectedCat, "id", cat["id"]);
      $(".mobile .navigation_cat").hide();
      console.log("this.selectedCat:", this.selectedCat);
    }
  }
};
</script>