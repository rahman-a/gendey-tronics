import React, { useState } from 'react'
import style from './style.module.scss'
import { CertificateStar, Star, DemandVideo, Person } from '../icons'
import strings from '../../localization'
import { API_URL } from '../../constants'

const about = {
  en: [
    `He has studied Automotive Engineering.`,
    <br />,
    `The Author of Autotronics Engineering which consist of four parts.`,
    <br />,
    `He has trained about 400 technicians and Engineers in field.`,
    <br />,
    `He has instructed Officers Engineers in the Armed Forces.`,
    <br />,
    `Trained over that 500 technicians and Engineers.`,
    <br />,
    `Experience over than six years in training Field.`,
  ],
  ar: [
    ` درس هندسة السيارات`,
    <br />,
    `مؤلف كتاب الكامل في هندسة الأوتوترونكس يقع في أربع أجزاء`,
    <br />,
    `درب حوالي 400 فني ومهندس تدريب ميداني`,
    <br />,
    `قدم دورات تدريبية للضباط المهندسين في القوات الجوية`,
    <br />,
    `درب أكثر من 500 مهندس وفني أون لاين.`,
    <br />,
    `خبرة لمدة ست سنوات في مجال التدريب`,
    <br />,
  ],
}

const CourseInstructor = ({ instructor, lang }) => {
  const [isInfo, setIsInfo] = useState(false)

  const aboutStyle = {
    height: isInfo ? 'fit-content' : '11.5rem',
    overflow: isInfo ? 'visible' : 'hidden',
  }

  return (
    <div className={style.instructor}>
      <div className={style.instructor__name}>
        <h3>{instructor?.name}</h3>
        <p>{instructor?.role}</p>
      </div>
      <div
        className={`${style.instructor__overview} ${
          lang === 'ar' ? style.instructor__overview_ar : ''
        }`}
      >
        {instructor?.avatar && (
          <figure>
            <img
              src={
                instructor.avatar
                  ? `${API_URL}/images/${instructor?.avatar}`
                  : '/images/instructor_info.png'
              }
              alt='instructor'
            />
          </figure>
        )}
        <div className={style.instructor__overview_info}>
          <ul>
            <li>
              <span>
                <Star />
              </span>
              <p>
                {instructor?.averageRating}{' '}
                {strings.course[lang].instructor_rating}
              </p>
            </li>
            <li>
              <span>
                <CertificateStar />
              </span>
              <p>
                {instructor?.reviewsNumber > 1
                  ? `${instructor.reviewsNumber} ${
                      lang === 'en' ? 'Reviews' : 'تقييمات'
                    }`
                  : `${instructor.reviewsNumber} ${
                      lang === 'en' ? 'Review' : 'تقييم'
                    }`}
              </p>
            </li>
            <li>
              <span>
                <Person />
              </span>
              <p>
                {instructor?.studentsNumber > 1
                  ? `${instructor.studentsNumber} ${
                      lang === 'en' ? 'Students' : 'طلبة'
                    }`
                  : `${instructor.studentsNumber} ${
                      lang === 'en' ? 'Student' : 'طالب'
                    }`}
              </p>
            </li>
            <li>
              <span>
                <DemandVideo />
              </span>
              <p>
                {instructor?.coursesNumber > 1
                  ? `${instructor.coursesNumber} ${
                      lang === 'en' ? 'Courses' : 'دورات تدريبية'
                    }`
                  : `${instructor.coursesNumber} ${
                      lang === 'en' ? 'Course' : 'دورة تدريبية'
                    }`}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.instructor__info}>
        <div
          style={aboutStyle}
          dangerouslySetInnerHTML={{ __html: instructor?.about }}
        ></div>
        <button onClick={() => setIsInfo((prev) => !prev)}>
          {isInfo
            ? strings.course[lang].read_less
            : strings.course[lang].read_more}
        </button>
      </div>
    </div>
  )
}

export default CourseInstructor
