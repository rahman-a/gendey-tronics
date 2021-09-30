import React, {useState} from 'react'
import style from './style.module.scss'
import {CertificateStar, Star, DemandVideo, Person} from '../icons'

const CourseInstructor = () => {
    const [isInfo, setIsInfo] = useState(false)
    return (
        <div className={style.instructor}>
            <div className={style.instructor__name}>
                <h3>Mohamed Elgendy</h3>
                <p>senior mechanical automotive engineer</p>
            </div>
            <div className={style.instructor__overview}>
                <figure>
                    <img src="/images/instructor_info.png" alt="instructor" />
                </figure>
                <div className={style.instructor__overview_info}>
                    <ul>
                        <li>
                            <span>
                                <Star/> 
                            </span>
                            <p>4.6 Instructor Rating</p>
                        </li>
                        <li>
                            <span>
                                <CertificateStar/> 
                            </span>
                            <p>5,565 Reviews</p>
                        </li>
                        <li>
                            <span>
                                <Person/> 
                            </span>
                            <p>41,971 Students</p>
                        </li>
                        <li>
                            <span>
                                <DemandVideo/> 
                            </span>
                            <p>5 Courses</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.instructor__info}>
                <p style={{height: isInfo ? 'fit-content': '12rem'}}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                    et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                    no sea takimata sanctus est r sit amet. Lorem ipsum dolor sit 
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
                    kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
                    takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor 
                    sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                    invidunt ut labore et dolore magna aliquyam erat 
                </p>
                <button onClick={() => setIsInfo(prev =>!prev)}>
                    show {isInfo ?'less' : 'more'}
                </button>
            </div>
        </div>
    )
}

export default CourseInstructor
