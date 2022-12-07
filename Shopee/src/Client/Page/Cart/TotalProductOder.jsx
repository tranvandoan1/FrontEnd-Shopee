import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "./../PayMent/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../reducers/CheckOutSlice";
import { uploadSaveOrderss } from "../../../reducers/SaveOrderSlice";
import { getAllData } from "../../../reducers/AllData";

const TotalProductOder = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataSelect = props.saveOrderSelect;
  const dataSaveOrder = props.saveorder;
  const dataAll = useSelector((data) => data.dataAll.value);
  useEffect(async () => {
    dispatch(getAllData());
  }, []);

  // tính tổng tiền
  const dataPrice = [];
  dataSelect?.map((item) =>
    dataPrice.push(
      item.sale == ""
        ? item.price * item.amount
        : Math.ceil(item.price * ((100 - item.sale) / 100)) * item.amount
    )
  );
  let sum = 0;
  for (let i = 0; i < dataPrice.length; i++) {
    sum += dataPrice[i];
  }
  const buyNow = async () => {
    // set all id check= true
    const idAll = [];
    dataSaveOrder.map((item) => idAll.push(item._id));
    const dataALL = { idSelect: idAll, check: false };

    await dispatch(uploadSaveOrderss(dataALL));

    // set  id select check= true

    const id = [];
    dataSelect.map((item) => id.push(item._id));
    const data = { idSelect: id, check: true };
    dispatch(uploadSaveOrderss(data));
    navigate("/checkout");
  };
  return (
    <div className="pr-buying">
      <div className="pr-total">
        <div className="total" style={{ display: "flex" }}>
          <React.Fragment>
            <span>tổng thanh toán</span>{" "}
            <span style={{ marginRight: 10 }}>
              ({dataSelect.length} sản phẩm)
            </span>{" "}
            :
          </React.Fragment>
          <span style={{ marginLeft: 20 }}>
            ₫{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </div>
        <div className="buying" onClick={() => buyNow()}>
          <button>mua ngay</button>
        </div>
      </div>
    </div>
  );
};

export default TotalProductOder;
