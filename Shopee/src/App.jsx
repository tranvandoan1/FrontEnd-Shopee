import "./App.css";
import HomePage from "./Client/Page/HomePage/HomePage";
import React, { useEffect, useState } from "react";
// import ProAPI from "./API/ProductsAPI"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./Client/Page/DetailPage/DetailPage";
import Admin from "./Server/Admin";
import Login from "./Client/Page/User/Login";
import Categoris from "./Server/Categoris/Categoris";
import AddCate from "./Server/Categoris/AddCate";
import EditCate from "./Server/Categoris/EditCate";
import Slider from "./Server/Slider/Slider";
import AddSlider from "./Server/Slider/AddSlider";
import SellerChannel from "./Client/SellerChannel/SellerChannelCheck";
import Sales from "./Client/SellerChannel/Sales/SellerChannel";
import AdminLayout from "./Client/SellerChannel/SellerChannelAdmin/AdminLayout";
import Statistical from "./Client/SellerChannel/SellerChannelAdmin/Statistical/Statistical";
import List from "./Client/SellerChannel/SellerChannelAdmin/Categoris/List";
import AddCateShop from "./Client/SellerChannel/SellerChannelAdmin/Categoris/AddCateShop";
import ListPro from './Client/SellerChannel/SellerChannelAdmin/Products/ListPro';
import AddPro from "./Client/SellerChannel/SellerChannelAdmin/Products//AddPro/AddPro";
import ListCart from './Client/Page/Cart/ListCart';
import Checkout from './Client/Page/PayMent/Checkout';
import PurchaseIndex from './Client/Page/Purchase/PurchaseIndex';
import EditSlider from "./Server/Slider/EditSlider";
import OtpPhone from "./components/OtpPhone";
import SignUpScreen from "./Client/Page/User/SignUpScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/product=:id" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUpScreen />} />
        <Route path="/cart" element={<ListCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/purchase" element={<PurchaseIndex />} />
        <Route path="test/" element={<OtpPhone />} />
        <Route
          path="/seller-channel/check_signup"
          element={<SellerChannel />}
        />
        <Route path="/seller-channel" element={<Sales />} />
        <Route path="/seller-channel/admin/" element={<AdminLayout />}>
          <Route path="statistical" element={<Statistical />} />
          <Route path="categoris" element={<List />} />
          <Route path="categoris/add" element={<AddCateShop />} />
          <Route path="products" element={<ListPro />} />
          <Route path="products/add" element={<AddPro />} />
          <Route path="purchase/" element={<PurchaseIndex />} />
        </Route>
        <Route path="/admin/" element={<Admin />}>

          <Route path="slider" element={<Slider />} />
          <Route path="slider/add" element={<AddSlider />} />
          <Route path="slider/edit=:id" element={<EditSlider />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
