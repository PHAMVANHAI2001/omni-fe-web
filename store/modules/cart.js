const state = {
  cart: [],
  loginCallback: null,
  coupons: null,
  shippingUnit: false,
  shippingPayment: false,
  shippingAddress: null,
  vpBank: false,
  transaction: false,
  notifyProductInCart: false,
};

const actions = {
  async add({ commit }, product) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/v1/client/add-to-cart", product)
        .then((resp) => {
          // this.$toast.success("Sản phẩm đã được thêm vào giỏ hàng thành công").goAway(2000);
          commit("addCartSuccess", resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          // console.log("lỗi add to cart:", err);
          // this.$toast
          // .error("Lỗi thêm vào giỏ hàng", {
          //   position: "top-right"
          // })
          // .goAway(350000);
          reject(err);
        });
    });
  },
  async quickOrder({ commit }, playload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/v1/shop/order", playload)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getCart({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      const session_id = rootState.app.session_id;
      // console.log("___get cart", session_id);
      this.$axios
        .get(`/v1/client/cart?session_id=${session_id}`)
        .then((resp) => {
          commit("setCart", resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async updateCartItemQty({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/client/update-product-in-cart/" + payload.product_id, payload)
        .then((resp) => {
          commit("updateCartItemQtySuccess");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  
  async updateCartInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.put("/v1/client/update-cart-info/" + payload.cart_id, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async deleteCartItem({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete("/v1/client/remove-product-in-cart/" + payload.key, "")
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async removeProductInCart({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/client/remove-product-in-cart", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //clear cart

  async clearCart({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete("v1/client/remove-cart-detail/" + payload)
        .then((resp) => {
          commit("cart/emptyCart", null, { root: true });
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async getShipFee({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/client/shipping-orders/all-ship-fee?cart_id=${payload.id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  
  async removeCoupon({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/cart/remove-coupon", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async removeDelivery({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/client/cart/remove-coupon-delivery", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async removeVoucher({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/client/cart/remove-voucher", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async addCoupon({ commit }, payload) {
    try {
      return new Promise((resolve, reject) => {
        this.$axios
          .put("/v1/cart/add-coupon", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            // console.log("add coupon err.response:", err.response);
            if (err.response && err.response.data) {
              reject(err.response.data.error[0]);
            }
          });
      });
    } catch (error) {
      reject(error);
    }
  },
  async getCoupons({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/client/coupons?cart_id=${payload}`)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async addCouponCode({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/client/cart/add-promocode", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async setShippingMethod({ commit }, payload) {
    try {
      return new Promise((resolve, reject) => {
        this.$axios
          .put("/v1/client/set-shipping-method", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            // console.log("add coupon err.response:", err.response);
            if (err.response && err.response.data) {
              reject(err.response.data.error[0]);
            }
          });
      });
    } catch (error) {
      reject(error);
    }
  },
  async addPaymentMethod({ commit }, payload) {
    try {
      return new Promise((resolve, reject) => {
        this.$axios
          .put("/v1/set-payment-method", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            // console.log("add coupon err.response:", err.response);
            if (err.response && err.response.data) {
              reject(err.response.data.error[0]);
            }
          });
      });
    } catch (error) {
      reject(error);
    }
  },
  async getPaymentMethod({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/client/payment-methods`)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSellerByLocation({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/client/get-seller-by-location/${payload.city_code}/${payload.district_code}/${payload.ward_code}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getDistributorByLocation({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/client/get-distributor-by-location/${payload.city_code}/${payload.district_code}/${payload.ward_code}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSettingSystem({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/client/settings/${payload}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSessionPayment({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v1/payments/vpbank/transactionProcessor`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async updateCheckSessionVpBank({ commit }, playload) {
    return new Promise((resolve, reject) => {
      this.$axios.post("/v1/payments/updatechecksession/vpbank/transactionProcessor", playload)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async checkoutPayments({ commit }, payload) {
    let keyPayment =
      payload && payload["payment_method"] == "MOMO"
        ? "momo"
        : payload && payload["payment_method"] == "ZALO"
        ? "zalopay"
        : payload && payload["payment_method"] == "VNPAY"
        ? "vnpay"
        : payload && payload["payment_method"] == "SPP"
        ? "shoppeepay"
        : payload && payload["payment_method"] == "bank_transfer" 
        ? "virtualpayment" 
        : "vpbank";
    return new Promise((resolve, reject) => {
      this.$axios.post(`/v1/payments/${keyPayment}/transactionProcessor`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async queryStatusPayment({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/v0/payment/queryStatus/${payload['order_code']}`, { params: { uid_payment: payload['uid_payment'], type: payload['type'], url: payload['url']} })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {
  addCartSuccess(state, cartData) {
    // console.log("addCartSuccess:", state.cart);
    state.cart = cartData;
  },
  setCart(state, cartData) {
    state.cart = cartData;
  },
  loginCallback(state, callbackdata) {
    state.loginCallback = callbackdata;
  },
  emptyCart(state) {
    state.cart = null;
  },
  showCoupons(state, coupons) {
    state.coupons = coupons;
  },
  showShippingUnit(state, shippingUnit) {
    state.shippingUnit = shippingUnit;
  },
  showPaymentModal(state, shippingPayment) {
    state.shippingPayment = shippingPayment;
  },
  showShippingAddress(state, shippingAddress) {
    state.shippingAddress = shippingAddress;
  },
  showVpBankModal(state, vpBank) {
    state.vpBank = vpBank;
  },
  showTransactionProcessor(state, transaction) {
    state.transaction = transaction;
  },
  showNotifyProductInCart(state, data) {
    state.notifyProductInCart = data;
  },
  updateCartItemQtySuccess(state) {},
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
