import {
  Button,
  Descriptions,
  Divider,
  Popconfirm,
  Radio,
  Space,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from "../../../Page/Css/CssModule/Categori.module.css";
import { FaCertificate } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCate, uploadCheckList } from "../../../../reducers/DataAddProSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { SizeScale } from "../../../../actions/Size/Size";
import {
  getProductAll,
  removeProduct,
  removeProducts,
} from "../../../../reducers/Products";
import { getAllClassifies } from "../../../../reducers/Classifies";
import { removes } from "../../../../API/ClassifyAPI";

const ListPro = () => {
  const size = SizeScale();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams()
  const [dataDeletePro, setDataDeletePro] = useState();
  const [textPro, setTextPro] = useState({ status: false, id: null });
  const products = useSelector((data) => data.products.value);
  const categoris = useSelector((data) => data.categoris.value);
  const classifies = useSelector((data) => data.classifies.value);
  const dataProducts = products?.map((item) => {
    return { ...item, key: item?._id };
  });
  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getCate());
    dispatch(getAllClassifies());
  }, []);

  const deletet = async (id) => {
    if (id == undefined) {
      await dispatch(removeProducts(dataDeletePro));
      message.success("Xóa thành công  ");
      setDataDeletePro(undefined);
    } else {
      const product = products.find((item) => item._id == id);
      const idClassifies = [];
      classifies.map((item) => {
        if (item.linked == product.linked) {
          idClassifies.push(item._id);
        }
      });

      await dispatch(removeProduct(id));
      removes(idClassifies);
      message.success("Xóa thành công  ");
      setDataDeletePro(undefined);
    }
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Ảnh",
      dataIndex: "photo",
      key: "photo",
      width: "40%",
      render: (item) => <img src={item} className={styles["image_product"]} />,
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
      render: (item) =>
        item == undefined || item == null || item == 0 ? (
          <p style={{ color: "red", fontWeight: "700" }}>0%</p>
        ) : (
          <p style={{ color: "#00CC00", fontWeight: "700" }}>{item}%</p>
        ),
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => (
        <>
          <Space size="middle" style={{ marginRight: 10, cursor: "pointer" }} >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`edit=${_id}`)}
            >
              <EditOutlined style={{ color: "#00CC00", fontSize: 16 }} />
            </div>
          </Space>
          {dataDeletePro == undefined || dataDeletePro?.length <= 0 ? (
            <Popconfirm
              title="Bạn có muốn xóa không !"
              description="Are you sure to delete this task?"
              onConfirm={() => deletet(_id)}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
            </Popconfirm>
          ) : null}
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setTextPro({ status: false, id: null });
      setDataDeletePro(selectedRowKeys);
    },
  };
  const handleRow = (record) => ({
    // onClick: () => console.log('first')
  });

  const handleExpand = (expanded, record) => {
    if (expanded) {
      setTextPro(
        { status: false, id: null }
      )
    } else {
      setTextPro(
        { status: false, id: null }
      )
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        height: "100vh",
        padding: 20,
        overflow: "auto",
        paddingBottom: 100,
      }}
    >
      <div className={styles.header}>
        <h3 style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
          <FaCertificate
            style={{ fontSize: 20, marginRight: 10, color: "blue" }}
          />
          Sản phẩm ({products?.length})
        </h3>
        {dataDeletePro == undefined || dataDeletePro?.length <= 0 ? (
          <Link to="add">
            <Button onClick={() => dispatch(uploadCheckList(1))}>
              Thêm sản phẩm
            </Button>
          </Link>
        ) : (
          <div>
            <Button
              type="primary"
              danger
              style={{ marginRight: 10 }}
              onClick={() => deletet()}
            >
              Xóa
            </Button>
            <Button type="primary" onClick={() => setDataDeletePro()}>
              Hủy
            </Button>
          </div>
        )}
      </div>
      <div className={styles["table-list_pro"]}>
        <Table
          columns={columns}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <div key={record} className={styles["table-product"]}>
                  <Descriptions>
                    {categoris?.map((item) => {
                      if (item._id == record.cate_id) {
                        return (
                          <Descriptions.Item
                            label={
                              <span style={{ fontSize: 15 }}>Danh mục</span>
                            }
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                              }}
                            >
                              {item.name}
                            </p>
                          </Descriptions.Item>
                        );
                      }
                    })}

                    {record?.view && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Lượt xem</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.view}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_classification && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>Tên phân loại</span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_classification}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_commodityvalue && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>
                            {<span style={{ fontSize: 15 }}>Lượt xem</span>}
                          </span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_commodityvalue}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.linked && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nguồn gốc</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.linked}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.origin && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nguồn gốc</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.origin}
                        </p>
                      </Descriptions.Item>
                    )}

                    {record?.sent_from && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Gửi từ</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.sent_from}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.trademark && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nhãn hiệu</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.trademark}
                        </p>
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  <div className={styles["pro-detail"]}>
                    <p style={{ fontSize: 15 }}>Chi tiết sản phẩm</p>
                    <p
                      style={{ width: "100%", fontSize: 14 }}
                      dangerouslySetInnerHTML={{
                        __html:
                          textPro.id == record._id
                            ? JSON.parse(record?.description)
                            : JSON.parse(record?.description).substring(
                              0,
                              String(JSON.parse(record?.description)).length /
                              10
                            ) + "...",
                      }}
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        setTextPro(
                          textPro.id == record._id
                            ? { status: false, id: null }
                            : { status: true, id: record._id }
                        )
                      }
                    >
                      {textPro.id !== record._id ? "Xem thêm" : "Rút gọn"}
                    </Button>
                  </div>
                </div>
              );
            },
            onExpand: handleExpand,//ấn hiện chi tiết
          }}
          onRow={handleRow}//ấn vào chọn td
          dataSource={dataProducts?.slice().reverse()}
        />
      </div>
    </div>
  );
};

export default ListPro;
