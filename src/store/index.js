import Vue from "vue"
import Vuex from "vuex"
import {createVuexPersistedState} from 'vue-persistedstate'
import Sign from '@/store/module/sign.js'
import Friend from '@/store/module/friend.js'
import Diary from '@/store/module/diary.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      isSignin: localStorage.getItem('signin') || false
    },
    modules: {
      Friend,
      Sign,
      Diary
    },
    plugins: [
        createVuexPersistedState()
    ]
  });