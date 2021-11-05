import React , {useRef}from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CourseCard from '../../components/CourseCard'
import CardSlider from '../../components/CardSlider'

const Courses = () => {
    const wrapperRef = useRef(null)
    return (
        <Template>
            <div className={style.courses}>
                <figure>
                    <img src="images/repair.jpg" alt="learn" />
                </figure>
                <div className={`container ${style.courses__container}`}>
                    <div className={style.courses__wrapper} ref={wrapperRef}>
                        <CardSlider 
                        length={6}
                        containerRef={wrapperRef}>
                            {
                                [...Array(6)].map((_, idx) => (
                                    <CourseCard key={idx} num={idx +1}/>
                                ))
                            }
                        </CardSlider>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default Courses
