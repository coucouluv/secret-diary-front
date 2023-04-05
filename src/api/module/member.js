import { instanceWithToken } from '@/api/index';

const BASE_URL = '/api/info';

const Member = {
  getMember() {
    return instanceWithToken.get(`${BASE_URL}`);
  },
  updatePassword(pwdRequest) {
    return instanceWithToken.post(`${BASE_URL}/password`, pwdRequest);
  },
  updateProfile(profileRequest) {
    return instanceWithToken.post(`${BASE_URL}/profile`, profileRequest);
  },
};

export default Member;
