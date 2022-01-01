import React from 'react'
import style from './style.module.scss'

const DownloadList = ({lang}) => {
    return (
        <div className={style.orders__message}>
            <h2>
               {lang === 'en' ? 'No Download History To Display' : 'لا يوجد هنا سجل للتحميلات'}
            </h2>
        </div>
    )
}

export default DownloadList
