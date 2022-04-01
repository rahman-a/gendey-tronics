import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Heart, HeartOutline} from '../icons'
import { useHistory} from 'react-router'
import {useSelector, useDispatch} from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../Loader'
import {tm} from '../../utils'

const Course = ({fav, data, isAuth, enrolled}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [favLoading, setFavLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const {lang}  = useSelector(state => state.language)
    const {isAdded}  = useSelector(state => state.addToWishlist)
    const {isRemoved} = useSelector(state => state.removeFromWishlist)
    
    const setLikeHandler = e => {
        e.stopPropagation()
        setFavLoading(true)
        isLiked ? dispatch(actions.courses.removeFromWishlist(data._id))
        :dispatch(actions.courses.addToWishlist({item:data._id, itemType:'course'}))
    }
    const directCourseHandler = () => {
        dispatch({type:constants.courses.VERIFY_COUPON_RESET})
        dispatch({type: constants.courses.NEW_ENROLLMENT_RESET})
        console.log({data});
        if(enrolled && !data.isPaid) {
            history.push(`/course/${data._id}/learn?enroll=${data.enroll}`)
            return
        }

        history.push(`/course/${data._id}`)
    }

    

    useEffect(() => {
        (isAdded || isRemoved) && setFavLoading(false)
    }, [isAdded, isRemoved])

    useEffect(() => {
        data && setIsLiked(data.isFav)
    },[data])

    return (
        <div className={`${style.courseCard} ${lang === 'ar' ? style.courseCard_ar:''}`} 
        onClick={directCourseHandler}>
          <figure>
              <img src={
                  data?.image
                  ? `/api/images/${data.image}`
                  : '/images/img_placeholder.png'} 
                alt={ data ? data.name : 'Course Image'} />
              {fav && isAuth 
              && <span onClick={(e) => setLikeHandler(e)}>
                {
                    favLoading
                    ? <Loader size='3' custom={{padding:0}}/>
                    : isLiked ? <Heart/>
                    : <HeartOutline/>
                }
              </span>}
          </figure>
          <div className={style.courseCard__content}>
                <h3>
                    { data && data.name}
                </h3>
                <p>{
                    lang === 'ar' 
                    ? `مدة الدورة : ${tm(data.time, lang)}`
                    : `Time : ${tm(data.time, lang)}`
                }</p>
          </div>
        </div>
    )
}

export default Course
