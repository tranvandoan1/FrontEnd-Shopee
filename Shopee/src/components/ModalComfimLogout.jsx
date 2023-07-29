import { Button, Spin } from 'antd'
import React from 'react'

const ModalComfimLogout = ({ title, comfim, callBack, loading }) => {
    const shopeePopupFormHeader = document.querySelector(
        ".shopee-popup-form__header-comfim"
    );
    window.addEventListener("click", function (e) {
        if (e.target == shopeePopupFormHeader) {
            callBack('close')
        }
    });
    return (
        <div
            className={`shopee-popup-form__header-comfim ${comfim == true ? 'active-shopee-popup-form__header-comfim' : ''}`}
        >
            <div className="form__header">
                <div className='title'>
                    <h3>{title}</h3>
                </div>
                <div className='button-comfim'>
                    <Button type="dashed" onClick={() => callBack('close')}>{loading == true ? <Spin /> : 'Hủy'}</Button>
                    <Button type="primary" danger onClick={() => callBack('oke')}>{loading == true ? <Spin /> : 'Đăng xuất'}</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalComfimLogout