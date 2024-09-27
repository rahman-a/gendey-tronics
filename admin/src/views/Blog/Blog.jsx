import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy, Check, Upload } from '../../icons'
import { Loader, SideAlert, BackButton } from '../../components'
import actions from '../../actions'
import constants from '../../constants'
import BlogData from './BlogData'

const Product = () => {
  const [isCopied, setIsCopied] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, blog } = useSelector((state) => state.getBlog)
  const {
    loading: image_loading,
    error: image_error,
    message,
  } = useSelector((state) => state.updateBlogImage)

  const { id } = useParams()

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  const changeImageHandler = (e) => {
    if (e.target.files[0]) {
      const data = new FormData()
      data.append('image', e.target.files[0])
      dispatch(actions.blogs.updateBlogImage(blog._id, data))
    }
  }

  const onCopyHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }

  useEffect(() => {
    id && dispatch(actions.blogs.getBlog(id))
    return () => {
      dispatch({ type: constants.blogs.UPDATE_BLOG_IMAGE_RESET })
      dispatch({ type: constants.blogs.UPDATE_BLOG_RESET })
      dispatch({ type: constants.blogs.DELETE_BLOG_RESET })
    }
  }, [id])

  return (
    <div className={`${style.blog} font-size-input`}>
      <BackButton page='blogs' title='blogs' />

      <SideAlert type='danger' text={error} isOn={error ? true : false} />

      <SideAlert
        type='danger'
        text={image_error}
        isOn={image_error ? true : false}
      />

      <SideAlert type='success' text={message} isOn={message ? true : false} />

      <div className='container'>
        <div className={style.blog__wrapper}>
          {loading ? (
            <Loader size='8' center options={{ animation: 'border' }} />
          ) : (
            blog && (
              <>
                <div className={style.blog__header}>
                  <h1 className='main-header'> {blog.title} </h1>
                  <p>
                    {' '}
                    <strong> blog id: </strong>
                    {blog._id}
                    <CopyToClipboard text={blog._id} onCopy={onCopyHandler}>
                      <span className={style.blog__header_copy}>
                        {isCopied ? <Check /> : <Copy />}
                      </span>
                    </CopyToClipboard>
                  </p>
                  <span className={style.blog__header_date}>
                    created At:{' '}
                    {new Date(blog.createdAt).toLocaleDateString(
                      'en-US',
                      dateOptions
                    )}
                  </span>
                </div>

                <div className={style.blog__body}>
                  <div className={style.blog__content}>
                    <BlogData data={blog} />
                  </div>
                  <figure className={style.blog__image}>
                    <div
                      className={style.blog__image_backdrop}
                      style={{ display: image_loading && 'block' }}
                    >
                      <label htmlFor='blog-image'>
                        {image_loading ? (
                          <Loader
                            size='5'
                            center
                            options={{ animation: 'border' }}
                          />
                        ) : (
                          <>
                            <span>
                              {' '}
                              <Upload />{' '}
                            </span>
                            <span> upload a new image </span>
                          </>
                        )}
                      </label>

                      <input
                        type='file'
                        id='blog-image'
                        onChange={changeImageHandler}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/images/${
                        blog.image
                      }`}
                      alt={blog.title}
                    />
                  </figure>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
