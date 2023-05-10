import { instanceOfImage } from '@/api/index';

const BASE_URL = '/api/images';

const image = {
  upload(formData) {
    return instanceOfImage.post(`${BASE_URL}`, formData);
  },
};

export default image;
