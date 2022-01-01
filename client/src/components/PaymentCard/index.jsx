import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Paypal, PaypalText} from '../icons'
import {Overlay} from '../Overlay'
import Loader from '../Loader'
import PaypalButtons from './paypal'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import constants from '../../constants'
import actions from '../../actions'
import strings from '../../localization'

const PaymentCard = ({type, course}) => {
  const [formError, setFormError] = useState(null)
  const [loadingState, setLoadingState] = useState(false)
  const path = useLocation().pathname
  const {items} =  useSelector(state => state.cartItems)
  const {lang} =  useSelector(state => state.language)
  const {error, order} = useSelector(state => state.newOrder)
  const {error:error_cart, message:clearCart} = useSelector(state => state.clearCart) 
  const {error:enroll_error, enrollId} = useSelector(state => state.newEnrollment)
  const {message} = useSelector(state => state.removeItem)


  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  
  // Capture Errors and Display it 
  const setError = error => {
    setFormError(error)
    setTimeout(() => {
      setFormError(null)
    }, 5000)
  }
  
  // complete Course Payment
  const completeCoursePayment = _ => {
    dispatch(actions.courses.newEnrollment(course._id))
  }

  // complete Product Payment
  const completeProductPayment = (orderDetails) => {
    dispatch(actions.products.newOrder(orderDetails))
  }

  

  useEffect(() => {
    if(order && items) {
      dispatch(actions.products.clearCart())
    }
    error && setError(error)
    error_cart && setError(error_cart)
    enroll_error && setError(enroll_error)
    if(clearCart) {
      setLoadingState(true)
      setTimeout(() => {
        setLoadingState(false)
        history.push(`${path}?process=delivery`) 
        dispatch({type:constants.product.CLEAR_CART_RESET})
      }, 2000);
    } 
    if(enrollId) {
      setLoadingState(true)
      setTimeout(() => {
        setLoadingState(false)
        history.push(`/course/${id}/learn?enroll=${enrollId}#overview`)
        dispatch({type:constants.courses.NEW_ENROLLMENT_RESET})
      }, 2000);  
    } 
  }, [order,path, error, clearCart, error_cart,enroll_error, enrollId, message])

  return (
    <div className={style.coursePayment__payment}
    style={{position:loadingState ? 'static' :'relative' }}>
      <Overlay toggle={loadingState}/>
      {loadingState && <Loader size='25' center custom={{color:'#F8C600',zIndex:'9999999'}}/>}
      <div
        className={style.coursePayment__error}
        style={{ top: formError ? '5%' : '-10%', opacity:formError ? '1' : '0' }}
      >
        <span>!</span> {formError}
        <div
          className={`${style.coursePayment__error_progress} 
            ${
              formError
                ? style.coursePayment__error_expand
                : style.coursePayment__error_collapse
            }`}
        ></div>
      </div>
      <div className={style.coursePayment__payment_wrapper}>
        <div className={style.coursePayment__options}>
          <p>{strings.general[lang].payment_info}</p>
          <div className={style.coursePayment__options_icons}>
            <span
              style={{ opacity:'1'}}
            >
              <Paypal style={{ width: '3rem' }} />
              <PaypalText />
            </span>
          </div>
        </div>
        <PaypalButtons
        type={type}
        setError={setError}
        cartItems={items}
        completeProductPayment={completeProductPayment}
        completeCoursePayment={completeCoursePayment}
        course={course}
        lang={lang}
        strings={strings}/>
      </div>
    </div>
  )
}

export default PaymentCard
