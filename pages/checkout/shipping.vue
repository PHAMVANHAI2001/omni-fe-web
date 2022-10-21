<template>
  <main role="main">
    <div class="header-app">
    </div>

    <div class="container wrapper">
      <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit" class="m-0">
          <div class="row">
            <div class="col-lg-8 col-md-7 col-sm-6 d-block">
              <span
                v-if="!user"
                class="pull-left mt-2 clear width-full d-block border-radius text-center pt-2 pb-2 mb-2"
                style=" background:#ffedba;"
              >
                Đăng nhập để hưởng ưu đãi dành riêng cho thành viên
                <a
                  class="text-blue bold"
                  @click="showModalLogin"
                  title="Đăng nhập"
                  >( Đăng nhập ngay )</a
                >
              </span>
              <div class="order-product-list" v-if="cart && cart['total_product_promotion']">
                <span
                  class="the-title width-full  float-left d-block mb-2 font-weight-bold"
                  >Sản phẩm áp dụng khuyến mãi: 
                  <b class=text-danger>{{cart['total_product_promotion_fortmated']}}</b>
                </span>
                <!-- sản phẩm trong giỏ hàng -->
                <div class="section p-0" v-if="cart">
                  <div v-for="(item, i) in cart['details']" :key="i">
                    <div class="news-item  px-2 w-100  mb-2 pt-0" v-if="item && item['promoted_price'] > 0 || item['promotion_check'] == 1">
                      <div class="news-image max-width-70 mr-2 position-relative">
                        <nuxt-link
                          :to="{ path: `/product/${item.product_slug}` }"
                        >
                          <img
                            class="img-fluid box-shadow-none"
                            :src="item.product_thumb + `/h110-w110`"
                            :alt="item.product_name"
                          />
                        </nuxt-link>
                        <a
                          class="delete-item-cart"
                          @click="deleteCartItem(item, i)"
                        >
                          <i class="fa fa-times-circle"></i>
                        </a>
                      </div>
                      <div class="news-summary w-100">
                        <div class="d-flex justify-content-space-between w-100">
                          <div
                            class="col-md-9 col-7"
                            style="padding: 0 !important"
                          >
                            <h4 class="font-weight-bold color-555 font-12">
                              <nuxt-link
                                class="title-product"
                                :to="{ path: `/product/${item.product_slug}` }"
                              >
                                {{ item.product_name }} 
                              </nuxt-link>
                            </h4>
                            <div class="box-price-mobile">
                              <p
                                v-if="item.promoted_price > 0"
                                class="price-product-mobile d-flex flex-row"
                              >
                                <span style="font-weight: 700; color: #006e43" >{{ item.promoted_price_formatted }}/{{item.unit}}</span
                                >
                                &nbsp;
                                <del class="origin-price">{{
                                  item.price_formatted
                                }}</del>
                              </p>
                              <p
                                v-if="item.promoted_price == 0"
                                class="price-product-mobile"
                              >
                                <span class="current-price"
                                  >{{ item.price_formatted }}/{{
                                    item.unit
                                  }}</span
                                >
                                &nbsp;
                                <!-- <del class="origin-price" v-if="item.old_product_price != item.price">{{
                                  item.old_product_price_formatted
                                }}</del> -->
                              </p>
                            </div>
                            <span v-if="index_limit_qty_fs == item.id && validated == 1 &&  cart['check_limit_buy'] == 0 && item.flash_sale > 0" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                              <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                              </i>
                              <p class="m-0 text-notify">Bạn phải mua tối thiểu: <b> {{item.min_qty_flash_sale}} sản phẩm. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</b></p>
                            </span>
                            <span v-if="index_limit_qty_fs == item.id && validated == 1 &&  cart['check_limit_buy'] == 0 && item.flash_sale > 0" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                              <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                              </i>
                              <p class="m-0 text-notify">Bạn chỉ được mua tối đa: <b> {{item.limit_qty_flash_sale}} sản phẩm. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</b></p>
                            </span>
                            <span v-if="item.qty_sale_re" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                              <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                              </i>
                              <p class="m-0 text-notify">Số lượng Flash sale <b> {{item.qty_sale_re}} </b> sản phẩm.</p>
                            </span>
                          </div>
                          <div
                            class="col-md-3 col-5"
                            style="padding: 0 !important"
                          >
                            <div class="total-price-product">
                              
                              <h4
                                style="text-align: right !important; color: #006e43"
                              >
                               <img v-if="item.flash_sale == 1" class="flash_icon" src="~/assets/images/flash_sale.svg" alt style=" width: 6%;" /> {{ item.total_formatted }}
                              </h4>
                            </div>
                            <div class="margin" style="width: 100% !important">
                              <div
                                class="qty-update-cart-mobile d-inline-flex"
                                style="position: absolute; right: 0 !important;"
                              >
                                <div class="input-group" v-show="!item.free_gift">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="btn btn-number btn-number-minus"
                                      data-type="minus"
                                      @click="decreaseCartItemQty(item)"
                                    >
                                      <span class="fa fa-minus"></span>
                                    </button>
                                  </span>
                                  <input
                                    width="100px !important"
                                    type="number"
                                    class="form-control input-number"
                                    value="1"
                                    v-model="item.quantity"
                                    min="1"
                                    @change="onChange(item)"
                                    max="1000"
                                  />
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      @click="increaseCartItemQty(item, i)"
                                      class="btn btn-number btn-number-plus"
                                      data-type="plus"
                                    >
                                    <!-- :disabled="validated == 1" -->
                                      <span class="fa fa-plus" > </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span v-if="item['notify']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">{{ item["notify"] }}</p>
                        </span>
                        <span v-if="item['notify_limit']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">{{ item["notify_limit"] }}</p>
                        </span>
                        <span v-if="item['limit_qty_sale']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">Bạn chỉ được mua tối đa <b>{{item['limit_qty_sale']}}</b> sản phẩm. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</p>
                        </span>
                        <span v-if="item['min_qty_sale']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">Bạn phải mua tối thiểu {{item['min_qty_sale']}} sản phẩm/giỏ hàng. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Đóng sản phẩm trong giỏ hàng -->
              </div>
              <div class="order-product-list" v-if="cart && cart['total_product']">
                <span
                  class="the-title width-full  float-left d-block mb-2 font-weight-bold"
                  >Sản phẩm không áp dụng khuyến mãi: 
                  <span
                    class="text-dark font-weight-normal text-body font-normal"
                  ></span>
                  <b class=text-danger>{{cart['total_product_fortmated']}}</b>
                </span>
                <!-- sản phẩm trong giỏ hàng -->
                <div class="section p-0" v-if="cart">
                  <div
                    v-for="(item, i) in cart['details']"
                    :key="i"
                  >
                  <div  class="news-item  px-2 w-100  mb-2 pt-0" v-if="item && item['promotion_check'] == null && item['promoted_price'] == 0 || item['promotion_check'] == 0 && item['promoted_price'] == 0">
                    <div class="news-image max-width-70 mr-2 position-relative">
                      <nuxt-link
                        :to="{ path: `/product/${item.product_slug}` }"
                      >
                        <img
                          class="img-fluid box-shadow-none"
                          :src="item.product_thumb + `/h110-w110`"
                          :alt="item.product_name"
                        />
                      </nuxt-link>
                      <a
                        class="delete-item-cart"
                        @click="deleteCartItem(item, i)"
                      >
                        <i class="fa fa-times-circle"></i>
                      </a>
                    </div>
                    <div class="news-summary w-100">
                      <div class="d-flex justify-content-space-between w-100">
                        <div
                          class="col-md-9 col-7"
                          style="padding: 0 !important"
                        >
                          <h4 class="font-weight-bold color-555 font-12">
                            <nuxt-link
                              class="title-product"
                              :to="{ path: `/product/${item.product_slug}` }"
                            >
                              {{ item.product_name }}
                            </nuxt-link>
                          </h4>
                          <div class="box-price-mobile">
                            <p
                              v-if="item.promoted_price > 0"
                              class="price-product-mobile d-flex flex-row"
                            >
                              <span style="font-weight: 700;"
                                >{{ item.promoted_price_formatted }}/{{
                                  item.unit
                                }}</span
                              >
                              &nbsp;
                              <del class="origin-price">{{
                                item.price_formatted
                              }}</del>
                            </p>
                            <p
                              v-if="item.promoted_price == 0"
                              class="price-product-mobile"
                            >
                              <span class="current-price"
                                >{{ item.price_formatted }}/{{
                                  item.unit
                                }}</span
                              >
                              &nbsp;
                            </p>
                          </div>
                        </div>

                        <div
                          class="col-md-3 col-5"
                          style="padding: 0 !important"
                        >
                          <div class="total-price-product">
                            <h4
                              style="text-align: right !important; color: #006e43"
                            >
                              {{ item.total_formatted }}
                            </h4>
                          </div>
                          <div class="margin" style="width: 100% !important">
                            <div
                              class="qty-update-cart-mobile d-inline-flex"
                              style="position: absolute; right: 0 !important;"
                            >
                              <div class="input-group" v-show="!item.free_gift">
                                <span class="input-group-btn">
                                  <button
                                    type="button"
                                    class="btn btn-number btn-number-minus"
                                    data-type="minus"
                                    @click="decreaseCartItemQty(item)"
                                  >
                                    <span class="fa fa-minus"></span>
                                  </button>
                                </span>
                                <input
                                  width="100px !important"
                                  type="number"
                                  class="form-control input-number"
                                  value="1"
                                  v-model="item.quantity"
                                  min="1"
                                  @change="onChange(item)"
                                  max="1000"
                                />
                                <span class="input-group-btn">
                                  <button
                                    type="button"
                                    @click="increaseCartItemQty(item)"
                                    class="btn btn-number btn-number-plus"
                                    data-type="plus"
                                  >
                                    <span class="fa fa-plus"></span>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span v-if="item['notify']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1" >
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true" >
                          </i>
                          <p class="m-0 text-notify">{{ item["notify"] }}</p>
                        </span>
                        <span v-if="item['notify_limit']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">{{ item["notify_limit"] }}</p>
                        </span>
                        <span v-if="item['limit_qty_sale']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">Bạn chỉ được mua tối đa <b>{{cart['limit_qty_sale']}}</b> sản phẩm. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</p>
                        </span>
                        <span v-if="item['min_qty_sale']" class="pull-left mt-2 clear d-flex border-radius text-left notify p-1">
                          <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true">
                          </i>
                          <p class="m-0 text-notify">Bạn phải mua tối thiểu {{item['min_qty_sale']}} sản phẩm/giỏ hàng. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</p>
                        </span>

                    </div>
                  </div>
                  </div>
                </div>
                <span class="line-4 d-block mt-2 row"></span>
                <!-- Đóng sản phẩm trong giỏ hàng -->
              </div>
               <div class="section p-0" v-if="cart && cart['check_limit_buy'] == 1">
                <span class="pull-left p-2 mt-2 clear width-full d-block border-radius mb-2"
                      style=" background: rgb(255, 245, 235); color: rgb(0, 0, 0);"
                > Tổng số lượng được mua tối đa là <b>{{cart['qty_limit_buy']}}</b> trên toàn bộ sản phẩm Flash Sale trong giỏ hàng. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.
                </span>
              </div>
               <div class="section p-0" v-if="limitSale && limitSale['limit_sale']">
                <span class="pull-left p-2 mt-2 clear width-full d-block border-radius mb-2"
                      style=" background: rgb(255, 245, 235); color: rgb(0, 0, 0);"
                > Tổng số lượng được mua tối đa là <b>{{limitSale['limit_sale']}}</b> trên toàn bộ sản phẩm trong giỏ hàng đối với chương trình <b>{{limitSale['title']}}</b>. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.
                </span>
              </div>
              <div class="section p-0" v-if="limitQtyMinSale && limitQtyMinSale['min_qty_sale']">
                <span class="pull-left p-2 mt-2 clear width-full d-block border-radius mb-2"
                      style=" background: rgb(255, 245, 235); color: rgb(0, 0, 0);"
                > Tổng số lượng được mua tối thiểu là {{limitQtyMinSale['min_qty_sale']}} trên toàn bộ sản phẩm trong giỏ hàng đối với chương trình {{limitQtyMinSale['title']}}. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.
                </span>
              </div>
              <div class="section p-0" v-if="cart && cart['free_item']">
                  <div v-for="(item, i) in cart['free_item']" :key="i">
                    <div class="news-item  px-2 w-100  mb-2 pt-0">
                      <div class="news-image max-width-70 mr-2 position-relative">
                        <a>
                          <img
                            class="img-fluid box-shadow-none"
                            src="../../assets/images/icon/gift-item-2.png"
                            alt="quà tặng"
                          />
                        </a>
                      </div>
                      <div class="news-summary w-100">
                        <div class="d-flex justify-content-space-between w-100">
                          <div
                            class="col-md-9 col-7"
                            style="padding: 0 !important"
                          >
                            <h4 class="font-weight-bold color-555 font-12">
                              <a
                                class="title-product"
                              >
                                {{ item['text'].product_name }} 
                              </a>
                            </h4>
                          </div>
                          <div
                          class="col-md-3 col-5"
                          style="padding: 0 !important"
                        >
                          <div class="margin" style="width: 100% !important">
                            <div
                              class="qty-update-cart-mobile d-inline-flex"
                              style="position: absolute; right: 0 !important;"
                            >
                              <p>Số lượng: <b>{{item['value']}}</b></p>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div class="section p-0" v-if="cart && cart['max_amt'] || cart && cart['min_amt']">
                <span class="pull-left p-2 mt-2 clear width-full d-block border-radius mb-2"
                      style=" background: rgb(255, 245, 235); color: rgb(0, 0, 0);"
                > Chính sách mua hàng: Đơn hàng đặt trực tuyến phải có giá trị {{ cart && cart['max_amt'] ? `Tối đa sau khuyến mãi nhỏ hơn  ${cart['max_amt_formatted']}` : `tối thiểu sau khuyến mãi >= ${cart['min_amt_formatted']}`}}.
                </span>
              </div>
              <div
                class="order-shipping-address d-block"
              >
                <span
                  class="the-title width-full  float-left d-block mb-2 font-weight-bold"
                >
                  Địa chỉ giao hàng
                </span>
                <div class="container clear">
                  <section
                    class="section mb-2 shop_list_croll white-scroll h-auto"
                    style="max-height:482px;"
                  > 
                    <div v-if="!user && formshippingaddress.street_address">
                        <div class="form-group mb-0 mt-2">
                      <label class="custom-control custom-checkbox custom-cycle custom-border-block">
                        <input
                          class="custom-control-input"
                          data-i="0"
                          type="radio"
                          checked="checked"
                        />
                        <span class="custom-control-label"
                          >Người nhận: <strong>{{formshippingaddress.full_name}} | {{formshippingaddress.phone}}</strong> <br />
                          <span style="margin-right: 28px;  display: block;"
                            >Gửi đến: {{formshippingaddress.street_address}}, {{formshippingaddress.ward_name}}, {{formshippingaddress.district_name}}, {{formshippingaddress.city_name}} <br />
                          </span>
                        </span>
                        <span class="custom-border"></span>
                        <span class="edit-block text-right">
                          <a
                            class="btn-edit text-primary"
                            @click="showAddLocationModal(cartStore)"
                            >Sửa</a
                          >
                        </span>
                        <span
                          class="edit-blocks text-right "
                          style="left: 11px;position: absolute; top: 15px;"
                        >
                          <br />
                        </span>
                      </label>
                    </div>
                    </div>
                    <div v-if="user">
                        <div class="form-group mb-0 mt-2"
                          v-for="(item, i) in shippingAddressList"
                          :key="i">
                      <label class="custom-control custom-checkbox custom-cycle custom-border-block"
                      v-bind:class="{ 'hide': isShowAddress && shippingAddressActiveChange != item['id'] }" >
                        <input
                          class="custom-control-input"
                          data-i="0"
                          type="radio"
                          v-bind:value="item['id']"
                          v-model.trim="shippingAddressActiveChange"
                          @change="onChecked(item)"
                        />
                        <span class="custom-control-label"
                          >Người nhận: <strong>{{ item.full_name }} | {{item.phone}}</strong> <br />
                          <span style="margin-right: 28px;  display: block;"
                            >Gửi đến: {{item.street_address}}, {{item.ward_name}}, {{item.district_name}}, {{item.city_name}} <br />
                          </span>
                        </span>
                        <span class="custom-border"></span>
                        <span class="edit-block text-right">
                          <a
                            class="btn-edit text-primary"
                            @click="showAddLocationModal(item)"
                            >Sửa</a
                          >
                        </span>
                        <span
                          class="edit-blocks text-right "
                          style="left: 11px; position: absolute;top: 15px;"
                        >
                          <br />
                        </span>
                      </label>
                    </div>
                    </div>
                    
                    <p v-if="shippingAddressList && shippingAddressList.length > 1" class="text-center pointer text-dark class_address_show mb-1" @click="isShowAddress = !isShowAddress"> {{isShowAddress ? 'Xem thêm địa chỉ khác' : 'Thu gọn'}} 
				              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6">
					                <path fill="none" fill-rule="evenodd" stroke="#666" stroke-linecap="round" stroke-width="2" d="M7 1L4 4 1 1"></path>
				              </svg>
			              </p>


                    <div class="d-block text-center " v-if="user  || !formshippingaddress['street_address'] && !user">
                      <a
                        class="text-primary mt-2 mb-2  btn border btn-rounded font-14 text-blue border-blue"
                        @click="checkLogin()"
                      >
                        {{shippingAddressActive && shippingAddressActive['id'] ? 'Thêm địa chỉ mới' : 'Vui lòng nhập thông tin nhận hàng'}}
                      </a>
                    </div>
                  </section>
                </div>
                <div
                    class="alert hidden alert-success"
                    role="alert"
                    v-if="formshippingaddress.distributor_name"
                  >
                <div class="row">
                    <div class="col-md-12">
                      <img
                        src="~/assets/images/icon/delivery-van.svg"
                        alt
                        style="width: 30px; vertical-align: bottom"
                      />
                      <b>Nhà phân phối/TTPP: </b>
                      {{ formshippingaddress.distributor_name }}
                    </div>
                    <div class="col-md-12" v-if="formshippingaddress.distributor_name && hidden_Distributors_if && hidden_Distributors_if != 'DEFAULT'">
                      <b>Số điện thoại:</b>
                      {{ formshippingaddress.distributor_phone }}
                    </div>
                    <div class="col-md-12">
                      <b>Giao từ:</b>
                      {{ formshippingaddress.distributor_ward_name }}, {{formshippingaddress.distributor_district_name}}, {{formshippingaddress.distributor_city_name}}
                    </div>
                    
                  </div>
                </div>
                <!-- Xuất hóa đơn công ty -->
                <div class="">
                  <label class="custom-control material-checkbox" >
                    <input type="checkbox" class="material-control-input" v-model="checked">
                    <span class="material-control-indicator"> </span>
                    <span class="material-control-description font-bold" v-bind:class="{'color-nuti' : checked == true}">Xuất hoá đơn công ty</span>
                  </label>
                  <div class="block-section" v-if="checked == true">
                    <ValidationProvider
                        name="invoice_company_name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-field">
                        <div class="input-group">
                          <input
                            type="text"
                              placeholder=" "
                              ref="invoice_company_name"
                              class="form-input"
                              v-model="formshippingaddress.invoice_company_name"
                          />
                          <span class="form-labels"
                            >Tên công ty <span class="text-danger">(*)</span></span
                          >
                          </div>
                          <p class="error-message">{{ errors[0] }}</p>
                        </div>
                      </ValidationProvider>

                       <ValidationProvider
                        name="invoice_tax"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-field">
                        <div class="input-group">
                          <input
                            type="number"
                              placeholder=" "
                              onKeyPress="if(this.value.length==10) return false;"
                              ref="invoice_tax"
                              class="form-input"
                              v-model="formshippingaddress.invoice_tax"
                          />
                          <span class="form-labels"
                            >Mã số thuế (gồm 10 số) <span class="text-danger">(*)</span></span
                          >
                          </div>
                          <p class="error-message">{{ errors[0] }}</p>
                        </div>
                      </ValidationProvider>
                      <div class="form-group row">
                        <div class="col-sm-12">
                            <div class=" row">
                            <label class="col-sm-3 col-form-label">Tỉnh/Thành phố<span class="text-danger">(*)</span></label>
                          <div class="col-sm-9">
                            <ValidationProvider name="city_code" v-slot="{ errors }">
                              <select
                                @change="getDistrict(formshippingaddress.invoice_city_code)"
                                v-model.trim="formshippingaddress.invoice_city_code"
                                class="form-control"
                                ref="city_code"
                              >
                                <option value>Vui lòng chọn Tỉnh/Thành phố</option>
                                <option
                                  :value="item.code"
                                  v-for="(item, i) in cities"
                                  :key="i"
                                  >{{ item.name }}</option
                                >
                              </select>
                              <p class="error-message">{{ errors[0] }}</p>
                            </ValidationProvider>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Quận/Huyện<span class="text-danger">(*)</span></label>
                          <div class="col-sm-9">
                            <ValidationProvider rules="required" v-slot="{ errors }">
                              <select
                                :disabled="!formshippingaddress.invoice_city_code"
                                class="form-control"
                                v-model.trim="formshippingaddress.invoice_district_code"
                                @change="getWard(formshippingaddress.invoice_district_code)"
                              >
                                <option value>Vui lòng chọn Quận/Huyện</option>
                                <option
                                  :value="item.code"
                                  v-for="(item, i) in districts"
                                  :key="i"
                                  >{{ item.name }}</option
                                >
                              </select>
                              <p class="error-message">{{ errors[0] }}</p>
                            </ValidationProvider>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Phường/xã<span class="text-danger">(*)</span></label>
                          <div class="col-sm-9">
                            <ValidationProvider rules="required" v-slot="{ errors }">
                              <select
                                :disabled="!formshippingaddress.invoice_district_code"
                                class="form-control"
                                v-model.trim="formshippingaddress.invoice_ward_code"
                                 
                              >
                                <option value>Vui lòng chọn Phường/xã</option>
                                <option
                                  :value="item.code"
                                  v-for="(item, i) in wards"
                                  :key="i"
                                  >{{ item.name }}</option
                                >
                              </select>
                              <p class="error-message">{{ errors[0] }}</p>
                            </ValidationProvider>
                          </div>
                        </div>

                        <ValidationProvider rules="required|min:3" v-slot="{ errors }">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Địa chỉ<span class="text-danger">(*)</span></label>
                            <div class="col-sm-9">
                              <textarea
                                @change="getStreet(formshippingaddress.invoice_street_address)"
                                name="Địa chỉ"
                                v-model.trim="formshippingaddress.invoice_street_address"
                                class="form-control"
                                rows="3"
                                maxlength="100"
                                placeholder="Số nhà, tên đường, toà nhà (nếu có)"
                              ></textarea>
                              <p class="error-message">{{ errors[0] }}</p>
                            </div>
                          </div>
                        </ValidationProvider>
                        </div>
                      </div>
                  </div>
                  <div>
                    <div class="form-field">
                        <textarea
                          name="Ghi chú"
                          v-model.trim="formshippingaddress.note"
                          class="form-control"
                          rows="3"
                          placeholder="Nhập ghi chú đơn hàng nếu có...."
                        ></textarea>
                        </div>
                  </div>
                    <div class="">
                      <h4 class="colorR section-title mb-2 font-bold" style="font-size: 14px; margin: 5px 0 8px; font-weight: 600;">{{title_promotion}}</h4>
                      <SkinnyBanner :SkinnyItem="brandBanner"></SkinnyBanner>
                  </div>
                </div>
              </div>

              <!-- section nhập thông tin desktop -->
              <hr v-if="isMobile" />
              <!--đóng section nhập thông tin desktop -->
            </div>
            <!-- thông tin đơn hàng và thanh toán -->
            <div class="col-lg-4 col-md-5 col-sm-6">
              <div class="fixed-cart">
                <div class="border-block mb-5">
                  <div class="order-prices mb-0">
                    <section
                      class="section payment_module mt-0 mb-0 payment_online"
                      v-if="cartStore && formshippingaddress['street_address']"
                    >
                      <!-- <span class="line-4 d-block mt-2 row"></span> -->
                      <div class="d-flex">
                        <b class="mb-1 title-main pb-1 p-0 text-left col-md-8"
                          >Đơn vị vận chuyển</b
                        >
                        <a
                          class="text-right text-primary col-md-4 p-0"
                          @click="showShippingUnit(cartStore)"
                          >Thay đổi</a
                        >
                      </div>
                      <div class="list-group">
                        <div class="row">
                          <div class="col-md-8 cs-tran">
                            {{
                              formshippingaddress && formshippingaddress["shipping_code"]
                                ? formshippingaddress["shipping_name"]
                                : "Vui lòng chọn đơn vị vận chuyển"
                            }}
                            <p
                              v-if="
                                formshippingaddress && formshippingaddress['shipping_code']
                              "
                            >
                              Dự kiến nhận hàng trong
                              {{ formshippingaddress["estimated_deliver_time"] }}
                            </p>
                            <p
                              v-if="
                                formshippingaddress && formshippingaddress['shipping_code']
                              "
                            >
                              {{ formshippingaddress["shipping_note"] }}
                            </p>
                            
                          </div>
                          <b
                            v-if="
                              formshippingaddress && formshippingaddress['shipping_code']
                            "
                            class="text-right col-md-4 pr-3"
                            style="color: rgb(145, 18, 9); font-size: 16px"
                            >{{ formshippingaddress["ship_fee"] | formatNumber }} đ</b
                          >
                        </div>
                      </div>
                    </section>
                    <section
                      class="section payment_module mt-0 mb-0 payment_online"
                    >
                      <span class="line-4 d-block mt-2 row"></span>
                      <div class="d-flex">
                        <h3 class="col-md-8 mb-1 title-main p-o pb-1 pl-pr-0">
                          Phương thức thanh toán
                        </h3>
                        <a
                          class="text-right text-primary col-md-4 p-0"
                          @click="showPaymentModal(cartStore['payment_method'])"
                          >Thay đổi</a
                        >
                      </div>

                      <div class="list-group">
                        <div v-if="cartStore">
                          <span class="cs-tran pl-pr-0">{{ cartStore["payment_method_name"] }}</span>
                        </div>
                      </div>
                    </section>

                    <section
                      class="section payment_module mt-0 mb-0 payment_online"
                      v-if="user"
                    >
                      <span class="line-4 d-block mt-2 row"></span>
                      <div class="d-flex">
                        <b class="mb-1 title-main pb-1 p-0 text-left col-md-6"
                          >Khuyến mãi </b
                        >
                        <p
                          class="text-right col-md-6 p-0"
                          style="color: rgb(120, 120, 120);"
                        >
                        Có thể chọn 2
                        <!-- <img src="../../assets/images/icon/answer_icon.png" alt="" style="width: 10%; vertical-align: text-bottom;" id="tooltip-target-1"/> -->
                        <i class="fa fa-question-circle color-nuti" id="tooltip-target-1"></i
                          ><b-tooltip target="tooltip-target-1" triggers="hover">
                            Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển
                          </b-tooltip>
                        </p>
                      </div>

                      <div class="bLwVah row" v-if="formshippingaddress && formshippingaddress['coupon_code']">
                        <div class="show-more" >
                            <span id="coupon_code">
                              <img class="pl-3 " style="width: 20%;" src="../../assets/images/icon/vnd.jpg" alt="" />
                              <span class="pl-1">{{ formshippingaddress['coupon_name'] }}</span>
                            </span>
                           <span class="float-right mb-1" style="margin: 12px 18px 5px 3px;">
                             <a @click="removeCoupon('coupon_code')">
                                <p> Bỏ chọn </p>
                             </a>
                           </span>
                        </div>
                        <hr>
                      </div>
                     <div class="bLwVah row" v-if="formshippingaddress && formshippingaddress['coupon_delivery_code']">
                        <div class="show-more" >
                          <span id="delivery_inf">
                            <img class="pl-3 " style="width: 20%;" src="../../assets/images/icon/free.jpg" alt="" />
                            <span class="pl-1">{{ formshippingaddress["coupon_delivery_name"] }}</span>
                          </span>
                           <span class="float-right mb-1" style="margin: 12px 18px 5px 3px;">
                             <a @click="removeCoupon('coupon_delivery_code')">
                                <p > Bỏ chọn </p>
                             </a>
                           </span>
                        </div>
                        <hr>
                      </div>
                      <div class="bLwVah">
                        <div
                          class="show-more"
                          @click="showCoupons(cart)"
                        >
                          <span class="float-right"
                            >Chọn Hoặc Nhập Mã</span
                          >
                          <img
                            src="../../assets/images/icon/voucher.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </section>
                    <div class="total-padding-mobile-676" v-if="cartStore">
                      <span class="line-4 d-block mt-2 row"></span>
                      <ul>
                        <li
                          class="list-group-item"
                          :class="totalItem.code"
                          v-for="(totalItem, i) in cartStore['totals']"
                          :key="i"
                        >
                          {{ totalItem.title | truncate(25) }} :
                          <span class="float-right">
                            <strong>{{ totalItem.text }}</strong>
                          </span>
                        </li>
                        <li
                          class="list-group-item text-danger" v-if="cartStore['saving'] > 0"
                        >
                          Tiết kiệm :
                          <span class="float-right text-danger">
                            <strong>{{cartStore['saving_fortmated']}}</strong>
                          </span>
                        </li>
                      </ul>
                    </div>

                         
 
                    <a
                      class="payment_sub text-white text-center mt-1 d-block"
                      style="width: 100%; border-radius:26px;height: 60px;"
                      id="confim-order"
                    >
                      <div class="btn-checkout">
                        <b-button
                          type="submit"
                          block
                          class="btn btn-lg btn-nuti"
                          :disabled="isDisable"
                          >XÁC NHẬN ĐƠN HÀNG</b-button
                        >
                      </div>
                    </a>
                     <b-tooltip target="confim-order" triggers="hover" v-if="cart && cart['limit_buy_order'] > 0">
                      <section class="container" target="confim-order" triggers="hover">
                        <div class="row">
                          <div >
                            <div class="alert-box information"><b class="colorR"> Bạn chỉ được mua tối đa {{cart['qty_buy_order']}} đơn hàng trong suốt chương trình Flash Sale. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</b></div>
                          </div>
                         </div>
                      </section><!-- end of main content  -->
                     </b-tooltip>

                     <b-tooltip target="confim-order" triggers="hover" v-if="cart && cart['limit_qty_order'] > 0">
                      <section class="container" target="confim-order" triggers="hover">
                        <div class="row">
                          <div >
                            <div class="alert-box information"><b class="colorR"> Bạn chỉ được mua tối đa {{cart['limit_qty_order']}} sản phẩm trong giỏ hàng</b></div>
                          </div>
                         </div>
                      </section><!-- end of main content limit_qty_order -->
                     </b-tooltip>

                     <b-tooltip target="confim-order" triggers="hover" v-if="cart && cart['qty_max_day']">
                      <section class="container" target="confim-order" triggers="hover">
                        <div class="row">
                          <div >
                            <div class="alert-box information"><b class="colorR"> Bạn chỉ được mua tối đa {{cart['qty_max_day']}} đơn hàng/ngày. Vui lòng quay lại vào ngày hôm sau</b></div>
                          </div>
                         </div>
                      </section><!-- end of main content limit_qty_order -->
                     </b-tooltip>
                     <b-tooltip target="confim-order" triggers="hover" v-if="limitBuyOrder && limitBuyOrder['limit_buy_order']">
                      <section class="container" target="confim-order" triggers="hover">
                        <div class="row">
                          <div >
                            <div class="alert-box information"><b class="colorR"> Bạn chỉ được mua tối đa {{ limitBuyOrder['limit_buy_order'] }} đơn hàng trong suốt chương trình {{limitBuyOrder['title']}}. Cảm ơn bạn đồng hành cùng Nutifood san sẻ suất mua với cộng đồng.</b></div>
                          </div>
                         </div>
                      </section><!-- end of main content limitBuyOrder -->
                     </b-tooltip>
                    <div class="col-12 d-flex">
                      <a @click="clearCart" class="clear-cart text-center">
                        <i class="fa fa-trash"></i>&nbsp;&nbsp;Xóa giỏ hàng
                      </a>
                    </div>
                    <br v-if="isMobile" /><br v-if="isMobile" />
                    <br v-if="isMobile" />
                  </div>
                </div>
              </div>
            </div>
         
            <!-- Đóng thông tin đơn hàng và thanh toán -->
          </div>
          <div class="coupons-oder-fixed" id="couponOrderFixed" v-if="user">
            <div class="d-flex flex-row">
             
              <div class="col-6 text-left">
                <span
                  @click="showCoupons(cartStore)"
                  class="btn-voucher text-left"
                >
                  <p
                    class="text-danger"
                    v-if="cartStore && cartStore.coupon_price"
                  >
                   <i class="fa fa-caret-left"></i>
                    {{ cartStore.coupon_price | formatNumber }} đ
                  </p>
                  <p>
                     <i class="fa fa-caret-left"></i>{{cartStore && !cartStore['coupon_price'] ? 'Chọn Hoặc Nhập Mã' : 'Chọn Mã Khác' }}
                  </p>
                </span>
              </div>
               <div class="col-6 text-right">
                <!-- <img src="~/assets/images/icon/voucher.png" alt=""> -->
                <span style="color: #006e43">NutifoodShop Voucher</span>
              </div>
            </div>
          </div>
          <div class="confirm-order-fixed" id="confirmOrderFixed">
            <div class="d-flex flex-row" v-if="cartStore">
              <div class="col-7 text-left">
                <p style="margin: 5px 0; font-weight: bold; color: #dc3545">
                  Thành tiền: {{ cartStore["total_down"] }}
                </p>
              </div>
              <div class="col-5">
                <b-button
                  type="submit"
                  :disabled="isDisable"
                  style="margin: 0; font-weight: bold; color: #fff; border: 1px solid #006e43; padding: 5px 10px; border-radius: 0.25rem; background: #006e43;"
                >
                  THANH TOÁN
                </b-button>
              </div>
            </div>
          </div>
          <coupons :couponList="couponList" @checkCoupon="checkCoupon"></coupons>
          <shippingUnit :shipFeeList="shipFeeList" @shipFeeEmit="shipFeeEmit"></shippingUnit>
          <paymentModal :payments="payments" @updatePayment="updatePayment"></paymentModal>
          <AddLocationModal @shippingAddress="shippingAddress"></AddLocationModal>
          <vpBankPaymnet></vpBankPaymnet>
          <transactionProcessor></transactionProcessor>
          <NotifyProductInCart @removeProductInCart="removeProductInCart" :arrayProduct="arrayProduct"></NotifyProductInCart>
        </form>
      </ValidationObserver>
      
    </div>
    
  </main>
  <!-- /.container -->
</template>

<script>
import SkinnyBanner from "~/components/Banners/SkinnyBanner";
import { mapState, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { isMobile, isIndex } from "~/plugins/util";
import coupons from "~/pages/checkout/coupons";
import shippingUnit from "~/pages/checkout/shipping-unit";
import paymentModal from "~/pages/checkout/paymentModal";
import AddLocationModal from "~/components/AddLocationModal";
import vpBankPaymnet from "~/pages/checkout/vpBankPayment";
import transactionProcessor from "~/pages/checkout/transactionProcessor";
import NotifyProductInCart from "~/components/NotifyProductInCart";
export default {
  data() {
    return {
      limitBuyOrder: null,
      limitSale: null,
      limitQtyMinSale: null,
      qty_limit_flash_sale:0,
      index_limit_qty_fs: 0,
      brandBanner:[],
      title_promotion: null,
      outvat: 0,
      checked: false,
      scrolledToBottom: false,
      isMobile: null,
      coupon: "",
      reward: null,
      cart: {},
      totalFormatted: null,
      paymentaddress: [],
      countries: [],
      cities: [],
      wards: [],
      districts: [],
      payments: [],
      user_phone: "",
      submitted: false,
      islogged: null,
      formshippingaddress: {
        cart_id: "",
        phone: "",
        note: "",
        email: "",
        distributor_id: "",
        distributor_name: "",
        distributor_code: "",
        distributor_phone: "",
        distributor_city_code: "",
        distributor_district_code: "",
        distributor_ward_code: "",
        distributor_city_name: "",
        distributor_district_name: "",
        distributor_ward_name: "",
        distributor_lat: "",
        distributor_long: "",
        order_channel: "WEB",
        full_name: "",
        city_code: "",
        district_code: "",
        ward_code: "",
        city_name: "",
        district_name: "",
        ward_name: "",
        street_address: "",
        customer_lat: "",
        customer_long: "",
        is_default: 0,
        session_id: "",
        payment_method: "CASH",
        order_type: "GUEST",
        seller_id: "",
        seller_code: "",
        seller_name: "",
        shipping_unit: "",
        id: "",
        invoice_city_code:"",
        invoice_city_name:"",
        invoice_district_code:"",
        invoice_district_name:"",
        invoice_ward_code:"",
        invoice_ward_name:"",
        invoice_street_address:"",
        invoice_company_name: "",
        invoice_tax: "",
        invoice_company_address: "",
        coupon_delivery_code: "",
        coupon_delivery_name: "",
        coupon_delivery_price: "",
        shipping_code: "",
        shipping_method_code: "",
        shipping_name: "",
        shipping_service: "",
        shipping_note: "",
        ship_fee: 0,
        estimated_deliver_time: "",
        is_free_ship: 0,
        lading_method: "",
        ship_fee_start: 0,
      },
      settingSystem: null,
      profile: null,
      clicked: false,
      product_qty: null,
      couponList: [],
      shipFee: null,
      hideModal: true,
      shippingAddressActive: null,
      shippingAddressActiveChange: null,
      shipFeeList: null,
      shippingAddressList: null,
      isShowAddress: true,
      isDisable: false,
      isAutoCoupon: false,
      validated: 0,
      hidden_Distributors_if: "",
      arrayProduct: [],
      limitOrder: null,
    };
  },
  components: {
    SkinnyBanner,
    ValidationProvider,
    ValidationObserver,
    coupons,
    shippingUnit,
    paymentModal,
    AddLocationModal,
    vpBankPaymnet,
    transactionProcessor,
    NotifyProductInCart,
  },
  computed: mapState({
    user: (state) => state.user.user,
    cartStore: (state) => state.cart.cart,
  }),
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
    if (!process.server) {
      this.isMobile = isMobile();
      this.formshippingaddress['order_channel'] = this.isMobile == true ? 'MWEB' : 'WEB';
      if (document.getElementById("confirmOrderFixed")) {
        window.addEventListener('scroll', ()=>{
          let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          // this.scrolledToBottom = true; // replace it with your code
          if (document.getElementById("confirmOrderFixed")) {
            let element = document.getElementById("confirmOrderFixed");
            element.classList.add("displayNone");
          }
          if (document.getElementById("couponOrderFixed")) {
            let element = document.getElementById("couponOrderFixed");
            element.classList.add("displayNone");
          }
        }
        if (bottomOfWindow == false) {
          if (document.getElementById("confirmOrderFixed")) {
            let element = document.getElementById("confirmOrderFixed");
            element.classList.remove("displayNone");
          }
          if (document.getElementById("couponOrderFixed")) {
            let element = document.getElementById("couponOrderFixed");
            element.classList.remove("displayNone");
          }
        }
        });
      }
    }
  },
  created() {
  
    this.getBrandBanner();
    this.getCities();
    this.getCart();
    this.getPayment();
  
    let group_code = "";
    if (process.browser) {
      this.islogged = localStorage.getItem("id_token");
      this.phone = localStorage.getItem("phone");
      group_code = localStorage.getItem("group_code");
    }
    if (this.islogged) {
      this.getShippingAddress();
      if (group_code == "AGENT") {
        this.formshippingaddress.order_type = "AGENCY";
      } else if (group_code == "OUTLET") {
        this.formshippingaddress.order_type = "GROCERY";
      }
    }

  },

  methods: {
    sendNotifyToAdmin() {
      console.log("send socket...");
      /* Emit events */
      const that = this;
      this.socket.emit(
        "ecom_sytem_message",
        {
          event: "NEW_ORDER",
          user_code: that.formshippingaddress.distributor_code,
          message: `Khách hàng ${that.formshippingaddress.full_name} đã đặt hàng thành công.`
        },
        resp => {
          /* Handle response, if any */
          console.log("send socket success:", resp);
        }
      );
    },
    buildCartForm(data) {
      this.cart = data;
      this.hidden_Distributors_if = data["shipping_method_code"];
      this.formshippingaddress["cart_id"] = data["id"];
      this.formshippingaddress["is_free_ship"] = data["is_freeship"];
      this.formshippingaddress["ship_fee_start"] = data && data["ship_fee_start"] ? data["ship_fee_start"] : 0;
      this.formshippingaddress["shipping_code"] = data["shipping_method_code"];
      this.formshippingaddress["shipping_name"] = data["shipping_method_name"];
      this.formshippingaddress["shipping_service"] = data["shipping_service"];
      this.formshippingaddress["shipping_note"] = data["shipping_note"];
      this.formshippingaddress["estimated_deliver_time"] = data["estimated_deliver_time"];
      this.formshippingaddress["ship_fee"] = data["ship_fee"];
      this.formshippingaddress["coupon_delivery_code"] = data["coupon_delivery_code"];
      this.formshippingaddress["coupon_delivery_name"] = data["coupon_delivery_name"];
      this.formshippingaddress["coupon_delivery_price"] = data["coupon_delivery_price"];
      this.formshippingaddress["coupon_code"] = data && data["coupon_code"];
      this.formshippingaddress["coupon_name"] = data["coupon_name"];
      this.formshippingaddress["coupon_price"] = data["coupon_price"];
      this.formshippingaddress["voucher_code"] = data["voucher_code"];
      this.formshippingaddress["voucher_title"] = data["voucher_title"];
      this.formshippingaddress["voucher_value"] = data["voucher_value"];
      this.formshippingaddress["voucher_value_use"] = data["voucher_value_use"];
      this.formshippingaddress['distributor_name'] = data && data["distributor_name"] ? data['distributor_name'] : '';
      this.formshippingaddress['distributor_code'] = data && data["distributor_code"] ? data['distributor_code'] : '';
      this.formshippingaddress['distributor_id'] = data && data["distributor_id"] ? data['distributor_id'] : '';
      this.formshippingaddress['distributor_phone'] = data && data["distributor_phone"] ? data['distributor_phone'] : '';
      this.formshippingaddress['distributor_city_code'] = data && data["distributor_city_code"] ? data['distributor_city_code'] : '';
      this.formshippingaddress['distributor_city_name'] = data && data["distributor_city_name"] ? data['distributor_city_name'] : '';
      this.formshippingaddress['distributor_ward_code'] = data && data["distributor_ward_code"] ? data['distributor_ward_code'] : '';
      this.formshippingaddress['distributor_ward_name'] = data && data["distributor_ward_name"] ? data['distributor_ward_name'] : '';
      this.formshippingaddress['distributor_district_code'] = data && data["distributor_district_code"] ? data['distributor_district_code'] : '';
      this.formshippingaddress['distributor_district_name'] = data && data["distributor_district_name"] ? data['distributor_district_name'] : '';
      this.formshippingaddress['distributor_lat'] = data && data["lat"] ? data["lat"] : "";
      this.formshippingaddress['distributor_long'] = data && data["long"] ? data["long"] : "";
      if(data && data['limit_order_day'] || data && data['qty_max_day']) {
        this.isDisable = true;
        this.showNotifySectionModal('limitOrder');
      }
      if(this.formshippingaddress && this.formshippingaddress['coupon_delivery_code'] && !this.formshippingaddress["shipping_code"]) this.removeCoupon('coupon_delivery_code');
      if(this.islogged) this.getCoupons(data);
      this.checklimitQtyFlashsale_cart();
      this.checkLimitQtyFlashsale();
      this.lstProductAddress(data && data["details"]);
      this.checkLimitSale(data && data['limit_sale']);
      if(data && !data['details']) {
        this.$router.push("/");
        this.cart = null;
        this.$store.dispatch("app/showLoadingOverlay", false);
      }
    },
    getBrandBanner() {
      const banner_code = 'PROMOTION-ADS'
      this.$store
        .dispatch("app/fetchData", `/v1/client/banners/${banner_code}`)
        .then((resp) => {
          if (resp.data) {
            this.brandBanner = resp.data.details;
            this.title_promotion = resp.data.details[0].name
          }
        })
        .catch((err) => {
          // //console.log("get banner error:", err);
      });
    },
    getPayment() {
      this.$store.dispatch("cart/getPaymentMethod").then((data) => {
        this.payments = data;
      });
    },
    getShippingAddress() {
      this.$store
        .dispatch("user/getShippingAddress")
        .then(data => {
          this.isShipFee = true;
          this.shippingAddressList = data["data"];
          data && data["data"].filter(item => {
              if (item["is_default"] == 1) {
                this.shippingAddressActive = item;
                this.shippingAddressActiveChange = item["id"];
              }
              this.formshippingaddress['full_name'] = this.shippingAddressActive && this.shippingAddressActive["full_name"] ? this.shippingAddressActive['full_name'] : '';
              this.formshippingaddress['phone'] = this.shippingAddressActive && this.shippingAddressActive["phone"] ? this.shippingAddressActive['phone'] : '';
              this.formshippingaddress['city_code'] = this.shippingAddressActive && this.shippingAddressActive["city_code"] ? this.shippingAddressActive['city_code'] : '';
              this.formshippingaddress['district_code'] = this.shippingAddressActive && this.shippingAddressActive["district_code"] ? this.shippingAddressActive['district_code'] : '';
              this.formshippingaddress['ward_code'] = this.shippingAddressActive && this.shippingAddressActive["ward_code"] ? this.shippingAddressActive['ward_code'] : '';
              this.formshippingaddress['city_name'] = this.shippingAddressActive && this.shippingAddressActive["city_name"] ? this.shippingAddressActive['city_name'] : '';
              this.formshippingaddress['district_name'] = this.shippingAddressActive && this.shippingAddressActive["district_name"] ? this.shippingAddressActive['district_name'] : '';
              this.formshippingaddress['ward_name'] = this.shippingAddressActive && this.shippingAddressActive["ward_name"] ? this.shippingAddressActive['ward_name'] : '';
              this.formshippingaddress['street_address'] = this.shippingAddressActive && this.shippingAddressActive["street_address"] ? this.shippingAddressActive['street_address'] : '';
            });
        })
        .catch(err => {
          // //console.log("getShippingAddress err: ", err);
        });
    },
    getCities() {
      this.$store.dispatch("app/fetchData", "v0/1/cities").then((data) => {
        this.cities = data.data;
      });
    },
    getDistrict(city_code) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${city_code}/districts`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.districts = data.data;
        })
        .catch((err) => {
          // this.$toast.error(
          //   "Không thể lấy được Quận huyện, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getWard(district_code) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${district_code}/wards`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.wards = data.data;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getStreet(data){
      const city = this.cities.find((res) => {
      return this.formshippingaddress['invoice_city_code'] == res['code'];
      });
      const district = this.districts.find((res) => {
      return this.formshippingaddress['invoice_district_code'] == res['code'];
      });
      const ward = this.wards.find((res) => {
      return this.formshippingaddress['invoice_ward_code'] == res['code'];
      });
      this.formshippingaddress['invoice_company_address'] =  data + ',' + ward['name'] + ',' + district['name'] + ',' + city['name'];
      this.$store.dispatch("cart/updateCartInfo",this.formshippingaddress);
    },
    getCart() {
      this.isDisable = false;
      this.$store.dispatch("cart/getCart")
        .then((res) => {
          if (res && res['details'].length) {
            this.clicked = false;
            this.cart = res;
            this.formshippingaddress["cart_id"] = res && res["id"];
            this.formshippingaddress["cart_id"] ? this.updateCartInfo('update') : this.getCart();
            this.$store.dispatch("app/showLoadingOverlay", false);
          } else {
            this.$router.push("/");
            this.cart = null;
            this.$store.dispatch("app/showLoadingOverlay", false);
          }
         
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast.error("Không thể thực thi").goAway(1500);
        });
    },
    getAllShipFee(data) {
      this.$store.dispatch("cart/getShipFee", data)
        .then((data) => {
            this.shipFeeList = data['data'];
            this.$store.dispatch("app/showLoadingOverlay", false);
        })
        .catch((err)=> {
            console.log(err);
            this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getCoupons(cart) {
      this.$store.dispatch("cart/getCoupons", cart['id'])
        .then(resp => {
          this.couponList = resp;
          if(!cart['coupon_delivery_code'] && !this.isAutoCoupon) {
            if(cart['shipping_method_code'] && cart['ship_fee'] > 0) {
              resp.find((item) => {
                if(item['type_discount'] == 'shipping' && item['is_apply'] == 1 && item['free_shipping'] == 1) {
                  return this.autoApplyCouponInCart(item && item['code'], 'ship')
                }
                if(item['type_discount'] == 'shipping' && item['is_apply'] == 1 && item['free_shipping'] == 0) {
                  return this.autoApplyCouponInCart(item && item['code'], 'ship');
                }
              });
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    checkLimitSale(dataTotal) {
      this.limitBuyOrder = dataTotal && dataTotal.find((res) => res && res['limit_buy_order'] && Math.min(res['limit_buy_order']));
      this.limitSale = dataTotal && dataTotal.find((res) => res && res['limit_sale'] && Math.min(res['limit_sale']));
      this.limitQtyMinSale = dataTotal && dataTotal.find((res) => res && res['min_qty_sale'] && Math.min(res['min_qty_sale']));
      if(this.limitBuyOrder && this.limitBuyOrder['limit_buy_order'] || this.limitSale && this.limitSale['limit_sale'] || this.limitQtyMinSale && this.limitQtyMinSale['min_qty_sale']) {
        this.isDisable = true;
      }
    },
    lstProductAddress(data) {
      let arrayProduct = [];
      data && data.filter((res) => {
        if(res && res['notify'] || res && res['notify_limit']) {
           if(this.arrayProduct && this.arrayProduct.find((y) => y['product_code'] == res['product_code'])){}
              else arrayProduct.push(res);
        }
      })
      this.arrayProduct = arrayProduct;
    },
    updateCartInfo(key) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      if(key != '') this.resetShipFee();
      this.$store
        .dispatch("cart/updateCartInfo", this.formshippingaddress)
        .then(res => {
          this.cart = res && res['data'];
          this.buildCartForm(res && res['data']);
          if(res && res['data'] && res['data']['customer_ward_code'] && key != '') this.getAllShipFee(res && res["data"]);
          if(key == '') this.$store.dispatch("app/showLoadingOverlay", false);
        })
        .catch(err => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    onChange(item) {
        if(item && item['quantity'] <= 0) {
          item['quantity'] = 1;
        }
        this.updateCartItemQty(item);
    },

    removeCoupon(key) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      const paramUrl = key == 'coupon_delivery_code' ? 'removeDelivery' : 'removeCoupon';
      this.$store.dispatch(`cart/${paramUrl}`)
      .then((res) => {
        this.$store.dispatch('cart/getCart');
         this.$store.dispatch("app/showLoadingOverlay", false);
      })
      .catch((err) => console.log(err))
    },
    clearCart() {
      if(this.cart && this.cart['id']) {
        this.$swal({
          icon: "warning",
          text: 'Bạn muốn xoá tất cả sản phẩm?',
          showCancelButton: true,
          confirmButtonText: "Xoá",
          cancelButtonText: "Không"
        }).then(result => {
              if(result['isConfirmed']) {
              this.isDisable = false;
              this.$store.dispatch("app/showLoadingOverlay", true);
              this.$store
                .dispatch("cart/clearCart", this.cart.id)
                .then((resp) => {
                  this.$router.push("/");
                  this.$store.dispatch("cart/getCart");
                  this.$store.dispatch("app/showLoadingOverlay", false);
                })
                .catch(err => {
                  this.$store.dispatch("app/showLoadingOverlay", false);
                  this.$toast
                    .error("Có lỗi khi xóa giỏ hàng")
                    .goAway(1500);
                });
              }
          })
          .catch(err => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      }
      
    },

    increaseCartItemQty(item, i) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      item.quantity++;
      this.updateCartItemQty(item);
    },
    decreaseCartItemQty(item) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      if (item.quantity >= 1) {
        item.quantity--;
        this.updateCartItemQty(item);
      }
    },

    updateCartItemQty(item) {
      this.$store
        .dispatch("cart/updateCartItemQty", {
          product_id: item.id,
          quantity: item.quantity,
        })
        .then(() => {
          this.isDisable = false;
          this.clicked = false;
          this.$store.dispatch('cart/getCart')
          .then((res) => {
            if(res && res['details'].length) {
              this.updateCartInfo('update')
            }
            if(!res || res && !res['details'].length) {
              this.$router.push("/");
            }
          })
        })
        .catch((err) => {
          // this.$toast.error("Không thể cập nhật số lượng").goAway(150000);
        });
    },
  
    checkCoupon() {
      this.isAutoCoupon = true;
      this.isDisable = false;
      this.updateCartInfo('');
    },
    updatePayment(value) {
      this.isDisable = false;
      this.formshippingaddress['payment_method'] = value;
      this.updateCartInfo('');
    },
    shipFeeEmit(data) {
      this.formshippingaddress['shipping_code'] = data['shipping_code'];
      this.formshippingaddress['shipping_name'] = data['shipping_name'];
      this.formshippingaddress['shipping_service'] = data['shipping_service'];
      this.formshippingaddress['ship_fee'] = data['ship_fee'];
      this.formshippingaddress['estimated_deliver_time'] = data['estimated_deliver_time'];
      this.formshippingaddress['shipping_note'] = data['shipping_note'];
      this.formshippingaddress['lading_method'] = data['lading_method'];
      this.formshippingaddress['ship_fee_start'] = data['ship_fee'];
      this.isDisable = false;
      this.updateCartInfo('');
    },
    removeProductInCart() {
      this.updateCartInfo('');
    },
    shippingAddress(data) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.isDisable = false;
      this.updateCartInfo('update');
      this.getShippingAddress();
    },
    checklimitQtyFlashsale_cart(){
      if(this.cart['limit_buy_order'] > 0 || this.cart['check_limit_buy'] > 0){
        this.isDisable = true;
      }
      if(this.cart['limit_qty_order'] && this.cart['limit_qty_order'] > 0){
        this.isDisable = true;
        return
      }
      if(this.cart && this.cart['qty_max_day'] || this.cart['min_amt'] || this.cart['max_amt']) {
        this.isDisable = true;
        return
      }
      this.$store.dispatch("app/showLoadingOverlay", false);
    },

    checkLimitQtyFlashsale(){
      let arrQty = [];
      this.qty_limit_flash_sale = 0;
      this.$store.dispatch("app/showLoadingOverlay", false);
      this.cart['details'].filter((item, index) => {
          if(item.flash_sale == 1){
              arrQty.push(item.quantity)
          }
          if(item.limit_qty_flash_sale && item.quantity > item.limit_qty_flash_sale){
            item.quantity = item.limit_qty_flash_sale
            this.updateCartItemQty(item);
            this.index_limit_qty_fs = item.id
            this.validated = 1
          }
          if(item.min_qty_flash_sale && item.quantity < item.min_qty_flash_sale){
            item.quantity = item.min_qty_flash_sale
            this.updateCartItemQty(item);
            this.index_limit_qty_fs = item.id
            this.validated = 1
          }
          if(item.limit_qty_sale && item.quantity > item.limit_qty_sale) {
            item.quantity = item.limit_qty_sale;
            this.updateCartItemQty(item);
          }
          if(item.min_qty_sale && item.quantity < item.min_qty_sale) {
            item.quantity = item.min_qty_sale;
            this.updateCartItemQty(item);
          }
      })

         setTimeout(() => {
           this.validated = 0;
        }, 25000);
        arrQty.forEach((value) =>{
            this.qty_limit_flash_sale += value;
        });

    },
    deleteCartItem(item, index) {
      this.$swal({
        icon: "warning",
        text: 'Bạn muốn xoá sản phẩm này?',
        showCancelButton: true,
        confirmButtonText: "Xoá",
        cancelButtonText: "Không"
          }).then(result => {
            if(result['isConfirmed']) {
              this.$store.dispatch("cart/deleteCartItem", {
                key: item.id,
                index: index,
              })
              .then(() => {
                this.$store.dispatch('cart/getCart')
                .then((res) => {
                  if(res && res['details'].length) {
                    this.updateCartInfo('update')
                  }
                  if(!res || res && !res['details'].length) {
                    this.$router.push("/");
                    this.cart = null;
                  }
                })
              })
              .catch((err) => {
                this.$toast
                  .error(err ? `${err}` : 'Có lỗi khi xóa sản phẩm, vui lòng kiểm tra lại')
                  .goAway(1500);
              });
            }
          });
      
        
    },
   autoApplyCouponInCart(_code, key) {
      let data = {
        coupon_code: key != 'ship' ? _code : '',
        coupon_delivery_code: key == 'ship' ? _code : '',
        session_id: this.$store.state.app.session_id,
      };
      this.$store.dispatch("cart/addCoupon", data)
      .then(() => {
        this.updateCartInfo('')

      })
      .catch((err) => console.log("error:", err));
    },
   
    resetShipFee() {
      this.formshippingaddress['shipping_code'] = '';
      this.formshippingaddress['shipping_name'] = '';
      this.formshippingaddress['shipping_service'] = '';
      this.formshippingaddress['ship_fee'] = 0;
      this.formshippingaddress['estimated_deliver_time'] = '';
      this.formshippingaddress['shipping_note'] = '';
      this.formshippingaddress['shipping_method_code'] = '';
      this.formshippingaddress['lading_method'] = '';
    },
    onChecked(data) {
      this.isDisable = false;
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.resetShipFee();
      this.shippingAddressActiveChange = data['id'];
      this.formshippingaddress.full_name = data['full_name'];
      this.formshippingaddress.phone = data['phone'];
      this.formshippingaddress.city_code = data['city_code'];
      this.formshippingaddress.district_code = data['district_code'];
      this.formshippingaddress.ward_code = data['ward_code'];
      this.formshippingaddress.city_name = data['city_name'];
      this.formshippingaddress.district_name = data['district_name'];
      this.formshippingaddress.ward_name = data['ward_name'];
      this.formshippingaddress.street_address = data['street_address'];
      this.formshippingaddress.id = data['id'];
      this.updateCartInfo('update');
    },
    onSubmit(e) {
      if(!this.formshippingaddress['street_address']) {
       this.$swal({
              icon: "warning",
              text: `${this.islogged ? 'Vui lòng nhập thông tin nhận hàng!' : 'Vui lòng đăng nhập!'}`,
              confirmButtonText: "Xác nhận",
            }).then((result) => {
              this.checkLogin();
            });
      }else if (!this.formshippingaddress['shipping_code']) {
        this.$swal({
              icon: "warning",
              text: "Vui lòng chọn đơn vị vận chuyển!",
              confirmButtonText: "Xác nhận",
            }).then((result) => {
              this.showShippingUnit('');
            });
      } else if(!this.formshippingaddress['payment_method']) {
        this.$swal({
              icon: "warning",
              text: "Vui lòng chọn phương thức thanh toán!",
              confirmButtonText: "Xác nhận",
            }).then((result) => {
              this.showPaymentModal();
            });
      } else {
         this.$refs.form.validate()
        .then((success) => {
          if (success) {
            this.createOrder();
          } else {
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }

      
    },
     createOrder() {
      if (this.isDisable) {
              return;
      }
      if(this.arrayProduct && this.arrayProduct.length) {
        this.showNotifyProductInCartModal(this.cart);
        return;
      }
      this.isDisable = true;
      this.formshippingaddress.session_id = this.$store.state.app.session_id;
      this.formshippingaddress.payment_method = this.$store.state.cart.cart.payment_method;
      this.formshippingaddress['ship_fee'] = this.$store.state.cart.cart['ship_fee_down'];
      this.formshippingaddress['is_free_ship'] = this.$store.state.cart.cart['is_freeship'];
      this.$store.dispatch("cart/updateCartInfo" , this.formshippingaddress);
      this.$store.dispatch("app/showLoadingOverlay", true);
        if (this.formshippingaddress.payment_method == "CASH") {
          this.formshippingaddress.seller_id = "";
          this.formshippingaddress.seller_name = "";
          this.formshippingaddress.seller_code = "";
         this.$store.dispatch("app/updateData", { param: `/v1/client/confirm-order`, data: this.formshippingaddress})
              .then((data) => {
                this.sendNotifyToAdmin();
                this.isDisable = false;
                  this.$store.dispatch("app/showLoadingOverlay", false);
                    this.$swal({
                      icon: "success",
                      text: "Đơn hàng của bạn đã được đặt thành công!",
                      confirmButtonText: "Đóng",
                    }).then((result) => {
                      this.$router.push("/");
                      this.$store.dispatch("cart/getCart");
                      this.$nextTick(() => {
                        this.$refs.form.reset();
                      });
                    });
                })
                .catch((err) => {
                  this.$store.dispatch("app/showLoadingOverlay", false);
                  console.log("error confirm order:", err);
                });
        } else {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.checkoutPayments(this.formshippingaddress);
        }
    },
    checkoutPayments(dataOrder) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      let data = {
        cart_id: dataOrder["cart_id"],
        payment_method: dataOrder['payment_method'],
        type: "PAYMENT",
        device: dataOrder["order_channel"],
        url: `${process.env.BASE_URL}/checkout/checkout-payment`,
      };
      this.$store.dispatch("cart/checkoutPayments", data)
      .then((res) => {
       this.$store.dispatch("app/showLoadingOverlay", false);
       if( dataOrder['payment_method'] == "bank_transfer") {
         return res && res['data'] ? this.showTransactionModal(res['data']) : '';
       }
       if(dataOrder['payment_method'] == 'VPB') {
         return this.showVpBankModal(res && res['data'])
       }
       if(dataOrder['payment_method'] == 'VNPAY') {
        return window.location.href = res && res['data'] && res['data']['payUrl'];
       }
       if(res && res['data'] && res['data']['payment_method'] != 'VNPAY' && dataOrder["order_channel"] == 'MWEB') {
        return window.location.href = res && res['data'] && res['data']['url_payment_qr_app'];
       }
       if(dataOrder["order_channel"] != 'MWEB') {
        return res && res['data'] ? this.showTransactionModal(res['data']) : '';
       }
      })
      .catch((err) => console.log(err))
    },
    goBack() {
      window.history.back();
    },
    showModalLogin() {
      this.$store.commit("user/showLoginModal");
    },
    checkLogin() {
      this.islogged ? this.showAddLocationModal() : this.showModalLogin();
    },
    showShippingUnit(shipFee) {
      this.$store.commit("cart/showShippingUnit", shipFee);
    },
    showCoupons(coupon) {
      this.$store.commit("cart/showCoupons", coupon);
    },
    showPaymentModal(payment) {
      this.$store.commit("cart/showPaymentModal", payment);
    },
    showVpBankModal(data) {
      this.$store.commit("cart/showVpBankModal", data);
    },
    showAddLocationModal(data) {
      this.$store.commit("user/showAddLocationModal", data);
    },
    showTransactionModal(data) {
      this.$store.commit("cart/showTransactionProcessor", data);
    },
    showNotifyProductInCartModal(data) {
      this.$store.commit("cart/showNotifyProductInCart", data);
    },
    showNotifySectionModal(data) {
      this.$store.commit("app/showNotifySection", data);
    },
    
  },
  head: {
    title: "Giỏ hàng & thanh toán",
  },
};
</script>

<style lang="scss">

.alert-box {
    color: #333;
    border: 1px solid;
    border-radius: 5px;
    font-size: 12px;
    padding: 7px 7px;
    width: 292px;
    margin: 0px -4px;
}
.alert-box span {
	font-weight: bold;
	text-transform: uppercase;
}
.information {
  background: #e3f7fc;
	border-color: #87acbb;
}
.information span {
	color: #006e43;
}
.show-more span {
  color: #006e43;
}
.cs-chg a {
  float: right;
  font-size: 16px;
  color: rgb(6, 147, 235) !important;
}
.sc-iwsKbI {
  margin-bottom: 5%;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 3px 5px 2px rgb(6, 71, 235);
}
.sc-voucher {
  align-items: center;
  display: flex;
}

.sc-content {
  float: left;
}
.sc-btn {
  margin-left: 20%;
  display: flex;
  align-items: center;
}
.sc-btn i {
  color: rgb(5, 135, 35);
  font-size: 19px;
  margin-right: 5px;
}
.icon-voucher img {
  border-radius: 10px;
  width: 50px;
  height: 50px;
}
.has_special {
  color: #8c8585;
  text-decoration: line-through;
}
.form-address-shiping h2 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.cart-item {
  padding: 5px 0;
  border-bottom: 1px solid rgb(230, 230, 230);
  h4 {
    font-size: 1rem;
  }
}

.input-group-btn {
  .btn {
    background-color: #fff !important;
    border: 1px solid #ccc;
    padding: 2px 5px;
    font-size: 0.8rem;
    line-height: 1.5;
  }
}
.input-number {
  border: 1px solid #ccc;
  border-radius: unset !important;
  text-align: center;
  height: 25px;
  padding: 0;
}
.icon-payment-70 {
  width: 70px;
}
.icon-payment-30 {
  width: 65px;
}
.list-group-item {
  padding: 0.75rem 0rem !important;
}
.list-group-item.total {
  strong {
    color: rgb(216, 16, 56);
  }
}
.promotion-price {
  font-size: 12px;
}

// cart
.pick_localtion .border {
  border: 1px solid #ccc !important;
  border-radius: 8px !important;
}

#map-address {
  height: 400px !important;
}

#floating-panel {
  background-color: #fff;
  padding: 5px;
  text-align: center;
  line-height: 30px;
  padding-left: 10px;
}

#results-panel {
  position: absolute;
  background-color: #fff;
  z-index: 5;
  width: 375px;
  text-align: center;
  line-height: 30px;
  padding-left: 10px;
}

#description {
  font-size: 15px;
  font-weight: 300;
}

#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}

.pac-card {
  margin: 10px 10px 0 0;
  border-radius: 2px 0 0 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  font-family: Roboto;
}

#pac-container {
  padding-bottom: 12px;
  margin-right: 12px;
}

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-size: 13px;
  font-weight: 300;
}

#pac-input {
  background-color: #fff;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
  z-index: 99999;
}

.pac-container {
  z-index: 11000;
}

#pac-input:focus {
  border-color: #4d90fe;
}

#title {
  color: #fff;
  background-color: #4d90fe;
  font-size: 25px;
  font-weight: 500;
  padding: 6px 12px;
}
.news-summary {
  width: 340px;
}

.delete-item-cart {
  position: absolute;
  z-index: 10;
  border: 1px solid rgb(40, 40, 40);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 18px;
  opacity: 0.9;
  i {
    color: rgb(33, 33, 33);
  }
}

.clear-cart {
  padding: 10px 20px;
  border: 1px solid #006e43;
  border-radius: 0.25rem;
  color: #006e43 !important;
  width: 100%;
}
.clear-cart:hover {
  border: 1px solid #006e43;
  background: #006e43;
  color: #fff !important;
}
.clear-cart:active {
  border: 1px solid #005333;
  background: #005333;
  color: #fff !important;
}
.price-product-mobile {
  color: rgb(167, 167, 167);
  font-size: 11px;
  margin-bottom: 5px !important;
}

.confirm-order-fixed {
  display: none;
}
.coupons-oder-fixed {
  display: none;
}
.displayNone {
  display: none !important;
}
@media (max-width: 1024px) {
  .icon-voucher {
    max-width: 50%;
  }
  .sc-voucher {
    max-width: 80%;
  }
  .sc-content {
    font-size: 14px;
  }
  .sc-btn {
    margin-left: 10%;
  }
  .sc-btn i {
    display: none;
  }
  .sc-btn .btn-sm {
    font-size: 12px;
  }
  .icon-voucher img {
    height: 40px;
  }
  .cs-tran {
    padding: 0px 11px;
    width: 80%;
  }
  .cs-tran b {
    font-size: 14px !important;
  }
  .cs-chg {
    padding: 0px 10px 0px 0px;
    width: 20%;
  }
  .cs-chg a {
    font-size: 14px;
  }
}
@media (max-width: 768px) {
  .show-more span {
    font-size: 13px;
  }
  .show-more img {
    width: 20px;
  }
  .cs-tran b {
    font-size: 12px !important;
  }
  .cs-chg a {
    font-size: 14px;
  }
  .icon-voucher {
    max-width: 50%;
  }
  .sc-voucher {
    max-width: 80%;
  }
  .sc-content {
    font-size: 11px;
  }
  .sc-btn {
    margin-left: 10%;
  }
  .sc-btn i {
    display: none;
  }
  .sc-btn .btn-sm {
    font-size: 11px;
  }
  .icon-voucher img {
    height: 30px;
  }
  .confirm-order-fixed {
    display: block;
    background: #fff;
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 99;
    bottom: 70px;
    left: 0;
    // box-shadow: 1px 1px 3px #000;
    text-align: center;
    .d-flex {
      margin: 10px 0;
    }
  }
  .coupons-oder-fixed {
    display: block;
    background: #fff;
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 99;
    bottom: 120px;
    left: 0;
    box-shadow: 1px 1px 3px #000;
    text-align: center;
    .d-flex {
      margin: 10px 0;
    }
  }
}
.btn-nuti {
  color: #fff !important;
  background: #006e43 !important;
}

.btn-nuti:hover {
  color: #fff !important;
  background: #004b2e !important;
}

.btn-nuti:active {
  color: #fff !important;
  background: #00442a !important;
}
.title-product {
  color: #000 !important;
}
.title-usage {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.coupon-title {
  color: rgb(36, 36, 36);
  margin: 0px 0px 8px;
  text-transform: capitalize;
  font-size: 14px;
  line-height: 20px;
}
@media (min-width: 576px) and (max-width: 800px) {
  .is-mobile {
    margin-top: 10px !important;
  }
  .list-group-item {
    font-size: 11px !important;
  }
  .margin {
    margin-right: 88px;
  }
  .h4,
  h4 {
    font-size: 12px !important;
  }
  .text-center-mobile {
    text-align: center;
  }
  .the-title {
    font-size: 14px;
  }
  .title-main {
    font-size: 12px;
  }
  // .title-promotion{
  //   co
  // }
}
@media (max-width: 430px) {
  .icon-voucher {
    max-width: 30%;
  }
  .sc-voucher {
    max-width: 70%;
  }
  .sc-btn {
    margin-left: 25%;
  }
  .icon-voucher img {
    height: 50px;
  }
  .sc-content {
    font-size: 14px;
  }
  .sc-btn .btn-sm {
    font-size: 14px;
  }
  .cs-tran {
    width: 70%;
  }
  .cs-chg {
    width: 30%;
  }
}
</style>
