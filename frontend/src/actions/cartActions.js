import axios from "axios";

export const addToCart = (productId, qty) => async(dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`);
}