import { Button } from "antd";
import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import "../../../../Page/Css/Css/AddPro.css";
import { useDispatch, useSelector } from "react-redux";
import DetailedInfo from "./DetailedInfo";
import { uploadCheckList } from "../../../../../reducers/DataAddProSlice";
import SalesInfor from "./SalesInfor";
import { LeftOutlined } from "@ant-design/icons";

const AddPro = () => {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataaddpro.value);
  const back = (e) => {
    dispatch(uploadCheckList(e));
  };
  return (
    <div className="add_pro">
      {data.checkList == 1 && (
        <div className="click" style={{ paddingRight: 10 }}>
          <div
            className="header-add-pro"
            style={{ background: "#fff", padding: "10px 10px 30px 10px" }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                width: "100%",
              }}
            >
              Thông tin cơ bản
            </span>
            <span style={{ width: "100%", textAlign: "right", color: "red" }}>
              Bước 1/4
            </span>
          </div>
          <hr style={{ background: "rgba(0,0,0,0.2)" }} />

          <div className="image">
            <BasicInfo />
          </div>
        </div>
      )}

      {data.checkList == 2 && (
        <div className="click" style={{ paddingRight: 10 }}>
          <div
            className="header-add-pro"
            style={{ background: "#fff", padding: "10px 10px 0px 10px" }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                width: "100%",
              }}
            >
              <LeftOutlined
                style={{ cursor: "pointer" }}
                onClick={() => back(1)}
              />{" "}
              Thông tin chi tiết
            </span>
            <span style={{ width: "100%", textAlign: "right", color: "red" }}>
              Bước 2/4
            </span>
          </div>

          <div className="image">
            <DetailedInfo />
          </div>
        </div>
      )}

      {data.checkList == 3 && (
        <div className="click" style={{ paddingRight: 10 }}>
          <div
            className="header-add-pro"
            style={{ background: "#fff", padding: "10px 10px 30px 10px" }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                width: "100%",
              }}
            >
              <LeftOutlined
                style={{ cursor: "pointer" }}
                onClick={() => back(2)}
              />{" "}
              Thông tin bán hàng
            </span>
            <span style={{ width: "100%", textAlign: "right", color: "red" }}>
              Bước 3/4
            </span>
          </div>
          <SalesInfor />
        </div>
      )}
      {data.checkList == 4 && (
        <div className="click">
          <span style={{ fontWeight: 600, fontSize: 16 }}>
            Xem lại thông tin
          </span>
          <div className="image"></div>
        </div>
      )}
    </div>
  );
};

export default AddPro;
