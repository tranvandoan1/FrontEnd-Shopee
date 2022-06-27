import { axiosClient } from "./API";

const TypeNameAPI = {
    getAll() {
        const url = `/type-group-name`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/type-group-name/${id}`;
        return axiosClient.get(url);
    },
    add(type) {
        const url = `/type-group-name`;
        return axiosClient.post(url, type);
    },
    remove(id) {
        const url = `/type-group-name/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/type-group-name/${id}`;
        return axiosClient.put(url, data);
    },

};
export default TypeNameAPI;