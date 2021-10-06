import React from 'react'
import style from './style.module.scss'
import {useHistory} from 'react-router-dom'

const OrderProgress = ({process}) => {
  const history =  useHistory()
  return (
    <div className={style.order__progress}>
      
      <div
        className={`${style.order__progress_unit}
            ${process === 'cart' && style.order__progress_active}`}
      onClick={() => history.push(`/order?process=cart`)}>
        <span>1</span>
        <p>Cart</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'payment' && style.order__progress_active}`}
            onClick={() => history.push(`/order?process=payment`)}>
        <span>2</span>
        <p>Payment</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'delivery' && style.order__progress_active}`}
            onClick={() => history.push(`/order?process=delivery`)}>
        <span>3</span>
        <p>Delivery</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'done' && style.order__progress_active}`}
            onClick={() => history.push(`/order?process=done`)}>
        <span>4</span>
        <p>Done</p>
      </div>
    </div>
  )
}

export default OrderProgress
