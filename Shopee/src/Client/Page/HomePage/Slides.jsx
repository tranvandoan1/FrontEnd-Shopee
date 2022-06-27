import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { getSlider } from "./../../../reducers/SliderSlice";
import { useSelector } from "react-redux";
import styles from "../Css/CssModule/Slide.module.css";
const Slides = () => {
  const dispatch = useDispatch();
  const slides = useSelector((data) => data.slide.value);
  const listSlide = () => {
    if (slides.length > 0) {
      const slide = slides.filter((item) => item.status == 2);
      console.log(slide)
      slide.sort((a, b) => Number(a.ordinal_number) - Number(b.ordinal_number));
      return (
        <Carousel autoplay style={{ height: 300, overflow: "hidden" }}>
          {slide?.map((item) => (
            <div key={item._id}>
              <img
                src={item.photo}
                alt=""
                style={{ width: "100%", height: 300 }}
              />
            </div>
          ))}
        </Carousel>
      );
    }
  };

  useEffect(async () => {
    dispatch(getSlider());
  }, []);
  return (
    <div style={{ background: "#fff", width: "100%" }}>
      <div className={styles.slide}>
        <Row>
          <Col xs={12} sm={4} md={12} lg={24} xl={16}>
            {listSlide()}
          </Col>
          <Col xs={12} sm={4} md={12} lg={0} xl={8}>
            <Row style={{ paddingLeft: 10 }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <img
                  src="https://intphcm.com/data/upload/mau-banner-do.jpg"
                  className={styles.image}
                  alt=""
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <img
                  src="https://intphcm.com/data/upload/mau-banner-do.jpg"
                  className={styles.image}
                  alt=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>

    // <React.Fragment>
    //     <div className="banner-slide">
    //         <div className="banner-shop">
    //             <div className="full-home-banners">
    //                 <div className="full-home-banners__left-wrapper">
    //                     <div className="slide-gr">
    //                         <div className="slides">
    //                             {
    //                                 slides.map((item,index) => {
    //                                     if (item.status == "true") {
    //                                         if (item.ordinal_number != 0) {
    //                                             return (
    //                                                 <Link to="" className='imk' key={index}>
    //                                                     <img src={item.photo} alt="" />
    //                                                 </Link>
    //                                             )
    //                                         }
    //                                     }
    //                                 })
    //                             }
    //                         </div>
    //                         <button id="prev"><i className="fas fa-angle-left"></i></button>
    //                         <button id="next"><i className="fas fa-angle-right"></i></button>
    //                         <div className="number_slide">
    //                             {slides.map((item,index) => {
    //                                 if (item.status == "true") {
    //                                     if (item.ordinal_number != 0) {
    //                                         return (
    //                                                 <button key={index}></button>
    //                                             )
    //                                     }
    //                                 }
    //                             })}

    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="full-home-banners__right-wrapper">
    //                     <a href="" className="full-home-banners__right-banner">
    //                         <img src="https://2.bp.blogspot.com/-Lu81JFx7Qw4/W1HntPfg0kI/AAAAAAAACeU/zLTDUkul8FQOUnp0Mp5k8zwE6oAF-lorQCLcBGAs/s1600/c.png" alt="" />
    //                     </a>
    //                     <a href="" className="full-home-banners__right-banner">
    //                         <img src="https://tingiasoc.com/wp-content/uploads/2020/03/ma-giam-gia-shopee-tgs.png" alt="" />
    //                     </a>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </React.Fragment>
  );
};

export default Slides;
