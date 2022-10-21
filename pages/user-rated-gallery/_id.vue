<template>
  <main role="main" class="clearfix main-page">
    <div class="container" style="margin-bottom: 10rem;" id="_Rated">
      <br />
      <div class="col-lg-12 col-md-12 col-12">
        <div class="isn-mobile">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link to="/">Trang chủ</nuxt-link>
            </li>
            <li class="breadcrumb-item">
              <nuxt-link to="/user-rated-gallery">Thư viện đánh giá</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <span
                ><strong style="color: #000">{{
                  currentRated.product_name
                }}</strong>
                bởi
                <strong style="color: #000">{{
                  currentRated.created_by
                }}</strong></span
              >
            </li>
          </ol>
        </div>
        <nuxt-link
          :to="{ path: `/product/${currentRated.product_slug}` }"
          class="card card-product-rated"
        >
          <div class="row row-in">
            <div class="col-3 p-0">
              <img :src="currentRated.product_thumbnail" alt="" />
            </div>
            <div class="col-9">
              <p class="title-product-off-rated-detail">
                {{ currentRated.product_name }}
              </p>
              <h4 class="go-to-product float-right">
                <i class="fa fa-chevron-circle-right"></i>
              </h4>
              <h6 class="price-product-off-rated-detail">
                {{ currentRated.product_price_formatted }}
              </h6>
            </div>
          </div>
        </nuxt-link>
        <div class="row mt-4">
          <div class="col-md-3 col-12">
            <div
              class="d-flex"
              v-bind:class="[!isMobile ? 'justify-content-between' : '']"
            >
              <b-avatar
                size="4rem"
                v-if="currentRated && !currentRated.avatar"
              ></b-avatar>
              <b-avatar
                v-if="currentRated && currentRated.avatar"
                variant="success"
                size="4rem"
                :src="currentRated.avatar"
              ></b-avatar>
              <div v-bind:class="[isMobile ? 'ml-3' : '']">
                <h5 class="name-rater mb-0">
                  <b>{{ currentRated.created_by }}</b>
                </h5>
                <p class="mb-0">
                  <span class="color-929292"
                    ><i class="fa fa-comment"></i> Đã viết:</span
                  >
                  {{
                    currentRated.count_rate ? currentRated.count_rate : 0
                  }}
                  bài đánh giá
                </p>
                <p class="mb-0">
                  <span class="color-929292"
                    ><i class="fa fa-thumbs-up"></i> Đã nhận:</span
                  >
                  {{
                    currentRated.count_like ? currentRated.count_like : 0
                  }}
                  lượt cảm ơn
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-12">
            <span>
              <star-rating
                :rating="currentRated.rate"
                :star-size="starSize"
                :show-rating="showRating"
                :increment="0.1"
                read-only
              ></star-rating>
            </span>
            <span
              ><em class="fs-12">{{ currentRated.created_at }}</em>
              <a
                v-if="currentRated.is_like == 0"
                class="like ml-3"
                id="isLike"
                @click="like(currentRated.id)"
                name="like"
              >
                {{ currentRated.like }} <i class="fa fa-thumbs-up"></i>
              </a>
              <a
                v-if="currentRated.is_like == 1"
                class="liked ml-3"
                id="isLike"
                @click="like(currentRated.id)"
                name="like"
              >
                {{ currentRated.like }} <i class="fa fa-thumbs-up"></i> </a
            ></span>

            <p>{{ currentRated.content }}</p>
          </div>
          <!-- <div class="col-2 text-center avatar-rater"></div> -->
          <!-- <div class="col-10">
            <span class="float-right">
              <star-rating
                :rating="currentRated.rate"
                :star-size="starSize"
                :show-rating="showRating"
                :increment="0.1"
                read-only
              ></star-rating>
            </span>

            <a
              v-if="currentRated.is_like == 0"
              class="ml-3 like float-right"
              id="isLike"
              @click="like(currentRated.id)"
              name="like"
            >
              {{ currentRated.like }} <i class="fa fa-thumbs-up"></i>
            </a>
            <a
              v-if="currentRated.is_like == 1"
              class="ml-3 liked float-right"
              id="isLike"
              @click="like(currentRated.id)"
              name="like"
            >
              {{ currentRated.like }} <i class="fa fa-thumbs-up"></i>
            </a>
          </div> -->
        </div>
        <!-- <div class="row mt-3">
          <p style="padding: 0 5px !important">{{ currentRated.content }}</p>
        </div> -->
        <div class="row">
          <div
            class="hashtags-rate"
            v-if="
              currentRated['hashtag_rates'] &&
                currentRated['hashtag_rates'].length > 0 &&
                currentRated.type == 'RATE'
            "
          >
            <div class="row ml-1 mr-1">
              <span
                v-for="(tag_rated, t) in currentRated['hashtag_rates']"
                :key="t"
              >
                <div class="item-tag-rate-Choosed" :id="tag_rated.code">
                  <span class="">
                    {{ tag_rated.value }}
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="card card-reply"
            v-if="currentRated.childs && currentRated.childs.length > 0"
          >
            <p>
              <img
                src="~/assets/images/nutifood/logo-ntf.png"
                alt=""
                width="100px"
              />
              <i class="fa fa-check-circle color-nuti"></i>
            </p>
            <p
              class="content-nuti-reply"
              v-for="(item, i) in currentRated.childs"
              :key="i"
            >
              {{ item.content }}
            </p>
          </div>
        </div>
        <div class="row mt-3" style="border-bottom: 1px solid #ececec">
          <div class="row mb-3 ml-2 mr-2">
            <a
              class="col-3 pl-pr-0"
              v-for="(item, i) in currentRated.images"
              :key="i"
              data-toggle="modal"
              data-target="#lightbox"
              @click="lightBox(item)"
            >
              <img
                v-if="item.mimeType && item.mimeType == 'image/jpeg'"
                :src="`${mediaUrl}/file/${item.id}/h450-w450`"
                alt=""
                style="width: 99% !important"
                name="videos"
              />
              <video
                muted
                width="100%"
                :height="widthVideo + 'px !important'"
                name="videos"
                v-if="item.mimeType && item.mimeType == 'video/mp4'"
                :id="item.id"
                autoplay
                controls
              >
                <source :src="`${mediaUrl}/file/${item.id}`" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video
                muted
                width="100%"
                :height="widthVideo + 'px !important'"
                name="videos"
                v-if="item.mimeType && item.mimeType == 'video/ogg'"
                :id="item.id"
                autoplay
                controls
              >
                <source :src="`${mediaUrl}/file/${item.id}`" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </a>
            <div
              id="lightbox"
              class="modal fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div
                  class="modal-content"
                  style="background: none !important; border: none !important"
                >
                  <button
                    type="button"
                    class="close-lightbox"
                    data-dismiss="modal"
                    aria-label="Close"
                    style="z-index: 999"
                  >
                    <div
                      class="float-right"
                      style="font-size: 22px; color: #000; font-weight: bold; background: #fff; border-radius: 50%; width: 30px; height: 30px;"
                    >
                      <i class="fa fa-times-circle"></i>
                    </div>
                  </button>
                  <div class="modal-body text-center">
                    <img
                      v-if="
                        ImagesRender &&
                          ImagesRender.mimeType &&
                          ImagesRender.mimeType == 'image/jpeg'
                      "
                      :src="`${mediaUrl}/file/` + ImagesRender.id"
                    />
                    <img
                      v-if="
                        ImagesRender &&
                          ImagesRender.mimeType &&
                          ImagesRender.mimeType == 'image/png'
                      "
                      :src="`${mediaUrl}/file/` + ImagesRender.id"
                    />
                    <video
                      width="100%"
                      muted
                      controls
                      v-if="
                        ImagesRender &&
                          ImagesRender.mimeType &&
                          ImagesRender.mimeType == 'video/mp4'
                      "
                      :id="ImagesRender.id"
                    >
                      <source
                        :src="`${mediaUrl}/file/${ImagesRender.id}`"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <video
                      width="100%"
                      controls
                      muted
                      v-if="
                        ImagesRender &&
                          ImagesRender.mimeType &&
                          ImagesRender.mimeType == 'video/ogg'
                      "
                      :id="ImagesRender.id"
                    >
                      <source
                        :src="`${mediaUrl}/file/${ImagesRender.id}`"
                        type="video/ogg"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row mt-3"
          v-if="currentRated && currentRated.comments"
          id="commentOfRated"
        >
          <h6>Bình luận ({{ currentRated.comments.length }})</h6>
          <div
            v-if="
              !currentRated ||
                (currentRated &&
                  currentRated.comments &&
                  currentRated.comments.length == 0)
            "
            class="text-center"
            style="width: 100%"
          >
            Chưa có bình luận nào cho bài đánh giá này <br />
            Hãy bình luận nếu bạn quan tâm
          </div>
          <div class="w-100" v-if="!isMobile">
            <b-form-textarea
              id="textarea-default"
              v-model="text_comment_1"
              placeholder="Nội dung đánh giá"
              rows="3"
            ></b-form-textarea>
            <div class="container mt-2">
              <b-button
                class="float-right"
                v-if="!phone"
                variant="secondary"
                style="position:relative; border-radius: 30px !important"
                @click="requestPhone()"
                >Gửi</b-button
              >
              <b-button
                class="float-right"
                v-if="phone"
                variant="secondary"
                style="position:relative; border-radius: 30px !important"
                @click="createComment()"
                >Gửi</b-button
              >
            </div>
          </div>
          <div v-if="isMobile">
            <div class="fixed-form-reply-for" id="replyFor">
              <span class="float-right" @click="cancelRepFor"
                ><i class="fa fa-times"></i
              ></span>
              <h6 style="margin-top: 5px">Trả lời {{ replyFor }}:</h6>
            </div>
            <div class="fixed-form-cmt" id="formComment">
              <b-input-group class="mt-3">
                <b-form-input
                  v-model="text_comment"
                  placeholder="Bình luận..."
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    variant="secondary"
                    v-if="!phone"
                    @click="requestPhone()"
                    >Gửi</b-button
                  >
                  <b-button
                    variant="secondary"
                    v-if="phone"
                    @click="createComment()"
                    >Gửi</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div
            class="content-cmt-off-rated mt-4"
            v-if="
              currentRated &&
                currentRated.comments &&
                currentRated.comments.length > 0
            "
          >
            <b-card v-for="(cmt, i) in currentRated.comments" :key="i">
              <b-media>
                <template #aside>
                  <b-avatar></b-avatar>
                </template>
                <a
                  v-if="cmt.is_like == 0"
                  class="ml-3 like float-right"
                  id="isLike"
                  @click="like(cmt.id)"
                  name="like"
                >
                  {{ cmt.like }} <i class="fa fa-thumbs-up"></i>
                </a>
                <a
                  v-if="cmt.is_like == 1"
                  class="ml-3 liked float-right"
                  id="isLike"
                  @click="like(cmt.id)"
                  name="like"
                >
                  {{ cmt.like }} <i class="fa fa-thumbs-up"></i>
                </a>
                <h5 class="mt-0 mb-1 cmt-created-by">{{ cmt.created_by }}</h5>
                <p class="content-cmt">
                  {{ cmt.content }}
                </p>
                <div>
                  <p class="cmt-created-at mb-2">{{ cmt.created_at }}</p>
                  <a
                    class="reply"
                    @click="replyComment(cmt)"
                    v-b-toggle="`collapse-${cmt.id}`"
                    >Trả lời</a
                  >
                </div>
                <div class="mb-3" v-if="!isMobile">
                  <b-collapse
                    :id="`collapse-${cmt.id}`"
                    accordion="my-accordion"
                  >
                    <b-input-group class="mt-3">
                      <b-form-input
                        v-model="text_comment"
                        placeholder="Bình luận..."
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button
                          variant="secondary"
                          v-if="!phone"
                          @click="requestPhone()"
                          >Gửi</b-button
                        >
                        <b-button
                          variant="secondary"
                          v-if="phone"
                          @click="createComment()"
                          >Gửi</b-button
                        >
                      </b-input-group-append>
                    </b-input-group>
                  </b-collapse>
                </div>
                <div
                  v-if="
                    cmt && cmt.reply_comments && cmt.reply_comments.length > 0
                  "
                >
                  <b-media
                    v-for="(cmt_reply, i) in cmt.reply_comments"
                    :key="i"
                  >
                    <template #aside>
                      <b-avatar></b-avatar>
                    </template>
                    <a
                      v-if="cmt_reply.is_like == 0"
                      class="ml-3 like float-right"
                      id="isLike"
                      @click="like(cmt_reply.id)"
                      name="like"
                    >
                      {{ cmt_reply.like }} <i class="fa fa-thumbs-up"></i>
                    </a>
                    <a
                      v-if="cmt_reply.is_like == 1"
                      class="ml-3 liked float-right"
                      id="isLike"
                      @click="like(cmt_reply.id)"
                      name="like"
                    >
                      {{ cmt_reply.like }} <i class="fa fa-thumbs-up"></i>
                    </a>
                    <h5 class="mt-0 mb-1 cmt-created-by">
                      {{ cmt_reply.created_by }}
                    </h5>
                    <p class="mb-0 content-cmt">
                      {{ cmt_reply.content }}
                    </p>
                    <div>
                      <p class="cmt-created-at">{{ cmt_reply.created_at }}</p>
                      <a
                        class=" reply"
                        @click="
                          reply_ReplyComment(cmt.id, cmt_reply.created_by)
                        "
                        v-b-toggle="`collapse-${cmt_reply.id}`"
                        >Phản hồi</a
                      >
                    </div>
                    <div class="mb-3" v-if="!isMobile">
                      <b-collapse
                        :id="`collapse-${cmt_reply.id}`"
                        accordion="my-accordion"
                      >
                        <b-input-group class="mt-3">
                          <b-form-input
                            v-model="text_comment"
                            placeholder="Bình luận..."
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button
                              variant="secondary"
                              v-if="!phone"
                              @click="requestPhone()"
                              >Gửi</b-button
                            >
                            <b-button
                              variant="secondary"
                              v-if="phone"
                              @click="createComment()"
                              >Gửi</b-button
                            >
                          </b-input-group-append>
                        </b-input-group>
                      </b-collapse>
                    </div>
                  </b-media>
                </div>
              </b-media>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import LoginForm from "~/components/LoginForm";
import RegisterForm from "~/components/RegisterForm";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { isMobile } from "~/plugins/util";
import $ from "jquery";
export default {
  data() {
    return {
      currentRated: {},
      starSize: 15,
      showRating: false,
      text_comment: "",
      text_comment_1: "",
      arr_content: "",
      type: null,
      parent_id: null,
      replyFor: null,
      isMobile: null,
      widthOffImgOrVideo: [],
      widthVideo: null,
      ratedGallery: [],
      ImagesRender: {},
      mediaUrl: null,
    };
  },
  components: {
    LoginForm,
    ValidationProvider,
    ValidationObserver,
    RegisterForm,
  },
  created() {
    this.getDetailComment();
    if (!process.server) {
      this.mediaUrl = process.env.MEDIA_URL;
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
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }

    window.addEventListener("click", () => {
      if (document.getElementsByName("videos")) {
        let videos = document.getElementsByName("videos");
        videos.forEach((video) => {
          let widthOffImgOrVideo = video.offsetWidth;
          this.widthOffImgOrVideo.push(widthOffImgOrVideo);
        });
        this.widthVideo = this.widthOffImgOrVideo[
          this.widthOffImgOrVideo.length - 1
        ];
      }
    });
    window.addEventListener("touchend", () => {
      if (document.getElementsByName("videos")) {
        let videos = document.getElementsByName("videos");
        videos.forEach((video) => {
          let widthOffImgOrVideo = video.offsetWidth;
          this.widthOffImgOrVideo.push(widthOffImgOrVideo);
        });
        this.widthVideo = this.widthOffImgOrVideo[
          this.widthOffImgOrVideo.length - 1
        ];
      }
    });
    window.addEventListener("scroll", () => {
      if (document.getElementsByName("videos")) {
        let videos = document.getElementsByName("videos");
        videos.forEach((video) => {
          let widthOffImgOrVideo = video.offsetWidth;
          this.widthOffImgOrVideo.push(widthOffImgOrVideo);
        });
        this.widthVideo = this.widthOffImgOrVideo[
          this.widthOffImgOrVideo.length - 1
        ];
      }
    });
    window.addEventListener("mousemove", () => {
      if (document.getElementsByName("videos")) {
        let videos = document.getElementsByName("videos");
        videos.forEach((video) => {
          let widthOffImgOrVideo = video.offsetWidth;
          this.widthOffImgOrVideo.push(widthOffImgOrVideo);
        });
        this.widthVideo = this.widthOffImgOrVideo[
          this.widthOffImgOrVideo.length - 1
        ];
      }
    });
  },
  methods: {
    lightBox(item) {
      this.ImagesRender = item;
    },
    like(id) {
      this.$store
        .dispatch("products/likeComment", id)
        .then((res) => {
          this.getDetailComment();
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
    getDetailComment() {
      this.$store
        .dispatch("products/getDetailComment", this.$route.params["id"])
        .then((res) => {
          this.currentRated = res.data.data;
          this.parent_id = this.currentRated.id;
          this.type = "COMMENT";
        })
        .catch((err) => {
          // console.log("err:", err);
        });
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
    createComment() {
      if (!this.text_comment) {
        this.text_comment = this.text_comment_1;
      }
      let arr_content = this.text_comment;
      this.arr_content = arr_content.replace(/\ /g, ",");
      if (this.text_comment && this.text_comment.length > 0) {
        let parent_id = this.parent_id;
        const formdata = {
          product_id: this.currentRated.product_id,
          content: this.text_comment,
          arr_content: this.arr_content,
          rate: null,
          images: [],
          parent_id: parent_id,
          type: this.type,
          hashtag_rates: [],
        };
        console.log("formdata", formdata);
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
              // this.getComment();
              // this.formInput = false;
              this.$toast
                .success(
                  resp && resp.status ? resp.status : "Đã gửi bình luận",
                  {
                    position: "top-right",
                  }
                )
                .goAway(5000);
              this.getDetailComment();
              this.cancelRepFor();
              this.text_comment_1 = "";
              // this.start_comment = null;
              // this.fileList = null;
            } else {
              this.$toast
                .error(`Có lỗi khi bình luận`, {
                  position: "top-right",
                })
                .goAway(4000);
            }
          })
          .catch((err) => {
            this.$toast
              .error(err, {
                position: "top-right",
              })
              .goAway(4000);
          });
      } else {
        // this.showAlertValidateComment = true;
        this.$toast
          .error("Nhập nội dung bình luận", {
            position: "top-right",
          })
          .goAway(4000);
      }
    },
    replyComment(itemValue) {
      if (itemValue && itemValue.id) {
        this.parent_id = itemValue.id;
        this.type = "REPLY_COMMENT";
        this.text_comment = `@${itemValue.created_by}:`;
        this.replyFor = itemValue.created_by;
      }
      if (document.getElementById("replyFor")) {
        let replyFor = document.getElementById("replyFor");
        replyFor.classList.add("show");
      }
    },
    reply_ReplyComment(itemValue, reply_itemValue) {
      if (itemValue && reply_itemValue) {
        this.parent_id = itemValue;
        this.type = "REPLY_COMMENT";
        this.text_comment = `@${reply_itemValue}:`;
        this.replyFor = reply_itemValue;
      }
      if (document.getElementById("replyFor")) {
        let replyFor = document.getElementById("replyFor");
        replyFor.classList.add("show");
      }
    },
    cancelRepFor() {
      this.parent_id = this.currentRated.id;
      this.type = "COMMENT";
      this.text_comment = null;
      if (document.getElementById("replyFor")) {
        let replyFor = document.getElementById("replyFor");
        replyFor.classList.remove("show");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card-body {
  border-top: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.content-cmt {
  margin-bottom: 3px !important;
}
#hashtagRate .VueCarousel-wrapper div {
  flex-basis: unset !important;
}
</style>
