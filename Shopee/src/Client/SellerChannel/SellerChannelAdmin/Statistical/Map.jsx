import React, { useState, useEffect, useRef } from "react";
import { Bar, Line } from "@ant-design/charts";
import "../../../Page/Css/Css/SellerChannel.css";
import styles from "../../../Page/Css/CssModule/Statistical.module.css";
import { Descriptions, Select } from "antd";
const Map = () => {
  const data = [
    {
      year: "Thứ 2",
      price: 31111,
    },
    {
      year: "Thứ 3",
      price: 12345,
    },
    {
      year: "Thứ 4",
      price: 563434,
    },
    {
      year: "Thứ 5",
      price: 132213,
    },
    {
      year: "Thứ 6",
      price: 31523111,
    },
    {
      year: "Thứ 7",
      price: 12541324,
    },
    {
      year: "Chủ nhật",
      price: 414112,
    },
  ];

  const config = {
    data,
    yField: "price",
    xField: "year",
    tooltip: {
      customContent: (title, items) => {
        return (
          <>
            <h5 style={{ marginTop: 16 }}>{title}</h5>
            <ul style={{ paddingLeft: 0 }}>
              {items?.map((item, index) => {
                const { name, value, color } = item;
                return (
                  <li
                    key={item.year}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{
                      marginBottom: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="g2-tooltip-marker"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span
                      style={{
                        display: "inline-flex",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ margiRight: 16 }}>
                        Tiền : {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    },
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#2593fc",
        lineWidth: 2,
      },
    },
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      {" "}
      <div className={styles.header_map}>
        <h4 className={styles.title}>
          Doanh thu bán hàng{" "}
          <span style={{ fontWeight: 400, fontSize: 12 }}>
            ( Hôm nay 00:00 GMT+7 10:00 )
          </span>
        </h4>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Select.Option value="jack">Hôm nay</Select.Option>
          <Select.Option value="lucy">Tháng này</Select.Option>
          <Select.Option value="Yiminghe">Năm nay</Select.Option>
        </Select>
      </div>
      <div className={styles.list_flex}>
        <div style={{ width: "65%" }}>
          <h4 style={{ fontWeight: 600 }}>Doanh số</h4>
          <br />
          <Line {...config} style={{ height: 300 }} />
        </div>
        <Descriptions
          bordered
          style={{ width: "35%", marginLeft: 30, borderRightColor: "#fff" }}
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
        >
          <Descriptions.Item style={{ border: 0 }}>
            <div className={styles.cate}>
              <span style={{ fontWeight: "500", fontSize: 13 }}>
                Chờ xác nhận
              </span>
              <span className={styles.listLengthMap}>1</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item style={{ border: 0 }}>
            <div className={styles.cate}>
              <span style={{ fontWeight: "500", fontSize: 13 }}>
                Chờ lấy hàng
              </span>
              <span className={styles.listLengthMap}>0</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item style={{ border: 0 }}>
            <div className={styles.cate}>
              <span style={{ fontWeight: "500", fontSize: 13 }}>
                Đang xử lý
              </span>
              <span className={styles.listLengthMap}>0</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item style={{ border: 0 }}>
            <div className={styles.cate}>
              <span style={{ fontWeight: "500", fontSize: 13 }}>Đơn hủy</span>
              <span className={styles.listLengthMap}>0</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item style={{ border: 0 }}>
            <div className={styles.cate}>
              <span style={{ fontWeight: "500", fontSize: 13 }}>
                Sản phẩm hết hàng
              </span>
              <span className={styles.listLengthMap}>1</span>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default Map;
