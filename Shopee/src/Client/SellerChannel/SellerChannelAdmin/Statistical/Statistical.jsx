import { Descriptions } from "antd";
import React, { useEffect } from "react";
import styles from "../../../Page/Css/CssModule/Statistical.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllData } from "../../../../reducers/AllData";
import Map from "./Map";
const Statistical = () => {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  
  return (
    <div className={styles.srcoll}>
      <div style={{ background: "#fff", padding: 24 }}>
        {Object.keys(data).length > 0 && (
          <Descriptions
            title="Thông tin"
            bordered
            column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 4 }}
          >
            <Descriptions.Item>
              <div className={styles.cate}>
                <span className={styles.listLength}>
                  {data.cateshopee.length}
                </span>
                <span>Danh mục</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item>
              <div className={styles.cate}>
                <span className={styles.listLength}>{data?.product?.length}</span>
                <span>Sản phẩm</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item>
              <div className={styles.cate}>
                <span className={styles.listLength}>0</span>
                <span>Đơn hàng</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item>
              <div className={styles.cate}>
                <span className={styles.listLength}>0</span>
                <span>Bình luận</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item>
              <div className={styles.cate}>
                <span className={styles.listLength}>{data?.slide?.length}</span>
                <span>Slide ảnh</span>
              </div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
      <div style={{ background: "#fff", padding: 24, marginTop: 10 }}>
        <Map/>
      </div>
    </div>
  );
};

export default Statistical;
