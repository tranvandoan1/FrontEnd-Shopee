import React, { useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    uploadCateShop,
} from "../../../../reducers/CateShop";
import { getAllCate } from "../../../../reducers/CategoriSlice";
const EditCateShop = ({ status, callBack, dataEdit, callLoading }) => {
    const dispatch = useDispatch();
    const categories = useSelector((data) => data.categoris.value);

    useEffect(() => {
        dispatch(getAllCate());
    }, []);
    const upload = async (values) => {
        callLoading(true)

        await dispatch(
            uploadCateShop({
                _id: dataEdit._id,
                data: {
                    name: values.name == undefined ? dataEdit.name : values.name,
                    categorie_id: values.categorie_id == undefined ? dataEdit.categorie_id : values.categorie_id
                },
            })
        );
        callLoading(false)
        callBack();

        message.open({
            type: "success",
            content: 'Cập nhật thành công',
            duration: 1,
        });
    };
    const shopeePopupFormHeader = document.querySelector(
        ".form__header-add-catesShope"
    );
    window.addEventListener("click", function (e) {
        if (e.target == shopeePopupFormHeader) {
            callBack();
        }
    });
    return (
        <div
            className={`form__header-add-catesShope ${status == true ? "active-form__header-add-catesShope" : ""
                }`}
        >
            <div className="form__header">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={upload}
                    autoComplete="off"
                >
                    <Form.Item label="Tên danh mục" name="name" labelAlign="left">
                        <Input placeholder="Tên danh mục" defaultValue={dataEdit?.name} />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục shopee"
                        name="categorie_id"
                        labelAlign="left"
                    >
                        <Select
                            placeholder="Danh mục của shop"
                            defaultValue={dataEdit?.categorie_id}
                        >
                            {categories?.map((item) => {
                                return (
                                    <Select.Option value={item._id}>
                                        <span
                                            style={{
                                                textTransform: "capitalize",
                                                fontSize: 13,
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sửa
                        </Button>
                        <Button onClick={() => callBack()} style={{ marginLeft: 10 }}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditCateShop;
