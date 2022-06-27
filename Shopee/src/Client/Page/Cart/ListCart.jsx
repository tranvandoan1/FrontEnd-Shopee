import "../Css/Css/Cart.css";
import { HeaderSticky } from "../Header/HeaderSticky";
import { Footer } from "./../Header/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import {
  getSaveOrder,
  removeSaveOrder,
  uploadSaveOrder,
} from "../../../reducers/SaveOrderSlice";
import { openNotificationWithIcon } from "../../../Notification";
import { getShopOwner } from "./../../../reducers/ShopOwner";
const ListCart = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
  const shopowners = useSelector((data) => data.shopowner.value);
  const saveorders = useSelector((data) => data.saveorder.value);
  console.log(saveorders);
  useEffect(() => {
    dispatch(getSaveOrder());
    dispatch(getShopOwner());
  }, []);
  const dataPrice = [];
  // lấy ra những order thuộc của user đang đăng nhập
  const dataSaveOrder = [];
  saveorders?.filter(
    (item) =>
      item.user_id == user._id &&
      (dataPrice.push(item.price), dataSaveOrder.push(item))
  );
  // lấy ra tên shop có sản phẩm đang được order
  const newDataSaveOrder = [];
  shopowners?.filter((item) => {
    dataSaveOrder?.map((saveorder) => {
      saveorder.shop_id == item._id && newDataSaveOrder.push(item);
    });
  });
  // lọc nhưng tên trùng nhau
  const dupliName = (dupliNameArr = []) => {
    const newData = [];
    while (dupliNameArr.length > 0) {
      newData.push(dupliNameArr[0]);
      dupliNameArr = dupliNameArr?.filter(
        (item) => item.nameShop !== dupliNameArr[0].nameShop
      );
    }
    return newData;
  };
  // tính tổng tiền
  let sum = 0;
  for (let i = 0; i < dataPrice.length; i++) {
    sum += dataPrice[i];
  }
  const onclickRemoveSaveOrder = (id) => {
    if (confirm("Bạn có muốn xóa không")) {
      dispatch(removeSaveOrder(id));
      openNotificationWithIcon("success", "Xóa thành công");
    }
  };

  const onclickPush = (saveorder) => {
    let formData = new FormData();
    formData.append("amount", +saveorder.amount + +1);
    dispatch(uploadSaveOrder({ dataUpload: formData, id: saveorder._id }));
  };
  const onclickPrev = (saveorder) => {
    if (saveorder.amount == 1) {
      if (confirm("Bạn có muốn hủy bỏ sản phẩm này không ?")) {
        dispatch(removeSaveOrder(saveorder._id));
        openNotificationWithIcon("success", "Xóa thành công");
      }
    } else {
      let formData = new FormData();
      formData.append("amount", +saveorder.amount - +1);
      dispatch(uploadSaveOrder({ dataUpload: formData, id: saveorder._id }));
    }
  };

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
            <div className="pr-check-box">
              <input type="checkbox" />
            </div>
            <div className="coll-1">sản phẩm</div>
            <div className="coll-2">đơn giá</div>
            <div className="coll-3">số lượng</div>
            <div className="coll-4">số tiền</div>
            <div className="coll-5">thao tác</div>
          </div>
          {dupliName(newDataSaveOrder)?.map((item) => (
            <div className="cart-page_pr">
              <div className="cart-page_pr-owner">
                <i className="fas fa-house-user"></i>
                {item.nameShop}
              </div>

              {dataSaveOrder?.map((saveorder) => {
                if (saveorder.shop_id == item._id) {
                  return (
                    <div className="cart-page_pr-show">
                      <div className="checkbox">
                        <label htmlFor="check" id="active"></label>
                        <input type="checkbox" name="" id="check" />
                      </div>
                      <div className="pr-info">
                        <Link
                          to={`/detail/product=${saveorder.pro_id}`}
                          style={{ marginRight: 20 }}
                        >
                          <Row>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                              <div className="pr-image">
                                <img src={saveorder.photo} alt="" />
                              </div>
                            </Col>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                              <span>{saveorder.name_pro}</span>
                            </Col>
                          </Row>
                        </Link>

                        <div className="pr-classNameify">
                          <div className="classNameify">
                            <span>
                              phân loại <i className="fas fa-sort-up"></i>
                            </span>
                            <br />
                            <div className="pr-size">
                              {saveorder.classification},
                              {saveorder.commodity_value}
                            </div>
                          </div>

                          <div className="pr-filter">
                            <div className="pr-type">
                              <h4> tên rèm</h4>
                              <div className="type">
                                <ul>
                                  <li>
                                    <a>xanh xương rồng</a>
                                    <div className="pr-check-type">
                                      <div className="pr-check">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <a>hồng thỏ trắng</a>
                                    <div className="pr-check-type">
                                      <div className="pr-check">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <a>Hoa trắng dâu tây</a>
                                    <div className="pr-check-type">
                                      <div className="pr-check">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <a>xanh caro</a>
                                    <div className="pr-check-type">
                                      <div className="pr-check">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <a>xanh bơ</a>
                                    <div className="pr-check-type">
                                      <div className="pr-check">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="pr-size">
                              <h4>kích thước</h4>
                              <div className="size">
                                <ul>
                                  <li>
                                    <a>0.9mx1m</a>
                                    <div className="pr-check-size">
                                      <div className="pr-check_z">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <a>1mx1m2</a>
                                    <div className="pr-check-size">
                                      <div className="pr-check_z">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <a>1m2x1m5</a>
                                    <div className="pr-check-size">
                                      <div className="pr-check_z">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="pr-button">
                              <button className="back">Trở lại</button>
                              <button className="confirm">Mua ngay</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pr-price_sale">
                        <del>
                          ₫
                          {saveorder.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </del>{" "}
                        ₫
                        {Math.ceil(
                          saveorder.price * ((100 - saveorder.sale) / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                      <div className="pr-quantity">
                        <button
                          onClick={() => onclickPrev(saveorder)}
                          className="pr-prev"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={saveorder.amount}
                          className="input"
                          onChange={() => lp}
                          onBlurCapture
                        />
                        <button
                          onClick={() => onclickPush(saveorder)}
                          className="pr-next"
                        >
                          +
                        </button>
                      </div>
                      <div className="pr-price">
                        ₫
                        {(
                          Math.ceil(
                            saveorder.price * ((100 - saveorder.sale) / 100)
                          ) * saveorder.amount
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                      <div
                        className="pr-operation"
                        onClick={() => onclickRemoveSaveOrder(saveorder._id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ))}

          <div className="pr-buying">
            <div className="pr-total">
              <div className="total" style={{ display: "flex" }}>
                <React.Fragment>
                  <span>tổng thanh toán</span>{" "}
                  <span style={{ marginRight: 10 }}>
                    ({dataSaveOrder.length} sản phẩm)
                  </span>{" "}
                  :
                </React.Fragment>
                <span style={{ marginLeft: 20 }}>
                  ₫{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
              </div>
              <div className="buying">
                <button>mua ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- footer --> */}
      <Footer />
    </div>
  );
};

export default ListCart;
