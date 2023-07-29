import React, { useEffect, useState } from "react";
import "../Css/Css/Purchase.css";
import { HeaderNavbar } from "../Header/HeaderNavbar";
import { Footer } from "./../Header/Footer";
import MyAccount from "./MyAccount";
import PurchaseOrder from "./PurchaseOrder";
import ShopeeCoin from "./ShopeeCoin";
import { getUser } from "../../../reducers/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
const PurchaseIndex = () => {
  const dispatch = useDispatch();
  const userLoca = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((data) => data.users.value);

  useEffect(() => {
    dispatch(getUser(userLoca._id));
  }, []);
  const [check, setCheck] = useState(1);
  return (
    <div style={{ background: "#f7f7f7" }}>
      <HeaderNavbar />
      <div className="users-purchase">
        <div className="user">
          <div className="user-header">
            <Avatar src={user.avatar} size={50}/>
            <a href="">
              <span>{user.name}</span>
              <span>
                <i className="fas fa-pencil-alt"></i> sửa hồ sơ
              </span>
            </a>
          </div>
          <div className="user-list">
            <ul>
              <div className="user-account" onClick={() => setCheck(1)}>
                <i className="far fa-user"></i> tài khoản của tôi
              </div>
              <div
                className={
                  check == 1 || check == 4
                    ? "user-account_child active-user-account"
                    : "user-account_child"
                }
              >
                <li
                  onClick={() => setCheck(1)}
                  style={{ color: check == 1 ? "rgb(238, 77, 45)" : "" }}
                >
                  hồ sơ
                </li>
                <li
                  style={{ color: check == 4 ? "rgb(238, 77, 45)" : "" }}
                  onClick={() => setCheck(4)}
                >
                  đổi mật khẩu
                </li>
              </div>
              <li
                onClick={() => setCheck(2)}
                style={{ color: check == 2 ? "rgb(238, 77, 45)" : "" }}
              >
                <i className="fas fa-clipboard-list"></i> đơn mua
              </li>
              <li
                onClick={() => setCheck(3)}
                style={{ color: check == 3 ? "rgb(238, 77, 45)" : "" }}
              >
                <i className="fas fa-dollar-sign"></i> shope xu
              </li>
            </ul>
          </div>
        </div>
        <div className="purchase">
          <ul className="purchase__e">
            {check == 1 || check == 4 ? (
              <MyAccount check={check} />
            ) : check == 2 ? (
              <PurchaseOrder />
            ) : check == 3 ? (
              <ShopeeCoin />
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseIndex;
