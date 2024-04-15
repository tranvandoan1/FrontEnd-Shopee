import React, { useEffect, useState } from "react";
import styles from "../Css/AdminCate.module.css";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { openNotificationWithIcon } from "../../Notification";
import { useDispatch, useSelector } from "react-redux";
import { getAllCate, uploadCate } from "../../reducers/CategoriSlice";
import { upload } from "../../API/Categoris";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
const EditCate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [close, setClose] = useState(false);
  const { id } = useParams();
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getAllCate());
  }, []);
  const onFinish = async (values) => {
    let cateUploadt = {};
    const newCategoris = [];
    for (let i = 0; i < categoris.length; i++) {
      if (categoris[i]._id == id) {
        newCategoris.push({ ...categoris[i], name: values.name });
        cateUploadt = { ...categoris[i], name: values.name };
      } else {
        newCategoris.push(categoris[i]);
      }
    }
    const photo = document.querySelector("#images").files[0];
    setClose(true);
    if (photo == undefined) {
      let formData = new FormData();
      formData.append("photo", categoris.find((item) => item._id == id).photo);
      formData.append(
        "name",
        cateUploadt.name == undefined
          ? categoris.find((item) => item._id == id).name
          : cateUploadt.name
      );
      await upload(cateUploadt._id, formData);
      dispatch(uploadCate(newCategoris));
      navigate("/admin/categoris");
      openNotificationWithIcon("success", "Sửa thành công thành công ");
    } else {
      const imageRef = ref(storage, `images/${photo.name}`);
      uploadBytes(imageRef, photo).then(() => {
        getDownloadURL(imageRef).then(async (url) => {
          let formData = new FormData();
          formData.append("photo", url);
          formData.append(
            "name",
            cateUploadt.name == undefined
              ? categoris.find((item) => item._id == id).name
              : cateUploadt.name
          );
          await upload(cateUploadt._id, formData);
          dispatch(uploadCate(newCategoris));
          navigate("/admin/categoris");
          openNotificationWithIcon("success", "Sửa thành công thành công ");
        });
      });
    }
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
        <h3 className={styles.title}>Sửa danh mục</h3>
      </div>
      {categoris.length > 0 && (
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
              image
                ? ""
                : {
                    required: true,
                    message: "Bạn chưa có sự thay đổi!",
                  },
            ]}
          >
            <Input
              placeholder="Tên danh mục"
              defaultValue={categoris.find((item) => item._id == id).name}
            />
          </Form.Item>
          <Form.Item label="Ảnh" labelAlign="left" style={{ marginTop: 30 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="images"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "20%",
                  border: " 1px solid rgb(218, 218, 218)",
                  padding: 4,
                  marginRight: 10,
                }}
              >
                <UploadOutlined style={{ margin: "0 10px" }} />{" "}
                <div className={styles.choose_photo}>Chọn ảnh</div>
              </label>

              {image && (
                <Button onClick={() => (setClose(!close), setImage())}>
                  Hủy
                </Button>
              )}
            </div>
            {image ? (
              <img src={image} alt="" style={{ width: "40%", marginTop: 20 }} />
            ) : (
              <img
                src={categoris?.find((item) => item._id == id).photo}
                alt=""
                style={{ width: "40%", marginTop: 20 }}
              />
            )}

            <Input
              type="file"
              name=""
              id="images"
              style={{ display: "none" }}
              onChange={(event) =>
                setImage(URL.createObjectURL(event.target.files[0]))
              }
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditCate;
