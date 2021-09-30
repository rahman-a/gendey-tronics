import React from 'react'
import style from './style.module.scss'
import Rating from '../rating'
import {Star} from '../icons'

const RatingStar = ({repeat}) => {
    return (
        [...Array(repeat)].map((_, idx) =>(
            <span key={idx}>
                <Star/>
            </span>
        ) ) 
    )
}

const CourseRating = () => {
    const rating = [83, 10, 5, 2, 0]
    return (
        <div className={style.rating}>
            <div className={style.rating__overall}>
                <h2>4.5</h2>
                <Rating rating={4.5}/>
                <p>Course Rating</p>
            </div>
            <div className={style.rating__progress}>
                {
                    rating.map((r, idx) => (
                        <div className={style.rating__progress_wrapper}>
                            <div className={style.rating__progress_bar} key={idx}>
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
