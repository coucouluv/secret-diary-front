import { instanceWithToken } from '@/api/index';

const BASE_URL = '/api/diaries';

const diary = {
  getDiaries(request) {
    return instanceWithToken.get(
      `${BASE_URL}/${request.friendId}/friends?id=${request.id}&size=${request.size}`,
    );
  },
  getDiary(diaryId) {
    return instanceWithToken.get(`${BASE_URL}/${diaryId}`);
  },
  saveDiary(diaryRequest) {
    return instanceWithToken.post(`${BASE_URL}`, diaryRequest);
  },
  deleteDiary(diaryId) {
    return instanceWithToken.delete(`${BASE_URL}/${diaryId}`);
  },
  updateDiary(diaryId, diaryRequest) {
    return instanceWithToken.patch(`${BASE_URL}/${diaryId}`, diaryRequest);
  },
};

export default diary;
