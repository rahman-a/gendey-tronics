import React from 'react'
import style from './style.module.scss'

const ReturnList = ({lang}) => {
    return (
        <div className={style.orders__message}>
            <h2>
               {lang === 'en' ? ' No Return History to Display' : 'لا يوجد هنا سجل للمرتجعات'}
            </h2>
        </div>
    )
}

export default ReturnList
