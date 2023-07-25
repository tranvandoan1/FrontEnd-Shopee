import { axiosClient } from "./API";

const SaveOrderAPI = {
  getAll() {
    const url = `/saveoders`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/saveoders/${id}`;
    return axiosClient.get(url);
  },
};
export default SaveOrderAPI;
export const add = (data) => {
  const url = `/saveoders`;
  return axiosClient.post(url, data);
};

export const remove = (id) => {
  const url = `/saveoders/${id}`;
  return axiosClient.delete(url);
};
export const removes = (data) => {
  const url = `/removes-saveoders`;
  return axiosClient.post(url, data);
};
export const upload = (data) => {
  const url = `/upload-saveoder`;
  return axiosClient.post(url, data);
};

export const uploadSaveOrders = (data) => {
  const url = `/saveoders/check`;
  return axiosClient.patch(url, data);
};
