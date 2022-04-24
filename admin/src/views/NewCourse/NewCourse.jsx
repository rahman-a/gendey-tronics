import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Accordion, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import ObjectId from 'bson-objectid'
import { BackButton, SideAlert, Loader } from '../../components'
import { Check } from '../../icons'
import actions from '../../actions'
import constants from '../../constants'
import CourseData from './CourseData'
import Points from './Points'
import Targets from './Target'
import Requirements from './Requirements'
import Chapter from './Chapter'

const NewCourse = () => {
  const [course, setCourse] = useState({
    _id: ObjectId().toHexString(),
    chapters: [],
    points: [],
    targets: [],
    requirements: [],
  })

  const [isDraft, setIsDraft] = useState(false)
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [errors, setErrors] = useState(null)
  const [labelString, setLabelString] = useState('Upload Course Hero Image')
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector((state) => state.createCourse)

  const saveAsDraftHandler = (_) => {
    const jsonImage = course.image && JSON.stringify(course.image)
    localStorage.setItem(
      'gd-draft-course',
      JSON.stringify({ ...course, image: jsonImage })
    )
    setIsDraftSaved(true)
    setTimeout(() => {
      setIsDraftSaved(false)
      setIsDraft(true)
    }, 1500)
  }

  const deleteDraftHandler = (_) => {
    localStorage.removeItem('gd-draft-course')
    const resetCourse = {
      _id: ObjectId().toHexString(),
      chapters: [],
      points: [],
      targets: [],
      requirements: [],
    }
    setCourse(resetCourse)
    setIsDraft(false)
    setLabelString('Upload Course Hero Image')
  }

  const isDraftFoundHandler = (_) => {
    const draft = localStorage.getItem('gd-draft-course')
    if (draft) {
      setCourse(JSON.parse(draft))
      setIsDraft(true)
    }
  }

  const createNewChapter = (_) => {
    const newChapter = {
      _id: ObjectId().toHexString(),
      course: course._id,
      title: 'New Chapter??',
      order: course.chapters.length,
      lessons: [],
      isPaid: course.isPaid,
    }
    const updatedCourse = { ...course }
    updatedCourse.chapters = [...updatedCourse.chapters, newChapter]
    setCourse(updatedCourse)
  }

  function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer()
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType })
      })
  }

  const isLessonsValid = (_) => {
    for (const chapter of course.chapters) {
      const lessons = chapter.lessons
      for (const lesson of lessons) {
        if (lesson.title === 'New Lesson??') {
          setErrors(`can't create lesson without title...`)
          return
        }
        if (!lesson.description) {
          setErrors(`can't create lesson without description...`)
          return
        }
        if (!lesson.video && !course.isPaid) {
          setErrors(`can't create lesson without video link...`)
          return
        }
        if (!lesson.duration) {
          setErrors(`can't create lesson without video duration...`)
          return
        }
      }
    }
    return true
  }

  const isCourseDataValid = (_) => {
    if (!course.name) {
      setErrors('Course Name is required...')
      return
    }
    if (!course.description) {
      setErrors('Course Description is required...')
      return
    }
    if (!course.price && course.isPaid) {
      setErrors('Course Price is required...')
      return
    }
    if (!course.trailer) {
      setErrors('Course Trailer Link is required...')
      return
    }
    if (!course.image) {
      setErrors('Course Hero Image is required...')
      return
    }
    if (course.points.length < 2) {
      setErrors('please provide at least two points to learn...')
      return
    }
    if (course.targets.length < 1) {
      setErrors('please provide at least one target audience...')
      return
    }

    if (course.chapters.length === 0) {
      setErrors("can't create course without chapters...")
      return
    }

    for (const chapter of course.chapters) {
      if (chapter.title === 'New Chapter??') {
        setErrors("can't create chapter without title...")
        return
      }
    }

    for (const chapter of course.chapters) {
      if (chapter.lessons.length === 0) {
        setErrors("can't create chapter without lesson...")
        return
      }
    }

    if (isLessonsValid()) return true
  }

  const createCourseHandler = (_) => {
    if (isCourseDataValid()) {
      const copiedCourse = { ...JSON.parse(JSON.stringify(course)) }

      let lessons = []
      copiedCourse.chapters.forEach((chapter) => {
        lessons = [...lessons, ...chapter.lessons]
      })

      const chapters = [...copiedCourse.chapters]
      chapters.forEach((chapter) => {
        delete chapter.lessons
      })

      delete copiedCourse.chapters

      const mimeType = copiedCourse.image.split(';')[0].split(':')[1]
      const extension = mimeType.split('/')[1]

      urlToFile(course.image, `course-Hero-Image.${extension}`, mimeType).then(
        (file) => {
          if (file.size === 0) {
            setErrors('image is corrupted, please upload image again...')
            return
          }

          delete copiedCourse.image
          const courseData = {
            course: copiedCourse,
            chapters,
            lessons,
          }

          courseData.image = file

          const data = new FormData()
          data.append('course', JSON.stringify(courseData.course))
          data.append('image', courseData.image)
          data.append('chapters', JSON.stringify(courseData.chapters))
          data.append('lessons', JSON.stringify(courseData.lessons))

          dispatch(actions.courses.createCourse(data))
        }
      )
    }
  }

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  useEffect(() => {
    error && setErrors(error)
  }, [error])

  useEffect(() => {
    isDraftFoundHandler()
    return () => dispatch({ type: constants.courses.CREATE_COURSE_RESET })
  }, [])

  return (
    <div
      className={`${style.course} font-size-input font-size-span font-size-button`}
    >
      <BackButton page='courses' title='courses' />

      <SideAlert
        type='danger'
        time={3000}
        text={errors}
        reset={() => setErrors(null)}
        isOn={errors ? true : false}
      />

      <SideAlert
        type='success'
        time={3000}
        text={message}
        isOn={message ? true : false}
      />

      <div className='container'>
        <div className={style.course__wrapper}>
          <div className={style.course__header}>
            <h1 className='main-header'>
              {course.name || 'Create New Course'}
            </h1>
            <span className={style.course__header_date}>
              created At: {new Date().toLocaleDateString('en-US', dateOptions)}
            </span>
          </div>
          <div className={style.course__body}>
            <div className={style.course__body_actions}>
              <Button
                className='mx-2'
                size='lg'
                variant='warning'
                onClick={saveAsDraftHandler}
              >
                {isDraftSaved ? (
                  <span>
                    {' '}
                    saved &nbsp; <Check />{' '}
                  </span>
                ) : (
                  'save as draft'
                )}
              </Button>

              {isDraft && (
                <Button
                  className='mx-2'
                  size='lg'
                  variant='light'
                  onClick={deleteDraftHandler}
                >
                  delete draft
                </Button>
              )}
              {loading ? (
                <Loader
                  size='4'
                  options={{ animation: 'border' }}
                  custom={{ color: '#fff' }}
                />
              ) : (
                <Button
                  size='lg'
                  variant='success'
                  onClick={createCourseHandler}
                >
                  save
                </Button>
              )}
            </div>
            <div className={style.course__segment}>
              <CourseData
                course={course}
                setCourse={setCourse}
                labelString={labelString}
                setLabelString={setLabelString}
              />
            </div>

            <div className={style.course__segment}>
              <Points course={course} setCourse={setCourse} />
              <Targets course={course} setCourse={setCourse} />
            </div>
            <div className={style.course__segment}>
              <Requirements course={course} setCourse={setCourse} />
              <div style={{ marginTop: '5rem', width: '55%' }}>
                <h1 className={style.course__level}>Course Chapters</h1>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                  {course.chapters.map((chapter, idx) => (
                    <Chapter
                      course={course}
                      setCourse={setCourse}
                      chapter={chapter}
                      idx={idx}
                      key={chapter._id}
                    />
                  ))}
                </Accordion>
                <Button
                  variant='warning'
                  className='my-4'
                  onClick={createNewChapter}
                >
                  add new chapter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCourse
