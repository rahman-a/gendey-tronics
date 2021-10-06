import React, { useState, useRef } from 'react'
import style from './style.module.scss'
import { AccordionArrow, Play, File } from '../icons'

const AccordionItem = ({ lecture, wrapperRef, verticalTitle}) => {
  const [isLectureDesc, setIsLectureDesc] = useState(false)
  const descriptionRef = useRef(null)

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
  return (
    <div className={`${style.accordion__lecture} 
    ${verticalTitle && style.accordion__lecture_purchased}`}
    style={{display: verticalTitle ? 'block':'flex'}}>
      <div
        className={style.accordion__lecture_name}
        style={{ height: isLectureDesc ? 'fit-content' : '2.5rem' }}
      >
        <p
          className={`${style.accordion__lecture_title}
            ${lecture.isPaid 
              ? '' 
              :!verticalTitle && style.accordion__lecture_title_free}`}
        >
          {verticalTitle && <input type='checkbox' style={{marginRight:'0.5rem'}}/>}
          {lecture.type === 'video' ? (
            <Play width='10' height='10' />
          ) : (
            <File width='10' height='10' />
          )} &nbsp;
          {lecture.name}
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
        {!lecture.isPaid && !verticalTitle && (
          <button className={style.accordion__lecture_preview}>Preview</button>
        )}
        {lecture.duration && (
          <span className={style.accordion__lecture_duration}>
            {lecture.duration} min
          </span>
        )}
      </div>
    </div>
  )
}

export default AccordionItem
