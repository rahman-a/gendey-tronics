import React from 'react'
import style from './style.module.scss'
import { Modal, Button } from 'react-bootstrap'
import { Rating } from '../../components'
import { Comments } from '../../icons'

const Reviews = ({ reviews, isReviews, setIsReview }) => {
  return (
    <Modal show={isReviews} onHide={() => setIsReview(false)}>
      <Modal.Header>
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <Comments />
          <span style={{ marginLeft: '0.3rem' }}> Reviews </span>
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className={style.reviews}>
          {reviews && reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div className={style.reviews__review} key={review._id}>
                <div className={style.reviews__review_header}>
                  <h3>{review.name}</h3>
                  <Rating rating={review.rating} />
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size='lg'
          variant='secondary'
          onClick={() => setIsReview(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Reviews
