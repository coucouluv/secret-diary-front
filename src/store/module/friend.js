import Friend from '@/api/module/friend.js';

const state = {
  friends: {},
  waiting: {},
};
const getters = {
  FRIEND_LIST(state) {
    return state.friends;
  },
  WAITING_LIST(state) {
    return state.waiting;
  },
};
const mutations = {
  SET_FRIENDS(state, friends) {
    state.friends = friends;
  },
  SET_WAITING(state, waiting) {
    state.waiting = waiting;
  },
};
const actions = {
  async GET_FRIENDS({ commit }, request) {
    const res = await Friend.getFriends(request);
    const friends = res.data;
    commit('SET_FRIENDS', friends);
  },
  async GET_WAITING({ commit }, request) {
    const res = await Friend.getWaitingFriends(request);
    commit('SET_WAITING', res.data);
  },
  async APPLY_FRIEND(context, friendId) {
    await Friend.applyFriend(friendId);
  },
  async ACCEPT_FRIEND(context, friendId) {
    await Friend.acceptFriend(friendId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
