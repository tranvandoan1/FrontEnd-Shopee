import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProAPI from "../../../API/ProAPI";
import ShopOwnerAPI from "../../../API/ShopOwner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";
import styles from '../Css/CssModule/Detail.module.css'

const ProductShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  return (
    <div className="detail__products-right">
      <div className="products-title_show detail-pro">
        <span>sản phẩm khác của shop</span>
        <ul>
          {data.products?.map((pro, index) => {
            return (
              <li key={pro._id} onClick={() =>navigate(`/detail/${pro.name.replace(/\s+/g, "-")}&&${pro._id}`)}>
                <div>
                  <div className="products-img">
                    <img src={pro.photo} alt="" />
                  </div>
                  {pro.sale == 0 ? (
                    ""
                  ) : (
                    <div className="slae-pro">
                      <span>{pro.sale + "%"}</span> <span>giảm</span>
                    </div>
                  )}
                </div>
    
                <div className="products-item_content">
                  <div className="products_name">{pro.name}</div>
                  <div className="products-price">
                    <span>
                     12312
                    </span>
                    <span>đã bán {pro.sold}</span>
                  </div>
                </div>
    
              </li>
            // </Col>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductShop;
