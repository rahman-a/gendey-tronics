import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Heart, HeartOutline } from '../icons'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants, { API_URL } from '../../constants'
import Loader from '../Loader'
import { tm } from '../../utils'
import CoursePrice from '../CoursePrice'

const Course = ({ fav, data, isAuth, enrolled }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [favLoading, setFavLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { lang } = useSelector((state) => state.language)
  const { isAdded } = useSelector((state) => state.addToWishlist)
  const { isRemoved } = useSelector((state) => state.removeFromWishlist)

  const setLikeHandler = (e) => {
    e.stopPropagation()
    setFavLoading(true)
    isLiked
      ? dispatch(actions.courses.removeFromWishlist(data._id))
      : dispatch(
          actions.courses.addToWishlist({ item: data._id, itemType: 'course' })
        )
  }
  const directCourseHandler = () => {
    dispatch({ type: constants.courses.VERIFY_COUPON_RESET })
    dispatch({ type: constants.courses.NEW_ENROLLMENT_RESET })
    if (enrolled && !data.isPaid) {
      history.push(`/course/${data._id}/learn?enroll=${data.enroll}`)
      return
    }

    history.push(`/course/${data._id}`)
  }

  useEffect(() => {
    ;(isAdded || isRemoved) && setFavLoading(false)
  }, [isAdded, isRemoved])

  useEffect(() => {
    data && setIsLiked(data.isFav)
  }, [data])

  return (
    <div
      className={`${style.courseCard} ${
        lang === 'ar' ? style.courseCard_ar : ''
      }`}
      onClick={directCourseHandler}
    >
      <figure>
        <img
          src={
            data?.image
              ? `${API_URL}/images/${data.image}`
              : '/images/img_placeholder.png'
          }
          alt={data ? data.name : 'Course Image'}
        />
        {fav && isAuth && (
          <span onClick={(e) => setLikeHandler(e)}>
            {favLoading ? (
              <Loader size='3' custom={{ padding: 0 }} />
            ) : isLiked ? (
              <Heart />
            ) : (
              <HeartOutline />
            )}
          </span>
        )}
      </figure>
      <div className={style.courseCard__content}>
        <h3>{data && data.name}</h3>
        <div className={style.courseCard__metadata}>
          <p className={style.courseCard__metadata_price}>
            {data.discount > 0 && (
              <span className={style['courseCard__metadata_price--discount']}>
                {data.price}$
              </span>
            )}
            <span className={style['courseCard__metadata_price--original']}>
              {Math.round(
                (data.price - (data.price * data.discount) / 100).toFixed(2)
              )}
              $
            </span>
          </p>
          <p className={style.courseCard__metadata_duration}>
            {lang === 'ar' ? (
              <>
                <span>مدة الدورة:</span>
                <span>{tm(data.time, lang)}</span>
              </>
            ) : (
              <>
                <span>Time:</span>
                <span>{tm(data.time, lang)}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Course
