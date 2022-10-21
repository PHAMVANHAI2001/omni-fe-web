<template>
    <main>
        <b-modal
        v-model="modalShow"
        id="add-location-modal"
        ref="add-location-modal"
        hide-footer
        hide-header
        title="Địa chỉ giao hàng"
        >
        <button
        type="button"
        class="btn btn-close"
        data-dismiss="modal"
        @click="closemodal"
        > <i class="fa fa-close"></i>
        </button>
            <div class="block">Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính xác nhất.</div>
            <div v-if="lstAddress">
                <div class="form-group mb-0 mt-2" v-for="(item, i) in lstAddress" :key="i">
                    <label class="custom-control custom-checkbox custom-cycle custom-border-block">
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
                 <div class="d-block text-center ">
                      <a
                        class="text-primary mt-2 mb-2  btn border btn-rounded font-14 text-blue border-blue"
                        @click="showAddLocationModal()"
                      >
                        Thêm địa chỉ mới
                      </a>
                    </div>
            </div>
        </b-modal>
        <AddLocationModal></AddLocationModal>
    </main>
</template>
<script>
import AddLocationModal from "~/components/AddLocationModal";
export default {
    props: {
        lstAddress: Array,
    },
    data() {
        return {
            modalShow: false,
            shippingAddressActiveChange: null,
        }
    },
    components: { 
        AddLocationModal
    },
    created() {
        this.$store.subscribe((mutation, state) => { 
            if (mutation.type == "user/showLstAddressModal") {
                this.modalShow = true;
                this.shippingAddressActiveChange = mutation.payload['id'];
            }
        })
    },
    methods: {
        closemodal() {
            this.modalShow = false;
        },
        onChecked(data) {
            this.setDefaultShippingAddress(data);
        },
        showAddLocationModal(data) {
            this.$store.commit("user/showAddLocationModal", data);
        },
        setDefaultShippingAddress(item) {
            this.$store.dispatch("user/setDefaultShippingAddress", item.id)
            .then((res) => {
                this.$emit("setDefaultAddress");
                this.modalShow = false;
        })
        .catch((err) => {
          this.$toast.error("Lỗi khi chọn địa chỉ mặc định").goAway(1500);
        });
    },
    }
}
</script>