import React, { useEffect, useState } from "react";
import "../Css/Css/Header.css";
import SaveOrderAPI from "../../../API/SaveOrder";
import { Link } from "react-router-dom";
import { $ } from "../../../Unti";
import { useDispatch, useSelector } from "react-redux";
import { getSaveOrder } from "../../../reducers/SaveOrderSlice";
export const HeaderSticky = (props) => {
  const dispatch = useDispatch();
  const saveorders = useSelector((data) => data.saveorders.value);
  const user = useSelector((data) => data.users.value);

  useEffect(async () => {
    dispatch(getSaveOrder());
    dispatch(getUser());
  }, []);


  useEffect(() => {
    // var sticky = $("#navbar").offsetTop;
    // window.onscroll = async function () {
    //   window.pageYOffset >= sticky
    //     ? $("#navbar").classList.add("sticky")
    //     : $("#navbar").classList.remove("sticky");
    // };
  }, []);

  const logOut = () => {
    if (confirm("Bạn có muốn đăng xuất không ?")) {
      localStorage.removeItem("user");
      window.location.href = "";
    }
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="header__main-navbar-wrapper">
          <div className="flex">
            <ul>
              <li>
                <Link to="/seller-channel/check_signup">kênh người bán</Link>
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
            <div className="login-logout">
              {user == undefined ? (
                <React.Fragment>
                  <Link to="">đăng ký</Link> <Link to="/login">đăng nhập</Link>
                </React.Fragment>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
