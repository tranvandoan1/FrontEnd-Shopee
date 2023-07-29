import React, { useEffect, useState } from "react";
import "../Css/Css/Checkout.css";
import { HeaderSticky } from "./../Header/HeaderSticky";
import TotalPrice from "./TotalPrice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Checkbox, Radio, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ShowAddAddress from "./ShowAddAdress";
import {
  getInfoUser,
  removeInfoUser,
  uploadInfoUser,
} from "../../../reducers/InfoUserSlice";
import { openNotificationWithIcon } from "../../../Notification";

const ListAddress = () => {
  const dispatch = useDispatch();

  const infousers = useSelector((data) => data.infoUser.value);
  useEffect(() => {
    dispatch(getInfoUser());
  }, []);

  const dataInfoUser = infousers?.find((item) => item?.status == true);//lấy địa chỉ mặc định
  const [checkChange, setCheckChange] = useState(false);
  const [checkAddAdress, setCheckAddAdress] = useState(false);
  const [idInfoUser, setIdInfoUser] = useState();

  const onChange = (checkedValues) => {
    setIdInfoUser(checkedValues[0]);
  };

  const deleteInfo = async (item) => {

    if (item.status == true) {
      openNotificationWithIcon("warning", "Không thể xóa địa chỉ mặc định !");
    } else {
      if (confirm("Bạn có muốn xóa không ?")) {
        await dispatch(removeInfoUser(item._id));
        message.open({
          type: "success",
          content: "Xóa thành công",
          duration: 1,
        });
      }
    }
  };

  const complete = async () => {
    if (idInfoUser.length == undefined) {
      openNotificationWithIcon("warning", "Bạn chỉ có thể chọn 1 địa chỉ");
    } else {
      const idInfoUserUpdate = infousers?.find(item => item._id == idInfoUser)
      const idInfoUserTrue = infousers?.find(item => item.status == true)

      await dispatch(
        uploadInfoUser({
          _idUpload: idInfoUserUpdate._id, _idInfoTrue: idInfoUserTrue?._id
        })
      );
      setCheckChange(false);
      message.open({
        type: "success",
        content: "Cập nhật thành công",
        duration: 1,
      });
    }
  };
  return (
    <React.Fragment>
      <div className="payment-header">
        <div className="pm"></div>

        {dataInfoUser == undefined && checkChange == false ? (
          <div className="no-addres">
            <span>
              Bạn chưa có địa chỉ nhận hàng !
            </span>
            <Button
              onClick={() => infousers?.value?.length <= 0 && infousers?.loading == false ? setCheckAddAdress(true) : setCheckChange(true)}
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

            <div className="payment_delivery-address" >
              <div className="payment_name">
                {dataInfoUser?.name} (0{dataInfoUser?.phone} )
              </div>
              <div className="payment_address">
                {dataInfoUser?.address == ""
                  ? `${`${dataInfoUser?.specific_address},`}${dataInfoUser?.ward}${dataInfoUser?.district
                  },${dataInfoUser?.city}`
                  : `${`${dataInfoUser?.specific_address},`}${dataInfoUser?.address}}`}
              </div>
              {dataInfoUser?.status == true && <span>mặc định</span>}
            </div>

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
                  {infousers?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Checkbox
                          disabled={item.status == true && true}
                          value={item._id}
                          key={index}
                          style={{ marginRight: 10 }}
                        />
                        <div className="payment_name">
                          {item.name} (0{item.phone} )
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {item.address == ""
                            ? `${`${item.specific_address},`}${item.ward},${item.district
                            },${item.city}`
                            : `${`${item.specific_address},`}${item.address}}`}
                        </div>
                        <span>{item.status == 1 && "Mặc định"}</span>
                        <span>
                          <button onClick={() => deleteInfo(item)}>
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
