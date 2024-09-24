import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CourseHeader from '../../components/CoursePageHeader'
import CourseOverview from '../../components/CoursePageOverview'
import CourseLearnPoints from '../../components/CourseLearnPoints'
import Accordion from '../../components/Accordion'
import CourseInstructor from '../../components/CourseInstructor'
import CourseRating from '../../components/CourseRating'
import CourseInfoTab from '../../components/CourseInfoTab'
import CourseReviews from '../../components/CourseReviews'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import strings from '../../localization'

const Course = () => {
  const [showContent, setShowContent] = useState(false)
  const [showLearners, setShowLearners] = useState(false)
  const { isAuth } = useSelector((state) => state.client)
  const { lang } = useSelector((state) => state.language)
  const { loading, error, course } = useSelector((state) => state.courseData)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch({ type: constants.courses.VERIFY_COUPON_RESET })
    dispatch({ type: constants.courses.NEW_ENROLLMENT_RESET })
    isAuth
      ? dispatch(actions.courses.getCourse(id))
      : dispatch(actions.courses.getCourse(id, 'public'))
    return () => {
      dispatch({ type: constants.courses.GET_ONE_RESET })
    }
  }, [id, dispatch, isAuth])
  return (
    <Template>
      {loading ? (
        <div style={{ padding: '21rem', marginBottom: '10rem' }}>
          <Loader size='20' center>
            <p style={{ fontSize: '1.5rem' }}>
              {strings.course[lang].course_load}
            </p>
          </Loader>
        </div>
      ) : error ? (
        <div style={{ marginTop: '12rem', marginBottom: '2rem' }}>
          <Message type='error' message={error}></Message>
        </div>
      ) : (
        course && (
          <div className={style.course}>
            <CourseHeader
              data={{
                name: course.name,
                description: course.description,
                students: course.students,
                video: course.trailer,
                reviewNumbers: course.reviewsData.numberOfReview,
                rating: course.reviewsData.averageNumericRating,
                instructor: course.instructor.name,
                language: course.language,
                isFav: course.isFav,
                updatedAt: new Date(course.updatedAt).toLocaleDateString(),
              }}
            />
            <CourseOverview
              data={{
                video: course.trailer,
                price: course.price,
                discount: course.discount,
                duration: course.duration,
                isEnrolled: course.enrollment.isEnrolled,
                enroll: course.enrollment._id,
                isPaid: course.isPaid,
                title: course.name,
                date: new Date(
                  course.enrollment.enrollmentDate
                ).toLocaleDateString(),
              }}
            />
            <CourseInfoTab
              data={{
                video: course.trailer,
                price: course.price,
                discount: course.discount,
                title: course.name,
                isEnrolled: course.enrollment.isEnrolled,
                enroll: course.enrollment._id,
                isPaid: course.isPaid,
                students: course.students,
                reviewNumbers: course.reviewsData.numberOfReview,
                rating: course.reviewsData.averageNumericRating,
              }}
            />
            <div
              className={`
               container ${style.course__container}
               ${lang === 'ar' ? style.course__container_ar : ''}
               `}
            >
              <CourseLearnPoints data={course.points} />
              <div className={style.course__requirements}>
                <h2 className={style.course__header}>
                  {strings.course[lang].requirements}
                </h2>
                <ul className={style.course__requirements_list}>
                  {course.requirements.length > 0 ? (
                    course.requirements.map((require) => (
                      <li
                        className={style.course__requirements_item}
                        key={uuidv4()}
                      >
                        {require}
                      </li>
                    ))
                  ) : (
                    <li className={style.course__requirements_item}>
                      {strings.course[lang].no_requirements}
                    </li>
                  )}
                </ul>
              </div>
              <div className={style.course__description}>
                <h2 className={style.course__header}>
                  {strings.course[lang].description}
                </h2>
                <div
                  className={style.course__description_content}
                  style={{ maxHeight: showContent ? 'fit-content' : '10rem' }}
                >
                  <p>{course.description}</p>
                </div>
                <button onClick={() => setShowContent((prev) => !prev)}>
                  {showContent
                    ? strings.course[lang].read_less
                    : strings.course[lang].read_more}
                </button>
              </div>
              {course.targets.length > 0 && (
                <div className={style.course__learner}>
                  <h3>{strings.course[lang].who}</h3>
                  <ul
                    className={style.course__learner_list}
                    style={{ maxHeight: showLearners ? 'fit-content' : '8rem' }}
                  >
                    {course.targets.map((target) => (
                      <li className={style.course__learner_item} key={uuidv4()}>
                        {target}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowLearners((prev) => !prev)}>
                    {showLearners
                      ? strings.course[lang].read_less
                      : strings.course[lang].read_more}
                  </button>
                </div>
              )}
              <div className={style.course__content}>
                <h2 className={style.course__header}>
                  {strings.course[lang].course_content}
                </h2>
                <div
                  className={style.course__content_wrapper}
                  style={{ direction: 'ltr' }}
                >
                  {course.chapters
                    .sort((a, b) => a.order - b.order)
                    .map((chapter) => (
                      <Accordion
                        chapter={chapter}
                        key={chapter._id}
                        isPaid={course.isPaid}
                        lang={lang}
                      />
                    ))}
                </div>
              </div>
              <div className={style.course__instructor}>
                <h2 className={style.course__header}>
                  {strings.course[lang].instructor}
                </h2>
                <CourseInstructor instructor={course.instructor} lang={lang} />
              </div>
              <div className={style.course__rating}>
                <h2 className={style.course__header}>
                  {strings.course[lang].feedback}
                </h2>
                <CourseRating
                  lang={lang}
                  data={{
                    rating: course.reviewsData.averageNumericRating,
                    ratingValues: course.reviewsData.ratingValues,
                  }}
                />
                <CourseReviews allReviews={course.reviewsData.reviews} />
              </div>
            </div>
          </div>
        )
      )}
    </Template>
  )
}

export default Course
