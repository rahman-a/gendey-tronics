import React, {useState} from 'react'
import CourseCard from '../CourseCard'
import style from './style.module.scss'

const PurchasedCourses = () => {
    const [isCourses, setIsCourses] = useState(true)
    return (
        <div className={style.purchasedCourse}>
            {isCourses
            ?<div className={style.purchasedCourse__courses}>
                {
                    [...Array(3)].map((_, idx) => (
                        <CourseCard num={idx + 1}/>
                    ))
                }
            </div>
            :<div className={style.purchasedCourse__none}>
                    <p>You didn't purchase any courses yet</p>
                    <button>Browse the courses</button>
            </div>}
        </div>
    )
}

export default PurchasedCourses
