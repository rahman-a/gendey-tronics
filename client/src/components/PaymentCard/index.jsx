import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Paypal, PaypalText, Fawery, MobileCash, Vodafone } from '../icons'
import { Overlay } from '../Overlay'
import Loader from '../Loader'
import PaypalButtons from './paypal'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import constants from '../../constants'
import actions from '../../actions'
import strings from '../../localization'

const PaymentCard = ({ type, course }) => {
  const [formError, setFormError] = useState(null)
  const [purchasingProduct, setPurchasingProduct] = useState(false)
  const [purchasingCourse, setPurchasingCourse] = useState(false)
  const [paymentType, setPaymentType] = useState('paypal')
  const path = useLocation().pathname
  const { items } = useSelector((state) => state.cartItems)
  const { lang } = useSelector((state) => state.language)
  const { error, order } = useSelector((state) => state.newOrder)
  const { error: error_cart, message: clearCart } = useSelector(
    (state) => state.clearCart
  )
  const { error: enroll_error, isCompleted } = useSelector(
    (state) => state.newEnrollment
  )
  const { message } = useSelector((state) => state.removeItem)

  const dispatch = useDispatch()
  const history = useHistory()

  // Capture Errors and Display it
  const setError = (error) => {
    setFormError(error)
    setTimeout(() => {
      setFormError(null)
    }, 5000)
  }

  // complete Course Payment
  const completeCoursePayment = (_) => {
    dispatch(actions.courses.newEnrollment(course._id))
  }

  // complete Product Payment
  const completeProductPayment = (orderDetails) => {
    dispatch(actions.products.newOrder(orderDetails))
  }

  useEffect(() => {
    if (clearCart) {
      setPurchasingProduct(true)
      setTimeout(() => {
        setPurchasingProduct(false)
        history.push(`${path}?process=delivery`)
        dispatch({ type: constants.product.CLEAR_CART_RESET })
      }, 2000)
    }
  }, [clearCart])

  useEffect(() => {
    if (isCompleted) {
      setPurchasingCourse(true)
      setTimeout(() => {
        setPurchasingCourse(false)
        history.push(`/account#order`)
        dispatch({ type: constants.courses.NEW_ENROLLMENT_RESET })
      }, 5000)
    }
  }, [isCompleted])

  useEffect(() => {
    if (order && items) {
      dispatch(actions.products.clearCart())
    }
    error && setError(error)
    error_cart && setError(error_cart)
    enroll_error && setError(enroll_error)
  }, [order, path, error, error_cart, enroll_error, message])

  return (
    <div
      className={style.coursePayment__payment}
      style={{
        position: purchasingCourse || purchasingProduct ? 'static' : 'relative',
      }}
    >
      <Overlay toggle={purchasingCourse || purchasingProduct} />
      {(purchasingCourse || purchasingProduct) && (
        <Loader
          size='8'
          center
          custom={{ color: '#F8C600', zIndex: '9999999' }}
        >
          {purchasingCourse && (
            <p style={{ width: '25rem', transform: 'translate(-10rem)' }}>
              {strings.course[lang].download_link_added}
            </p>
          )}
        </Loader>
      )}
      <div
        className={style.coursePayment__error}
        style={{
          top: formError ? '5%' : '-10%',
          opacity: formError ? '1' : '0',
        }}
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
              style={{ opacity: '1' }}
              onClick={() => setPaymentType('paypal')}
            >
              <Paypal style={{ width: '3rem' }} />
              <PaypalText />
            </span>
            <span
              style={{ opacity: '1' }}
              onClick={() => setPaymentType('fawery')}
            >
              <Fawery width='5em' height='5em' />
            </span>
            <span
              style={{ opacity: '1' }}
              onClick={() => setPaymentType('cash')}
            >
              <Vodafone width='4em' height='2.5em' />
            </span>
          </div>
        </div>
        {paymentType === 'paypal' ? (
          <PaypalButtons
            type={type}
            setError={setError}
            cartItems={items}
            completeProductPayment={completeProductPayment}
            completeCoursePayment={completeCoursePayment}
            course={course}
            lang={lang}
            strings={strings}
          />
        ) : paymentType === 'fawery' ? (
          <div className={style.coursePayment__fawery}>
            <h1>{strings.client[lang].fawery_soon}</h1>
          </div>
        ) : (
          paymentType === 'cash' && (
            <div className={style.coursePayment__cash}>
              <h3>
                {' '}
                {strings.client[lang].cash_message} <code> 01064345626 </code>{' '}
              </h3>
              <h4 style={{ lineHeight: lang === 'ar' ? 1.9 : 1.6 }}>
                {strings.client[lang].cash_contact_message}
                <em> support@gendyecu.com </em>
              </h4>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PaymentCard
