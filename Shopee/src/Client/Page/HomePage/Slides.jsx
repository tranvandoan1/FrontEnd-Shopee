import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { getSlider } from "./../../../reducers/SliderSlice";
import { useSelector } from "react-redux";
import styles from "../Css/CssModule/Slide.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const Slides = () => {
  const dispatch = useDispatch();
  const slider = useRef(null);
  const slides = useSelector((data) => data.slide.value);
  const listSlide = () => {
    if (slides.length > 0) {
      const slide = slides.filter((item) => item.status == 2);
      slide.sort((a, b) => Number(a.ordinal_number) - Number(b.ordinal_number));
      return (
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Button
            style={{
              height: 60,
              width: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 10,
              top: 110,
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              border: 0,
            }}
            onClick={() => slider.current.next()}
            // className={styles.button_next}
          >
            <RightOutlined style={{ color: "#fff", fontSize: 20 }} />
          </Button>

          <Carousel
            autoplay
            ref={slider}
            style={{ height: 300, overflow: "hidden" }}
          >
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
          <Button
            onClick={() => slider.current.prev()}
            style={{
              height: 60,
              width: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 10,
              top: 110,
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              border: 0,
            }}
          >
            <LeftOutlined style={{ color: "#fff", fontSize: 20 }} />
          </Button>
        </div>
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
            <div style={{ height: "100%" }}>
              <img
                src="https://intphcm.com/data/upload/mau-banner-do.jpg"
                className={styles.image}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Slides;
