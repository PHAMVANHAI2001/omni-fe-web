<template>
  <div style="padding-bottom: 20px;">
    <b-card no-body style="max-width: 20rem; box-shadow: 2px 2px 4px #ececec;">
      <b-card-header>
        <nuxt-link :to="{ path: `/user-rated-gallery/${rated.id}` }">
          <img
            :src="
              `${mediaUrl}/file/${firstImageInArr.id}/h350-w350`
            "
            alt=""
            v-if="firstImageInArr.mimeType == 'image/jpeg'"
          />
          <img
            :src="
              `${mediaUrl}/file/${firstImageInArr.id}/h350-w350`
            "
            alt=""
            v-if="firstImageInArr.mimeType == 'image/png'"
          />
          <video
            muted
            width="100%"
            :height="widthVideo + 'px'"
            name="video"
            v-if="
              firstImageInArr.mimeType &&
                firstImageInArr.mimeType == 'video/mp4'
            "
            :id="firstImageInArr.id"
            autoplay
          >
            <source
              :src="
                `${mediaUrl}/file/${firstImageInArr.id}`
              "
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <video
            muted
            width="100%"
            :height="widthVideo + 'px'"
            name="video"
            v-if="
              firstImageInArr.mimeType &&
                firstImageInArr.mimeType == 'video/ogg'
            "
            :id="firstImageInArr.id"
            autoplay
          >
            <source
              :src="
                `${mediaUrl}/file/${firstImageInArr.id}`
              "
              type="video/ogg"
            />
            Your browser does not support the video tag.
          </video>
        </nuxt-link>
      </b-card-header>
      <b-card-body style="padding: 10px !important; height: 150px;">
        <!-- <b-card-title>Card Title</b-card-title>
        <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title> -->
        <div>
          <a
            v-if="rated.is_like == 0"
            class="ml-3 like float-right"
            id="isLike"
            @click="like(rated.id)"
            name="like"
          >
            ({{ rated.like }}) <i class="fa fa-thumbs-up"></i>
          </a>
          <a
            v-if="rated.is_like == 1"
            class="ml-3 liked float-right"
            id="isLike"
            @click="like(rated.id)"
            name="like"
          >
            ({{ rated.like }}) <i class="fa fa-thumbs-up"></i>
          </a>
          <star-rating
            :rating="rated.rate"
            :star-size="starSize"
            :show-rating="showRating"
            :increment="0.1"
            read-only
          ></star-rating>
          <div class="mt-3" style="height: 55px">
            {{ rated.content | truncate(45) }}
          </div>
        </div>
        <div
          style="justify-content: center; border-bottom: 0.5px solid #ececec;"
        >
          <div>
            <p>
              <b-avatar size="1.5rem" v-if="rated && !rated.avatar"></b-avatar
              ><b-avatar
                v-if="rated && rated.avatar"
                variant="success"
                :src="rated.avatar"
                size="1.5rem"
              ></b-avatar>
              {{ rated.created_by }}
            </p>
          </div>
        </div>
      </b-card-body>
      <b-card-footer>
        <nuxt-link :to="{ path: `/product/${rated.product_slug}` }">
          <div class="row">
            <div class="col-3 p-0">
              <img :src="rated.product_thumbnail + '/h100-w100'" alt="" />
            </div>
            <div class="col-9 pl-1 pr-1">
              <p class="title-product-off-rated">
                {{ rated.product_name | truncate(23) }}
              </p>
              <h6 class="price-product-off-rated">
                {{ rated.product_price_formatted }}
              </h6>
            </div>
          </div>
        </nuxt-link>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    rated: Object,
  },
  data() {
    return {
      starSize: 15,
      showRating: false,
      arrImagesRate: [],
      firstImageInArr: {},
      ratedGallery: [],
      widthOffImgOrVideo: [],
      widthVideo: null,
      mediaUrl: null,
    };
  },
  created() {
    this.getImageRate();
  },
  mounted() {
    if (!process.server) {
      this.mediaUrl = process.env.MEDIA_URL;
      window.addEventListener("click", () => {
        this.getImageRate();
        if (document.getElementsByName("video")) {
          let videos = document.getElementsByName("video");
          videos.forEach((video) => {
            let widthOffImgOrVideo = video.offsetWidth;
            this.widthOffImgOrVideo.push(widthOffImgOrVideo);
          });
          this.widthVideo = this.widthOffImgOrVideo[0];
        }
      });
      window.addEventListener("touchend", () => {
        this.getImageRate();
        if (document.getElementsByName("video")) {
          let videos = document.getElementsByName("video");
          videos.forEach((video) => {
            let widthOffImgOrVideo = video.offsetWidth;
            this.widthOffImgOrVideo.push(widthOffImgOrVideo);
          });
          this.widthVideo = this.widthOffImgOrVideo[0];
        }
      });
      window.addEventListener("scroll", () => {
        this.getImageRate();
        if (document.getElementsByName("video")) {
          let videos = document.getElementsByName("video");
          videos.forEach((video) => {
            let widthOffImgOrVideo = video.offsetWidth;
            this.widthOffImgOrVideo.push(widthOffImgOrVideo);
          });
          this.widthVideo = this.widthOffImgOrVideo[0];
        }
      });
      window.addEventListener("mousemove", () => {
        this.getImageRate();
        if (document.getElementsByName("video")) {
          let videos = document.getElementsByName("video");
          videos.forEach((video) => {
            let widthOffImgOrVideo = video.offsetWidth;
            this.widthOffImgOrVideo.push(widthOffImgOrVideo);
          });
          this.widthVideo = this.widthOffImgOrVideo[0];
        }
      });
    }
  },
  methods: {
    like(id) {
      this.$store
        .dispatch("products/likeComment", id)
        .then((res) => {
          const code = this.$route.query["code"]
            ? this.$route.query["code"]
            : "";
          const product_name = this.$route.query["slug"]
            ? this.$route.query["slug"]
            : "";
          const is_active = this.$route.query["is_active"]
            ? this.$route.query["is_active"]
            : "";
          this.$store
            .dispatch("products/getRatedGallery", {
              params: `?code=${code}&product_name=${product_name}&is_active=${is_active}&limit=20&sort[id]=desc`,
            })
            .then((resp) => {
              let ArrRated = resp.data.data;
              let filterArr = ArrRated.filter((item) => {
                if (item && item.is_active == 1 && item.type == "RATE") {
                  this.ratedGallery.push(item);
                }
                this.ratedGallery.forEach((item) => {
                  if (item.id == id) {
                    this.rated = item;
                  }
                });
              });
            })
            .catch((err) => {
              // //console.log("get banner error:", err);
            });
        })
        .catch((err) => {
          // console.log("err:", err);
          this.$toast
            .error(`Có lỗi xảy ra`, {
              position: "top-right",
            })
            .goAway(4000);
        });
    },
    getImageRate() {
      if (
        this.rated &&
        this.rated["images"] &&
        this.rated["images"].length > 0
      ) {
        let arrImagesRate = this.rated["images"];
        // arrImagesRate.forEach((item) => {
        //   this.firstImageInArr = item;
        // });
        this.firstImageInArr = arrImagesRate[0];
      } else {
        this.firstImageInArr = { id: "0mnP5PHQd", mimeType: "image/jpeg" }; // đây là hình ảnh thay thế khi không có ảnh đánh giá
      }
    },
  },
};
</script>
