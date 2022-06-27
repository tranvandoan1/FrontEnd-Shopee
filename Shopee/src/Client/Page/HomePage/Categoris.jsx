import React, { useEffect, useState } from 'react'
import CateAPI from '../../../API/Categoris'
import { $ } from '../../../Unti'

const Categoris = () => {
    const [categoris, setCategoris] = useState([])
    const [count, setCount] = useState(0)
    useEffect(async () => {
        const { data: categoris } = await CateAPI.getAll()
        setCategoris(categoris)
    }, [])

    const next = () => {

        const cate = $(".cate");
        const cateSum = $(".list-category ul li");

        const cateWidthBox = cateSum[0].offsetWidth / 2;
        const cateWidthAllBox = cateWidthBox * 2.7;
        const newCount =  cateWidthAllBox+count;
        setCount(cateWidthAllBox)
        if (newCount > cateWidthAllBox) {
            setCount(0)
        }
        cate.style.transform = `translateX(${-count}px)`;
    }

    const prev = () => {

        const cate = $(".cate");
        const cateSum = $(".list-category ul li");

        const cateWidthBox = cateSum[0].offsetWidth / 2;
        const cateWidthAllBox = cateWidthBox * 2.7;
        const newCount = count - cateWidthAllBox;
        setCount(cateWidthAllBox)
        if (count < 0) {
            setCount(newCount)
        }
        cate.style.transform = `translateX(${-count}px)`;
    }
    return (
        <div className="categores">
            <div className="home-category-list">
                <div className="category">
                    <h2>danh mục sản phẩm</h2>
                </div>
            </div>
            <div className="list-category">
                <div className="cate" >
                    <ul>
                        {categoris.map((cate, index) => {
                            return (
                                <li key={index}>
                                    <a href="">
                                        <img src={cate.photo} alt="" />
                                        <span>{cate.name}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button id="prev-cate" onClick={prev}><i className="fas fa-angle-left"></i></button>
                <button id="next-cate" onClick={next}><i className="fas fa-angle-right"></i></button>
            </div>
        </div>
    )
}

export default Categoris