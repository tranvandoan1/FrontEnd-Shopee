import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadSaveOrderCart, uploadSaveOrderss } from "../../../reducers/SaveOrderSlice";

const TotalPrice = ({ dataSelect }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const priceSale = [];
  const price = [];
  dataSelect?.map(
    (item) => (
      priceSale.push(
        Math.ceil(item.price * ((100 - item.sale) / 100)) * item.amount
      ),
      price.push(item.price * item.amount)
    )
  );
  let sumSale = 0;
  for (let i = 0; i < priceSale.length; i++) {
    sumSale += priceSale[i];
  }
  console.log(price);
  let sum = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i];
  }
  const back = async () => {
    const id = []
    dataSelect?.filter(item => id.push(item._id))
    await dispatch(uploadSaveOrderss({ idSelect: id, check: false }))
    navigate('/cart')
  }
  return (
    <div className="total-money-oder" style={{ marginBottom: 20 }}>
      <div className="info-money">
        <div className="total-amount">
          Tổng tiền hàng:{" "}
          <span>₫{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
        </div>
        <div className="shope-coin">
          Dùng xu shope: <span>-₫200</span>
        </div>
        <div className="total-money">
          Tổng thanh toán :{" "}
          <span>
            ₫{sumSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </div>
      </div>

      <div className="oder">
        <span>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đã đồng ý đạt hàng</span>
        <div>
          <button onClick={() => back()}>Quay lại</button>
          <button>Đặt hàng ngay</button>
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
