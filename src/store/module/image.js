import Image from '@/api/module/image.js';

const state = {
  url: '',
};
const getters = {
  GET_URL(state) {
    return state.url;
  },
};
const mutations = {
  SET_UPLOAD(state, data) {
    state.url = data;
  },
};
const actions = {
  async UPLOAD({ commit }, formData) {
    const res = await Image.upload(formData);
    commit('SET_UPLOAD', res.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
