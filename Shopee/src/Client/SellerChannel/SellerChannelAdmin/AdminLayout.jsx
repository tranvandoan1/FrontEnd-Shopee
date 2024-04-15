import { Link, Outlet } from "react-router-dom";
import "../../Page/Css/Css/AdminLayout.css";
import {
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RollbackOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React, { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;
import { FaProductHunt, FaClipboardList, FaDumbbell } from "react-icons/fa";
const AdminLayout = () => {
  const getKeyLoca = localStorage.getItem('keyLoca')
  const [collapsed, setCollapsed] = useState(false);
  const [keyLoca, setKeyLoca] = useState(getKeyLoca == undefined ? 1 : getKeyLoca);


  useEffect(() => {
    const getKeyLoca = localStorage.getItem('keyLoca')
    setKeyLoca(getKeyLoca == undefined ? 1 : getKeyLoca)
  }, [keyLoca])
  console.log(keyLoca, 'keyLoca')
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
            defaultSelectedKeys={`${keyLoca}`}
            style={{ height: "100vh" }}
            items={[
              {
                key: "1",
                icon: <FaDumbbell />,
                label: "Thống kê",
                itemIcon: <Link to="statistical" />,
                onClick: () => {
                  localStorage.removeItem("keyLoca");
                  localStorage.setItem("keyLoca", 1);
                },
              },
              {
                key: "2",
                icon: <FaClipboardList />,
                label: "Danh mục",
                itemIcon: <Link to="categoris" />,
                onClick: () => {
                  localStorage.removeItem("keyLoca");
                  localStorage.setItem("keyLoca", 2);
                },
              },
              {
                key: "3",
                icon: <FaProductHunt />,
                label: "Sản phẩm",
                itemIcon: <Link to="products" />,
                onClick: () => {
                  localStorage.removeItem("keyLoca");
                  localStorage.setItem("keyLoca", 3);
                },
              },
              {
                key: "4",
                icon: <ShoppingCartOutlined />,
                label: "Đơn hàng",
                onClick: () => {
                  localStorage.removeItem("keyLoca");
                  localStorage.setItem("keyLoca", 4);
                },
              },

              {
                key: "5",
                icon: <CommentOutlined />,
                label: "Bình luận",
                onClick: () => {
                  localStorage.removeItem("keyLoca");
                  localStorage.setItem("keyLoca", 5);
                },
              },
              {
                key: "6",
                icon: <RollbackOutlined />,
                label: "Quay lại",
                itemIcon: <Link to="/" />,
                onClick: () => {
                  localStorage.removeItem("keyLoca");
                  localStorage.setItem("keyLoca", 6);
                },
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
