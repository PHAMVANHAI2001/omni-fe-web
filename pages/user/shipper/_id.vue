<template>
  <main role="main">
    <h2 class="cp-page-title clearfix">
      Chi tiết đơn hàng {{ order ? order.code : '' }}
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
        <li class="pr2" v-bind:class="{ active: order.approver}">
          <a>Đã xác nhận</a>
        </li>
        <li class="pr3" v-bind:class="{ active: order.status == 'SHIPPING' || order.status == 'COMPLETED' || order.status == 'SHIPPED' }">
          <a>Đang Giao hàng</a>
        </li>
        <li class="pr4" v-bind:class="{ active: order.status == 'COMPLETED' || order.status == 'SHIPPED' }">
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

      <div class="panel-group" id="accordion">

        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
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
                  <strong>Hình thức giao hàng:</strong>
                  {{ order.shipping_method_name }}
                </p>
                <p>
                  <strong>Tỉnh/Thành phố:</strong>
                  {{ order.shipping_address_city }}
                </p>
                <p>
                  <strong>Quận/Huyện:</strong>
                  {{ order.shipping_address_district }}
                </p>
                <p>
                  <strong>Phường/Xã:</strong>
                  {{ order.shipping_address_ward }}
                </p>
                <p>
                  <strong>Đường:</strong>
                  {{ order.street_address }}
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
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
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

      <div v-if="order">
        <div class="row">
          <div class="col-md-12">
            <div class="panel mt-15 panel-default">
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-condensed">
                    <thead>
                      <tr>
                        <td></td>
                        <td>
                          <strong>Sản phẩm</strong>
                        </td>
                        <!-- <td class="text-center">
                                <strong>Giảm giá</strong>
                        </td>-->
                        <td class="text-right">
                          <strong>Tạm tính</strong>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- foreach ($order->lineItems as $line) or some such thing here -->
                      <tr v-for="(item, i) in order.details" :key="i">
                        <td>
                          <img width="100px" :src="item.thumbnail" alt />
                        </td>
                        <td>
                          {{ item.product_name }} x ({{ item.qty }})
                          <br />
                          <strong>Đơn giá:</strong>
                          {{ item.price_formatted }}
                        </td>
                        <!-- <td></td> -->
                        <td class="text-right text-danger">{{ item.total_formatted }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr v-for="(item, i) in order.totals" :key="i" :class="item.code">
                        <td colspan="2" class="text-right">
                          <span>{{ item.title }}:</span>
                        </td>
                        <td class="text-right text-danger">{{ item.text }}</td>
                      </tr>
                      <tr v-if="order.status !== 'COMPLETED'">
                        <td colspan="1" class="text-left" v-if="user && user.group_code !== 'HUB'"></td>
                        <td class="text-left" colspan="2" v-if="user && user.group_code == 'HUB'">
                          <button
                            v-if="order.status == 'NEW'"
                            @click="updateOrder('CANCELED')"
                            class="btn btn-info"
                          >Từ chối</button>
                          <button
                            v-if="order.status == 'NEW'"
                            @click="updateOrder('APPROVED')"
                            class="btn btn-info text-white"
                          >Nhận đơn</button>
                          <button
                            v-if="
                                    order.status !== 'NEW' &&
                                      order.status !== 'COMPLETED' &&
                                      order.status !== 'CANCELED'
                                  "
                            @click="updateOrder('COMPLETED')"
                            class="btn btn-success"
                          >Đã giao</button>
                        </td>
                        <td colspan="2" class="text-right">
                          <button
                            v-if=" order.status == 'NEW' && user && (user.group_code == 'AGENT' || user.group_code == 'GUEST' || user.group_code == 'OUTLET') "
                            @click="cancelOrder"
                            class="btn btn-danger"
                          >Huỷ đơn hàng</button>
                          <button
                            v-if="user && user.role_code == 'SHIPPER' && order.status == 'SHIPPING'"
                            @click="updateOrder('SHIPPED')"
                            class="btn btn-warning text-white"
                          >Giao hàng thành công</button>
                          <!-- <button v-if="order.order_status_id == '5' || order.order_status_id == '7'" @click="reOrder" class="btn btn-info">Mua lại</button> -->
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                 
                  
                  <h4 class="mt-15" v-if="order && order.status_histories && order.status_histories.length">Lịch sử trạng thái đơn hàng</h4>

                  <table>
                    <tr></tr>
                  </table>

                  <div
                    v-if="order && order.status_histories && order.status_histories.length"
                    class="col-md-12"
                  >
                    <ul class>
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
                   <div class="col-md-12 mt-1" v-if=" order.status == 'CANCELED' ">
                    <h4>Lý do huỷ</h4>
                    <p>{{order.canceled_reason}}</p>
                  </div>
                </div>
              </div>
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
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "Chi tiết đơn hàng"
  },
  components: {
    UserMenuPanel
  },
  data() {
    return {
      order: null,
      order_statuses: [],
      order_status_name: null
    };
  },
  computed: mapState({
    user: state => state.user.user
  }),
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      const id = this.$route.params["id"];
      this.$store.dispatch("app/fetchData", "/v1/orders/" + id).then(data => {
        this.order = data.data;
        console.log('order', this.order)
        //this.getOrderStatus();
      });
    },
    getOrderStatus() {
      this.$store.dispatch("user/fetchData", "/order_statuses").then(data => {
        this.order_statuses = data;
        const status = this.order_statuses.find(item => {
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
          data: { status: status }
        })
        .then(data => {
          console.log("data order", data);
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$swal({
            title: "Cập nhập đơn hàng thành công",
            icon: "success",
            confirmButtonText: "Xác nhận"
          }).then(result => {
            if (status == "CANCELED") {
              this.$router.push("/user/shipper");
            } else {
              this.getOrder();
            }
          });
        })
        .catch(err => {
          console.log("error update status order:", err);
        });
    },
    async cancelOrder() {
      // orderhistory/{order_id}

      const { value: reason } = await this.$swal({
        title: "HUỶ ĐƠN HÀNG",
        text: "Vui lòng cho chúng tôi biết lý do bạn muốn huỷ đơn",
        input: "text",
        showCancelButton: true,
        cancelButtonText: "Đóng",
        confirmButtonText: "Huỷ đơn",
        inputValidator: value => {
          if (!value) {
            return "Vui lòng nhập lý do!";
          }
        }
      });

      if (reason) {
        const id = this.$route.params["id"];
        this.$store.dispatch("app/showLoadingOverlay", true);
        this.$store
          .dispatch("app/postData", {
            param: `v1/orders/${id}/request-cancel`,
            data: {
              canceled_reason: reason
            }
          })
          .then(data => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            this.getOrder();
            this.$swal({
              title: "YÊU CẦU ĐÃ ĐƯỢC GỬI ĐI",
              text: "Yêu cầu huỷ đơn của bạn đã được gửi đi thành công",
              showCancelButton: true,
              icon: "success",
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Đóng"
            });
          })
          .catch(err => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      }
    }
  }
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
</style>