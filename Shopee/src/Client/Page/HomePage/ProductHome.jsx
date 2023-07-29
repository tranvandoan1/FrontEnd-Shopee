import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Tabs } from "antd";
import { getAllData } from "../../../reducers/AllData";
import { getProductAll } from "../../../reducers/Products";
const { TabPane } = Tabs;
const ProductHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((data) => data.dataAll.value);
  const products = useSelector((data) => data.products.value);
  useEffect(() => {
    dispatch(getAllData());
    dispatch(getProductAll());
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
        <Col xs={12} sm={4} md={6} lg={6} xl={4} style={{marginTop:10}}>
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
    <div className="products-wrapper">
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Gợi ý hôm nay" key="1">
          <div className="products-title_show">
            <ul>
              <Row gutter={8}>
                {ShowHtml(data.product, data.classify)}
              </Row>

            </ul>
            <div className="btn-seemore">
              <button>
                <a href="/#/products">xem thêm</a>
              </button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Noel 25/12" key="2" style={{ fontSize: 20 }}>
          <div className="products-title_show">
            <ul>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="https://www.tuticare.com/media/product/6829_1_6829.gif"
                      alt=""
                    />
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="https://cdn.pico.vn/Product/39419/big_323457_dien_thoai_di_dong_samsung_a205_32gb_do_-_galaxy_a20.jpg"
                      alt=""
                    />
                  </div>
                  <div className="slae-pro">
                    <span>30%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="https://img.websosanh.vn/v2/users/review/images/g0uimocg53p63.jpg?compress=85"
                      alt=""
                    />
                  </div>
                  <div className="slae-pro">
                    <span>30%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="https://fptshop.com.vn/uploads/originals/2020/9/29/637369735917636373_huong-dan-cach-cai-dat-hinh-nen-may-tinh-win-10-don-gian-8.jpg"
                      alt=""
                    />
                  </div>
                  <div className="slae-pro">
                    <span>30%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="https://amthucchayonline.com/wp-content/uploads/2019/10/muopxaomigoi_thumb1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="slae-pro">
                    <span>30%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="http://muasamtieudung.net/wp-content/uploads/2013/08/da013d0d1172ed7382350bb4f024df6a-350x261.jpg"
                      alt=""
                    />
                  </div>
                  <div className="slae-pro">
                    <span>30%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="products-img">
                    <img
                      src="https://cuchoami.vn/wp-content/uploads/2020/09/chup-anh-quang-cao-san-pham.jpg"
                      alt=""
                    />
                  </div>
                  <div className="slae-pro">
                    <span>30%</span> giảm
                  </div>
                  <div className="products-item_content">
                    <div className="products_name">
                      máy tiệt trùng bằng bàn chải đánh răng UTOREX hàn quốc
                      hihi ádhia
                    </div>
                    <div className="products-price">
                      <span>1.212.232đ</span>
                      <span>đã bán 2.4k</span>
                    </div>
                  </div>
                  <div className="addToCart">
                    <span>add to cart</span>
                  </div>
                </a>
              </li>
            </ul>
            <div className="btn-seemore-even">
              <button>
                <a href="/#/products">xem thêm</a>
              </button>
            </div>
          </div>
        </TabPane>
      </Tabs>
      {/* <div className="products-title">
          <ul>
            <li className="activePro">
              <div className="products-title_item">gợi ý hôm nay</div>
            </li>
            <li>
              <div className="products-title_programme">noel 25/12</div>
            </li>
          </ul>
        </div>
        <div className="products-show">
          <ul>
            <li className="pro_show">
            
            </li>
            <li>
              
            </li>
          </ul>
        </div> */}
    </div>
  );
};

export default ProductHome;
