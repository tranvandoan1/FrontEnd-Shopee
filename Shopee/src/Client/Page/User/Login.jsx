import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../../API/Users";
import "../Css/Css/Login.css";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import Loading from "../../../components/Loading";
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth, providerFacebook, providerGoogle } from '../../../firebase/index'
import { tokenLoca } from "../../../actions/token";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true)
      console.log(values, 'values')
      const { data } = await UserAPI.signin(values);
      setLoading(false)
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      setLoading(false)
      message.error(error.response.data.error)
    }
  };

  const loginGoogle = () => {
    setLoading(true)
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userLoca = {
          name: user.displayName,
          email: user.email,
          _id: user.uid,
          providerId: user.providerId,
          avatar: user.photoURL,
          phoneNumber: user.phoneNumber
        }
        setLoading(false)
        localStorage.setItem("user", JSON.stringify(userLoca));
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      }).catch((error) => {
        console.log('first')
      });

  };


  const loginFacebook = async () => {
    try {
      console.log('vào1')
      signInWithPopup(auth, providerFacebook)
        .then((result) => {
          console.log('vào2')
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          const userLoca = {
            name: user.displayName,
            email: user.email,
            _id: user.uid,
            providerId: user.providerId,
            avatar: user.photoURL,
            phoneNumber: user.phoneNumber
          }
          setLoading(false)
          localStorage.setItem("token", JSON.stringify(token));

          localStorage.setItem("user", JSON.stringify(userLoca));
          navigate("/");
        }).catch((error) => {
          message.error('Lỗi. Xin hãy thử lại !')
        });
    } catch (error) {
      message.error('Lỗi. Xin hãy thử lại !')
    }

  }

  return (
    <div className="shopee__shop">
      {
        loading == true &&
        <Loading />

      }
      <div className="form-login">
        <div className="login">
          <div className="form-signin">
            <div style={{ width: '100%' }}>
              <h3>Đăng nhập</h3>
              <Form
                name="basic"
                labelCol={{
                  span: 0,
                }}
                wrapperCol={{
                  span: 0,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={null}
                autoComplete="off"
              >
                <Form.Item
                  label=""
                  name="value"
                  rules={[
                    {
                      required: true,
                      message: 'Chưa nhập email hoặc số điện thoại!',
                    },
                  ]}
                >
                  <Input placeholder="Email hoặc số điện thoại" className="input-email" />
                </Form.Item>

                <Form.Item
                  label=""
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Chưa nhập mật khẩu !',
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" className="input-password" />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 0,
                    span: 0,
                  }}
                >
                  <Button type="primary" htmlType="submit" className="button-login">
                    {loading == true ? <Spin /> : "Đăng nhập"}

                  </Button>
                </Form.Item>
              </Form>
              <div className="hr">Hoặc</div>
              <div className="creact-account">
                <Button htmlType="submit" className="button-signup" onClick={() => navigate('/signup')}>
                  Tạo tài khoản mới
                </Button>

                <Button htmlType="submit" className="button-signup-google" onClick={() => loginGoogle()}>
                  <FcGoogle style={{ fontSize: 25, marginRight: 10 }} />  Đăng nhập bằng Google
                </Button>

                <Button htmlType="submit" className="button-signup-facebook" onClick={() => loginFacebook()}>
                  <BsFacebook style={{ fontSize: 25, marginRight: 10, color: 'blue' }} />    Đăng nhập bằng Facebook
                </Button>
                <a href="">Quên mật khẩu?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
