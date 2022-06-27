import React, { useState } from 'react'
import { Footer } from '../Header/Footer';
import { HeaderNavbar } from '../Header/HeaderNavbar';
import "../Css/Css/HomePage.css"
import Slides from './Slides';
import Categoris from './Categoris';
import ProductSale from './ProductSale';
import ProductHome from './ProductHome';
import ProductTop from './ProductTop';
const HomePage = () => {
  return (
    
    <div className="shopee__shop">

      <HeaderNavbar />
      <Slides />

      <Categoris />
      {/* <!-- baneer img --> */}
      <div className="banner-advertisement">
        <a href=""><img src="https://cf.shopee.vn/file/b4b3ae7cd45ce23a678d172112357793" alt=""/></a>
      </div>
      {/* <ProductSale />
      <ProductTop/>*/}
      <ProductHome/> 


      <Footer />
    </div >

  )
}

export default HomePage
