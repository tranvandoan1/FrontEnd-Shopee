import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Spin,
    Upload,
    message,
    notification,
} from "antd";
import {
    CloseCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import ShopOwnerAPI from "../API/ShopOwner";
import Loading from "./Loading";
const ModalShopownerAdd = ({ title, content, status, callBack, btnClose, btnAcc }) => {
    const shopeePopupFormHeader = document.querySelector(
        ".shopee-popup-form__header-comfim"
    );
    window.addEventListener("click", function (e) {
        if (e.target == shopeePopupFormHeader) {
            callBack('close')
        }
    });
    const userLoca = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [imageUrlAvatar, setImageUrlAvatar] = useState({ url: undefined, file: undefined });
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const UploadAvatatr = (file) => {
        setLoading(true);
        const src = URL.createObjectURL(file);
        setImageUrlAvatar({ url: src, file: file });
        setLoading(false);
    };
    const onFinish = async (values) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('files', imageUrlAvatar?.file)
        formData.append('user_id', userLoca?._id)
        const { data } = await ShopOwnerAPI.add(formData)
        setLoading(false)
        navigate(`/seller-channel&&${btoa(data._id)}`);
    }
    return (
        <div
            className={`shopee-popup-form__header-comfim ${status == true ? 'active-shopee-popup-form__header-comfim' : ''}`}
        >
            {
                loading == true &&
                <Loading />

            }
            <div className="form__header">
                <div className='title'>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </div>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
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
                        name="name"
                        label="Tên cửa hàng"
                        rules={[
                            {
                                required: true,
                                message: "Chưa nhập họ và tên!",
                            },
                        ]}
                    >
                        <Input placeholder="Họ và Tên" />
                    </Form.Item>

                    <Form.Item label="Ảnh" className="form-item-upload-avatar">
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={UploadAvatatr}
                            className="upload-avatar"
                        >
                            {imageUrlAvatar?.file ? (
                                <div className="box-image">
                                    <img src={imageUrlAvatar.url} className="image" />
                                </div>
                            ) : (
                                <div>
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        {loading == true ? (
                                            <Spin />
                                        ) : (
                                            <PlusCircleOutlined
                                                style={{
                                                    fontSize: 30,
                                                    opacity: 0.8,
                                                    color: "#ee4d2d",
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </Upload>
                        {imageUrlAvatar?.file !== undefined && (
                            <div
                                onClick={() => setImageUrlAvatar(undefined)}
                                className="close"
                            >
                                <CloseCircleOutlined style={{ fontSize: 17 }} />
                            </div>
                        )}
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >

                        <Button type="dashed" style={{ marginRight: 10 }} onClick={() => callBack('close')}>{btnClose}</Button>
                        <Button type="primary" htmlType="submit" danger onClick={() => callBack('oke')}>{btnAcc}</Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default ModalShopownerAdd