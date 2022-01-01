import React, { useState, useRef, useEffect} from 'react'
import style from './style.module.scss'
import { AccordionArrow } from '../icons'
import AccordionItem from './AccordionItem'
import { useSelector } from 'react-redux'

const Accordion = ({ chapter,verticalTitle, setLesson, isPaid}) => {
  const [isCollapse, setIsCollapse] = useState(true)
  const wrapperRef = useRef(null)
  const holderRef = useRef(null)
  const {lesson} = useSelector(state => state.enrollmentProgress)
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
  const tm = (se, cut) => {
    let h = (se /60 /60)
    if(h < 1){
       let  t =  cut === 'cut'?(h * 100).toFixed(2) + ' min' :(h * 100).toFixed(2) + ' minutes'
        return t 
    }
    if(h === 1) return h.toFixed(2) + ' hour'
    return h.toFixed(2)  + ' hours'
  }
  useEffect(() => {
  },[lesson])
  return (
    <div className={style.accordion}>
      <div className={style.accordion__item}>
        <div className={style.accordion__title}
        style={{display: verticalTitle ? 'block': 'flex'}}
        onClick={toggleCollapseLecture}>
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
            <span>{chapter.lessons.length} lectures</span>
            <span>{tm(chapter.duration)}</span>
          </div>
        </div>
        <div className={style.accordion__wrapper} ref={wrapperRef}>
          <div className={style.accordion__holder} ref={holderRef}>
            {chapter.lessons.map((lecture) => (
              <AccordionItem
                lecture={lecture}
                wrapperRef={wrapperRef}
                holderRef={holderRef}
                verticalTitle={verticalTitle}
                setLesson={setLesson}
                chapterId={chapter._id}
                tm={tm}
                isPaid={isPaid}
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
