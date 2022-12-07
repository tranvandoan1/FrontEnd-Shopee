import React, { useEffect, useState } from "react";
import "../Css/Css/Checkout.css";
import { HeaderSticky } from "./../Header/HeaderSticky";
import TotalPrice from "./TotalPrice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Checkbox, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ShowAddAddress from "./ShowAddAdress";
import {
  getInfoUser,
  removeInfoUser,
  uploadInfoUser,
} from "../../../reducers/InfoUserSlice";
import { openNotificationWithIcon } from "../../../Notification";

const ListAddress = () => {
    const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
    const dispatch = useDispatch();
  
    const infousers = useSelector((data) => data.infoUser.value);
    useEffect(() => {
      dispatch(getInfoUser());
    }, []);
  
    const dataInfoUser = infousers?.filter((item) => item.user_id == user._id);
  
    const [checkChange, setCheckChange] = useState(false);
    const [checkAddAdress, setCheckAddAdress] = useState(false);
    const [idInfoUser, setIdInfoUser] = useState();
  
    const onChange = (checkedValues) => {
      setIdInfoUser(checkedValues);
    };
  
    const deleteInfo = (id) => {
      const newdata = dataInfoUser.find(
        (item) => item._id == id && item.status == 1
      );
      if (newdata) {
        openNotificationWithIcon("warning", "Không thể xóa địa chỉ mặc định !");
      } else {
        if (confirm("Bạn có muốn xóa không ?")) {
          dispatch(removeInfoUser(id));
        }
      }
    };
  
    const complete = () => {
      if (idInfoUser.length > 1) {
        openNotificationWithIcon("warning", "Bạn chỉ có thể chọn 1 địa chỉ");
      } else {
        const newdata = dataInfoUser.find((item) => item.status == 1);
        let formData = new FormData();
        let formData1 = new FormData();
        formData.append("status", 1);
        formData1.append("status", 2);
        dispatch(
          uploadInfoUser({
            dataUpload: formData,
            idUpload: idInfoUser,
            data: formData1,
            id: newdata._id,
          })
        );
        setCheckChange(false);
  
        openNotificationWithIcon("success", "Cập nhật thành công");
      }
    };
  return (
    <React.Fragment>
      <div className="payment-header">
        <div className="pm"></div>

        {dataInfoUser?.length == 0 ? (
          <div style={{ padding: 20, color: "red", fontSize: 17 }}>
            Bạn chưa có địa chỉ nhận hàng !{" "}
            <Button
              onClick={() => setCheckAddAdress(true)}
              icon={<PlusOutlined />}
            >
              Thêm địa chỉ
            </Button>
          </div>
        ) : checkChange == false ? (
          <div className="delivery-addres">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="delivery-address">
                {" "}
                <i className="fas fa-map-marker-alt"></i> địa chỉ nhận hàng
              </div>
              <div
                className="payment_change"
                onClick={() => setCheckChange(true)}
              >
                THAY ĐỔI
              </div>
            </div>
            {dataInfoUser.map((item, index) => {
              if (item.status == 1) {
                return (
                  <div className="payment_delivery-address" key={index}>
                    <div className="payment_name">
                      {item.name} (0{item.phone} )
                    </div>
                    <div className="payment_address">
                      {item.address == ""
                        ? `${`${item.specific_address},`}${item.ward}${
                            item.district
                          },${item.city}`
                        : `${`${item.specific_address},`}${item.address}}`}
                    </div>
                    {item.status == 1 && <span>mặc định</span>}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="add-address">
            <div className="add_address">
              <div className="delivery-address">
                {" "}
                <i className="fas fa-map-marker-alt"></i> địa chỉ nhận hàng
              </div>
              <Button onClick={() => setCheckAddAdress(true)}>
                <PlusOutlined /> thêm địa chỉ mới
              </Button>
            </div>

            <Checkbox.Group className="checkbox" onChange={onChange}>
              <div className="change-address">
                <ul>
                  {dataInfoUser?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Checkbox
                          disabled={item.status == 1 && true}
                          value={item._id}
                          key={index}
                          style={{ marginRight: 10 }}
                        />
                        <div className="payment_name">
                          {item.name} (0{item.phone} )
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {item.address == ""
                            ? `${`${item.specific_address},`}${item.ward},${
                                item.district
                              },${item.city}`
                            : `${`${item.specific_address},`}${item.address}}`}
                        </div>
                        <span>{item.status == 1 && "Mặc định"}</span>
                        <span>
                          <button onClick={() => deleteInfo(item._id)}>
                            <i className="far fa-trash-alt"></i>
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Checkbox.Group>
            <div className="back-complete">
              <div className="complete">
                <button onClick={() => complete()}>hoàn thành</button>
              </div>
              <div className="back" onClick={() => setCheckChange(false)}>
                <button>trở lại</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ShowAddAddress
        check={checkAddAdress}
        setFalse={() => setCheckAddAdress(!checkAddAdress)}
      />
    </React.Fragment>
  );
};

export default ListAddress;
