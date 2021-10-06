import React from 'react'
import style from './style.module.scss'
import SingleAnnouncement from './SingleAnnouncement'

const Announcement = () => {
  return (
    <div className={style.courseLearn__announcements}>
      <div className='container'>
        {
          [...Array(2)].map((_, idx) => (
            <SingleAnnouncement key={idx}/>
          ))
        }
      </div>
    </div>
  )
}

export default Announcement
