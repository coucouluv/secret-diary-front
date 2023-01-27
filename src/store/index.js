import Vue from "vue"
import Vuex from "vuex"
import {createVuexPersistedState} from 'vue-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      isSignin: localStorage.getItem('signin') || false
    },
    modules: {

    },
    plugins: [
        createVuexPersistedState()
    ]
  });