import React from "react";

const PurchaseOrder = () => {
  return (
    <div>
      <li>
        <div className="purchase-order">
          <div className="purchase-order-header">
            <ul>
              <li className="active-oder">Tất cả</li>
              <li>Chờ xác nhận</li>
              <li>Chờ lấy hàng</li>
              <li>Đang giao</li>
              <li>Đã giao</li>
              <li>Đã hủy</li>
            </ul>
          </div>
          <div className="purchase-order-header_list">
            <ul>
              <li>
                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <span>
                      <i className="fas fa-truck"></i>
                      <em>Chờ xử lý</em> | <span>ĐÃ GIAO</span>
                    </span>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>

                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <div className="cancelled">
                      <span>ĐÃ HỦY</span>
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <span>
                      <i className="fas fa-truck"></i>
                      <em>Chờ xử lý</em> | <span>ĐÃ GIAO</span>
                    </span>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <span>
                      <i className="fas fa-truck"></i>
                      <em>Chờ xử lý</em> | <span>ĐÃ GIAO</span>
                    </span>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <span>
                      <i className="fas fa-truck"></i>
                      <em>Chờ xử lý</em> | <span>ĐÃ GIAO</span>
                    </span>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <span>
                      <i className="fas fa-truck"></i>
                      <em>Chờ xử lý</em> | <span>ĐÃ GIAO</span>
                    </span>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="oder-list">
                  <div className="oder-owner">
                    <span>
                      <i className="fas fa-house-user"></i> hiệu sách nhã nam{" "}
                      <a href="./ShopOwner.html">
                        <i className="fas fa-inbox"></i> Xem shop
                      </a>
                    </span>
                    <div className="cancelled">
                      <span>ĐÃ HỦY</span>
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="oder-list_products">
                    <div className="olp-left">
                      <div className="olp-image">
                        <img
                          src="https://cf.shopee.vn/file/a27ae95f58fc82cd83474c007463d163"
                          alt=""
                        />
                      </div>
                      <span>
                        <div className="olp-name">
                          hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc hoa vải,hoa trạng
                          nguyên,hoa lưới to trang trí oản,tháp tài lộc hoa
                          vải,hoa trạng nguyên,hoa lưới to trang trí oản,tháp
                          tài lộc hoa vải,hoa trạng nguyên,hoa lưới to trang trí
                          oản,tháp tài lộc hoa vải,hoa trạng nguyên,hoa lưới to
                          trang trí oản,tháp tài lộc
                        </div>
                        <div className="olp-classNameification">
                          Phân loại hàng : đen tắng, hi
                        </div>
                        <span>x5</span>
                      </span>
                    </div>
                    <div className="olp-right">
                      <del>₫232.332</del> ₫323.423
                    </div>
                  </div>
                  <div className="olp-sum">
                    <div className="olp-sum_price">
                      <i className="fab fa-pagelines"></i> Tổng số tiền :{" "}
                      <span>₫12.322</span>
                    </div>
                    <div className="olp-button">
                      <button>Mua lại</button>
                      <button>Liên hê người bán</button>
                      <button>Chi tiết đơn hàng</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </div>
  );
};

export default PurchaseOrder;
