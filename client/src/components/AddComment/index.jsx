import React from 'react'
import style from './style.module.scss'

const AddComment = () => {
    return (
        <div className={style.addComment}>
            <figure>
                <img src="images/user.png" alt="user" />
            </figure>
            <div className={style.addComment__comment}>
                <textarea 
                name="comment" 
                placeholder='Leave Your Comment Here'>
                </textarea>
                <button>Save</button>
            </div>
        </div>
    )
}

export default AddComment
