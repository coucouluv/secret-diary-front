import {instanceWithToken} from '@/api/index';

const BASE_URL = '/api/diary';

const diary = {
    getDiaries(request) {
        return instanceWithToken.get(`${BASE_URL}/info/${request.friendId}?page=${request.page}&size=${request.size}`);
    },
    getDiary(diaryId) {
        return instanceWithToken.get(`${BASE_URL}/${diaryId}`);
    },
    saveDiary(diaryRequest) {
        return instanceWithToken.post(`${BASE_URL}`, diaryRequest);
    },
    deleteDiary(diaryId) {
        return instanceWithToken.delete(`${BASE_URL}/${diaryId}`);
    }
}

export default diary;