import React, { useEffect, useState } from "react";
import "../Css/Css/Header.css";
import SaveOrderAPI from "../../../API/SaveOrder";
import { Link } from "react-router-dom";
import { $ } from "../../../Unti";
import { useDispatch, useSelector } from "react-redux";
import { getSaveOrder } from "../../../reducers/SaveOrder";
import { getProduct } from "./../../../reducers/Products";
export const HeaderNavbar = (props) => {
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
  const dispatch = useDispatch();
  const saveorder = useSelector((data) => data.saveorder.value);
  const saveorderOfUser = saveorder?.filter((item) => item.user_id == user?._id);
  useEffect(async () => {
    dispatch(getSaveOrder());
  }, []);

  useEffect(() => {
    var sticky = $("#navbar").offsetTop;
    window.onscroll = async function () {
      window.pageYOffset >= sticky
        ? $("#navbar").classList.add("sticky")
        : $("#navbar").classList.remove("sticky");
    };
  }, []);

  const logOut = () => {
    if (confirm("Bạn có muốn đăng xuất không ?")) {
      localStorage.removeItem("user");
      window.location.href = "";
    }
  };

  function checkLognIn(user) {
    if (user == null) {
      return (
        <React.Fragment>
          <Link to="">đăng ký</Link> <Link to="/login">đăng nhập</Link>
        </React.Fragment>
      );
    } else {
      return (
        <span>
          <Link to="/#/user-overview">{user.name}</Link>
          <ul>
            <li>
              <Link to="/admin/categoris">
                <i className="fas fa-user-cog"></i> Quản trị WebSite
              </Link>
            </li>
            <li id="signout">
              <a onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i> Đăng xuất
              </a>
            </li>
          </ul>
        </span>
      );
    }
  }
  function checkOder(user) {
    if (user == undefined) {
      return (
        <div className="shopping-cart">
          <Link to="">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="shopping-cart">
          <div className="shopee-cart-number-badge">
            {saveorderOfUser.length}
          </div>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          {saveorderOfUser.length == 0 ? (
            <div className="show-cart">
              <div className="cart__produtcs-news">Chưa có sản phẩm</div>
            </div>
          ) : (
            <div className="show-cart">
              <div className="cart__produtcs-news">sản phẩm mới thêm</div>
              <hr />
              <div className="list_show-cart">
                {saveorderOfUser.map((item, index) => {
                  return (
                    <Link to="" key={index}>
                      <div className="show-cart_img">
                        <img src={item.photo} alt="" />
                      </div>
                      <div className="show-cart_name">
                        <p>{item.name_pro}</p>
                      </div>
                      <div className="show-cart_money">
                        <p>
                          {Math.ceil(item.price * ((100 - item.sale) / 100))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          đ
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="header__main-navbar-wrapper">
          <div className="flex">
            <ul>
              <li>
                <a href="seller-channel/check_signup">kênh người bán</a>
              </li>
              <li>
                <Link to="">tải ứng dụng</Link>
                <img
                  src="http://4.bp.blogspot.com/-Nzb2jX4c0iU/VIcZCT15vPI/AAAAAAAAGeE/5ijVMwGf5ak/s1600/QRCodeGeneratorImage.png"
                  alt=""
                />
              </li>
              <li>
                <span>Kết nối</span>{" "}
                <Link to="">
                  <i
                    className="fab
                                        fa-facebook"
                  ></i>
                </Link>
                <Link to="">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar__spacer"></div>
          <div className="navbar__links">
            <ul>
              <li>
                <Link to="">
                  <i className="far fa-bell"></i> thông báo
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="far fa-question-circle"></i>
                  hỗ trợ
                </Link>
              </li>
              <li>
                <a>
                  <i className="fas fa-globe"></i> tiếng việt{" "}
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul>
                  <li>
                    <Link to="">việt nam</Link>
                  </li>
                  <li>
                    <Link to="">english</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="login-logout">{checkLognIn(user)}</div>
          </div>
        </div>
        <div className="header-sticky" id="navbar">
          <div className="header__main">
            <div className="header__main-logo-shopee">
              <Link to="/">
                <img
                  src="https://cf.shopee.vn/file/d734f6291f072bb855371432da462d65"
                  alt=""
                />
              </Link>
            </div>
            <div className="header__main-search">
              <input
                type="text"
                placeholder="Đón chờ ShopeePay Day -Giảm 50%"
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="header__main-shopping-cart">{checkOder(user)}</div>
          </div>
        </div>
      </div>
      <div className="header__mb">
        <div className="header__mb-logo-menu">
          <div className="mb__logo-shopee">
            <a href="/#/cart">
              <img
                src="https://cf.shopee.vn/file/d734f6291f072bb855371432da462d65"
                alt=""
              />
            </a>
          </div>
          <div className="header__mb-search">
            <input
              type="text"
              placeholder="Đón chờ ShopeePay Day -
                            Giảm 50%"
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="mb-menu">
            <div className="mb-cart">
              <i className="fas fa-shopping-cart">
                <span>43</span>{" "}
              </i>
            </div>
            <div className="mb-user" id="button__mb">
              <i className="fas fa-user"></i>
            </div>
            <div className="body-user" id="mb">
              <div className="show-user" id="display__mb">
                <div className="user">
                  {" "}
                  <i className="fas fa-user"></i> tài khoản của tôi
                </div>
                <div className="cart-my">
                  <i
                    className="fas
                                        fa-luggage-cart"
                  ></i>{" "}
                  đơn hàng của tôi
                </div>
                <div className="admin_user">
                  <i
                    className="fas
                                        fa-user-cog"
                  ></i>{" "}
                  quản trị
                </div>
                <div className="logout">
                  <i
                    className="fas
                                        fa-sign-out-alt"
                  ></i>{" "}
                  đăng xuất
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
