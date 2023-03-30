import { instance } from '@/api/index';

const BASE_URL = 'api/start';

const Sign = {
	signIn(signInrequest) {
		return instance.post(`${BASE_URL}/signin`, signInrequest);
	},
	register(registerRequest) {
		return instance.post(`${BASE_URL}/register`, registerRequest);
	},
	findUserId(email) {
		return instance.get(`${BASE_URL}/signin/userid`, { params: email });
	},
	findPassword(passwordRequset) {
		return instance.post(`${BASE_URL}/signin/password`, passwordRequset);
	},
};

export default Sign;
