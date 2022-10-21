<template>
  <span v-if="item">
    <slot v-if="item.router">
      <b-nav-item :class="styleClass" :to="item.router">{{item.title}}</b-nav-item>
    </slot>
  </span>
</template>
<script>
export default {
  props: {
    item: null,
    lang_id: null,
    styleClass: null
  }
};
</script>