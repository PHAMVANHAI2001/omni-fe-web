<template>
  <div class="widget" id="CusTomerRateComment">
    <h2 class="widget-title" data-aos="fade-up">Khách hàng nhận xét</h2>
    <div class="widget-content">
      <div class="comment-sumary">
        <div class="row" data-aos="fade-up">
          <div class="col-md-6 text-center">
            <h4>Đánh giá trung bình</h4>
            <div class="average-rating">{{ avgStar.avg }}/5</div>
            <star-rating
              :rating="avgStar.avg"
              :star-size="averageStarSize"
              :show-rating="showRating"
              :increment="0.1"
              read-only
              class="average-rating"
              style="margin-top: -25px !important"
            ></star-rating>
            <p class="total-comment" style="margin-top: 8px">
              {{ totalRate.total }} nhận xét
            </p>
          </div>

          <div class="col-md-6" style="align-items: center;">
            <!-- <span class="write_a_comment_btn" v-b-toggle.writeRating
              >Đánh giá sản phẩm</span
            >
            <b-collapse id="writeRating" class="mt-2">
              <b-card>
                <p class="card-text">Collapse contents Here</p>
                <b-button v-b-toggle.collapse-1-inner size="sm"
                  >Toggle Inner Collapse</b-button
                >
                <b-collapse id="collapse-1-inner" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-card>
            </b-collapse> -->
            <div class="d-flex">
              <star-rating
                :rating="countStar[0].starNumber"
                :star-size="countStarSize"
                :show-rating="showRating"
                read-only
              ></star-rating>
              &nbsp;&nbsp;
              <b-progress
                height="20px"
                :value="starProduct.percent_5_star"
                show-progress
                class="w-75"
              ></b-progress>
              &nbsp;&nbsp;
              <span>{{ starProduct["5_star"] }}</span>
            </div>
            <br />
            <div class="d-flex">
              <star-rating
                :rating="countStar[1].starNumber"
                :star-size="countStarSize"
                :show-rating="showRating"
                read-only
              ></star-rating>
              &nbsp;&nbsp;
              <b-progress
                height="20px"
                :value="starProduct.percent_4_star"
                show-progress
                class="w-75"
              ></b-progress>
              &nbsp;&nbsp;
              <span>{{ starProduct["4_star"] }}</span>
            </div>
            <br />
            <div class="d-flex">
              <star-rating
                :rating="countStar[2].starNumber"
                :star-size="countStarSize"
                :show-rating="showRating"
                read-only
              ></star-rating>
              &nbsp;&nbsp;
              <b-progress
                height="20px"
                :value="starProduct.percent_3_star"
                show-progress
                class="w-75"
              ></b-progress>
              &nbsp;&nbsp;
              <span>{{ starProduct["3_star"] }}</span>
            </div>
            <br />
            <div class="d-flex">
              <star-rating
                :rating="countStar[3].starNumber"
                :star-size="countStarSize"
                :show-rating="showRating"
                read-only
              ></star-rating>
              &nbsp;&nbsp;
              <!-- <b-progress :value="countStar.countOneStar" class="w-75"></b-progress> -->
              <b-progress
                height="20px"
                :value="starProduct.percent_2_star"
                show-progress
                class="w-75"
              ></b-progress>
              &nbsp;&nbsp;
              <span>{{ starProduct["2_star"] }}</span>
            </div>
            <br />
            <div class="d-flex">
              <star-rating
                :rating="countStar[4].starNumber"
                :star-size="countStarSize"
                :show-rating="showRating"
                read-only
              ></star-rating>
              &nbsp;&nbsp;
              <b-progress
                height="20px"
                :value="starProduct.percent_1_star"
                show-progress
                class="w-75"
              ></b-progress>
              &nbsp;&nbsp;
              <span>{{ starProduct["1_star"] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- <h2 class="widget-title" data-aos="fade-up">
        Đánh giá sản phẩm
      </h2> -->
      <b-alert variant="success" show v-if="!phone" data-aos="fade-up"
        >Vui lòng
        <strong
          ><a style="color: #567733 !important" @click="showModalLogin()"
            >đăng nhập</a
          ></strong
        >
        hoặc
        <strong
          ><a style="color: #567733 !important" @click="showModalLogin(1)"
            >đăng ký thành viên</a
          ></strong
        >
        để bình luận và đánh giá sản phẩm</b-alert
      >
      <!-- <div class="row" v-if="product.is_comment == 1">
        <div class="container">
          <star-rating
            v-model="start_comment"
            :star-size="ratingStarSize"
            :show-rating="showRating"
          ></star-rating>

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
                    {{ tag.content }}
                  </span>
                </a>
              </div>
              <carousel
                :perPageCustom="[[320, 1]]"
                :scrollPerPage="false"
                v-if="isMobile"
                id="hashtagRate"
                :paginationEnabled="false"
              >
                <slide
                  v-for="(tag, i) in hashtag_rate"
                  :key="i"
                  style="height: 40px"
                  class="mt-3"
                >
                  <a
                    class="item-tag-rate-unChoose"
                    @click="tagRate(tag)"
                    :id="tag.code"
                  >
                    <span class="">
                      {{ tag.content }}
                    </span>
                  </a>
                </slide>
              </carousel>
            </div>
            <b-form-textarea
              id="textarea-default"
              v-model="text_comment"
              placeholder="Nội dung đánh giá"
              rows="3"
            ></b-form-textarea>

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
                      :src="
                        `${mediaUrl}/file/${file.id}/h300-w300`
                      "
                      alt=""
                      width="100%"
                    />
                    <img
                      v-if="file.mimeType && file.mimeType == 'image/png'"
                      id="imageResult"
                      :src="
                        `${mediaUrl}/file/${file.id}/h300-w300`
                      "
                      alt=""
                      width="100%"
                    />
                    <video
                      width="100%"
                      :height="widthVideo + 'px'"
                      name="video"
                      v-if="file.mimeType && file.mimeType == 'video/mp4'"
                      :id="file.id"
                    >
                      <source
                        :src="
                          `${mediaUrl}/file/${file.id}`
                        "
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <video
                      width="100%"
                      :height="widthVideo + 'px'"
                      name="video"
                      v-if="file.mimeType && file.mimeType == 'video/ogg'"
                      :id="file.id"
                    >
                      <source
                        :src="
                          `${mediaUrl}/file/${file.id}`
                        "
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
        <br />
        <hr />
      </div> -->
      <div class="row" data-aos="fade-up">
        <div class="container">
          <b-card class="context-rating">
            <b-form-textarea
              id="textarea-default"
              v-model="text_comment_1"
              placeholder="Đặt câu hỏi về sản phẩm"
              @keyup="onChange"
              rows="3"
            ></b-form-textarea>
            <b-button
              class="mt-2"
              v-if="!phone"
              variant="secondary"
              style="position:relative; border-radius: 30px !important"
              @click="requestPhone()"
              ><i class="fa fa-paper-plane"></i
            ></b-button>
            <b-button
              class="mt-2"
              v-if="phone"
              variant="secondary"
              style="position:relative; border-radius: 30px !important"
              @click="replyRated()"
              ><i class="fa fa-paper-plane"></i
            ></b-button>
          </b-card>
        </div>
        <br />
        <hr />
      </div>
      <p v-if="totalRate.total == 0" data-aos="fade-up">
        Chưa có bài đánh giá!
      </p>
      <div class="row" v-for="(cmt, i) in commentsList" :key="i">
        <b-card style="width: 100% !important;" data-aos="fade-up">
          <b-media>
            <template #aside>
              <b-avatar v-if="cmt && !cmt.avatar"></b-avatar>
              <b-avatar
                v-if="cmt && cmt.avatar"
                variant="success"
                :src="cmt.avatar"
              ></b-avatar>
            </template>

            <span>
              <star-rating
                :rating="cmt.rate"
                :star-size="countStarSizeByUser"
                :show-rating="showRating"
                v-if="cmt.type == 'RATE'"
                read-only
              ></star-rating>
              <p style="float: right; font-color: #757575; font-size: 13px">
                {{ cmt.created_at }}
              </p>
              <h5 class="mt-0" style="color: #006e43">
                {{ cmt.created_by }}
                <i class="fa fa-comment" v-if="cmt.type == 'QUESTION'"></i>
              </h5>
            </span>

            <p class="mb-1 mt-3">
              {{ cmt.content }}
            </p>
            <div
              class="hashtags-rate"
              v-if="
                cmt.hashtag_rates &&
                  cmt.hashtag_rates.length > 0 &&
                  cmt.type == 'RATE'
              "
            >
              <div class="row">
                <span v-for="(tag_rated, t) in cmt.hashtag_rates" :key="t">
                  <div class="item-tag-rate-Choosed" :id="tag_rated.code">
                    <span class="">
                      {{ tag_rated.value }}
                    </span>
                  </div>
                </span>
              </div>
              <!-- <div class="row" v-if="isMobile">
                <carousel
                  :perPageCustom="[[320, 1]]"
                  :scrollPerPage="false"
                  class="hashtagRate"
                  :paginationEnabled="false"
                >
                  <slide v-for="(tag_rated, t) in cmt.hashtag_rates" :key="t">
                    <div
                      class="item-tag-rate-unChoose"
                      :id="tag_rated.code"
                    >
                      <span class="">
                        {{ tag_rated.content }}
                      </span>
                    </div>
                  </slide>
                </carousel>
              </div> -->
            </div>

            <div class="row" v-if="cmt.type == 'RATE'">
              <a
                class="col-md-2 col-3"
                v-for="(item, i) in cmt.images"
                :key="i"
                style="padding: 0 3px !important"
                data-toggle="modal"
                data-target="#lightbox"
                @click="lightBox(item)"
              >
                <img
                  v-if="item.mimeType && item.mimeType == 'image/jpeg'"
                  :src="
                    `${mediaUrl}/file/` +
                      item.id +
                      `/h250-w250`
                  "
                  :alt="`${mediaUrl}/file/` + item.id"
                />
                <img
                  v-if="item.mimeType && item.mimeType == 'image/png'"
                  :src="
                    `${mediaUrl}/file/` +
                      item.id +
                      `/h250-w250`
                  "
                  :alt="`${mediaUrl}/file/` + item.id"
                />
                <video
                  muted
                  controls
                  width="100%"
                  :height="widthVideo + 'px'"
                  name="video"
                  v-if="item.mimeType && item.mimeType == 'video/mp4'"
                  :id="item.id"
                >
                  <source
                    :src="`${mediaUrl}/file/${item.id}`"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                <video
                  controls
                  muted
                  width="100%"
                  :height="widthVideo + 'px'"
                  name="video"
                  v-if="item.mimeType && item.mimeType == 'video/ogg'"
                  :id="item.id"
                >
                  <source
                    :src="`${mediaUrl}/file/${item.id}`"
                    type="video/ogg"
                  />
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
                        :src="
                          `${mediaUrl}/file/` +
                            ImagesRender.id
                        "
                      />
                      <img
                        v-if="
                          ImagesRender &&
                            ImagesRender.mimeType &&
                            ImagesRender.mimeType == 'image/png'
                        "
                        :src="
                          `${mediaUrl}/file/` +
                            ImagesRender.id
                        "
                      />
                      <video
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
                          :src="
                            `${mediaUrl}/file/${ImagesRender.id}`
                          "
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <video
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
                          :src="
                            `${mediaUrl}/file/${ImagesRender.id}`
                          "
                          type="video/ogg"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-2" v-if="phone">
              <a
                class="btn-rep"
                style="color: #fff !important"
                v-b-toggle="`collapse_${cmt.id}`"
                @click="getReplyRated(cmt)"
                >Trả lời</a
              >
              <a
                v-if="cmt.is_like == 0"
                class="ml-3 like"
                id="isLike"
                @click="like(cmt.id)"
                name="like"
              >
                ({{ cmt.like }}) <i class="fa fa-thumbs-up"></i>
              </a>
              <a
                v-if="cmt.is_like == 1"
                class="ml-3 liked"
                id="isLike"
                @click="like(cmt.id)"
                name="like"
              >
                ({{ cmt.like }}) <i class="fa fa-thumbs-up"></i>
              </a>
            </div>
            <div class="row">
              <b-collapse
                :id="`collapse_${cmt.id}`"
                class="mt-2"
                style="width: 100% !important"
                accordion="my-accordion"
              >
                <b-form-textarea
                  id="textarea-default"
                  v-model="text_comment"
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
                    ><i class="fa fa-paper-plane"></i
                  ></b-button>
                  <b-button
                    class="float-right"
                    v-if="phone"
                    variant="secondary"
                    style="position:relative; border-radius: 30px !important"
                    @click="replyRated()"
                    ><i class="fa fa-paper-plane"></i
                  ></b-button>
                </div>
              </b-collapse>
            </div>

            <div class="row mt-3" v-if="cmt.childs && cmt.childs.length > 0">
              <div
                class="card card-reply"
                v-for="(item, i) in cmt.childs"
                :key="i"
              >
                <p>
                  <img
                    src="~/assets/images/nutifood/logo-ntf.png"
                    alt=""
                    width="100px"
                  />
                  <i class="fa fa-check-circle color-nuti"></i>
                </p>
                <p class="content-nuti-reply">
                  {{ item.content }}
                </p>
              </div>
            </div>

            <div class="row" v-for="(rep, i) in cmt.comments" :key="i">
              <div class="">
                <b-media class="mt-3">
                  <template #aside>
                    <b-avatar v-if="rep && !rep.avatar"></b-avatar>
                    <b-avatar
                      v-if="rep && rep.avatar"
                      variant="success"
                      :src="rep.avatar"
                    ></b-avatar>
                  </template>
                  <h5 class="mt-0" style="margin-bottom: 0 !important">
                    {{ rep.created_by }}
                  </h5>

                  <p class="mb-0">
                    {{ rep.content }}
                  </p>
                  <a
                    style="color: #006e43 !important"
                    v-b-toggle="`collapse_${rep.id}`"
                    @click="getReplyRated(rep)"
                    v-if="phone"
                    >Trả lời</a
                  >
                  <a
                    v-if="rep.is_like == 0"
                    class="ml-3 like"
                    id="isLike"
                    @click="like(rep.id)"
                    name="like"
                  >
                    ({{ rep.like }}) <i class="fa fa-thumbs-up"></i>
                  </a>
                  <a
                    v-if="rep.is_like == 1"
                    class="ml-3 liked"
                    id="isLike"
                    @click="like(rep.id)"
                    name="like"
                  >
                    ({{ rep.like }}) <i class="fa fa-thumbs-up"></i>
                  </a>

                  <!-- Comment -->
                  <div>
                    <b-collapse
                      :id="`collapse_${rep.id}`"
                      class="mt-2"
                      style="width: 100% !important"
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
                            class="btn-send-rate-or-comment"
                            ><i class="fa fa-paper-plane"></i
                          ></b-button>
                          <b-button
                            variant="secondary"
                            v-if="phone"
                            @click="replyRated()"
                            class="btn-send-rate-or-comment"
                            ><i class="fa fa-paper-plane"></i
                          ></b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-collapse>
                  </div>

                  <div
                    class=""
                    v-for="(repMin, i) in rep.reply_comments"
                    :key="i"
                  >
                    <div class="">
                      <b-media class="mt-3">
                        <template #aside>
                          <b-avatar v-if="repMin && !repMin.avatar"></b-avatar>
                          <b-avatar
                            v-if="repMin && repMin.avatar"
                            variant="success"
                            :src="repMin.avatar"
                          ></b-avatar>
                        </template>
                        <h5 class="mt-0" style="margin-bottom: 0 !important">
                          {{ repMin.created_by }}
                        </h5>
                        <p class="mb-0">
                          {{ repMin.content }}
                        </p>
                        <a
                          style="color: #006e43 !important"
                          v-b-toggle="`collapse_${repMin.id}`"
                          @click="
                            getReplyOfReplyRated(rep.id, repMin.created_by)
                          "
                          v-if="phone"
                          >Trả lời</a
                        >
                        <a
                          v-if="repMin.is_like == 0"
                          class="ml-3 like"
                          id="isLike"
                          @click="like(repMin.id)"
                          name="like"
                        >
                          ({{ repMin.like }}) <i class="fa fa-thumbs-up"></i>
                        </a>
                        <a
                          v-if="repMin.is_like == 1"
                          class="ml-3 liked"
                          id="isLike"
                          @click="like(repMin.id)"
                          name="like"
                        >
                          ({{ repMin.like }}) <i class="fa fa-thumbs-up"></i>
                        </a>
                        <!-- Reply Comment -->
                        <div class="">
                          <b-collapse
                            :id="`collapse_${repMin.id}`"
                            class="mt-2"
                            style="width: 100% !important"
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
                                  class="btn-send-rate-or-comment"
                                  ><i class="fa fa-paper-plane"></i
                                ></b-button>
                                <b-button
                                  variant="secondary"
                                  v-if="phone"
                                  @click="replyRated()"
                                  class="btn-send-rate-or-comment"
                                  ><i class="fa fa-paper-plane"></i
                                ></b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-collapse>
                        </div>
                      </b-media>
                    </div>
                  </div>
                </b-media>
              </div>
            </div>
          </b-media>
        </b-card>
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
    // product: Object,
  },
  data() {
    return {
      //
      hashtag_rate: [
        {
          id: 1,
          code: "clspt",
          content: "Chất lượng sản phẩm tuyệt vời",
          is_choose: 0,
        },
        { id: 2, code: "srn", content: "Sữa rất ngon", is_choose: 0 },
        {
          id: 3,
          code: "dgsprdvcc",
          content: "Đóng gói sản phẩm rất đẹp và chắc chắn",
          is_choose: 0,
        },
        {
          id: 4,
          code: "dvcskhrt",
          content: "Dịch vụ chăm sóc khách hàng rất tốt",
          is_choose: 0,
        },
        { id: 5, code: "rdt", content: "Rất đáng tiền", is_choose: 0 },
        {
          id: 6,
          code: "tgghrn",
          content: "Thời gian giao hàng rất nhanh",
          is_choose: 0,
        },
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
      ratingStarSize: 40,
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
      commentsList: [],
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
      lengthCreatedByParent: null,
      mediaUrl: null,
      product: {},
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
   created() {
    this.product =  JSON.parse(sessionStorage.getItem("product_id"))
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
    this.getComment();
    this.getRate();

  },
  methods: {
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
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.files.map((file, index) => {
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
    getReplyRated(data) {
      if (data && data.id) {
        this.parent_id = data.id;
        if (data.type && data.type == "RATE") {
          this.type = "COMMENT";
        }
        if (data.type && data.type == "COMMENT") {
          this.type = "REPLY_COMMENT";
        }
        if (data.created_by) {
          this.lengthCreatedByParent = data.created_by.length + 2;
          this.text_comment = `@${data.created_by}:`;
        }
      }
    },
    getReplyOfReplyRated(idComment, nameReply) {
      if (idComment && nameReply) {
        this.parent_id = idComment;
        this.type = "REPLY_COMMENT";
        this.lengthCreatedByParent = nameReply.length + 2;
        this.text_comment = `@${nameReply}:`;
      }
    },
    onChange() {
      this.parent_id = null;
      this.lengthCreatedByParent = 0;
      this.text_comment = "";
    },
    replyRated() {
      if (!this.text_comment) {
        this.text_comment = this.text_comment_1;
      }
      let arr_content = this.text_comment;
      this.arr_content = arr_content.replace(/\ /g, ",");
      if (
        this.text_comment &&
        this.text_comment.length - this.lengthCreatedByParent > 0
      ) {
        if (this.parent_id == null) {
          this.type = "QUESTION";
        }
        let parent_id = this.parent_id;
        const formdata = {
          product_id: this.product.id,
          content: this.text_comment,
          arr_content: this.arr_content,
          rate: null,
          images: [],
          parent_id: parent_id,
          type: this.type,
          hashtag_rates: [],
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
              this.text_comment_1 = "";
              this.text_comment = "";
              this.$toast
                .success(
                  resp && resp.status ? resp.status : "Đã gửi bình luận",
                  {
                    position: "top-right",
                  }
                )
                .goAway(8000);
              this.getComment();
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
          .error("Nhập nội dung bình luận!", {
            position: "top-right",
          })
          .goAway(4000);
      }
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
      if (
        this.text_comment &&
        this.text_comment.length - this.lengthCreatedByParent > 0
      ) {
        const formdata = {
          product_id: this.product.id,
          content: this.text_comment,
          arr_content: this.arr_content,
          rate: this.start_comment,
          images: this.id_images,
          parent_id: null,
          type: "RATE",
          hashtag_rates: hashtag_rates,
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
              // this.getComment();
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
              this.getComment();
              // this.start_comment = null;
              // this.fileList = null;
              // location.reload();
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
      } else {
        // this.showAlertValidateComment = true;
        this.$toast
          .error("Nhập nội dung đánh giá!", {
            position: "top-right",
          })
          .goAway(4000);
      }
    },
    getComment() {
      this.$store
        .dispatch("products/getComment", { productId: this.product.id })
        .then((res) => {
          this.commentsList = res.data.data;
          this.commentsList.forEach((item) => {
            if (item && item.is_like && item.is_like == 1) {
              let docLike = document.getElementsByName("like");
              docLike.classList.remove("like");
              docLike.classList.add("liked");
            } else {
              let docLike = document.getElementsByName("like");
              docLike.classList.add("like");
              docLike.classList.remove("liked");
            }
            if (item && item.hashtag_rates) {
              item.hashtag_rates.forEach((tag) => {
                if (tag && tag.is_choose == "1") {
                  item.hashtag_rates.push(tag);
                }
              });
            }
          });
        })
        .catch((err) => {
          // console.log("err:", err);
        });
    },
    getRate() {
      this.$store
        .dispatch("products/getRate", { id: this.product.id })
        .then((res) => {
          this.starProduct = res.data.data.star;
          this.totalRate = res.data.data.total_rate;
          this.avgStar = res.data.data.avg_star;
        })
        .catch((err) => {
          // console.log("err:", err);
        });
    },
    lightBox(item) {
      this.ImagesRender = item;
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
    like(id) {
      if (id) {
        this.$store
          .dispatch("products/likeComment", id)
          .then((res) => {
            this.getComment();
          })
          .catch((err) => {
            // console.log("err:", err);
          });
      }
    },
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
#hashtagRate .VueCarousel-wrapper div {
  flex-basis: unset !important;
}
.hashtagRate .VueCarousel-wrapper div {
  flex-basis: unset !important;
}
</style>
