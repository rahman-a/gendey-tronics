import React, { useState, useRef } from 'react'
import style from './style.module.scss'
import { AccordionArrow, Play, File } from '../icons'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'

const AccordionItem = ({
  lecture,
  wrapperRef,
  verticalTitle,
  tm,
  setLesson,
  chapterId,
  isPaid,
}) => {
  const [isLectureDesc, setIsLectureDesc] = useState(false)
  const descriptionBlockRef = useRef(null)
  const descriptionContentRef = useRef(null)
  const { id } = useParams()
  const enrollId = new URLSearchParams(useLocation().search).get('enroll')
  const { enrollment } = useSelector((state) => state.enrollmentData)
  const dispatch = useDispatch()

  const isLectureCompleted = () => {
    if (enrollment.completedLesson.includes(lecture._id)) {
      return true
    }
    return false
  }
  const toggleLectureDescriptionHandler = (_) => {
    if (isLectureDesc) {
      const holderHeight =
        descriptionContentRef.current.getBoundingClientRect().height
      const wrapperHeight = wrapperRef.current.getBoundingClientRect().height
      wrapperRef.current.style.height = `${wrapperHeight - holderHeight}px`
      descriptionBlockRef.current.style.height = 0
      setIsLectureDesc(false)
    } else {
      setIsLectureDesc(true)
      const holderHeight =
        descriptionContentRef.current.getBoundingClientRect().height
      const wrapperHeight = wrapperRef.current.getBoundingClientRect().height
      wrapperRef.current.style.height = `${holderHeight + wrapperHeight}px`
      descriptionBlockRef.current.style.height = `${holderHeight}px`
    }
  }
  const activateLessonHandler = () => {
    if (verticalTitle) {
      setLesson(lecture)
      dispatch(
        actions.courses.controlProgress(
          id,
          enrollId,
          chapterId,
          lecture._id,
          'add'
        )
      )
    }
  }
  return (
    <div
      className={`${style.accordion__lecture} 
    ${verticalTitle && style.accordion__lecture_purchased}`}
      style={{ display: verticalTitle ? 'block' : 'flex' }}
      onClick={activateLessonHandler}
    >
      <div
        className={style.accordion__lecture_name}
        onClick={toggleLectureDescriptionHandler}
        // style={{ height: isLectureDesc ? 'fit-content' : '2.5rem' }}
      >
        <p
          className={`${style.accordion__lecture_title}
            ${
              !lecture.isPaid &&
              !verticalTitle &&
              isPaid &&
              style.accordion__lecture_title_free
            }`}
        >
          {verticalTitle && (
            <input
              type='checkbox'
              style={{ marginRight: '0.5rem' }}
              checked={enrollment && isLectureCompleted()}
            />
          )}
          {lecture.type === 'video' ? (
            <Play width='10' height='10' />
          ) : (
            <File width='10' height='10' />
          )}
          &nbsp;
          {lecture.title}
          {lecture.description && (
            <span onClick={toggleLectureDescriptionHandler}>
              <AccordionArrow
                style={{
                  transform: isLectureDesc
                    ? 'translateY(-0.2rem) rotate(180deg)'
                    : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </span>
          )}
        </p>
        {lecture.description && (
          <div
            className={style.accordion__lecture_description}
            ref={descriptionBlockRef}
          >
            <p
              className={style['accordion__lecture_description--p']}
              ref={descriptionContentRef}
            >
              {lecture.description}
            </p>
          </div>
        )}
      </div>
      <div className={style.accordion__lecture_info}>
        {/* comment the free preview and will uncomment if the client want this feature */}
        {/* {!lecture.isPaid && !verticalTitle && isPaid && (
          <button className={style.accordion__lecture_preview}>Preview</button>
        )} */}
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
