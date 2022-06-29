import React from "react";

const TotalProductOder = (props) => {
  // tính tổng tiền
  const dataPrice = [];
  props.saveOrderSelect?.map((item) =>
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

  return (
    <div className="pr-buying">
      <div className="pr-total">
        <div className="total" style={{ display: "flex" }}>
          <React.Fragment>
            <span>tổng thanh toán</span>{" "}
            <span style={{ marginRight: 10 }}>
              ({props.saveOrderSelect.length} sản phẩm)
            </span>{" "}
            :
          </React.Fragment>
          <span style={{ marginLeft: 20 }}>
            ₫{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </div>
        <div className="buying">
          <button>mua ngay</button>
        </div>
      </div>
    </div>
  );
};

export default TotalProductOder;
