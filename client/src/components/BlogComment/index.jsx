import React from 'react'
import style from './style.module.scss'
import {Trash} from '../icons'
import actions from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../Loader'

const BlogComment = ({comment}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {loading} = useSelector(state => state.deleteBlog)
    const {info, isAuth} = useSelector(state => state.client)
    const deleteCommentHandler = () => {
        dispatch(actions.blogs.deleteBlogComment(id))
    }
    return (
        <div className={style.comment}>
           <h4>
               {`${comment.user.firstName} ${comment.user.lastName}`}
               <span>{
                   new Date(comment.createdAt).toLocaleDateString()
                }</span>
                {(isAuth && info._id === comment.user._id) 
                && <span style={{cursor:'pointer', position:'relative'}}
                onClick={deleteCommentHandler}>
                   {loading ? <Loader size='4' center/> :<Trash/> }
                </span>}
            </h4>
           <p>
           {comment.comment}
           </p>
        </div>
    )
}

export default BlogComment
