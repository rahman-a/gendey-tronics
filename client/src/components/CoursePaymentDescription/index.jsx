import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import Loader from '../Loader'
import Message from '../Message'
import { useDispatch, useSelector } from 'react-redux'
import constants from '../../constants'
import strings from '../../localization'

const CoursePaymentDescription = ({ loading, error, data, coupon }) => {
  const [toggleContent, setToggleContent] = useState(false)
  const { lang } = useSelector((state) => state.language)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch({ type: constants.courses.GET_ONE_RESET })
    }
  }, [])
  return (
    <div
      className={style.coursePayment__course}
      style={{ padding: loading ? '20rem' : '1.5rem' }}
    >
      {loading ? (
        <Loader size='20' center />
      ) : error ? (
        <Message center type='error' message={error} />
      ) : (
        <>
          <div className={style.coursePayment__summery}>
            <figure>
              <img
                src={
                  data && data.image
                    ? `/api/images/${data.image}`
                    : '/images/img_placeholder.png'
                }
                alt={data ? data.name : 'Course Preview'}
              />
            </figure>
            <span className={style.coursePayment__separator}></span>
            <div className={style.coursePayment__price}>
              <h3>{strings.course[lang].summery}</h3>
              <div className={style.coursePayment__value}>
                <p>{strings.course[lang].original_price}</p>
                <p>{`$${data && data.original_Price}`}</p>
              </div>
              <div className={style.coursePayment__value}>
                <p>{strings.course[lang].total_discounts}</p>
                <p>
                  {data && coupon
                    ? `$${
                        (coupon?.discount * data?.price) / 100 +
                        (data?.discount * data?.original_Price) / 100
                      }`
                    : `$${(data?.discount * data?.original_Price) / 100}`}
                </p>
              </div>
              <div
                className={`${style.coursePayment__value} ${style.coursePayment__value_total}`}
              >
                <p>{strings.course[lang].total}</p>
                <p>
                  $
                  {data && coupon
                    ? (
                        data?.price -
                        (coupon?.discount * data?.price) / 100
                      ).toFixed(2)
                    : data?.price}
                </p>
              </div>
            </div>
          </div>
          <div className={style.coursePayment__description}>
            <h2>{data?.name}</h2>
            <p>
              {toggleContent
                ? data?.description
                : data?.description.slice(0, 200) + '...'}
            </p>
            <button onClick={() => setToggleContent((prev) => !prev)}>
              {toggleContent
                ? strings.course[lang].read_less
                : strings.course[lang].read_more}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CoursePaymentDescription
