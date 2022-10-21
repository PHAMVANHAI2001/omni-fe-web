/**
 * Mocking client-server processing
 */
  
  export default {

    async getProducts (cb) {
       const { data } = await axios.get(`https://my-api/posts/${params.id}`)
       return data;
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.webdriver)
          ? cb()
          : errorCb()
      }, 100)
    }
  }