import React, { useEffect, useReducer } from "react";
import BasicInfo from "./BasicInfo";
import "../../../../Page/Css/Css/AddPro.css";
import DetailedInfo from "./DetailedInfo";
import SalesInfor from "./SalesInfor";
import { LeftOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import { getAllData } from "../../../../../reducers/AllData";
import { useDispatch, useSelector } from "react-redux";

const AddPro = () => {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      dataBasicInfo: undefined,
      dataDetailedInfo: undefined,
      check: 1,
      imageUrlAvatar: undefined,
      loading: false
    }
  );
  return (
    <div className="add_pro">
      {
        state?.loading == true &&
        <div style={{ zIndex: 10, position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin></Space>
        </div>
      }
      {state?.check == 1 && (
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
            <BasicInfo
              callBack={(e) =>
                setState({ dataBasicInfo: e.data, check: e.check })
              }
              setImageUrlAvatar={(e) => setState({ imageUrlAvatar: e })}
              state={state}
              data={data}
            />
          </div>
        </div>
      )}

      {state?.check == 2 && (
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
                onClick={() =>
                  setState({ dataBasicInfo: state?.dataBasicInfo, check: 1 })
                }
              />{" "}
              Thông tin chi tiết
            </span>
            <span style={{ width: "100%", textAlign: "right", color: "red" }}>
              Bước 2/4
            </span>
          </div>

          <div className="image">
            <DetailedInfo
              callBack={(e) =>
                setState({ dataDetailedInfo: e.data, check: e.check })
              }
              state={state}
              data={data}
            />
          </div>
        </div>
      )}

      {state?.check == 3 && (
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
                onClick={() =>
                  setState({
                    dataBasicInfo: state?.dataBasicInfo,
                    check: 2,
                    dataDetailedInfo: state?.dataDetailedInfo,
                  })
                }
              />{" "}
              Thông tin bán hàng
            </span>
            <span style={{ width: "100%", textAlign: "right", color: "red" }}>
              Bước 3/4
            </span>
          </div>
          <SalesInfor
            state={state}
            callBack={(e) => setState({
              ...e.state,
              loading: e.loading
            })}
            data={data}
          />
        </div>
      )}
      {state?.check == 4 && (
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
