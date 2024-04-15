import { Button } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import "../Page/Css/Css/SellerChannelCheck.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../Notification";
import { useDispatch, useSelector } from "react-redux";
import { getShopOwner } from "../../reducers/ShopOwner";
import Loading from "../../components/Loading";
import ModalComfim from './../../components/ModalComfim';
import ModalShopownerAdd from "../../components/ModalShopownerAdd";
const SellerChannelCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const shopowners = useSelector(data => data.shopowners.value)
  console.log(shopowners, 'shopowners')
  useEffect(() => {
    dispatch(getShopOwner('user'))
  }, [])

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [shopownerAdd, setShopownerAdd] = useState(false)
  const logOut = () => {
    setLoading(true)
    setStatus(false)
    setTimeout(() => {
      setLoading(false)
      localStorage.removeItem("user");
      window.location.href = "/";
      dispatch(UserAPI.signOut())
    }, 1000);
  };

  const click = () => {
    if (shopowners == undefined) {
      setShopownerAdd(true)
    } else {

    }
  };

  return (
    <div className="seller-channel">
      {
        loading == true &&
        <Loading />

      }
      <div className="seller-channel-header">
        <div className="wapper">
          <div className="cart-page-header">
            <div className="cart-page-logo">
              <Link to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
                  alt=""
                />
              </Link>
              <span>Kênh bán hàng</span>
            </div>
            <div className="cart-page-search">
              <button onClick={() => setStatus(true)}>
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
      <ModalComfim
        content={'Bạn có muốn đăng xuất không?'}
        title={'Thoát'}
        status={status}
        callBack={() => logOut()}
        btnAcc={'Đăng xuất'}
        btnClose={'Hủy'}
      />
      <ModalShopownerAdd
        content={'Thêm thông tin'}
        title={'Mở bán hàng'}
        status={shopownerAdd}
        callBack={() => null}
        btnAcc={'Hoàn tất'}
        btnClose={'Hủy'}
      />
    </div>
  );
};

export default SellerChannelCheck;
