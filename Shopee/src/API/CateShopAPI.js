import { axiosClient } from "./API";

const CateShopAPI = {
  getAll() {
    const url = `/cate-shop`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/cate-shop/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/cate-shop/${id}`;
    return axiosClient.delete(url);
  },

};
export default CateShopAPI;
export const add = (data) => {
  const url = `/cate-shop`;
  return axiosClient.post(url, data);
};
export const upload = (data) => {
  const url = `/cate-shop-upload`;
  return axiosClient.post(url, data);
};

export const remove = (id) => {
  const url = `/cate-shop/${id}`;
  return axiosClient.delete(url);
};
