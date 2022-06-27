import React, { useEffect, useState } from 'react'
import CommodityValueAPI from '../../../API/CommodityValueAPI'
import ProAPI from '../../../API/ProAPI'
import { Link } from "react-router-dom"
const ProductTop = () => {
    const [commodityvalue, setCommodityvalue] = useState([])
    const [productArr, setProductArr] = useState([])

    useEffect(() => {
        const getData = async () => {
            const { data: products } = await ProAPI.getAll();
            const { data: commodityvalue } = await CommodityValueAPI.getAll();
            const proSort = products.map(pro => pro.view).sort()
            const productArr = []
            proSort.map(item => products.filter(pro => (item == pro.view ? productArr.push(pro) : "")))
            setProductArr(productArr)
            setCommodityvalue(commodityvalue)
        }
        getData()
    }, [])


    const ShowHtml = (productArr, commodityvalue) => {
        return (
            productArr.map(pro => {
                const p = commodityvalue.filter(item => (item.pro_id == pro._id ? item : ""))

                const showPrice = p.map(item => item.price)

                var minPrice = Math.min.apply(Math, showPrice)
                return (
                    <li key={pro._id}>
                        <Link to='/detail/product/${pro._id}'>
                            <div className="imager-products">
                                <img src={pro.cover_image} alt="" />
                            </div>
                            <span>top</span>
                            <div className="tt-products">
                                <h4>{pro.name}</h4>
                                <div className="price-products">
                                    {minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                </div>
                            </div>
                            <div className="addToCartPro">add to cart
                            </div>
                        </Link>
                    </li>
                )
            })
        )
    }

    return (
        <div className="top-search__products">
            <div className="search-top">
                <h2>sản phẩm hàng đầu</h2>
                <a href="">xem tất cả <i className="fas fa-chevron-right"></i></a>
            </div>
            <div className="search-products">
                <div className="show-products">
                    <ul>
                        {ShowHtml(productArr, commodityvalue)}
                    </ul>
                </div>
                <button id="pro-prev"><i className="fas fa-angle-left"></i></button>
                <button id="pro-next"><i className="fas fa-angle-right"></i></button>
            </div>
        </div>
    )
}

export default ProductTop