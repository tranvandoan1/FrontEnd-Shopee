import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProAPI, { add } from "../API/ProAPI";

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    const { data: products } = await ProAPI.get(id);
    return products;
  }
);
export const getProductAll = createAsyncThunk(
  "products/getProductAll",
  async () => {
    const { data: products } = await ProAPI.getAll();
    console.log(products);
    return products;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    console.log(data,'qưdesc');
    const { data: products } = await add(data);
    console.log(products);
    return products;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
  },
  reducers: {
    addProduct(state, action) {
      // state.value.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      console.log("12");
      state.value = action.payload;
    });
    builder.addCase(getProductAll.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    });
  },
});
export default productSlice.reducer;
