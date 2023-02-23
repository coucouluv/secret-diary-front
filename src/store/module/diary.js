import Diary from '@/api/module/diary.js';

const state = {
    diaries: {
    },
    diary: {

    }
  };
  const getters = {
    GET_DIARIES(state) {
        return state.diaries;
    },
    GET_DIARY(state) {
        return state.diary;
    }
  };
  const mutations = {
    SET_DIARIES(state, diaries) {
        state.diaries = diaries;
    },
    SET_DIARY(state, diary) {
        state.diary = diary;
    }
  };
  const actions = {
    async DIARIES({ commit }, request) {
      console.log(request.page)
      console.log(request.size)
      const res = await Diary.getDiaries(request);
      console.log(res.data);
      commit("SET_DIARIES", res.data);
    },
    async DIARY({ commit }, diaryId ) {
      const res = await Diary.getDiary(diaryId);
      console.log(res.data);
      commit("SET_DIARY", res.data);
    },
  };
  
  export default {
    state,
    getters,
    mutations,
    actions,
  };