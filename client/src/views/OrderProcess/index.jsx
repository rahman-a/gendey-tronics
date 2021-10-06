import React, { useState } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import PaymentCard from '../../components/PaymentCard'
import OrderProgress from './OrderProgress'
import Cart from '../../components/Cart'
import {useLocation} from 'react-router-dom'

const OrderProcess = () => {
    const query = new URLSearchParams(useLocation().search)
    const process = query.get('process')
    return (
        <Template>
            <div className={style.order}>
                <div className={style.order__payment} 
                style={{display: process === 'payment' ? 'flex':'none'}}>
                   <PaymentCard/>
                </div>
                <div className={style.order__content}
                style={{margin: process !== 'payment' ? '0 auto':'unset'}}>
                    <div className="container">
                        <OrderProgress process={process}/>
                        <Cart process={process}/>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default OrderProcess
