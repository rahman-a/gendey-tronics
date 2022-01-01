import React, { useState, useRef } from 'react'
import style from './style.module.scss'
import { AccordionArrow, Play, File } from '../icons'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'

const AccordionItem = ({ lecture, wrapperRef, verticalTitle,tm, setLesson, chapterId, isPaid}) => {
  const [isLectureDesc, setIsLectureDesc] = useState(false)
  const descriptionRef = useRef(null)
  const {id} = useParams()
  const enrollId = new URLSearchParams(useLocation().search).get('enroll')
  const {enrollment} = useSelector(state => state.enrollmentData)
  const dispatch = useDispatch()

  const isLectureCompleted = () => {
    if(enrollment.completedLesson.includes(lecture._id)) {
      return true
    }
    return false
  }
  const toggleLectureDescriptionHandler = (_) => {
    if (isLectureDesc) {
      const holderHeight = descriptionRef.current.getBoundingClientRect().height
      const wrapperHeight = wrapperRef.current.getBoundingClientRect().height
      wrapperRef.current.style.height = `${wrapperHeight - holderHeight}px`
      setIsLectureDesc(false)
    } else {
      setIsLectureDesc(true)
      const holderHeight = descriptionRef.current.getBoundingClientRect().height
      const wrapperHeight = wrapperRef.current.getBoundingClientRect().height
      wrapperRef.current.style.height = `${holderHeight + wrapperHeight}px`
    }
  }
  const activateLessonHandler = () => {
    if(verticalTitle){
      setLesson(lecture)
      dispatch(actions.courses.controlProgress(id, enrollId, chapterId, lecture._id, 'add'))
    }
  }
  return (
    <div className={`${style.accordion__lecture} 
    ${verticalTitle && style.accordion__lecture_purchased}`}
    style={{display: verticalTitle ? 'block':'flex'}}
    onClick={activateLessonHandler}>
      <div
        className={style.accordion__lecture_name}
        style={{ height: isLectureDesc ? 'fit-content' : '2.5rem' }}
      >
        <p
          className={`${style.accordion__lecture_title}
            ${(!lecture.isPaid && !verticalTitle && isPaid) && style.accordion__lecture_title_free}`}
        >
          {
          verticalTitle 
          && <input type='checkbox' style={{marginRight:'0.5rem'}} checked={
            enrollment 
            && isLectureCompleted()
          }/>
          }
          {lecture.type === 'video' ? (
            <Play width='10' height='10' />
          ) : (
            <File width='10' height='10' />
          )} &nbsp;
          {lecture.title}
          {lecture.description && (
            <span onClick={toggleLectureDescriptionHandler}>
              <AccordionArrow
                style={{
                  transform: isLectureDesc ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </span>
          )}
        </p>
        {lecture.description && (
          <p
            className={style.accordion__lecture_description}
            ref={descriptionRef}
          >
            {lecture.description}
          </p>
        )}
      </div>
      <div className={style.accordion__lecture_info}>
        {!lecture.isPaid && !verticalTitle && isPaid && (
          <button className={style.accordion__lecture_preview}>Preview</button>
        )}
        {lecture.duration && (
          <span className={style.accordion__lecture_duration}>
            {tm(lecture.duration, 'cut')}
          </span>
        )}
      </div>
    </div>
  )
}

export default AccordionItem
