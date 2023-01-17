import React from 'react'
import style from './style.module.scss'
import Accordion from '../../components/Accordion'
const Content = ({chapters, setLesson}) => {
    return (
        <div className={style.courseLearn__content}>
            {chapters.map((chapter) => (
              <Accordion chapter={chapter} key={chapter._id} setLesson={setLesson} verticalTitle />
            ))}
        </div>
    )
}

export default Content
