import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Printer} from '../icons'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Table from 'react-bootstrap/Table'
import DownloadAsset from './DownloadAsset'
import constants from '../../constants'
import strings from '../../localization'


const Delivery = () => {
    const history = useHistory()
    const path = useLocation().pathname
    const {order} = useSelector(state => state.newOrder)
    const {lang} = useSelector(state => state.language)
    const dispatch = useDispatch()

    const printOrderHandler = () => {
        window.print()
    }

    useEffect(() => {
        !order && history.push(`${path}?process=cart`)
        return () => dispatch({type:constants.product.CREATE_ORDER_RESET})
    },[order,history, path])
    
    return (
        <>
        {order && <div className={`${style.delivery} orderInvoice`}
        >
            <h2>
                {strings.product[lang].purchase_thank}
                <span style={{marginLeft:'1rem', cursor:'pointer'}}
                className='printerIcon'
                onClick={printOrderHandler}>
                    <Printer title='print the order'/>
                </span>
                <span  
                className={style.delivery__order_number}>
                    <strong>{strings.product[lang].order_no}</strong> <i>{order._id}</i>
                </span>
            </h2>
            <p>{strings.product[lang].items_list}</p>
           <Table bordered hover>       
                <thead>
                    <tr>
                    <th>#</th>
                    <th>{strings.product[lang].item}</th>
                    <th>{strings.product[lang].qty}</th>
                    <th>{strings.product[lang].price}</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.orderItems.map((item, idx) => {
                            return <tr>
                            <td>{idx +1}</td>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price * item.quantity}$</td>
                            <DownloadAsset id={item.product.driveFile}/>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>}
        </>
    )
}

export default Delivery
