import Member from '@/api/module/member.js';

const state = {
  member: {},
};
const getters = {
  MEMBER(state) {
    return state.member;
  },
};
const mutations = {
  SET_MEMBER(state, member) {
    state.member = member;
  },
};
const actions = {
  async UPDATE_PWD(context, pwdRequest) {
    await Member.updatePassword(pwdRequest);
  },
  async UPDATE_PROFILE(context, profileRequest) {
    await Member.updateProfile(profileRequest);
  },
  async GET_MEMBER({ commit }) {
    const res = await Member.getMember();
    commit('SET_MEMBER', res.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
