import {
  CloseCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
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
  Alert,
  message,
  Spin,
  Switch,
  Table,
} from "antd";
import styles from "../../../../Page/Css/CssModule/SalesInfor.module.css";
import React, { useState } from "react";
import "../../../../Page/Css/Css/SalesInfor.css";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../../firebase";
import { addProduct } from "./../../../../../reducers/Products";

const { Option } = Select;
const SalesInfor = () => {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataaddpro.value);
  const [checkPl1, setCheckPl1] = useState(false);
  const [checkPl2, setCheckPl2] = useState(false);
  const [classify1, setClassify1] = useState();
  const [classify2, setClassify2] = useState();
  const [classifyValue, setClassifyValue] = useState();
  const [loading, setLoading] = useState(false);

  const [dataTh1, setDataTh1] = useState();
  const [form] = Form.useForm();
  const [luu, setLuu] = useState([]);
  const onFinish = (values) => {
    if (values.classify1 == undefined) {
      message.warning("Bạn chưa có giá trị phân loại!");
    } else {
      if (checkPl2 == false) {
        setDataTh1(values);
        setClassifyValue([]);
        setClassify1([]);
        setClassify2([]);
      } else {
        setDataTh1([]);
        setClassifyValue({
          name_classify1: values.name_classify1,
          name_classify2: values.name_classify2,
        });
        const dataClassify1 = [];
        values.classify1.map((item) => {
          dataClassify1.push({ ...item, id: Math.random() });
        });

        setClassify1(dataClassify1);
        setClassify2(values.classify2);
      }
    }
    setImageUrl([]);
  };
  const confirm = async (values) => {
    if (checkPl2 == false) {
      console.log(dataTh1, "dataTh1");
      console.log(imageUrl, "2ewds");
    } else {
      const newArray = [];
      // chuyển dạng object có key là tên giá trị phân loại thành mảng thành value
      Object.keys(values).map((key) =>
        newArray.push({ name: key, classify: values[key] })
      );
      const newData = [];
      // lấy các giá trị gồm tiền và số lượng của giá trị phân loại 2 nhưng sẽ có cái trùng
      for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray[i].classify.length; j++) {
          for (let z = 0; z < classify2.length; z++) {
            if (newArray[i].classify[j] == classify2[z].name) {
              newArray[i].classify[j] = classify2[z];
            }
          }
          newData.push({ name: newArray[i].name, items: newArray[i].classify });
        }
      }
      // lọc cái phần tử trùng
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
      }
      // setDataTh1(getUniqueListBy(newData, "name"));
      const dataNew = getUniqueListBy(newData, "name");
      const dataSuccessful = [];
      for (let i = 0; i < dataNew.length; i++) {
        for (let j = 0; j < dataCheck.length; j++) {
          if (dataNew[i].name == dataCheck[j].name) {
            dataSuccessful.push({
              name: dataNew[i].name,
              value: dataNew[i].items,
              // photo: dataCheck[j].file,
              photo:
                "https://firebasestorage.googleapis.com/v0/b/imageshopee-e80ee.appspot.com/o/images%2Fz3858008705466_103a67ceeeb8c9df9365051f453c5c2d.jpg?alt=media&token=33e6b010-5dc9-4265-8b9c-a6a6e8bcba46",
            });
          }
        }
      }
      const newArrayy = [];
      // dataSuccessful.filter((item) => {
      //   console.log(item.photo, "itemitem");
      //   const imageRef = ref(storage, `images/${item.photo.name}`);
      //   uploadBytes(imageRef, item.photo).then(() => {
      //     getDownloadURL(imageRef).then(async (url) => {
      //       await newArrayy.push(url);
      //       console.log(url, "32rewds");
      //     });
      //   });
      // });

      console.log(dataSuccessful, "dataSuccessful");
      console.log(data, "data");
      console.log(newArrayy, "newArrayy");
      const dataProduct = {
        warehouse: data.take2.warehouse,
        trademark: data.take2.trademark,
        sent_from: data.take2.sent_from,
        origin: data.take2.origin,
        name: 'Product 2',
        description: data.take1.description,
        cate_id: data.take1.cate_id,
        classification: {
          name_classify1: classifyValue.name_classify1,
          name_classify2: classifyValue.name_classify2,
          value2: dataSuccessful,
        },
        photo:
          "https://firebasestorage.googleapis.com/v0/b/imageshopee-e80ee.appspot.com/o/images%2Fdanh-sach-cac-loai-oc-bien-oc-nuoc-ngot-va-oc-doc-tai-viet-nam-202108041639403382%20(1).png?alt=media&token=8cc802c2-4920-4136-bcf7-1465282f5f63",
      };
      console.log(dataProduct, "dataProductdataProduct");
      await dispatch(addProduct(dataProduct));
      message.success("Thêm thành công  ");
    }
  };

  const [imageUrl, setImageUrl] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [selectImage, setSelectImage] = useState();

  const dataCheck =
    imageUrl?.length <= 0
      ? dataTh1?.classify1 == undefined
        ? classify1
        : dataTh1?.classify1
      : imageUrl;

  const Upload1 = (file) => {
    console.log(file, "32ewdqs");
    setLoading1(true);

    const src = URL.createObjectURL(file);
    const newImage = [];
    dataCheck?.filter((item) => {
      if (item.name == selectImage.name) {
        newImage.push({
          name: item.name,
          url: src,
          file: file,
          price: item.price1 || item.price,
          quantity: item.quantity,
        });
      } else {
        newImage.push({
          name: item.name,
          url: item.url,
          file: item.file,
          price: item.price1 || item.price,
          quantity: item.quantity,
        });
      }
    });
    setImageUrl(newImage);
    setLoading1(false);
  };
  const removeImgae = (data) => {
    setLoading1(true);
    const newImage = [];
    dataCheck?.filter((item) => {
      if (item.name == data.name) {
        newImage.push({
          name: item.name,
          url: undefined,
          file: item.file,
          price: item.price1 || item.price,
          quantity: item.quantity,
        });
      } else {
        newImage.push({
          name: item.name,
          url: item.url,
          file: item.file,
          price: item.price1 || item.price,
          quantity: item.quantity,
        });
      }
    });
    setImageUrl(newImage);
    setLoading1(false);
  };
  const complete = () => {
    console.log(
      imageUrl.length <= 0
        ? [...dataTh1, classifyValue]
        : [...imageUrl, classifyValue],
      "2ewds"
    );
  };

  const columns = [
    {
      title: "Tên loại hàng",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div>
          <span style={{ textTransform: "capitalize" }}>{name}</span>
        </div>
      ),
    },
    {
      title: "Giá tiền",
      dataIndex: "price1",
      key: "price1",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  console.log(dataCheck, "dataCheck");
  console.log(classify2, "classify2");
  console.log(loading1, "loading1");
  return (
    <div>
      <div style={{ padding: "0 20px", background: "#fff" }}>
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
                  name="name_classify1"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="name_classify1"
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

                  <Form.List name="classify1">
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

                            <Form.Item
                              {...field}
                              label="Giá Tiền"
                              name={[field.name, "price1"]}
                              rules={[
                                {
                                  required: checkPl2 == true ? false : true,
                                  message: "Bạn chưa nhập giá tiền !",
                                },
                              ]}
                              style={{
                                display: checkPl2 == true ? "none" : "flex",
                              }}
                            >
                              <Input placeholder="Giá tiền" />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              label="Số lượng"
                              name={[field.name, "quantity"]}
                              rules={[
                                {
                                  required: checkPl2 == true ? false : true,
                                  message: "Bạn chưa nhập số lượng !",
                                },
                              ]}
                              style={{
                                display: checkPl2 == true ? "none" : "flex",
                              }}
                            >
                              <Input placeholder="Số lượng" />
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
                            Thêm phân loại hàng 1
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
                    name="name_classify2"
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Item
                        name="name_classify2"
                        label="Tên nhóm phân hàng"
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa nhập tên nhóm phân hàng !",
                          },
                        ]}
                        style={{ width: "95%" }}
                      >
                        <Input
                          placeholder="Nhập tên phân loại, ví dụ: Size, v.v"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        style={{ width: "5%" }}
                        onClick={() => setCheckPl2(false)}
                      />
                    </div>

                    <Form.List name="classify2">
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
                                    <Input placeholder="Nhập phân loại, ví dụ: S, M, v.v" />
                                  </Form.Item>
                                )}
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label="Giá Tiền"
                                name={[field.name, "price"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Bạn chưa nhập giá tiền !",
                                  },
                                ]}
                              >
                                <Input placeholder="Giá tiền" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label="Số lượng"
                                name={[field.name, "quantity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Bạn chưa nhập số lượng !",
                                  },
                                ]}
                              >
                                <Input placeholder="Số lượng" />
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
                              Thêm phân loại hàng 2
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
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <hr style={{ margin: "30px 0" }} />
          <h4 style={{ fontSize: 18, color: "#ee4d2d" }}>
            Danh sách phân loại hàng
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "5px 20px" }}
            >
              Phân loại / Cập nhật
            </Button>
            <br />
            <span style={{ fontSize: 14, opacity: 0.5, color: "black" }}>
              (Hãy tích vào giá trị phân loại của loại hàng nếu có )
            </span>
          </h4>
        </Form>
        {dataTh1?.classify1?.length > 0 && checkPl2 == false && (
          <Table
            pagination={false}
            dataSource={dataTh1?.classify1}
            columns={columns}
          />
        )}
        {classify1 !== undefined && (
          <Form
            name="basic"
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={confirm}
            autoComplete="off"
            style={{ display: "block" }}
          >
            <Row style={{ marginTop: -15, width: "100%" }}>
              {classify1?.map((item, index) => {
                return (
                  <Col
                    xs={12}
                    sm={4}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ padding: "0 10px" }}
                  >
                    <div style={{ marginTop: 10 }}>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ margin: "10px 0", width: "30%" }}>
                        Giá trị phân loại
                      </div>

                      <Form.Item
                        name={`${item.name}`}
                        labelAlign="left"
                        rules={[
                          {
                            required: true,
                            message: "Loại hàng!",
                            type: "array",
                          },
                        ]}
                        style={{
                          margin: "20px 0",
                          marginLeft: 10,
                          width: "70%",
                        }}
                      >
                        <Select
                          mode="multiple"
                          style={{
                            width: "100%",
                          }}
                          placeholder="Loại hàng"
                          allowClear
                          optionLabelProp="label"
                        >
                          {classify2?.map((com, i) => (
                            <Option key={com} value={com.name}>
                              {com.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                );
              })}
            </Row>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              style={{
                position: "absolute",
                bottom: -1,
                right: 30,
                zIndex: 100,
              }}
            >
              <Button
                type="primary"
                style={{ background: "#fff", color: "#1890ff" }}
                htmlType="submit"
              >
                Hoàn thành
              </Button>
            </Form.Item>
          </Form>
        )}
        {(classify1 !== undefined ||
          classify2 !== undefined ||
          dataTh1?.classify1 !== undefined) && (
          <React.Fragment>
            <hr style={{ margin: "30px 0" }} />
            <div style={{ display: "flex", width: "100%" }}>
              <span
                style={{
                  color: "#ee4d2d",
                  fontWeight: "400",
                  width: "30%",
                  fontSize: 18,
                }}
              >
                Chọn ảnh cho từng mẫu hàng
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "70%",
                }}
              >
                {dataCheck?.map((item) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginLeft: 10,
                        position: "relative",
                      }}
                      key={item}
                    >
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={Upload1}
                        onClick={() => setSelectImage(item)}
                      >
                        {item.url !== undefined ? (
                          <div className="box-image">
                            <img src={item.url} className="image" />
                          </div>
                        ) : (
                          <div>
                            <div
                              style={{
                                marginTop: 8,
                              }}
                            >
                              {loading1 == true ? (
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
                      <span
                        style={{
                          color: "#ee4d2d",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.name}
                      </span>

                      {item.url !== undefined && (
                        <div
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: -10,
                            right: -0,
                            color: "#ee4d2d",
                          }}
                          onClick={() => removeImgae(item)}
                        >
                          <CloseCircleOutlined style={{ fontSize: 17 }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          margin: "10px 0",
          padding: "10px 20px",
        }}
      >
        <div style={{ cursor: "not-allowed" }}>
          <h4 style={{ fontWeight: "600", fontSize: 18 }}>Vận chuyển</h4>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              style={{ display: "flex", alignItems: "center", width: "25%" }}
            >
              <span style={{ color: "#ee4d2d", fontWeight: "700" }}>*</span>
              <span style={{ fontWeight: "500" }}>
                Cân nặng (sau khi gói hàng)
              </span>
            </div>
            <Input
              placeholder="Nhập vào"
              addonAfter={"gr"}
              style={{ width: "50%" }}
              disabled={true}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "10px 0",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "25%" }}
            >
              <span style={{ color: "#ee4d2d", fontWeight: "700" }}>*</span>

              <span style={{ fontWeight: "500" }}>Phí vận chuyển</span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "75%" }}
            >
              <div
                style={{
                  background: "#f5f5f5",
                  border: "1px solid #fffffff8",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 0",
                    borderRadius: 3,
                  }}
                >
                  <RightOutlined
                    style={{
                      fontSize: 13,
                      marginRight: 10,
                      cursor: "not-allowed",
                    }}
                  />
                  <div style={{ fontSize: 13, position: "relative" }}>
                    <span>Nhanh</span>{" "}
                    <span className="shope_transport">SHOPEE VẬN CHUYỂN</span>
                  </div>
                </div>
                <div>
                  <span style={{ color: "#999", fontSize: 12 }}>
                    Đơn vị vận chuyển không được hỗ trợ.
                  </span>
                  <Switch defaultChecked disabled />
                </div>
              </div>
              <span style={{ color: "gray" }}>
                Cài đặt đơn vị vận chuyển ở đây chỉ áp dụng cho sản phẩm này.
              </span>
            </div>
          </div>
          <span style={{ color: "red", textAlign: "center" }}>
            Vận chuyển tạm thời chưa phát hành!
          </span>
        </div>
      </div>
      {imageUrl.length > 0 && (
        <div
          // className="button_save"
          style={{
            background: "#fff",
            height: 50,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Button
            style={{
              background: "#ee4d2d",
              color: "#fff",
              marginRight: 120,
              border: 0,
            }}
            type="primary"
            onClick={() => close()}
          >
            Hủy
          </Button>
          {/* <Button
            style={{ background: "#fff", color: "#1890ff" }}
            type="primary"
            onClick={() => complete()}
          >
            Hoàn tất
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default SalesInfor;
