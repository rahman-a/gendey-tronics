import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import parser from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Loader from '../Loader'
import actions from '../../actions'
import constants from '../../constants'

const BlogCard = ({ blog, lang, strings }) => {
  const [seenLoading, setSeenLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, seen } = useSelector((state) => state.blogViews)
  const controlBlogViewHandler = () => {
    setSeenLoading(true)
    dispatch({ type: constants.blogs.GET_BLOG_RESET })
    dispatch(actions.blogs.blogViews(blog._id))
  }

  const renderContent = (content) => {
    const text = parser(content.substr(0, 500) + '.....')
    return text
  }

  useEffect(() => {
    if (seen && seenLoading) {
      setSeenLoading(false)
      history.push(`/blog/${blog._id}`)
    }
  }, [seen])
  return (
    <div className={style.blog}>
      <figure>
        <img src={`/api/images/${blog.image}`} alt='mechanic' />
      </figure>
      <div className={style.blog__content}>
        <h3>{blog.title}</h3>
        <p className={style.blog__content_date}>
          {new Date(blog.createdAt).toDateString()}
        </p>
        <p className={style.blog__content_par}>{renderContent(blog.body)}</p>
        <div
          style={{
            float: lang === 'en' ? 'right' : 'left',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {seenLoading && <Loader size='4' />}
          <button onClick={controlBlogViewHandler} disabled={loading}>
            {strings.blog[lang].read_more}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
