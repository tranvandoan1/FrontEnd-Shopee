import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [selectPhoto, setSelectPhoto] = useState();
  const [photoHover, setPhotoHover] = useState();
  const [price, setPrice] = useState();
  const [classify, setClassify] = useState();
  const [commodityvalue, setCommodityvalue] = useState();
  const [CommodityValueSelect, setCommodityValueSelect] = useState();
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const setEmpty = () => {
    setQuantity(1);
    setCommodityValueSelect();
    setCommodityvalue();
    setClassify();
  };

  const onSubmitAddOrder = async (check) => {
    if (classify == undefined) {
      openNotificationWithIcon("warning", "Bạn đã chọn gì đâu");
    } else {
      // tìm xem order vừa thêm đã tồn tại chưa
      const order = data.saveorder?.find(
        (item) =>
          item.user_id == user._id &&
          item.classification == classify.name &&
          item.commodity_value == CommodityValueSelect[1]
      );
      console.log(order);
      if (order) {
        let formData = new FormData();
        formData.append("amount", +order.amount + +quantity);
        dispatch(uploadSaveOrder({ dataUpload: formData, id: order._id }));
        setEmpty();
        check == "buyNow" && navigate("/cart");
        openNotificationWithIcon("success", "Thêm thành công");
      } else {
        if (CommodityValueSelect[0]) {
          const order = {
            price: price,
            classification: classify.name,
            commodity_value: CommodityValueSelect[1],
            amount: quantity,
            linked: product.linked,
            user_id: user._id,
            name_pro: product.name,
            photo: classify.photo,
            sale: product.sale,
            shop_id: product.shop_id,
            pro_id: product._id,
          };
          dispatch(addSaveOrder(order));
          setEmpty();
          check == "buyNow" && navigate("/cart");
          openNotificationWithIcon("success", "Thêm thành công");
        } else {
          openNotificationWithIcon("warning", "Chưa chọn phân loại");
        }
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
  const checkPhoto = (product) => {
    if (classify == undefined && photoHover == undefined) {
      return product.photo;
    } else if (classify) {
      return classify.photo;
    } else if (photoHover) {
      return photoHover;
    }
  };
  const hoverImage = (hover) => {
    setPhotoHover(
      hover == 1
        ? product.photo1
        : hover == 2
        ? product.photo2
        : hover == 3
        ? product.photo3
        : hover == 4
        ? product.photo1
        : hover == 5
        ? product.photo1
        : ""
    ),
      setEmpty();
  };
  return (
    <div className="shopee__shop">
      <HeaderNavbar />
      <div className="page-detail">
        <div className="detail-wrapper">
          <div className="detail-columm_left" onClick={showModal}>
            <div
              className="group-images"
              onClick={() => setSelectPhoto(product.photo)}
            >
              <div className="img-detail">
                <img src={checkPhoto(product)} alt="" />
              </div>
            </div>
            <div className="img-detail_show">
              <Row>
                {product.photo1?.length > 0 && (
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    {" "}
                    <div
                      className="box-img"
                      onMouseLeave={() => setPhotoHover()}
                      onMouseEnter={() => hoverImage(1)}
                      onClick={() => setSelectPhoto(product.photo1)}
                    >
                      <img src={product.photo1} alt="" />
                    </div>
                  </Col>
                )}

                {product.photo2?.length > 0 && (
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    {" "}
                    <div
                      className="box-img"
                      onMouseLeave={() => setPhotoHover()}
                      onMouseEnter={() => hoverImage(2)}
                      onClick={() => setSelectPhoto(product.photo2)}
                    >
                      <img src={product.photo2} alt="" />
                    </div>
                  </Col>
                )}

                {product.photo3?.length > 0 && (
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    <div
                      className="box-img"
                      onMouseLeave={() => setPhotoHover()}
                      onMouseEnter={() => hoverImage(3)}
                      onClick={() => setSelectPhoto(product.photo3)}
                    >
                      <img src={product.photo3} alt="" />
                    </div>
                  </Col>
                )}

                {product.photo4?.length > 0 && (
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    {" "}
                    <div
                      className="box-img"
                      onMouseLeave={() => setPhotoHover()}
                      onMouseEnter={() => hoverImage(4)}
                      onClick={() => setSelectPhoto(product.photo4)}
                    >
                      <img src={product.photo4} alt="" />
                    </div>
                  </Col>
                )}

                {product.photo5?.length > 0 && (
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    <div
                      className="box-img"
                      onMouseLeave={() => setPhotoHover()}
                      onMouseEnter={() => hoverImage(5)}
                      onClick={() => setSelectPhoto(product.photo5)}
                    >
                      <img src={product.photo5} alt="" />
                    </div>
                  </Col>
                )}
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
                  {price == undefined
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
                    {price == undefined
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
                {product.sale !== 0 && <span>{product.sale} % giảm</span>}
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
                          return (
                            <li
                              key={index}
                              onClick={() =>
                                classify == undefined
                                  ? openNotificationWithIcon(
                                      "warning",
                                      "Phải chọn thể loại trước"
                                    )
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
                      value={quantity == undefined ? 1 : quantity}
                      onChange={(e) => setQuantity(e.target.value)}
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
                  onClick={() => onSubmitAddOrder("addCart")}
                >
                  <i className="fas fa-cart-plus"></i> thêm vào giỏ hàng
                </div>
                <div
                  onClick={() => onSubmitAddOrder("buyNow")}
                  className="buy_now"
                >
                  mua ngay
                </div>
              </div>
            </div>
          </div>
          {/* mobile */}
        </div>
        {/* <!-- show img detail --> */}

        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="d_img">
            <Row>
              <Col xs={12} sm={8} md={6} lg={14} xl={14}>
                <div className="img-box">
                  <img
                    src={selectPhoto == undefined ? product.photo : selectPhoto}
                    alt=""
                  />
                </div>
              </Col>
              <Col xs={12} sm={8} md={6} lg={1} xl={1}></Col>
              <Col xs={12} sm={8} md={6} lg={9} xl={9}>
                <span className="show-name-pro">{product.name}</span>
                <Row style={{ marginTop: 20 }}>
                  <Col
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={6}
                    style={{ marginBottom: 10 }}
                  >
                    <div
                      className="box-show-image"
                      onClick={() => setSelectPhoto(product.photo)}
                    >
                      <img src={product.photo} alt="" />
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    <div
                      className="box-show-image"
                      onClick={() => setSelectPhoto(product.photo1)}
                    >
                      <img src={product.photo1} alt="" />
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    <div
                      className="box-show-image"
                      onClick={() => setSelectPhoto(product.photo2)}
                    >
                      <img src={product.photo2} alt="" />
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    <div
                      className="box-show-image"
                      onClick={() => setSelectPhoto(product.photo3)}
                    >
                      <img src={product.photo3} alt="" />
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    <div
                      className="box-show-image"
                      onClick={() => setSelectPhoto(product.photo4)}
                    >
                      <img src={product.photo4} alt="" />
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={6}
                    style={{ marginBottom: 10 }}
                  >
                    <div
                      className="box-show-image"
                      onClick={() => setSelectPhoto(product.photo5)}
                    >
                      <img src={product.photo5} alt="" />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
      <PageProductShop />
      <DescriptionProduct product={product}/>
      <Footer />
    </div>
  );
};

export default DetailPage;
