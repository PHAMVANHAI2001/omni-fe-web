<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="shipping-unit-modal"
      id="shipping-unit-modal"
      title="Đơn vị vận chuyển"
    >
      <button
        type="button"
        class="btn btn-close"
        data-dismiss="modal"
        @click="closemodal"
      >
        <i class="fa fa-close"></i>
      </button>
      <div class="row">
        <div class="container mb-3">
          <span
            class="pull-left clear d-flex border-radius text-left notify p-3"
          >
            <p class="m-0 text-notify fs-13">
              <i class="fa fa-info-circle p-1 icon-info" aria-hidden="true"></i>
              Kính gửi <b>Quý Khách Hàng</b>!<br/> Theo chính sách giao hàng của <b>Đơn vị vận
              chuyển</b>, thời gian dự kiến giao hàng được tính từ ngày <b>Đơn vị vận
              chuyển chấp nhận bưu gửi</b>.<br/>Do tình hình Covid diễn biến phức tạp và
              nhằm tuân thủ qui định, đảm bảo sức khỏe cộng đồng, thời gian giao
              hàng có thể kéo dài hơn so với dự kiến. <br/>Nutifood Shop vẫn nỗ lực
              không ngừng nghỉ để nhanh chóng giao hàng phục vụ quý khách. <br/>Mong
              quý khách thông cảm và tiếp tục đồng hành cùng chúng tôi.
            </p>
          </span>
        </div>
      </div>

      <div class="container">
        <div
          class="content"
          id="accordion"
          v-for="(item, i) in shipFeeList"
          :key="i"
        >
          <div class="card">
            <div class="card-header pl-0">
              <span
                class="title-header"
                data-toggle="collapse"
                :href="`#${item['id']}`"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {{
                  item && item["save"]
                    ? item["name"]
                    : item && item["economy"]
                    ? item["name"]
                    : item && item["standard"]
                    ? item["name"]
                    : item["name"]
                }}
              </span>
            </div>
          </div>
          <div class="custom-control custom-radio mt-1" :id="`${item['id']}`">
            <div class="card" v-for="(itm, j) in item['save']" :key="j">
              <div class="card-header">
                <input
                  type="radio"
                  class="custom-control-input"
                  :id="itm['diff']"
                  :name="itm['diff']"
                  data-toggle="collapse"
                  v-bind:value="itm['diff']"
                  v-model.trim="shipping_diff"
                  @click="onChecked(itm, item)"
                  :href="`#${itm.diff}`"
                />
                <label
                  class="custom-control-label transporters row"
                  style="top: 0 !important;"
                  :for="itm['diff']"
                >
                  <div class="col-md-8">
                    {{ itm.name }}
                    <p class="font-12 mb-0">
                      Dự kiến nhận hàng trong
                      <span class="color-nuti">{{
                        itm.estimated_deliver_time
                      }}</span>
                      <br />
                    </p>
                  </div>
                  <div class="col-md-4 price">
                    {{ itm.fee_format }}
                  </div>
                </label>
              </div>
              <div :id="itm.diff" class="collapse" data-parent="#accordion">
                <div class="card-body ml-3 p-1">
                  <div
                    class="custom-control custom-radio mt-3"
                    v-for="(itmNote, k) in itm['note']"
                    :key="k"
                  >
                    <input
                      type="radio"
                      class="custom-control-input"
                      :id="`economy${k}`"
                      v-bind:value="itmNote"
                      v-model.trim="note"
                      @click="onCheckedService(itmNote, itm)"
                    />
                    <label
                      class="custom-control-label row"
                      :for="`economy${k}`"
                    >
                      <div class="col-md-12 pl-0">
                        <h5>{{ itmNote }}</h5>
                        <p class="mb-0">
                          {{
                            itmNote && itmNote == "Tất cả các ngày trong tuần"
                              ? "Phù hợp với địa chỉ nhà riêng, luôn có người ở nhà"
                              : "Phù hợp với địa chỉ văn phòng/cơ quan"
                          }}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" v-for="(itm, j) in item['economy']" :key="j">
              <div class="card-header">
                <input
                  type="radio"
                  class="custom-control-input"
                  :id="itm['diff']"
                  :name="itm['diff']"
                  data-toggle="collapse"
                  v-bind:value="itm['diff']"
                  v-model.trim="shipping_diff"
                  @click="onChecked(itm, item)"
                  :href="`#${itm.diff}`"
                />
                <label
                  class="custom-control-label transporters row"
                  style="top: 0 !important;"
                  :for="itm['diff']"
                >
                  <div class="col-md-8">
                    {{ itm.name }}
                    <p class="font-12 mb-0">
                      Dự kiến nhận hàng trong
                      <span class="color-nuti">{{
                        itm.estimated_deliver_time
                      }}</span>
                      <br />
                    </p>
                  </div>
                  <div class="col-md-4 price">
                    {{ itm.fee_format }}
                  </div>
                </label>
              </div>
              <div :id="itm.diff" class="collapse" data-parent="#accordion">
                <div class="card-body ml-3 p-1">
                  <div
                    class="custom-control custom-radio mt-3"
                    v-for="(itmNote, k) in itm['note']"
                    :key="k"
                  >
                    <input
                      type="radio"
                      class="custom-control-input"
                      :id="`economy${k}`"
                      v-bind:value="itmNote"
                      v-model.trim="note"
                      @click="onCheckedService(itmNote, itm)"
                    />
                    <label
                      class="custom-control-label row"
                      :for="`economy${k}`"
                    >
                      <div class="col-md-12 pl-0">
                        <h5>{{ itmNote }}</h5>
                        <p class="mb-0">
                          {{
                            itmNote && itmNote == "Tất cả các ngày trong tuần"
                              ? "Phù hợp với địa chỉ nhà riêng, luôn có người ở nhà"
                              : "Phù hợp với địa chỉ văn phòng/cơ quan"
                          }}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" v-for="(itm, j) in item['standard']" :key="j">
              <div class="card-header">
                <input
                  type="radio"
                  class="custom-control-input"
                  :id="itm['diff']"
                  :name="itm['diff']"
                  data-toggle="collapse"
                  v-bind:value="itm['diff']"
                  v-model.trim="shipping_diff"
                  @click="onChecked(itm, item)"
                  :href="`#${itm.diff}`"
                />
                <label
                  class="custom-control-label transporters row"
                  style="top: 0 !important;"
                  :for="itm['diff']"
                >
                  <div class="col-md-8">
                    {{ itm.name }}
                    <p class="font-12 mb-0">
                      Dự kiến nhận hàng trong
                      <span class="color-nuti">{{
                        itm.estimated_deliver_time
                      }}</span>
                      <br />
                    </p>
                  </div>
                  <div class="col-md-4 price">
                    {{ itm.fee_format }}
                  </div>
                </label>
              </div>
              <div :id="itm.diff" class="collapse" data-parent="#accordion">
                <div class="card-body ml-3 p-1">
                  <div
                    class="custom-control custom-radio mt-3"
                    v-for="(itmNote, k) in itm['note']"
                    :key="k"
                  >
                    <input
                      type="radio"
                      class="custom-control-input"
                      :id="`standard${k}`"
                      v-bind:value="itmNote"
                      v-model.trim="note"
                      @click="onCheckedService(itmNote, itm)"
                    />
                    <label
                      class="custom-control-label row"
                      :for="`standard${k}`"
                    >
                      <div class="col-md-12 pl-0">
                        <h5>{{ itmNote }}</h5>
                        <p class="mb-0">
                          {{
                            itmNote && itmNote == "Tất cả các ngày trong tuần"
                              ? "Phù hợp với địa chỉ nhà riêng, luôn có người ở nhà"
                              : "Phù hợp với địa chỉ văn phòng/cơ quan"
                          }}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" v-for="(itm, j) in item['express']" :key="j">
              <div class="card-header">
                <input
                  type="radio"
                  class="custom-control-input"
                  :id="itm['diff']"
                  :name="itm['diff']"
                  data-toggle="collapse"
                  v-bind:value="itm['diff']"
                  v-model.trim="shipping_diff"
                  @click="onChecked(itm, item)"
                  :href="`#${itm.diff}`"
                />
                <label
                  class="custom-control-label transporters row"
                  style="top: 0 !important;"
                  :for="itm.diff"
                >
                  <div class="col-md-8">
                    {{ itm.name }}
                    <p class="font-12 mb-0">
                      Dự kiến nhận hàng trong
                      <span class="color-nuti">{{
                        itm.estimated_deliver_time
                      }}</span>
                      <br />
                    </p>
                  </div>
                  <div class="col-md-4 price">
                    {{ itm.fee_format }}
                  </div>
                </label>
              </div>
              <div :id="itm.diff" class="collapse" data-parent="#accordion">
                <div class="card-body ml-3 p-1" v-if="itm['note']">
                  <div
                    class="custom-control custom-radio mt-3"
                    v-for="(itmNote, k) in itm['note']"
                    :key="k"
                  >
                    <input
                      type="radio"
                      class="custom-control-input"
                      :id="itmNote"
                      v-bind:value="itmNote"
                      v-model.trim="note"
                      @click="onCheckedService(itmNote, itm)"
                    />
                    <label class="custom-control-label row" :for="itmNote">
                      <div class="col-md-12 pl-0">
                        <h5>{{ itmNote }}</h5>
                        <p class="mb-0">
                          {{
                            itmNote && itmNote == "Tất cả các ngày trong tuần"
                              ? "Phù hợp với địa chỉ nhà riêng, luôn có người ở nhà"
                              : "Phù hợp với địa chỉ văn phòng/cơ quan"
                          }}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #modal-footer="{}">
        <b-button
          type="button"
          :disabled="shipping_code && note ? false : isDisable"
          @click="setShippingMethod()"
          class="btn btn btn-lg btn-nuti btn-secondary btn-block"
          >Áp dụng</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    shipFeeList: {},
  },
  data() {
    return {
      modalShow: false,
      isDisable: true,
      shipping_code: null,
      shipping_diff: null,
      shipping_name: null,
      shipping_service: null,
      service_name: null,
      ship_fee: null,
      estimated_deliver_time: null,
      session_id: null,
      note: null,
      lading_method: null,
      innerHeightDV: null,
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  created() {
    if (process.browser){
    }
    this.$store.subscribe((mutation) => {
      if (mutation.type == "cart/showShippingUnit") {
        this.session_id = localStorage.getItem("session_id");
        if (mutation.payload !== "") {
          setTimeout(() => {
            this.shipping_code = mutation.payload["shipping_method_code"];
            this.shipping_diff = mutation.payload["shipping_diff"];
            this.shipping_service = mutation.payload["shipping_service"];
            this.shipping_name = mutation.payload["shipping_method_name"];
            this.ship_fee = mutation.payload["ship_fee"];
            this.estimated_deliver_time =
              mutation.payload["estimated_deliver_time"];
            this.note = mutation.payload["shipping_note"];
          }, 250);
        }
        this.modalShow = true;
      }
    });
  },
  methods: {
    closemodal() {
      this.modalShow = false;
    },
    onChecked(value, data) {
      this.shipping_code = value["code"];
      this.shipping_diff = value["diff"];
      this.shipping_name = value["name"];
      this.ship_fee = value["fee"];
      this.estimated_deliver_time = value["estimated_deliver_time"];
      this.shipping_service = value["service"];
      this.note = value["note"][0];
      this.service_name = "";
      this.lading_method = data["code"];
    },
    onCheckedService(value, item) {
      this.note = value["note"];
    },
    setShippingMethod() {
      const data = {
        session_id: this.session_id,
        shipping_code: this.shipping_code,
        shipping_diff: this.shipping_diff,
        shipping_name: this.shipping_name,
        shipping_service: this.shipping_service ? this.shipping_service : "",
        shipping_note: this.note,
        extra_service: null,
        ship_fee: this.ship_fee,
        estimated_deliver_time: this.estimated_deliver_time,
        lading_method: this.lading_method,
        ship_fee_start: this.ship_fee,
      };
      this.$store
        .dispatch("cart/setShippingMethod", data)
        .then(() => {
          this.modalShow = false;
          this.$emit("shipFeeEmit", data);
        })
        .catch((err) => {
          console.log("error:", err);
        });
    },
  },
};
</script>
<style>
.btn-close {
  position: fixed;
  right: -5px;
  top: -5px;
  width: 40px;
  font-size: 20px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* background: #fff; */
  color: #000;
  padding: 0;
}
.btn {
  box-shadow: none !important;
}
.btn:hover {
  color: #fff;
  box-shadow: none !important;
}

.card-header {
  background-color: rgba(21, 193, 58, 0);
}
.transporters {
  font-weight: bold;
  font-size: 17px !important;
  color: rgb(75, 75, 75) !important;
  margin-left: 1%;
  padding-bottom: 0;
}
.card-body {
  border-top: 1px rgba(189, 189, 189, 0.4) solid;
}
.tm-ship {
  margin-top: -5px;
}
.input:focus ~ label,
input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  margin-left: 25px;
  font-size: 13px;
}
.custom-control-label {
  padding-left: 10px;
}
.custom-control-label p {
  font-size: 12px;
  color: gray;
}
.custom-control-label h5 {
  font-size: 14px !important;
}
.row .price {
  padding: 0 0;
  border-top: none;
  border-bottom: none;
  margin: 0 0;
  font-size: 15px;
  padding-right: 10%;
  text-align: right;
  color: rgb(255, 153, 0);
}
@media (max-width: 430px) {
  .card {
    padding-left: -15px;
  }
  input[type="radio"] {
    font-size: 10px;
  }
  .content {
    margin-top: -10px;
  }
  .transporters {
    font-size: 14px !important;
  }
  .custom-control {
    padding-left: 0rem;
  }
  .custom-control-label {
    padding-left: -20px;
  }
  .custom-control-label p {
    font-size: 10px;
    color: gray;
  }
  .custom-control-label h5 {
    font-size: 12px !important;
  }
  .row .price {
    font-size: 12px;
    padding-right: 5%;
  }
  .title-header {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
