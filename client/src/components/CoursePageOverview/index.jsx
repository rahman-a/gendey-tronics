import React, {useEffect, useState} from 'react'
import style from './style.module.scss'
import {
  Infinity,
  DemandVideo,
  CertificateStar,
  Mobile,
} from '../icons'
import { useHistory, useLocation, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import Loader from '../Loader'
import Message from '../Message'
import strings from '../../localization'

const CourseOverview = ({data}) => {
  const [couponCode, setCouponCode] = useState('')
  const {id} = useParams()
  const dispatch = useDispatch()
  const {isAuth} = useSelector(state => state.client)
  const {lang} = useSelector(state => state.language)
  const {loading, error, enrollId} = useSelector(state => state.newEnrollment)
  const {loading:loading_c, error:error_c, coupon} = useSelector(state => state.verifyCoupon)
  const history = useHistory()
  const location = useLocation()
  
  const directClientHandler = () => {
    if(!isAuth) {
      history.push(`/login?redirect=${location.pathname}`)
      return
    }
    if(!(data.isEnrolled) && !data.isPaid) {
      dispatch(actions.courses.newEnrollment(id))
      return
    }
    
    data.isEnrolled
    ? history.push(`${location.pathname}/learn?enroll=${data.enroll}#overview`)
    : data.isPaid ? history.push(`${location.pathname}/payment`)
    : history.push(`${location.pathname}/learn?enroll=${data.enroll}#overview`)
    
  }
  
  const applyCouponHandler = () => {
    dispatch(actions.courses.applyCoupon(couponCode))
  }

  const tm = (se) => {
    let h = (se /60 /60)
    if(h < 1){
       let  t =  Math.ceil((h * 100).toFixed(2)) + ' minutes'
        return t 
    }
    if(h === 1) return Math.ceil(h.toFixed(2)) + ' hour'
    return Math.ceil(h.toFixed(2))  + ' hours'
  }
  useEffect(() => {
      enrollId && history.push(`${location.pathname}/learn?enroll=${enrollId}#overview`)
  },[history, location, data, enrollId, coupon])

  return (
    <div className={`${style.overview} ${lang === 'ar' ? style.overview_ar :''}`}>
      <div className={style.overview__blur}></div>
      <div className={style.overview__content}>
        <div className={style.overview__video}>
          <figure>
            {/* add data.video here */}
              <iframe
              className={style.overview__video_frame}
              src={data.video}
              title={data.title}
              frameBorder="0" 
              allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture" 
              allowFullScreen></iframe>
          </figure>
        </div>
        <div className={style.overview__cta}>
          {data.isEnrolled
          ?<div className={style.overview__enrolled}>
            <p>{strings.course[lang].enrolled_date} {data.date}</p>
          </div>
          :data.isPaid ? <div className={style.overview__price} style={{direction:'ltr'}}>
            <p>{`$${
              coupon?.success 
              ? Math.round(data.price - (data.price * coupon.discount / 100)).toFixed(2) 
              : data.price
              }`}</p>
            <span>{`${data?.discount}% ${strings.course[lang].off}`}</span>
          </div>
          :<div className={style.overview__price}>
            <p style={{color:'#555'}}>
              {strings.course[lang].free}
            </p>
          </div>}
          {error && <Message type='error' size='2.5' message={error}/>}
          <button onClick={directClientHandler} style={{
            position:'relative',
            padding: loading ? '3rem' : '1rem'
            }}>
           {loading 
           ? <Loader size='5' center/>
           : data.isEnrolled 
           ? strings.course[lang].enrolled_course 
           :strings.course[lang].enroll}
          </button>
        </div>
        <div className={
          `${style.overview__info}
          ${lang === 'ar' ?style.overview__info_ar:''}`
        }>
          <div className='container'>
            <p>{strings.course[lang].include}</p>
            <ul>
              <li>
                <span>
                  <DemandVideo />
                </span>
                {tm(data.duration)} {strings.course[lang].duration}
              </li>
              {/* <li>
                <span>
                  <Download />
                </span>
                1 downloadable resource
              </li> */}
              {/* <li>
                <span>
                  <File />
                </span>
                1 practice test
              </li> */}
              <li>
                <span>
                  <Infinity />
                </span>
                {strings.course[lang].lifetime}
              </li>
              <li>
                <span>
                  <Mobile />
                </span>
                {strings.course[lang].responsive}
              </li>
              <li>
                <span>
                  <CertificateStar />
                </span>
                {strings.course[lang].certificate}
              </li>
            </ul>
            {error_c ? <Message 
            type='error' 
            size='2.3' 
            message={error_c}
            custom={{
              marginBottom:'-1rem', 
              textAlign:lang === 'ar' ? 'center':'left', 
              marginLeft:'1rem'}}/>
            :coupon && <Message 
            type='success' 
            size='2.3' 
            message={`${coupon.coupon} is Applied`}
            custom={{
              marginBottom:'-1rem', 
              textAlign:lang === 'ar' ? 'center':'left', 
              marginLeft:'1rem'}}/>
            }
            <div className={
              `${style.overview__coupon}
              ${lang === 'ar' ? style.overview__coupon_ar :''}`
            }>
              <input type='text' name='coupon' placeholder='enter coupon' 
              onChange={(e) => setCouponCode(e.target.value)}/>
              <button
              onClick={applyCouponHandler}>{
                loading_c 
                ? <Loader size='4'/>
                : strings.course[lang].apply
              }</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseOverview
