<template>
  <main role="main">
    <h2 class="cp-page-title clearfix">
      Chi tiết đơn hàng {{ order ? order.code : "" }}
      <!-- <button
        title="Đặt mua lại tất cả sản phẩm trong đơn này"
        disabled
        class="btn btn btn-outline-danger float-md-right"
        type="button"
      >Đặt mua lại đơn này</button>-->
    </h2>

    <div class="block-section" v-if="order">
      <div class="clearfix p-2">
        <span class="badge pull-right badge-info">{{ order.status_name }}</span>
      </div>
      <!-- <ul class="progressbar clearfix">
        <li class="active pr1">
          <a>Đơn hàng đã đặt</a>
        </li>
        <li class="pr2" v-bind:class="{ active: order.approver }">
          <a>Đơn hàng đã xác nhận</a>
        </li>
        <li class="pr3" v-bind:class="{ active: order.status == 'COMPLETED' }">
          <a>Chờ giao</a>
        </li>
        <li class="pr4" v-bind:class="{ active: order.status == 'COMPLETED' }">
          <a>Hoàn thành</a>
        </li>
      </ul> -->
      <ul class="progressbar clearfix">
        <li class="active pr1">
          <a>Đơn hàng đã đặt</a>
        </li>
        <li
          class="pr2"
          v-bind:class="{
            active:
              order.status == 'APPROVED' ||
              order.status == 'SHIPPING' ||
              order.status == 'COMPLETED' ||
              order.status == 'SHIPPED',
          }"
        >
          <a>Đã xác nhận</a>
        </li>
        <li
          class="pr3"
          v-bind:class="{
            active:
              order.status == 'SHIPPING' ||
              order.status == 'COMPLETED' ||
              order.status == 'SHIPPED',
          }"
        >
          <a>Đang Giao hàng</a>
        </li>
        <li
          class="pr4"
          v-bind:class="{
            active: order.status == 'COMPLETED' || order.status == 'SHIPPED',
          }"
        >
          <a>Giao hàng thành công</a>
        </li>
      </ul>
      <!-- <ul class="progressbar clearfix">
           <li class="active pr1">
          <a>Đơn hàng đã đặt</a>
        </li>
        <li class="pr2" v-bind:class="{ active: order.status == 'APPROVED' }">
          <a>Đã xác nhận</a>
        </li>
        <li class="pr3" v-bind:class="{ active: order.status == 'SHIPPING' }">
          <a> Đang Giao hàng</a>
        </li>
        <li class="pr4" v-bind:class="{ active: order.status == 'SHIPPED' }">
          <a>Giao hàng thành công</a>
        </li>
       </ul> -->

      <div class="panel-group" id="status_shiping">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <!-- <nuxt-link
                :to="{
                  path: `/user-rated-gallery/rating?order=${order.id}&order-code=${order.code}`,
                }"
                v-if="order.status == 'COMPLETED'"
                class="text-warning float-right fw-600"
                >ĐÁNH GIÁ SHIPPER</nuxt-link
              > -->
              <!-- <a
                v-if="order.status == 'COMPLETED'"
                class="text-secondary text-right fw-600"
                >ĐÃ ĐÁNH GIÁ</a
              > -->
              <a
                data-toggle="collapse"
                data-parent="#status_shiping"
                href="#collapsea"
                class="color-nuti"
              >
                <i class="fa fa-angle-right"></i> Trạng thái vận chuyển
              </a>
            </h4>
          </div>
          <div id="collapsea" class="panel-collapse collapse in">
            <div class="panel-body">
              <div class="container-fluid">
                <div class="row example-split">
                  <div
                    class="col-xs-10 col-xs-offset-1 col-sm-12 col-sm-offset-2"
                  >
                    <ul class="timeline timeline-split">
                      <li
                        class="timeline-item active"
                        v-for="(status, i) in order[
                          'delivery_status_histories'
                        ]"
                        :key="i"
                      >
                        <section
                          v-if="
                            order['delivery_status_histories'] &&
                              order['delivery_status_histories'].length > 0
                          "
                        >
                          <div class="timeline-info">
                            <span>{{ status.status_at }}</span>
                          </div>
                          <div class="timeline-marker"></div>
                          <div class="timeline-content">
                            <h5 class="timeline-title">
                              <b>{{ status.text_status_code }}</b>
                            </h5>
                            <p class="detail-status-shipping">
                              {{ status.name_driver }}
                            </p>
                            <p class="detail-status-shipping">
                              <span
                                v-if="
                                  status.phone_driver &&
                                    status.phone_driver.length == 9
                                "
                                >+84</span
                              >
                              {{ status.phone_driver }}
                            </p>
                            <p class="detail-status-shipping">
                              {{ status.license_plate }}
                            </p>
                          </div>
                        </section>
                      </li>
                      <li class="timeline-item">
                        <section>
                          <div class="timeline-info">
                            <span>{{ order.created_at }}</span>
                          </div>
                          <div class="timeline-marker"></div>
                          <div class="timeline-content">
                            <h5 class="timeline-title">
                              Chờ duyệt
                            </h5>
                            <!-- <p>Đặt hàng thành công</p> -->
                          </div>
                        </section>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-group" id="accordion">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapse1"
                class="color-nuti"
              >
                <i class="fa fa-angle-right"></i> Thông tin giao hàng
              </a>
            </h4>
          </div>
          <div id="collapse1" class="panel-collapse collapse in">
            <div class="panel-body">
              <address>
                <p>
                  <strong>Người nhận:</strong>
                  {{ order.shipping_address_full_name }}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>
                  {{ order.shipping_address_phone }}
                </p>
                <p>
                  <strong>Đơn vị giao hàng:</strong>
                  {{ order.shipping_method_name }}
                </p>
                <!--                <p>-->
                <!--                  <strong>Tỉnh/Thành phố:</strong>-->
                <!--                  {{ order.shipping_address_city }}-->
                <!--                </p>-->
                <!--                <p>-->
                <!--                  <strong>Quận/Huyện:</strong>-->
                <!--                  {{ order.shipping_address_district }}-->
                <!--                </p>-->
                <!--                <p>-->
                <!--                  <strong>Phường/Xã:</strong>-->
                <!--                  {{ order.shipping_address_ward }}-->
                <!--                </p>-->
                <p>
                  <strong>Địa chỉ:</strong>
                  {{ order.shipping_address }}
                </p>
                <p>
                  <strong>Nhà phân phối:</strong>
                  {{ order.distributor_name }}
                </p>
              </address>
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapse2"
                class="color-nuti"
              >
                <i class="fa fa-angle-right"></i> Thanh toán
              </a>
            </h4>
          </div>
          <div id="collapse2" class="panel-collapse collapse">
            <div class="panel-body">
              <address>
                <strong>Hình thức thanh toán:</strong>
                <br />
                {{ order.payment_method_name }}
              </address>
            </div>
          </div>
        </div>
      </div>
      <div class v-if="order">
        <div class="block-section">
          <div class="row" v-for="(item, i) in order.details" :key="`D` + i">
            <div class="col-md-10 col-9 justify-content-left pl-0">
              <div class="d-flex bd-highlight">
                <div class="p-2">
                  <nuxt-link :to="{ path: `/product/${item.slug}` }">
                    <img v-bind:src="item.thumbnail" alt style="width: 80px" />
                  </nuxt-link>
                </div>
                <div class="d-flex flex-column p-2">
                  <nuxt-link
                    :to="{ path: `/product/${item.slug}` }"
                    style="color: #006e43"
                  >
                    <p class="mb-1">{{ item.product_name }}</p>
                  </nuxt-link>
                  <div class="box-price-mobile">
                    <p
                      v-if="item.promotion_price > 0"
                      class="price-product-mobile d-flex flex-row"
                    >
                      <span class="current-price"
                        >{{ item.promotion_price_formatted }} đ/{{
                          item.product_unit_name
                        }}</span
                      >
                      &nbsp;
                      <del class="origin-price">{{ item.price_formatted }}</del>
                    </p>
                    <p
                      v-if="item.promotion_price == 0"
                      class="price-product-mobile"
                    >
                      <span class="current-price"
                        >{{ item.price_formatted }}/{{
                          item.product_unit_name
                        }}</span
                      >
                    </p>
                  </div>
                  <p class="text-muted">Số lượng: {{ item.qty }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-2 col-3 justify-content-right pl-pr-0 pt-2">
              <div class="d-flex flex-column">
                <p class="text-danger text-right mb-0">
                  {{ item.total_formatted }}
                </p>
                <nuxt-link
                  :to="{
                    path: `/user-rated-gallery/rating/${item.slug}?order=${order.id}&order-code=${order.code}&order-detail-id=${item.id}`,
                  }"
                  v-if="order.status == 'COMPLETED' && item.commented == 0"
                  class="text-warning text-right fw-600"
                  >ĐÁNH GIÁ</nuxt-link
                >
                <a
                  v-if="order.status == 'COMPLETED' && item.commented == 1"
                  class="text-secondary text-right fw-600"
                  >ĐÃ ĐÁNH GIÁ</a
                >
                <!-- <span
                  v-if="item.discount > 0"
                  v-bind:class="{ has_special: item.total > 0 }"
                  class="product-price text-right"
                  style="margin-right: 0px"
                  >{{ item.total_formatted }}</span
                > -->
              </div>
            </div>
          </div>
          <div class="section p-0" v-if="order && order['free_item']">
            <div v-for="(item, i) in order['free_item']" :key="i">
              <div class="news-item  px-2 w-100  mb-2 pt-0">
                <div class="news-image max-width-70 mr-2 position-relative">
                  <a>
                    <img
                      class="img-fluid box-shadow-none"
                      src="../../../assets/images/icon/gift-item-2.png"
                      alt="quà tặng"
                    />
                  </a>
                </div>
                <div class="news-summary w-100">
                  <div class="d-flex justify-content-space-between w-100">
                    <div class="col-md-9 col-7" style="padding: 0 !important">
                      <h4 class="font-weight-bold color-555 font-12">
                        <a class="title-product">
                          {{ item["text"].product_name }}
                        </a>
                      </h4>
                    </div>
                    <div class="col-md-3 col-5" style="padding: 0 !important">
                      <div class="margin" style="width: 100% !important">
                        <div
                          class="qty-update-cart-mobile d-inline-flex"
                          style="position: absolute; right: 0 !important;"
                        >
                          <p>
                            Số lượng: <b>{{ item["value"] }}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="row mt-2"
            v-for="(item, i) in order.totals"
            :key="`T` + i"
          >
            <div class="col-md-9 col-7 justify-content-right text-right">
              <strong>{{ item.title }}:</strong>
            </div>
            <div
              class="col-md-3 col-5 justify-content-left text-danger text-right"
            >
              <span>{{ item.text }}</span>
            </div>
          </div>
          <div class="row mt-2" v-if="order.saving > 0">
            <div class="col-md-9 col-7 justify-content-right text-right">
              <strong>Tiết kiệm:</strong>
            </div>
            <div
              class="col-md-3 col-5 justify-content-left text-danger text-right"
            >
              <span>{{ order.saving_fortmated }}</span>
            </div>
          </div>

          <hr />
          <div
            class="row"
            v-if="order.status == 'COMPLETED' && order.rated_shipping == 0"
          >
            <div class="rating-shipping text-center w-100">
              <div class="widget-content">
                <h2 class="widget-title text-center">
                  Đánh giá đơn vị giao hàng
                </h2>
                <div class="d-flex justify-content-center">
                  <star-rating
                    v-model="start_comment"
                    :star-size="ratingStarSize"
                    :show-rating="showRating"
                  ></star-rating>
                </div>

                <b-card class="context-rating" id="ratingShipping">
                  <b-form-textarea
                    id="textarea-default"
                    v-model="text_comment"
                    placeholder="Nội dung đánh giá"
                    rows="3"
                  ></b-form-textarea>

                  <main role="main" style="margin: 20px 0">
                    <div class="col-md-12">
                      <b-button
                        class="float-right"
                        variant="secondary"
                        style="position:relative; border-radius: 30px !important"
                        @click="createComment()"
                        ><i class="fa fa-paper-plane"></i
                      ></b-button>
                    </div>
                  </main>
                </b-card>
              </div>
            </div>
          </div>

          <div class="row mt-10 mb-10" v-if="order.status !== 'COMPLETED'">
            <div class="text-left" v-if="user && user.group_code == 'HUB'">
              <button
                v-if="order.status == 'NEW'"
                @click="updateOrder('CANCELED')"
                class="btn btn-info"
              >
                Từ chối
              </button>
              <button
                v-if="order.status == 'NEW'"
                @click="updateOrder('APPROVED')"
                class="btn btn-info text-white"
              >
                Nhận đơn
              </button>
              <button
                v-if="
                  order.status !== 'NEW' &&
                    order.status !== 'COMPLETED' &&
                    order.status !== 'CANCELED'
                "
                @click="updateOrder('COMPLETED')"
                class="btn btn-success"
              >
                Đã giao
              </button>
            </div>
            <div class="text-right">
              <button
                v-if="
                  order.status == 'NEW' &&
                    user &&
                    (user.group_code == 'AGENT' ||
                      user.group_code == 'GUEST' ||
                      user.group_code == 'OUTLET')
                "
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#cancelOrderModal"
              >
                Huỷ đơn hàng
              </button>
            </div>
            <div
              class="modal fade bd-example-modal-lg"
              id="cancelOrderModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Vui lòng cho chúng tôi biết lý do bạn muốn huỷ đơn
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true"
                        ><i class="fa fa-times-circle"></i
                      ></span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <b-form-group label="" v-slot="{ ariaDescribedby }">
                      <div class="row">
                        <div
                          class="col-md-6 col-12"
                          v-for="reason in reasionCancelOrder"
                          :key="reason.id"
                          @change="selectReason(reason)"
                        >
                          <b-form-radio
                            v-model="selectedReason"
                            :aria-describedby="ariaDescribedby"
                            name="some-radios"
                            :value="reason.value"
                            >{{ reason.value }}</b-form-radio
                          >
                        </div>
                      </div>
                    </b-form-group>
                    <div
                      class="mt-2 display-none ml-3 mr-3"
                      id="description-reason"
                    >
                      <b-form-textarea
                        id="textarea-small"
                        size="sm"
                        placeholder="Vui lòng cho chi tiết lý do hủy đơn của bạn"
                        v-model="formSelectedReason.description"
                      ></b-form-textarea>
                      <label
                        class="custom-file text-center mt-4 ml-0"
                        for="file"
                      >
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
                      <div class="row mt-1">
                        <div
                          v-for="(file, index) in fileList"
                          :key="index"
                          class="col-md-2 col-sm-3 col-4"
                          style="padding: 0 3px !important"
                        >
                          <span class="remove-file" @click="removeFile(index)"
                            ><i
                              class="fa fa-times-circle"
                              style="font-size: 20px"
                            ></i
                          ></span>
                          <img
                            v-if="
                              file.mimeType && file.mimeType == 'image/jpeg'
                            "
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
                            muted
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
                            muted
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
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Trở lại
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      :class="{ disabled: !selectedReason }"
                      @click="cancelOrder()"
                      data-dismiss="modal"
                    >
                      Xác nhận hủy đơn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <h4
              class="mt-15"
              v-if="
                order && order.status_histories && order.status_histories.length
              "
            >
              Lịch sử trạng thái đơn hàng
            </h4>
            <div
              class="col-md-12"
              v-if="
                order && order.status_histories && order.status_histories.length
              "
            >
              <ul>
                <li
                  class="d-flex border-bottom p-1"
                  v-for="(item, i) in order.status_histories"
                  :key="i"
                >
                  <div class="flex-fill">
                    <strong>{{ item.order_status_name }}</strong>
                    <br />
                    <p>{{ item.status_at }}</p>
                  </div>
                  <div class="text-right flex-fill">
                    <strong>{{ item.created_by.name }}</strong>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-md-12 mt-1" v-if="order.status == 'CANCELED'">
              <h4>Lý do huỷ</h4>
              <p v-if="order.canceled_reason_admin">{{ order.canceled_reason_admin }}</p>
              <span  v-if="order.canceled_reason">
               <b-badge pill variant="danger">{{
                order.canceled_reason.value
              }}</b-badge>
              <b-form-textarea
                v-if="order.canceled_reason.description"
                class="mt-2"
                id="textarea-small"
                size="sm"
                placeholder="Small textarea"
                v-model="order.canceled_reason.description"
                readonly
              ></b-form-textarea>
              <div
                class="row mt-2 ml-1 mr-1"
                v-if="order.canceled_reason.images"
              >
                <a
                  v-if="order.canceled_reason.images"
                  class="col-md-2 col-3"
                  style="padding: 0 3px !important"
                  data-toggle="modal"
                  data-target="#lightbox"
                >
                  <img
                    :src="order.canceled_reason.images + `/h250-w250`"
                    :alt="order.canceled_reason.images"
                  />
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
                          :src="order.canceled_reason.images + `/h250-w250`"
                          :alt="order.canceled_reason.images"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserMenuPanel from "~/components/UserMenuPanel";
import { mapMutations } from "vuex";
import { isMobile } from "~/plugins/util";
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "Chi tiết đơn hàng",
  },
  components: {
    UserMenuPanel,
  },
  data() {
    return {
      start_comment: 5,
      showRating: false,
      ratingStarSize: 50,
      isMobile: false,
      order: null,
      order_statuses: [],
      order_status_name: null,
      reasionCancelOrder: [
        // { id: 1, value: "Muốn thay đổi địa chỉ giao hàng" },
        // { id: 2, value: "Muốn nhâp/thay đổi mã Voucher" },
        // { id: 3, value: "Muốn thay đổi sản phẩm trong đơn hàng" },
        // { id: 4, value: "Thủ tục thanh toán quá rắc rối" },
        // { id: 5, value: "Đổi ý, không muốn mua nữa" },
        // { id: 6, value: "Muốn tìm mua sản phẩm tại cửa hàng gần nhất" },
        // { id: 7, value: "Khác" },
      ],
      selectedReason: {},
      formSelectedReason: {
        value: "",
        group_reason: "",
        images: [],
        description: "",
      },
      widthOffImgOrVideo: [],
      widthVideo: null,
      files: [],
      fileList: [],
      ArrayIdImage: [],
      id_images: [],
      ImagesRender: null,
      showAlertValidateComment: false,
      showAlertLoginComment: false,
      showAlertValidateCommentAnswer: false,
      showAlertLoginCommentAnswer: false,
      arr_content: "",
      text_comment: "",
      text_title_comment: null,
      mediaUrl: null,
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  created() {
    this.getOrder();
    this.getReasonOrder();
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
    createComment() {
      // alert("Tính năng đang phát triển");
      this.showAlertValidateComment = false;
      this.showAlertLoginComment = false;
      let arr_content = this.text_comment;
      this.arr_content = arr_content.replace(/\ /g, ",");
      const order_detail_id = this.$route.query["order-detail-id"]
        ? this.$route.query["order-detail-id"]
        : "";
      const order_id = this.order.id;
      const order_code = this.order.code;
      if (this.text_comment && this.text_comment.length > 0) {
        const formdata = {
          product_id: null,
          content: this.text_comment,
          arr_content: this.arr_content,
          rate: this.start_comment,
          images: [],
          parent_id: null,
          type: "RATESHIPPING",
          hashtag_rates: [],
          order_detail_id: null,
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
              // location.reload();
              this.getOrder();
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
      }
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
    getReasonOrder() {
      this.$store
        .dispatch("order/getReasonCancel", { params: `?limit=9999999` })
        .then((resp) => {
          let arrReasonAndBlacklist = resp.data;
          arrReasonAndBlacklist.filter((item) => {
            if (item && item.type == "REASON") {
              this.reasionCancelOrder.push(item);
            }
          });
        });
    },
    selectReason(reason) {
      if (reason.is_description == 0) {
        if (document.getElementById("description-reason")) {
          let element = document.getElementById("description-reason");
          element.classList.add("display-none");
        }
      }
      if (reason.is_description == 1) {
        if (document.getElementById("description-reason")) {
          let element = document.getElementById("description-reason");
          element.classList.remove("display-none");
        }
      }
      this.formSelectedReason.value = reason.value;
      this.formSelectedReason.group_reason = reason.group_reason;
    },
    getOrder() {
      const id = this.$route.params["id"];
      this.$store.dispatch("app/fetchData", "/v1/orders/" + id).then((data) => {
        this.order = data.data;
        this.order.canceled_reason = JSON.parse(this.order.canceled_reason);

        //this.getOrderStatus();
      });
    },
    getOrderStatus() {
      this.$store.dispatch("user/fetchData", "/order_statuses").then((data) => {
        this.order_statuses = data;
        const status = this.order_statuses.find((item) => {
          return item.order_status_id == this.order.order_status_id;
        });
        // //console.log("status:", status);
        if (status && status.order_status_id) {
          this.order_status_name = status.name;
        }
        // //console.log("this.order_status_name:", this.order_status_name);
      });
    },
    updateOrder(status) {
      this.$store
        .dispatch("app/postData", {
          param: `/v1/order/${this.order["id"]}/hub-update-status`,
          data: { status: status },
        })
        .then((data) => {
          console.log("data order", data);
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$swal({
            title: "Cập nhập đơn hàng thành công",
            icon: "success",
            confirmButtonText: "Xác nhận",
          }).then((result) => {
            if (status == "CANCELED") {
              this.$router.push("/user/order");
            } else {
              this.getOrder();
            }
          });
        })
        .catch((err) => {
          console.log("error update status order:", err);
        });
    },
    async cancelOrder() {
      if (this.selectedReason) {
        const id = this.$route.params["id"];
        this.formSelectedReason.images = this.id_images;
        this.$store
          .dispatch("app/postData", {
            param: `v1/orders/${id}/request-cancel`,
            data: {
              canceled_reason: this.formSelectedReason,
            },
          })
          .then((data) => {
            // location.reload();
            this.getOrder();
          })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      }
    },
    lightBox(item) {
      this.ImagesRender = item;
    },
  },
};
</script>
<style lang="scss">
.progressbar {
  li:before {
    font-size: 27px;
    line-height: 27px;
  }
  li.pr1:before {
    content: "\f217";
  }
  li.pr2:before {
    content: "\f0d6";
  }
  li.pr3:before {
    content: "\f0d1";
  }
  li.pr4:before {
    content: "\f00c";
  }
}
#ratingShipping {
  border: none !important;
  .card-body {
    border: none !important;
  }
}
</style>
