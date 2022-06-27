import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTake,
  uploadCheckList,
} from "../../../../../reducers/DataAddProSlice";
const DetailedInfo = () => {
  const dispatch = useDispatch();
  const [completedQuantity, setCompletedQuantity] = useState([]);
  const dataaddpro = useSelector((data) => data.dataaddpro.value);
  console.log(dataaddpro);
  const onFinish = (values) => {
    dispatch(addTake({ data: { ...values }, check: 2 }));
    dispatch(uploadCheckList(3));
  };

  const handleChange = (value) => {
    console.log(value)
    // console.log([...completedQuantity, value]);
    // setCompletedQuantity(
    //   completedQuantity == undefined ? value : { ...completedQuantity, value }
    // );
  };
  return (
    <div>
      <p>
        Hoàn thành: {completedQuantity?.length} / 4 Điền thông tin thuộc tính để
        tăng mức độ hiển thị cho sản phẩm
      </p>
      <div style={{ marginTop: 40 }}>
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
          <Row>
            <Col xs={12} sm={4} md={12} lg={10} xl={10}>
              <Form.Item
                label="Thương hiệu"
                name="trademark"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn thương hiệu!",
                  },
                ]}
              >
                <Select
                  placeholder="Thương hiệu"
                  onChange={handleChange(1)}
                  key="1"
                >
                  <Select.Option value="jack111">Jack111</Select.Option>
                  <Select.Option value="jack11">Jack11</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={2} xl={2}></Col>
            <Col xs={12} sm={4} md={12} lg={10} xl={10}>
              <Form.Item
                label="Nguồn gốc"
                name="origin"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn nguồn gốc!",
                  },
                ]}
              >
                <Select
                  placeholder="Nguồn gốc"
                  onChange={handleChange(2)}
                  key="2"
                >
                  <Select.Option value="jack211">Jack211</Select.Option>
                  <Select.Option value="jack21">Jack21</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} md={12} lg={10} xl={10}>
              <Form.Item
                label="Kho hàng"
                name="warehouse"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn kho hàng!",
                  },
                ]}
              >
                <Select
                  placeholder="Thương hiệu"
                  onChange={handleChange(3)}
                  key="3"
                >
                  <Select.Option value="jack311">Jack311</Select.Option>
                  <Select.Option value="jack31">Jack31</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={2} xl={2}></Col>
            <Col xs={12} sm={4} md={12} lg={10} xl={10}>
              <Form.Item
                label="Gửi từ"
                name="sent_from"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn gửi từ đâu !",
                  },
                ]}
              >
                <Select placeholder="Gửi từ" onChange={handleChange(4)} key="4">
                  <Select.Option value="jack4">Jack4</Select.Option>
                  <Select.Option value="jack41">Jack41</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 18,
              span: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => dispatch(uploadCheckList(1))}
                icon={<LeftOutlined />}
                style={{ background: "#fff", marginRight: 10, color: "black" }}
              >
                Quay lại
              </Button>
              <Button type="primary" htmlType="submit">
                Tiếp
                <RightOutlined />
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DetailedInfo;
