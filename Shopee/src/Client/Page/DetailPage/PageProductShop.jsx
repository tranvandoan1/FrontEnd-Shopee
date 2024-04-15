import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllData } from "../../../reducers/AllData";
import { getProduct } from "../../../reducers/Products";

const PageProductShop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((data) => data.dataAll.value);
  const product = useSelector((data) => data.products.value);
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getAllData());
  }, []);
  let dataShopOwners = {};
  if (data?.cateshopee !== undefined) {
    data?.cateshopee.map((item) => {
      data.shopowners?.map((shop) => {
        if (item._id == product?.cate_id) {
          if (shop._id == item.shopowner_id) {
            dataShopOwners = shop;
          }
        }
      });
    });
  }

  return (
    // < !--chủ shop-- >
    <div className="owner-shop">
      <div className="page-products_shop">
        <div className="info-shop">
          <a href="/#/page/seller-channel/${proShopOwner._id}">
            <div className="avatar-shop">
              <img src={dataShopOwners.photo} alt="" />
            </div>
          </a>

          <div className="name-shop">
            <span>{dataShopOwners.name}</span>
            <span>
              <i className="fas fa-archive"></i>
              xem shop
            </span>
          </div>
        </div>
        <div className="achievements">
          <ul>
            <li>
              đánh giá <span>3,7k</span>{" "}
            </li>
            <li>
              sản phẩm <span>{product.length}</span>
            </li>
            <li>
              bình luận <span>5432</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageProductShop;
