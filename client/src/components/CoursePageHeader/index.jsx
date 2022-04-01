import React, {useState,useEffect} from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import {CertificateStar, Earth, Heart} from '../icons'
import Loader from '../Loader'
import Message from '../Message'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import constants from '../../constants'
import actions from '../../actions'
import strings from '../../localization'

const CourseHeader = ({data}) => {
    const [couponCode, setCouponCode] = useState('')
    const [isFavourite, setIsFavourite]  = useState(false)
    const {loading, error, coupon} = useSelector(state => state.verifyCoupon)
    const {isAuth} = useSelector(state => state.client)
    const {loading:loading_a, isAdded} = useSelector(state => state.addToWishlist)
    const {loading:loading_r, isRemoved} = useSelector(state => state.removeFromWishlist)
    const {lang} = useSelector(state => state.language)
    const {id} = useParams()
    const dispatch = useDispatch()

    const alertMessageStyle = _ => {
        let style = {display:'none'}
        if(window.matchMedia("(max-width:61.99em)").matches) {
            style = {
                display:'block', 
                margin:'1rem', 
                color:'#fff',
                textAlign:lang === 'en' ? 'left':'right'}
        }
        return style
    }
    const applyCouponHandler = () => {
        dispatch(actions.courses.applyCoupon(couponCode))
    }
    
    const toggleProductWishlist = () => {
        isFavourite
        ? dispatch(actions.courses.removeFromWishlist(id))
        : dispatch(actions.courses.addToWishlist({itemType:'course', item:id}))
    }

    const shareButtonLink = _ => {
        const fbShare = 'https://www.facebook.com/plugins/share_button.php?'
        const targetShareLink = `href=https://www.gendyecu.com/course/${id}`
        const layout = '&layout=button'
        const size = '&size=large'
        const appId = '&appId=334113855052556'
        const width = '&width=150'
        const height = '&height=80'
        const shareLink = fbShare + targetShareLink + layout + size + appId + width + height
        return shareLink
    }
    
    useEffect(() => {
        data && setIsFavourite(data.isFav)
        return () => {
           dispatch({type:constants.courses.ADD_COURSE_TO_WISHLIST_RESET})
           dispatch({type:constants.courses.REMOVE_COURSE_FROM_WISHLIST_RESET})
        }
    },[isAdded, isRemoved])
    return (
        <div className={style.header}>
            <figure className={style.header__figure}>
                <img src="/images/repair.jpg" alt="course background" />
            </figure>
            <div className={style.header__content}>
                <div className="container">
                    <div className={style.header__content_video}>
                        <figure>
                            <iframe
                                className={style.header__content_frame}
                                src={data?.video}
                                title={data?.title}
                                frameBorder="0" 
                                allow="accelerometer; 
                                autoplay; 
                                clipboard-write; 
                                encrypted-media; 
                                gyroscope; 
                                picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </figure>
                    </div>
                    <h1>{data.name}</h1>
                    <p className={style.header__description}>{data.description.substr(0,550) + '.....'}</p>
                    <div className={style.header__rating}>
                        <p className={`${style.header__rating_num} ${lang === 'ar' ?style.header__rating_num_ar :''}`}>
                            <span className={lang === 'en' ? style.header__rating_num_value 
                            : style.header__rating_num_ar_value}>{data.rating}</span>
                            <Rating rating={data.rating}/>
                        </p>
                        <p className={style.header__rating_student}>
                            <span>{data.reviewNumbers 
                            ? `(${data.reviewNumbers} ${strings.course[lang].rating})`  
                            : `(0 ${strings.course[lang].rating})`}</span>
                            <span>{data.students} {strings.course[lang].student}</span>
                        </p>
                    </div>
                    <div className={style.header__creator}>
                        <p className={style.header__creator_name}>
                            {strings.course[lang].created} {data.instructor}
                        </p>
                        <p className={style.header__creator_update}>
                          <span><CertificateStar/></span> {strings.course[lang].last_updated} {data.updatedAt}
                          &nbsp; <span><Earth/></span>  
                          &nbsp; <span style={{textTransform:'capitalize', color:'#fff'}}>{data.language}</span>
                        </p>
                    </div>
                    <div className={style.header__cta}>
                        {isAuth 
                        && <button 
                        onClick={toggleProductWishlist}
                        style={{position:'relative'}}
                        title={isFavourite 
                        ? strings.course[lang].remove_wishlist 
                        : strings.course[lang].add_wishlist}>
                             {(loading_a || loading_r) 
                            && <Loader size='4' center/> }
                            {isFavourite 
                            ? <Heart/> 
                            : strings.course[lang].wishlist}
                        </button>}
                        <div style={{display:'grid'}}>
                            <iframe 
                            title='social_media_share_button'
                            src={shareButtonLink()}
                            width="67" 
                            height="20" 
                            style={{border:'none', overflow:'hidden'}} 
                            scrolling="no" 
                            frameborder="0" 
                            allowfullscreen="true" 
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                            </iframe>
                        </div>
                        {/* <button>{strings.course[lang].share}</button> */}
                        {/* <button>{strings.course[lang].gift}</button> */}
                    </div>
                    {error ? <Message 
                    type='error' 
                    size='2' 
                    message={error}
                    custom={alertMessageStyle()}/>
                    :coupon && <Message 
                    type='success' 
                    size='2' 
                    message={`${coupon.coupon} is Applied`}
                    custom={alertMessageStyle()}/>
                    }
                    <div className={
                        `${style.header__coupon}
                        ${lang === 'ar' ?style.header__coupon_ar :''}`
                    }>
                        <input 
                        type='text' 
                        name='coupon' 
                        placeholder='enter coupon' 
                        onChange={(e) => setCouponCode(e.target.value)}/>
                        <button
                        onClick={applyCouponHandler}>{
                            loading 
                            ? <Loader size='4'/>
                            : strings.course[lang].apply
                        }</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseHeader
