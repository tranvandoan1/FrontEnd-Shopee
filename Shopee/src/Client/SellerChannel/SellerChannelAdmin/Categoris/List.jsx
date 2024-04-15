import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import styles from "../../../Page/Css/CssModule/Categori.module.css";
import { FaCertificate } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddCateShop from "./AddCateShop";
import CateShopeeAPI, { upload } from "../../../../API/CateShopAPI";
import { openNotificationWithIcon } from "../../../../Notification";
import {
  getCateShop, removeCateShop,
} from "../../../../reducers/CateShop";
import { getShopOwner } from "../../../../reducers/ShopOwner";
import { getAllCate } from "../../../../reducers/CategoriSlice";
import EditCateShop from "./EditCateShop";
import Loading from "../../../../components/Loading";
import ModalComfim from "../../../../components/ModalComfim";
import { useParams } from "react-router-dom";
const List = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const shopowners = useSelector((data) => data.shopowners.value);
  const cateshops = useSelector((data) => data.cateshops.value);
  const categories = useSelector((data) => data.categoris.value);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusEdit, setStatusEdit] = useState({ data: undefined, status: false });
  const [statusEditDelete, setStatusDelete] = useState({ id: undefined, status: false });
  const dataCategoris = cateshops?.filter((item) => item.shopowner_id == atob(id))

  useEffect(() => {
    dispatch(getShopOwner());
    dispatch(getCateShop());
    dispatch(getAllCate());
   
  }, []);
  const deleteCate = async (id) => {
    setLoading(true)
    setStatusDelete({ id: undefined, status: false })
    // console.log(id, '2ewds')
    await dispatch(removeCateShop(statusEditDelete.id));
    setLoading(false)
    message.open({
      type: "success",
      content: 'Cập nhật thành công',
      duration: 1,
    });
  };
  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục quản lý",
      dataIndex: "categorie_id",
      key: "age",
      render: (categorie_id) =>
        categories?.map(
          (item) =>
            item._id == categorie_id && (
              <span style={{ textTransform: "capitalize" }}>{item.name}</span>
            )
        ),
    },

    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <div style={{ cursor: "pointer" }} onClick={() => setStatusEdit({ data: data, status: true })}>
              <EditOutlined />
            </div>
          </Space>
          <Space size="middle">
            <DeleteOutlined onClick={() => setStatusDelete({ id: _id, status: true })} />
          </Space>
        </>
      ),
    },
  ];



  return (
    <div style={{ background: "#fff", height: "100vh", padding: 20 }}>
      {
        loading == true &&
        <Loading />

      }
      <div className={styles.header}>
        <h3 style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
          <FaCertificate
            style={{ fontSize: 20, marginRight: 10, color: "blue" }}
          />
          Danh mục
        </h3>
        <Button type="primary" onClick={() => setStatus(true)}>
          Thêm danh mục
        </Button>

      </div>
      {dataCategoris.length > 0 && (
        <Table
          dataSource={dataCategoris}
          columns={columns}
          rowKey={(item) => item._id}
        />
      )}
      {
        status == true &&
        <AddCateShop status={status} callBack={() => setStatus(false)} shopowners={shopowners} callLoading={(e) => setLoading(e)} />
      }
      {
        statusEdit.status == true &&
        <EditCateShop status={statusEdit.status} callBack={() => setStatusEdit({ data: undefined, status: false })} dataEdit={statusEdit.data} callLoading={(e) => setLoading(e)} />
      }
      <ModalComfim title={'Xóa danh mục của Shop'} content={'Bạn có muốn xóa không ?'} status={statusEditDelete.status} callBack={() => deleteCate()} />
    </div>
  );
};

export default List;
