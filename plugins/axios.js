import Vue from 'vue';
import Cookie from 'cookie-universal';
export default function ({ store, route, redirect, req, res, isClient, isServer, app: { $axios } }) {
  $axios.onRequest(config => {
    // lúc chưa login thì sài store token,
    // lúc đã login sài token id
    if (getTokenId()) {
      config.headers.Authorization = `Bearer ${getTokenId()}`;
    } else {
      config.headers.Authorization = `Bearer ${process.env.store_token}`;
    }
  })
  $axios.interceptors.response.use(res => res.data, function (error) {
    if (error) {
      if (error && error.response && error.response['status'] && error.response['status'] == 401) {
        redirect('/deny')
        const CancelToken = $axios.CancelToken;
        const source = CancelToken.source();
        // cancel the request (the message parameter is optional)
        source.cancel('Operation canceled by 401.');
        return false;
      };
      let msg = '';
      store.dispatch("app/showLoadingOverlay", false);
      if (error && error.response && error.response.data) {
        let err = error.response.data;
        if (!err.message) {
          msg = err.error.errors.msg;
        } else if (err.message && err.errors) {
          Object.keys(err.errors).map((key) => {
            msg = err.errors[key][0];
          });
        } else {
          msg = err.message;
        }
      }
      Vue.toasted.error(msg).goAway(2500);
      return Promise.reject(error);
    }
  });
}

function getTokenId() {
  // const cookies = Cookie()
  // const id_token = cookies.get("id_token");
  if(!process.server){
    return localStorage.getItem("id_token");
  }
  return null;
}