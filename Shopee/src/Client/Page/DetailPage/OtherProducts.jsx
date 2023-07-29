import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProAPI from "../../../API/ProAPI";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../../reducers/AllData";

const OtherProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const data = useSelector((data) => data.dataAll.value);

  useEffect(() => {
    dispatch(getAllData());

  }, []);
  const ShowHtml = (product, classify) => {
    const proPrice = []

    product?.map((itemPro) => {
      const classifyPrice1 = []
      const classifyPrice2 = []
      classify?.map(itemData => {
        if (itemData?.linked == itemPro.linked) {
          if (itemData?.values == undefined && itemData?.values == null) {
            classifyPrice2.push(itemData.price)
          } else {
            itemData?.values?.map((itemPrice) => classifyPrice1.push(itemPrice.price),
            )
          }
        }
      })
      proPrice.push({ ...itemPro, values: itemPro?.name_commodityvalue == undefined ? classifyPrice2 : classifyPrice1 })
    })


    for (let i = 0; i < proPrice.length; i++) {
      const minPrice = Math.min.apply(Math, proPrice[i].values);
      const maxPrice = Math.max.apply(Math, proPrice[i].values);
      proPrice[i].values = [minPrice, maxPrice]
    }

    return proPrice.map(pro => {
      return (
        <Col xs={12} sm={4} md={8} lg={6} xl={6} >
          <li key={pro._id} onClick={() => navigate(`/detail/product=${pro._id}`)}>
            <div>
              <div className="products-img">
                <img src={pro.photo} alt="" />
              </div>
              {pro.sale == 0 ? (
                ""
              ) : (
                <div className="slae-pro">
                  <span>{pro.sale + "%"}</span> <span>giảm</span>
                </div>
              )}
            </div>

            <div className="products-item_content">
              <div className="products_name">{pro.name}</div>
              <div className="products-price">
                <span>
                  {pro?.values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </span>
                <span>đã bán {pro.sold}</span>
              </div>
            </div>

          </li>
        </Col>

      )
    })
  };
  return (
    <div className="productss">
      <h4>sản phẩm khác</h4>
      <div className="products-title_show">
        <ul >
          <Row gutter={[8, 8]}>
            {ShowHtml(data.product, data.classify)}


          </Row>

        </ul>
      </div>
    </div>
  );
};

export default OtherProducts;
