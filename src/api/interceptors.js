import axios from 'axios';
// import { instanceWithToken } from '@/api/index';

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('accessToken');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      const originalRequest = error.config;
      console.log('나 여기 옴');
      if (status === 401) {
        const request = {
          refreshToken: localStorage.getItem('refreshToken'),
        };
        await axios
          .post(`${process.env.VUE_APP_API_URL}/api/start/reissue`, request)
          .then(res => {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            originalRequest.headers = {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            };
            console.log(originalRequest);
            return instance.request(originalRequest);
          })
          .catch(error => {
            localStorage.removeItem('signin');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            alert('유효기간이 만료되었습니다. 다시 로그인 해주세요.');
            return Promise.reject(error);
          });
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
