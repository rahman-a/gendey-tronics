import React, {useRef} from 'react'
import CourseCard from '../CourseCard'
import style from './style.module.scss'
import CardSlider from '../CardSlider'

const PurchasedCourses = () => {
    const wrapperRef = useRef(null)
    const isCourses = true
    return (
        <div className='container'>
            <div className={style.purchasedCourse}>
                {isCourses
                ?<div className={style.purchasedCourse__courses}
                ref={wrapperRef}>
                    <CardSlider length={5} containerRef={wrapperRef}>
                        {
                            [...Array(5)].map((_, idx) => (
                                <CourseCard num={idx + 1}/>
                            ))
                        }
                    </CardSlider>
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
