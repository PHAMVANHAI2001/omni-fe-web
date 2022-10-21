const state = {
  user: null,
  address: null,
  register: null,
  newaddress: null,
  registerSocial: null,
  lstAddress: false,
};

const actions = {
  async getAccount({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("v1/users/profile")
        .then((resp) => {
          const user = resp.data;
          commit("user", user);
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          reject(err);
        });
    });
  },
  async verylogin({ commit }, payload) {
    commit("auth_request");
    return new Promise((resolve, reject) => {
      this.$axios
        .post("client/auth/login", payload)
        .then((resp) => {
          if (resp) {
            const user = resp;
            localStorage.setItem("id_token", resp["token"]);
            commit("auth_success", user);
            resolve(resp);
          } else {
            commit("auth_error");
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async socialLogin({ commit }, payload) {
    commit("social_request");
    return new Promise((resolve, reject) => {
      this.$axios
        .post("auth/register-and-login", payload)
        .then((resp) => {
          if (resp) {
            const user = resp;
            // localStorage.setItem("id_token", resp["token"]);
            commit("social_success", user);
            resolve(resp);
          } else {
            commit("social_error");
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async login({ commit }, payload) {
    const axios = this.$axios.create();
    return new Promise((resolve, reject) => {
      let d = new URLSearchParams(payload).toString();
      axios
        .post(`/auth/login-sms?${d}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getAddress({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/account/address")
        .then((resp) => {
          const order = resp.data.data;
          commit("getAddress", order);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getOrderStatus({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/v1/user-order-status-summary")
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getShippingAddress({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/v1/shipping_address")
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async createShippingAddress({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/v1/shipping_address", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async setShippingAddressClient({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/client/set-shipping-address", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async setDefaultShippingAddress({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put("/v1/shipping_address/set_default/" + payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async deleteShippingAddress({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete("/v1/shipping_address/" + payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async fetchData({ commit }, param) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(param)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async register({ commit }, payload) {
    commit("auth_request");
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/auth/register-partner", payload)
        .then((resp) => {
          // tạm thời đóng không tự login khi đăng ký thành công.
          // const user = resp;
          // đăng ký xong thì ra trang login.
          // localStorage.setItem("account_status", resp["account_status"]);
          // localStorage.setItem("id_token", resp["token"]);
          // commit("auth_success", user);
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          reject(err.response);
        });
    });
  },
  async registerUser({ commit }, payload) {
    commit("auth_request");
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/client/auth/register?verify_otp=0", payload)
        .then((resp) => {
          console.log("registerUser:", resp);
          localStorage.setItem("id_token", resp["token"]);
          commit("auth_success", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          reject(err);
        });
    });
  },
  async createPassword({ commit }, payload) {
    commit("auth_request");
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/v1/client/create-password ", payload)
        .then((resp) => {
          const user = resp;
          localStorage.setItem("account_status", resp["account_status"]);
          localStorage.setItem("id_token", resp["token"]);
          commit("auth_success", user);
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          reject(err.response);
        });
    });
  },
  async logout({ commit }) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("id_token");
      localStorage.removeItem("userid");
      localStorage.removeItem("session_id");
      localStorage.removeItem("group_code");
      localStorage.removeItem("phone");
      commit("logout");
      commit("cart/emptyCart", null, { root: true });
      resolve(true);
    });
  },
  async addWishlist({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/v1/product-favorite`, { product_id: id })
        .then((resp) => {
          //console.log(resp);
          resolve(resp);
        })
        .catch((err) => {
          if (err && err.response && err.response.data) {
            reject(err.response.data.error[0]);
          } else {
            reject(err);
          }
        });
    });
  },
  showLoginModal({ commit }, payload) {
    commit("showLoginModal", payload);
  },
  async updateProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/account`, payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err && err.response && err.response.data) {
            reject(err.response.data.error[0]);
          } else {
            reject(err);
          }
        });
    });
  },
  async customerInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/v1/client/customer-info/${payload}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getUserByPhone({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/v1/client/get-user-by-phone/${payload}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async sendSms({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/client/auth/register/send", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async checkOtp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/client/auth/register/check-otp", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async registerSms({ commit }, payload) {
    commit("auth_request");
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/client/auth/register", payload)
        .then((resp) => {
          localStorage.setItem("id_token", resp["token"]);
          commit("auth_success", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          reject(err);
        });
    });
  },
  async updateSocial({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
          .put("/v1/users/social-sync", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
    });
  },
  async getSmsSocial({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
          .put("/v1/users/update-phone-profile", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
    });
  },
  async verifySmsCodeSocial({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
          .put("/v1/users/update-phone-profile-otp", payload)
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
  showRegisterSocialModal( state, data) {
    state.registerSocial = data;
  },
  showAddLocationModal(state, data) {
    state.newaddress = data;
  },

  showLoginModal(state, register) {
    state.register = register;
  },

  registerUserSuccess(state) {
    state.user = data;
  },

  getAddress(state) {
    state.address = data;
  },

  auth_request(state) {
    state.status = "loading";
  },

  auth_success(state, user) {
    //console.log("User Day", user);
    state.status = "success";
    (state.islogged = true), (state.user = user);
  },
  user(state, user) {
    state.status = "success";
    (state.islogged = true), (state.user = user);
  },
  auth_error(state) {
    state.status = "error";
    state.user = null;
  },
  social_request(state) {
    state.status = "loading";
  },

  social_success(state, user) {
    //console.log("User Day", user);
    state.status = "success";
    (state.islogged = true), (state.user = user);
  },
  social_error(state) {
    state.status = "error";
    state.user = null;
  },

  logout(state) {
    state.status = "";
    state.islogged = false;
    state.user = null;
  },
  showLstAddressModal( state, data) {
    state.lstAddress = data;
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
