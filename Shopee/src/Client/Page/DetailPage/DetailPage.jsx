import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderNavbar } from "../Header/HeaderNavbar";
import { Footer } from "../Header/Footer";
import "../Css/Css/Detail.css";
import SaveOrderAPI from "../../../API/SaveOrder";
import PageProductShop from "./PageProductShop";
import DescriptionProduct from "./DescriptionProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../reducers/Products";
import { getAllData } from "./../../../reducers/AllData";
import { Col, Modal, Rate, Row } from "antd";
import {
  addSaveOrder,
  uploadSaveOrder,
} from "../../../reducers/SaveOrderSlice";
import { openNotificationWithIcon } from "../../../Notification";
const DetailPage = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState([]);
  const [price, setPrice] = useState(["100000", "212000"]);
  const [classify, setClassify] = useState();
  const [commodityvalue, setCommodityvalue] = useState();
  const [CommodityValueSelect, setCommodityValueSelect] = useState();
  const [quantity, setQuantity] = useState(1);
  const [saveorder, setSaveOrder] = useState();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const data = useSelector((data) => data.dataAll.value);
  const product = useSelector((data) => data.product.value);
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getProduct(id));
    dispatch(getAllData());
    setQuantity(1);
    setCommodityValueSelect();
    setCommodityvalue();
    setClassify();
  }, [id]);
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage

  // lọc những tên trùng nhau
  const duplicateMame = (duplicateMameArr = []) => {
    const newData = [];
    while (duplicateMameArr.length > 0) {
      newData.push(duplicateMameArr[0]);
      duplicateMameArr = duplicateMameArr?.filter(
        (item) => item.name !== duplicateMameArr[0].name
      );
    }
    return newData;
  };
  // hiện tên thuộc phân loại

  const classifies = data.classify?.filter(
    (item) => item.linked == product.linked
  );

  // // // hiện giá trị thuộc phân loại
  const commodityvaluesArr = [];
  data.commodityvalue?.map((item) => {
    classifies?.map((classs) => {
      if (classs.connection == item.connection) {
        commodityvaluesArr.push(item);
      }
    });
  });

  // lấy ra tiền của sản phẩm
  const priceArr = [];
  duplicateMame(commodityvaluesArr)?.map((item) => priceArr.push(item.price));
  const maxPrice = Math.max.apply(Math, priceArr);
  const minPrice = Math.min.apply(Math, priceArr);

  // type
  const onClickClassify = async (value) => {
    setClassify(value);

    setCommodityvalue(
      data.commodityvalue?.filter((item) => item.connection == value.connection)
    );
    setCommodityValueSelect([]);
  };
  //size

  const onClickCommodityvalue = async (propId, name) => {
    setCommodityValueSelect([propId, name]);
    const price = commodityvalue?.find(
      (item) => item._id == propId && item.price
    );
    setPrice(price.price);
  };

  const onSubmitAddOrder = async () => {
    const order = data.saveorder?.find(
      (item) =>
        item.user_id == user._id &&
        item.classification == classify.name &&
        item.commodity_value == CommodityValueSelect[1]
    );
    if (order) {
      let formData = new FormData();
      formData.append("amount", +order.amount + +quantity);
      dispatch(uploadSaveOrder({ dataUpload: formData, id: order._id }));
      setQuantity(1);
      setCommodityValueSelect();
      setCommodityvalue();
      setClassify();
      openNotificationWithIcon("success", "Thêm thành công");
    } else {
      if (CommodityValueSelect[0]) {
        const order = {
          price: price,
          classification: classify.name,
          commodity_value: CommodityValueSelect[1],
          amount: quantity,
          pro_id: product._id,
          user_id: user._id,
          name_pro: product.name,
          photo: classify.photo,
          sale: product.sale,
          shop_id: product.shop_id,
        };
        dispatch(addSaveOrder(order));
        setQuantity(1);
        setCommodityValueSelect();
        setCommodityvalue();
        setClassify();
        openNotificationWithIcon("success", "Thêm thành công");
      } else {
        alert("Đã chọn đâu");
      }
    }
  };

  const ReduceQuantity = () => {
    quantity <= 0 ? alert("số lượng đã là 0 rồi !") : setQuantity(quantity - 1);
  };
  const AddQuantity = () => {
    quantity >= 10
      ? alert("số lượng đã là đạt tới cảnh giới cao rồi !")
      : setQuantity(quantity + 1);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="shopee__shop">
      <HeaderNavbar saveorder={saveorder} />
      <div className="page-detail">
        <div className="detail-wrapper">
          <div className="detail-columm_left" onClick={showModal}>
            <div className="group-images">
              <div className="img-detail">
                <img
                  src={classify == undefined ? product.photo : classify.photo}
                  alt=""
                />
              </div>
            </div>
            <div className="img-detail_show">
              <Row>
                <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                  {" "}
                  <div className="box-img">
                    <img src={product.photo1} alt="" />
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                  {" "}
                  <div className="box-img">
                    <img src={product.photo2} alt="" />
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                  <div className="box-img">
                    <img src={product.photo3} alt="" />
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                  {" "}
                  <div className="box-img">
                    <img src={product.photo4} alt="" />
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                  <div className="box-img">
                    <img src={product.photo5} alt="" />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div id="render-detail">
            <div className="detail-columm_right">
              <h2>{product.name}</h2>
              <div className="item__review">
                <span style={{ fontSize: 18 }}>
                  5.0
                  <Rate
                    disabled
                    defaultValue={2}
                    style={{ color: "red", marginLeft: 10, fontSize: 17 }}
                  />
                </span>
                <span>61 đã bán</span>
              </div>
              <div className="d-price">
                <span className="price-sale">
                  {price.length == 2
                    ? `${minPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ - ${maxPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`
                    : price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                      "đ"}
                </span>
                <span className="price">
                  <span className="showPrice">
                    {price.length == 2
                      ? `${Math.ceil(minPrice * ((100 - product.sale) / 100))
                          .toString()
                          .replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                          )}đ - ${Math.ceil(
                          maxPrice * ((100 - product.sale) / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`
                      : Math.ceil(price * ((100 - product.sale) / 100))
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
                  </span>
                </span>
                <span>{product.sale}% giảm</span>
              </div>
              <div className="validate">
                <div className="d-type">
                  <h4>{product.name_classification}</h4>
                  <div className="type">
                    <ul>
                      {duplicateMame(classifies).map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => onClickClassify(item)}
                            className={
                              item._id == classify?._id ? "active-type" : ""
                            }
                          >
                            <a>{item.name}</a>
                            <div className="check-type">
                              <div className="check">
                                <i className="fas fa-check"></i>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="d-size">
                  <h4>{product.name_commodityvalue}</h4>
                  {
                    <div className="size">
                      <ul id="list">
                        {(commodityvalue == undefined
                          ? duplicateMame(commodityvaluesArr)
                          : commodityvalue
                        ).map((item, index) => {
                          if (item.name) {
                            return (
                              <li
                                key={index}
                                onClick={() =>
                                  classify == undefined
                                    ? alert("Phải chọn thể loại trước ")
                                    : onClickCommodityvalue(item._id, item.name)
                                }
                                className={
                                  CommodityValueSelect == undefined
                                    ? ""
                                    : item._id == CommodityValueSelect[0]
                                    ? "active-value"
                                    : ""
                                }
                              >
                                <a>{item.name ? item.name : item}</a>
                                <div className="check-size">
                                  <div className="check_z">
                                    <i className="fas fa-check"></i>
                                  </div>
                                </div>
                              </li>
                            );
                          } else {
                            return (
                              <li
                                key={index}
                                onClick={() =>
                                  classify == ""
                                    ? alert("Phải chọn thể loại trước ")
                                    : onClickCommodityvalue(item._id, item.name)
                                }
                              >
                                <a>{item.name ? item.name : item}</a>
                                <div className="check-size">
                                  <div className="check_z">
                                    <i className="fas fa-check"></i>
                                  </div>
                                </div>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  }
                </div>
                <div className="quantity">
                  <h4>số lượng</h4>
                  <div className="q-quantity">
                    <button
                      className="q-minus"
                      onClick={() => ReduceQuantity()}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={() => Value()}
                    />
                    <button className="q-add" onClick={() => AddQuantity()}>
                      +
                    </button>
                    <div className="show-quantity">
                      {commodityvalue?.quantity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-addToCart">
                <div
                  className="addCart"
                  onClick={() =>
                    classify == undefined && CommodityValueSelect == undefined
                      ? alert("Chưa chọn cái nào hết")
                      : onSubmitAddOrder()
                  }
                >
                  <i className="fas fa-cart-plus"></i> thêm vào giỏ hàng
                </div>
                <div className="buy_now">mua ngay</div>
              </div>
            </div>
          </div>
          {/* mobile */}
        </div>
        {/* <!-- show img detail --> */}

        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="d_img">
            <div className="d-img_left">
              <div className="img-box">
                <img src={product.photo} alt="" />
              </div>
            </div>
            <div className="d-img_right">
              <span>{product.name}</span>
              <ul>
                <li>
                  <img src={product.photo1} alt="" />
                </li>
                <li>
                  <img src={product.photo2} alt="" />
                </li>
                <li>
                  <img src={product.photo3} alt="" />
                </li>
                <li>
                  <img src={product.photo4} alt="" />
                </li>
                <li>
                  <img src={product.photo5} alt="" />
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      </div>
      <PageProductShop />
      <DescriptionProduct />
      <Footer />
    </div>
  );
};

export default DetailPage;
