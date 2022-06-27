import { axiosClient } from "./API";

const CommodityValueAPI = {
    getAll() {
        const url = `/commodityalue`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/commodityalue/${id}`;
        return axiosClient.get(url);
    },
    add(cate) {
        const url = `/commodityalue`;
        return axiosClient.post(url, cate);
    },
    remove(id) {
        const url = `/commodityalue/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/commodityalue/${id}`;
        return axiosClient.put(url, data);
    },

};
export default CommodityValueAPI;