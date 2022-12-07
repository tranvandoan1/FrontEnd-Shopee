import React from "react";

const MyAccount = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="purchase-list">
      {props.check == 1 ? (
        <li className="active-purchase-list">
          <div className="purchase-list_header">
            <h3>Hồ Sơ Của Tôi</h3>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </div>
          <div className="user-form">
            <div className="user-form_info">
              <div className="user-form_info-name">
                <span>Tên đăng nhập</span>
                <div className="user-form_info-name-list">{user.name}</div>
              </div>
              <div className="user-form_info-email">
                <span>Email</span>
                <div className="user-form_info-email-list">
                  {user.email} <button>Thay đổi</button>
                </div>
              </div>
              <div className="user-form_number-phone">
                <span>Số điện thoại</span>
                <div className="user-form_number-phone-list">
                  {user.phone} <button>Thay đổi</button>
                </div>
              </div>
              <div className="user-form_name-shop">
                <span>Tên shope</span>
                <div className="user-form_name-shop-list">
                  <input
                    type="text"
                    value={user.name}
                    placeholder="Nhập tên shope..."
                  />
                </div>
              </div>
              <div className="user-form_gender">
                <span>Giới tính</span>
                <div className="user-form_gender-list">
                  <input type="checkbox" name="nam" id="" />
                  Nam
                  <input type="checkbox" name="nữ" id="" />
                  Nữ
                </div>
              </div>
              <div className="button-save">
                <button>Lưu</button>
              </div>
            </div>
            <div className="user-image">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="user-avatar">
                  {/* <i className="far fa-user"></i> */}
                  <img src={user.avatar} alt="" />
                </div>
              </div>

              <label htmlFor="images" className="user_choose-photo">
                <div className="choose-photo">Chọn ảnh</div>
              </label>
              <input type="file" name="" id="images" />
            </div>
          </div>
        </li>
      ) : (
        <li className="active-purchase-list">
          <div className="change-password">
            <div className="change-password_header">
              <h3>Đổi mật khẩu</h3>
              <span>
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác
              </span>
            </div>
            <div className="chagne-password_form">
              <div className="current-password">
                <span>Mật khẩu hiện tại</span>
                <div className="current-password_input">
                  <input type="password" />
                </div>
                <span>Quên mật khẩu ?</span>
              </div>
              <div className="new-password">
                <span>Mật khẩu mới</span>
                <div className="new-password_input">
                  <input type="password" />
                </div>
              </div>
              <div className="confirm-password">
                <span>Xác nhận mật khẩu</span>
                <div className="confirm-password_input">
                  <input type="password" />
                </div>
              </div>
              <div className="confirm-button">
                <button>Xác nhận</button>
              </div>
            </div>
          </div>
        </li>
      )}
    </div>
  );
};

export default MyAccount;
