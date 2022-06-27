import { Button } from "antd";
import React from "react";
import "../Page/Css/Css/SellerChannelCheck.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../Notification";
const SellerChannelCheck = () => {
  const navigate = useNavigate();
  const click = () => {
    navigate("/seller-channel");
    openNotificationWithIcon("success", "Chào mừng bàn đến kênh bán hàng");
  };

  return (
    <div className="seller-channel">
      <div className="seller-channel-header">
        <div className="wapper">
          <div className="cart-page-header">
            <div className="cart-page-logo">
              <a href="Index.html">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
                  alt=""
                />
              </a>
              <span>Kênh bán hàng</span>
            </div>
            <div className="cart-page-search">
              <button>
                <i className="fas fa-sign-out-alt"></i> Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="account-container">
        <div className="col-8">
          <div className="left">
            <div className="title">Bán hàng chuyên nghiệp</div>
            <div className="subtitle">
              Quản lý shop của bạn một cách hiệu quả hơn trên Shopee với Shopee
              - Kênh Người bán
            </div>
            <div className="image"></div>
          </div>
        </div>
        <div className="col-4">
          <form action="">
            <h3>
              Bạn có muốn trở thành người bán hàng bằng tài khoản đang đăng nhập
              hay không ?
            </h3>
            <Button onClick={() => click()}>Đồng ý</Button>
            <Link to="">Đăng ký tài khoản bán hàng mới</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerChannelCheck;
