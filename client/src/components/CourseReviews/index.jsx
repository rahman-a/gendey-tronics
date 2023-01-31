import React, { useState } from 'react'
import style from './style.module.scss'
import Review from './Review'
import { useSelector } from 'react-redux'
import strings from '../../localization'
const Reviews = ({ allReviews }) => {
  const [reviews, setReviews] = useState(allReviews.slice(0, 5))
  const [track, setTrack] = useState(5)
  const { lang } = useSelector((state) => state.language)

  const showMore = () => {
    setReviews(allReviews.slice(0, track + 5))
    setTrack(track + 5)
  }
  return (
    <div className={style.reviews}>
      <h3>{strings.course[lang].course_reviews}</h3>
      <div className={style.reviews__content}>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
        <button className={style.reviews__load} onClick={showMore}>
          {strings.general[lang].load_more}
        </button>
      </div>
    </div>
  )
}

export default Reviews
