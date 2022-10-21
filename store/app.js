import axios from "~/plugins/axios";

const state = {
  appState: {
    session: null
  },
  showSidebar: null,
  search: {
    product_name: null
  },
  showRegisterModal: false,
  showResetPasswordModel: false,
  showLoadingOverlay: false,
  showVerifySmsCode: false,
  notifyLoginForm: false,
  showUpdatePasswordModel: false,
  loginModalForm: false,
  currentPost: {},
  lang_id: null,
  session_id: null,
  phone_sms_code: null,
  InstallAppModal: true,
  showNotifySection: false
};

const actions = {
  async getSession({ commit }) {
    return new Promise((resolve, reject) => {
      axios.feedAxios.get("/session").then(res => {
        resolve(res.data.data.session);
      });
    }).catch(err => {
      //console.log("err get session:", err);
      reject(err);
    });
  },
  showSidebar({ commit }, show) {
    commit("setShowSidebar", show);
  },
  showLoadingOverlay({ commit }, show) {
    commit("showLoadingOverlay", show);
  },
  showBuildingModal({ commit }, payload) {
    commit("showBuildingModal", payload);
  },
  showNotifySection({ commit }, payload) {
    commit("showNotifySection", payload);
  },
  /* like GET */
  async fetchData({ commit }, param) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(param)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async uploadFile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios({
        url: payload.param,
        method: 'POST',
        data: payload.data,
        config,
      }).then( res => {
        resolve(res);
      }).catch( err => {
        reject(err);
      })
    })
  },
  async downloadFile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: payload.param,
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', payload.filename + '.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
        console.log("download....");
        resolve();

      })
        .catch(err => {
          reject(err);
        });
    });
  },
  async postData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(payload.param, payload.data)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          if (err && err.response && err.response.data) {
            reject(err.response.data.error[0]);
          } else {
            reject(err);
          }
        });
    });
  },
  async postData_2({ }, formdata) {
    //console.log(formdata);
    return new Promise((resolve, reject) => {
      this.$axios.post(formdata.url, formdata.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async postData_3({ commit }, formdata) {
    //console.log(formdata);
    return new Promise((resolve, reject) => {
      this.$axios.post(formdata.url, formdata.data)
        .then(resp => {
          commit("phoneSmsCode", formdata.data.phone)
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async postData_4({ commit }, formdata) {
    //console.log(formdata);
    return new Promise((resolve, reject) => {
      this.$axios.post(formdata.url, formdata.data)
        .then(resp => {
          commit("verfifySmSCode", formdata.data.sms_code)
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async postData_5({ commit }, formdata) {
    //console.log(formdata);
    return new Promise((resolve, reject) => {
      this.$axios.post(formdata.url, formdata.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async delete({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(payload.param, payload.data)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async updateData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.put(payload.param, payload.data)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          if (err && err.response && err.response.data) {
            reject(err.response.data);
          } else {
            reject(err);
          }
        });
    });
  },
};

const mutations = {
  showBuildingModal(state, InstallAppModal) {
    state.InstallAppModal = InstallAppModal;
  },
  verfifySmSCode(state, smsCode) {
    state.smsCodeVerify = smsCode;
  },
  phoneSmsCode(state, phone) {
    state.phoneSmsCode = phone
  },
  showNotifyLoginForm(state, phone) {
    state.notifyLoginForm = true
  },
  showRegisterModal(state) {
    state.showRegisterModal = true;
  },
  showResetPasswordModal(state) {
    state.showResetPasswordModel = true;
  },
  showUpdatePasswordModal(state) {
    state.showUpdatePasswordModel = true
  },
  showVerifySmsCodeModal(state) {
    state.showVerifySmsCode = true;
  },
  showLoadingOverlay(state, show) {
    state.showLoadingOverlay = show;
  },
  showSelectLoginModal(state) {
    state.loginModalForm = true;
  },
  setCurrentPost(state, post) {
    state.currentPost = post;
  },
  setLangId(state, lang_id) {
    //console.log("commit lang:", lang_id);
    state.lang_id = lang_id;
  },
  setShowSidebar(state, show) {
    state.showSidebar = show;
  },
  setSession(state, session_id) {
    state.session_id = session_id;
  },
  showNotifySection(state, show) {
    state.showNotifySection = show;
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
