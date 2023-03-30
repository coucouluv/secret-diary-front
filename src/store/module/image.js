import Image from '@/api/module/image.js';

const state = {
  url: '',
  preSignedUrl: '',
};
const getters = {
  GET_URL(state) {
    return state.url;
  },
  GET_PRESIGNED(state) {
    return state.preSignedUrl;
  },
};
const mutations = {
  SET_UPLOAD(state, data) {
    state.url = data.url;
    state.preSignedUrl = data.preSignedUrl;
  },
  SET_PRESIGNED(state, data) {
    state.preSignedUrl = data.preSignedUrl;
  },
};
const actions = {
  async UPLOAD({ commit }) {
    const res = await Image.upload();
    commit('SET_UPLOAD', res.data);
  },
  async SHARE({ commit }, url) {
    const res = await Image.share(url);
    commit('SET_PRESIGNED', res.data);
  },
  async DELETE({ commit }, url) {
    const res = await Image.delete(url);
    commit('SET_PRESIGNED', res.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
