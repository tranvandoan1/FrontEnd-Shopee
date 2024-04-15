import React, { Suspense, lazy, useEffect, useState } from "react";
import "../../Page/Css/Css/SellerChannel.css";
import { HeaderNavbar } from "../../Page/Header/HeaderNavbar";
import { Footer } from "../../Page/Header/Footer";
import {
  Button,
  Carousel,
  Col,
  Dropdown,
  Row,
  Space,
  Menu,
  Skeleton,
} from "antd";
import styles from "../../Page/Css/CssModule/SellerChannel.module.css";
import { Link, useParams } from "react-router-dom";
import stylesPro from "../../Page/Css/CssModule/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./../../../reducers/AllData";
import ShopOwnerAPI from "../../../API/ShopOwner";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
const SellerChannel = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((data) => data.dataAll.value);
  // lấy thông tin shop của người đang đăng nhập
  let shopowner = data.shopowners?.find((item) => item._id == atob(id));

  const products = data?.products?.filter((item) => item.shop_id == atob(id));
  const cateShop = data?.cateshops?.filter(
    (item) => item.shopowner_id == atob(id)
  );

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

  const infoShop = () => {
    return (
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
                  <img src={shopowner?.photo} alt="" />
                </div>

                <div className="section-salesman_info">
                  <h3>{shopowner?.name}</h3>
                  <p>online 1 giờ trước</p>
                </div>
              </div>

              <div className="section-salesman_buttons">
                <Button className={styles.flow}>
                  <i className="fas fa-plus" style={{ marginRight: 10 }}></i>{" "}
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
              <span> {shopowner?.name}</span>
            </div>
            <div className="section-salesman_category">
              <i className="fas fa-boxes"></i> danh mục:{" "}
              <span>{cateShop?.length}</span>
            </div>
            <div className="section-salesman_products-list">
              <i className="fas fa-box"></i> sản phẩm:{" "}
              <span>{products?.length}</span>
            </div>
          </div>
          <div className="section-salesman_info-list_r2">
            <div className="section-salesman_user-follow">
              <i className="fas fa-user-tie"></i> người theo dõi: <span>1</span>
            </div>
            <div className="section-salesman_valuable">
              <i className="fas fa-user-check"></i> đánh giá:
              <span>32</span>
            </div>
            <div className="admin-shop">
              <i className="fas fa-user-cog"></i>
              <Link to={`/seller-channel&&${btoa(shopowner?._id)}/admin/statistical`} onClick={() => {
                localStorage.removeItem("keyLoca");
                localStorage.setItem("keyLoca", 1);
              }}>Quản Lý Shop</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const sleep = (ms) => {
    return new Promise((res) => setTimeout(res, ms));
  };
  const RenderInfoShop = lazy(async () => {
    await sleep(2000);
    return { default: infoShop };
  });
  const Render = () => (
    <div
      style={{
        maxWidth: 1200,
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Skeleton />
    </div>
  );

  // format số
  function formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  }

  const ShowHtml = (product, classify) => {
    const proPrice = [];

    product?.map((itemPro) => {
      const classifyPrice1 = [];
      const classifyPrice2 = [];
      classify?.map((itemData) => {
        if (itemData?.linked == itemPro.linked) {
          if (itemData?.values == undefined && itemData?.values == null) {
            classifyPrice2.push(itemData.price);
          } else {
            itemData?.values?.map((itemPrice) =>
              classifyPrice1.push(itemPrice.price)
            );
          }
        }
      });
      proPrice.push({
        ...itemPro,
        values:
          itemPro?.name_commodityvalue == undefined
            ? classifyPrice2
            : classifyPrice1,
      });
    });

    for (let i = 0; i < proPrice.length; i++) {
      const minPrice = Math.min.apply(Math, proPrice[i].values);
      const maxPrice = Math.max.apply(Math, proPrice[i].values);
      proPrice[i].values = [minPrice, maxPrice];
    }
    return proPrice?.map((item, index) => {
      if (index < 4) {
        return (
          <Col
            xs={12}
            sm={8}
            md={6}
            lg={4}
            xl={4}
            style={{ padding: "0 5px", marginTop: 10 }}
          >
            <div
              className={stylesPro.box}
              onClick={() =>
                navigate(`/detail/${pro.name.replace(/\s+/g, "-")}&&${pro._id}`)
              }
            >
              <div className={stylesPro.avatar}>
                <img src={item?.photo} alt="" />
              </div>
              {(item?.sale > 0 || item?.sale !== undefined) && (
                <div className={stylesPro.sale}>
                  <span>{item?.sale}%</span>
                </div>
              )}

              <div className="list_info_pro">
                <span className={stylesPro.name}>{item?.name}</span>
              </div>
              <div className={stylesPro.list_price_pro}>
                <span className={stylesPro.price}>
                  đ
                  {item?.values[0]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
                <span className={stylesPro.upl8wJ_82UoSS}>
                  Đã bán {formatNumber(item.sold)}
                </span>
              </div>
            </div>
          </Col>
        );
      }
    });
  };

  return (
    <div>
      <HeaderNavbar />
      <div className="main">
        <div className="shop-page">
          <Suspense fallback={<Render />}>
            <RenderInfoShop />
          </Suspense>
        </div>
        <div className="shope-page-menu">
          <div className="navbar">
            <ul>
              <li>
                <a href=""> tổng quát</a>
              </li>
              {cateShop?.map((item, index) => {
                if (item.shopowner_id == shopowner?._id) {
                  // if (index < 3) {
                  return (
                    <li>
                      <a href="">{item.name}</a>
                    </li>
                  );
                  // }
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
            <Row>{ShowHtml(products, data.classifys)}</Row>
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
