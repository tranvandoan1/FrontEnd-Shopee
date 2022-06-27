import React, { useEffect, useState } from 'react'
import CateAPI from './API/Categoris'
import ClassifyAPI from './API/ClassifyAPI'
import CommodityValueAPI from './API/CommodityValueAPI'
import OderAPI from './API/Oders'
import ProAPI from './API/ProAPI'
import SaveOderAPI from './API/SaveOder'
import SliderAPI from './API/Slider'
import TypeNameAPI from './API/TypeName'
import UserAPI from './API/Users'
import App from './App'

const RouterDOM = () => {
    const [saveoder, setSaveOder] = useState([])
    const [saveoder1, setSaveOder1] = useState([])
    const [products, setProduct] = useState([])
    const [classifies, setClassify] = useState([])
    const [commodityvalues, setCommodityvalue] = useState([])
    const [categories, setCategory] = useState([])
    const [oders, setOder] = useState([])
    const [slides, setSlide] = useState([])
    const [typename, setTypename] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        let getSaveOder = async () => {
            const user = JSON.parse(localStorage.getItem("user"))
            saveoder.filter(item => item.user_id == user._id)
            console.log(saveoder.filter(item => item.user_id == user._id))
        }
        getSaveOder()
    }, [])

    useEffect(() => {
        let getPro = async () => {
            const { data: saveoder } = await SaveOderAPI.getAll()
            setSaveOder(saveoder)
            const { data: products } = await ProAPI.getAll()
            setProduct(products)
        }
        let getCate = async () => {
            const { data: categories } = await CateAPI.getAll()
            setCategory(categories)
        }
        let getClassify = async () => {
            const { data: classifys } = await ClassifyAPI.getAll()
            setClassify(classifys)
        }
        let getCommodityValue = async () => {
            const { data: commodityvalues } = await CommodityValueAPI.getAll()
            setCommodityvalue(commodityvalues)
        }
        let getSlider = async () => {
            const { data: slides } = await SliderAPI.getAll()
            setSlide(slides)
        }
        let getTypeName = async () => {
            const { data: typename } = await TypeNameAPI.getAll()
            setTypename(typename)
        }

        let getUser = async () => {
            const { data: users } = await UserAPI.getAll()
            setUser(users)
        }
        let getOder = async () => {
            const { data: oders } = await OderAPI.getAll()
            setOder(oders)
        }
        getPro()
        getCate()
        getClassify()
        getCommodityValue()
        getOder()
        getSlider()
        getTypeName()
        getUser()
    }, [])

    return (
        <App
            saveoder={saveoder}
            product={products}
            classify={classifies}
            commodityvalue={commodityvalues}
            categorie={categories}
            oder={oders}
            slide={slides}
            typename={typename}
            user={user}
        />
    )
}

export default RouterDOM