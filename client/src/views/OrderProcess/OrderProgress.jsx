import React from 'react'
import style from './style.module.scss'
import strings from '../../localization'
import {useSelector} from 'react-redux'

const OrderProgress = ({process}) => {
  const {lang} = useSelector(state => state.language)
  const {isAuth} = useSelector(state => state.client)

  return (
    <div className={`${style.order__progress} ${lang === 'ar' ? style.order__progress_ar:''} progressBar`}
    style={{display: isAuth ? 'flex':'none'}}>
      
      <div
        className={`${style.order__progress_unit}
            ${process === 'cart' && style.order__progress_active}`}
      >
        <span>1</span>
        <p>{strings.product[lang].cart_name}</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'payment' && style.order__progress_active}`}
        >
        <span>2</span>
        <p>{strings.product[lang].payment}</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'delivery' && style.order__progress_active}`}
        >
        <span>3</span>
        <p>{strings.product[lang].delivery}</p>
      </div>
     
     {/* /////////////////////////////////////////////////// */}
      <div
        className={`${style.order__progress_unit}
            ${process === 'done' && style.order__progress_active}`}
        >
        <span>4</span>
        <p>{strings.product[lang].done}</p>
      </div>
    </div>
  )
}

export default OrderProgress
