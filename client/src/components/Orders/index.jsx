import React, {useState} from 'react'
import style from './style.module.scss'
import AccountSideMenu from '../AccountSideMenu'
import OrderList from './orders'
import DownloadList from './download'
import PaymentList from './payment'
import ReturnList from './return'
import {ChevronRight} from '../icons'

const Orders = () => {
    const [lisType, setListType] = useState('order')
    return (
        <div className={style.orders}>
            <AccountSideMenu>
                <li onClick={() => setListType('order')}>
                    <ChevronRight/>
                    ORDER HISTORY 
                </li>
                <li onClick={() => setListType('download')}>
                    <ChevronRight/>
                    DOWNLOADS
                </li>
                <li onClick={() => setListType('return')}>
                    <ChevronRight/>
                    RETURNS 
                </li>
                <li onClick={() => setListType('payment')}>
                    <ChevronRight/>
                    PAYMENT PROFILE
                </li>
            </AccountSideMenu>
            <div className={style.orders__content}>
                    {
                        lisType === 'order'
                        ? <OrderList/>
                        : lisType === 'download'
                        ? <DownloadList/> 
                        : lisType === 'return'
                        ? <ReturnList/> 
                        : lisType === 'payment'
                        && <PaymentList/>
                    }
            </div>
        </div>
    )
}

export default Orders
