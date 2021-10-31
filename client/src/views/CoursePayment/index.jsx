import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import PaymentCard from '../../components/PaymentCard'
import CoursePaymentDescription from '../../components/CoursePaymentDescription'

const CoursePayment = () => {
  
  return (
    <Template>
      <div className={style.coursePayment}>
        <div className={style.coursePayment__pay}>
          <PaymentCard type='course'/>
        </div>
        <CoursePaymentDescription/>
      </div>
    </Template>
  )
}

export default CoursePayment
