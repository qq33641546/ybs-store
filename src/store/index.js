import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import init from './modules/init.js'
import sys from './modules/sys'
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        sys,
        init,
    },
    getters,
})

export default store