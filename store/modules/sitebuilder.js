import axios from "~/plugins/axios";

const state = {
  blocks: {},
  styleCss: null,
};

const actions = {
  async getSiteStyle({ commit, rootState }, product) {
    return new Promise((resolve, reject) => {
      resolve(state.style);
    });
  },
  async getLocationDistributors({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/get-list-user-hubs${_payload["params"]}`)
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
  saveStyle(state, data) {
    state.styleCss = data;
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
