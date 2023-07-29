import { Button } from 'antd'
import React from 'react'

const ModalComfim = ({ title, content, status, callBack }) => {
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
            className={`shopee-popup-form__header-comfim ${status == true ? 'active-shopee-popup-form__header-comfim' : ''}`}
        >
            <div className="form__header">
                <div className='title'>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </div>
                <div className='button-comfim'>
                    <Button type="dashed" onClick={() => callBack('close')}>Hủy</Button>
                    <Button type="primary" danger onClick={() => callBack('oke')}>Xóa</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalComfim