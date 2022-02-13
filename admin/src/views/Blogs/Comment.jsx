import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {Loader} from '../../components'
import {Trash} from '../../icons'
import actions from '../../actions'
import constants from '../../constants'

const Comment = ({comment, blog}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const {message} = useSelector(state => state.deleteBlogComment)
  const dispatch = useDispatch()

  const deleteCommentHandler = id => {
    setIsDeleting(true)
    dispatch(actions.blogs.deleteCommentBlog(blog, id))
  }

    const dateOptions = {
        month:'long',
        year:'numeric',
        day:'numeric'
    }
    
    useEffect(() => {
     message && setIsDeleting(false)
    },[message])
    
    return (
    <div className={style.blogs__comments_comment} key={comment._id}>
        <figure>
            <img src="/images/user.png" alt="user" />
        </figure>
        <div className={style.blogs__comments_content}>
            <div className={style.blogs__comments_header}>
                <div>
                    <span> {`${comment.user.firstName} ${comment.user.lastName}`} </span>
                    <i> {new Date(comment.createdAt).toLocaleDateString('en-US',dateOptions)} </i>
                </div>
                <strong>
                    {
                        isDeleting 
                        ? < Loader size='3' options={{animation:'grow'}}/>
                        : <span onClick={() => deleteCommentHandler(comment._id)}> 
                            <Trash/> 
                        </span> 
                    }
                </strong>
            </div>
            <p> {comment.comment} </p>
        </div>
    </div>
  )
}

export default Comment