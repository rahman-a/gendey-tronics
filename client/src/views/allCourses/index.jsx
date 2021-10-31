import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CourseCard from '../../components/CourseCard'

const Courses = () => {
    return (
        <Template>
            <div className={style.courses}>
                <figure>
                    <img src="images/repair.jpg" alt="learn" />
                </figure>
                <div className={`container ${style.courses__container}`}>
                    <div className={style.courses__wrapper}>
                        {
                            [...Array(6)].map((_, idx) => (
                                <CourseCard key={idx} num={idx +1}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default Courses
