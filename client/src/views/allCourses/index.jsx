import React, { useRef, useEffect, useState, useCallback } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import CourseCard from '../../components/CourseCard'
import CardSlider from '../../components/CardSlider'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import strings from '../../localization'
import CardsContainer from '../../components/CardsContainer'

const Courses = () => {
  // const [showHeroImage, setShowHeroImage] = useState(false)
  const wrapperRef = useRef(null)
  // const [imgSrc, setImgSrc] = useState(null)
  const dispatch = useDispatch()
  const { loading, error, courses } = useSelector((state) => state.listCourses)
  const { items } = useSelector((state) => state.listNavItems)
  const { isAuth } = useSelector((state) => state.client)
  const { lang } = useSelector((state) => state.language)

  // const getHeroImageSrc = () => {
  //   if (items && !imgSrc) {
  //     const navItem = items.find(
  //       (item) => item.title['en'].toLocaleLowerCase() === 'courses'
  //     )
  //     if (navItem) {
  //       setImgSrc(navItem.image)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   courses && setShowHeroImage(true)
  //   return () => {
  //     setShowHeroImage(false)
  //   }
  // }, [courses])

  // useEffect(() => {
  //   getHeroImageSrc()
  // }, [items])

  useEffect(() => {
    isAuth
      ? dispatch(actions.courses.listCourses())
      : dispatch(actions.courses.listCourses('public'))
  }, [dispatch, isAuth])
  return (
    <Template>
      <div className={style.courses}>
        {/* {showHeroImage && (
          <figure>
            <img src={`/api/images/${imgSrc}`} alt='learn' />
          </figure>
        )} */}
        <div
          className={`container ${style.courses__container}`}
          style={{
            padding: loading ? '25rem' : '0',
            position: 'relative',
          }}
        >
          {loading ? (
            <Loader size='25' center custom={{ color: '#d0ae0b' }}>
              <p
                style={{
                  fontSize: '1.6rem',
                  fontWeight: '500',
                  color: '#F8C600',
                }}
              >
                {strings.course[lang].courses_load}
              </p>
            </Loader>
          ) : error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            courses &&
            courses.length > 0 && (
              <CardsContainer>
                {courses &&
                  courses.map((course) => (
                    <CourseCard key={course._id} data={course} />
                  ))}
              </CardsContainer>
            )
          )}
        </div>
      </div>
    </Template>
  )
}

export default Courses

/***
 * <div className={style.courses__wrapper} ref={wrapperRef}>
                <CardSlider length={courses.length} containerRef={wrapperRef}>
                  {courses &&
                    courses.map((course) => (
                      <CourseCard key={course._id} data={course} />
                    ))}
                </CardSlider>
 * 
 */
