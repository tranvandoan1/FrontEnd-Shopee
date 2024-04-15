import { async } from "@firebase/util";
import { Button, Modal, Checkbox, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../../../Notification";
import { getAllData } from "../../../../reducers/AllData";
import { addCateShop } from "../../../../reducers/CateShop";
import "../../../Page/Css/Css/CateShop.css";
import { useParams } from "react-router-dom";
const AddCateShop = ({ status, callBack, callLoading }) => {
  const { id } = useParams()
  const categories = useSelector((data) => data.categoris.value);
  console.log(categories, 'categories')
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);
  console.log(data, 'data')
  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const onFinish = async (values) => {
    callLoading(true)
    const newData = {
      ...values,
      shopowner_id: atob(id),
    };
    await dispatch(addCateShop(newData));
    callLoading(false)
    callBack()
    message.open({
      type: "success",
      content: 'Thêm thành công',
      duration: 1,
    });



  };
  const shopeePopupFormHeader = document.querySelector(
    ".form__header-add-catesShope"
  );
  window.addEventListener("click", function (e) {
    if (e.target == shopeePopupFormHeader) {
      callBack()
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
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập tên danh mục!",
              },
            ]}
          >
            <Input placeholder="Tên danh mục" />
          </Form.Item>

          <Form.Item
            label="Danh mục shopee"
            name="categorie_id"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Bạn chưa chọn danh mục của web",
              },
            ]}
          >
            <Select placeholder="Danh mục của shop">
              {categories?.map((item) => (
                <Select.Option key={(item) => item._id} value={item._id}>
                  <span style={{ textTransform: "capitalize", fontSize: 13 }}>
                    {item.name}
                  </span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button
              onClick={() => setIsModalVisible(false)}
              style={{ marginLeft: 10 }}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCateShop;
