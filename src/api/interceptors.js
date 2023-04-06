import axios from 'axios';

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
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;
      const request = {
        refreshToken: localStorage.getItem('refreshToken'),
      };
      await axios
        .post(`${process.env.VUE_APP_API_URL}/api/start/reissue`, request)
        .then(res => {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);

          const token = localStorage.getItem('accessToken');
          originalRequest.headers.Authorization = `Bearer ${token}`;
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          return axios(originalRequest);
        })
        .catch(error => {
          localStorage.removeItem('signin');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          alert('유효기간이 만료되었습니다. 다시 로그인 해주세요.');
          return Promise.reject(error);
        });
    },
  );

  return instance;
}
