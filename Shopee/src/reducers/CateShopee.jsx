import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CateShopeeAPI, { add, upload } from "./../API/CateShopeeAPI";

export const getCateShopee = createAsyncThunk(
  "cateshopee/getCateShopee",
  async () => {
    const { data: cateshopee } = await CateShopeeAPI.getAll();
    return cateshopee;
  }
);
export const addCateShopee = createAsyncThunk(
  "cateshopee/addCateShopee",
  async (data) => {
    await add(data);
    const { data: cateshopee } = await CateShopeeAPI.getAll();

    return cateshopee;
  }
);
export const uploadCateShopee = createAsyncThunk(
  "cateshopee/uploadCateShopee",
  async (data) => {
    await upload(data.dataUpload._id, data.dataUpload);
    return data.data;
  }
);

const cateshopeeSlice = createSlice({
  name: "cateshopee",
  initialState: {
    value: [],
  },
  reducers: {
    addCateShop(state, action) {
      state.value.push(action.payload);
    },
    removeCateShop(state, action) {
      state.value = action.payload.data.filter(
        (item) => item._id !== action.payload.id
      );
    },
    uploadCateShop(state, action) {
      console.log(action.payload);
      state.value == action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCateShopee.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addCateShopee.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadCateShopee.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { addCateShop, removeCateShop, uploadCateShop } =
  cateshopeeSlice.actions;
export default cateshopeeSlice.reducer;
