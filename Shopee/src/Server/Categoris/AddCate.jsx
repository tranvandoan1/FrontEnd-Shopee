import React from "react";
import styles from "../Css/AdminCate.module.css";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../Notification";
import { add } from "../../API/Categoris";
const AddCate = () => {
  const navigate = useNavigate();
    const onFinish = async (values) => {
    await add(values);
    navigate("/admin/categoris");
    openNotificationWithIcon("success", "Thêm thành công");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid gainsboro",
        }}
      >
        <h3 className={styles.title}>Thêm danh mục</h3>
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
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
          style={{ marginTop: 30 }}
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập thêm danh mục!",
            },
          ]}
        >
          <Input placeholder="Tên danh mục" />
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCate;
