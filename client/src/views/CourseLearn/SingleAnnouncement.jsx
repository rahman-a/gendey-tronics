import React, {useState} from 'react'
import style from './style.module.scss'
import SingleComment from './SingleComment'

const SingleAnnouncement = () => { 
    const [toggleComment, setToggleComment] = useState(false)
    return (
        <div className={style.courseLearn__announcements_announcement}>

          {/* announcements Header */}
          <div className={style.courseLearn__announcements_header}>
            <figure>
              <img src='/images/instructor_info.png' alt='instructor' />
            </figure>
            <div>
              <h3>Mohamed Elgendy</h3>
              <p>Posted an announcement. 1 hour ago</p>
            </div>
          </div>

          {/* Announcements Body */}
          <div className={style.courseLearn__announcements_body}>
            <p>New section had added to the course check it now</p>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor
            </p>
          </div>

          {/* Write a comment */}
          <div className={style.courseLearn__announcements_opinion}>
            <figure>
              <img src='/images/user.png' alt='user' />
            </figure>
            <textarea name='comment' id='comment' placeholder='create your comment'></textarea>
          </div>

          <button className={style.courseLearn__announcements_toggle}
          onClick={() => setToggleComment(prev => !prev)}>
              {toggleComment ?'hide' : 'show'} all comments
          </button>
          
          {/* All Comments */}
          {toggleComment && <div className={style.courseLearn__announcements_comments}>
                {
                    [...Array(3)].map((_, idx) => (
                        <SingleComment key={idx}/>
                    ))
                }
          </div>}
        </div>
    )
}

export default SingleAnnouncement
