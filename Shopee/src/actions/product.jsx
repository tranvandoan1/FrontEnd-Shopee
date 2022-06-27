import ProAPI from "../API/ProAPI"

export const getProducts = () => async (dispatch) => {
    const { data:products } = await ProAPI.getAll();
    dispatch({type: "GET_PRODUCTS", payload: products}) 
} 