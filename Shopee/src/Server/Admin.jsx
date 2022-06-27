import React, { useState } from "react";
import "antd/dist/antd.css";
import "../App.css";
import { Avatar, Layout, Menu } from "antd";
import styles from "./Css/admin.module.css";
import { FaProductHunt, FaCertificate } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, itemIcon) {
  return {
    label,
    key,
    icon,
    itemIcon,
  };
}
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    getItem("Danh mục", "1", <FaCertificate />, <Link to="categoris" />),
    getItem("Sản phẩm", "2", <FaProductHunt />),
    getItem("Slider", "3", <FaProductHunt />,<Link to="slider" />),
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo}>
          <Avatar
            size={50}
            src="https://img.websosanh.vn/v2/users/review/images/4wvuq0i4ozs1q.jpg?compress=85"
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className={styles.header}>
          <span>
            ADMIN :{" "}
            <span style={{ color: "red", fontWeight: "600" }}>tranvandoan</span>{" "}
          </span>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              height: "100vh",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
