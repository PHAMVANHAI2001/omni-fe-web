<template>
  <div class="nav footer-nav">
    <div class="container">
      <div class="row">
        <div class="col-md-2 col-lg-2 pr-0">
          <div class="widget">
            <h5 class="widget-title" v-b-toggle.about-nuti>VỀ NUTIFOOD</h5>
            <b-collapse class="link-list" id="about-nuti">
              <li><a>Giới thiệu về Nutifood</a></li>
              <li>
                <a>Tuyển dụng khối Văn phòng</a>
              </li>
              <li>
                <a>Tuyển dụng Khối siêu thị</a>
              </li>
              <li>
                <a>Chính sách bảo mật</a>
              </li>
              <li>
                <a>Điều khoản sử dụng</a>
              </li>
            </b-collapse>
          </div>
        </div>
        <div class="col-md-10 col-lg-5">
          <div class="widget">
            <h5 class="widget-title ml-2" v-b-toggle.support>
              HỖ TRỢ KHÁCH HÀNG
            </h5>
            <b-collapse class="row" id="support">
              <div class="col-md-6 ml-4 pr-0 pl-0">
                Hotline miễn phí<br />
                CSKH: +84 000 0000 (8h-22h)*<br />
                Mua hàng: +84 000 0000 (7h:30-22h)*<br />
                (Tất cả các ngày trong tuần)
              </div>
              <div class="col-md-5 ml-0 pr-0 pl-0">
                <div class="link-list">
                  <li>
                    <a>Tra cứu hoá đơn</a>
                  </li>
                  <li>
                    <a>Mua & giao nhận Online</a>
                  </li>
                  <li>
                    <a>Qui định & hình thức thanh toán</a>
                  </li>
                  <li>
                    <a>Bảo hành & Bảo trì</a>
                  </li>
                  <li>
                    <a>Đổi trả & Hoàn tiền</a>
                  </li>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
        <div class="col-md-6 col-lg-2">
          <div class="widget">
            <h5 class="widget-title" v-b-toggle.shippingUnit>
              ĐƠN VỊ VẬN CHUYỂN
            </h5>
            <b-collapse class="logo-list row" id="shippingUnit">
              <div class="col-6">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/img/Logo_VNP_234x105.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/img/Logo_VNP_234x105.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/grab-express.png"
                        alt="#"
                    /></a>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                     <picture>
                        <source type="image/webp" srcset="~/assets/images/nutifood/img/viettel@3x.webp">
                        <img class="img-fluid" src="~/assets/images/nutifood/img/viettel@3x.png" alt="#"/>
                      </picture>
                    </a>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 pl-lg-5">
          <div class="widget">
            <h5 class="widget-title" v-b-toggle.paymentMethods>
              CÁCH THỨC THANH TOÁN
            </h5>
            <b-collapse class="logo-list row" id="paymentMethods">
              <div class="col-3">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/cod2x.png"
                    /></a>
                  </div>
                </div>
              </div>

              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/atm2x.png"
                    /></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/vnpay.png"
                    /></a>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/visa@3x.png"
                    /></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/master@3x.png"
                    /></a>
                  </div>
                </div>
              </div>

              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/jsb@3x.png"
                    /></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/zalopay@3x.png"
                    /></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="logo-item text-center">
                  <div class="logo-img border-img">
                    <a href="#">
                      <img
                        class="img-fluid"
                        src="~/assets/images/nutifood/img/momo@3x.png"
                    /></a>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    &nbsp;
  </div>
</template>
