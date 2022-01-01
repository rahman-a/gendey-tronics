import React, {useState} from 'react'
import style from './style.module.scss'
import {CertificateStar, Star, DemandVideo, Person} from '../icons'
import strings from '../../localization'

const CourseInstructor = ({instructor, lang}) => {
    const [isInfo, setIsInfo] = useState(false)
    return (
        <div className={style.instructor}>
            <div className={style.instructor__name}>
                <h3>{instructor.name}</h3>
                <p>{instructor.role}</p>
            </div>
            <div className={`${style.instructor__overview} ${lang === 'ar' ?style.instructor__overview_ar:''}`}>
                <figure>
                    <img src={
                        instructor.avatar 
                        ? `/api/images/${instructor.avatar}`
                        :"/images/instructor_info.png"
                    } alt="instructor" />
                </figure>
                <div className={style.instructor__overview_info}>
                    <ul>
                        <li>
                            <span>
                                <Star/> 
                            </span>
                            <p>{instructor.averageRating} Instructor Rating</p>
                        </li>
                        <li>
                            <span>
                                <CertificateStar/> 
                            </span>
                            <p>{
                            instructor.reviewsNumber > 1
                            ?`${instructor.reviewsNumber} ${lang === 'en' ? 'Reviews': 'تقييمات'}`
                            :`${instructor.reviewsNumber} ${lang === 'en' ? 'Review': 'تقييم'}`
                            }</p>
                        </li>
                        <li>
                            <span>
                                <Person/> 
                            </span>
                            <p>{
                            instructor.studentsNumber > 1
                            ? `${instructor.studentsNumber} ${lang === 'en' ? 'Students': 'طلبة'}`
                            : `${instructor.studentsNumber} ${lang === 'en' ? 'Student': 'طالب'}`
                            }</p>
                        </li>
                        <li>
                            <span>
                                <DemandVideo/> 
                            </span>
                            <p>{
                            instructor.coursesNumber > 1
                            ? `${instructor.coursesNumber} ${lang === 'en' ? 'Courses': 'دورات تدريبية'}`
                            : `${instructor.coursesNumber} ${lang === 'en' ? 'Course': 'دورة تدريبية'}`}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.instructor__info}>
                <p style={{height: isInfo ? 'fit-content': '12rem'}}>
                    {instructor.about} 
                </p>
                <button onClick={() => setIsInfo(prev =>!prev)}>
                    {isInfo ? strings.course[lang].read_less : strings.course[lang].read_more}
                </button>
            </div>
        </div>
    )
}

export default CourseInstructor
