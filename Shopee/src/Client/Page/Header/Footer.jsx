import React from 'react'

export const Footer = () => {
  return (
    <div>
        <div className="footer">
            <div className="footer-shop">
                <div className="customer_care">
                    <h4>chăm sóc khách hàng</h4>
                    <ul>
                        <li><a href="">trung tâm trợ giúp</a></li>
                        <li><a href="">Shopee Blog</a></li>
                        <li><a href="">Hướng Dẫn Mua Hàng</a></li>
                        <li><a href="">Hướng Dẫn Bán Hàng</a></li>
                        <li><a href="">Chăm Sóc Khách Hàng</a></li>
                    </ul>
                </div>
                <div className="shopee-item">
                    <h4>về shopee</h4>
                    <ul>
                        <li><a href="">Giới Thiệu Về Shopee Việt Nam</a></li>
                        <li><a href="">Tuyển Dụng</a></li>
                        <li><a href="">Chính Sách Bảo Mật</a></li>
                    </ul>
                </div>
                <div className="payment">
                    <h4>thanh toán</h4>
                    <img src="http://hstatic.net/726/1000031726/10/2016/5-20/thanh-toan.jpg" alt="" />
                    <h4>đơn vị</h4>
                    <img src="https://ntlogistics.vn/tin-tuc/wp-content/uploads/2020/06/cac-cong-ty-chuyen-phat-nhanh.png" alt="" />
                </div>
                <div className="follow">
                    <h4>theo dõi chúng tôi trên</h4>
                    <ul>
                        <li><a href=""><i className="fab fa-facebook"></i>
                                    Facebook</a></li>
                        <li><a href=""><i className="fab fa-instagram-square"></i>
                                    Instagram</a></li>
                    </ul>
                </div>
                <div className="download-shope">
                    <h4>tải ứng dụng shopee ngay thôi</h4>
                    <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/d91264e165ed6facc6178994d5afae79.png" alt=""/>
                </div>
            </div>
        </div>
        <div className="footer-end">
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
        </div>
     </div>
  )
}
