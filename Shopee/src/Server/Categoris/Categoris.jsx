import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import styles from "../Css/AdminCate.module.css";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCate, removeCate } from "./../../reducers/CategoriSlice";
import "../Css/AdminCate.css";
import { remove } from "./../../API/Categoris";
import { openNotificationWithIcon } from "../../Notification";
const Categoris = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getAllCate());
  }, []);
  const deleteCate = async (id) => {
    if (confirm("Bạn có muốn xóa không ?")) {
      await remove(id);
      dispatch(removeCate({ id: id, data: categoris }));
      navigate("/admin/categoris");
      openNotificationWithIcon("success", "Thêm thành công thành công ");
    }
  };
  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <img src={photo} style={{ width: "100%" }} alt="" />,
      width: 120,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      render: (data) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <Link to={`/admin/categoris/edit=${data._id}`}>
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
          alignItems: "center",
          borderBottom: "1px solid gainsboro",
        }}
      >
        <h3 className={styles.title}>Danh mục sản phẩm</h3>
        <Button>
          <Link to="add">
            <PlusOutlined />
            Thêm danh mục
          </Link>
        </Button>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Table
          dataSource={categoris}
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

export default Categoris;
