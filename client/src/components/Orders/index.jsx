import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import AccountSideMenu from '../AccountSideMenu'
import OrderList from './orders'
import DownloadList from './download'
import PaymentList from './payment'
import ReturnList from './return'
import {ChevronRight} from '../icons'
import actions from '../../actions'
import {useSelector, useDispatch} from 'react-redux'
import strings from '../../localization'

const Orders = () => {
    const [lisType, setListType] = useState('order')
    const {loading, error, orders} = useSelector(state => state.listOrders)
    const {lang} = useSelector(state => state.language)
    const dispatch = useDispatch()

    const fetchClientOrders = () => {
        lisType === 'order'
        && !orders
        && dispatch(actions.products.listOrders())
    }
    
    useEffect(() => {
        fetchClientOrders()
    },[lisType])
    return (
        <div className={style.orders}>
            <AccountSideMenu>
                <li onClick={() => setListType('order')}
                className='order_item'>
                    <ChevronRight/>
                    {strings.client[lang].order_history} 
                </li>
                <li onClick={() => setListType('download')}
                className='order_item'>
                    <ChevronRight/>
                    {strings.client[lang].downloads}
                </li>
                <li onClick={() => setListType('return')}
                className='order_item'>
                    <ChevronRight/>
                    {strings.client[lang].returns} 
                </li>
                <li onClick={() => setListType('payment')}
                className='order_item'>
                    <ChevronRight/>
                    {strings.client[lang].payment_profile}
                </li>
            </AccountSideMenu>
            <div className={style.orders__content}>
                    {
                        lisType === 'order'
                        ? <OrderList 
                        orders={orders}
                        loading={loading}
                        error={error}
                        lang={lang}
                        strings={strings}/>
                        : lisType === 'download'
                        ? <DownloadList lang={lang}/> 
                        : lisType === 'return'
                        ? <ReturnList lang={lang}/> 
                        : lisType === 'payment'
                        && <PaymentList lang={lang}/>
                    }
            </div>
        </div>
    )
}

export default Orders
