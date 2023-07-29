import { axiosClient } from "./API";

const SliderAPI = {
  getAll() {
    const url = `/slides`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/slides/${id}`;
    return axiosClient.get(url);
  },

  remove(id) {
    const url = `/slides/${id}`;
    return axiosClient.delete(url);
  },
};
export default SliderAPI;
export const add = (data) => {
  const url = `/slides`;
  return axiosClient.post(url, data);
};

export const upload = (id, data) => {
  const url = `/slides/${id}`;
  return axiosClient.put(url, data);
};
