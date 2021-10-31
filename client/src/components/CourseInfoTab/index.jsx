import React from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import { useHistory, useLocation } from 'react-router'

const CourseInfoTab = () => {
    const history = useHistory()
    const location = useLocation()
    return (
        <div className={style.infoTab}>
            <div className={style.infoTab__info}>
                <h1>engine management system</h1>
                <div className={style.infoTab__rating}>
                    <p className={style.infoTab__rating_num}>
                        <span className={style.infoTab__rating_num_value}>4.5</span>
                        <Rating rating={4.5}/>
                    </p>
                    <p className={style.infoTab__rating_student}>
                        <span>(3060 rating)</span>
                        <span>37050 student</span>
                    </p>
                </div>
            </div>
            <div className={style.infoTab__cta}>
                <div className={style.infoTab__cta_price}>
                    <h3>$298</h3>
                    <p>80% off</p>
                </div>
                <button onClick={() => history.push(`${location.pathname}/payment`)}>Enroll Now</button>
            </div>
        </div>
    )
}

export default CourseInfoTab
