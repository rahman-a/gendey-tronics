import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import ReactStars from 'react-awesome-stars-rating'
import { v4 as uuidv4 } from 'uuid'
import Loader from '../Loader'
import Message from '../Message'
import actions from '../../actions'
import strings from '../../localization'
const Rating = ({ id }) => {
  const [ratingText, setRatingText] = useState('')
  const [ratingValue, setRatingValue] = useState(0.0)
  const [reviewEdit, setReviewEdit] = useState(true)
  const [update, setUpdate] = useState(false)
  const [reviewId, setReviewId] = useState(null)
  const { loading, error, message } = useSelector((state) => state.addReview)
  const { review } = useSelector((state) => state.getReview)
  const { lang } = useSelector((state) => state.language)
  const {
    loading: update_loading,
    message: update_message,
    error: error_message,
  } = useSelector((state) => state.updateReview)
  const dispatch = useDispatch()

  const createReviewHandler = (_) => {
    const data = {
      course: id,
      comment: ratingText,
      rating: ratingValue,
    }
    console.log('add review', data)
    dispatch(actions.courses.addReview(data))
  }

  const updateReviewHandler = (_) => {
    const data = {
      comment: ratingText,
      rating: ratingValue,
    }
    dispatch(actions.courses.updateReview(reviewId, data))
  }

  const ratingChanged = (rating) => {
    setRatingValue(rating)
  }

  const updateRatingComment = (id, comment) => {
    setReviewEdit(true)
    setUpdate(true)
    setRatingText(comment)
    setReviewId(id)
  }

  const cancelReviewHandler = (_) => {
    setReviewEdit(false)
    setUpdate(false)
  }

  useEffect(() => {
    !review && dispatch(actions.courses.getReview(id))
    if (review) {
      setReviewEdit(false)
      setRatingValue(review.rating)
      setUpdate(false)
    }
  }, [message, review])
  return (
    <div className={style.rating}>
      {review && (
        <>
          <div className={style.rating__stars}>
            <ReactStars
              count={5}
              size={50}
              value={review.rating}
              isEdit={false}
              isHalf={true}
              activeColor='#ffd700'
            />
            <span className={style.rating__value}>{review.rating}</span>
          </div>
          <div className={style.rating__content}>
            <p>{review.comment}</p>
            {!update && (
              <Button
                onClick={() => updateRatingComment(review._id, review.comment)}
              >
                {strings.course[lang].update}
              </Button>
            )}
          </div>
        </>
      )}
      {reviewEdit && (
        <>
          <div className={style.rating__stars}>
            <ReactStars
              id={`${uuidv4()}`}
              count={5}
              onChange={ratingChanged}
              size={50}
              value={ratingValue}
              isEdit={true}
              isHalf={true}
              activeColor='#ffd700'
            />
            <span className={style.rating__value}>{ratingValue}</span>
          </div>
          <div className={style.rating__canvas}>
            <textarea
              name='note'
              onChange={(e) => setRatingText(e.target.value)}
              value={ratingText}
            ></textarea>
          </div>
          <div className={style.rating__actions} style={{ direction: 'ltr' }}>
            {loading || update_loading ? (
              <Loader size='4' />
            ) : error || update_message ? (
              <Message
                type='error'
                size='2.2'
                width='max-content'
                custom={{ marginRight: '1rem' }}
                message={error || error_message}
              />
            ) : (
              (message || update_message) && (
                <Message
                  type='success'
                  size='2.2'
                  width='max-content'
                  custom={{ marginRight: '1rem' }}
                  message={message || error_message}
                />
              )
            )}
            {update ? (
              <Button
                variant='dark'
                disabled={update_loading}
                onClick={updateReviewHandler}
              >
                {strings.course[lang].update}
              </Button>
            ) : (
              <Button
                variant='dark'
                disabled={loading}
                onClick={createReviewHandler}
              >
                {strings.course[lang].save}
              </Button>
            )}
            <Button variant='danger' onClick={cancelReviewHandler}>
              {strings.course[lang].cancel}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Rating
