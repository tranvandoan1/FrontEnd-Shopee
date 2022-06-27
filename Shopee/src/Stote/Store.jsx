import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducers/Products";
import saveOrderSlice from "../reducers/saveOrder";
import categorisSlice from "../reducers/CategoriSlice";
import sliderSlice from "../reducers/SliderSlice";
import allDataSlice from "../reducers/AllData";
import shopOwnersSlice from "./../reducers/ShopOwner";
import cateshopeeSlice from "./../reducers/CateShopee";
import dataAddProSlice from "./../reducers/DataAddProSlice";
import commentSlice from "../reducers/CommentSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    saveorder: saveOrderSlice,
    categori: categorisSlice,
    slide: sliderSlice,
    dataAll: allDataSlice,
    shopowner: shopOwnersSlice,
    cateshop: cateshopeeSlice,
    dataaddpro: dataAddProSlice,
    comment: commentSlice,
  },
});
