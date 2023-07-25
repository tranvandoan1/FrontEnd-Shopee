import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Space, Spin, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Css/AdminCate.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSlider, uploadSliders } from "./../../reducers/SliderSlice";
import { openNotificationWithIcon } from "../../Notification";
import { upload } from "./../../API/Slider";

const Slider = () => {
  const dispatch = useDispatch();
  const slides = useSelector((data) => data.slide.value);
  useEffect(() => {
    dispatch(getSlider());
  }, []);
  const uploadStatus = async (data) => {
    const new_slider_status = [];
    
    for (let i = 0; i < slides.length; i++) {
      let formData = new FormData();
      if (slides[i]._id == data._id) {
        if (data.status == 1) {
          new_slider_status.push({ ...slides[i], status: 2 });
          formData.append("status", 2);
          await upload(data._id, formData);
        } else if (data.status == 2) {
          new_slider_status.push({ ...slides[i], status: 1 });
          formData.append("status", 1);
          await upload(data._id, formData);
        }
      } else {
        new_slider_status.push(slides[i]);
      }
    }

    dispatch(uploadSlider(new_slider_status));
    openNotificationWithIcon("success", "Cập nhật thành công");
  };
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <img src={photo} alt="" style={{ width: 150 }} />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, data) => (
        <Switch
          checked={status == 1 ? false : true}
          onChange={() => uploadStatus(data)}
        />
      ),
    },
    {
      title: "Số thứ tự",
      dataIndex: "ordinal_number",
      key: "ordinal_number",
    },
    {
      title: "Thao tác",
      render: (data) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <Link to={`/admin/slider/edit=${data._id}`}>
              <EditOutlined />
            </Link>
          </Space>
          <Space size="middle">
            <a>
              <DeleteOutlined onClick={() => deleteCate(data._id)} />
            </a>
          </Space>
        </>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid gainsboro",
        }}
      >
        <h3 className={styles.title}>Slider ảnh</h3>
        <Button>
          <Link to="add">
            <PlusOutlined />
            Thêm slider
          </Link>
        </Button>
      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >
        <Table
          dataSource={slides}
          columns={columns}
          bordered
          rowKey={(item) => item._id}
          style={{
            marginTop: 20,
            textTransform: "capitalize",
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
