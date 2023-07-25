import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../Css/Product.module.css";

const DetailedInfo = ({ state, callBack }) => {
  console.log(state, "state");
  const dispatch = useDispatch();
  const [completedQuantity, setCompletedQuantity] = useState([]);
  const dataaddpro = useSelector((data) => data.dataaddpro.value);
  const onFinish = (values) => {
    // dispatch(addTake({ data: { ...values }, check: 2 }));
    // dispatch(uploadCheckList(3));
    callBack({ data: { ...values }, check: 3 });
  };

  const handleChange = (value) => {
    console.log(value);
    // console.log([...completedQuantity, value]);
    // setCompletedQuantity(
    //   completedQuantity == undefined ? value : { ...completedQuantity, value }
    // );
  };
  return (
    <div style={{ background: "#fff", padding: 10 }}>
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
                  <Select.Option value="YL">YL</Select.Option>
                  <Select.Option value="NIKE">NIKE</Select.Option>
                </Select>

              </Form.Item>
              <p className={styles['trademark']}>{state?.dataDetailedInfo?.trademark}</p>
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
                  <Select.Option value="Châu Âu">Châu Âu</Select.Option>
                  <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                </Select>

              </Form.Item>
              <p className={styles['origin']}>{state?.dataDetailedInfo?.origin}</p>
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
                  <Select.Option value="Đoàn 123">Đoàn 123</Select.Option>
                  <Select.Option value="Đoàn 312">Đoàn 312</Select.Option>
                  <Select.Option value="Cháu nhỏ">Cháu nhỏ</Select.Option>
                </Select>
              </Form.Item>
              <p className={styles['warehouse']}>{state?.dataDetailedInfo?.warehouse}</p>
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
                  <Select.Option value="Thường Tín">Thường Tín</Select.Option>
                  <Select.Option value="Hoàng Mai">Hoàng Mai</Select.Option>
                </Select>

              </Form.Item>
              <p className={styles['sent_from']}>{state?.dataDetailedInfo?.sent_from}</p>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 21,
              span: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <Button
                onClick={() => dispatch(uploadCheckList(1))}
                icon={<LeftOutlined />}
                style={{ background: "#fff", marginRight: 10, color: "black" }}
              >
                Quay lại
              </Button> */}
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
