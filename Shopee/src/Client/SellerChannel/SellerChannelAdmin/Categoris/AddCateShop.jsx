import { async } from "@firebase/util";
import { Button, Modal, Checkbox, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../../../API/CateShopeeAPI";
import { openNotificationWithIcon } from "../../../../Notification";
import { getAllData } from "../../../../reducers/AllData";
import { addCateShopee } from "../../../../reducers/CateShopee";
import "../../../Page/Css/Css/CateShop.css";
const AddCateShop = () => {
  const user = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage

  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const shopOwner = data.shopowner.find((item) => item.user_id == user._id);
    const newData = {
      ...values,
      shopowner_id: shopOwner._id,
    };
    dispatch(addCateShopee(newData));
    openNotificationWithIcon("success", "Thêm thành công");
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={()=>console.log('first')}>
        Thêm danh mục
      </Button>
   
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
        name="cateShope_id"
        labelAlign="left"
        rules={[
          {
            required: true,
            message: "Bạn chưa chọn danh mục của web",
          },
        ]}
      >
        {Object.keys(data).length > 0 && (
          <Select placeholder="Danh mục của shop">
            {data.categori.map((item) => (
              <Select.Option key={(item) => item._id} value={item._id}>
                <span style={{ textTransform: "capitalize", fontSize: 13 }}>
                  {item.name}
                </span>
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
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
  );
};

export default AddCateShop;
