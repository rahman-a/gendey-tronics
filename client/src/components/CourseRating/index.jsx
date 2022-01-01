import React from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import {Star} from '../icons'
import {v4 as uuidv4} from 'uuid'
import strings from '../../localization'

const RatingStar = ({repeat}) => {
    return (
        [...Array(repeat)].map((_, idx) =>(
            <span key={idx}>
                <Star/>
            </span>
        ) ) 
    )
}

const CourseRating = ({data, lang}) => {
    const rating = [83, 10, 5, 2, 0]
    return (
        <div className={style.rating}>
            <div className={style.rating__overall}>
                <h2>{data.rating}</h2>
                <Rating rating={data.rating}/>
                <p>{strings.course[lang].course_rating}</p>
            </div>
            <div className={style.rating__progress}>
                {
                    data.ratingValues.map((r, idx) => (
                        <div className={style.rating__progress_wrapper} key={uuidv4()}>
                            <div className={
                                `${style.rating__progress_bar}
                                ${lang === 'ar' ?style.rating__progress_bar_ar :''}`
                            } key={idx}>
                                <div style={{width:`${r}%`}}></div>
                            </div>
                            <div className={style.rating__progress_stars}>
                                <div className={style.rating__progress_stars_count}>
                                    <RatingStar repeat={rating.length - idx}/>
                                </div>
                                <p>{r}%</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseRating
