import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShopOwnerAPI from "./../API/ShopOwner";

export const getShopOwner = createAsyncThunk(
  "shopowner/getSlider",
  async () => {
    const { data: shopowners } = await ShopOwnerAPI.getAll();
    return shopowners;
  }
);

const shopOwnersSlice = createSlice({
  name: "shopowner",
  initialState: {
    value: [],
  },
  reducers: {
    addSlide(state, action) {
      state.value.push(action.payload);
    },
    uploadSlide(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getShopOwner.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
// export const { addSlide, uploadSlide } = sliderSlice.actions;
export default shopOwnersSlice.reducer;
