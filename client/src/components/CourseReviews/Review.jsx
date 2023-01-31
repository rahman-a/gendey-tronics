import React, { useState, useRef } from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import { useSelector } from 'react-redux'
import strings from '../../localization'
import TimeAgo from 'react-timeago'
import { extractInitials } from '../../utils'
const Review = ({ review }) => {
  const comment = useRef(review.comment.substring(0, 200) + '...')
  const [showAll, setShowAll] = useState(false)
  const { lang } = useSelector((state) => state.language)
  return (
    <div className={style.review}>
      <div className={style.review__header}>
        <span className={style.review__avatar}>
          {extractInitials(review.name)}
        </span>
        <div className={style.review__user}>
          <span className={style.review__user_name}>{review.name}</span>
          <div className={style.review__value}>
            <Rating rating={review.rating} />
            <date className={style.review__date}>
              <TimeAgo date={review.createdAt} />
            </date>
          </div>
        </div>
      </div>
      <div className={style.review__body}>
        <p>{showAll ? review.comment : comment.current}</p>
        <button
          className={style.review__btn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? strings.general[lang].show_less
            : strings.general[lang].show_more}
        </button>
      </div>
    </div>
  )
}

export default Review
