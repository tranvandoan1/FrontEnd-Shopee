import React from "react";
import "../Css/Css/HomePage.css";
import Countdown from "react-countdown";
const ProductSale = () => {
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    console.log();
    // Render a countdown
    return (
      <span>
        <div className="flash-sale_header_time">
          <div id="time__hours">
            {String(hours).length == 1 && 0}
            {hours}
          </div>{" "}
          :
          <div id="time__minute">
            {String(minutes).length == 1 && 0}
            {minutes}
          </div>{" "}
          :
          <div id="time__second">
            {String(seconds).length == 1 && 0}
            {seconds}
          </div>
        </div>
      </span>
    );
  };

  return (
    <div className="flash-products">
      <div className="flash__products_header">
        <div className="flash-sale_header">
          <em> flash sale</em>
          <Countdown date={123123} renderer={renderer} />
        </div>
        <div className="flash-header_links">
          <a href="">
            xem thêm <i className="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
      <div className="flash-content">
        <div className="content-products">
          <ul>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUc2XtIpqpSf5-_5KjOE59EnwWLW6mQYwD4c_kPhsPtxraUgbvGOxYJssZSRzTeL8ggUI&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://img.alicdn.com/imgextra/i1/3600074510/TB2fN5Hwcj_B1NjSZFHXXaDWpXa_!!3600074510.jpg_400x400q90.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://dotobjyajpegd.cloudfront.net/photo/5e9ff51d4841bc1446b3362a"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">đã bán 9</div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-2-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="content-products_img">
                  <img
                    src="https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-1-scaled.jpg"
                    alt=""
                  />
                </div>
                <div className="content-products_sale">
                  <span>30%</span> giảm
                </div>
                <div className="content-products_card">
                  <div className="content-products_price">1.233.232đ</div>
                  <div className="content-products_quantity">
                    <span>đã bán 9</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <button id="prev-flash">
          <i className="fas fa-angle-left"></i>
        </button>
        <button id="next-flash">
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductSale;
