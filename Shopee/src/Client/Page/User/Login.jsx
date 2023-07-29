import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../../API/Users";
import "../Css/Css/Login.css";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import Loading from "../../../components/Loading";
import { FcGoogle } from 'react-icons/fc'
import GoogleLogin from 'react-google-login';
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
      console.log(values,'values')
      const { data } = await UserAPI.signin(values);
      setLoading(false)
      localStorage.setItem("user", JSON.stringify(data.user));
      return navigate("/");
    } catch (error) {
      setLoading(false)
      message.error(error.response.data.error)
    }
  };

  const handleFailure = (result) => {
    message.error('error');
  };
  const handleLogin = (googleData) => {
    // dispatch(
    //   defaultTime({
    //     filter: { campus_id: cumpus },
    //     callback: (data) => {
    //       if (data.status === 'ok') {
    //         const dataForm = {
    //           token: googleData.tokenId,
    //           cumpusId: cumpus,
    //           smester_id: data?.result?._id,
    //         };
    //         dispatch(loginGoogle({ val: dataForm, callback: cbMessage }));
    //       }
    //     },
    //   }),
    // );
    console.log(googleData, 'googleData')
  };
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
                <GoogleLogin
                  clientId="116205081385-umqm7s5qlspf4s0tc4jke7tafpvgj2k7.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  disabled={false}
                />
                <br />
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
