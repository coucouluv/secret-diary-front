import Friend from '@/api/module/friend.js';

const state = {
    friends: {
    },
  };
  const getters = {
    FRIEND_LIST(state) {
        return state.friends;
    },
  };
  const mutations = {
    SET_FRIENDS(state, friends) {
        state.friends = friends;
    }
  };
  const actions = {
    async GET_FRIENDS({ commit }) {
      const res = await Friend.getFriends();
      console.log(res.data);
      const friends = res.data;
      commit("SET_FRIENDS", friends);
    },
    async APPLY_FRIEND({ commit }, friendId ) {
      const res = await Friend.applyFriend(friendId);
      console.log(res.data);
    },
  };
  
  export default {
    state,
    getters,
    mutations,
    actions,
  };