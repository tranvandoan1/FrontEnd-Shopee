import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProAPI, { add, remove, removes } from "../API/ProAPI";
async function getAll() {
  const { data: products } = await ProAPI.getAll();
  const user = JSON.parse(localStorage.getItem("user"));
  const dataProducts = products?.filter((item) =>item.user_id == user._id)
  return dataProducts;
}
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
    return getAll();
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    await add(data);
    return getAll();
  }
);
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    await remove(id);
    return getAll();
  }
);
export const removeProducts = createAsyncThunk(
  "products/removeProducts",
  async (dataId) => {
    await removes(dataId);
    return getAll();
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: true
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {

      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getProductAll.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      console.log('2e312')
    });
    builder.addCase(removeProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      console.log('2e312')
    });
  },
});
export default productSlice.reducer;
