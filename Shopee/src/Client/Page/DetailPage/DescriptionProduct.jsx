import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllData } from "../../../reducers/AllData";
import { getProduct } from "../../../reducers/Products";
import Comments from "./Comment/Comments";
import OtherProducts from "./OtherProducts";
import ProductShop from "./ProductShop";

const DescriptionProduct = (props) => {
  return (
    <div className="detail-products">
      <div className="d-products-box">
        <div className="detail__products-left">
          <div className="d-products-left">
            <h3>chi tiết sản phẩm</h3>
            <ul className="d-ul_">
              <li>
                <span>danh mục</span>{" "}
                <span>
                  Shopee Health Medical Supplies Medical Gloves & Masks
                </span>
              </li>
              <li>
                <span>thương hiệu</span> <span> nam anh</span>
              </li>
              <li>
                <span>hạn sử dụng </span>
                <span> 36</span>
              </li>
              <li>
                <span>kiểu đóng gói</span>
                <span> đóng thùng tiên sinh</span>
              </li>
              <li>
                <span>hạn sử dụng</span>
                <span> 3 năm</span>
              </li>
              <li>
                <span>gửi từ</span>
                <span> huyện thường tín , hà nội</span>
              </li>
            </ul>
            <h3>mô tả sản phẩm</h3>
            <p
              style={{ width: "100%" }}
              dangerouslySetInnerHTML={{
                __html: props.product.description,
              }}
            />
          </div>
          <div id="list-comment">
            <Comments />
          </div>
          <OtherProducts />
        </div>
        <ProductShop />
      </div>
    </div>
  );
};

export default DescriptionProduct;
