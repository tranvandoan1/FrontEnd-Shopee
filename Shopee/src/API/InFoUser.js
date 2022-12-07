import { axiosClient } from "./API";

const InfoUserAPI = {
  getAll() {
    const url = `/info-user`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/info-user/${id}`;
    return axiosClient.get(url);
  },

  upload(id, data) {
    const url = `/info-user/${id}`;
    return axiosClient.put(url, data);
  },
};
export default InfoUserAPI;
export const add = (data) => {
  const url = `/info-user`;
  return axiosClient.post(url, data);
};
export const remove = (id) => {
  const url = `/info-user/${id}`;
  return axiosClient.delete(url);
};

export const upload = (id, data) => {
  const url = `/info-user/${id}`;
  return axiosClient.put(url, data);
};
