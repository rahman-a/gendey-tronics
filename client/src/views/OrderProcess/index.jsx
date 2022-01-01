import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import PaymentCard from '../../components/PaymentCard'
import OrderProgress from './OrderProgress'
import Cart from '../../components/Cart'
import Delivery from '../../components/Delivery'
import Done from '../../components/Done'
import {useLocation} from 'react-router-dom'

const OrderProcess = () => {
    const query = new URLSearchParams(useLocation().search)
    const process = query.get('process')
    
    const components = {
        cart:<Cart process={process}/>,
        payment:<Cart process={process}/>,
        delivery:<Delivery/>,
        done:<Done/>
    }
    return (
        <Template>
            <div className={style.order}>
                <div className={style.order__payment} 
                style={{display: process === 'payment' ? 'flex':'none'}}>
                   <PaymentCard type='product'/>
                </div>
                <div className={style.order__content}
                style={{margin: process !== 'payment' ? '0 auto':'unset'}}>
                    <div className="container">
                        <OrderProgress process={process}/>
                        {
                            components[process]
                        }
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default OrderProcess
