import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShopOwnerAPI from "./../API/ShopOwner";
async function getAll(condition) {
  if (condition == 'user') {
    const { data: shopowners } = await ShopOwnerAPI.getAll();
    const user = JSON.parse(localStorage.getItem("user"));
    const dataShopowners = shopowners?.find((item) => item.user_id == user._id)
    return dataShopowners;
  } else {
    const { data: shopowners } = await ShopOwnerAPI.getAll();
    const dataShopowners = shopowners?.find((item) => item._id == condition)
    return dataShopowners;
  }

}
export const getShopOwner = createAsyncThunk(
  "shopowners/getShopOwner",
  async (condition) => {
    return getAll(condition);
  }
);

const shopOwnersSlice = createSlice({
  name: "shopowners",
  initialState: {
    value: {},
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
