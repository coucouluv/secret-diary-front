import { instanceWithToken } from '@/api/index';

const BASE_URL = '/api/friends';

const friend = {
  getFriends(request) {
    return instanceWithToken.get(
      `${BASE_URL}?page=${request.page}&size=${request.size}`,
    );
  },
  getWaitingFriends(request) {
    return instanceWithToken.get(
      `${BASE_URL}/waiting?page=${request.page}&size=${request.size}`,
    );
  },
  applyFriend(friendId) {
    return instanceWithToken.post(`${BASE_URL}/apply/${friendId}`);
  },
  acceptFriend(friendId) {
    return instanceWithToken.post(`${BASE_URL}/accept/${friendId}`);
  },
  denyFriend(friendId) {
    return instanceWithToken.post(`${BASE_URL}/deny/${friendId}`);
  },
};

export default friend;
