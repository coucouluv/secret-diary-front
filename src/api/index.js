import axios from 'axios';

function createInstance() {
	return axios.create({
		baseURL: process.env.VUE_APP_API_URL,
	});
}

function createInstanceWithAuth() {
	const instance = axios.create({
		baseURL: process.env.VUE_APP_API_URL,
	});

}

export const instance = createInstance();
export const instanceWithAuth = createInstanceWithAuth();