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
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading1(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        await setImageUrl1(url);

        setLoading1(false);
      });
    });
  };
  const Upload2 = (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading2(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        await setImageUrl2(url);

        setLoading2(false);
      });
    });
  };
  const Upload3 = (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading3(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        await setImageUrl3(url);

        setLoading3(false);
      });
    });
  };
  const Upload4 = (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading4(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        await setImageUrl4(url);

        setLoading4(false);
      });
    });
  };
  const Upload5 = (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading5(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        await setImageUrl5(url);

        setLoading5(false);
      });
    });
  };
  const UploadAvatatr = (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        await setImageUrlAvatar(url);
        setLoading(false);
      });
    });
  };

  const onFinish = (values) => {
    const data = {
      photo1: imageUrl1
        ? imageUrl1
        : dataaddpro.take1?.photo1
        ? dataaddpro.take1?.photo1
        : "",
      photo2: imageUrl2
        ? imageUrl2
        : dataaddpro.take1?.photo2
        ? dataaddpro.take1?.photo2
        : "",
      photo3: imageUrl3
        ? imageUrl3
        : dataaddpro.take1?.photo3
        ? dataaddpro.take1?.photo3
        : "",
      photo4: imageUrl4
        ? imageUrl4
        : dataaddpro.take1?.photo4
        ? dataaddpro.take1?.photo4
        : "",
      photo5: imageUrl5
        ? imageUrl5
        : dataaddpro.take1?.photo5
        ? dataaddpro.take1?.photo5
        : "",
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
  return (
    <div>
      <div style={{ marginTop: 50 }}>
        <Row>
          <Col
            xs={12}
            sm={4}
            md={12}
            lg={4}
            xl={4}
            style={{ textAlign: "right" }}
          >
            <span className={styles.image_title}>???nh b??a</span>
          </Col>
          <Col xs={12} sm={4} md={12} lg={20} xl={20}>
            <div className={styles.uploadImage}>
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
                          ? imageUrlAvatar
                          : dataaddpro.take1?.photo !== "" &&
                            dataaddpro.take1.photo
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
                            opacity: 0.3,
                            color: "blue",
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
        <Row>
          <Col
            xs={12}
            sm={4}
            md={12}
            lg={4}
            xl={4}
            style={{ textAlign: "right" }}
          >
            <span className={styles.image_title}>H??nh ???nh </span>
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
                              ? imageUrl1
                              : dataaddpro.take1?.photo1 &&
                                dataaddpro.take1.photo1
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
                                opacity: 0.3,
                                color: "blue",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Upload>
                  <span>H??nh 1</span>
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
                              ? imageUrl2
                              : dataaddpro.take1?.photo2 !== "" &&
                                dataaddpro.take1.photo2
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
                                opacity: 0.3,
                                color: "blue",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Upload>
                  <span>H??nh2</span>
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
                              ? imageUrl3
                              : dataaddpro.take1?.photo3 !== "" &&
                                dataaddpro.take1.photo3
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
                                opacity: 0.3,
                                color: "blue",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Upload>
                  <span>H??nh 3</span>
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
                              ? imageUrl4
                              : dataaddpro.take1?.photo4 !== "" &&
                                dataaddpro.take1.photo4
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
                                opacity: 0.3,
                                color: "blue",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Upload>
                  <span>H??nh 4</span>
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
                              ? imageUrl5
                              : dataaddpro.take1?.photo5 !== "" &&
                                dataaddpro.take1.photo5
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
                                opacity: 0.3,
                                color: "blue",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Upload>
                  <span>H??nh 5</span>
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
        </Row>
      </div>
      <div style={{ marginTop: 20 }}>
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
            label="T??n s???n ph???m"
            name="name"
            rules={[
              (dataaddpro.take1?.name == undefined || name == "") && {
                required: true,
                message: "B???n ch??a nh???p t??n s???n ph???m!",
              },
            ]}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="T??n s???n ph???m"
              defaultValue={
                dataaddpro.take1?.name == undefined
                  ? ""
                  : dataaddpro.take1?.name
              }
            />
          </Form.Item>
          <Form.Item
            label="M?? t???"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rules={[
              (dataaddpro.take1?.description == undefined ||
                description == "") && {
                required: true,
                message: "B???n ch??a nh???p m?? t???!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="M?? t???"
              showCount
              defaultValue={
                dataaddpro.take1?.description == undefined
                  ? ""
                  : dataaddpro.take1?.description
              }
            />
          </Form.Item>
          <Form.Item
            label="Danh m???c"
            name="cate_id"
            rules={[
              dataaddpro.take1?.cate_id == undefined && {
                required: true,
                message: "B???n ch??a ch???n danh m???c!",
              },
            ]}
          >
            <Select
              placeholder="Ch???n danh m???c"
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
              Ti???p
              <RightOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BasicInfo;
