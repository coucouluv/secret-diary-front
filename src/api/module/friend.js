import { instanceWithToken } from '@/api/index';

const BASE_URL = '/api/friend';

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
};

export default friend;
