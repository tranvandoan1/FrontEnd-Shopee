import React, { useEffect, useState } from "react";
import styles from "../Css/Slider.module.css";
import {
  Button,
  Form,
  Radio,
  Select,
  Spin,
  Upload,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseCircleOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { getSlider, uploadSliders } from "../../reducers/SliderSlice";
const EditSlider = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const sliders = useSelector((data) => data.slide.value);
  const slider = sliders.find((item) => item._id == id);
  const [value, setValue] = useState(slider?.status);
  console.log(slider?.ordinal_number, 'slider?.ordinal_number')
  useEffect(() => {
    dispatch(getSlider());
  }, []);
  console.log(value, 'ádasdasda')
  const onFinish = async (values) => {
    // const photo = document.querySelector("#images").files[0];
    // setLoading(true);
    // const imageRef = ref(storage, `images/${photo.name}`);
    // uploadBytes(imageRef, photo).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     const slider = {
    //       photo: url,
    //       ordinal_number: values.ordinal_number,
    //       status: values.status,
    //     };
    //     await add(slider);
    //     dispatch(uploadSlide(slider));
    //     navigate("/admin/slider");
    //     openNotificationWithIcon("success", "Thêm thành công");
    //     setLoading(false);
    //   });
    // });
    const dataSlider = {
      id: id,
      photo: image.file,
      ordinal_number: values.ordinal_number == undefined ? slider?.ordinal_number : values.ordinal_number,
      status: value,
    };
    console.log(dataSlider,'first')
    await dispatch(uploadSliders(dataSlider));
    console.log('first12312312')

  };
  const UploadAvatatr = (file) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImage({ url: src, file: JSON.stringify(file) });
    setLoading(false);
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
        <h3 className={styles.title}>Sửa ảnh</h3>
      </div>
      <div className={styles["container-slider"]}>
        <div>
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
            <Form.Item label="Ảnh" labelAlign="left" style={{ marginTop: 30 }}>
              <div className={styles.uploadImage} style={{ marginLeft: 12 }}>
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={UploadAvatatr}
                >
                  {image ? (
                    <div className="box-image">
                      <img
                        src={
                          image
                            ? image.url
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
                {image !== undefined && (
                  <div className={styles.close} onClick={() => setImage()}>
                    <CloseCircleOutlined style={{ fontSize: 17 }} />
                  </div>
                )}
              </div>
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              labelAlign="left"
              style={{ marginTop: 30 }}
            >
              {" "}
              <Radio.Group
                onChange={(e) => setValue(e.target.value)}
                value={value}
              >
                <Radio value={1}>Đóng</Radio>
                <Radio value={2}>Mở</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Số thứ tự"
              name="ordinal_number"
              labelAlign="left"
              style={{ marginTop: 30 }}
            >
              <Select placeholder="Chọn số thứ tự" style={{ width: 200 }} defaultValue={slider?.ordinal_number}>
                <Select.Option value={"1"}>1 </Select.Option>
                <Select.Option value={"2"}>2 </Select.Option>
                <Select.Option value={"3"}>3 </Select.Option>
                <Select.Option value={"4"}>4 </Select.Option>
                <Select.Option value={"5"}>5 </Select.Option>
              </Select>
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
        <div className={styles["show-image_slider"]}>
          {slider?.photo ? (
            <img
              src={slider?.photo}
              alt=""
              style={{ width: "40%", marginTop: 20 }}
            />
          ) : (
            <img
              src={slider?.photo}
              alt=""
              style={{ width: "40%", marginTop: 20 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSlider;
