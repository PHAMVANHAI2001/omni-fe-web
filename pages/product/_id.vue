<template>
  <main role="main" class="clearfix main-page">
    <NotificationMedical v-if="NotificationMedical_check"></NotificationMedical>
    <div class="clearfix"></div>
    <div class="isn-mobile">
      <breadcrumbs
        :title="this.$route.matched[0].instances.default.$metaInfo.title"
      ></breadcrumbs>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="main-right">
                <div class="top-detail-product">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="product-gallery-image">
                        <div class="big-product-image">
                          <!-- <img :src="currentProduct.thumbnail + '/h600-w600'" /> -->
                          <inner-image-zoom
                            :src="currentProduct.thumbnail + '/h600-w600'"
                            :zoomSrc="currentProduct.thumbnail + '/h1000-w1000'"
                          />
                        </div>
                        <div id="gal1" class="product-gallery-image-thumb">
                          <client-only>
                            <carousel
                              v-if="
                                currentProduct && currentProduct.gallery_images
                              "
                              :loop="false"
                              :items="5"
                              :nav="true"
                              :dots="false"
                              :margin="5"
                              :navText="navText"
                            >
                              <div
                                v-for="(item,
                                i) in currentProduct.gallery_images"
                                :key="i"
                              >
                                <a>
                                  <img
                                    :src="item.url + '/h110-w110'"
                                    @click="setCurrentImage(item, i)"
                                    class="img-thumb-gal"
                                  />
                                </a>
                              </div>
                              <div>
                                <img
                                  :src="newQRCode"
                                  alt="QRCode"
                                  style="width: 100%; height: 100%;"
                                />
                              </div>
                            </carousel>
                          </client-only>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-7">
                      <div class="products-detail">
                        <div
                          class="flash-sale-form"
                          v-if="
                            !isMobile &&
                              currentProduct.check_flash_sale &&
                              currentProduct.check_flash_sale == 1 &&
                              currentProduct.qty_sale <
                                currentProduct.qty_flash_sale
                          "
                        >
                          <div
                            class="d-flex justify-content-between bg-secondary h-100 border-box"
                          >
                            <div class="logo-flashsale-img">
                              <div class="d-flex">
                                <img
                                  src="~/assets/images/thunder-flashsale-4.png"
                                />
                              </div>
                            </div>
                            <div class="flash-sale-box">
                              <!-- <div class="times-stop">
                                Kết thúc sau: 00:00:00
                              </div> -->
                              <no-ssr>
                                <flip-countdown
                                  class="d-flex flex-row clock-times"
                                  :deadline="end_date"
                                  :showDays="false"
                                ></flip-countdown>
                              </no-ssr>
                            </div>
                            <div
                              class="flash-sale-box text-center"
                              style="width: 300px;"
                            >
                              <div
                                class="d-flex flex-row justify-content-center w-100"
                              >
                                <span class="qty-saled-flash-sale"
                                  >Đã bán {{ currentProduct.qty_sale }} sp
                                  &ensp;</span
                                >
                                <b-progress
                                  :max="currentProduct.qty_flash_sale"
                                  class="w-100"
                                  style="max-width: 150px !important"
                                >
                                  <b-progress-bar
                                    style="height: 100%;display: flex;flex-direction: column;justify-content: center"
                                    :value="currentProduct.qty_sale"
                                  ></b-progress-bar>
                                </b-progress>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flash-sale-form-mb"
                          v-if="
                            isMobile &&
                              currentProduct.check_flash_sale &&
                              currentProduct.check_flash_sale == 1 &&
                              currentProduct.qty_sale <
                                currentProduct.qty_flash_sale
                          "
                        >
                          <div
                            class="d-flex justify-content-between bg-secondary h-100 border-box"
                          >
                            <div
                              class="logo-flashsale-img"
                              style="width: 40% !important;"
                            >
                              <div class="d-flex">
                                <img
                                  src="~/assets/images/thunder-flashsale-3.png"
                                />
                              </div>
                            </div>
                            <div
                              class="text-right pl-2 pr-2 pt-1"
                              style="width: 60%;"
                            >
                              <!-- <div class="times-stop">
                                Kết thúc sau: 00:00:00
                              </div> -->
                              <no-ssr>
                                <flip-countdown
                                  class="clock-times text-right pl-pr-0"
                                  :deadline="end_date"
                                  :showDays="false"
                                ></flip-countdown>
                              </no-ssr>
                              <span
                                >Đã bán {{ currentProduct.qty_sale }} sp
                              </span>
                              <div class="d-flex justify-content-end">
                                <b-progress
                                  :max="currentProduct.qty_flash_sale"
                                  class="w-100"
                                  style="max-width: 150px !important"
                                >
                                  <b-progress-bar
                                    style="height: 100%;display: flex;flex-direction: column;justify-content: center"
                                    :value="currentProduct.qty_sale"
                                  ></b-progress-bar>
                                </b-progress>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h1 class="product-title fs-21">
                          {{ currentProduct.name }}
                        </h1>
                        <div class="pro-review">
                          <div
                            class="haravan-product-reviews-badge"
                            style=""
                            data-id="1024153086"
                          >
                            <p
                              class="d-flex flex-row"
                              style="align-items: center !important;"
                            >
                              <star-rating
                                style="margin-top:-3px !important"
                                :rating="starAvg"
                                :star-size="countStarSizeByUser"
                                :show-rating="showRating"
                                read-only
                              ></star-rating>
                              ({{ totalRate }}
                              <span class="show_mb">&nbsp;đánh giá</span>)
                            </p>
                          </div>
                          <div class="sold-count">
                            <span
                              >Đã bán
                              <span
                                >{{ currentProduct.sold_count_formatted }} sản
                                phẩm</span
                              ></span
                            >
                          </div>
                        </div>
                        <nuxt-link
                          to="/ranking-bestseller?top-sale=top-sale"
                          v-if="rankingAllNow"
                        >
                          <div class="ranking-productAll">
                            <span
                              ><b>#{{ rankingAllNow }} Bán chạy</b></span
                            >
                          </div>
                        </nuxt-link>
                        <!-- <div class="d-flex">
                          <nuxt-link
                            to="/ranking-bestseller?top-sale=top-sale"
                            v-if="rankingAllNow"
                          >
                            <div class="ranking-productAll">
                              <span
                                ><b>#{{ rankingAllNow }} Bán chạy</b></span
                              >
                            </div>
                          </nuxt-link>
                          <nuxt-link
                            to="/ranking-bestseller?top-sale=top-sale"
                            v-if="rankingCatNow"
                          >
                            <div class="ranking-category">
                              <span
                                ><b>#{{ rankingCatNow }} Danh mục</b></span
                              >
                            </div>
                          </nuxt-link>
                        </div> -->

                        <div
                          class="pro-review"
                          v-if="
                            currentProduct.product_gift &&
                              currentProduct.product_gift.length > 0
                          "
                        >
                          <!-- <div class="haravan-product-reviews-badge">
                            <h5>
                              <i
                                class="fa fa-gift"
                                style="color: red !important"
                              ></i>
                              <span style="color: red !important"
                                >({{ currentProduct.gift_item.length }}) Quà
                                tặng:
                              </span>
                              <span style="color: #006e43 !important">{{ currentGiftItem }}</span>
                            </h5>
                          </div> -->
                          <b-alert variant="success" show class="w-100">
                            <p>
                              Nhấn vào (<i
                                class="fa fa-question-circle"
                                style="color: #eb1e51"
                              ></i
                              >) để xem chi tiết chương trình nhận quà ưu đãi !
                            </p>
                            <h5 class="color-nuti">
                              ({{ currentProduct.product_gift.length }}) Quà
                              tặng 0đ:
                            </h5>
                            <div
                              v-for="(gift, g) in currentProduct.product_gift"
                              :key="g"
                              class="mb-1"
                            >
                              <a
                                data-toggle="modal"
                                data-target="#modalDetailGiftItem"
                                @click="getDetailGiftItem(gift)"
                              >
                                <i
                                  class="fa fa-question-circle"
                                  style="color: #eb1e51"
                                ></i>
                              </a>
                              {{ gift.product_name }}
                              <div
                                class="modal fade bd-example-modal-lg"
                                id="modalDetailGiftItem"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalCenterTitle"
                                aria-hidden="true"
                              >
                                <div
                                  class="modal-dialog modal-lg modal-dialog-centered"
                                  role="document"
                                >
                                  <div class="modal-content">
                                    <div
                                      class="modal-header header-detail-gift-item"
                                    >
                                      <h5 class="float-right">
                                        <a data-dismiss="modal">
                                          <i class="fa fa-times-circle"></i>
                                        </a>
                                      </h5>
                                      <h5
                                        class="modal-title"
                                        id="exampleModalLongTitle"
                                      >
                                        <b>Quà tặng 0đ</b>
                                      </h5>
                                    </div>
                                    <div class="modal-body">
                                      <div class="row">
                                        <div class="col-md-5 col-12" v-if="detailGiftItem.thumbnail">
                                          <img
                                            :src="detailGiftItem.thumbnail"
                                            alt=""
                                            width="100%"
                                          />
                                        </div>
                                        <div class="col-12" :class="detailGiftItem.thumbnail ? 'col-md-7' : 'col-md-12'">
                                          <h4>
                                            {{ detailPromotion.name }}
                                          </h4>
                                          <h2 class="title-detail-gift-item">
                                            {{ detailGiftItem.name }}
                                          </h2>
                                          <p>
                                            {{
                                              detailGiftItem.short_description
                                            }}
                                          </p>
                                        </div>
                                      </div>
                                      <div class="container" v-if="PromotionProgram">
                                        <img v-if="PromotionProgram.thumbnail" :src="PromotionProgram.thumbnail" alt="" class="w-100">
                                        <div v-if="PromotionProgram.description" v-html="PromotionProgram.description">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                        v-if="!isMobile"
                                      >
                                        Đóng
                                      </button>
                                      <nuxt-link
                                        :to="{
                                          path: `/promotion/${detailPromotion.id}`,
                                        }"
                                        type="button"
                                        class="btn btn-primary"
                                        data-dismiss="modal"
                                      >
                                        Xem chi tiết khuyến mãi
                                      </nuxt-link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </b-alert>
                        </div>

                        <span
                          v-if="currentProduct['qty'] == 0"
                          class="badge badge-danger"
                          >Hết hàng</span
                        >
                        <p v-if="currentProduct.manufacturer">
                          Thương hiệu:
                          <strong>{{ currentProduct.manufacturer }}</strong>
                        </p>

                        <div
                          class="row "
                          v-bind:class="[
                            currentProduct.check_flash_sale == 1
                              ? 'flash-box'
                              : 'bor-t-mobile',
                          ]"
                        >
                          <div class="col-md-12 col-xs-12 price_item" v-if="currentProduct && currentProduct.promotion_price">
                            <h3 class="product-price-detail">
                              <span class="hidden-xs hidden-sm">Giá: </span>

                              <h5
                                class="price-detail"
                                v-if="currentProduct.promotion_price"
                              >
                                {{ currentProduct.special_formatted }}
                              </h5>
                              <h4
                                v-bind:class="{
                                  has_special: currentProduct.promotion_price,
                                }"
                                class="price-detail"
                              >
                                {{ currentProduct.price_formatted }}
                              </h4>
                              <span
                                class="text-right save-price"
                                v-if="currentProduct.promotion_price"
                              >
                                <label>Tiết kiệm:</label>
                                {{ currentProduct.special_percentage_formatted }}
                              </span>
                            </h3>
                          </div>
                          <!-- <div class="col-md-12 col-xs-12 price_item" v-if="currentProduct && !currentProduct.promotion_price">
                            <h3 class="product-price-detail">
                              <span class="hidden-xs hidden-sm">Giá: </span>

                              <h5
                                class="price-detail"
                                v-if="!currentProduct.promotion_price && currentProduct.old_product_price != currentProduct.price"
                              >
                                {{ currentProduct.price_formatted }}
                              </h5>
                              <h4
                                v-if="currentProduct.old_product_price"
                                v-bind:class="{
                                  has_special: currentProduct.price,
                                }"
                                class="price-detail"
                              >
                                {{ currentProduct.old_product_price_formatted }}
                              </h4>
                              <span
                                class="text-right save-price"
                                v-if="!currentProduct.promotion_price && currentProduct.old_product_price && currentProduct.old_product_price != currentProduct.price"
                              >
                                <label>Tiết kiệm:</label>
                                {{ currentProduct.percentage_price_old }}
                              </span>
                            </h3>
                          </div> -->
                          <section class="col-md-12" v-if="shippingAddressActive">
                           Giao đến:<b class="col-md-12 p-0" @click="showLstAddressModal(shippingAddressActive)">
                              {{shippingAddressActive['ward_name']}},
                              {{shippingAddressActive['district_name']}},
                              {{shippingAddressActive['city_name']}} <span style="color: rgb(13, 92, 182)"> - Đổi địa chỉ </span>
                            </b>
                            <span v-if="currentProduct['notify']" class="pull-left mt-2 mb-2 clear d-flex border-radius text-left notify p-1 col-md-12">
                              <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                              </i>
                            <p class="m-0 text-notify">{{ currentProduct["notify"] }}</p>
                        </span>
                          </section>

                            <b-button v-b-modal.modal-1
                            v-if="couponProductCate && couponProductCate.length > 0"
                              class="counponNumber mt-2"
                            >{{couponProductCate.length}} Mã giảm giá
                            </b-button>
                            <div v-if="couponProductCate && couponProductCate.length > 0" class="style__StyledCoupon-sc-8bmb3t-0" data-view-id="pdp_main_discount_coupon">                          
                              <div>
                                <div class="d-flex flex-row bd-highlight mb-3" style="margin: 35px 0px 0px -157px;">
                                  <div class="p-2 bd-highlight coupon"
                                  v-for="item in couponProductCate.slice(0, 3)"
                                  :key="item.id"
                                  >{{ item.name }}
                                  </div>
                                </div>
                                  <b-modal id="modal-1" title="Mã Giảm Giá">
                                    <div class="style__StyledCouponList-sc-pa3tn-0 coQDDu coupon-list">
                                      <div class="style__StyledWrap-sc-pa3tn-1 eKRrSx">
                                          <div class="sc-jrsJWt bJoZof coupon-item" type="full"
                                            v-for="item in couponProductCate"
                                            :key="item.id">
                                            <div class="sc-fujyAs HRJop" type="full">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 132" class="coupon-bg">
                                                  <g fill="none" fill-rule="evenodd">
                                                      <g>
                                                        <g>
                                                            <g>
                                                              <g>
                                                                  <g>
                                                                    <g transform="translate(-3160 -2828) translate(3118 80) translate(42 2487) translate(0 140) translate(0 85) translate(0 36)">
                                                                        <path fill="#FFF" d="M392 0c4.418 0 8 3.582 8 8v116c0 4.418-3.582 8-8 8H140.5c0-4.419-3.582-8-8-8s-8 3.581-8 8H8c-4.418 0-8-3.582-8-8V8c0-4.418 3.582-8 8-8h116.5c0 4.418 3.582 8 8 8s8-3.582 8-8H392z"></path>
                                                                        <g stroke="#EEE" stroke-dasharray="2 4" stroke-linecap="square" mask="url(#14s2l20tnb)">
                                                                          <path d="M0.5 0L0.5 114" transform="translate(132 11)"></path>
                                                                        </g>
                                                                    </g>
                                                                  </g>
                                                              </g>
                                                            </g>
                                                        </g>
                                                      </g>
                                                  </g>
                                                </svg>
                                                <div class="sc-iqAclL jibPFy">
                                                  <div class="sc-iklJeh hbusih">
                                                      <div class="sc-jJMGnK cZpIMl">
                                                        <a class="sc-hKFxyN kksiKu" href="#">
                                                            <div class="sc-bdnxRM bzixtu">
                                                              <img src="../../assets/images/icon/free.jpg" />
                                                            </div>
                                                        </a>
                                                      </div>
                                                </div>
                                                <div class="sc-iJCRrE bojiJp">
                                                  <button class="sc-cxNHIi fHUQtx" data-view-id="cart_coupon_view.coupon.rule" aria-describedby="popup-1" style="position: absolute; top: 12px; right: 12px; transform: translate(8px, -8px);">
                                                  <a class="float-right info-coupon-position" :id="item.code">
                                                    <i class="fa fa-question-circle color-nuti"></i>
                                                  </a>
                                                  <b-tooltip
                                                    :target="item.code"
                                                    triggers="hover"
                                                    placement="bottom"
                                                  >
                                                    <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                                      <div class="col-4 pl-1 pr-1 text-left">Mã:</div>
                                                      <div class="col-8 pl-1 pr-1 text-left">
                                                        <div v-html="item.name"></div>
                                                      </div>
                                                    </div>
                                                    <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                                      <div class="col-4 pl-1 pr-1 text-left">Hạn sử dụng:</div>
                                                      <div class="col-8 pl-1 pr-1 text-left">
                                                        {{ item.date_end }}
                                                      </div>
                                                    </div>
                                                    <div class="row ml-0 mr-0 pl-pr-0 mt-3 mb-3">
                                                      <div class="col-12 pl-1 pr-1 text-left">Điều kiện:
                                                      <div v-html="item.content"></div>
                                                      </div>
                                                    </div>
                                                  </b-tooltip>
                                                  </button>
                                                  
                                                  <div style="padding-right: 28px;">
                                                    <h4 class="sc-hBMUJo droGGV">{{ item.name }}</h4>
                                                    <p v-html="item.content" class="sc-fnVZcZ hmqpxx"></p>
                                                  </div>
                                                  <div class="sc-ezzafa dvHFX">
                                                    <p class="sc-fnVZcZ hmqpxx" style="padding-right: 8px;">HSD: {{ item.date_end }}</p>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                    <template #modal-footer="{ close }">
                                      <b-button size="sm" variant="secondary" @click="close()">
                                        Đóng
                                      </b-button>
                                    </template>
                                  </b-modal>
                              </div>
                            </div>
                          <div
                            class="col-md-12 col-xs-12 variant_item"
                            v-if="
                              currentProduct.property_variant &&
                                currentProduct.property_variant.length > 0
                            "
                          >
                            <div
                              class=""
                              v-for="item in currentProduct.property_variant"
                              :key="item.id"
                            >
                              <p class="variant_name">{{ item.name }}</p>
                              <div class="variant_properties row">
                                <button
                                  v-for="items in item.variant"
                                  :key="items.id"
                                  class="variant-btn"
                                  @click="getProductWithVariant(items)"
                                >
                                  <span>
                                    <p>{{ items.name }}</p></span
                                  >
                                </button>

                                <!-- <a v-for="items in item.variant" :key="items.id" @click="getProductWithVariant(items)">
                                      <div class="variant-btn">
                                        <span> <p>{{items.name}}</p></span>
                                      </div>
                                  </a> -->
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-md-12 col-xs-12 variant_item"
                            v-if="currentProduct.attribute_info && currentProduct.attribute_info.length"
                          >
                            <div class="attribute_info">
                              <div
                                class="attribute row"
                                v-for="item in currentProduct.attribute_info"
                                :key="item.id"
                              >
                                <p
                                  class="attribute_name col-sm-4 col-lg-4 col-5"
                                >
                                  {{ item.key }}
                                </p>
                                <p
                                  class="attribute_properties col-sm-6 col-lg-6 col-6"
                                >
                                  {{ item.value }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            class="product-versions"
                            v-if="
                              currentProduct &&
                                currentProduct.versions &&
                                currentProduct.versions.length
                            "
                          >
                            <div class="mt-3">Phiên bản cùng loại</div>

                            <nuxt-link
                              @click="viewProductVersion(item)"
                              v-for="(item, j) in currentProduct.versions"
                              :key="j"
                              class="version-item"
                              :to="{ path: '/product/' + item.slug }"
                            >
                              <h4>{{ item.version }}</h4>
                              <p>{{ item.price_formatted }}</p>
                            </nuxt-link>
                          </div>
                        </div>
                        <!-- Variant 
                  NẾU CHƯA TẠO variant thì ko hiện attribute để chọn.
                      -->
                        <div
                          class="select-swatch clearfix"
                          v-if="
                            currentProduct.variants &&
                              currentProduct.variants.length
                          "
                        >
                          <div
                            class="swatch clearfix"
                            v-bind:class="[
                              item.attribute_group.type == 'COLOR'
                                ? 'borderImgRadius'
                                : '',
                            ]"
                            v-for="(item,
                            i) in currentProduct.productAttributes"
                            :key="i"
                          >
                            <div class="header-swatch">
                              {{ item.attribute_group.name }}
                              <span class="nameColor">
                                {{
                                  variantList && variantList[i]
                                    ? variantList[i].name
                                    : ""
                                }}
                              </span>
                            </div>
                            <div
                              class="select-swap"
                              v-if="variantList && variantList[i]"
                            >
                              <div
                                class="swatch-element"
                                v-bind:class="[
                                  item.attribute_group.type == 'COLOR'
                                    ? 'color'
                                    : '',
                                ]"
                                v-for="(variant, j) in item.details"
                                :key="j"
                                @click="
                                  _selectedVariant(
                                    item.attribute_group.type,
                                    variant
                                  )
                                "
                              >
                                <input
                                  class="variant-0"
                                  id
                                  type="radio"
                                  name="option2"
                                  v-bind:class="[
                                    variantList[i].id ==
                                      variant.product_attribute_id &&
                                    variantList[i].type ==
                                      item.attribute_group.type
                                      ? 'sd'
                                      : '',
                                  ]"
                                />
                                <label
                                  v-bind:class="[
                                    variantList[i].id ==
                                      variant.product_attribute_id &&
                                    variantList[i].type ==
                                      item.attribute_group.type
                                      ? 'sd'
                                      : '',
                                  ]"
                                >
                                  <span
                                    v-if="item.attribute_group.type == 'LABEL'"
                                    >{{ variant.value }}</span
                                  >
                                  <span
                                    v-if="item.attribute_group.type == 'COLOR'"
                                    v-bind:style="{ background: variant.value }"
                                    class="color"
                                  ></span>
                                  <img
                                    v-if="item.attribute_group.type == 'IMAGE'"
                                    class="crossed-out"
                                    v-bind:src="variant.value"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- End Variant -->

                        <div
                          class="buy-group-component"
                          v-if="
                            currentProduct['qty'] > 0 &&
                              currentProduct.price > 0
                          "
                        >
                          <div class="row">
                            <div class="col-4 col-sm-6 col-md-4 row">
                              <div
                                class="qty-update-group d-inline-flex"
                                style="margin: 5px 20px !important;"
                              >
                                <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      @click="decrementQty"
                                      class="btn btn-number"
                                      type="button"
                                      data-type="minus"
                                    >
                                      <span class="fa fa-minus"></span>
                                    </button>
                                  </span>
                                  <input
                                    class="form-control input-number"
                                    id="qty"
                                    type="number"
                                    pattern="[0-9]*"
                                    name="qty"
                                    min="1"
                                    v-model.trim="quantity"
                                    @change="onChange($event)"
                                    max="100"
                                  />
                                  <span class="input-group-btn">
                                    <button
                                      @click="incrementQty"
                                      class="btn btn-number"
                                      type="button"
                                      data-type="plus"
                                    >
                                      <span class="fa fa-plus"></span>
                                    </button>
                                  </span>
                                </div>
                              </div>

                              <div
                                @click="addWishlist(currentProduct)"
                                v-if="!isLike"
                                class="heart-wishlist none-mobile "
                              >
                                <img
                                  class="like-icon"
                                  src="/images/heart.png"
                                  width="30px"
                                  height="30px"
                                  alt="like"
                                />
                              </div>
                              <div
                                @click="deleteWishlist(currentProduct)"
                                v-if="isLike"
                                class="heart-wishlist none-mobile"
                              >
                                <img
                                  class="like-icon"
                                  src="/images/heart_red.png"
                                  width="30px"
                                  height="30px"
                                  alt="like"
                                />
                              </div>
                            </div>
                            <div
                              class="col-4 col-sm-6 col-md-4 text-left pl-pr-0"
                            >
                              <section class="none-mobile">
                                <div
                                  v-if="currentProduct['qty'] > 0"
                                  class="add-to-cart-detail"
                                  @click="addToCart(currentProduct)"
                                >
                                  <span>
                                    <p>
                                      <i class="fa fa-cart-plus"></i> Thêm vào
                                      giỏ hàng
                                    </p>
                                  </span>
                                </div>
                              </section>

                              <section class="none-desktop">
                                <div
                                  v-if="currentProduct['qty'] > 0"
                                  class="add-to-cart-detail"
                                  @click="addToCart(currentProduct)"
                                  style="background-color: #ff9900 !important"
                                >
                                  <span
                                    ><p style="padding: 5px 0 0 0 !important;">
                                      Thêm vào<br />giỏ hàng
                                    </p></span
                                  >
                                </div>
                              </section>
                            </div>
                            <div
                              class="col-4 col-sm-6 col-md-4 text-left pl-pr-0"
                            >
                              <nuxt-link to="/checkout/shipping">
                                <div
                                  v-if="currentProduct['qty'] > 0"
                                  class="add-to-cart-detail"
                                  @click="addToCart(currentProduct)"
                                  style="background-color: #136f43 !important"
                                >
                                  <span> <p>Mua ngay</p></span>
                                </div>
                              </nuxt-link>
                            </div>
                          </div>
                        </div>
                        <div class="btn-group-buy-mobile">
                          <div class="d-flex flex-row">
                            <div
                              class="col-4 d-flex justify-content-center pl-pr-0"
                            >
                              <div class="qty-update-group d-inline-flex">
                                <!-- <div class="input-group">
                                  <span class="input-group-btn">
                                    <button
                                      @click="decrementQty"
                                      class="btn btn-number"
                                      type="button"
                                      data-type="minus"
                                    >
                                      <span class="fa fa-minus"></span>
                                    </button>
                                  </span>
                                  <input
                                    class="form-control input-number"
                                    type="tel"
                                    name="qty"
                                    value="1"
                                    min="1"
                                    v-model="quantity"
                                    max="100"
                                  />
                                  <span class="input-group-btn">
                                    <button
                                      @click="incrementQty"
                                      class="btn btn-number"
                                      type="button"
                                      data-type="plus"
                                    >
                                      <span class="fa fa-plus"></span>
                                    </button>
                                  </span>
                                </div> -->
                                <b-form-spinbutton
                                  id="sb-inline"
                                  v-model="quantityMB"
                                  inline
                                  min="1"
                                  max="100"
                                  name="qty"
                                ></b-form-spinbutton>
                              </div>
                            </div>
                            <div
                              class="col-4 d-flex justify-content-center pl-pr-0"
                            >
                              <div
                                v-if="currentProduct['qty'] > 0"
                                class="add-to-cart-detail"
                                @click="addToCart(currentProduct)"
                                style="background: none !important; box-shadow: 1px 1px 2px #000"
                              >
                                <a
                                  ><span
                                    ><p
                                      class="color-nuti"
                                      style="padding:5px 10px 0px 10px !important;"
                                    >
                                      Thêm vào<br />giỏ hàng
                                    </p></span
                                  ></a
                                >
                              </div>
                            </div>
                            <div
                              class="col-4 d-flex justify-content-center pl-pr-0"
                            >
                              <div
                                v-if="currentProduct['qty'] > 0"
                                class="add-to-cart-detail"
                                @click="addToCart(currentProduct)"
                                style="background-color: #136f43 !important; box-shadow: 1px 1px 2px #000"
                              >
                                <nuxt-link
                                  to="/checkout/shipping"
                                  class="text-white"
                                >
                                  <span> <p>Mua ngay</p></span>
                                </nuxt-link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="short_des_detail"
                          v-if="currentProduct.short_description"
                          v-html="currentProduct.short_description"
                        ></div>
                        <div
                          class="short_des_detail"
                          v-if="!currentProduct.short_description"
                        >
                          Chưa có mô tả
                        </div>
                        <div class="d-flex">
                          <social-sharing
                            :image="currentProduct.thumbnail"
                            :url="href"
                            :title="currentProduct.name"
                            :description="currentProduct.short_des"
                            hashtags
                            inline-template
                          >
                            <div class="share-buttons">
                              <network
                                class="share-facebook"
                                network="facebook"
                              >
                                <i class="fa fa-facebook"></i>
                              </network>
                              <network network="skype">
                                <i class="fa fa-skype"></i>
                              </network>
                              <network network="twitter">
                                <i class="fa fa-twitter"></i>
                              </network>
                              <network network="linkedin">
                                <i class="fa fa-linkedin"></i>
                              </network>
                            </div>
                          </social-sharing>
                          <div
                            class="share-buttons"
                            style="margin-left: 5px"
                            @click="copyLinkToClipboard"
                          >
                            <span><i class="fa fa-link"></i></span>
                          </div>
                        </div>

                        <section class="section container">
                          <SkinnyBanner
                            :SkinnyItem="bannersSkinny"
                            data-aos="fade-up"
                          ></SkinnyBanner>
                        </section>

                        <!-- <div class="mt-3">
                          <img :src="newQRCode" alt="QRCode" />
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="clearfix"></div>

          <ShopInfo
            v-if="currentProduct.shop_info && currentProduct.shop_info['id']"
            :shop="currentProduct.shop_info"
          ></ShopInfo>

          <div class="row">
            <div class="col-md-12">
              <div class="widget">
                <div class="widget-title">Thông tin</div>
                <div class="widget-content">
                  <div
                    class="product-tab product-description"
                    v-html="currentProduct.description"
                  ></div>
                </div>
              </div>

              <div id="CustomerRateComment">
                <CustomerRateComment
                  :product="currentProduct_id"
                ></CustomerRateComment>
              </div>
            </div>
          </div>
          <!-- <section class="section container">
            <SkinnyBanner
              :SkinnyItem="bannersSkinny"
              data-aos="fade-up"
            ></SkinnyBanner>
          </section> -->
          <section class="section container" :class="[isMobile ? 'mb-6' : '']">
            <nuxt-link
              :to="{ path: `/product` }"
              class="float-right text-primary pt-1"
              data-aos="fade-up"
              ><small>Xem thêm</small></nuxt-link
            >
            <h3
              class="the-title section-title mb-2 font-bold"
              data-aos="fade-up"
            >
              Sản phẩm dành cho bạn
            </h3>
            <client-only style="padding: 0px 25px !important;">
              <div class="hot-deal">
                <carousel
                  :perPageCustom="[
                    [320, 2],
                    [768, 3],
                    [767, 3],
                    [1024, 4],
                    [1200, 5],
                  ]"
                  :loop="true"
                  :paginationEnabled="false"
                  :navigationEnabled="true"
                  :scrollPerPage="false"
                >
                  <slide
                    class="product-slide "
                    v-for="(item, i) in productAll1"
                    :key="i"
                  >
                    <Product
                      :item="item"
                      data-aos="fade-up"
                      class="product-item"
                    ></Product>
                  </slide>
                </carousel>
              </div>
            </client-only>
          </section>
          <!-- <ProductsBrand BrandItem="BRAND-BANNER-FAMMA"></ProductsBrand> -->
        </div>
      </div>
    </div>
    <LstAddress  @setDefaultAddress="setDefaultAddress" :lstAddress="lstAddress"></LstAddress>
    <br />
    <br />
  </main>
  <!-- /.container -->
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";
import NotificationMedical from "~/components/NotificationMedical";
import ProductsBrand from "~/components/ProductsComponent/ProductsBrand";
import InnerImageZoom from "~/node_modules/vue-inner-image-zoom";
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import ProductsBestsellers from "~/components/ProductsBestsellers";
import ShopInfo from "~/components/ShopInfo";
import ProductRelated from "~/components/ProductRelated";
import CustomerRateComment from "~/components/CustomerRateComment";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Product from "~/components/Product";
import PaginationVue from "~/components/Pagination.vue";
import SkinnyBanner from "~/components/Banners/SkinnyBanner";
import * as R from "ramda";
import Breadcrumbs from "~/components/builders/Breadcrumbs.vue";
import QRious from "~/node_modules/qrious";
import { isMobile, isIndex } from "~/plugins/util";
import $ from "jquery";
import LstAddress from "~/components/LstAddress";
// let carousel;
// let ezPlus;
// if (process.client) {
//   carousel = require("vue-owl-carousel");
//   // ezPlus = require("ez-plus");
// }

export default {
  data() {
    return {
      lstAddress: [],
      shippingAddressActive: null,
      islogged: null,
      currentProduct_id: {},
      baseUrl: null,
      end_date: "2021-12-25 00:00:00",
      arrProduct_id: [],
      brand_id: [],
      products_data_sort: [],
      NotificationMedical_check: false,
      countStarSizeByUser: 15,
      isMobile: false,
      bannersSkinny: [],
      productAll1: null,
      tempt: null,
      countText: false,
      rating: 4,
      starSize: 15,
      showRating: false,
      currentPrice: 0,
      selectedVariant: {},
      variantList: [],
      qrcode: new QRious(),
      showAlertValidateQuestion: false,
      showAlertLoginQuestion: false,
      showAlertValidateComment: false,
      showAlertLoginComment: false,
      showAlertValidateQuestionAnswer: false,
      showAlertLoginQuestionAnswer: false,
      showAlertValidateCommentAnswer: false,
      showAlertLoginCommentAnswer: false,
      one_start: 0,
      two_start: 0,
      three_start: 0,
      four_start: 0,
      five_start: 0,
      average_start: 0,
      showMoreAnswerQuestionArr: [],
      showMoreAnswerCommentArr: [],
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
      text_title_comment: "",
      text_comment: "",
      start_comment: 3,
      text_question: "",
      quantity: 1,
      posts: [],
      href: null,
      currentProduct: {},
      currentImage: { thumbnail: "" },
      selected: null,
      isLike: false,
      commandProduct: null,
      modalShow: false,
      formInput: false,
      formInputComment: false,
      formInputQuestion: false,
      wishlist: [],
      questionCount: 0,
      commentCount: 0,
      commentList: [],
      commentListTemp: [],
      questionList: [],
      questionListTemp: [],
      parent_id: null,
      parent_id_answer: null,
      textAnswerComment: "",
      textAnswerQuestion: "",
      currentGiftItem: "",
      quantityMB: 1,
      starAvg: null,
      totalRate: null,
      rankingAllNow: null,
      rankingCatNow: null,
      ArrVariantId: [],
      couponProductCate: [],
      PromotionProgram: null,

      listCommentChild: [],
      showMoreQuestionBool: false,
      showMoreCommentBool: false,
      filter1: {
        selected: "Có hình ảnh",
        options: [
          { value: "1", text: "Có hình ảnh" },
          { value: "2", text: "Hữu ích" },
          { value: "3", text: "Mới nhất" },
        ],
      },
      filter2: {
        selected: "Khách hàng đã mua",
        options: [
          { value: "1", text: "Khách hàng đã mua" },
          { value: "2", text: "Tất cả khách hàng" },
        ],
      },
      filter3: {
        selected: "Tất cả sao",
        options: [
          { value: "1", text: "Tất cả sao" },
          { value: "2", text: "5 sao" },
          { value: "3", text: "4 sao" },
          { value: "4", text: "3 sao" },
          { value: "5", text: "2 sao" },
          { value: "6", text: "1 sao" },
          { value: "7", text: "Hài lòng" },
          { value: "8", text: "Chưa hài lòng" },
        ],
      },
      y_offsetWhenScrollDisabled: 0,
      detailGiftItem: {},
      detailPromotion: {
        id: null,
        name: "",
      },
    };
  },
  async asyncData({ store, params }) {
    store.dispatch("app/showLoadingOverlay", true);
    return store
      .dispatch("products/detail", { slug: params["id"] })
      .then((data) => {
        sessionStorage.setItem("product_id", JSON.stringify( data.data));
        store.dispatch("app/showLoadingOverlay", false);
        return {
          currentProduct: data.data,
          currentImage: {
            thumbnail: data.data.thumbnail,
          },
        };
      })
      .catch((err) => {
        store.dispatch("app/showLoadingOverlay", false);
      });
  },
  head() {
    return {
      title: this.currentProduct.name,
      meta: [
        {
          hid: "og:url",
          name: "og:url",
          property: "og:url",
          content: this.currentProduct.url,
        },
        {
          hid: "description",
          name: "description",
          property: "description",
          content: this.currentProduct.short_des,
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content: this.currentProduct.short_des,
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: this.currentProduct.name,
        },
        {
          hid: "og:image",
          name: "og:image",
          property: "og:image",
          content: this.currentProduct.thumbnail,
        },
        {
          hid: "og:image:secure_url",
          name: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.currentProduct.thumbnail,
        },
        {
          hid: "og:image:alt",
          name: "og:image:alt",
          property: "og:image:alt",
          content: this.currentProduct.thumbnail,
        },
        {
          hid: "og:image:width",
          name: "og:image:width",
          property: "og:image:width",
          content: "1200",
        },
        {
          hid: "og:image:height",
          name: "og:image:height",
          property: "og:image:height",
          content: "630",
        },
      ],
      script: [
        {
          src:
            "https://cdn.rawgit.com/igorlino/elevatezoom-plus/1.1.6/src/jquery.ez-plus.js",
        },
        { src: "/js/main.js" },
      ],
    };
  },

  components: {
    FlipCountdown,
    ProductsBrand,
    "inner-image-zoom": InnerImageZoom,
    ProductSidebarCategory: ProductSidebarCategory,
    ProductsBestsellers: ProductsBestsellers,
    ProductRelated: ProductRelated,
    // carousel,
    CustomerRateComment,
    ValidationProvider,
    ValidationObserver,
    SkinnyBanner,
    ShopInfo,
    pagination: PaginationVue,
    Product,
    breadcrumbs: Breadcrumbs,
    NotificationMedical,
    LstAddress
  },
  mounted() {
    if (!process.server) {
      this.baseUrl = process.env.BASE_URL;
      this.isMobile = isMobile();
    }
    if (this.currentProduct.product_gift) {
      const arrayGiftItem = [];
      this.currentProduct.product_gift.map((item) => {
        arrayGiftItem.push(item.name);
      });
      this.currentGiftItem = arrayGiftItem.join(", ");
    }
  },
  created() {
    this.couponProdutCate();
    this.NotificationMedical_f();
    this.getSkinnyBannerAds();
    this.getProductAll(1);
    this.getProductRanking();
    if (!process.server) {
      this.islogged = localStorage.getItem("id_token");
      this.href = window.location.href;
    }
    if(this.islogged) this.getShippingAddress();
    this.getDetail();
    // this.getWishlist(this.currentProduct)
    //   .then(value => {
    //     this.isLike = value;
    //   })
    //   .catch(error => {});

    // this.getQuestion();
    // this.getComment();
  },
  computed: {
    newQRCode() {
      this.qrcode.value = `NTF-${this.currentProduct.id}`;
      return this.qrcode.toDataURL();
    },
  },
  methods: {
    getDetail() {
      this.$store
      .dispatch("products/detail", { slug: this.$route.params["id"] })
      .then((data) => {
        this.currentProduct_id = data.data
        this.currentProduct = data.data;
        if (this.currentProduct.flash_sale) {
          this.currentProduct.flash_sale.forEach(item => {
            if(item && item.end_date) {
              this.end_date = this.currentProduct.flash_sale[0].end_date;
            }
          })
          
        }
        this.starAvg = this.currentProduct.star.avg_star.avg;
        this.totalRate = this.currentProduct.star.total_rate.total;
        // this.variantList = data.data.productAttributes
        //   ? data.data.productAttributes.map(item => {
        //       return {
        //         id: item.details[0].product_attribute_id,
        //         name: item.details[0].name,
        //         type: item.attribute_group.type
        //       };
        //     })
        //   : null;
        this.checkVariant(this.currentProduct.variants, this.variantList);
        this.currentImage = {
          thumbnail: data.data.thumbnail,
        };
        // this.qrcode = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=http://sieuthisieure.com/scan-order?product_id=${this.currentProduct["id"]}`;
      });
    },
    setDefaultAddress() {
      this.getShippingAddress();
      this.getDetail();
    },
    getShippingAddress() {
      this.$store.dispatch("user/getShippingAddress")
      .then((res) => {
        this.lstAddress = res && res['data'];
        this.shippingAddressActive = res && res['data'].find((item) => item["is_default"] == 1);
      })
    },
    couponProdutCate() {
      let cate = this.currentProduct && this.currentProduct.coupon_by_cate_id;
      let product = this.currentProduct && this.currentProduct.coupon_by_product_id;
      this.couponProductCate = product && cate ? [...cate, ...product] : [];
    },
    getDetailGiftItem(gift) {
      if (gift) {
        this.detailPromotion.id = gift.id_promotion;
        this.detailPromotion.name = gift.promotion_name;
        if (gift.id_product) {
          this.$store
            .dispatch("products/detailById", gift.id_product)
            .then((resp) => {
              this.detailGiftItem = resp.data;
            });
        }
        if (gift.id_promotion) {
          this.$axios
            .get(`/v1/client/promotion-program/${gift.id_promotion}`)
            .then((resp) => {
              this.PromotionProgram = resp.data;
              console.log("PromotionProgram", this.PromotionProgram);
            })
            .catch((err) => {
              // //console.log("get banner error:", err);
            });
        }
      }
    },
    disableScroll() {
      this.y_offsetWhenScrollDisabled = $(window).scrollTop();
      $("body")
        .addClass("scrollDisabled")
        .css("margin-top", -this.y_offsetWhenScrollDisabled);
    },

    NotificationMedical_f() {
      var id_cat = this.currentProduct && this.currentProduct.category_ids && this.currentProduct.category_ids.includes("289");
      if (id_cat) {
        this.disableScroll();
        this.NotificationMedical_check = true;
      }
    },
    getProductWithVariant(Variant) {
      // this.ArrVariantId.push(Variant.id)
      // this.$store
      //   .dispatch("products/getProduct", {
      //     params: `?limit=10&variant_ids=${Variant.id}&status=1`,
      //   })
        // .then((resp) => {
          // const ProductVariant = resp.data.data;
          // const ProductCheck = [];
          // const brand_name = [];

          // ProductVariant.forEach((item) => {
          //   this.currentProduct.property_variant.filter((item) => {
          //     if (item.property_code == "BRAND") {
          //       this.brand_id = item.variant;
          //       ProductCheck.push(item);
          //     }
          //   });
          // });

          // if (resp && ProductCheck.length > 1) {
            const arrGroup = [];
            const cat = this.currentProduct.category_ids.split(",");
            this.currentProduct.property_variant.filter((item) => {
              if (item.property_code == "BRAND") {
                this.brand_id = item.variant;
              }
            });
            this.brand_id.forEach((item) => {
              arrGroup.push(item);
            });
            arrGroup.push(Variant);
            let group = arrGroup.reduce((r, a) => {
              r[a.property_id] = [...(r[a.property_id] || []), a];
              return r;
            }, {});

            const param_sort = {};
            param_sort.data = group;
            // param_sort.category = cat;
            param_sort.limit = 250;

            this.$store
              .dispatch("products/getProductFilter", param_sort)
              .then((resp) => {
                if (resp && resp.data) {
                  resp.data.forEach((item) => {
                    this.arrProduct_id.push(item.id);
                  });
                  var products_ids = this.arrProduct_id.toString();
                  this.$router.push(
                    `/product?products_ids=${products_ids}&cat=${cat[0]}&brand_name=${this.brand_id[0].code}&variant=${Variant.code} `
                  );
                }
              })
              .catch((err) => {
                console.log("error:", err);
              });
          // }
          // if (resp && ProductCheck.length == 1) {
          //   console.log('== 1', this.ArrVariantId)
          //   this.$router.push(`/product/${ProductCheck[0].slug}`);
          // }
        // });
    },
    getSkinnyBannerAds() {
      this.$store
        .dispatch(
          "app/fetchData",
          "/v1/client/banners/BANNER-ADS-IN-PRODUCT-DETAILS"
        )
        .then((resp) => {
          if (resp.data) {
            this.bannersSkinny = resp.data.details;
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
        });
    },
    getProductRanking() {
      this.$store
        .dispatch("products/getProducTopSale", {
          params: `?limit=10`,
        })
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          let ArrayRankingBestseller = resp.data;
          ArrayRankingBestseller.filter((item, index) => {
            if (item && item.id == this.currentProduct.id) {
              this.rankingAllNow = index + 1;
            }
          });
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
      return;
    },
    getProductAll(page = 1) {
      const cat = this.currentProduct.category_ids;
      const name = this.$route.query["name"] ? this.$route.query["name"] : "";
      const store_id = this.$route.query["store_id"]
        ? this.$route.query["store_id"]
        : "";
      const sort = this.$route.query["sort"]
        ? this.$route.query["sort"]
        : "sold_count";
      const manufacturer = this.$route.query["manufacturer"]
        ? this.$route.query["manufacturer"]
        : "";
      const order = this.$route.query["order"]
        ? this.$route.query["order"]
        : "desc";
      const limit = this.$route.query["limit"]
        ? this.$route.query["limit"]
        : 101;
      this.productAll1 = null;

      // commit to store
      this.$store.commit("products/setSearchProduct", { name: name });
      this.$store
        .dispatch("products/getProduct", {
          params: `?limit=${limit}&store_id=${store_id}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&status=1`,
        })
        .then((resp) => {
          const productAll = resp.data.data;
          productAll.filter((item, index) => {
            if (item && item.id == this.currentProduct.id) {
              this.rankingCatNow = index + 1;
            }
          });
          if (
            this.$store.state.cart &&
            this.$store.state.cart.cart &&
            this.$store.state.cart.cart.details
          ) {
          }
          this.productAll1 = productAll;
          this.productSearch = productAll;
          this.totalrowcount = resp.data.meta.pagination.count;
          this.pagenumber = resp.data.meta.pagination.current_page;
          this.total_page = resp.data.meta.pagination.total_pages;
          this.pagesize = resp.data.meta.pagination.per_page;
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    viewDetailData(data) {
      this.currentProduct = data;
      this.tempt = data.description;
      let strArray = data.description.split(" ");
      let subArray = strArray.slice(0, 40);
      data.description = subArray.join(" ");
      this.currentImage = {
        thumbnail: data.thumbnail,
      };
    },
    loadMore() {
      if (this.currentProduct.description.length > 200) {
        let strArray = this.tempt.split(" ");
        let subArray = strArray.slice(0, 40);
        this.currentProduct.description = subArray.join(" ");
        this.countText = false;
      } else {
        this.currentProduct.description = this.tempt;
        this.countText = true;
      }
    },
    _selectedVariant(type, variant) {
      this.checkVariant(
        this.currentProduct.variants,
        this.convertVairantList(this.variantList, type, variant)
      );
    },
    convertVairantList(variantList, type, variant) {
      return variantList.map((item) => {
        return {
          ...item,
          name: item.type == type ? variant.name : item.name,
          id: item.type == type ? variant.product_attribute_id : item.id,
        };
      });
    },
    getListID(variantList) {
      return variantList.map((item) => {
        return item.id;
      });
    },
    checkVariant(listProductVariant, variantListSelected) {
      this.variantList = variantListSelected;
      listProductVariant
        ? listProductVariant.forEach((item) => {
            const product_attributes = item.product_attributes.map(Number);
            if (
              R.includes(this.getListID(variantListSelected), [
                product_attributes,
              ]) == true
            ) {
              this.currentPrice = item.price;
              if (item.image) {
                this.currentImage = {
                  thumbnail: item.image,
                };
              }
            }
          })
        : null;
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    showMoreComment() {
      let array = [];
      array = this.commentList.concat(this.commentListTemp);
      this.commentListTemp = [];
      this.commentList = array;
      this.showMoreCommentBool = true;
    },
    showMoreQuestion() {
      let array = [];
      array = this.questionList.concat(this.questionListTemp);
      this.questionListTemp = [];
      this.questionList = array;
      this.showMoreQuestionBool = true;
    },
    createQuestion() {
      if (!localStorage.getItem("id_token")) {
        this.$store.commit("app/showNotifyLoginForm");
      } else {
        this.showAlertValidateQuestion = false;
        this.showAlertLoginQuestion = false;
        if (this.text_question.length > 30) {
          const formdata = {
            product_id: this.currentProduct.id,
            content: this.text_question,
            parent_id: null,
          };
          const formsend = {
            data: formdata,
            url: "v1/product-question",
          };

          this.text_question = null;
          this.$store
            .dispatch("app/postData_2", formsend)
            .then((resp) => {
              if (resp) {
                // //console.log("question", resp.status);
                // this.getQuestion();

                this.showAlertLoginQuestion = false;
              } else {
                this.showAlertLoginQuestion = true;
              }
            })
            .catch((err) => {
              //console.log("error", err);
            });
        } else {
          this.showAlertValidateQuestion = true;
        }
      }
    },
    copyLinkToClipboard() {
      let pathNow = this.$router.currentRoute.fullPath;
      let fullCurrentUrl = `${this.baseUrl}${pathNow}`;
      var el = document.createElement("textarea");
      el.value = fullCurrentUrl;
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      this.$toast.success("Sao chép đường dẫn thành công!").goAway(1500);
      // fullCurrentUrl.select();
      // fullCurrentUrl.setSelectionRange(0, 99999);
      // document.execCommand("copy");
    },
    createComment() {
      this.showAlertValidateComment = false;
      this.showAlertLoginComment = false;
      if (this.text_comment && this.text_comment.length > 10) {
        const formdata = {
          product_id: this.currentProduct.id,
          content: this.text_comment,
          rate: this.start_comment,
          parent_id: null,
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
              // //console.log("comment", resp);
              // this.getComment();
              this.formInput = false;
            } else {
              this.showAlertLoginComment = true;
            }
          })
          .catch((err) => {
            // //console.log("error", err);
          });
      } else {
        this.showAlertValidateComment = true;
      }
    },

    createAnswerComment() {
      this.showAlertValidateCommentAnswer = false;
      this.showAlertLoginCommentAnswer = false;
      if (this.textAnswerComment.length > 30) {
        const formdata = {
          product_id: this.currentProduct.id,
          content: this.textAnswerComment,
          rate: this.start_comment,
          parent_id: this.parent_id_answer,
        };
        const formsent = {
          data: formdata,
          url: "v1/product-comment",
        };
        this.$store
          .dispatch("app/postData_2", formsent)
          .then((resp) => {
            if (resp) {
              // //console.log("answer comment", resp.status);
              this.textAnswerComment = "";
              this.formInputComment = false;
              // this.getComment();
            } else {
              this.showAlertLoginCommentAnswer = true;
            }
          })
          .catch((err) => {
            // //console.log("error", err);
          });
      } else {
        this.showAlertValidateCommentAnswer = true;
      }
    },
    createAnswerQuestion() {
      this.showAlertValidateQuestionAnswer = false;
      this.showAlertLoginQuestionAnswer = false;
      if (this.textAnswerQuestion.length > 30) {
        const formdata = {
          product_id: this.currentProduct.id,
          content: this.textAnswerQuestion,
          parent_id: this.parent_id_answer,
        };
        const formsent = {
          data: formdata,
          url: "v1/product-question",
        };
        this.$store
          .dispatch("app/postData_2", formsent)
          .then((resp) => {
            if (resp) {
              // //console.log("answer question", resp.status);
              this.textAnswerQuestion = "";
              this.formInputQuestion = false;
              // this.getQuestion();
            } else {
              this.showAlertLoginQuestionAnswer = true;
            }
          })
          .catch((err) => {
            // //console.log("error", err);
          });
      } else {
        this.showAlertValidateQuestionAnswer = true;
      }
    },
    getComment() {
      this.$store
        .dispatch(
          "app/fetchData",
          "v0/client/product/" + this.currentProduct.id + "/comments"
        )
        .then((resp) => {
          // //console.log("comment", resp);
          let array = [];
          let array_temp = [];
          this.one_start = 0;
          this.three_start = 0;
          this.two_start = 0;
          this.four_start = 0;
          this.five_start = 0;
          this.average_start = 0;
          if (resp && resp.data.length > 0) {
            for (let i = 0; i < resp.data.length; i++) {
              if (i < 2) array.push(resp.data[i]);
              if (i >= 2) array_temp.push(resp.data[i]);
              if (resp.data[i].rate == 1) this.one_start = this.one_start + 1;
              if (resp.data[i].rate == 2) this.two_start = this.two_start + 1;
              if (resp.data[i].rate == 3)
                this.three_start = this.three_start + 1;
              if (resp.data[i].rate == 4) this.four_start = this.four_start + 1;
              if (resp.data[i].rate == 5) this.five_start = this.five_start + 1;
            }

            this.average_start = Math.ceil(
              (this.one_start +
                this.two_start * 2 +
                this.three_start * 3 +
                this.four_start * 4 +
                this.five_start * 5) /
                resp.data.length
            );

            // //console.log("average_start", this.average_start);
            this.one_start = Math.ceil(
              (this.one_start / resp.data.length) * 100
            );
            this.two_start = Math.ceil(
              (this.two_start / resp.data.length) * 100
            );
            this.three_start = Math.ceil(
              (this.three_start / resp.data.length) * 100
            );
            this.four_start = Math.ceil(
              (this.four_start / resp.data.length) * 100
            );
            this.five_start = Math.ceil(
              (this.five_start / resp.data.length) * 100
            );
            // //console.log(this.one_start);
            // //console.log(this.two_start);
            // //console.log(this.three_start);
            // //console.log(this.four_start);
            // //console.log(this.five_start);
            this.commentCount = resp.data.length;
            this.commentList = array;
            this.commentListTemp = array_temp;

            if (this.showMoreCommentBool == true) {
              this.showMoreComment();
            }
          }
        })
        .catch((err) => {
          // //console.log("error", err);
        });
    },
    // getQuestion() {
    //   this.$store
    //     .dispatch(
    //       "app/fetchData",
    //       "v0/client/product/" + this.currentProduct.id + "/questions"
    //     )
    //     .then(resp => {
    //       if (resp.data) {
    //         // //console.log("question", resp.data);
    //         this.questionCount = resp.data.length;
    //         this.questionList = resp.data;
    //         let array = [];
    //         let array_temp = [];
    //         if (resp.data) {
    //           for (let i = 0; i < resp.data.length; i++) {
    //             if (i < 2) array.push(resp.data[i]);

    //             if (i >= 2) array_temp.push(resp.data[i]);
    //           }
    //           this.questionList = array;
    //           this.questionListTemp = array_temp;
    //           if (this.showMoreQuestionBool == true) {
    //             this.showMoreQuestion();
    //           }
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       // //console.log("error", err);
    //     });
    // },

    SelectedOption() {},

    showFormInputComment(item) {
      this.formInputComment = !this.formInputComment;
      this.parent_id_answer = item.id;
    },

    showFormInputQuestion(item) {
      this.formInputQuestion = !this.formInputQuestion;
      this.parent_id_answer = item.id;
    },
    showFormInput() {
      if (localStorage.getItem("id_token")) {
        this.formInput = !this.formInput;
      } else {
        this.$store.commit("app/showNotifyLoginForm");
      }
    },

    addToCart(product) {
      this.$store
        .dispatch("cart/add", {
          product_id: product.id,
          quantity: this.isMobile ? this.quantityMB : this.quantity,
          session_id: this.$store.state.app.session_id,
          options:
            this.currentProduct.variants && this.currentProduct.variants.length
              ? this.getListID(this.variantList)
              : [],
        })
        .then((res) => {
          this.$store.dispatch("cart/getCart");
          this.$toast.success("Cập nhật số lượng thành công").goAway(1500);
        })
        .catch((err) => {
          //console.log("erro add cart:", err);
          // this.$toast
          //   .error("Lỗi thêm vào giỏ hàng", {
          //     position: "top-right"
          //   })
          // .goAway(3500);
        });
    },
    // ================ ADD WISH LIST ==================
    addWishlist(product) {
      if (this.$store.state.user.user) {
        this.$store.dispatch("app/showLoadingOverlay", true);
        // //console.log(
        //   "product - id",
        //   product.id ? product.id : product.product_id
        // );
        this.$store
          .dispatch(
            "user/addWishlist",
            product.id ? product.id : product.product_id
          )
          .then((res) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            this.isLike = true;
            this.$toast.success("Đã thêm vào danh sách yêu thích").goAway(2000);
          })
          .catch((err) => {
            // //console.log(err);
            //  this.$toast
            // .error("Tạo địa chỉ giao hàng không thành công")
            // .goAway(1500);
            this.$store.dispatch("app/showLoadingOverlay", false);
            // this.$toast.error(err).goAway(2000);
          });
      } else {
        this.$store.commit("user/showLoginModal");
        this.$toast
          .error("Bạn cần đăng nhập để sử dụng chức năng này.")
          .goAway(2000);
      }
    },
    // ========= DELETE WISH LIST =====================
    deleteWishlist(product) {
      this.$store
        .dispatch("app/delete", {
          param: "/v1/product-favorite/" + product.id,
          data: "",
        })
        .then((res) => {
          this.isLike = false;
          this.$toast.success("Xóa thành công").goAway(1500);
        })
        .catch((err) => {
          // //console.log(err);
        });
    },
    // getWishlist(currentProduct) {
    //   return new Promise((resolve, reject) => {
    //     var flag = false;
    //     this.$store
    //       .dispatch("user/fetchData", "/v1/product-favorites")
    //       .then(data => {
    //         // //console.log(data.data)
    //         if (data.data && data.data.length > 0) {
    //           data.data.forEach(function(value) {
    //             // //console.log(value);
    //             // //console.log(value.id);
    //             // //console.log("id hien tai", currentProduct.id);
    //             if (value.id == currentProduct.id) {
    //               flag = true;
    //             }
    //           });
    //         }
    //         resolve(flag);
    //       });
    //   });
    // },

    setCurrentImage(img, k) {
      this.currentProduct.thumbnail = img.url;
      // //console.log("currentImage:", this.currentImage);
    },
    onChange($event) {
      if ($event && $event.target && $event.target["value"] <= 0) {
        this.quantity = 1;
      }
    },
    incrementQty() {
      this.quantity++;
    },
    decrementQty() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    showStartRating() {
      if (this.commandProduct) {
        this.modalShow = !this.modalShow;
      }
    },
    sendRequest(rating) {
      // //console.log(this.commandProduct, rating);
    },
    showMoreAnswerQuestion(id) {
      // //console.log(id);
      this.showMoreAnswerQuestionArr.push(id);
      // this.getQuestion();
      // //console.log(this.showMoreAnswerQuestionArr);
      // //console.log(this.showMoreAnswerQuestionArr.includes(id));
    },
    showMoreAnswerComment(id) {
      // //console.log(id);
      this.showMoreAnswerCommentArr.push(id);
      // this.getQuestion();
      // //console.log(this.showMoreAnswerCommentArr);
      // //console.log(this.showMoreAnswerCommentArr.includes(id));
    },
    showLstAddressModal(data) {
      this.$store.commit("user/showLstAddressModal", data);
    },
  },
};
</script>

<style>
.scrollDisabled {
  position: fixed;
  margin-top: 0;
  width: 100%;
}
.show-more {
  font-size: 14px;
  color: rgb(74, 119, 243);
  cursor: pointer;
}

.rateting {
  width: 150px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.btn-send {
  background-color: rgb(253, 210, 47);
}

.btn-cancel {
  color: rgb(51, 51, 51);
  background-color: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
  border-image: initial;
}

.reply-input textarea {
  resize: none;
  width: 100%;
  height: 110px;
  font-size: 13px;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(224, 224, 224);
  border-image: initial;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
}
.reply-input {
  margin-top: 12px;
}
.price-version {
  color: #bd1313;
  margin: 0;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #28a745;
  background-color: #28a745;
}

.like-icon {
  cursor: pointer;
  /* margin: 16px 21px 9px -18px; */
}

.command-product {
  display: flex;
}

.count-like-command {
  flex: 1.5;
  text-align: center;
}

.question-answer {
  flex: 10.5;
}

.question {
  font-size: 15px;
  font-weight: bold;
}

.author {
  margin: 10px 0;
  font-size: 12px;
  color: rgb(120, 120, 120);
}

.answer {
  font-size: 15px;
  color: rgb(120, 120, 120);
  line-height: 18px;
  font-weight: 400;
  margin-top: 12px;
}
.number-like {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  font-size: 24px;
  font-weight: bold;
}

.button-qa {
  margin-bottom: 16px;
  display: flex;
}

.like-button {
  color: rgb(136, 136, 136);
  font-size: 13px;
  font-weight: 300;
  cursor: pointer;
}

.answer-button {
  margin-left: 35px;
  color: rgb(136, 136, 136);
  font-size: 13px;
  font-weight: 300;
  cursor: pointer;
}

.product-related {
  margin-bottom: 35px;
}

.widget-content {
  border-bottom: 1px solid rgb(196, 193, 193);
}

.show-all-question {
  color: rgb(0, 127, 240);
  font-size: 13px;
  font-weight: 400;
  padding: 0px 20px;
  cursor: pointer;
}

.form-inline .form-control {
  width: 100%;
}

.request-answer {
  border-radius: 3px !important;
}


.average-rating {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.average-rating .title {
  font-size: 16px;
  color: rgb(68, 68, 68);
  font-weight: 400;
  padding: 30px 0px 0px;
  margin: 0;
}

.average-rating .score {
  color: rgb(254, 48, 46);
  font-size: 47px;
  font-weight: 500;
  margin: 0px;
}

.average-rating .rating-number {
  color: rgb(143, 143, 143);
  font-size: 14px;
}

.detailed-evaluation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}

.write-command {
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.star-progress-bar {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.star-number {
  font-size: 14px;
  font-weight: 300;
  margin: 0 auto;
}

.progress-bar {
  width: 60%;
  height: 10px;
  border-radius: 10px;
}

.percent {
  font-size: 14px;
  font-weight: 300;
  margin: 0 auto;
}

.row-command-product {
  display: flex;
  background-color: white;
  margin: 0;
}

.filter-comment {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: white;
}
.filter-comment-child {
  position: relative;
  box-sizing: border-box;
  width: 180px;
  margin-left: 20px;
  font-size: 13px;
}
.label {
  width: 180px;
  color: rgb(51, 51, 51);
  font-size: 13px;
  text-align: center;
  margin: 0px;
}
.drop-down {
  border-radius: 10px;
}
.start {
  display: flex;
}
.start1 {
  width: 70%;
  margin: 0px;
  margin-top: 5px;
}
.start2 {
  width: 30%;
  margin: 0px;
  margin-right: 30px;
  margin-bottom: 10px;
}

.formInputCommentLeft {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid rgb(247, 247, 247);
  margin-bottom: 10px;
  margin-top: 10px;
}

.formInputCommentRight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  background-color: white;
  margin-bottom: 10px;
  margin-top: 10px;
}

.comment {
  display: flex;
}
.padding-comment {
  padding-top: 2px;
  font-weight: bold;
}
.btn-normal {
  margin: 10px;
  width: 40%;
}
.btn-lite {
  color: blue;
  margin-right: 20px;
  line-height: 5px;
}
.line1 {
  line-height: 40px;
  margin-right: 20px;
}
.btn-lite:hover {
  color: red;
}
.btn-round {
  border-radius: 10% !important;
}

.child-comment {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  margin-bottom: 10px;
}
.clild-comment-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}
.child-comment-text-label {
  margin-bottom: 1px;
}
.clild-comment-text-comment {
  font-weight: 400;
  line-height: 18px;
  color: rgb(36, 36, 36);
  font-size: 13px;
  width: 100%;
}

.clild-comment-text-label-comment {
  font-weight: 400;
  line-height: 18px;
  color: rgb(36, 36, 36);
  font-size: 15px;
}

.product-info {
  margin-left: 20px;
}

.title {
  font-size: 18px;
  font-weight: 300;
  margin: 35px 0px 0px;
}

.h6 {
  display: flex;
  color: rgb(51, 51, 51);
  font-size: 12px;
  font-weight: 400;
  margin: 0px 20px 0px 0px;
}
.more-info {
  color: rgb(51, 51, 51);
  font-size: 13px;
  line-height: 18px;
  margin: 20px 0px 0px;
  padding: 0px 20px;
  list-style: none;
}

.user-info {
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 220px;
  padding: 0px 20px;
}

.row-command-product-eq-0 {
  background-color: white;
  margin: 0;
  text-align: center;
}

.avatar {
  width: 64px;
  height: 64px;
  background-color: rgb(211, 210, 211);
  border-radius: 50%;
  overflow: hidden;
  margin-top: 10px;
}
.title-avatar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  width: 100%;
}
.avatar-small {
  width: 44px;
  height: 44px;
  margin-right: 12px;
  background-color: rgb(211, 210, 211);
  border-radius: 50%;
  overflow: hidden;
}

.product-price-detail {
  font-size: 24px;
  color: rgb(229, 0, 0);
  text-align: left;
  border-top: 1px dotted #a0a0a0;
  border-bottom: 1px dotted #a0a0a0;
  /* padding: 10px 0; */
  font-weight: 500;
  width: 100%;
}
.product-price-detail span {
  font-size: 15px;
  color: #5f5f5f;
  font-weight: 300;
  margin: 10px;
}

.product-price-detail del {
  font-size: 16px;
  color: rgb(169, 169, 169);
  text-align: left;
  padding-left: 20px;
  font-weight: 300;
}
.product-price-detail span label {
  color: #e50000;
  font-weight: 400;
}
.save-price {
  float: right;
  font-size: 14px;
  color: rgb(45, 48, 53);
  text-align: left;
  padding: 9px 0;
}
.products-detail .pro-review {
  margin: 10px 0;
  padding: 0;
  display: -webkit-flex;
  display: flex;
  /* -webkit-align-items: center; */
  /* align-items: center; */
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
}
.products-detail .pro-review span span {
  color: red;
}
.col-xs-12 {
  width: 100%;
}
@media screen and (max-width: 768px) {
  .heart-wishlist {
    margin: 5px 2px;
    position: relative;
    right: 0 !important;
  }
  .like-icon {
    margin-top: 34px;
    cursor: pointer;
  }
  .bor-t-mobile {
    border-top: 1px dotted #a0a0a0;
    padding-top: 20px;
    margin-top: 10px;
  }
  .product-price-detail {
    padding: 0;
    border: 0;
  }
  .hidden-xs {
    display: none !important;
  }
  .product-price-detail span {
    font-size: 13px;
  }
  .product-price-detail del {
    font-size: 13px;
  }
  .product-price-detail {
    font-size: 18px;
  }
  .qty-update-group {
    width: 110px;
    margin: 6px 0px 0px 0px;
    /* margin-top: 10px; */
  }
  .qty-update-cart-mobile {
    width: 80px;
  }

  .price-detail {
    margin: 10px 0 0 0;
    font-size: 20px;
    display: inline-block;
    color: #bd1313;
  }
  .price-detail.has_special {
    margin: 0px 6px 0px 7px;
  }
  .color-W {
    color: #fff !important;
  }

  .color-g {
    color: #dee2e6 !important;
  }
}

/* ======================================= */

.title-comm {
  color: #ffcd00;
  font-size: 18px;
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 700;
  background-color: #fff;
  text-align: center;
}

h3.title-comm:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin-top: 0;
  border-top: 2px solid #d0d2d3;
  z-index: 1;
  display: block;
}

.title-comm .title-holder {
  min-width: 350px;
  height: 45px;
  background-color: #006e43;
  height: auto;
  line-height: 45px;
  padding: 0px 20px;
  position: relative;
  z-index: 2;
  text-align: center;
  display: inline-block;
  min-width: 280px;
}

.title-holder:before {
  content: "";
  position: absolute;
  right: -15px;
  border-width: 0px;
  bottom: 0px;
  border-style: solid;
  border-color: #006e43 transparent;
  display: block;
  width: 0;
  height: 0;
  border-top: 23px solid transparent;
  border-bottom: 22px solid transparent;
  border-left: 15px solid #006e43;
}

.title-holder:after {
  content: "";
  position: absolute;
  left: -15px;
  border-width: 0px;
  bottom: 0px;
  border-style: solid;
  border-color: #006e43 transparent;
  display: block;
  width: 0;
  height: 0;
  border-top: 23px solid transparent;
  border-bottom: 22px solid transparent;
  border-right: 15px solid #006e43;
}
.flash-box .price_item {
  background: linear-gradient(100deg, rgb(255, 66, 78), rgb(253, 130, 10));
  margin: 10px;
  border-radius: 10px;
}
.flash-box div h3 span {
  color: rgb(224, 224, 224);
}
.flash-box div h3 span label {
  color: rgb(224, 224, 224);
}
.flash-box div h3 h5 {
  color: #fff;
}
.flash-box div h3 h4 {
  color: #d7d7d7 !important;
}
.b-form-spinbutton {
  margin-top: -3px !important;
}
.b-form-spinbutton button {
  padding: 0 !important;
}
.b-form-spinbutton button .bi-dash {
  padding-right: 10px !important;
  font-size: 20px !important;
}
.b-form-spinbutton button .bi-plus {
  padding-left: 10px !important;
  font-size: 20px !important;
}
.counponNumber{
  margin: 0px 0px 0px 20px;
  width: 160px;
  height: 29px;
  font-size: 12px;
}
.eKRrSx .coupon-item:not(:last-child) {
    margin-bottom: 12px;
}
.eKRrSx .coupon-item {
    min-width: 99%;
}
.bJoZof {
    display: flex;
    position: relative;
    width: 400px;
}
.HRJop {
    position: relative;
    opacity: 1;
    height: 132px;
}
.bJoZof .coupon-bg {
    width: 100%;
    height: 132px;
    filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px);
}
.jibPFy {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
}
.hbusih {
    min-width: 132px;
    width: 132px;
    height: 132px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    align-self: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.cZpIMl {
    position: relative;
    width: 80px;
    height: 80px;
}
.kksiKu {
    width: 100%;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}
.dRsyqq {
    margin: 4px 4px 0px;
    text-align: center;
}.dTzGXN {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0px;
    margin: 0px;
    padding: 0px;
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;
    max-height: 32px;
    -webkit-line-clamp: 2;
    color: rgb(36, 36, 36);
}
.bojiJp {
    display: flex;
    flex-direction: column;
    padding: 12px;
    width: calc(100% - 132px);
}
.bYgUJS {
    display: flex;
    margin-bottom: 2px;
    overflow: hidden;
    max-width: calc((100% - 20px) - 8px);
}
.fHUQtx {
    display: block;
    background: transparent;
    outline: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    line-height: 0px;
}
.droGGV {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0px;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
    font-weight: 500;
    line-height: 24px;
    max-height: 24px;
    color: rgb(36, 36, 36);
}
.hmqpxx {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0px;
    margin: 0px;
    padding: 0px;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    max-height: 20px;
    color: rgb(120, 120, 120);
}
.dvHFX {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
}
.hmqpxx {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0px;
}
.bshRIg {
    font-weight: 500;
    letter-spacing: 0px;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
    outline: none;
    font-size: 15px;
    line-height: 24px;
    padding: 2px 12px;
    color: rgb(255, 255, 255);
    background-color: rgb(1, 127, 255);
    border: none;
}
.eKRrSx {
    height: calc(75vh - 71px);
    overflow-y: scroll;
    padding: 20px 93px;
    box-sizing: border-box;
}
.coupon {
    cursor: pointer;
    padding: 3px 12px;
    /* border: 1px solid #006e43; */
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    color: #006e43;
    position: relative;
    margin: 8px 12px 0px 0px;
    height: 35px;
}
</style>
