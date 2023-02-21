import { instance } from '@/api/index';

const BASE_URL = '/api/friend';


const friend = {
    getFriends() {
        const token = localStorage.getItem("accessToken");
        console.log("token: "+ token)
        instance.defaults.headers.Authorization = 'Bearer '+token;
        return instance.get(`${BASE_URL}/info`);
    },
    applyFriend(friendId) {
        return instance.post(`${BASE_URL}/apply/${friendId}`);
    },
}

export default friend;