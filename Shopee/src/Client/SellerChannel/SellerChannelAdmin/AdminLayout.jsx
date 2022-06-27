import { Link, Outlet } from "react-router-dom";
import "../../Page/Css/Css/AdminLayout.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import { FaProductHunt,FaClipboardList ,FaDumbbell} from "react-icons/fa";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="layout-admin">
      <div className="header-admin">
        <div className="cart-page-logo">
          <Link to="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
              alt=""
            />
          </Link>
          <span style={{ fontSize: 18, paddingTop: 5 }}>
            Quản lý shop của bạn{" "}
          </span>
        </div>
        <div className="cart-page-search">
          <Button>
            <i className="fas fa-sign-out-alt" style={{ marginRight: 5 }}></i>{" "}
            Đăng xuất
          </Button>
        </div>
      </div>
      <Layout style={{ marginTop: 10, height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="#fff"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100vh" }}
            items={[
              {
                key: "1",
                icon: <FaDumbbell />,
                label: "Thống kê",
                itemIcon: <Link to="statistical" />,
              },
              {
                key: "2",
                icon: <FaClipboardList />,
                label: "Danh mục",
                itemIcon: <Link to="categoris" />,
              },
              {
                key: "3",
                icon: <FaProductHunt />,
                label: "Sản phẩm",
                itemIcon: <Link to="products" />,
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Đơn hàng",
              },

              {
                key: "5",
                icon: <UploadOutlined />,
                label: "Bình luận",
              },
              {
                key: "6",
                icon: <UploadOutlined />,
                label: "Quay lại",
              },
            ]}
          />
          <Button
            style={{ width: "100%", position: "absolute", bottom: 0 }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {" "}
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
              }
            )}
          </Button>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "0 0 0 16px",
              background: "#f0f2f5",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
