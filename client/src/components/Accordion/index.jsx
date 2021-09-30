import React, { useState, useRef } from 'react'
import style from './style.module.scss'
import { AccordionArrow } from '../icons'
import AccordionItem from './AccordionItem'

const Accordion = ({ chapter }) => {
  const [isCollapse, setIsCollapse] = useState(true)
  const wrapperRef = useRef(null)
  const holderRef = useRef(null)
  const toggleCollapseLecture = (_) => {
    if (isCollapse) {
      const holderHeight = holderRef.current.getBoundingClientRect().height
      wrapperRef.current.style.height = holderHeight + 'px'
      setIsCollapse(false)
    } else {
      wrapperRef.current.style.height = 0
      setIsCollapse(true)
    }
  }
  return (
    <div className={style.accordion}>
      <div className={style.accordion__item}>
        <div className={style.accordion__title} onClick={toggleCollapseLecture}>
          <div className={style.accordion__title_name}>
            <span onClick={toggleCollapseLecture}>
              <AccordionArrow
                style={{
                  transform: isCollapse ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </span>
            {chapter.title}
          </div>
          <div className={style.accordion__title_info}>
            <span>{chapter.lecturesNumbers} lectures</span>
            <span>{chapter.duration} min</span>
          </div>
        </div>
        <div className={style.accordion__wrapper} ref={wrapperRef}>
          <div className={style.accordion__holder} ref={holderRef}>
            {chapter.lectures.map((lecture) => (
              <AccordionItem
                lecture={lecture}
                wrapperRef={wrapperRef}
                holderRef={holderRef}
                key={lecture._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
