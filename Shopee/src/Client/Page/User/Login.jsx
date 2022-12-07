import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../../API/Users";
import "../Css/Css/Login.css";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const onSubmit = async (user, erorr) => {
    try {
      const { data } = await UserAPI.signin(user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Mời bạn vào trang web");
      return navigate("/");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <React.Fragment>
      <div className="shopee__shop">
        <div className="form-login">
          <div className="login">
            <div className="form">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h2>Shopee kính chào quý khách</h2>
                <h3>Đăng nhập</h3>
                <div className="name">
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="Email hoặc tên đăng nhập"
                  />{" "}
                  <br />
                  {/* {errors.email && <span className="text-danger">Bạn chưa nhập Email</span>} */}
                </div>
                <div className="password">
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Nhập mật khẩu"
                  />
                  <br />
                  {/* {errors.password && <span className="text-danger">Bạn chưa nhập mật khẩu</span>} */}
                </div>
                <input
                  type="submit"
                  value="Đăng nhập"
                  className="button-login"
                />
                <br />
                <div className="hr">Hoặc</div>
                <a href="/signup" className="button-signup">
                  Tạo tài khoản mới
                </a>{" "}
                <br />
                <a href="">Quên mật khẩu?</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
