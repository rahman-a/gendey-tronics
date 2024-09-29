import React, { useState } from 'react'
import style from './style.module.scss'
import SingleComment from './SingleComment'
import strings from '../../localization'
import { API_URL } from '../../constants'

const SingleAnnouncement = ({ data, lang }) => {
  const [toggleComment, setToggleComment] = useState(false)
  return (
    <div className={style.courseLearn__announcements_announcement}>
      {/* announcements Header */}
      <div
        className={`
          ${style.courseLearn__announcements_header}
          ${lang === 'ar' ? style.courseLearn__announcements_header_ar : ''}`}
      >
        <figure>
          <img
            src={
              data.image
                ? `${API_URL}/images/${data.image}`
                : '/images/instructor_info.png'
            }
            alt='instructor'
          />
        </figure>
        <div>
          <h3>{`${data.instructor.firstName} ${data.instructor.lastName}`}</h3>
          <p>
            {strings.course[lang].announcement_date}{' '}
            {strings.course[lang].since} (1 {strings.course[lang].hour})
          </p>
        </div>
      </div>

      {/* Announcements Body */}
      <div className={style.courseLearn__announcements_body}>
        <p>{data.title}</p>
        <p>{data.announcement}</p>
      </div>

      {/* Write a comment */}
      <div className={style.courseLearn__announcements_opinion}>
        <figure>
          <img src='/images/user.png' alt='user' />
        </figure>
        <textarea
          name='comment'
          id='comment'
          placeholder='create your comment'
        ></textarea>
      </div>

      <button
        className={style.courseLearn__announcements_toggle}
        onClick={() => setToggleComment((prev) => !prev)}
      >
        {toggleComment ? strings.course[lang].hide : strings.course[lang].show}{' '}
        {strings.course[lang].all_comments}
      </button>

      {/* All Comments */}
      {data && data.comments.length > 0 && toggleComment && (
        <div className={style.courseLearn__announcements_comments}>
          {data.comments.map((comment) => (
            <SingleComment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SingleAnnouncement
