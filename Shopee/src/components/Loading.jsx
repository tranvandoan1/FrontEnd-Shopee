import { Space, Spin } from 'antd'
import React from 'react'
import styles from '../Client/Page/Css/CssModule/loading.module.css'
const Loading = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 110,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' ,flexDirection:'column'}}>

                <Spin size="large" />
                <p className={styles.loading}>Loading...</p>
            </div>
        </div>
    )
}

export default Loading