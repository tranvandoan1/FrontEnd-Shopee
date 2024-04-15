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
import styles from '../Css/CssModule/Detail.module.css'
const DetailPage = () => {
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
  const { id,name } = useParams();
  const [selectPhoto, setSelectPhoto] = useState();
  const [photoHover, setPhotoHover] = useState();
  const [price, setPrice] = useState();
  const [classify, setClassify] = useState();
  const [commodityValueSelect, setCommodityValueSelect] = useState();
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((data) => data.dataAll.value);

  const product = useSelector((data) => data.products.value);
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getProduct(id));
    dispatch(getAllData());
    setQuantity(1);
    setCommodityValueSelect();
    setClassify();
  }, [id]);

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
  const commValue = [];
  const classifies = []

  data?.classify?.filter((item) => {
    if (item.linked == product.linked) {
      if (item?.values == undefined && item?.values == null) {
        classifies.push(item);
      } else {
        item?.values?.map((itemValue) => {
          commValue.push({ ...itemValue });
        });
        classifies.push(item);
      }
    }
  });
  // lấy giá trị phân loại
  const newDataCommValue = duplicateMame(commValue?.length <= 0 ? classifies : commValue)?.sort(
    (a, b) => a.indexNumber - b.indexNumber
  );
  // lấy ra tiền của sản phẩm
  const priceArr = [];
  duplicateMame(newDataCommValue)?.map((item) => priceArr.push(item.price));
  const maxPrice = Math.max.apply(Math, priceArr);
  const minPrice = Math.min.apply(Math, priceArr);

  //chọn type
  const onClickClassify = async (item) => {
    if (item._id == classify?._id) {
      setClassify()
      setPrice()
    } else {
      if (commValue?.length <= 0) {
        setPrice(item?.price);
        setClassify(item);

      } else {
        const newDataCommValue = duplicateMame(item?.values)?.sort(
          (a, b) => a.indexNumber - b.indexNumber
        );
        setClassify({ ...item, values: newDataCommValue });
      }
    }


  };
  //chọn giá trị phân loại để thêm sản phẩm
  const onClickCommodityvalue = async (item) => {
    setCommodityValueSelect(item);
    setPrice(item?.price);
  };

  const setEmpty = () => {
    setQuantity(1);
    setCommodityValueSelect();
    setClassify();
    setPrice()
  };
  const onSubmitAddOrder = async (check) => {
    if ((classify == undefined && commValue?.length > 0)) {
      openNotificationWithIcon("warning", "Bạn đã chọn gì đâu");
    } else {
      // tìm xem order vừa thêm đã tồn tại chưa
      const order = data.saveorders?.find(
        (item) =>
          item.user_id == user._id &&
          item.classification_id == classify?._id &&
          (item.commodity_value_id == commodityValueSelect?._id || item.commodity_value_id == null)
      );
      if (order) {
        await dispatch(uploadSaveOrder({ _id: order._id, amount: Number(+order.amount + +quantity) }));
        setEmpty();
        check == "buyNow" && navigate("/cart");
        openNotificationWithIcon("success", "Thêm thành công");
      } else {
        if (commodityValueSelect !== undefined || commValue?.length == 0) {
          try {
            const order = {
              price: price,
              classification: classify?.name,
              commodity_value: commValue?.length == 0 ? null : commodityValueSelect.name,
              amount: Number(quantity),
              linked: product.linked,
              user_id: user._id,
              name_pro: product.name,
              photo: classify.photo,
              sale: product.sale,
              shop_id: product.shop_id,
              pro_id: product._id,
              classification_id: classify?._id,
              commodity_value_id:commValue?.length == 0 ? null : commodityValueSelect._id,
            };
            await dispatch(addSaveOrder(order));
            setEmpty();
            check == "buyNow" && navigate("/cart");
            openNotificationWithIcon("success", "Thêm thành công");
          } catch (error) {
            return error.status(400).json(error);
          }
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
                {product.photo?.length > 0 && (
                  <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                    {" "}
                    <div
                      className="box-img"
                      onMouseLeave={() => setPhotoHover()}
                      onMouseEnter={() => (
                        setPhotoHover(product.photo), setEmpty()
                      )}
                      onClick={() => setSelectPhoto(product.photo)}
                    >
                      <img src={product.photo} alt="" />
                    </div>
                  </Col>
                )}

                {classifies?.map((item, index) => {
                  return (
                    <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                      {" "}
                      <div
                        className="box-img"
                        onMouseLeave={() => setPhotoHover()}
                        onMouseEnter={() => (
                          setPhotoHover(item?.photo), setEmpty()
                        )}
                        onClick={() => setSelectPhoto(item?.photo)}
                      >
                        <img src={item?.photo} alt="" />
                      </div>
                    </Col>
                  );
                })}
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
                {
                  commValue?.length > 0 && <div className="d-size">
                    <h4>{product.name_commodityvalue}</h4>
                    <div className="size">
                      <ul id="list">
                        {(classify == undefined
                          ? newDataCommValue
                          : classify?.values
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
                                  : onClickCommodityvalue(item)
                              }
                              className={
                                commodityValueSelect == undefined
                                  ? ""
                                  : item._id == commodityValueSelect._id
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
                  </div>
                }
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
                      {commodityValueSelect?.quantity}
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

        <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                      <img src={product.photo} alt="" />
                    </div>
                  </Col>

                </Row>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
      <PageProductShop />
      <DescriptionProduct product={product} />
      <Footer />
    </div>
  );
};

export default DetailPage;
