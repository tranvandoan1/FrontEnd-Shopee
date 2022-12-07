import React, { useEffect, useState } from "react";
import "../Css/Css/Checkout.css";
import { HeaderSticky } from "./../Header/HeaderSticky";
import TotalPrice from "./TotalPrice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Checkbox, Input, Radio, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ShowAddAddress from "./ShowAddAdress";
import {
  getInfoUser,
  removeInfoUser,
  uploadInfoUser,
} from "../../../reducers/InfoUserSlice";
import { openNotificationWithIcon } from "../../../Notification";
import ListAddress from "./ListAddress";
import { getAllData } from "../../../reducers/AllData";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "./../Header/Footer";

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((data) => data.dataAll.value);
  const [sum, setSum] = useState();

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const dataSelect = data.saveorder?.filter((item) => item.check == true);
  const shopowner = [];
  data.shopowner?.filter((item) => {
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

  // lấy ra những order thuộc của user đang đăng nhập
  const dataSaveOrder = [];
  data.saveorder?.filter(
    (item) =>
      item.user_id == user?._id &&
      item.check == true &&
      dataSaveOrder.push(item)
  );
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
          {dataSaveOrder?.map((saveorder, index) => {
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
                  {dataSaveOrder?.map((saveorder, index) => {
                    if (saveorder.shop_id == item._id) {
                      return (
                        <React.Fragment>
                          ₫
                          {
                            (
                      
                              Math.ceil(
                                saveorder.price * ((100 - saveorder.sale) / 100)
                              ) *
                                saveorder.amount
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          }
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
