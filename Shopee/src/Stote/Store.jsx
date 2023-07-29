import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducers/Products";
import saveOrderSlice from "../reducers/SaveOrderSlice";
import categorisSlice from "../reducers/CategoriSlice";
import sliderSlice from "../reducers/SliderSlice";
import allDataSlice from "../reducers/AllData";
import shopOwnersSlice from "./../reducers/ShopOwner";
import cateshopeeSlice from "./../reducers/CateShopee";
import dataAddProSlice from "./../reducers/DataAddProSlice";
import commentSlice from "../reducers/CommentSlice";
import checkOutSlice from "../reducers/CheckOutSlice";
import infoUserSlice from "../reducers/InfoUserSlice";
import classifieSlice from "../reducers/Classifies";
import userSlice from "../reducers/UserSlice";
import pushEmailSlice from "../reducers/PushEmail";

export const store = configureStore({
  reducer: {
    products: productSlice,
    saveorders: saveOrderSlice,
    categoris: categorisSlice,
    slides: sliderSlice,
    dataAll: allDataSlice,
    shopowners: shopOwnersSlice,
    cateshops: cateshopeeSlice,
    dataaddpro: dataAddProSlice,
    comments: commentSlice,
    checkOut: checkOutSlice,
    infoUser: infoUserSlice,
    classifies:classifieSlice,
    users:userSlice,
    otpEmail:pushEmailSlice

  },
});
