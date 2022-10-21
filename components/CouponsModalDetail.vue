<template>
  <div
    id="infoCouponCard"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-lightbox"
          data-dismiss="modal"
          aria-label="Close"
          style="z-index: 999"
        >
          <span style="font-size: 28px; color: #000; font-weight: bold;"
            ><i class="fa fa-times-circle"></i
          ></span>
        </button>
        <img src="~/assets/images/phieu-qua-tang.jpg" alt="" />
        <div class="modal-body text-center">
          <h5>CHI TIẾT PHIẾU QUÀ TẶNG</h5>
          <p>HSD: 15/06/2021 - 30/06/2021</p>
        </div>
        <div class="info-main-content">
          <ul>
            <li>1224-3465-6325-5246 (32198498321)</li>
            <li>Không áp dụng cho sản phẩm đã khuyến mãi</li>
          </ul>
          <hr />
        </div>
        <div class="content-coupons-card text-center">
          <h1 style="font-family: 'Libre Barcode 39'; font-size:50px">
            1224-3465-6325-5246
          </h1>
          <h4>1224-3465-6325-5246</h4>
          <h5>(32198498321)</h5>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Superqr.svg/1200px-Superqr.svg.png"
            style="width: 250px !important"
          />
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
