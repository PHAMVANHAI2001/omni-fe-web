<template>
  <div class="site-builder-panel">
    <div class="content-panel-builder">
      <div class="panel panel-default">
        <div class="panel-heading">Widget Tĩnh</div>
        <div class="panel-body">
          <Container behaviour="copy" group-name="1" :get-child-payload="getChildPayload1">
            <Draggable v-for="item in items1" :key="item.id">
              <div class="draggable-item">{{item.data}}</div>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("sitebuilder/getSiteStyle").then(resp => {
      const styles = this.toCss(resp);
      // console.log("site style:", styles);
      this.$store.commit("sitebuilder/saveStyle", styles);
    });
  },
  methods: {
    toCss(cssJSON) {
      // console.log("sss");

      var cssString = "";

      // cssJSON would be the JavaScript object representing your CSS.
      for (var objKey in cssJSON) {
        // objKey is the name of the key in the JavaScript object.
        // In this case, it's also the CSS selector.
        cssString += objKey + " {";

        var cssProperties = cssJSON[objKey];
        for (var cssPropertyName in cssProperties) {
          cssString +=
            cssPropertyName + ": " + cssProperties[cssPropertyName] + ";";
        }

        cssString += "}";
      }

      return cssString;
    }
  }
};
</script>