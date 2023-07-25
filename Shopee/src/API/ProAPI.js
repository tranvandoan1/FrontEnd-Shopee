import { axiosClient } from "./API";

const ProAPI = {
  getAll() {
    const url = `/products`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(pro) {
    const url = `/products`;
    return axiosClient.post(url, pro);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  upload(id, data) {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },
};
export default ProAPI;
export const add = (data) => {
  console.log(data,'e3wds13223')
  const url = `/products`;
  return axiosClient.post(url, data);
};

export const remove = (id) => {
  const url = `/product/${id}`;
    return axiosClient.delete(url);
};


export const removes = (dataId) => {
  const url = `/remove-products`;
  return axiosClient.post(url, dataId);
};