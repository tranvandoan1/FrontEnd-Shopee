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
const InfoProEdit = () => {
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
   

  return (
    <div className="info-pro">
    <h3>thông tin sản phẩm</h3>
    <Descriptions bordered>
        <Descriptions.Item label="Tên sản phẩm" span={2}>
            {product?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Ảnh đại điện">
            <Image
                width={300}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        </Descriptions.Item>
        <Descriptions.Item label="Tên phân loại sản phẩm" span={3}>
            {dataClassifys?.map((item, index) => (
                <p className="value-pro">
                    {index == 0 ? item.name : `  ,${item.name}`}
                </p>
            ))}
        </Descriptions.Item>
        <Descriptions.Item label="Giá trị phân loại sản phẩm" span={3}>
            {duplicateMame(dataValues)?.map((item, index) => (
                <p className="value-pro">
                    {index == 0 ? item.name : `  ,${item.name}`} ({item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ)
                </p>
            ))}
        </Descriptions.Item>
        <Descriptions.Item label="Danh mục">
            {
                data?.cateshops?.map(item => item._id == product?.cate_id && <p style={{ textTransform: 'capitalize', margin: 0 }}>{item.name}</p>)
            }
        </Descriptions.Item>
        <Descriptions.Item label="Giảm giá">{product?.sale}%</Descriptions.Item>
        <Descriptions.Item label="Nguồn gốc" span={2}>
            {product?.origin}
        </Descriptions.Item>
        <Descriptions.Item label="Kho" >
            {product?.warehouse}

        </Descriptions.Item>
        <Descriptions.Item label="đã được gửi từ">
            {product?.sent_from}
        </Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>

        <Descriptions.Item label="Chi tiết" span={3}>
            <p
                style={{ width: "100%", fontSize: 14 }}
                dangerouslySetInnerHTML={{
                    __html:
                        textPro.id == product?._id
                            ? JSON.parse(product?.description)
                            : JSON.parse(product?.description).substring(
                                0,
                                String(JSON.parse(product?.description)).length /
                                10
                            ) + "...",
                }}
            />
            <Button
                type="primary"
                onClick={() =>
                    setTextPro(
                        textPro.id == product?._id
                            ? { status: false, id: null }
                            : { status: true, id: product?._id }
                    )
                }
            >
                {textPro.id !== product?._id ? "Xem thêm" : "Rút gọn"}
            </Button>
        </Descriptions.Item>
    </Descriptions>
</div>
  )
}

export default InfoProEdit