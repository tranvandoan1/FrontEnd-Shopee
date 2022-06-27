import { axiosClient } from "./API";

const ClassifyAPI = {
    getAll() {
        const url = `/classifies`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/classifies/${id}`;
        return axiosClient.get(url);
    },
    add(cate) {
        const url = `/classifies`;
        return axiosClient.post(url, cate);
    },
    remove(id) {
        const url = `/classifies/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/classifies/${id}`;
        return axiosClient.put(url, data);
    },

};
export default ClassifyAPI;