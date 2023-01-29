import Vue from "vue"
import Vuex from "vuex"
import {createVuexPersistedState} from 'vue-persistedstate';
import Sign from '@/store/module/sign.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      isSignin: localStorage.getItem('signin') || false
    },
    modules: {
      Sign,
    },
    plugins: [
        createVuexPersistedState()
    ]
  });