import React from "react";

const ShowImage = (props) => {
  console.log(props)
  
  return (
    <div className="detail-columm_left" onClick={() => ListImage()}>
      <div className="group-images">
        <div className="img-detail">
          <img src={props.data.product.photo} alt="" />
        </div>
      </div>
      <div className="img-detail_show">
        <div className="box-img">
          <img src={props.data.product.photo1} alt="" />
        </div>
        <div className="box-img">
          <img src={props.data.product.photo2} alt="" />
        </div>
        <div className="box-img">
          <img src={props.data.product.photo3} alt="" />
        </div>
        <div className="box-img">
          <img src={props.data.product.photo4} alt="" />
        </div>
        <div className="box-img">
          <img src={props.data.product.photo5} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ShowImage;
