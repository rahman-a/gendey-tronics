import React, { useState } from 'react'
import style from './style.module.scss'
import { Mastercard, Visa, Paypal, PaypalText, ChevronDown } from '../icons'
import { Link } from 'react-router-dom'
import {months, years} from './date'

const PaymentCard = () => {
  const [paymentOption, setPaymentOption] = useState('mc')
  const [formError, setFormError] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState({})
  const [isAgreeTerm, setIsAgreeTerm] = useState(true)
  const setError = error => {
    setFormError(error)
    setTimeout(() => {
      setFormError(null)
    }, 5000)
  }
  const isFormValidated = (_) => {
    const paymentData = Object.keys(paymentInfo)
    const requiredData = {
      cardName:'Card Holder Name', 
      cardNumber:'Card Number', 
      expiryMonth:'Expiration Month', 
      expiryYear:'Expiration Year', 
      cvv:'CVV number'}
    if (paymentData.length === 0) {
      setError('Please Provide the Required Data')
      return false
    }
    for(let key in requiredData) {
      if(!(paymentData.includes(key))) {
        setError(`please provide the ${requiredData[key]}`)
        return false
      }
    }
    if(!isAgreeTerm) {
      setError('Please Agree the Sales Terms')
      return false
    }
    return true
  }
  const getPaymentInfoHandler = (e) => {
    const value = { [e.target.name]: e.target.value }
    setPaymentInfo({ ...paymentInfo, ...value })
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    setFormError(null)
    if (isFormValidated()) {
      console.log('payment info', paymentInfo)
    }
  }
  return (
    <div className={style.coursePayment__payment}>
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
          <p>Payment Information</p>
          <div className={style.coursePayment__options_icons}>
            <span
              className={style.coursePayment__options_mc}
              style={{ opacity: paymentOption === 'mc' ? '1' : '0.3' }}
              onClick={() => setPaymentOption('mc')}
            >
              <Mastercard />
              <span style={{ opacity: paymentOption === 'mc' ? '1' : '0.3' }}>
                mastercard
              </span>
            </span>
            <span
              onClick={() => setPaymentOption('vs')}
              style={{ opacity: paymentOption === 'vs' ? '1' : '0.3' }}
            >
              <Visa />
            </span>
            <span
              onClick={() => setPaymentOption('pp')}
              style={{ opacity: paymentOption === 'pp' ? '1' : '0.3' }}
            >
              <Paypal style={{ width: '3rem' }} />
              <PaypalText />
            </span>
          </div>
        </div>
        <form onSubmit={submitFormHandler}>
          <div className={style.coursePayment__data}>
            <label htmlFor='cardName'>Name</label>
            <input
              type='text'
              id='cardName'
              name='cardName'
              onChange={getPaymentInfoHandler}
              placeholder='Card holder name'
            />
          </div>
          <div className={style.coursePayment__data}>
            <label htmlFor='cardNumber'>Card Number</label>
            <input
              type='text'
              id='cardNumber'
              name='cardNumber'
              onChange={getPaymentInfoHandler}
              placeholder='Card number'
            />
          </div>
          <div className={style.coursePayment__info}>
            <div className={style.coursePayment__expiry}>
              <p>Expiry</p>
              <div className={style.coursePayment__expiry_wrapper}>
                <div
                  className={`${style.coursePayment__data} ${style.coursePayment__info_data}`}
                >
                  <div className={style.coursePayment__select}>
                    <span>
                      <ChevronDown />
                    </span>
                    <select
                      name='expiryMonth'
                      id='cardNumber'
                      onChange={getPaymentInfoHandler}
                    >
                      {months.map((month) => (
                        <option value={month.name}>{month.abbr}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className={`${style.coursePayment__data} ${style.coursePayment__info_data}`}
                >
                  <div className={style.coursePayment__select}>
                    <span>
                      <ChevronDown />
                    </span>
                    <select
                      name='expiryYear'
                      id='cardNumber'
                      onChange={getPaymentInfoHandler}
                    >
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={style.coursePayment__data}
              style={{ width: '5rem' }}
            >
              <p>CVV</p>
              <input
                type='text'
                placeholder='CVV'
                defaultValue='955'
                name='cvv'
                onChange={getPaymentInfoHandler}
              />
            </div>
          </div>
          <div className={style.coursePayment__terms}>
            <input
              type='checkbox'
              id='agreeTerms'
              checked={isAgreeTerm}
              name='isAgreed'
              onChange={() => setIsAgreeTerm((prev) => !prev)}
            />
            <label htmlFor='agreeTerms'>
              I Accept all <Link to='/sales-terms'>sales terms</Link>
            </label>
          </div>
          <button type='submit' className={style.coursePayment__complete}>
            complete payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentCard
