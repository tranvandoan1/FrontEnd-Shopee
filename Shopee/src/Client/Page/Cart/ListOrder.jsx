import "../Css/Css/Cart.css";
import { HeaderSticky } from "../Header/HeaderSticky";
import { Footer } from "./../Header/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Col, Input, Row } from "antd";
import {
  getSaveOrder,
  removeSaveOrder,
  uploadSaveOrder,
} from "../../../reducers/SaveOrderSlice";
import { openNotificationWithIcon } from "../../../Notification";
import { getShopOwner } from "./../../../reducers/ShopOwner";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import TotalProductOder from "./TotalProductOder";
import SaveOrderAPI, { remove } from "./../../../API/SaveOrder";
const ListOrder = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage

  const [quantity, setQuantity] = useState();
  const [saveOrderSelect, setSaveOrderSelect] = useState([]);
  const [checkList_commodityValue, setCheckList_commodityValue] = useState();
  const [selectCommodityValue, setSelectCommodityValue] = useState();
  const [commodity, setCommodity] = useState();
  const [classify, setClassify] = useState();

  const shopowners = useSelector((data) => data.shopowner.value);
  const saveorders = useSelector((data) => data.saveorder.value);
  const data = useSelector((data) => data.dataAll.value);

  useEffect(async () => {
    dispatch(getSaveOrder());
    dispatch(getShopOwner());
    dispatch(getAllData());
  }, []);
  // lấy ra những order thuộc của user đang đăng nhập
  const dataSaveOrder = [];
  saveorders?.filter(
    (item) => item.user_id == user?._id && dataSaveOrder.push(item)
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
        (item) => item.name !== dupliNameArr[0].name
      );
    }
    return newData;
  };

  // xóa order
  const onclickRemoveSaveOrder = (id) => {
    if (confirm("Bạn có muốn xóa không")) {
      dispatch(removeSaveOrder(id));
    }
  };

  // tăng giảm số lượng
  const onclickQuantity = async (saveorder, check) => {
    if (saveorder.amount == 1 && check == 1) {
      if (confirm("Bạn có muốn hủy bỏ sản phẩm này không ?")) {
        dispatch(removeSaveOrder(saveorder._id));
        openNotificationWithIcon("success", "Xóa thành công");
        setQuantity();
      }
    } else {
      let formData = new FormData();
      formData.append(
        "amount",
        check == 1 ? +saveorder.amount - +1 : +saveorder.amount + +1
      );
      dispatch(uploadSaveOrder({ dataUpload: formData, id: saveorder._id }));
      setQuantity();
    }
  };

  // upload lại order nếu nhập số lượng vào input
  const editSaveOrder = (saveorder) => {
    if (quantity !== undefined && saveorder._id == quantity.id) {
      let formData = new FormData();
      formData.append("amount", quantity.amount);
      dispatch(uploadSaveOrder({ dataUpload: formData, id: saveorder._id }));
      openNotificationWithIcon("success", "Cập nhật thành công");
    }
  };
  const checkIdSaveOrder = (saveorder) => {
    const commodityValue = data.commodityvalue?.filter(
      (item) => item.linked == saveorder.linked
    );
    setCheckList_commodityValue(
      checkList_commodityValue !== undefined
        ? checkList_commodityValue.id !== saveorder._id
          ? { id: saveorder._id, commodityvalue: commodityValue }
          : undefined
        : { id: saveorder._id, commodityvalue: commodityValue }
    );
  };

  const onclickClass = (classs) => {
    setClassify(classs);
    const commodityValue = data.commodityvalue?.filter(
      (item) => item.connection == classs.connection
    );
    setSelectCommodityValue(commodityValue);
  };

  const buyNow = (id) => {
    let formData = new FormData();
    formData.append("classification", classify.name);
    formData.append("commodity_value", commodity.name);
    dispatch(uploadSaveOrder({ dataUpload: formData, id: id }));
    setCheckList_commodityValue();
    setSelectCommodityValue();
    setCommodity();
    setClassify();
    openNotificationWithIcon("success", "Cập nhật thành công");
  };

  return (
    <div>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={(e) => setSaveOrderSelect(e)}
      >
        {dupliName(newDataSaveOrder)?.map((item, indexx) => (
          <div className="cart-page_pr" key={indexx}>
            <div className="cart-page_pr-owner">
              <i className="fas fa-house-user"></i>
              {item.name}
            </div>

            {dataSaveOrder?.map((saveorder, index) => {
              if (saveorder.shop_id == item._id) {
                return (
                  <div className="cart-page_pr-show" key={index}>
                    <Checkbox key={index} value={saveorder} />
                    <div className="pr-info">
                      <Link
                        to={`/detail/product=${saveorder.pro_id}`}
                        style={{ marginRight: 20 }}
                      >
                        <Row>
                          <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                            <div className="pr-image">
                              <img src={saveorder.photo} alt="" />
                            </div>
                          </Col>
                          <Col xs={16} sm={16} md={16} lg={18} xl={18}>
                            <span>{saveorder.name_pro}</span>
                          </Col>
                        </Row>
                      </Link>

                      <div className="pr-classNameify">
                        <div
                          style={{ cursor: "pointer", zIndex: 1 }}
                          onClick={() => checkIdSaveOrder(saveorder)}
                        >
                          <span style={{ color: "rgba(0,0,0,.54)" }}>
                            phân loại{" "}
                            {checkList_commodityValue == undefined ||
                            checkList_commodityValue !== saveorder._id ? (
                              <CaretUpOutlined />
                            ) : (
                              <CaretDownOutlined />
                            )}
                          </span>
                          <br />
                          <div className="pr-size">
                            {saveorder.classification},
                            {saveorder.commodity_value}
                          </div>
                        </div>

                        {checkList_commodityValue?.id == saveorder._id &&
                          data.product?.map((pro) => {
                            if (pro.linked == saveorder.linked) {
                              return (
                                <div className="pr-filter" key={pro._id}>
                                  <div className="pr-type">
                                    <h4>{pro.name_classification}</h4>
                                    <div className="type">
                                      <ul>
                                        {data.classify?.map((classs) => {
                                          if (
                                            classs.linked == saveorder.linked
                                          ) {
                                            return (
                                              <li
                                                key={classs._id}
                                                style={{ marginRight: 5 }}
                                                onClick={() =>
                                                  onclickClass(classs)
                                                }
                                              >
                                                <a>{classs.name}</a>
                                                <div className="pr-check-type">
                                                  <div className="pr-check">
                                                    <i className="fas fa-check"></i>
                                                  </div>
                                                </div>
                                              </li>
                                            );
                                          }
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="pr-size">
                                    <h4>{pro.name_commodityvalue}</h4>
                                    <div className="size">
                                      <ul>
                                        {(selectCommodityValue == undefined
                                          ? dupliName(
                                              checkList_commodityValue?.commodityvalue
                                            )
                                          : selectCommodityValue
                                        )?.map((commm, index) => {
                                          if (
                                            commm.linked == saveorder.linked
                                          ) {
                                            return (
                                              <li
                                                key={index}
                                                onClick={() =>
                                                  setCommodity(commm)
                                                }
                                              >
                                                <a>{commm.name}</a>
                                                <div className="pr-check-size">
                                                  <div className="pr-check_z">
                                                    <i className="fas fa-check"></i>
                                                  </div>
                                                </div>
                                              </li>
                                            );
                                          }
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="pr-button">
                                    <button className="back">Trở lại</button>
                                    <button
                                      onClick={() => buyNow(saveorder._id)}
                                      className="confirm"
                                    >
                                      Mua ngay
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                    <div className="pr-price_sale">
                      {saveorder.sale !== 0 && (
                        <del>
                          ₫
                          {saveorder.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </del>
                      )}
                      ₫
                      {Math.ceil(
                        saveorder.price * ((100 - saveorder.sale) / 100)
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                    <div className="pr-quantity">
                      <Button
                        style={{ padding: "0 10px", margin: 0 }}
                        onClick={() => onclickQuantity(saveorder, 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="text"
                        value={
                          quantity == undefined
                            ? saveorder.amount
                            : quantity.id == saveorder._id
                            ? quantity.amount
                            : saveorder.amount
                        }
                        className="input"
                        onChange={(e) =>
                          setQuantity({
                            id: saveorder._id,
                            amount: e.target.value,
                          })
                        }
                        onBlur={() => editSaveOrder(saveorder)}
                      />
                      <Button
                        style={{ padding: "0 10px", margin: 0 }}
                        onClick={() => onclickQuantity(saveorder, 2)}
                      >
                        +
                      </Button>
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
      </Checkbox.Group>
      <TotalProductOder
        saveOrderSelect={saveOrderSelect}
        saveorder={dataSaveOrder}
      />
    </div>
  );
};

export default ListOrder;
