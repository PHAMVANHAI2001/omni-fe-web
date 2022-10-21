<template>
  <div>
    <b-modal
      centered
      v-model="PopUpAdsModal"
      ref="popup-ads"
      hide-footer
      hide-header
      content-class="modal-content-ads"
      cancel-only
      size="md"
      false
    >
      <div id="popup-ads">
        <div class="grid-popup">
          <div class="text-right close-btn-popup" v-if="popUpForUse">
            <a @click="closemodal(popUpForUse.id)">
              <i class="fa fa-times-circle"></i>
            </a>
          </div>
          <div class="w-100">
            <nuxt-link
              v-if="popUpForUse.type == 'CATEGORY'"
              :to="{ path: `/product?cat=${popUpForUse.category_id}` }"
            >
              <img
                :src="popUpForUse.image_url"
                :alt="popUpForUse.category_name"
                class="item-img"
              />
            </nuxt-link>
            <a
              v-if="popUpForUse.type == 'LINK-CUSTOM'"
              :href="popUpForUse.router"
              target="_blank"
            >
              <img
                :src="popUpForUse.image_url"
                :alt="popUpForUse.router"
                class="item-img"
              />
            </a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      PopUpAdsModal: false,
      // isDisable: true,
      // imagesAds: [],
      itemFist: null,
      fist: false,
      lengthBanner: null,
      length2: false,
      length3: false,
      popUpAds: [],
      popUpForUse: {},
    };
  },
  components: {},
  created() {
    this.$store
      .dispatch("app/fetchData", "/v1/client/banners/popup-ads")
      .then((resp) => {
        if (resp.data) {
          this.popUpAds = resp.data.details.reverse();
          if (process.browser) {
            this.popUpAds.forEach((item) => {
              if (
                !sessionStorage.getItem(
                  `MzxvweSvdln3jkv2zvjndisvsjnskdjASvc2${item.id}`,
                  true
                )
              ) {
                if (this.popUpAds) {
                  this.showPopup();
                  this.popUpForUse = item;
                }
                if (!this.popUpForUse || this.popUpForUse != item) {
                  sessionStorage.setItem(
                    `MzxvweSvdln3jkv2zvjndisvsjnskdjASvc2`,
                    true
                  );
                  this.PopUpAdsModal = false;
                }
              }
            });
            if (
              sessionStorage.getItem(
                `MzxvweSvdln3jkv2zvjndisvsjnskdjASvc2`,
                true
              )
            ) {
              this.PopUpAdsModal = false;
            }
          }
        }
      })
      .catch((err) => {
        // console.log("get banner error:", err);
      });
  },
  mounted() {},
  methods: {
    showPopup() {
      this.PopUpAdsModal = true;
    },
    closemodal(id) {
      this.$refs["popup-ads"].hide();
      this.PopUpAdsModal = false;
      sessionStorage.setItem(`MzxvweSvdln3jkv2zvjndisvsjnskdjASvc2${id}`, true);
    },
  },
};
</script>

<style lang="scss">
.forget-pass {
  text-align: center;
  display: block;
  margin-top: 20px;
  cursor: pointer;
  color: #c92332;
}
.modal-header .close {
  // display: none;
}
.login-note {
  text-align: justify;
  padding: 0 20px 20px 0;
  font-size: 0.9rem;
}
.login-note-column {
  background: #f9f9f9;
  padding: 20px 10px;
  border-radius: 10px;
}
.modal-content-ads {
  background: none !important;
  border: none !important;
}
</style>
