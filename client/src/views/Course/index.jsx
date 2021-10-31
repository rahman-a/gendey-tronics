import React, {useState} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CourseHeader from '../../components/CoursePageHeader'
import CourseOverview from '../../components/CoursePageOverview'
import CourseLearnPoints from '../../components/CourseLearnPoints'
import Accordion from '../../components/Accordion'
import CourseInstructor from '../../components/CourseInstructor'
import CourseRating from '../../components/CourseRating'
import CourseInfoTab from '../../components/CourseInfoTab'
import {content} from './contentData'
const Course = () => {
    const [showContent, setShowContent] = useState(false)
    const [showLearners, setShowLearners] = useState(false)
    return (
        <Template>
            <div className={style.course}>
               <CourseHeader/>
               <CourseOverview/>
               <CourseInfoTab/>
               <div className={`container ${style.course__container}`}>
                <CourseLearnPoints/>
                <div className={style.course__requirements}>
                    <h2 className={style.course__header}>Requirements</h2>
                    <ul className={style.course__requirements_list}>
                        <li className={style.course__requirements_item}>
                            there is no requirements for this course
                        </li>
                    </ul>
                </div>
                <div className={style.course__description}>
                    <h2 className={style.course__header}>Description</h2>
                    <div className={style.course__description_content}
                    style={{maxHeight: showContent ? 'fit-content':'10rem'}}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis atque hic 
                            autem assumenda laborum beatae explicabo sit, quisquam facere temporibus 
                            perspiciatis. Sunt nihil consequatur quam quidem quos velit commodi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis atque hic 
                            autem assumenda laborum beatae explicabo sit, quisquam facere temporibus 
                            perspiciatis. Sunt nihil consequatur quam quidem quos velit commodi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis atque hic 
                            autem assumenda laborum beatae explicabo sit, quisquam facere temporibus 
                            perspiciatis. Sunt nihil consequatur quam quidem quos velit commodi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis atque hic 
                            autem assumenda laborum beatae explicabo sit, quisquam facere temporibus 
                            perspiciatis. Sunt nihil consequatur quam quidem quos velit commodi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis atque hic 
                            autem assumenda laborum beatae explicabo sit, quisquam facere temporibus 
                            perspiciatis. Sunt nihil consequatur quam quidem quos velit commodi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis atque hic 
                            autem assumenda laborum beatae explicabo sit, quisquam facere temporibus 
                            perspiciatis. Sunt nihil consequatur quam quidem quos velit commodi ex.
                        </p>
                    </div>
                    <button onClick={() => setShowContent(prev => !prev)}>
                        {showContent ? 'read less': 'read more'}
                    </button>
                </div>
                <div className={style.course__learner}>
                    <h3>Who this course is for:</h3>
                    <ul className={style.course__learner_list}
                    style={{maxHeight: showLearners ? 'fit-content':'8rem'}}>
                        <li className={style.course__learner_item}>engineers</li>
                        <li className={style.course__learner_item}>amateurs</li>
                        <li className={style.course__learner_item}>professionals</li>
                        <li className={style.course__learner_item}>student</li>
                        <li className={style.course__learner_item}>engineers</li>
                    </ul>
                    <button onClick={() => setShowLearners(prev => !prev)}>
                        {showLearners ?'show less' : 'show more'}
                    </button>
                </div>
                <div className={style.course__content}>
                    <h2 className={style.course__header}>Course Content</h2>
                    <div className={style.course__content_wrapper}>
                        {
                            content.map(chapter => <Accordion chapter={chapter} key={chapter._id}/>)
                        }
                    </div>
                </div>
                <div className={style.course__instructor}>
                    <h2 className={style.course__header}>Instructor</h2>
                    <CourseInstructor/>
                </div>
                <div className={style.course__rating}>
                    <h2 className={style.course__header}>Student feedback</h2>
                    <CourseRating/>
                </div>
               </div>
            </div>
        </Template>
    )
}


export default Course
