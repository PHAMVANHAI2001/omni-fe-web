<template>
  <carousel
    id="carousel-no-animation"
    :perPageCustom="[
      [320, 1],
      [768, 1],
      [1024, 1],
    ]"
    :autoplay="false"
    :autoplayTimeout="5000"
    :loop="true"
    :paginationEnabled="false"
  >
    <slide v-for="(item, i) in bannersSlider" :key="i">
      <div
        class="scale-slide"
        v-bind:style="{
          width: widthPx + 'px',
          height: heightPx + 'px',
        }"
      >
        <a
          v-if="item.type == 'LINK-CUSTOM'"
          :href="item.router"
          target="_blank"
        >
          <img
            :src="item.image_url"
            alt=""
            v-bind:style="{
              width: widthPx + 'px',
            }"
          />
        </a>
        <nuxt-link
          v-if="item.type == 'CATEGORY'"
          :to="{ path: `/category?cat=${item.category_id}` }"
        >
          <img
            :src="item.image_url"
            alt=""
            v-bind:style="{
              width: widthPx + 'px',
              height: heightPx + 'px',
            }"
          />
        </nuxt-link>
      </div>
    </slide>
  </carousel>
</template>

<script>
export default {
  props: {
    bannersSlider: Array,
  },
  data(){
    return{
      
    }
  }
};
</script>
