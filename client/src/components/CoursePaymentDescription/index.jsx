import React, {useState} from 'react'
import style from './style.module.scss'

const CoursePaymentDescription = () => {
    const [toggleContent, setToggleContent] = useState(false)

    return (
        <div className={style.coursePayment__course}>
          <div className={style.coursePayment__summery}>
            <figure>
              <img src='/images/img-2.png' alt='courseImage' />
            </figure>
            <span className={style.coursePayment__separator}></span>
            <div className={style.coursePayment__price}>
              <h3>Summery</h3>
              <div className={style.coursePayment__value}>
                <p>Original price:</p>
                <p>$74.99</p>
              </div>
              <div className={style.coursePayment__value}>
                <p>Coupon discounts:</p>
                <p>-$65.00</p>
              </div>
              <div
                className={`${style.coursePayment__value} ${style.coursePayment__value_total}`}
              >
                <p>Total:</p>
                <p>$9.99</p>
              </div>
            </div>
          </div>
          <div className={style.coursePayment__description}>
            <h2>Engine Management System</h2>
            <p style={{ height: toggleContent ? 'fit-content' : '20rem' }}>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              odit soluta veniam eligendi incidunt nulla alias nobis voluptate
              nihil minus culpa repellendus adipisci possimus architecto quaerat
              saepe perferendis, ullam temporibus Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laborum odit soluta veniam eligendi
              incidunt nulla alias nobis voluptate nihil minus culpa repellendus
              adipisci possimus architecto quaerat saepe perferendis, ullam
              temporibus Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laborum odit soluta veniam eligendi incidunt nulla alias
              nobis voluptate nihil minus culpa repellendus adipisci possimus
              architecto quaerat saepe perferendis, ullam temporibus Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laborum odit soluta
              veniam eligendi incidunt nulla alias nobis voluptate nihil minus
              culpa repellendus adipisci possimus architecto quaerat saepe
              perferendis, ullam temporibus Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laborum odit soluta veniam eligendi
              incidunt nulla alias nobis voluptate nihil minus culpa repellendus
              adipisci possimus architecto quaerat saepe perferendis, ullam
              temporibus?
            </p>
            <button onClick={() => setToggleContent((prev) => !prev)}>
              Read {toggleContent ? 'less' : 'more'}
            </button>
          </div>
        </div>
    )
}

export default CoursePaymentDescription
