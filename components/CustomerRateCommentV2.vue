<template>
  <div class="widget" id="CusTomerRateComment">
    <div class="widget-content">
      <h2 class="widget-title text-center">
        Đánh giá sản phẩm {{ product.name }}
      </h2>
      <div class="row">
        <div class="container">
          <div class="d-flex justify-content-center">
            <star-rating
              v-model="start_comment"
              :star-size="ratingStarSize"
              :show-rating="showRating"
            ></star-rating>
          </div>

          <b-card class="context-rating">
            <div
              class="hashtags-rate"
              v-if="hashtag_rate && hashtag_rate.length > 0"
            >
              <div class="row" v-if="!isMobile">
                <a
                  v-for="(tag, i) in hashtag_rate"
                  :key="i"
                  class="item-tag-rate-unChoose"
                  :id="tag.code"
                  @click="tagRate(tag)"
                >
                  <span class="">
                    {{ tag.value }}
                  </span>
                </a>
              </div>
              <!-- <carousel
                :perPageCustom="[[320, 1]]"
                v-if="isMobile"
                id="hashtagRate"
                :loop="true"
                :paginationEnabled="false"
              >
                <slide
                  v-for="(tag, i) in hashtag_rate"
                  :key="i"
                  style="height: 40px"
                  class="mt-3 text-center"
                >
                  <a
                    class="item-tag-rate-unChoose"
                    @click="tagRate(tag)"
                    :id="tag.code"
                  >
                    <span class="">
                      {{ tag.value }}
                    </span>
                  </a>
                </slide>
              </carousel> -->
              <div class="hashtag-isScroll" v-if="isMobile">
                <div
                  v-for="(tag, i) in hashtag_rate"
                  :key="i"
                  class="item-tag-rate-unChoose"
                  :id="tag.code"
                  @click="tagRate(tag)"
                  style="min-width: max-content !important;"
                >
                  <span class="">
                    {{ tag.value }}
                  </span>
                </div>
              </div>
            </div>
            <b-form-textarea
              id="textarea-default"
              v-model="text_comment"
              placeholder="Nội dung đánh giá"
              rows="3"
            ></b-form-textarea>

            <!-- FileUpload -->
            <main role="main" style="margin: 20px 0">
              <div class="col-md-12">
                <label class="custom-file text-center" for="file">
                  <img
                    src="~/assets/images/icon/cameracamcorder.png"
                    alt=""
                    width="20px"
                  />
                  <span v-if="!isMobile">Thêm hình ảnh hoặc video</span>
                  <input
                    @change="handleSelectedFiles"
                    id="file"
                    multiple
                    name="file"
                    accept="image/video/*"
                    ref="fileInput"
                    type="file"
                  />
                </label>
                <b-button
                  class="float-right"
                  v-if="!phone"
                  variant="secondary"
                  style="position:relative; border-radius: 30px !important"
                  @click="requestPhone()"
                  ><i class="fa fa-paper-plane"></i
                ></b-button>
                <b-button
                  class="float-right"
                  v-if="phone"
                  variant="secondary"
                  style="position:relative; border-radius: 30px !important"
                  @click="createComment()"
                  ><i class="fa fa-paper-plane"></i
                ></b-button>
                <div class="row mt-4">
                  <div
                    v-for="(file, index) in fileList"
                    :key="index"
                    class="col-md-2 col-sm-3 col-4"
                    style="padding: 0 3px !important"
                  >
                    <span class="remove-file" @click="removeFile(index)"
                      ><i class="fa fa-times-circle" style="font-size: 20px"></i
                    ></span>
                    <img
                      v-if="file.mimeType && file.mimeType == 'image/jpeg'"
                      id="imageResult"
                      :src="`${mediaUrl}/file/${file.id}/h300-w300`"
                      alt=""
                      width="100%"
                    />
                    <img
                      v-if="file.mimeType && file.mimeType == 'image/png'"
                      id="imageResult"
                      :src="`${mediaUrl}/file/${file.id}/h300-w300`"
                      alt=""
                      width="100%"
                    />
                    <video
                      muted
                      width="100%"
                      :height="widthVideo + 'px'"
                      name="video"
                      v-if="file.mimeType && file.mimeType == 'video/mp4'"
                      :id="file.id"
                    >
                      <source
                        :src="`${mediaUrl}/file/${file.id}`"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <video
                      muted
                      width="100%"
                      :height="widthVideo + 'px'"
                      name="video"
                      v-if="file.mimeType && file.mimeType == 'video/ogg'"
                      :id="file.id"
                    >
                      <source
                        :src="`${mediaUrl}/file/${file.id}`"
                        type="video/ogg"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </main>
          </b-card>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "~/components/FileUpload";
import LoginForm from "~/components/LoginForm";
import RegisterForm from "~/components/RegisterForm";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { isMobile } from "~/plugins/util";

export default {
  props: {
    product: Object,
    currentIdOrder: String,
  },
  data() {
    return {
      //
      hashtag_rate: [
        // {
        //   id: 1,
        //   code: "clspt",
        //   content: "Chất lượng sản phẩm tuyệt vời",
        //   is_choose: 0,
        // },
        // { id: 2, code: "srn", content: "Sữa rất ngon", is_choose: 0 },
        // {
        //   id: 3,
        //   code: "dgsprdvcc",
        //   content: "Đóng gói sản phẩm rất đẹp và chắc chắn",
        //   is_choose: 0,
        // },
        // {
        //   id: 4,
        //   code: "dvcskhrt",
        //   content: "Dịch vụ chăm sóc khách hàng rất tốt",
        //   is_choose: 0,
        // },
        // { id: 5, code: "rdt", content: "Rất đáng tiền", is_choose: 0 },
        // {
        //   id: 6,
        //   code: "tgghrn",
        //   content: "Thời gian giao hàng rất nhanh",
        //   is_choose: 0,
        // },
      ],
      //
      isMobile: false,
      files: [],
      fileList: [],
      ArrayIdImage: [],
      ImagesRender: null,
      phone: null,
      islogged: null,
      banners: [],
      showRating: false,
      averageStarSize: 50,
      averageStarNumber: 3.1,
      countStarSize: 20,
      countStarSizeByUser: 15,
      ratingStarSize: 70,
      countStar: [
        { count: 25, starNumber: 5 },
        { count: 30, starNumber: 4 },
        { count: 5, starNumber: 3 },
        { count: 10, starNumber: 2 },
        { count: 30, starNumber: 1 },
      ],
      showAlertValidateComment: false,
      showAlertLoginComment: false,
      showAlertValidateCommentAnswer: false,
      showAlertLoginCommentAnswer: false,
      text_comment: "",
      text_comment_1: "",
      arr_content: "",
      start_comment: 0,
      id_images: [],
      imagesRating: [],
      starProduct: {},
      totalRate: {},
      avgStar: {},
      openImageModal: false,
      type: "COMMENT",
      parent_id: null,
      widthOffImgOrVideo: [],
      widthVideo: null,
      item_id_upload: null,
      type_rate: "QUESTION",
      mediaUrl: null,
    };
  },
  components: {
    FileUpload,
    LoginForm,
    ValidationProvider,
    ValidationObserver,
    RegisterForm,
  },
  mounted() {
    if (!process.server) {
      this.mediaUrl = process.env.MEDIA_URL;
      this.isMobile = isMobile();
      window.addEventListener("click", () => {
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
    getHashtagRate() {
      this.$store
        .dispatch("order/getReasonCancel", { params: `?limit=99999` })
        .then((resp) => {
          let arrReasonAndBlacklist = resp.data;
          arrReasonAndBlacklist.filter((item) => {
            if (item.type == "HASHTAGRATE") {
              this.hashtag_rate.push(item);
            }
          });
        });
    },
    handleSelectedFiles() {
      let selectedFiles = this.$refs.fileInput.files;

      for (let i = 0; i < selectedFiles.length; i++) {
        /*Check Already Has Been Selected Or Not ...*/
        let isFileExists = this.files.find(
          (file) =>
            file.type === selectedFiles[i].type &&
            file.name === selectedFiles[i].name &&
            file.size === selectedFiles[i].size &&
            file.lastModified === selectedFiles[i].lastModified
        );
        !isFileExists
          ? this.files.push(selectedFiles[i])
          : this.$toast
              .error("File đã tồn tại. Vui lòng chọn file khác")
              .goAway(1500);
      }

      this.uploadFile();
    },
    removeFile(key) {
      this.fileList.splice(key, 1);
      this.ArrayIdImage.splice(key, 1);
      this.id_images = this.ArrayIdImage.join(",");
      // this.file.splice(key, 1);
      // this.uploadFile();
    },
    uploadFile() {
      this.files.map((file, index) => {
        this.$store.dispatch("app/showLoadingOverlay", true);
        const formdata = new FormData();
        formdata.append("files[" + index + "]", file);
        this.$store
          .dispatch("app/uploadFile", {
            data: formdata,
            param: `${this.mediaUrl}/upload`,
          })
          .then((res) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            this.fileList.push(res);
            this.files = [];
            this.$emit("getFileUpload", this.fileList);
            this.getFileUpload();
            let ArrayIdImage = this.id_images.split(",");
            this.ArrayIdImage = ArrayIdImage;
          })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      });
    },
    getFileUpload() {
      if (this.fileList.length > 0) {
        const arrayFile = [];
        this.fileList.map((item) => {
          this.item_id_upload = item.id;
          arrayFile.push(item);
        });
        this.id_images = arrayFile;
      }
    },

    requestPhone() {
      if (!process.server && !localStorage.getItem("phone")) {
        // chưa nhập sdt lần nào sẽ dc hỏi lại.
        // this.$route.name !== "index"
        this.showModalLogin();
      }
    },

    showModalRegister() {
      this.$store.commit("app/showRegisterModal");
    },

    showModalLogin(type) {
      type === 1
        ? this.$store.commit("user/showLoginModal", 1)
        : this.$store.commit("user/showLoginModal");
    },

    getUserProfile() {
      this.$store
        .dispatch("user/getAccount")
        .then((res) => {
          // save info to local
          localStorage.setItem("userid", res["data"]["id"]);
          localStorage.setItem("group_code", res["data"]["group_code"]);
          // this.getCart();
        })
        .catch((err) => {
          console.log("get profile err:", err);
        });
    },
    createComment() {
      // alert("Tính năng đang phát triển");
      this.showAlertValidateComment = false;
      this.showAlertLoginComment = false;
      let arr_content = this.text_comment;
      this.arr_content = arr_content.replace(/\ /g, ",");
      const hashtag_rates = [];
      this.hashtag_rate.forEach((item) => {
        if (item && item.is_choose == "1") {
          hashtag_rates.push(item);
        }
      });
      const order_detail_id = this.$route.query["order-detail-id"]
        ? this.$route.query["order-detail-id"]
        : "";
      const order_id = this.$route.query["order"]
        ? this.$route.query["order"]
        : "";
      const order_code = this.$route.query["order-code"]
        ? this.$route.query["order-code"]
        : "";
      const formdata = {
        product_id: this.product.id,
        content: this.text_comment,
        arr_content: this.arr_content,
        rate: this.start_comment,
        images: this.id_images,
        parent_id: null,
        type: "RATE",
        hashtag_rates: hashtag_rates,
        order_detail_id: order_detail_id,
        order_id: order_id,
        order_code: order_code,
      };
      const formsent = {
        data: formdata,
        url: "v1/product-comment",
      };
      this.text_title_comment = null;
      this.text_comment = null;
      this.$store
        .dispatch("app/postData_2", formsent)
        .then((resp) => {
          if (resp) {
            // this.formInput = false;
            this.$toast
              .success(
                resp && resp.status
                  ? resp.status
                  : "Bài đánh giá sẽ được duyệt trong thời gian sớm nhất!",
                {
                  position: "top-right",
                }
              )
              .goAway(8000);
            // this.start_comment = null;
            // this.fileList = null;
            this.$router.push({
              path: `/user/order/${this.currentIdOrder}`,
            });
          } else {
            this.$toast
              .error(`Có lỗi xảy ra`, {
                position: "top-right",
              })
              .goAway(4000);
          }
        })
        .catch((err) => {
          this.$toast
            .error(`Lỗi khi bình luận, vui lòng kiểm tra lại!`, {
              position: "top-right",
            })
            .goAway(4000);
        });
    },
    tagRate(tag) {
      if (tag && tag.is_choose == 0) {
        tag.is_choose = 1;
        if (document.getElementById(tag.code)) {
          let itemTag = document.getElementById(tag.code);
          itemTag.classList.remove("item-tag-rate-unChoose");
          itemTag.classList.add("item-tag-rate-Choose");
        }
      } else {
        tag.is_choose = 0;
        if (document.getElementById(tag.code)) {
          let itemTag = document.getElementById(tag.code);
          itemTag.classList.add("item-tag-rate-unChoose");
          itemTag.classList.remove("item-tag-rate-Choose");
        }
      }
    },
  },
  created() {
    this.getHashtagRate();
    if (!process.server) {
      this.islogged = localStorage.getItem("id_token");
      this.phone = localStorage.getItem("phone");
      const session_id = localStorage.getItem("session_id");
      if (session_id) {
        this.$store.commit("app/setSession", session_id);
      } else {
        // ko thấy session_id.
        localStorage.removeItem("phone");
        //localStorage.removeItem("temp_phone");
      }
    }

    if (this.phone) {
      // set online user by phone
      this.socket = this.$nuxtSocket({
        channel: `/?userPhone=${this.phone}`,
      });
      if (this.islogged) {
        this.getUserProfile();
      }
    } else {
      setTimeout(() => {
        // this.requestPhone();
      }, 250);
    }
  },
  // watch: {
  //   $route() {
  //     this.requestPhone();
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.write_a_comment_btn {
  display: inline-block;
  padding: 10px 30px;
  background: rgb(216, 133, 8);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: rgb(216, 6, 6);
  }
}
.average-rating {
  font-size: 3.2rem;
  color: rgb(225, 11, 11);
}
.total-comment {
  color: rgb(155, 155, 155);
}
.user-avata-comment {
  display: inline-block;
  padding: 2px;
  background: #ccc;
  border-radius: 50%;
  line-height: 60px;
  width: 60px;
  height: 60px;
}
.user-comment {
  text-align: center;
  h4 {
    font-size: 0.9rem;
    margin: 10px 0 5px 0;
  }
  p {
    font-size: 0.8rem;
  }
}
.comment-sumary {
  padding: 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.comment-detail {
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 10px 0;
}
.comment-title h3 {
  font-size: 1.2rem;
  color: rgb(34, 34, 34);
}
.context-rating {
  border: 1px solid rgb(170, 170, 170);
  border-radius: 10px;
  margin: 10px 0;
}
#textarea-default {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 0px !important;
}

.close-lightbox {
  position: absolute;
  // margin-bottom: 550px;
  // width: 100%;
  // justify-content: center;
  right: 0;
  top: -8px;
}
// #hashtagRate .VueCarousel-wrapper div {
//   flex-basis: unset !important;
// }
</style>
