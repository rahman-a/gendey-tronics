import React, {useRef, useEffect} from 'react'
import CourseCard from '../CourseCard'
import style from './style.module.scss'
import CardSlider from '../CardSlider'
import {useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import Loader from '../Loader'
import Message from '../Message'

const PurchasedCourses = () => {
    const wrapperRef = useRef(null)
    const hash = useLocation().hash.substr(1)
    const dispatch = useDispatch()
    const {loading, error, courses} = useSelector(state => state.purchasedCourses)
    
    const fetchPurchasedCourse = () => {
        hash === 'course'
        && !courses 
        && dispatch(actions.courses.purchasedCourses())
    }
    
    useEffect(() => {
       fetchPurchasedCourse()
    }, [hash])
    return (  
        <div className='container'>
            <div className={style.purchasedCourse}
            style={{position:'relative', 
            minHeight:(loading || error) ? '35rem': '0',
            paddingTop:(loading || error) ? '3rem': '0'}}>
                {loading 
                ? <Loader size='25' center/>
                :error 
                ?<div style={{textAlign:'center'}}>
                    <img src="/images/no-courses.png" 
                    alt="no courses found" style={{width:'20rem'}}/>
                    <Message type='error' size='3' message={error}/>
                </div> 
                :courses 
                && <div className={style.purchasedCourse__courses}
                ref={wrapperRef}>
                    <CardSlider length={courses.length} containerRef={wrapperRef}>
                        {
                            courses.map(course => (
                                <CourseCard key={course._id} data={course} enrolled/>
                            ))
                        }
                    </CardSlider>
                </div>}
            </div>
        </div>
    )
}

export default PurchasedCourses
