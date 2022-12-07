import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CateShopeeAPI from "../API/CateShopeeAPI";
import ShopOwnerAPI from "../API/ShopOwner";
import CateAPI from "./../API/Categoris";
import ProAPI from "./../API/ProAPI";
import SliderAPI from "./../API/Slider";
import ImageProAPI from "./../API/ImageProAPI";
import ClassifyAPI from "../API/ClassifyAPI";
import CommodityValueAPI from "./../API/CommodityValueAPI";
import UserAPI from "./../API/Users";
import CommentAPI from "./../API/CommentAPI";
import SaveOrderAPI from "./../API/SaveOrder";
import InfoUserAPI from "../API/InFoUser";

export const getAllData = createAsyncThunk("allData/getAllData", async () => {
  const { data: categoris } = await CateAPI.getAll();
  const { data: products } = await ProAPI.getAll();
  const { data: slides } = await SliderAPI.getAll();
  const { data: cateshopee } = await CateShopeeAPI.getAll();
  const { data: shopowners } = await ShopOwnerAPI.getAll();
  const { data: imagepros } = await ImageProAPI.getAll();
  const { data: classifies } = await ClassifyAPI.getAll();
  const { data: commodityvalues } = await CommodityValueAPI.getAll();
  const { data: users } = await UserAPI.getAll();
  const { data: comments } = await CommentAPI.getAll();
  const { data: saveorders } = await SaveOrderAPI.getAll();
  const { data: info_user } = await InfoUserAPI.getAll();

  const dataAll = {
    categori: categoris,
    product: products,
    slide: slides,
    shopowner: shopowners,
    cateshopee: cateshopee,
    imagepros: imagepros,
    classify: classifies,
    commodityvalue: commodityvalues,
    user: users,
    comment: comments,
    saveorder: saveorders,
    info_user: info_user,
  };
  return dataAll;
});
const allDataSlice = createSlice({
  name: "allData",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default allDataSlice.reducer;
