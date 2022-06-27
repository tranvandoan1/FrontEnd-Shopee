import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllData } from "./../../../../reducers/AllData";
import { useSelector } from "react-redux";
import styles from "../../../Page/Css/CssModule/Categori.module.css";
import { FaCertificate } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uploadCheckList } from "../../../../reducers/DataAddProSlice";

const ListPro = () => {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "Thao tác",
      dataIndex: "sale",
      key: "sale",
    },
  ];

  return (
    <div style={{ background: "#fff", height: "100vh", padding: 20 }}>
      <div className={styles.header}>
        <h3 style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
          <FaCertificate
            style={{ fontSize: 20, marginRight: 10, color: "blue" }}
          />
          Danh mục
        </h3>
        <Link to="add">
          <Button onClick={()=> dispatch(uploadCheckList(1))}>Thêm sản phẩm</Button>
        </Link>
      </div>
      <Table
        dataSource={data?.product}
        rowKey={(item) => item.key}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record}
            </p>
          ),
        }}
      />
    </div>
  );
};

export default ListPro;
