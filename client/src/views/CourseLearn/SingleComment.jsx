import React from 'react'
import style from './style.module.scss'

const SingleComment = () => {
    return (
        <div className={style.courseLearn__announcements_comment}>
        <figure>
        <img src='/images/user.png' alt='user' />
        </figure>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, libero!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, libero!
        </p>
    </div>
    )
}

export default SingleComment
