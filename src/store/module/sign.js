import Sign from '@/api/module/sign.js';
import Index from '@/store/index.js';
import router from '@/router/index.js'

const mutations = {
  SET_SIGN_STATUS(state, data) {
    Index.state.isSignin = data;
    localStorage.setItem('signin',true);
  },
  SIGN_OUT(state) {
    Index.state.isSignin = false;
    console.log(Index.state.isSignin);
    localStorage.setItem('signin',false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push({ name: "start" });
  },
};
const actions = {
  async SIGN_IN({ commit }, signInRequest ) {
    console.log("im here~~");
    const tokenData = await Sign.signIn(signInRequest);
    console.log(tokenData.data);
    localStorage.setItem('accessToken',tokenData.data.data.accessToken);
    localStorage.setItem('refreshToken',tokenData.data.data.refreshToken);
    console.log(localStorage.getItem('accessToken'));
    commit("SET_SIGN_STATUS", true);
  },
  async REGISTER({ commit }, registerRequest ) {
    await Sign.register(registerRequest);
  }
};
  
export default {
  // state,
  // getters,
  mutations,
  actions,

};