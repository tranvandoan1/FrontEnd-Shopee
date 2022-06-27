import { axiosClient } from "./API";

const CateAPI = {
  getAll() {
    const url = `/categoris`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/categoris/${id}`;
    return axiosClient.get(url);
  },
};
export default CateAPI;
export const add = (cate) => {
  const url = `/categoris`;
  return axiosClient.post(url, cate);
};

export const remove = (id) => {
  const url = `/categoris/${id}`;
  return axiosClient.delete(url);
};

export const upload = (id, data) => {
  const url = `/categoris/${id}`;
  return axiosClient.put(url, data);
};
