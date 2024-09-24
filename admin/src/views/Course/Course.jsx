import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useParams } from 'react-router-dom'
import { Accordion, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ObjectId from 'bson-objectid'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  BackButton,
  SideAlert,
  Loader,
  CourseRating,
  Instructor,
} from '../../components'
import { Check, Copy, Upload } from '../../icons'
import actions from '../../actions'
import constants from '../../constants'
import CourseData from './CourseData'
import Points from './Points'
import Targets from './Target'
import Requirements from './Requirements'
import Chapter from './Chapter'
import DownloadLinks from './DownloadLinks'

const Course = () => {
  const [isCopied, setIsCopied] = useState(false)
  const { id } = useParams()
  const { loading, error, course } = useSelector((state) => state.getCourse)
  const {
    loading: image_loading,
    error: image_error,
    message,
  } = useSelector((state) => state.updateCourseImage)
  const { loading: publish_loading, error: publish_error } = useSelector(
    (state) => state.togglePublish
  )
  const dispatch = useDispatch()

  const onCopyHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }
  const changeImageHandler = (e) => {
    if (e.target.files[0]) {
      const data = new FormData()
      data.append('image', e.target.files[0])
      dispatch(actions.courses.updateCourseImage(course._id, data))
    }
  }

  const togglePublishCourse = (_) => {
    dispatch(actions.courses.togglePublish(course._id))
  }

  const createNewLesson = (lesson, chapterId) => {
    const updatedCourse = { ...course }
    updatedCourse.chapters.forEach((chapter) => {
      if (chapter._id === chapterId) {
        chapter.lessons = [...chapter.lessons, lesson]
      }
    })
    dispatch({
      type: constants.courses.GET_COURSE_SUCCESS,
      payload: updatedCourse,
    })
  }

  const createNewChapter = (_) => {
    const newChapter = {
      _id: ObjectId().toHexString(),
      title: 'New Chapter??',
      order: course.chapters.length,
      lessons: [],
      isPaid: true,
      isNew: true,
    }
    const updatedCourse = { ...course }
    updatedCourse.chapters = [...updatedCourse.chapters, newChapter]
    dispatch({
      type: constants.courses.GET_COURSE_SUCCESS,
      payload: updatedCourse,
    })
  }

  const removeLesson = (id, chapterId) => {
    const updatedCourse = { ...course }
    updatedCourse.chapters.forEach((chapter) => {
      if (chapter._id === chapterId) {
        chapter.lessons = chapter.lessons.filter((lesson) => lesson._id !== id)
      }
    })
    dispatch({
      type: constants.courses.GET_COURSE_SUCCESS,
      payload: updatedCourse,
    })
  }

  const removeChapter = (id) => {
    const updatedCourse = { ...course }
    updatedCourse.chapters = updatedCourse.chapters.filter(
      (chapter) => chapter._id !== id
    )
    dispatch({
      type: constants.courses.GET_COURSE_SUCCESS,
      payload: updatedCourse,
    })
  }

  const clearImageUploadAlert = (_) => {
    dispatch({ type: constants.courses.UPDATE_COURSE_IMAGE_RESET })
    dispatch({ type: constants.courses.TOGGLE_PUBLISH_RESET })
  }

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  useEffect(() => {
    id && dispatch(actions.courses.getCourse(id))
  }, [id])

  return (
    <div className={style.course}>
      <BackButton page='courses' title='courses' />

      <SideAlert
        type='danger'
        time={3000}
        text={error}
        isOn={error ? true : false}
      />

      <SideAlert
        type='danger'
        time={3000}
        text={image_error}
        isOn={image_error ? true : false}
        reset={() => clearImageUploadAlert()}
      />

      <SideAlert
        type='danger'
        time={3000}
        text={publish_error}
        isOn={publish_error ? true : false}
        reset={() => clearImageUploadAlert()}
      />

      <SideAlert
        type='success'
        time={3000}
        text={message}
        isOn={message ? true : false}
        reset={() => clearImageUploadAlert()}
      />

      <div className='container'>
        <div className={style.course__wrapper}>
          {loading ? (
            <Loader size='8' center options={{ animation: 'border' }} />
          ) : (
            course && (
              <>
                <div className={style.course__header}>
                  <div className={style.course__publish}>
                    {publish_loading ? (
                      <Loader size='4' options={{ animation: 'border' }} />
                    ) : (
                      <Button
                        size='lg'
                        variant={course.isPublished ? 'danger' : 'success'}
                        onClick={togglePublishCourse}
                      >
                        {course.isPublished
                          ? 'Unpublish Course'
                          : 'Publish Course'}
                      </Button>
                    )}
                  </div>
                  <h1 className='main-header'> {course.name} </h1>
                  <p>
                    {' '}
                    <strong> course id: </strong>
                    {course._id}
                    <CopyToClipboard text={course._id} onCopy={onCopyHandler}>
                      <span className={style.course__header_copy}>
                        {isCopied ? <Check /> : <Copy />}
                      </span>
                    </CopyToClipboard>
                  </p>
                  <span className={style.course__header_date}>
                    created At:{' '}
                    {new Date(course.createdAt).toLocaleDateString(
                      'en-US',
                      dateOptions
                    )}
                  </span>
                </div>
                <div className={style.course__body}>
                  <div className={style.course__segment}>
                    <CourseData data={course} />
                    <figure className={style.course__image}>
                      <div
                        className={style.course__image_backdrop}
                        style={{ display: image_loading && 'block' }}
                      >
                        <label htmlFor='course-image'>
                          {image_loading ? (
                            <Loader
                              size='5'
                              center
                              options={{ animation: 'border' }}
                            />
                          ) : (
                            <>
                              <span>
                                {' '}
                                <Upload />{' '}
                              </span>
                              <span> upload a new image </span>
                            </>
                          )}
                        </label>

                        <input
                          type='file'
                          id='course-image'
                          onChange={changeImageHandler}
                          style={{ display: 'none' }}
                        />
                      </div>
                      <img
                        src={`/api/images/${course.image}`}
                        alt={course.name}
                      />
                    </figure>
                  </div>

                  <div className={style.course__segment}>
                    <Points data={course.points} courseId={course._id} />
                    <Targets data={course.targets} courseId={course._id} />
                  </div>
                  <div className={style.course__segment}>
                    <Requirements
                      data={course.requirements}
                      courseId={course._id}
                    />
                    <div style={{ marginTop: '5rem' }}>
                      <h1 className={style.course__level}> Course Rating </h1>
                      <CourseRating
                        data={{
                          rating: course.reviewsData.averageNumericRating,
                          ratingValues: course.reviewsData.ratingValues,
                          reviews: course.reviewsData.reviews,
                        }}
                      />
                    </div>
                  </div>
                  <div className={style.course__segment}>
                    <div style={{ marginTop: '5rem', width: '55%' }}>
                      <h1 className={style.course__level}>Course Chapters</h1>
                      <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <TransitionGroup>
                          {course.chapters.map((chapter, idx) => (
                            <CSSTransition
                              key={chapter._id}
                              timeout={1500}
                              classNames='chapter'
                            >
                              <Chapter
                                courseId={course._id}
                                data={chapter}
                                createLesson={createNewLesson}
                                removeLesson={removeLesson}
                                removeChapter={removeChapter}
                                idx={idx}
                              />
                            </CSSTransition>
                          ))}
                        </TransitionGroup>
                      </Accordion>
                      <Button
                        variant='warning'
                        className='my-4'
                        onClick={createNewChapter}
                      >
                        add new chapter
                      </Button>
                      <div>
                        <h1 className={style.course__level}>
                          Course Download Links
                        </h1>
                        <DownloadLinks
                          id={course._id}
                          links={course.driveFile}
                          name={course.name}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '4rem' }}>
                      <h1 className={style.course__level}>
                        {' '}
                        Course Instructor{' '}
                      </h1>
                      <Instructor instructor={course.instructor} />
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Course
