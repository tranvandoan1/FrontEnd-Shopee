import {
  CloseCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
  notification,
} from "antd";
import React, { useState, startTransition } from "react";
import "../../../../Page/Css/Css/AddPro.css";
import styles from "../../../../Page/Css/CssModule/AddPro.module.css";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { TextArea } = Input;
const BasicInfo = ({ callBack, state, setImageUrlAvatar, product, dataAll }) => {
  const { id } = useParams();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();


  const [dataValidate, setDataValidate] = useState({
    name: product?.name,
    description: product?.description,
    sale: product?.sale,
    cate_id: product?.cate_id
  })
  const cateShops = dataAll?.cateshops?.filter(
    (item) => item.shopowner_id == atob(id)
  );
  console.log(cateShops, 'cateShops')
  const UploadAvatatr = (file) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file });
    setLoading(false);
  };
  const [content, setContent] = useState("");

  function handleChange(value) {
    setContent(value);
  }
  const onFinish = (values) => {
    console.log(state?.dataBasicInfo, 'state?.dataBasicInfo?.cate_id')
    console.log(values, 'values')
    if (
      state?.imageUrlAvatar == undefined &&
      (state?.dataBasicInfo?.name == undefined ||
        state?.dataBasicInfo?.name == "")
    ) {
      api["error"]({
        message: "Cảnh báo",
        description: "Chưa chọn ảnh !",
      });
    } else {
      const data = {
        photo: state?.imageUrlAvatar == undefined ? product?.photo : state?.imageUrlAvatar,
        name:
          values.name == undefined ? state?.dataBasicInfo?.name : values.name,
        cate_id:
          values.cate_id !== undefined
            ? values.cate_id
            : state?.dataBasicInfo?.cate_id,
        description: (content == '' || content == undefined) ? product?.description : JSON.stringify(content),
        sale:
          values.sale == undefined ? state?.dataBasicInfo?.sale : values.sale,
        image_id: product?.image_id

      };
      callBack({ data: data, check: 2 });
    }
  };
  return (
    <div style={{ background: "#fff" }}>
      {contextHolder}
      {
        product &&
        <React.Fragment>
          <div style={{ paddingTop: 30 }}>
            <Row>
              <Col
                xs={12}
                sm={4}
                md={12}
                lg={4}
                xl={4}
                style={{ textAlign: "left", padding: "0 30px" }}
              >
                <span className={styles.image_title}>Ảnh bìa</span>
              </Col>
              <Col xs={12} sm={4} md={12} lg={20} xl={20}>
                <div className={styles.uploadImage} style={{ marginLeft: 12 }}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={UploadAvatatr}
                  >
                    {state?.imageUrlAvatar ||
                      state?.dataBasicInfo?.photo ||
                      product ? (
                      <div className="box-image">
                        <img
                          src={
                            state?.imageUrlAvatar
                              ? state?.imageUrlAvatar.url
                              : state?.dataBasicInfo == undefined ?
                                product?.photo :
                                state?.dataBasicInfo?.photo
                          }
                          className="image"
                        />
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
                  {(state?.imageUrlAvatar !== undefined) && (
                    <div
                      className={styles.close}
                      onClick={() => (
                        setImageUrlAvatar(undefined),
                        callBack({
                          data: { ...state?.dataBasicInfo, photo: "" },
                          check: 1,
                        })
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: 20 }}></div>
          <div style={{ marginTop: 20, padding: "20px" }}>

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
                label="Tên sản phẩm"
                name="name"
                labelAlign="left"
                rules={[
                  (state?.dataBasicInfo?.name == undefined) && {
                    required: true,
                    message: "Bạn chưa nhập tên sản phẩm!",
                  },
                ]}
              >
                <Input
                  placeholder="Tên sản phẩm"
                  defaultValue={
                    state?.dataBasicInfo?.name == undefined
                      ? product?.name
                      : state?.dataBasicInfo?.name
                  }
                />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                labelAlign="left"
                name="description"
                rules={[
                  (state?.dataBasicInfo?.description == undefined) && {
                    required: true,
                    message: "Bạn chưa nhập mô tả!",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}

                  data={product ? JSON?.parse(product?.description) : ''}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data, 'data')
                    startTransition(() => {
                      setContent(data);
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Giảm giá"
                name="sale"
                labelAlign="left"
                rules={[
                  (state?.dataBasicInfo?.name == undefined) && {
                    required: true,
                    message: "Bạn chưa nhập giảm giá!",
                  },
                ]}
                style={{ marginTop: 80 }}
              >
                <Input
                  placeholder="Giảm giá"
                  type="number"
                  max={100}
                  min={0}
                  defaultValue={
                    state?.dataBasicInfo?.sale == undefined
                      ? product?.sale
                      : state?.dataBasicInfo?.sale
                  }
                />
              </Form.Item>
              <Form.Item
                label="Danh mục"
                labelAlign="left"
                name="cate_id"
                rules={[
                  state?.dataBasicInfo?.cate_id == undefined && {
                    required: true,
                    message: "Bạn chưa chọn danh mục!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  defaultValue={
                    product.cate_id
                  }
                >
                  {cateShops?.map((item) => (
                    <Select.Option value={item._id}>  <span
                      style={{
                        textTransform: "capitalize",
                        fontSize: 13,
                      }}
                    >
                      {item.name}
                    </span></Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 22,
                  span: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Tiếp
                  <RightOutlined />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </React.Fragment>
      }

    </div>
  );
};

export default BasicInfo;
