import React from "react";

const Checkout = () => {
  return (
    <div>
      <div class="cart-page-header-wrapper">
        <div class="wapper">
          <div class="cart-page-header">
            <div class="cart-page-logo">
              <a href="Index.html">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
                  alt=""
                />
              </a>
              <span>Thanh toán</span>
            </div>
          </div>
        </div>
      </div>
      <div class="payment-header">
        <div class="pm"></div>
        <div class="delivery-addres">
          <div class="delivery-address">
            {" "}
            <i class="fas fa-map-marker-alt"></i> địa chỉ nhận hàng
          </div>
          <div class="payment_delivery-address">
            <div class="payment_name">trần văn đoàn ( 0329903787 )</div>
            <div class="payment_address">
              172 Phố Trần Bình, Phường Mỹ Đình 1, Phường Mỹ Đình 1, Quận Nam Từ
              Liêm, Hà Nội
            </div>
            <span>mặc định</span>
            <div class="payment_change">THAY ĐỔI</div>
          </div>
        </div>
        <div class="add-address">
          <div class="add_address">
            <div class="delivery-address">
              {" "}
              <i class="fas fa-map-marker-alt"></i> địa chỉ nhận hàng
            </div>
            <button>
              <i class="fas fa-plus"></i> thêm địa chỉ mới
            </button>
          </div>
          <div class="change-address">
            <ul>
              <li>
                <input type="checkbox" name="" id="checkbox" />
                <label for="checkbox">
                  <div class="check-dots"></div>
                </label>
                <input type="checkbox" name="" id="" />
                <div class="payment_name">trần văn đoàn ( 0329903787 )</div>
                <div class="payment_address">
                  172 Phố Trần Bình, Phường Mỹ Đình 1, Phường Mỹ Đình 1, Quận
                  Nam Từ Liêm, Hà Nội
                </div>
                <span class="md">Mặc định</span>
                <span>
                  <button>
                    <i class="far fa-trash-alt"></i>
                  </button>
                </span>
              </li>
              <li>
                <input type="checkbox" name="" id="checkbox" />
                <label for="checkbox">
                  <div class="check-dots"></div>
                </label>
                <input type="checkbox" name="" id="" />
                <div class="payment_name">trần văn đoàn ( 0329903787 )</div>
                <div class="payment_address">
                  172 Phố Trần Bình, Phường Mỹ Đình 1, Phường Mỹ Đình 1, Quận
                  Nam Từ Liêm, Hà Nội
                </div>
              </li>
              <li>
                <input type="checkbox" name="" id="checkbox" />
                <label for="checkbox">
                  <div class="check-dots"></div>
                </label>
                <input type="checkbox" name="" id="" />
                <div class="payment_name">trần văn đoàn ( 0329903787 )</div>
                <div class="payment_address">
                  172 Phố Trần Bình, Phường Mỹ Đình 1, Phường Mỹ Đình 1, Quận
                  Nam Từ Liêm, Hà Nội
                </div>
              </li>
            </ul>
          </div>
          <div class="back-complete">
            <div class="complete">
              <button>hoàn thành</button>
            </div>
            <div class="back">
              <button>trở lại</button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-main">
        <div class="cart_products-header">
          <div class="cart-pr">Sản Phẩm</div>
          <div class="cart-pr_unit-price">Đơn Giá</div>
          <div class="cart-pr_quantity">Số Lượng</div>
          <div class="cart-pr_into-money">Thành Tiền</div>
        </div>
      </div>
      <div class="cart-pr_show">
        <div class="cart-pr_shop">
          <i class="fas fa-house-user"></i> tranvandoan2005
        </div>
        <div class="cart-pr_show-pr">
          <div class="cart-pr_image-name">
            <div class="cart-pr_image">
              <img
                src="https://cf.shopee.vn/file/88577c6975464e467634f59611a87231"
                alt=""
              />
            </div>
            <div class="cart-pr_name">
              <div class="name">
                172 Phố Trần Bình, Phường Mỹ Đình 1, Phường Mỹ Đình 1, Quận Nam
                Từ Liêm, Hà Nội
              </div>
              <div class="type">
                Loại :{" "}
                <span>đen -áo khoác đén lắm nhưng chưa đen nhiều lắm</span>
              </div>
            </div>
          </div>

          <div class="unit-price">₫123.123</div>
          <div class="quantityy">1</div>
          <div class="into-money">₫312.432</div>
        </div>
        <div class="cart-pr_show-pr">
          <div class="cart-pr_image-name">
            <div class="cart-pr_image">
              <img
                src="https://cf.shopee.vn/file/88577c6975464e467634f59611a87231"
                alt=""
              />
            </div>
            <div class="cart-pr_name">
              <div class="name">
                172 Phố Trần Bình, Phường Mỹ Đình 1, Phường Mỹ Đình 1, Quận Nam
                Từ Liêm, Hà Nội
              </div>
              <div class="type">
                Loại :{" "}
                <span>đen -áo khoác đén lắm nhưng chưa đen nhiều lắm</span>
              </div>
            </div>
          </div>

          <div class="unit-price">₫123.123</div>
          <div class="quantityy">1</div>
          <div class="into-money">₫312.432</div>
        </div>
      </div>
      <div class="use-coins">
        <div class="usc-box">
          <div class="use">
            <i class="fas fa-dollar-sign"></i> Shopee Xu{" "}
            <span>Dùng 200 Shopee Xu</span>
          </div>
          <div class="coins">
            <label for="checkcoin">
              <span>-200</span>
              <div class="check__coin"></div>
            </label>
            <input type="checkbox" id="check-coin" />
          </div>
        </div>
      </div>
      <div class="total-money-oder">
        <div class="info-money">
          <div class="total-amount">
            Tổng tiền hàng: <span>₫322.213</span>
          </div>
          <div class="shope-coin">
            Dùng xu shope: <span>-₫200</span>
          </div>
          <div class="total-money">
            Tổng thanh toán : <span>₫100.121.212</span>
          </div>
        </div>

        <div class="oder">
          <span>
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đã đồng ý đạt hàng
          </span>
          <button>Đặt hàng ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
