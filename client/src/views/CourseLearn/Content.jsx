import React from 'react'
import style from './style.module.scss'
import { content } from '../Course/contentData'
import Accordion from '../../components/Accordion'
const Content = () => {
    return (
        <div className={style.courseLearn__content}>
            {content.map((chapter) => (
              <Accordion chapter={chapter} key={chapter._id} verticalTitle />
            ))}
        </div>
    )
}

export default Content
