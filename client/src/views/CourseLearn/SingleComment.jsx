import React from 'react'
import style from './style.module.scss'

const SingleComment = ({comment}) => {
    const urlConstructor = (string) => {
        let url = new URL(string)
        if(url.protocol === 'http:' || url.protocol === 'https:') {
            return url
        }
        return `/api/images/${string}`
    }
    return (
        <div className={`
            ${style.courseLearn__announcements_comment}
            ${style.courseLearn__announcements_comment_ar}
        `}>
        <figure>
        <img src={
            comment.user.avatar 
            ? urlConstructor(comment.user.avatar)
            : '/images/user.png'
        } alt='user' />
        </figure>
        <p>{comment.comment}</p>
    </div>
    )
}

export default SingleComment
