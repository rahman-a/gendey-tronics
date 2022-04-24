import React, { useEffect, useState, useRef } from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SideAlert, BackButton } from '../../components'
import actions from '../../actions'
import constants from '../../constants'
import BlogData from './BlogData'

const Blog = () => {
  const [info, setInfo] = useState({
    title: '',
    body: '',
    image: '',
  })
  const imageRef = useRef()
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector(
    (state) => state.createNewBlog
  )

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  const saveBlogInfo = (blog) => {
    const data = new FormData()

    for (let key in blog) {
      if (blog[key]) {
        data.append(key, blog[key])
      }
    }
    dispatch(actions.blogs.createBlog(data))
  }

  useEffect(() => {
    if (message) {
      setInfo({
        title: '',
        body: '',
        image: '',
      })

      imageRef.current.value = null
    }
  }, [message])

  useEffect(() => {
    return () => {
      dispatch({ type: constants.blogs.CREATE_BLOG_RESET })
    }
  }, [])

  return (
    <div className={`${style.blog} font-size-input font-size-button`}>
      <BackButton page='blogs' title='blogs' />

      <SideAlert
        position='left'
        type='danger'
        isOn={error ? true : false}
        text={error}
      />

      <SideAlert
        position='left'
        type='success'
        isOn={message ? true : false}
        text={message}
      />

      <div className='container'>
        <div className={style.blog__wrapper}>
          <div className={style.blog__header}>
            <h1 className='main-header'> Create New Blog... </h1>
            <span className={style.blog__header_date}>
              created At: {new Date().toLocaleDateString('en-US', dateOptions)}
            </span>
          </div>

          <div className={style.blog__body}>
            <BlogData
              info={info}
              setInfo={setInfo}
              saveBlogInfo={saveBlogInfo}
              imageRef={imageRef}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
