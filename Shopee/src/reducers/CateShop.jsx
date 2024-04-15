import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CateShopAPI, { add, upload, remove } from "../API/CateShopAPI";

export const getCateShop = createAsyncThunk(
  "cateshop/getCateShop",
  async () => {
    const { data: cateshop } = await CateShopAPI.getAll();
    return cateshop;
  }
);
export const addCateShop = createAsyncThunk(
  "cateshop/addCateShop",
  async (data) => {
    const { data: cateshop } = await add(data);
    return cateshop;
  }
);
export const uploadCateShop = createAsyncThunk(
  "cateshop/uploadCateShop",
  async (data) => {
    const { data: cateShop } = await upload(data);
    return cateShop;
  }
);
export const removeCateShop = createAsyncThunk(
  "cateshop/removeCateShop",
  async (id) => {
    const { data: cateShop } = await remove(id);
    return cateShop;
  }
);

const cateshopSlice = createSlice({
  name: "cateshop",
  initialState: {
    value: [],
  },
  reducers: {
    // addCateShop(state, action) {
    //   state.value.push(action.payload);
    // },
    // removeCateShop(state, action) {
    //   state.value = action.payload.data.filter(
    //     (item) => item._id !== action.payload.id
    //   );
    // },
    // uploadCateShop(state, action) {
    //   console.log(action.payload);
    //   state.value == action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCateShop.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addCateShop.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadCateShop.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeCateShop.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
// export const { addCateShop, removeCateShop, uploadCateShop } =
// cateshopSlice.actions;
export default cateshopSlice.reducer;
