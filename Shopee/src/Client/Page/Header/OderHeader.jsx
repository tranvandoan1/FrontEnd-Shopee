import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SaveOderAPI from '../../../API/SaveOder';
const OderHeader = (props) => {
    const [saveOders, setSaveOder] = useState([])
    useEffect(async () => {
        const { data: saveoders } = await SaveOderAPI.getAll()
        const saveOdersArr = saveoders.filter(item => {
            // if (props.user !== undefined) {
            //     if (item.user_id == props.user._id) {
            //         return item
            //     }
            // }
            (props.user !== undefined ?(item.user_id == props.user._id ? item : ""):"")
        })
        saveOdersArr.reverse()
        setSaveOder(saveOdersArr)
        console.log(saveOdersArr)

    }, [])
    function checkOder() {
        if (props.user == undefined) {
            return (
                <div className="shopping-cart">
                    <Link to="">
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </div>
            )
        } else {
            if (saveOders == "") {
                return (
                    <div className="shopping-cart">
                        <div className="shopee-cart-number-badge">{saveOders.length}</div>
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                        <div className="show-cart">
                            <div className="cart__produtcs-news">Chưa có sản phẩm</div>
                        </div>
                    </div>
                )
            } else {

                return (
                    <div className="shopping-cart">
                        <div className="shopee-cart-number-badge">{saveOders.length}</div>
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                        <div className="show-cart">
                            <div className="cart__produtcs-news">sản phẩm mới thêm
                            </div>
                            <hr />
                            <div className="list_show-cart">
                                {saveOders.map((item, index) => {
                                    return (
                                        <Link to="" key={index}>
                                            <div className="show-cart_img">
                                                <img
                                                    src={item.cover_image} alt=""
                                                />
                                            </div>
                                            <div className="show-cart_name">
                                                <p>{item.name_pro}</p>
                                            </div>
                                            <div className="show-cart_money">
                                                <p>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
                                            </div>
                                        </Link>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            {checkOder()}
        </div>
    )
}

export default OderHeader