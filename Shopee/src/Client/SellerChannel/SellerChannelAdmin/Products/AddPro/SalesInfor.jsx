import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Select,
  Upload,
  Checkbox,
  Descriptions,
} from "antd";
import styles from "../../../../Page/Css/CssModule/SalesInfor.module.css";
import { useState } from "react";
import "../../../../Page/Css/Css/SalesInfor.css";

const { Option } = Select;
const SalesInfor = () => {
  const [checkPl1, setCheckPl1] = useState(false);
  const [checkPl2, setCheckPl2] = useState(false);
  const [classification, setClassification] = useState();
  const [commodityValue, setCommodityValue] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();
  const [luu, setLuu] = useState([]);
  const onFinish = (values) => {
    const connectionRamdom = Math.random();
    
    const dataProClas = [];
    values.classification.map((item) =>
      dataProClas.push({
        name: item.name,
        connection: connectionRamdom,
      })
    ),
      setClassification(dataProClas);
    setCommodityValue(values.commodityValue);
  };

  const beforeUpload = (file) => {
    setImageUrl(URL.createObjectURL(file));
  };
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    console.log(checkedValues);
    if (luu.length <= 0) {
      setLuu([checkedValues]);
    } else {
      setLuu([...luu, checkedValues]);
    }
  };
  console.log(luu, "lưu");
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div style={{ marginTop: 30 }}>
      <div style={{ padding: "0 20px" }}>
        <Row>
          <Col xs={12} sm={4} md={12} lg={4} xl={4}>
            <span>Phân loại nhóm 1</span>
          </Col>
          <Col xs={12} sm={4} md={12} lg={2} xl={2}></Col>
          <Col xs={12} sm={4} md={12} lg={18} xl={18}>
            {checkPl1 == false ? (
              <Button
                icon={<PlusCircleOutlined />}
                className={styles.button_add}
                onClick={() => setCheckPl1(true)}
              >
                Thêm
              </Button>
            ) : (
              <div style={{ width: "100%" }}>
                <Form
                  form={form}
                  name="product"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="name_classification"
                    label="Tên nhóm phân hàng"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập tên nhóm phân hàng !",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tên Nhóm phân loại hàng, ví dụ: màu sắc, kích thước v.v" />
                  </Form.Item>

                  <Form.List name="classification">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area ||
                                prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Phân loại hàng"
                                  name={[field.name, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Bạn chưa nhập tên phân loại hàng !",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Nhập phân loại hàng, ví dụ: Trắng, Đỏ v.v" />
                                </Form.Item>
                              )}
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                            />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm phân loại hàng
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </div>
            )}
          </Col>
        </Row>
        {checkPl1 == true && (
          <Row style={{ marginTop: 40 }}>
            <Col xs={12} sm={4} md={12} lg={4} xl={4}>
              <span>Phân loại nhóm 2</span>
            </Col>
            <Col xs={12} sm={4} md={12} lg={2} xl={2}></Col>
            <Col xs={12} sm={4} md={12} lg={18} xl={18}>
              {checkPl2 == false ? (
                <Button
                  icon={<PlusCircleOutlined />}
                  className={styles.button_add}
                  onClick={() => setCheckPl2(true)}
                >
                  Thêm
                </Button>
              ) : (
                <div style={{ width: "100%" }}>
                  <Form
                    form={form}
                    name="commodityValue"
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="name_commodityvalue"
                      label="Tên nhóm phân hàng"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập tên nhóm phân hàng !",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập tên phân loại, ví dụ: Size, v.v" />
                    </Form.Item>
                    <Form.List name="commodityValue">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <Space key={field.key} align="baseline">
                              <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, curValues) =>
                                  prevValues.area !== curValues.area ||
                                  prevValues.sights !== curValues.sights
                                }
                              >
                                {() => (
                                  <Form.Item
                                    {...field}
                                    label="Phân loại hàng"
                                    name={[field.name, "name1"]}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Bạn chưa nhập tên phân loại hàng !",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Nhập phân loại, ví dụ: S, M, v.v" />
                                  </Form.Item>
                                )}
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                            </Space>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm phân loại hàng
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
        )}
        {/* 
        <div className={styles.photo_avatar}>
          <span style={{ width: "34%" }}>Ảnh phân loại</span>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </div> */}

        <Form form={form} onFinish={onFinish} autoComplete="off">
          <hr style={{ margin: "30px 0" }} />
          <h4 style={{ fontSize: 18, color: "#ee4d2d" }}>
            Danh sách phân loại hàng
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "5px 20px" }}
            >
              Phân loại
            </Button>
            <br />
            <span style={{ fontSize: 14, opacity: 0.5, color: "black" }}>
              (Hãy tích vào giá trị phân loại của loại hàng nếu có )
            </span>
          </h4>

          {classification !== undefined && (
            <Row style={{ marginTop: -15 }}>
              <Descriptions
                bordered
                style={{ textAlign: "left", width: "100%" }}
                column={{
                  xxl: 3,
                  xl: 3,
                  lg: 3,
                  md: 2,
                  sm: 2,
                  xs: 2,
                }}
              >
                {classification?.map((item) => {
                  return (
                    <Descriptions.Item style={{ padding: 0, margin: 0 }}>
                      <div
                        style={{
                          margin: "20px 0",
                          textAlign: "left",
                          marginLeft: 10,
                        }}
                      >
                        <div>
                          Tên phân loại :{" "}
                          <span
                            style={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              color: "red",
                            }}
                          >
                            <span style={{ textTransform: "capitalize" }}>
                              {item.name}
                            </span>
                          </span>
                        </div>

                        <div style={{ margin: "10px 0" }}>
                          Giá trị phân loại
                        </div>
                        <Select
                          mode="tags"
                          style={{
                            width: "100%",
                          }}
                          placeholder="Tags Mode"
                          onChange={handleChange}
                        >
                          {commodityValue?.map((com, i) => (
                            <Option
                              key={i}
                              value={com.nam1}
                            >
                              {com.name1}
                            </Option>
                          ))}
                        </Select>
                        {/* <Checkbox.Group onChange={onChange}>
                          <Row>
                            {commodityValue?.map((com, index) => (
                              <Col lg={12}>
                                <Checkbox
                                  value={{
                                    id: index + 1,
                                    name_com: com.name1,
                                    connection: item.connection,
                                  }}
                                  key={com.name1}
                                >
                                  {com.name1}
                                </Checkbox>
                              </Col>
                            ))}
                            <Button onClick={(e) => console.log(e.target.value)}>Lưu</Button>
                          </Row>
                        </Checkbox.Group> */}
                      </div>
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Row>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SalesInfor;
