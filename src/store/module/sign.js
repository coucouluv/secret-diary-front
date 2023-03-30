import Sign from '@/api/module/sign.js';
import Index from '@/store/index.js';
import router from '@/router/index.js';

const state = {
	userId: '',
};
const getters = {
	GET_USERID(state) {
		return state.userId;
	},
};
const mutations = {
	SET_USERID(state, data) {
		state.userId = data;
	},
	SET_SIGN_STATUS(data) {
		Index.state.isSignin = data;
		localStorage.setItem('signin', true);
	},
	SIGN_OUT() {
		Index.state.isSignin = false;
		console.log(Index.state.isSignin);
		localStorage.setItem('signin', false);
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		router.push({ name: 'start' });
	},
};
const actions = {
	async SIGN_IN({ commit }, signInRequest) {
		const tokenData = await Sign.signIn(signInRequest);
		localStorage.setItem('accessToken', tokenData.data.accessToken);
		localStorage.setItem('refreshToken', tokenData.data.refreshToken);
		console.log(localStorage.getItem('accessToken'));
		commit('SET_SIGN_STATUS', true);
	},
	async REGISTER(registerRequest) {
		await Sign.register(registerRequest);
	},
	async PASSWORD(passwordRequset) {
		await Sign.findPassword(passwordRequset);
	},
	async USERID({ commit }, email) {
		const res = await Sign.findUserId(email);
		commit('SET_USERID', res.data);
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
