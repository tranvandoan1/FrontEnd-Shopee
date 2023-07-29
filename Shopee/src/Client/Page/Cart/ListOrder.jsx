import "../Css/Css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Col, Input, Result, Row, message } from "antd";
import {
  getSaveOrder,
  removeSaveOrder,
  uploadSaveOrder,
  uploadSaveOrderCart,
} from "../../../reducers/SaveOrderSlice";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import TotalProductOder from "./TotalProductOder";
import ModalComfim from "../../../components/ModalComfim";
const ListOrder = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState({ data: undefined, status: false });
  const [quantity, setQuantity] = useState();
  const [saveOrderSelect, setSaveOrderSelect] = useState([]);
  const [showUpdateValue, setShowUpdateValue] = useState(); //hiện bảng để chọn giá trị mogn muốn thay đổi
  const [commodityValue, setCommodityValue] = useState(); //lưu giá trị phân loại
  const [commoditySelect, setCommoditySelect] = useState(); //chọn giá trị phân loại
  const [classify, setClassify] = useState();
  const data = useSelector((data) => data.dataAll.value);
  const saveorders = useSelector((data) => data.saveorders.value);
  useEffect(async () => {
    dispatch(getSaveOrder());
    dispatch(getAllData());
  }, []);

  // lọc giá trị trùng
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
  // lọc giá trị phân loại
  const dataValue = [];
  saveorders?.map((item) => {
    const value = [];
    data?.classify?.map((itemClas) => {
      if (item.linked == itemClas.linked) {
        itemClas?.values?.map((itemValue) => {
          value.push({
            name: itemValue?.name,
            _id: itemValue._id,
            indexNumber: itemValue?.indexNumber,
          });
        });
      }
    });
    const newDataCommValue = dupliName(value)?.sort(
      (a, b) => a.indexNumber - b.indexNumber
    );
    value?.length > 0 &&
      dataValue.push({ _id: item._id, values: dupliName(newDataCommValue) });
  });

  // lấy ra tên shop có sản phẩm đang được order
  const newDataSaveOrder = [];
  data?.shopowner?.filter((item) => {
    saveorders?.map((saveorder) => {
      saveorder.shop_id == item._id && newDataSaveOrder.push(item);
    });
  });

  // xóa order
  const onclickRemoveSaveOrder = async (id) => {
    await dispatch(removeSaveOrder(id));
    message.open({
      type: "success",
      content: "Xóa thành công",
      duration: 1,
    });
    setStatus({ data: undefined, status: false })
  };

  // tăng giảm số lượng
  const onclickQuantity = async (saveorder, check) => {
    if (saveorder.amount == 1 && check == 1) {
      setStatus({ data: saveorder._id, status: true, content: 'Bạn có muốn hủy bỏ sản phẩm này không !' })
    } else {
      await dispatch(
        uploadSaveOrder({
          _id: saveorder._id,
          amount: Number(
            check == 1 ? +saveorder.amount - +1 : +saveorder.amount + +1
          ),
        })
      );
      setQuantity();
      message.open({
        type: "success",
        content: "Cập nhật thành công",
        duration: 1,
      });
    }
  };

  // upload lại order nếu nhập số lượng vào input
  const editSaveOrder = async (saveorder) => {
    if (quantity !== undefined && saveorder._id == quantity.id) {
      await dispatch(
        uploadSaveOrder({ _id: quantity.id, amount: Number(quantity.amount) })
      );
      setQuantity();
      message.open({
        type: "success",
        content: "Cập nhật thành công",
        duration: 1,
      });
    }
  };

  //hiện bảng để chọn giá trị mogn muốn thay đổi
  const checkIdSaveOrder = (saveorder) => {
    const dataClassify = data?.classify.find(
      (item) => item._id == saveorder?.classification_id
    );

    if (saveorder._id == showUpdateValue?.id) {
      setShowUpdateValue();
      setClassify();
      setCommodityValue();
      setCommoditySelect();
    } else {
      setShowUpdateValue({ id: saveorder._id });
      const newDataCommValue = dupliName(dataClassify?.values)?.sort(
        (a, b) => a.indexNumber - b.indexNumber
      );
      setCommodityValue(newDataCommValue);
      setClassify(dataClassify);
    }
  };

  const onclickClass = (classs) => {
    if (classify?._id == classs?._id) {
      setClassify();
      setCommodityValue();
      setCommoditySelect();
    } else {
      if (classs?.values == null) {
        setClassify(classs);
      } else {
        setClassify(classs);
        const newDataCommValue = dupliName(classs?.values)?.sort(
          (a, b) => a.indexNumber - b.indexNumber
        );
        setCommodityValue(newDataCommValue);
      }
    }
  };

  // cập nhật sp khi thay đổi giá trị sản phẩm
  const buyNow = async (id) => {
    const newData = {
      commodity_value: commoditySelect?.name,
      commodity_value_id: commoditySelect?._id,
      classification: classify?.name,
      classification_id: classify?._id,
    };
    await dispatch(uploadSaveOrderCart({ _id: id, data: newData }));
    setShowUpdateValue();
    setCommodityValue();
    setCommoditySelect();
    setClassify();
    message.open({
      type: "success",
      content: "Cập nhật thành công",
      duration: 1,
    });
  };

  return (
    <div>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={(e) => setSaveOrderSelect(e)}
      >
        {dupliName(newDataSaveOrder)?.length <= 0 ?
          <div className="warning403">
            <Result
              status="403"
              title="Thông báo"
              subTitle="Chưa có sản phẩm"
              extra={null}
            />
          </div>
          :
          dupliName(newDataSaveOrder)?.map((item, indexx) => (
            <div className="cart-page_pr" key={indexx}>
              <div className="cart-page_pr-owner">
                <i className="fas fa-house-user"></i>
                {item.name}
              </div>

              {saveorders?.map((saveorder, index) => {
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
                              {showUpdateValue == undefined ||
                                showUpdateValue?.id !== saveorder._id ? (
                                <CaretUpOutlined />
                              ) : (
                                <CaretDownOutlined />
                              )}
                            </span>
                            <br />
                            <div className="pr-size">
                              {saveorder.classification}
                              {saveorder?.commodity_value !== null &&
                                `,${saveorder.commodity_value}`}
                            </div>
                          </div>

                          {showUpdateValue?.id == saveorder._id &&
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
                                                  className={
                                                    (
                                                      commodityValue == undefined
                                                        ? classs._id ==
                                                        saveorder.classification_id
                                                        : classs._id ==
                                                        classify?._id
                                                    )
                                                      ? "active-type"
                                                      : ""
                                                  }
                                                >
                                                  <a>{classs.name}</a>
                                                  <div className="check-type">
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
                                    {commodityValue !== undefined && (
                                      <div className="pr-size">
                                        <h4>{pro.name_commodityvalue}</h4>
                                        <div className="size">
                                          <ul>
                                            {commodityValue?.map((itemValue) => {
                                              return (
                                                <li
                                                  key={index}
                                                  onClick={() =>
                                                    classify !== undefined
                                                      ? setCommoditySelect(
                                                        itemValue
                                                      )
                                                      : message.open({
                                                        type: "warning",
                                                        content: "Chưa chọn ",
                                                        duration: 1,
                                                      })
                                                  }
                                                  style={{ marginRight: 5 }}
                                                  className={
                                                    (
                                                      commoditySelect == undefined
                                                        ? itemValue?._id ==
                                                        saveorder?.commodity_value_id
                                                        : itemValue._id ==
                                                        commoditySelect?._id
                                                    )
                                                      ? "active-value"
                                                      : ""
                                                  }
                                                >
                                                  <a>{itemValue.name}</a>
                                                  <div className="check-size">
                                                    <div className="pr-check_z">
                                                      <i className="fas fa-check"></i>
                                                    </div>
                                                  </div>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        </div>
                                      </div>
                                    )}

                                    <div className="pr-button">
                                      <button
                                        className="back"
                                        onClick={() => checkIdSaveOrder(1)}
                                      >
                                        Trở lại
                                      </button>
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
                        onClick={() => setStatus({ data: saveorder._id, status: true, content: 'Bạn có muốn xóa không !' })}
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
      <TotalProductOder saveOrderSelect={saveOrderSelect} />
      <ModalComfim
        title={"thông báo"}
        content={status?.content}
        status={status?.status}
        callBack={(e) => {
          if (e == 'close') {
            setStatus({ data: undefined, status: false })
          } else {
            onclickRemoveSaveOrder(status?.data)
          }
        }}
      />
    </div>
  );
};

export default ListOrder;
