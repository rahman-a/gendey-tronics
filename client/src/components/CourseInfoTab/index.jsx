import React, {useEffect} from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import { useHistory, useLocation, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import strings from '../../localization'

const CourseInfoTab = ({data}) => {
    const history = useHistory()
    const location = useLocation()
    const {id} = useParams()
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.client)
    const {lang} = useSelector(state => state.language)
    const {enrollId} = useSelector(state => state.newEnrollment)
    const {coupon} = useSelector(state => state.verifyCoupon)
    
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
    useEffect(() => {
        enrollId && history.push(`${location.pathname}/learn?enroll=${enrollId}#overview`)
    },[history, location, data, enrollId])
    return (
        <div className={style.infoTab}>
            <div className={style.infoTab__info}>
                <h1>{data?.title}</h1>
                <div className={style.infoTab__rating}>
                    <p className={`
                        ${style.infoTab__rating_num}
                        ${lang === 'ar' ? style.infoTab__rating_num_ar :''}
                    `}>
                        <span className={`
                            ${style.infoTab__rating_num_value}
                            ${lang === 'ar' ? style.infoTab__rating_num_ar_value :''}
                        `}>{data?.rating}</span>
                        <Rating rating={data?.reviewNumbers}/>
                    </p>
                    <p className={style.infoTab__rating_student}>
                        <span>{`(${data?.reviewNumbers} ${strings.course[lang].rating})`}</span>
                        <span>{`(${data?.students} ${strings.course[lang].student})`}</span>
                    </p>
                </div>
            </div>
            <div className={style.infoTab__cta}>
                {!(data?.isEnrolled) 
                && <div className={`
                ${style.infoTab__cta_price}
                ${style.infoTab__cta_price_ar}`}>
                    <h3>{`$${
                        coupon?.success
                        ? Math.round(data?.price - ((coupon?.discount  * data?.price) / 100)).toFixed(2)
                        :data?.price
                        }`}</h3>
                    <p>{`${
                        coupon?.success 
                        ? coupon.discount
                        :data?.discount
                        }% ${strings.course[lang].off}`}</p>
                </div>}
                <button onClick={directClientHandler}
                style={{padding:data?.isEnrolled ?'1.2rem' :'0.5rem'}}>
                    {data?.isEnrolled 
                    ? strings.course[lang].enrolled_course
                    : strings.course[lang].enroll}
                </button>
            </div>
        </div>
    )
}

export default CourseInfoTab
