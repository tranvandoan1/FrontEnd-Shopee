import React, { Suspense, lazy, useEffect, useReducer, useState } from "react";
import BasicInfo from "./BasicInfo";
import "../../../../Page/Css/Css/AddPro.css";
import DetailedInfo from "./DetailedInfo";
import SalesInfor from "./SalesInfor";
import { LeftOutlined } from "@ant-design/icons";
import { Badge, Button, Descriptions, Image, Space, Spin } from "antd";
import { getAllData } from "../../../../../reducers/AllData";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditPro = () => {
    const dispatch = useDispatch();
    const { id, idPro } = useParams()
    const data = useSelector((data) => data.dataAll.value);
    const product = data?.products?.find(item => item._id == idPro)
    const [textPro, setTextPro] = useState({ status: false, id: null });
    useEffect(() => {
        dispatch(getAllData());
    }, []);
    const [state, setState] = useReducer(
        (state, newState) => ({
            ...state,
            ...newState,
        }),
        {
            dataBasicInfo: product,
            dataDetailedInfo: undefined,
            check: 1,
            imageUrlAvatar: undefined,
            loading: false
        }
    );
    useEffect(() => {
        const product = data?.products?.find(item => item._id == idPro)
        setState({ dataBasicInfo: product })
    }, [product])


    const duplicateMame = (duplicateMameArr = []) => {
        const newData = [];
        while (duplicateMameArr.length > 0) {
            newData.push(duplicateMameArr[0]);
            duplicateMameArr = duplicateMameArr?.filter(
                (item) => item.name !== duplicateMameArr[0].name
            );
        }
        return newData;
    };
    const dataClassifys = data?.classifys?.filter(
        (item) => item.linked == product?.linked
    );
    const dataValues = [];
    dataClassifys?.map((item) => dataValues.push(...item.values));
   

    const content = () => (
        <React.Fragment>

          

            {state?.check == 1 && (
                <div className="click" style={{ paddingRight: 10 }}>
                    <div
                        className="header-add-pro"
                        style={{ background: "#fff", padding: "10px 10px 30px 10px", borderTop: '1px solid black' }}
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
                            product={product}
                            dataAll={data}
                        />
                    </div>
                </div>
            )}

            {state?.check == 2 && (
                <div className="click" style={{ paddingRight: 10, borderTop: '1px solid black' }}>
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
                            product={product}
                            dataAll={data}
                        />
                    </div>
                </div>
            )}

            {state?.check == 3 && (
                <div className="click" style={{ paddingRight: 10, borderTop: '1px solid black' }}>
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
                        callBack={(e) => setState({
                            ...e.state,
                            loading: e.loading
                        })}
                        state={state}
                        product={product}
                        dataAll={data}
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
        </React.Fragment>
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
            
           {content()}
        </div>
    );
};

export default EditPro;
