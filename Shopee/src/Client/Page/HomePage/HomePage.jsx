import React, { lazy, Suspense, useState } from "react";
import { Footer } from "../Header/Footer";
import { HeaderNavbar } from "../Header/HeaderNavbar";
import "../Css/Css/HomePage.css";
import Slides from "./Slides";
import Categoris from "./Categoris";
import ProductSale from "./ProductSale";
import ProductHome from "./ProductHome";
import ProductTop from "./ProductTop";
import { Skeleton } from "antd";
const sleep = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};
const RenderCategoris = lazy(async () => {
  await sleep(2000);
  return { default: Categoris };
});
const RenderProductHome = lazy(async () => {
  await sleep(2000);
  return { default: ProductHome };
});
const Render = () => (
  <div style={{ maxWidth: 1200, display: "flex", justifyContent: "center" ,margin:'0 auto'}}>
    <Skeleton />
  </div>
);
const HomePage = () => {
  return (
    <div className="shopee__shop">
      <HeaderNavbar />
      <Slides />
      <Suspense fallback={<Render />}>
        <RenderCategoris />
      </Suspense>
      {/* <!-- baneer img --> */}
      <div className="banner-advertisement">
        <a href="">
          <img
            src="https://cf.shopee.vn/file/b4b3ae7cd45ce23a678d172112357793"
            alt=""
          />
        </a>
      </div>
      <ProductSale />
      {/*<ProductTop/>*/}
      <Suspense fallback={<Render />}>
        <RenderProductHome />
      </Suspense>

      <Footer />
    </div>
  );
};

export default HomePage;
