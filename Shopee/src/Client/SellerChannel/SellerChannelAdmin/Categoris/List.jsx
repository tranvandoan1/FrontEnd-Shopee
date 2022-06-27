import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import styles from "../../../Page/Css/CssModule/Categori.module.css";
import { FaCertificate } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddCateShop from "./AddCateShop";
import CateShopeeAPI, { upload } from "./../../../../API/CateShopeeAPI";
import { openNotificationWithIcon } from "../../../../Notification";
import {
  getCateShopee,
  removeCateShop,
  uploadCateShop,
  uploadCateShopee,
} from "../../../../reducers/CateShopee";
import { getAllData } from "./../../../../reducers/AllData";
const List = () => {
  const dispatch = useDispatch();
  const cateshop = useSelector((data) => data.cateshop.value);
  const data = useSelector((data) => data.dataAll.value);
  const [dataEdit, setDataEdit] = useState();
  const [cate, setCate] = useState();
  useEffect(() => {
    dispatch(getCateShopee());
    dispatch(getAllData());
  }, []);
  const deleteCate = async (id) => {
    if (confirm("Bạn có muốn xóa không ?")) {
      await CateShopeeAPI.remove(id);
      dispatch(removeCateShop({ id: id, data: cateshop }));
      openNotificationWithIcon("success", "Xóa thành công");
    }
  };
  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục quản lý",
      dataIndex: "cateShope_id",
      key: "age",
      render: (cateShope_id) =>
        data.categori?.map(
          (item) =>
            item._id == cateShope_id && (
              <span style={{ textTransform: "capitalize" }}>{item.name}</span>
            )
        ),
    },

    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <div style={{ cursor: "pointer" }} onClick={() => showModal(_id)}>
              <EditOutlined />
            </div>
          </Space>
          <Space size="middle">
            <DeleteOutlined onClick={() => deleteCate(_id)} />
          </Space>
        </>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    const cateshopee = data.cateshopee.find((item) => item._id == id);
    setDataEdit(data.cateshopee.find((item) => item._id == id));
    setCate(data.categori.find((item) => item._id == cateshopee.cateShope_id));
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const upload = async (values) => {
    const cateshopee = data.cateshopee;
    const newData = [];
    let dataUpload = {};
    for (let i = 0; i < cateshopee.length; i++) {
      if (cateshopee[i]._id == dataEdit._id) {
        const data = {
          name: values.name == undefined ? dataEdit.name : values.name,
          cateShope_id:
            values.cateShope_id == undefined
              ? dataEdit.cateShope_id
              : values.cateShope_id,
          shopowner_id: dataEdit.shopowner_id,
          _id: dataEdit._id,
        };
        newData.push(data);
        dataUpload = data;
      } else {
        newData.push(cateshopee[i]);
      }
    }
    dispatch(
      uploadCateShopee({
        data: newData,
        dataUpload: dataUpload,
      })
    );
    setIsModalVisible(false);
    openNotificationWithIcon("success", "Sửa thành công thành công ");
  };
  return (
    <div style={{ background: "#fff", height: "100vh", padding: 20 }}>
      <div className={styles.header}>
        <h3 style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
          <FaCertificate
            style={{ fontSize: 20, marginRight: 10, color: "blue" }}
          />
          Danh mục
        </h3>
        <AddCateShop />
      </div>
      {cateshop.length > 0 && (
        <Table
          dataSource={cateshop}
          columns={columns}
          rowKey={(item) => item._id}
        />
      )}
      {dataEdit !== undefined && (
        <Modal
          title="Sửa danh mục"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={upload}
            autoComplete="off"
          >
            <Form.Item label="Tên danh mục" name="name" labelAlign="left">
              <Input placeholder="Tên danh mục" defaultValue={dataEdit.name} />
            </Form.Item>

            <Form.Item
              label="Danh mục shopee"
              name="cateShope_id"
              labelAlign="left"
            >
              {Object.keys(data).length > 0 && (
                <Select
                  placeholder="Danh mục của shop"
                  defaultValue={cate?.name}
                >
                  {data.categori.map((item) => {
                    return (
                      <Select.Option value={item._id}>
                        <span
                          style={{
                            textTransform: "capitalize",
                            fontSize: 13,
                          }}
                        >
                          {item.name}
                        </span>
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
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
              <Button
                onClick={() => setIsModalVisible(false)}
                style={{ marginLeft: 10 }}
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default List;
