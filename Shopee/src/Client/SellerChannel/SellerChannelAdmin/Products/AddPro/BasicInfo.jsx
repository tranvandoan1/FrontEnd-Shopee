import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import "../../../../Page/Css/Css/AddPro.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../Page/Css/CssModule/AddPro.module.css";
import { storage } from "../../../../../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  addTake,
  uploadCheckList,
  uploadTake1,
} from "../../../../../reducers/DataAddProSlice";
import { getAllData } from "./../../../../../reducers/AllData";
import { useRef } from "react";
import Editor from "react-simple-code-editor";

const { TextArea } = Input;
const BasicInfo = () => {
  const dispatch = useDispatch();
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();
  const [imageUrl4, setImageUrl4] = useState();
  const [imageUrl5, setImageUrl5] = useState();
  const [imageUrlAvatar, setImageUrlAvatar] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const dataaddpro = useSelector((data) => data.dataaddpro.value);
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  const Upload1 = (file) => {
    // const imageRef = ref(storage, `images/${file.name}`);
    setLoading1(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrl1(url);

    //     setLoading1(false);
    //   });
    // });
    console.log(file, "ewdqwqwe");

    const src = URL.createObjectURL(file);
    setImageUrl1({ url: src, file: JSON.stringify(file) });
    setLoading1(false);
  };
  const Upload2 = (file) => {
    // const imageRef = ref(storage, `images/${file.name}`);
    setLoading2(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrl2(url);

    //     setLoading2(false);
    //   });
    // });
    const src = URL.createObjectURL(file);
    setImageUrl2({ url: src, file: JSON.stringify(file) });
    setLoading2(false);
  };
  const Upload3 = (file) => {
    // const imageRef = ref(storage, `images/${file.name}`);
    setLoading3(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrl3(url);

    //     setLoading3(false);
    //   });
    // });
    const src = URL.createObjectURL(file);
    setImageUrl3({ url: src, file: JSON.stringify(file) });
    setLoading3(false);
  };
  const Upload4 = (file) => {
    // const imageRef = ref(storage, `images/${file.name}`);
    setLoading4(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrl4(url);

    //     setLoading4(false);
    //   });
    // });
    const src = URL.createObjectURL(file);
    setImageUrl4({ url: src, file: JSON.stringify(file) });
    setLoading4(false);
  };
  const Upload5 = (file) => {
    // const imageRef = ref(storage, `images/${file.name}`);
    setLoading5(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrl5(url);

    //     setLoading5(false);
    //   });
    // });
    const src = URL.createObjectURL(file);
    setImageUrl5({ url: src, file: JSON.stringify(file) });
    setLoading5(false);
  };
  const UploadAvatatr = (file) => {
    // const imageRef = ref(storage, `images/${file.name}`);
    setLoading(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrlAvatar(url);
    //     setLoading(false);
    //   });
    // });
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: JSON.stringify(file) });
    setLoading(false);
  };

  const onFinish = (values) => {
    const data = {
      // photo1: imageUrl1
      //   ? imageUrl1
      //   : dataaddpro.take1?.photo1
      //   ? dataaddpro.take1?.photo1
      //   : "",
      // photo2: imageUrl2
      //   ? imageUrl2
      //   : dataaddpro.take1?.photo2
      //   ? dataaddpro.take1?.photo2
      //   : "",
      // photo3: imageUrl3
      //   ? imageUrl3
      //   : dataaddpro.take1?.photo3
      //   ? dataaddpro.take1?.photo3
      //   : "",
      // photo4: imageUrl4
      //   ? imageUrl4
      //   : dataaddpro.take1?.photo4
      //   ? dataaddpro.take1?.photo4
      //   : "",
      // photo5: imageUrl5
      //   ? imageUrl5
      //   : dataaddpro.take1?.photo5
      //   ? dataaddpro.take1?.photo5
      //   : "",
      photo: imageUrlAvatar
        ? imageUrlAvatar
        : dataaddpro.take1?.photo
        ? dataaddpro.take1?.photo
        : "",
      name:
        values.name == undefined
          ? dataaddpro.take1?.name == undefined
            ? values.name
            : dataaddpro.take1?.name
          : values.name,
      cate_id:
        dataaddpro.take1?.cate_id == undefined
          ? values.cate_id
          : dataaddpro.take1?.cate_id,
      description:
        values.description == undefined
          ? dataaddpro.take1?.description == undefined
            ? values.description
            : dataaddpro.take1?.description
          : values.description,
    };

    dispatch(addTake({ data: data, check: 1 }));
    dispatch(uploadCheckList(2));
  };
  // const editorRef = useRef();
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  // const focus = () => {
  //   editorRef.current.focus();
  // };
  return (
    <div style={{ background: "#fff" }}>
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
                {imageUrlAvatar || dataaddpro.take1?.photo ? (
                  <div className="box-image">
                    <img
                      src={
                        imageUrlAvatar
                          ? imageUrlAvatar.url
                          : dataaddpro.take1?.photo.url !== "" &&
                            dataaddpro.take1.photo.url
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
              {(imageUrlAvatar !== undefined || dataaddpro.take1?.photo) && (
                <div
                  className={styles.close}
                  onClick={() => (
                    setImageUrlAvatar(),
                    dispatch(
                      addTake({
                        data: { ...dataaddpro.take1, photo: "" },
                        check: 1,
                      })
                    )
                  )}
                >
                  <CloseCircleOutlined style={{ fontSize: 17 }} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: 20 }}>
        {/* <Row>
          <Col
            xs={12}
            sm={4}
            md={12}
            lg={4}
            xl={4}
            style={{ textAlign: "right" }}
          >
            <span className={styles.image_title}>Hình ảnh </span>
          </Col>
          <Col xs={12} sm={4} md={12} lg={20} xl={20}>
            <Row>
              <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.uploadImage}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={Upload1}
                  >
                    {imageUrl1 || dataaddpro.take1?.photo1 ? (
                      <div className="box-image">
                        <img
                          src={
                            imageUrl1
                              ? imageUrl1.url
                              : dataaddpro.take1?.photo1.url &&
                                dataaddpro.take1.photo1.url
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
                  <span>Hình 1</span>
                  {(imageUrl1 !== undefined || dataaddpro.take1?.photo1) && (
                    <div
                      className={styles.close}
                      onClick={() => (
                        setImageUrl1(),
                        dispatch(
                          addTake({
                            data: { ...dataaddpro.take1, photo1: "" },
                            check: 1,
                          })
                        )
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>

              <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.uploadImage}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={Upload2}
                  >
                    {imageUrl2 || dataaddpro.take1?.photo2 ? (
                      <div className="box-image">
                        <img
                          src={
                            imageUrl2
                              ? imageUrl2.url
                              : dataaddpro.take1?.photo2.url !== "" &&
                                dataaddpro.take1.photo2.url
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
                          {loading2 == true ? (
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
                  <span>Hình2</span>
                  {(imageUrl2 !== undefined || dataaddpro.take1?.photo2) && (
                    <div
                      className={styles.close}
                      onClick={() => (
                        setImageUrl2(),
                        dispatch(
                          addTake({
                            data: { ...dataaddpro.take1, photo2: "" },
                            check: 1,
                          })
                        )
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>

              <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.uploadImage}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={Upload3}
                  >
                    {imageUrl3 || dataaddpro.take1?.photo3 ? (
                      <div className="box-image">
                        <img
                          src={
                            imageUrl3
                              ? imageUrl3.url
                              : dataaddpro.take1?.photo3.url !== "" &&
                                dataaddpro.take1.photo3.url
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
                          {loading3 == true ? (
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
                  <span>Hình 3</span>
                  {(imageUrl3 !== undefined || dataaddpro.take1?.photo3) && (
                    <div
                      className={styles.close}
                      onClick={() => (
                        setImageUrl3(),
                        dispatch(
                          addTake({
                            data: { ...dataaddpro.take1, photo3: "" },
                            check: 1,
                          })
                        )
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.uploadImage}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={Upload4}
                  >
                    {imageUrl4 || dataaddpro.take1?.photo4 ? (
                      <div className="box-image">
                        <img
                          src={
                            imageUrl4
                              ? imageUrl4.url
                              : dataaddpro.take1?.photo4.url !== "" &&
                                dataaddpro.take1.photo4.url
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
                          {loading4 == true ? (
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
                  <span>Hình 4</span>
                  {(imageUrl4 !== undefined || dataaddpro.take1?.photo4) && (
                    <div
                      className={styles.close}
                      onClick={() => (
                        setImageUrl4(),
                        dispatch(
                          addTake({
                            data: { ...dataaddpro.take1, photo4: "" },
                            check: 1,
                          })
                        )
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.uploadImage}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={Upload5}
                  >
                    {imageUrl5 || dataaddpro.take1?.photo5 ? (
                      <div className="box-image">
                        <img
                          src={
                            imageUrl5
                              ? imageUrl5.url
                              : dataaddpro.take1?.photo5.url !== "" &&
                                dataaddpro.take1.photo5.url
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
                          {loading5 == true ? (
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
                  <span>Hình 5</span>
                  {(imageUrl5 !== undefined || dataaddpro.take1?.photo5) && (
                    <div
                      className={styles.close}
                      onClick={() => (
                        setImageUrl5(),
                        dispatch(
                          addTake({
                            data: { ...dataaddpro.take1, photo5: "" },
                            check: 1,
                          })
                        )
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row> */}
      </div>
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
              (dataaddpro.take1?.name == undefined || name == "") && {
                required: true,
                message: "Bạn chưa nhập tên sản phẩm!",
              },
            ]}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên sản phẩm"
              defaultValue={
                dataaddpro.take1?.name == undefined
                  ? ""
                  : dataaddpro.take1?.name
              }
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            onChange={(e) => setDescription(e.target.value)}
            labelAlign="left"
            name="description"
            rules={[
              (dataaddpro.take1?.description == undefined ||
                description == "") && {
                required: true,
                message: "Bạn chưa nhập mô tả!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Mô tả"
              showCount
              defaultValue={
                dataaddpro.take1?.description == undefined
                  ? ""
                  : dataaddpro.take1?.description
              }
            />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            labelAlign="left"
            name="cate_id"
            rules={[
              dataaddpro.take1?.cate_id == undefined && {
                required: true,
                message: "Bạn chưa chọn danh mục!",
              },
            ]}
          >
            <Select
              placeholder="Chọn danh mục"
              defaultValue={
                dataaddpro.take1?.cate_id == undefined
                  ? ""
                  : `${
                      data.cateshopee?.find(
                        (item) => item._id == dataaddpro.take1?.cate_id
                      ).name
                    }`
              }
            >
              {data.cateshopee?.map((item) => (
                <Select.Option value={item._id}>{item.name}</Select.Option>
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
    </div>
  );
};

export default BasicInfo;
