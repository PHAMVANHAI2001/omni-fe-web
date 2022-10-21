import axios from "~/plugins/axios";

const state = {
  categories: [],
  isCategory: {},
  loginCallback: null
};

const actions = {
  async detailSettingBySlug({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/setting-by-slug/${_payload.slug}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  
  
  async getCategory({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`v1/client/categories?level=1&sort[order]=asc`)
        .then(resp => {
          let items = [];
          (resp.data || []).filter(item => {
            if (item.id == payload) {
              commit("isCategory", item);
              return items.push({
                ...item,
                isActive: true
              })
            } else {
              return items.push({
                ...item,
                isActive: false
              })
            }
          });
          commit("setCategories", items);
          resolve(items);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async getMegaMenu({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`v1/client/site-menus/MEGA-MENU`)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },


  categorySelected({
    commit
  }, payload) {
    let items = [];
    if (payload.data.length > 0) {
      (payload.data || []).filter(item => {
        if (item.id == payload.idCat) {
          commit("isCategory", item);
          return items.push({
            ...item,
            isActive: true
          })
        } else {
          return items.push({
            ...item,
            isActive: false
          })
        }
      });
    }
    commit("setCategories", items);
  },
};



const mutations = {
  setCategories(state, data) {
    state.categories = data;
  },
  setMegaMenu(state, data) {
    state.getMegaMenu = data;
  },
  isCategory(state, data) {
    state.isCategory = data;
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