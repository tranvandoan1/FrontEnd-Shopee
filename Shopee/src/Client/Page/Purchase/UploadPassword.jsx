import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPassword } from "../../../API/Users";
import Loading from "../../../components/Loading";

const UploadPassword = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { data: userPassword } = await uploadPassword({
      _id: user?._id,
      ...values,
    });
    if (userPassword?.error) {
      message.open({
        type: "error",
        content: userPassword?.error,
        duration: 2,
      });
    } else {
      message.open({
        type: "success",
        content: userPassword?.susssuc,
        duration: 2,
      });
    }

    setLoading(false);
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="form-upload-password">
      {
        loading == true &&
        <Loading />

      }
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="current_password"
          label="Mật khẩu hiện tại"
          rules={[
            {
              required: true,
              message: "Chưa nhập mật khẩu hiện tại!",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Chưa nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Chưa nhập lại password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <p>Quên mật khẩu</p>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPassword;
