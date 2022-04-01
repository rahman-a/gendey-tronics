import React, { useRef, useState, useEffect } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Accordion from '../../components/Accordion'
import { CloseSquare } from '../../components/icons'
import Overview from './Overview'
import Notes from './Notes'
import Announcements from './Announcements'
import Rating from './Rating'
import CourseContent from './Content'
import { useLocation, useHistory, useParams} from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import strings from '../../localization'

const CourseLearn = () => {
  const curriculumRef = useRef(null)
  const [isCurriculumCollapse, setIsCurriculumCollapse] = useState(false)
  const [lesson, setLesson] = useState(null)
  const dispatch = useDispatch()
  const {loading, error, course} = useSelector(state => state.courseData)
  const {enrollment} = useSelector(state => state.enrollmentData)
  const {lang} = useSelector(state => state.language)
  const infoSelected = useLocation().hash.substr(1)
  const history = useHistory()
  const location = useLocation()
  const {id} = useParams()
  const path = location.pathname
  const enrollId = new URLSearchParams(location.search).get('enroll')
  
  const getLessonsNumber = (chapters) => {
    let num = 0;
    chapters.map(chapter => num += chapter.lessons.length)
    return num
  }

  useEffect(() => {
    return () => {
      dispatch({type:constants.courses.GET_ENROLLMENT_RESET})
      dispatch({type:constants.courses.GET_ONE_RESET})
    }
  },[dispatch])
  
  useEffect(() => {
    id && dispatch(actions.courses.getCourse(id))
    enrollId && !enrollment && dispatch(actions.courses.getEnrollment(id, enrollId))
    enrollment && setLesson(enrollment.currentLesson)
  }, [id, dispatch, enrollId, enrollment])

  return (
    <Template elementRefs={{ curriculum: curriculumRef }}>
      <div className={style.courseLearn}>
        <div
          className={`${style.courseLearn__area} 
          ${isCurriculumCollapse 
            ?style.courseLearn__area_full 
            :style.courseLearn__area_70 }`}
        >
          <div className={style.courseLearn__video}>
            {isCurriculumCollapse && (
              <button onClick={() => setIsCurriculumCollapse(false)}>
                {strings.course[lang].course_content}
              </button>
            )}
            {loading 
            ? <Loader size='8' center/>
            : error ? <Message type='error' center message={error}/>
            :enrollment && <iframe
            className={style.courseLearn__video_frame}
            src={lesson?.video || enrollment.currentLesson?.video} 
            title={lesson?.title || enrollment.currentLesson?.title}
            frameBorder="0" 
            allow="accelerometer; 
            autoplay; 
            clipboard-write; 
            encrypted-media; 
            gyroscope; 
            picture-in-picture" 
            allowFullScreen></iframe>
            }
          </div>
          <div className={style.courseLearn__info}>
            <div className={style.courseLearn__info_wrapper}>
              <ul className={style.courseLearn__info_list}>
              <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'content' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}?enroll=${enrollId}#content`)}
                >
                  {strings.course[lang].content}
                </li>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'overview' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}?enroll=${enrollId}#overview`)}
                >
                  {strings.course[lang].overview}
                </li>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'notes' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}?enroll=${enrollId}#notes`)}
                >
                  {strings.course[lang].notes} 
                </li>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'announcement' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}?enroll=${enrollId}#announcement`)}
                >
                  {strings.course[lang].announcements}
                </li>
                <li
                  className={`${style.courseLearn__info_item} 
                                ${
                                  infoSelected === 'rating' &&
                                  style.courseLearn__info_selected
                                }`}
                  onClick={() => history.push(`${path}?enroll=${enrollId}#rating`)}
                >
                  {strings.course[lang].rating_course}
                </li>
              </ul>
              <div className={style.courseLearn__info__data}
              style={{padding:loading ? '15rem' :'0'}}>
                    {
                      loading ? <Loader size='8' center/>
                      : error ? <Message type='error' center message={error}/>
                      :infoSelected === 'overview'
                      ? course && <Overview lang={lang} data={{
                        language:course.language,
                        description:course.description,
                        duration:course.duration,
                        students:course.students,
                        lessons:course.chapters && course.chapters.length && getLessonsNumber(course.chapters)
                      }}/>
                      : infoSelected === 'notes'
                      ? course && <Notes 
                      lesson={lesson && lesson._id}
                      course={course._id}
                      lang={lang}/>
                      : infoSelected === 'announcement'
                      ? <Announcements lang={lang}/>
                      : infoSelected === 'content'
                      ? <CourseContent setLesson={setLesson} chapters={course ? course.chapters : []}/>
                      : infoSelected === 'rating'
                      && <Rating lang={lang} strings={strings}/>
                    }
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${style.courseLearn__curriculum} 
          ${isCurriculumCollapse 
            ? style.courseLearn__curriculum_hide 
            : style.courseLearn__curriculum_show}`}
        >
          {
          loading ? <Loader size='8' center/>
          : error ? <Message type='error' center message={error}/>
          :<div
            className={style.courseLearn__curriculum_wrapper}
            style={{direction:'ltr'}}
            ref={curriculumRef}
          >
            <div className={style.courseLearn__curriculum_header}>
              <h2>{strings.course[lang].course_content}</h2>
              <button onClick={() => setIsCurriculumCollapse(true)}>
                <CloseSquare />
              </button>
            </div>
            {course 
            && course.chapters
            && course.chapters.length
            && course.chapters.sort((a, b) => a.order - b.order)
            .map((chapter) => (
              <Accordion 
              chapter={chapter} 
              key={chapter._id}
              setLesson={setLesson}
              lang={lang}
              verticalTitle />
            ))}
          </div>
          }
        </div>
      </div>
    </Template>
  )
}

export default CourseLearn
