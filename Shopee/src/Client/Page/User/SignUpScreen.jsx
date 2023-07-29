import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../../API/Users";
import "../Css/Css/Login.css";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Spin,
  Upload,
  message,
  notification,
} from "antd";
import {
  CloseCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
const SignUpScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrlAvatar, setImageUrlAvatar] = useState({ url: undefined, file: undefined });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const UploadAvatatr = (file) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file });
    setLoading(false);
  };
  const onFinish = async (values) => {
    if (loading == false) {
      setLoading(true);
      if (imageUrlAvatar?.file == undefined) {
        await UserAPI.signup({
          ...values,
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png",
        });
        setLoading(false);
        setImageUrlAvatar({ url: undefined, file: undefined })
        message.open({
          type: "success",
          content: "Đăng ký thành công",
          duration: 1,
        });
        form.resetFields();
        navigate("/login");
      } else {
        const imageRef = ref(storage, `images/${imageUrlAvatar?.file?.name}`);
        uploadBytes(imageRef, imageUrlAvatar.file).then(() => {
          getDownloadURL(imageRef).then(async (url, indec) => {
            await UserAPI.signup({ ...values, avatar: url });
            setLoading(false);
            message.open({
              type: "success",
              content: "Đăng ký thành công",
              duration: 1,
            });
            setImageUrlAvatar({ url: undefined, file: undefined })
            form.resetFields();
            navigate("/login");
          });
        });
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <React.Fragment>
      <div className="shopee__shop">
        <div className="form-login">
          <div className="login">
            <div className="form-signup">
              <h3>Đăng Ký</h3>
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="name"
                  label="Họ và Tên"
                  rules={[
                    {
                      required: true,
                      message: "Chưa nhập họ và tên!",
                    },
                  ]}
                >
                  <Input placeholder="Họ và Tên" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Chưa nhập Email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Chưa nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Nhập lại mật khẩu"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Chưa nhập lại password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu không trùng khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>
                <Form.Item label="avatar" className="form-item-upload-avatar">
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={UploadAvatatr}
                    className="upload-avatar"
                  >
                    {imageUrlAvatar.file ? (
                      <div className="box-image">
                        <img src={imageUrlAvatar.url} className="image" />
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
                  {imageUrlAvatar.file !== undefined && (
                    <div
                      onClick={() => setImageUrlAvatar(undefined)}
                      className="close"
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button style={{ marginRight: 10 }} onClick={() => navigate('/login')}>Đăng nhập</Button>
                  <Button type="primary" htmlType="submit">
                    {loading == true ? <Spin /> : "Đăng ký"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpScreen;
