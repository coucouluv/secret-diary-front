import Diary from '@/api/module/diary.js';

const state = {
    diaries: {
    },
    diary: {

    },
    diaryId: ''
  };
  const getters = {
    GET_DIARIES(state) {
      return state.diaries;
    },
    GET_DIARY(state) {
      return state.diary;
    },
    GET_DIARYID(state) {
      return state.diaryId;
    }
  };
  const mutations = {
    SET_DIARIES(state, diaries) {
      state.diaries = diaries;
    },
    SET_DIARY(state, diary) {
      state.diary = diary;
    },
    SET_DIARYID(state, id) {
      state.diaryId = id;
    }
  };
  const actions = {
    async DIARIES({ commit }, request) {
      console.log(request.page)
      console.log(request.size)
      const res = await Diary.getDiaries(request);
      commit("SET_DIARIES", res.data);
    },
    async DIARY({ commit }, diaryId ) {
      const res = await Diary.getDiary(diaryId);
      commit("SET_DIARY", res.data);
    },
    async SAVE_DIARY({ commit }, diaryRequest ) {
      const res = await Diary.saveDiary(diaryRequest);
      commit("SET_DIARYID", res.data);
    },
    async DELETE_DIARY({ commit }, diaryId) {
      await Diary.deleteDiary(diaryId);
    }
  };
  
  export default {
    state,
    getters,
    mutations,
    actions,
  };