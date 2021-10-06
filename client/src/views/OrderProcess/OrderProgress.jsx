import React from 'react'
import style from './style.module.scss'

const OrderProgress = ({ process , setProcess}) => {
  return (
    <div className={style.order__progress}>
      
      <div
        className={`${style.order__progress_unit}
            ${process === 'cart' && style.order__progress_active}`}
      onClick={() => setProcess('cart')}>
        <span>1</span>
        <p>Cart</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'payment' && style.order__progress_active}`}
            onClick={() => setProcess('payment')}>
        <span>2</span>
        <p>Payment</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'delivery' && style.order__progress_active}`}
            onClick={() => setProcess('delivery')}>
        <span>3</span>
        <p>Delivery</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'done' && style.order__progress_active}`}
            onClick={() => setProcess('done')}>
        <span>4</span>
        <p>Done</p>
      </div>
    </div>
  )
}

export default OrderProgress
