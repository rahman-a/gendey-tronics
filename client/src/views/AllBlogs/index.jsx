import React, { useEffect } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import BlogCard from '../../components/BlogCard'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import strings from '../../localization'

const Blogs = () => {
  const dispatch = useDispatch()
  const { loading, error, blogs } = useSelector((state) => state.blogs)
  const { lang } = useSelector((state) => state.language)

  useEffect(() => {
    dispatch(actions.blogs.blogs())
  }, [dispatch])
  return (
    <Template>
      <div className={`${style.blogs} ${lang === 'ar' ? style.blogs_ar : ''}`}>
        <div
          className='container'
          style={{ height: loading || error ? '35rem' : 'auto' }}
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
                Loading Blogs....
              </p>
            </Loader>
          ) : error ? (
            <Message type='error' size='5' message={error} />
          ) : (
            blogs?.length &&
            blogs.length > 0 && (
              <div className={style.blogs__wrapper}>
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    lang={lang}
                    strings={strings}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </Template>
  )
}

export default Blogs
