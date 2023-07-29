import React, { useEffect, useState } from "react";
import "../Css/Css/Checkout.css";
import { HeaderSticky } from "./../Header/HeaderSticky";
import TotalPrice from "./TotalPrice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CheckOutSlice from "../../../reducers/CheckOutSlice";
import { Button, Checkbox, Form, Input } from "antd";
import {
  CloseCircleOutlined,
  DownOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { $ } from "../../../Unti";
import { addInfoUser } from "./../../../reducers/InfoUserSlice";

const ShowAddAddress = (props) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage

  const [dataUrlCity, setDataUrlCity] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [wardd, setWardd] = useState();
  const [showTags, setShowTags] = useState(1);
  const [valueAddress, setValueAddress] = useState();
  const [showAddAddress, setShowAddAddress] = useState(false);

  const shopeePopupFormHeader = document.querySelector(
    ".shopee-popup-form__header"
  );

  const setAll = () => {
    setDataUrlCity();
    setCity();
    setDistrict();
    setWardd();
    setValueAddress();
    setShowAddAddress(false);
  };
  window.addEventListener("click", function (e) {
    if (e.target == shopeePopupFormHeader) {
      props.setFalse();
      setAll();
    }
  });

  useEffect(() => {
    const UrlProvinces = "https://provinces.open-api.vn/api/?depth=3";
    fetch(UrlProvinces)
      .then((response) => response.json())
      .then((data) => setDataUrlCity(data));
  }, []);

  const onFinish = async (values) => {
    const newData_InfoUser = {
      name: values.name,
      phone: values.phone,
      user_id: user._id,
      city: city?.name ? city.name : "",
      district: district?.name ? district.name : "",
      ward: wardd?.name ? wardd.name : "",
      specific_address: values.specific_address,
      address: valueAddress ? valueAddress : "",
    };
    await dispatch(addInfoUser(newData_InfoUser));
    props.setFalse();
    setAll();
  };
  return (
    <div
      className={
        props.check == false
          ? "shopee-popup-form__header"
          : "shopee-popup-form__header active-shopee-popup-form__header "
      }
    >
      <div className="form__header">
        <div className="shopee-popup-form__title">Địa chỉ mới</div>
        <div className="shopee-popup-form__main">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                style={{ width: "100%" }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Chưa nhập tên !",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Họ và Tên"
                />
              </Form.Item>
              <span style={{ flex: 1 }}></span>
              <Form.Item
                name="phone"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại !",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Số điện thoại"
                />
              </Form.Item>
            </div>

            <div className="shop_address">
              <Input
                placeholder="Tỉnh/Thành phố ,Quận/Huyện,Phường/Xã"
                onChange={(e) => setValueAddress(e.target.value)}
                style={{ margin: "10px 0 20px 0" }}
                suffix={
                  <span>
                    {(city !== undefined || valueAddress !== undefined) && (
                      <CloseCircleOutlined
                        onClick={() => (
                          setCity(),
                          setDistrict(),
                          setWardd(),
                          setValueAddress()
                        )}
                        style={{ marginRight: 10, cursor: "pointer" }}
                      />
                    )}
                  </span>
                }
                addonAfter={
                  <DownOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowAddAddress(!showAddAddress)}
                  />
                }
                value={
                  city == undefined
                    ? valueAddress
                    : `${city?.name ? `${city?.name},` : ""}${district?.name ? `${district?.name},` : ""
                    } ${wardd?.name ? `${wardd?.name}` : ""}`
                }
              />

              {showAddAddress == true && (
                <div className="city-district-ward">
                  <div className="city-district-ward_header">
                    <ul>
                      <li
                        onClick={() => (
                          setShowTags(1), setCity(), setDistrict(), setWardd()
                        )}
                        className={
                          (city == undefined || showTags == 1) &&
                          "active-city-district-ward"
                        }
                      >
                        <div className="city-name">Tỉnh/Thành Phố</div>
                      </li>
                      <li
                        onClick={() =>
                          district == undefined && city !== undefined
                            ? (setShowTags(2), setDistrict(), setWardd())
                            : district !== undefined &&
                            city !== undefined &&
                            (setShowTags(2), setDistrict(), setWardd())
                        }
                        className={
                          city == undefined || showTags == 1
                            ? "no-active"
                            : (district == undefined || showTags == 2) &&
                            "active-city-district-ward"
                        }
                      >
                        <div className="district-name">Quận/Huyện</div>
                      </li>
                      <li
                        onClick={() => setShowTags(3)}
                        className={
                          district == undefined
                            ? "no-active"
                            : (wardd == undefined || showTags == 3) &&
                            "active-city-district-ward"
                        }
                      >
                        <div className="ward-name">Phường/Xã</div>
                      </li>
                    </ul>
                  </div>
                  <div className="city-district-ward_show">
                    <ul>
                      <li className={"active-city-district-ward_show"}>
                        <div className="city-show">
                          {(city == undefined || showTags == 1
                            ? dataUrlCity
                            : district == undefined || showTags == 2
                              ? city?.districts
                              : wardd == undefined || showTags == 3
                                ? district?.wards
                                : ""
                          )?.map((item, index) => {
                            return (
                              <li
                                key={index}
                                onClick={() =>
                                  city == undefined || showTags == 1
                                    ? (setCity(item), setShowTags(2))
                                    : district == undefined || showTags == 2
                                      ? (setDistrict(item), setShowTags(3))
                                      : (wardd == undefined || showTags == 3) &&
                                      (setWardd(item),
                                        setShowAddAddress(!showAddAddress))
                                }
                                style={{
                                  margin: index >= 1 ? "10px 0" : "0 10px 0 0",
                                  padding: "5px 0",
                                  cursor: "pointer",
                                }}
                              >
                                {item.name}
                              </li>
                            );
                          })}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Form.Item name="specific_address">
              <div className="shop_specific-address">
                <Input type="text" placeholder="Địa chỉ cụ thể" />
                <span>địa chỉ cụ thể</span>
              </div>
            </Form.Item>
  

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <div className="shopee-popup-form__footer">
                <Button onClick={() => props.setFalse()}>Trở Lại</Button>
                <Button type="primary" htmlType="submit">
                  Hoàn thành
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ShowAddAddress;
