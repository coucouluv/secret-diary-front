import axios from 'axios';
import { setInterceptors } from '@/api/interceptors';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

function createImageInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_IMAGE_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function createInstanceWithToken() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

export const instanceOfImage = createImageInstance();
export const instance = createInstance();
export const instanceWithToken = createInstanceWithToken();
