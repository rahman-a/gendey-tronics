import React, { useEffect } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import PaymentCard from '../../components/PaymentCard'
import CoursePaymentDescription from '../../components/CoursePaymentDescription'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'

const CoursePayment = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, error, course } = useSelector((state) => state.courseData)
  const { coupon } = useSelector((state) => state.verifyCoupon)

  useEffect(() => {
    id && dispatch(actions.courses.getCourse(id, 'preview'))
    return () => {
      course && dispatch({ type: constants.courses.GET_ONE_RESET })
    }
  }, [id, dispatch])
  return (
    <Template>
      <div className={style.coursePayment}>
        <div className={style.coursePayment__pay}>
          {course && (
            <PaymentCard
              type='course'
              course={{
                _id: course._id,
                name: course.name,
                price: course.price,
                original_Price: course.original_Price,
                discount: course.discount,
              }}
            />
          )}
        </div>
        <CoursePaymentDescription
          loading={loading}
          error={error}
          data={course}
          coupon={coupon}
        />
      </div>
    </Template>
  )
}

export default CoursePayment
