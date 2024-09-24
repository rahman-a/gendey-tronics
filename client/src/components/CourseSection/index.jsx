import React, { useRef, useEffect } from 'react'
import style from './style.module.scss'
import CourseCard from '../CourseCard'
import CardSlider from '../CardSlider'
import CardsContainer from '../CardsContainer'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import Loader from '../Loader'
import Alert from 'react-bootstrap/Alert'
import strings from '../../localization'

const Courses = () => {
  const containerRef = useRef(null)
  const { loading, error, courses } = useSelector((state) => state.listCourses)
  const { isAuth } = useSelector((state) => state.client)
  const { lang } = useSelector((state) => state.language)
  const dispatch = useDispatch()

  useEffect(() => {
    isAuth
      ? dispatch(actions.courses.listCourses())
      : dispatch(actions.courses.listCourses('public'))
  }, [dispatch, isAuth])
  return (
    <>
      <div className={style.courseSection} style={{ position: 'relative' }}>
        <h2 data-aos='fade-down'>
          {loading
            ? strings.main[lang].courses_download
            : strings.main[lang].courses_title}
        </h2>
        {loading ? (
          <Loader size='20' center custom={{ color: '#d0ae0b' }} />
        ) : error ? (
          <Alert style={{ textAlign: 'center' }} variant='danger'>
            {error}
          </Alert>
        ) : (
          <div
            className='container'
            style={{ position: 'relative', overflow: 'hidden' }}
            ref={containerRef}
            data-aos='fade-left'
          >
            {courses && courses.length > 0 && (
              <CardsContainer>
                {courses &&
                  courses.map((course) => (
                    <CourseCard
                      key={course._id}
                      data={course}
                      isAuth={isAuth}
                      fav
                    />
                  ))}
              </CardsContainer>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Courses

/**
 * <CardSlider
                    containerRef={containerRef}
                    length = {courses.length}>
                        {
                            courses && courses.map(course => (
                                <CourseCard 
                                key={course._id} 
                                data={course} 
                                isAuth={isAuth}
                                fav/> 
                            ))
                        }
                </CardSlider>
 * 
 */
