import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Upload, message } from "antd";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { startTransition } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  uploadEmailUser,
  uploadUser,
} from "../../../reducers/UserSlice";
import ModalUploadInfoUser from "../../../components/ModalUploadInfoUser";
import ModalPushEmail from "../../../components/ModalPushEmail";
import UploadPassword from "./UploadPassword";
import { uploadInfoUser } from "../../../API/Users";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.users.value);
  const userLoca = JSON.parse(localStorage.getItem("user"));
  const [imageUrlAvatar, setImageUrlAvatar] = useState({
    url: undefined,
    file: undefined,
  });
  const [content, setContent] = useState({
    status: false,
    otp: 1,
    content: undefined,
    title: undefined,
    phone: undefined,
  });
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const userValue = userLoca?.providerId == undefined ? user : userLoca;
  const [checkEmail, setCheckEmail] = useState({
    status: false,
    otp: 1,
    content: undefined,
    title: undefined,
    email: undefined,
  });
  useEffect(() => {
    userLoca?.providerId == undefined && dispatch(getUser(userLoca?._id));
  }, []);

  useEffect(() => {
    setImageUrlAvatar({ url: userValue?.avatar, file: undefined });
  }, [user]);

  const UploadAvatatr = (file) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file });
    setLoading(false);
  };
  const save = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("files", imageUrlAvatar.file);
    formData.append("_id", userValue._id);
    formData.append("image_id", userValue.image_id);
    formData.append("name", name);
    await dispatch(uploadUser(formData));
    setLoading(false);

    setImageUrlAvatar({ url: userValue?.avatar, file: undefined });
  };
  // ẩn số điện thoại
  const numberOfDigitsToHidePhone = 8;
  const hiddenPhoneNumberPhone =
    "*".repeat(numberOfDigitsToHidePhone) +
    userValue?.phone?.slice(numberOfDigitsToHidePhone);
  // ẩn email
  const emailEnd = userValue?.email?.split("@")[1];
  const emailStart = userValue?.email?.split("@")[0];
  let hidden = "*".repeat(emailStart?.length - 6);
  let result = emailStart?.slice(0, 2) + hidden + emailStart?.slice(-2);

  const hiddenPhoneNumberEmail = `${result}@${emailEnd}`;

  const RenderInfoUser = () => {
    return (
      <div className="user-form">
        <div className="user-form_info">
          <div className="user-form_info-name">
            <span>Tên đăng nhập</span>
            <div className="user-form_info-name-list">{userValue?.name}</div>
          </div>
          <div className="user-form_info-email">
            <span>Email</span>
            <div className="user-form_info-email-list">
              {hiddenPhoneNumberEmail}{" "}
              {userLoca?.providerId == undefined && (
                <button
                  onClick={() =>
                    setCheckEmail({
                      status: true,
                      otp: 1,
                      content: "Nhập email muốn thay đổi",
                      title: "Thay đổi email",
                      email: hiddenPhoneNumberEmail,
                    })
                  }
                >
                  Thay đổi
                </button>
              )}
            </div>
          </div>
          <div className="user-form_number-phone">
            <span>Số điện thoại</span>
            <div className="user-form_number-phone-list">
              {hiddenPhoneNumberPhone}{" "}
              {userLoca?.providerId == undefined && (
                <button
                  onClick={() =>
                    setContent({
                      status: true,
                      otp: 1,
                      content: "Nhập điện thoại muốn thay đổi",
                      title: "Thay đổi số điện thoại",
                      phone: hiddenPhoneNumberPhone,
                    })
                  }
                >
                  Thay đổi
                </button>
              )}
            </div>
          </div>
          <div className="user-form_name-shop">
            <span>Tên shope</span>
            <div className="user-form_name-shop-list">
              <Input
                // disabled={userLoca?.providerId == undefined ? false : true}
                // defaultValue={name == undefined ? userValue?.name : name}
                // placeholder="Nhập tên shope..."
                onChange={(e) =>
                  // startTransition(() => {
                  //   setName(e.target.value);
                  // })
                  console.log(e.target.value,'e.target.value')
                }
              />
            </div>
          </div>
          {userLoca?.providerId == undefined && (
            <div className="button-save">
              {loading == true ? (
                <Spin style={{ marginBottom: 20 }} />
              ) : (
                (imageUrlAvatar.file !== undefined ||
                  String(name)?.length > 0) && (
                  <Button type="primary" danger onClick={() => save()}>
                    Lưu
                  </Button>
                )
              )}
            </div>
          )}
        </div>
        <div className="user-image">
          <div className={"uploadImage"} style={{ marginLeft: 12 }}>
            <Upload
              listType="picture-card"
              showUploadList={false}
              disabled={userLoca?.providerId == undefined ? false : true}
              beforeUpload={UploadAvatatr}
            >
              {imageUrlAvatar?.url !== undefined ? (
                <div className="box-image">
                  <img src={imageUrlAvatar?.url} className="image" />
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {loading == true ? (
                      <Spin />
                    ) : (
                      <PlusCircleOutlined
                        style={{
                          fontSize: 30,
                          opacity: 0.8,
                          color: "#ee4d2d",
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </Upload>
            {imageUrlAvatar?.file !== undefined && (
              <div
                className={"close"}
                onClick={() =>
                  setImageUrlAvatar({ url: userValue?.avatar, file: undefined })
                }
              >
                <CloseCircleOutlined style={{ fontSize: 17 }} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="purchase-list">
      {props.check == 1 ? (
        <li className="active-purchase-list">
          <div className="purchase-list_header">
            <h3>Hồ Sơ Của Tôi</h3>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </div>
          <Suspense fallback={"Loading..."}>
            <RenderInfoUser />
          </Suspense>
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
              <UploadPassword />
            </div>
          </div>
        </li>
      )}
      {content?.status == true && (
        <ModalUploadInfoUser
          title={content?.title}
          content={content?.content}
          otpPhone={content?.otp}
          status={content?.status}
          phone={content?.phone}
          callBack={(e) => {
            console.log(e, "32ewdsdewd");
            if (e == "close") {
              setContent({
                status: false,
                otp: undefined,
                content: undefined,
                title: undefined,
                phone: undefined,
              });
            } else {
              setContent({
                status: true,
                otp: e,
                content:
                  e == "1"
                    ? "Nhập Điện Thoại Muốn Thay Đổi"
                    : e == "2"
                      ? `Nhập số điện thoại ${hiddenPhoneNumberPhone}`
                      : e == "3"
                        ? ""
                        : ``,
                title:
                  e == "1"
                    ? "Thay Đổi Số Điện Thoại"
                    : e == "2"
                      ? "Xác nhận số điện thoại"
                      : e == "3"
                        ? "Xác nhận OTP"
                        : "",
                phone: hiddenPhoneNumberPhone,
              });
            }
          }}
        />
      )}
      {checkEmail?.status == true && (
        <ModalPushEmail
          title={checkEmail?.title}
          checkEmail={checkEmail?.content}
          otpEmail={checkEmail?.otp}
          status={checkEmail?.status}
          email={checkEmail?.email}
          user={user}
          callBack={(e) => {
            if (e == "close") {
              setCheckEmail({
                status: false,
                otp: 1,
                content: undefined,
                title: undefined,
                email: undefined,
              });
            } else {
              setCheckEmail({
                status: true,
                otp: e,
                content:
                  e == "1"
                    ? "Nhập Điện Thoại Muốn Thay Đổi"
                    : e == "2"
                      ? `Nhập Email ${hiddenPhoneNumberEmail}`
                      : e == "3"
                        ? "Mã OTP đã gửi vào email của bạn"
                        : ``,
                title:
                  e == "1"
                    ? "Thay Đổi Email"
                    : e == "2"
                      ? "Xác nhận Email"
                      : e == "3"
                        ? "Xác nhận mã"
                        : "Cập nhật thành công",
                email: hiddenPhoneNumberEmail,
              });
            }
          }}
        />
      )}
    </div>
  );
};

export default MyAccount;
