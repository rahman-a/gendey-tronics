import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Loader from '../Loader'
import Message from '../Message'
import { useParams } from 'react-router-dom'
import actions from '../../actions'
import { useDispatch, useSelector} from 'react-redux'
import constants from '../../constants'

const AddComment = ({lang, strings}) => {
    const [comment, setComment] = useState('')
    const {id} = useParams()
    const dispatch = useDispatch()
    const {loading, error, message} = useSelector(state => state.addBlogComment)
    const addCommentHandler = () => {
        const data = {comment} 
        dispatch(actions.blogs.addBlogComment(id, data))
    }
    useEffect(() => {
        message && setComment('')
        if(message || error){
            setTimeout(() => {
                dispatch({type:constants.blogs.ADD_BLOG_COMMENT_RESET})
            },5000)
        }
    },[message, error, dispatch])
    return (
        <div className={style.addComment}>
            <figure>
                <img src="/images/user.png" alt="user" />
            </figure>
            <div className={style.addComment__comment}>
                {
                    loading ? <Loader size='5' center/>
                    :error ? <Message size='2.5' type='error' message={error}/>
                    :message && <Message size='2.5' type='success' message={message}/>
                }
                <textarea 
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)} 
                placeholder={strings.blog[lang].leave_comment}>
                </textarea>
                <button disabled={loading} onClick={addCommentHandler}>
                    {lang === 'en' ? 'Save':'نشر'}
                </button>
            </div>
        </div>
    )
}

export default AddComment
