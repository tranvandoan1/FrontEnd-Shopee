import { axiosClient } from "./API";

const CateShopeeAPI = {
  getAll() {
    const url = `/cate-shopee`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/cate-shopee/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/cate-shopee/${id}`;
    return axiosClient.delete(url);
  },
 
};
export default CateShopeeAPI;
export const add = (data) => {
  const url = `/cate-shopee`;
  return axiosClient.post(url, data);
};
export const upload = (id, data) => {
  const url = `/cate-shopee/${id}`;
  return axiosClient.put(url, data);
};
