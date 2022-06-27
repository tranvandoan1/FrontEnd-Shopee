import { axiosClient } from "./API";

const ImageProAPI = {
  getAll() {
    const url = `/image-pro`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/image-pro/${id}`;
    return axiosClient.get(url);
  },
  add(pro) {
    const url = `/image-pro`;
    return axiosClient.post(url, pro);
  },
  remove(id) {
    const url = `/image-pro/${id}`;
    return axiosClient.delete(url);
  },
  upload(id, data) {
    const url = `/image-pro/${id}`;
    return axiosClient.put(url, data);
  },
};
export default ImageProAPI;
