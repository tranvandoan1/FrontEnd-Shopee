import React, { useEffect, useState } from "react";
import "../../Page/Css/Css/SellerChannel.css";
import { HeaderNavbar } from "../../Page/Header/HeaderNavbar";
import { Footer } from "../../Page/Header/Footer";
import { Button, Carousel, Col, Dropdown, Row, Space, Menu } from "antd";
import styles from "../../Page/Css/CssModule/SellerChannel.module.css";
import { Link } from "react-router-dom";
import stylesPro from "../../Page/Css/CssModule/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";
import ShopOwnerAPI from "../../../API/ShopOwner";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
const SellerChannel = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
  const data = useSelector((data) => data.dataAll.value);

  // lấy thông tin shop của người đang đăng nhập
  let shopowner = [];
  Object.keys(data).length > 0 &&
    shopowner.push(data.shopowner.find((item) => item.user_id == user._id));
  console.log(shopowner);
  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const menu = (
    <div className={styles.menu_child}>
      <ul>
        <li>đá</li>
      </ul>
    </div>
  );

  return (
    <div>
      <HeaderNavbar />
      <div className="main">
        <div className="shop-page">
          {shopowner.length > 0 && (
            <div className="shop-page_info">
              <div className="section-salesman">
                <img
                  src="https://1.bp.blogspot.com/-fJOYWF8sRcc/XqPMUl5F0uI/AAAAAAAAipA/FOrgLq4mcqQ23Lp_hA4_QPcjGym-ez4agCLcBGAsYHQ/s1600/Hinh-anh-dep-nhat-the-gioi%2B%25281%2529.jpg"
                  alt=""
                />
                <div className="section-salesman_background">
                  <div className="section-salesman_name">
                    <div className="section-salesman_portrait">
                      <div className="section-salesman_avatar">
                        <img src={shopowner[0].photo} alt="" />
                      </div>

                      <div className="section-salesman_info">
                        <h3>{shopowner[0].name}</h3>
                        <p>online 1 giờ trước</p>
                      </div>
                    </div>

                    <div className="section-salesman_buttons">
                      <Button className={styles.flow}>
                        <i
                          className="fas fa-plus"
                          style={{ marginRight: 10 }}
                        ></i>{" "}
                        theo dõi
                      </Button>
                      <Button className={styles.chat}>
                        <i
                          className="far fa-comments"
                          style={{ marginRight: 10 }}
                        ></i>{" "}
                        chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-salesman_info-list">
                <div className="section-salesman_info-list_r1">
                  <div className="section-salesman_name-shop">
                    <i className="far fa-user"></i> tên shop :
                    <span> {shopowner[0].name}</span>
                  </div>
                  <div className="section-salesman_category">
                    <i className="fas fa-boxes"></i> danh mục: <span>1</span>
                  </div>
                  <div className="section-salesman_products-list">
                    <i className="fas fa-box"></i> sản phẩm: <span>1</span>
                  </div>
                </div>
                <div className="section-salesman_info-list_r2">
                  <div className="section-salesman_user-follow">
                    <i className="fas fa-user-tie"></i> người theo dõi:{" "}
                    <span>1</span>
                  </div>
                  <div className="section-salesman_valuable">
                    <i className="fas fa-user-check"></i> đánh giá:
                    <span>32</span>
                  </div>
                  <div className="admin-shop">
                    <i className="fas fa-user-cog"></i>
                    <Link to="/seller-channel/admin/statistical">
                      Quản Lý Shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="shope-page-menu">
          <div className="navbar">
            <ul>
              <li>
                <a href=""> tổng quát</a>
              </li>
              {data.cateshopee?.map((item, index) => {
                if (item.shopowner_id == shopowner[0]?._id) {
                  if (index < 3) {
                    return (
                      <li>
                        <a href="">{item.name}</a>
                      </li>
                    );
                  }
                }
              })}
              {data.cateshopee?.length > 4 && (
                <Dropdown overlay={menu} className="icon-menu">
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ background: "#f0f2f5" }}>
        <div className="container">
          <Carousel autoplay style={{ height: 450, overflow: "hidden" }}>
            <a href="">
              <img
                src="https://intphcm.com/data/upload/mau-banner-hinh-anh.jpg"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </a>
            <a href="">
              <img
                src="https://i.pinimg.com/originals/1a/51/2d/1a512d6c556f62abd08c9ed2b829d1d2.png"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </a>
            <a href="">
              <img
                src="https://i.pinimg.com/736x/ac/31/d1/ac31d1acbbda8897ce0edf63c81b4acf.jpg"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </a>
            <a href="">
              <img
                src="https://tuvancongnghe.net/wp-content/uploads/2020/03/kh%C3%B3a-h%E1%BB%8Dc-qu%E1%BA%A3ng-c%C3%A1o.png"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </a>
          </Carousel>
        </div>
        <div className="shop-info">
          <h4>thông tin của shop</h4>
          <span>
            💮💮💮 Ngọc Hân Clothes 💮💮💮 Shop chuyên quần áo trẻ em, người lớn
            hàng hot trend, xuất dư, ... Mỹ phẩm chính hàng (chuyên pass hàng
            auth, săn sale, ...) Cam kết hàng chính hãng, chất lượng, giá cả
            phải chăng
            ---------------------------------------------------------------------
            ☎ Hotline: 0988.005.028 🏪 Link shop: facebook.com/hanbabyshop96 🛒
            Shopee : shopee.vn/ngoc.han.96 💌 Inbox shop : m.me/hanbabyshop96 🌎
            Địa chỉ: số 13/117 Trung Sơn Trầm, Sơn Tây, Hà Nội🔔🎀🔔
          </span>
        </div>
        <div className="shop-products-view">
          <h4>
            <i className="fas fa-box"></i> sản phẩm của shop
          </h4>
          <div className="products-title_show">
            <Row>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={4}
                style={{ padding: "0 5px", marginTop: 10 }}
              >
                <div className={stylesPro.box}>
                  <div className={stylesPro.avatar}>
                    <img
                      src="https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg"
                      alt=""
                    />
                  </div>
                  <div className={stylesPro.sale}>
                    <span>40%</span>
                  </div>
                  <div className="list_info_pro">
                    <span className={stylesPro.name}>
                      áo phông trơn tay dài phom rộng dáng unisex trend 2021
                    </span>
                  </div>
                  <div className={stylesPro.list_price_pro}>
                    <span className={stylesPro.price}>₫45.000</span>
                    <span className={stylesPro.upl8wJ_82UoSS}>Đã bán 7,6k</span>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="btn-seemore">
              <button>xem thêm</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerChannel;
