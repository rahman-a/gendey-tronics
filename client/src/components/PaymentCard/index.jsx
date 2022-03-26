import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Download, Paypal, PaypalText} from '../icons'
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
  const [isAsset, setIsAsset] = useState(false)
  const path = useLocation().pathname
  const {items} =  useSelector(state => state.cartItems)
  const {lang} =  useSelector(state => state.language)
  const {error, order} = useSelector(state => state.newOrder)
  const {error:error_cart, message:clearCart} = useSelector(state => state.clearCart) 
  const {error:enroll_error, enrollId, asset} = useSelector(state => state.newEnrollment)
  const {fileData} = useSelector(state => state.downloadAsset)
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

  const deletePermission = () => {
    dispatch(actions.courses.deletePermission(asset))
  }

  const initiateFileDownload = () => {
    if(fileData) {
        // const link = `https://www.googleapis.com/drive/v3/files/${asset}/?key=${key}&alt=media`
        // const link = `https://drive.google.com/uc?id=${asset}&export=download`
        const anchor = document.createElement('a')
        anchor.href = fileData.webContentLink
        anchor.click()
        setLoadingState(false)
        setIsAsset(false)
        dispatch({type:constants.courses.NEW_ENROLLMENT_RESET})
        setTimeout(() => {
            deletePermission()
        },5000)
    }
  }

  const downloadAssetHandler = _ => {
    setLoadingState(true)
    setIsAsset(true)
    // get Download Key
    dispatch(actions.courses.downloadFile(asset))
  }
  
  useEffect(() => {
    fileData && initiateFileDownload()
  },[fileData])

  useEffect(() => {
    if(clearCart) {
      setLoadingState(true)
      setTimeout(() => {
        setLoadingState(false)
        history.push(`${path}?process=delivery`) 
        dispatch({type:constants.product.CLEAR_CART_RESET})
      }, 2000);
    } 
  },[clearCart])

  useEffect(() => {
    if(enrollId) {
      setLoadingState(true)
      setTimeout(() => {
        setLoadingState(false)
        history.push(`/course/${id}/learn?enroll=${enrollId}#overview`)
        dispatch({type:constants.courses.NEW_ENROLLMENT_RESET})
      }, 2000);  
    } 
  },[enrollId])

  useEffect(() => {
    asset && downloadAssetHandler()
  },[asset])

  useEffect(() => {
    if(order && items) {
      dispatch(actions.products.clearCart())
    }
    error && setError(error)
    error_cart && setError(error_cart)
    enroll_error && setError(enroll_error) 
  }, [order,path, error, error_cart,enroll_error,message])

  return (
    <div className={style.coursePayment__payment}
    style={{position:loadingState ? 'static' :'relative' }}>
      <Overlay toggle={loadingState}/>
      {loadingState && 
          <Loader size='8' center custom={{color:'#F8C600',zIndex:'9999999'}}>
           { isAsset && <p style={{
                width:'22rem', 
                transform:lang === 'ar' ? 'translateX(7rem)' :'translateX(-7rem)'
              }}>  
                {strings.course[lang].prepare_download_link}
            </p> }
          </Loader>
      }
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
