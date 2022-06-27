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
export const upload = (id, data) => {
  const url = `/saveoders/${id}`;
  return axiosClient.put(url, data);
};
