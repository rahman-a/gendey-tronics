import React, {useState} from 'react'
import style from './style.module.scss'
import {Button, Badge} from 'react-bootstrap'
import {Reviews} from '../../components'
import {CertificateStar, Star, DemandVideo, Person} from '../../icons'


const CourseInstructor = ({instructor}) => {
    const [isInfo, setIsInfo] = useState(false)
    const [isReviews, setIsReviews] = useState(false)
    return (
        <div className={style.instructor}>


        <Reviews
        isReviews={isReviews}
        setIsReview={setIsReviews}
        reviews={instructor.reviews}
        />

            <div className={style.instructor__name}>
                <h3>
                    {instructor.name}
                    {
                        instructor.reviews.length 
                        ? (
                            <Button 
                            variant='warning' 
                            className='mx-3'
                            onClick={() => setIsReviews(true)}> 
                                show reviews 
                            </Button>
                          )
                        : <Badge bg='danger'>No Reviews yet</Badge>
                    }
                </h3>
                <p>{instructor.role}</p>
            </div>
            <div className={style.instructor__overview}>
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
                            ?`${instructor.reviewsNumber} Reviews`
                            :`${instructor.reviewsNumber} Review`
                            }</p>
                        </li>
                        <li>
                            <span>
                                <Person/> 
                            </span>
                            <p>{
                            instructor.studentsNumber > 1
                            ? `${instructor.studentsNumber} Students`
                            : `${instructor.studentsNumber} Student`
                            }</p>
                        </li>
                        <li>
                            <span>
                                <DemandVideo/> 
                            </span>
                            <p>{
                            instructor.coursesNumber > 1
                            ? `${instructor.coursesNumber} Courses`
                            : `${instructor.coursesNumber} Course`}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.instructor__info}>
                <p style={{height: isInfo ? 'fit-content': '12rem'}}>
                    {instructor.about} 
                </p>
                <button onClick={() => setIsInfo(prev =>!prev)}>
                    {isInfo ? 'Read Less' : 'Read More'}
                </button>
            </div>
        </div>
    )
}

export default CourseInstructor
