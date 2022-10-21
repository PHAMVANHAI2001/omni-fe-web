import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import user from './modules/user'
import order from './modules/order'
import app from './app'
import sitebuilder from './modules/sitebuilder'
import category from './modules/category'

const createStore = () => {
    return new Vuex.Store({
        modules: {
            app,
            cart,
            products,
            user,
            order,
            sitebuilder,
            category,
         
        }
    })
}

export default createStore;