import axios from "~/plugins/axios";

const state = {
  orders: null,
};

const actions = {
  async getOrder({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("v1/orders")
        .then((resp) => {
          const order = resp.data.data;
          commit("getOrder", order);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getOrderDetail({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v0/order/${_payload}`)
        .then((resp) => {
          resolve(resp['data']);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getReasonCancel({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/reasoncancel${_payload["params"]}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  indirectPayment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("v1/payments/indirectpayment/transactionProcessor", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  setShippingaddressToOrder({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/set-shipping-address/" + id, "")
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  setPaymentaddress({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/paymentaddress/existing", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async checkOrderInDistributor({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get("/v1/distributor/check_order")
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
  getOrder(state, data) {
    state.orders = data;
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
