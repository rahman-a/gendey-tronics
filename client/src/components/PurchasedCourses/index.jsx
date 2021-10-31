import React from 'react'
import CourseCard from '../CourseCard'
import style from './style.module.scss'

const PurchasedCourses = () => {
    const isCourses = true
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className={style.purchasedCourse}>
                {isCourses
                ?<div className={style.purchasedCourse__courses}>
                    {
                        [...Array(4)].map((_, idx) => (
                            <CourseCard num={idx + 1}/>
                        ))
                    }
                </div>
                :<div className={style.purchasedCourse__none}>
                        <p>You didn't purchase any courses yet</p>
                        <button>Browse the courses</button>
                </div>}
            </div>
        </div>
    )
}

export default PurchasedCourses
