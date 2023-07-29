import React, { useEffect, useState } from "react";
import "../Css/Css/Checkout.css";
import { HeaderSticky } from "./../Header/HeaderSticky";
import TotalPrice from "./TotalPrice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Input } from "antd";

import ListAddress from "./ListAddress";
import { Link } from "react-router-dom";
import { Footer } from "./../Header/Footer";
import { getSaveOrder } from "../../../reducers/SaveOrderSlice";
import { getShopOwner } from "../../../reducers/ShopOwner";

const Checkout = () => {
  const dispatch = useDispatch();
  const saveorders = useSelector((data) => data.saveorders.value);
  const shopowners = useSelector((data) => data.shopowners.value);
  const dataSelect = saveorders?.filter((item) => item.check == true);
  useEffect(() => {
    dispatch(getSaveOrder());
    dispatch(getShopOwner());
  }, []);

  // lấy ra tên danh mục của shop bán sản phẩm đó
  const shopowner = [];
  shopowners?.filter((item) => {
    dataSelect.map((data) => {
      if (item._id == data.shop_id) {
        shopowner.push(item);
      }
    });
  });
  // lọc nhưng tên trùng nhau
  const dupliName = (dupliNameArr = []) => {
    const newData = [];
    while (dupliNameArr.length > 0) {
      newData.push(dupliNameArr[0]);
      dupliNameArr = dupliNameArr?.filter(
        (item) => item.name !== dupliNameArr[0].name
      );
    }
    return newData;
  };

  // tính tổng tiền của sp từng shop

  const dataPrice = [];
  shopowners?.filter((item) => {
    const dataSaveOrder = [];
    dataSelect.map((data) => {
      if (item._id == data.shop_id) {
        dataSaveOrder.push(
          Math.ceil(data.price * ((100 - data.sale) / 100)) * data.amount
        );
      }
    });
    dataPrice.push({ _id: item._id, data: dataSaveOrder });
  });

  // (
  //   <div className="loading">
  //     <Spin
  //       className="load"
  //       indicator={
  //         <LoadingOutlined
  //           style={{
  //             fontSize: 50,
  //             color: "red",
  //           }}
  //           spin
  //         />
  //       }
  //     />
  //   </div>
  // )
  return (
    <div style={{ background: "#f7f7f7" }}>
      <HeaderSticky />
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
              <span>Thanh toán</span>
            </div>
          </div>
        </div>
      </div>

      <ListAddress />
      <div className="cart-main">
        <div className="cart_products-header">
          <div className="cart-pr">Sản Phẩm</div>
          <div className="cart-pr_unit-price">Đơn Giá</div>
          <div className="cart-pr_quantity">Số Lượng</div>
          <div className="cart-pr_into-money">Thành Tiền</div>
        </div>
      </div>
      {dupliName(shopowner)?.map((item, index) => (
        <div className="cart-pr_show" key={item}>
          <div className="cart-pr_shop">
            <i className="fas fa-house-user"></i> {item.name}
          </div>
          {dataSelect?.map((saveorder, index) => {
            if (saveorder.shop_id == item._id) {
              return (
                <div className="cart-pr_show-pr" key={index}>
                  <div className="cart-pr_image-name">
                    <div className="cart-pr_image">
                      <img src={saveorder.photo} alt="" />
                    </div>
                    <div className="cart-pr_name">
                      <div className="name">{saveorder.name_pro}</div>
                      <div className="type">
                        Loại :{" "}
                        <span>
                          {saveorder.classification},{saveorder.commodity_value}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="unit-price">
                    {" "}
                    <del style={{ marginRight: 10 }}>
                      ₫
                      {saveorder.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </del>
                    ₫
                    {Math.ceil(saveorder.price * ((100 - saveorder.sale) / 100))
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </div>
                  <div className="quantityy">{saveorder.amount}</div>
                  <div className="into-money">
                    ₫
                    {(
                      Math.ceil(
                        saveorder.price * ((100 - saveorder.sale) / 100)
                      ) * saveorder.amount
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </div>
                </div>
              );
            }
          })}
          <div className="sum">
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <span style={{ width: "30%" }}>Lời nhắn</span>{" "}
                <Input
                  style={{ width: "100%" }}
                  placeholder="Lưu ý cho Người bán"
                />
              </div>
              <div
                style={{
                  width: "60%",
                  borderLeft: "1px solid #eaeaea",
                  marginLeft: 10,
                }}
              >
                <span className="shipping-unit">Đơn vị vận chuyển</span>
                <span className="flas">Nhanh</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span>
                Tổng tiền :{" "}
                <span className="price">
                  {dataPrice?.map((saveorder, index) => {
                    if (saveorder._id == item._id) {
                      let sum = 0;
                      for (let i = 0; i < saveorder?.data.length; i++) {
                        sum += saveorder?.data[i];
                      }
                      return (
                        <React.Fragment>
                          ₫
                          {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </React.Fragment>
                      );
                    }
                  })}
                </span>
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="use-coins">
        <div className="usc-box">
          <div className="use">
            <i className="fas fa-dollar-sign"></i> Shopee Xu{" "}
            <span>Dùng 200 Shopee Xu</span>
          </div>
          <div className="coins">
            <label htmlFor="checkcoin">
              <span>-200</span>
              <div className="check__coin"></div>
            </label>
            <input type="checkbox" id="check-coin" />
          </div>
        </div>
      </div>
      <TotalPrice dataSelect={dataSelect} />
      <Footer />
    </div>
  );
};

export default Checkout;
