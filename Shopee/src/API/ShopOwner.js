import { axiosClient } from "./API";

const ShopOwnerAPI = {
    getAll() {
        const url = `/shopowner`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/shopowner/${id}`;
        return axiosClient.get(url);
    },
    add(shopowner) {
        const url = `/shopowner`;
        return axiosClient.post(url, shopowner);
    },
    remove(id) {
        const url = `/shopowner/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/shopowner/${id}`;
        return axiosClient.put(url, data);
    },

};
export default ShopOwnerAPI;