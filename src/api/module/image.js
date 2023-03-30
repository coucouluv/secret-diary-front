import { instance } from '@/api/index';

const BASE_URL = '/api/image';

const image = {
  upload() {
    const token = localStorage.getItem('accessToken');
    instance.defaults.headers.Authorization = 'Bearer ' + token;
    return instance.get(`${BASE_URL}/upload`);
  },
  share(url) {
    const token = localStorage.getItem('accessToken');
    instance.defaults.headers.Authorization = 'Bearer ' + token;
    return instance.get(`${BASE_URL}/share/${url}`);
  },
  delete(url) {
    const token = localStorage.getItem('accessToken');
    instance.defaults.headers.Authorization = 'Bearer ' + token;
    return instance.get(`${BASE_URL}/delete/${url}`);
  },
};

export default image;
