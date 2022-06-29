import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProAPI from "../../../API/ProAPI";
import ShopOwnerAPI from "../../../API/ShopOwner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";

const ProductShop = () => {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  return (
    <div className="detail__products-right">
      <div className="d-products-title_show">
        <span>sản phẩm khác của shop</span>
        <ul>
          {data.product?.map((item, index) => {
            return (
              <li key={index}>
                <Link to={`/detail/product=${item._id}`}>
                  <div className="products-img">
                    <img src={item.photo} alt="" />
                  </div>
                  <div className="slae-pro">
                    <span>{item.sale}%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">{item.name}</div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>Sản phẩm tương tự</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductShop;
