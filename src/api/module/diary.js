import { instance } from '@/api/index';

const BASE_URL = '/api/diary';

const diary = {
    getDiaries(request) {
        const token = localStorage.getItem("accessToken");
        console.log("token: "+ token)
        instance.defaults.headers.Authorization = 'Bearer '+token;
        return instance.get(`${BASE_URL}/info/${request.friendId}?page=${request.page}&size=${request.size}`);
    },
    getDiary(diaryId) {
        const token = localStorage.getItem("accessToken");
        console.log("token: "+ token)
        instance.defaults.headers.Authorization = 'Bearer '+token;
        return instance.get(`${BASE_URL}/${diaryId}`);
    },
}

export default diary;