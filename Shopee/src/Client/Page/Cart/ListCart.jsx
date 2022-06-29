import "../Css/Css/Cart.css";
import { HeaderSticky } from "../Header/HeaderSticky";
import { Footer } from "./../Header/Footer";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListOrder from './ListOrder';

const ListCart = () => {
  return (
    <div className="shopee__shop">
      {/* <!-- header pc --> */}
      <HeaderSticky />
      {/* <!-- main --> */}
      <div className="cart-page-header-wrapper">
        <div className="wapper">
          <div className="cart-page-header">
            <div className="cart-page-logo">
              <Link to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
                  alt=""
                />
              </Link>
              <span>Giỏ Hàng</span>
            </div>
            <div className="cart-page-search">
              <input type="text" name="" id="" placeholder="Tìm kiếm ....." />
              <button>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="cart-page-products">
          <div className="cart-page-pr_header">
         
            <div className="coll-1">sản phẩm</div>
            <div className="coll-2">đơn giá</div>
            <div className="coll-3">số lượng</div>
            <div className="coll-4">số tiền</div>
            <div className="coll-5">thao tác</div>
          </div>
          <ListOrder/>
        </div>
      </div>

      {/* <!-- footer --> */}
      <Footer />
    </div>
  );
};

export default ListCart;
