import React, { useRef, useState } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import { content } from '../Course/contentData'
import Accordion from '../../components/Accordion'
import { CloseSquare } from '../../components/icons'
import Overview from './Overview'
import Notes from './Notes'
import Announcements from './Announcements'
import { useLocation, useHistory } from 'react-router'

const CourseLearn = () => {
  const curriculumRef = useRef(null)
  const [isCurriculumCollapse, setIsCurriculumCollapse] = useState(false)
  const infoSelected = useLocation().hash.substr(1)
  const history = useHistory()
  const path = useLocation().pathname
  return (
    <Template elementRefs={{ curriculum: curriculumRef }}>
      <div className={style.courseLearn}>
        <div
          className={style.courseLearn__area}
          style={{ width: isCurriculumCollapse ? '100%' : '70%' }}
        >
          <div className={style.courseLearn__video}>
            {isCurriculumCollapse && (
              <button onClick={() => setIsCurriculumCollapse(false)}>
                course content
              </button>
            )}
            <figure>
              <img src='/images/course_video.jpg' alt='course_video' />
            </figure>
          </div>
          <div className={style.courseLearn__info}>
            <div className={style.courseLearn__info_wrapper}>
              <ul className={style.courseLearn__info_list}>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'overview' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}#overview`)}
                >
                  Overview
                </li>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'notes' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}#notes`)}
                >
                  Notes
                </li>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'announcement' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}#announcement`)}
                >
                  Announcements
                </li>
              </ul>
              <div className={style.courseLearn__info__data}>
                    {
                      infoSelected === 'overview'
                      ? <Overview/>
                      : infoSelected === 'notes'
                      ? <Notes/>
                      : infoSelected === 'announcement'
                      && <Announcements/>
                    }
              </div>
            </div>
          </div>
        </div>
        <div
          className={style.courseLearn__curriculum}
          style={{ display: isCurriculumCollapse ? 'none' : 'block' }}
        >
          <div
            className={style.courseLearn__curriculum_wrapper}
            ref={curriculumRef}
          >
            <div className={style.courseLearn__curriculum_header}>
              <h2>Course Content</h2>
              <button onClick={() => setIsCurriculumCollapse(true)}>
                <CloseSquare />
              </button>
            </div>
            {content.map((chapter) => (
              <Accordion chapter={chapter} key={chapter._id} verticalTitle />
            ))}
          </div>
        </div>
      </div>
    </Template>
  )
}

export default CourseLearn
