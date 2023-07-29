import React from "react";
import { useDispatch } from "react-redux";
import { uploadSaveOrderss } from "../../../reducers/SaveOrderSlice";
import { useNavigate } from "react-router-dom";
const TotalProductOder = ({ saveOrderSelect }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // tính tổng tiền
  const dataPrice = [];
  saveOrderSelect?.map((item) =>
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
    const id = [];
    saveOrderSelect?.map((item) => id.push(item._id));
    const data = { idSelect: id, check: true };
    await dispatch(uploadSaveOrderss(data));
    navigate("/checkout");
  };
  return (
    <div className="pr-buying">
      <div className="pr-total">
        <div className="total" style={{ display: "flex" }}>
          <React.Fragment>
            <span>tổng thanh toán</span>{" "}
            <span style={{ marginRight: 10 }}>
              ({saveOrderSelect?.length} sản phẩm)
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
