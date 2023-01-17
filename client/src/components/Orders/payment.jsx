import React from 'react'
import style from './style.module.scss'

const PaymentProfile = ({lang}) => {
    return (
        <div className={style.orders__message}>
            <h2>
                {lang === 'en' ? 'No Payment Profile has been added' : 'لا يوجد سجل لبيانات الدفع'}
            </h2>
        </div>
    )
}

export default PaymentProfile
