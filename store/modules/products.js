// initial state
const state = {
  all: null,
  currentProduct: {},
  currentProductCategory: {},
  categories: [],
  product_categories: [],
  productBestSellers: [],
  productRelated: [],
  searchParam: {
    name: "",
    cat: "",
    order: "desc", // (order by desc or asc)
    sort: "name", //  (sorty by name, model, quantity, rating, sort order, date_added, date_modified, price)
  },
  showProductDetailModal: false,
};

// getters
const getters = {};

// actions
const actions = {
  async getProduct({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/products${_payload["params"]}`)
        .then((resp) => {
          //  console.log("resp:", resp);
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getComment({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product/${_payload.productId}/comments`)
        .then((resp) => {
          // console.log("resp:", resp);
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getHashtagComment({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/hashtagcomment`)
        .then((resp) => {
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  likeComment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`v1/product-comment-like/${payload}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getDetailComment({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product-comment/${_payload}`)
        .then((resp) => {
          // console.log("resp:", resp);
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getRatedGallery({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product-comments${_payload["params"]}`)
        .then((resp) => {
          // console.log("resp:", resp);
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getPromotions({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/promotion-program${_payload["params"]}`)
        .then((resp) => {
          // console.log("resp:", resp);
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getRate({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/get-star-rate/${_payload.id}`)
        .then((resp) => {
          // console.log("resp:", resp);
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSaleOff({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product/sale-off${_payload["params"]}`)
        .then((resp) => {
          resolve({
            data: resp,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getCategory({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("v1/client/categories/hierarchy")
        .then((res) => {
          commit("setCategories", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getProductCategory({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("v1/client/categories")
        .then((res) => {
          commit("setProductCategories", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async getCurrentProductCategory({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/v1/client/categories/${_payload.id}`)
        .then((data) => {
          commit("setCurrentProductCategory", data);
          resolve(data);
        })
        .catch((err) => {
          commit("setCurrentProductCategory", {});
          reject(err);
        });
    });
  },

  async getProductBestSellers({ commit }, _payload) {
    const { data } = await this.$axios.get(`/v0/shop/bestsellers?limit=20`);
    commit("setProductBestSellers", data.data);
  },

  async getProductRelated({ commit }, _payload) {
    const { data } = await this.$axios.get(
      `v1/client/advance-related-product/${_payload.productId}`
    );
    commit("setProductRelated", data.data);
  },

  async getProducTopSale({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/products/top-sale${_payload["params"]}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getProducFlashSale({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product-promotion-flash-sale?limit=100&status=1`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async detail({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product-detail-by-slug/${_payload.slug}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async getProductFilter({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.put("/v1/client/product-filter", payload )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async detailById({ commit }, ProducId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v1/client/product-detail/${ProducId}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateSearchParam({ commit }, payload) {
    commit("updateSearchParam", payload);
  },
  showProductDetailModal({ commit }, payload) {
    console.log("commit:", commit);
    commit("showProductDetailModal", payload);
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
  setAllProducts(state, products) {
    state.all = products_All;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setProductCategories(state, categories) {
    state.product_categories = categories;
  },

  setProductsDetail(state, products) {
    state.currentProduct = products;
  },

  setProductBestSellers(state, products) {
    state.productBestSellers = products;
  },

  setProductRelated(state, products) {
    state.productRelated = products;
  },

  setProductTopSale(state, products) {
    state.setProductTopSale = products;
  },

  setCurrentProductCategory(state, data) {
    state.currentProductCategory = data;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find((product) => product.id === id);
    product.inventory--;
  },

  setSearchProduct(state, data) {
    state.searchParam.name = data.name;
  },

  updateSearchParam(state, data) {
    state.searchParam[data["field"]] = data["value"];
    // console.log("mutations new search param :", state.searchParam);
  },
  showProductDetailModal(state) {
    // console.log("state", state);
    state.showProductDetailModal = true;
  },
  resetSearchParam(state) {
    state.searchParam = {
      name: "",
      cat: "",
      order: "",
      sort: "",
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
