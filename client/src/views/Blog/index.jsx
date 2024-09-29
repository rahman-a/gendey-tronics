import React, { useEffect } from 'react'
import style from './style.module.scss'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import parser from 'html-react-parser'
import Template from '../../components/Template'
import AddComment from '../../components/AddComment'
import BlogComment from '../../components/BlogComment'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import actions from '../../actions'
import constants, { API_URL } from '../../constants'
import strings from '../../localization'

const Blog = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, error, blog } = useSelector((state) => state.blog)
  const { isAuth } = useSelector((state) => state.client)
  const { lang } = useSelector((state) => state.language)

  const renderContent = (content) => {
    const text = parser(content)
    return text
  }

  useEffect(() => {
    dispatch({ type: constants.blogs.CONTROL_BLOG_VIEWS_RESET })
    dispatch(actions.blogs.blog(id))
  }, [id, dispatch])
  return (
    <Template>
      <div className={style.blog}>
        <div
          className='container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: loading || error ? '35rem' : 'auto',
          }}
        >
          {loading ? (
            <Loader size='25' center custom={{ color: '#d0ae0b' }}>
              <p
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '500',
                  color: '#424242',
                }}
              >
                {strings.blog[lang].blog_load}
              </p>
            </Loader>
          ) : error ? (
            <Message type='error' size='5' message={error} />
          ) : (
            blog && (
              <div className={style.blog__wrapper}>
                <h2>{blog.title}</h2>
                <p className={style.blog__date}>{`
                            By: ${blog.author.firstName} ${
                  blog.author.lastName
                } on ${new Date(blog.createdAt).toDateString()} 
                        `}</p>
                <figure>
                  <img
                    src={`${API_URL}/images/${blog.image}`}
                    alt={blog.title}
                  />
                </figure>
                <p className={style.blog__content}>
                  {renderContent(blog.body)}
                </p>
                {isAuth ? (
                  <AddComment lang={lang} strings={strings} />
                ) : (
                  <h2
                    className={style.blog__noComment}
                    onClick={() => history.push('/login')}
                  >
                    {strings.blog[lang].log_comment}
                  </h2>
                )}
                <div
                  className={style.blog_comments}
                  style={{ marginTop: '2rem' }}
                >
                  {blog &&
                    blog.comments.length > 0 &&
                    blog.comments.map((comment) => (
                      <BlogComment key={comment._id} comment={comment} />
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Template>
  )
}

export default Blog
