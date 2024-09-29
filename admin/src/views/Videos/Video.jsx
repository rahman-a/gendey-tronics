import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.scss'
import { Trash, Edit, Video } from '../../icons'
import { Loader } from '../../components'
import actions from '../../actions'
import PlayVideo from './PlayVideo'
import UpdateVideo from './UpdateVideo'
import { API_URL } from '../../constants'

const VideoCard = ({ thumbnail, url, id, title }) => {
  const [isPlayVideo, setIsPlayVideo] = useState(false)
  const [isUpdateVideo, setIsUpdateVideo] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { message } = useSelector((state) => state.deleteMedia)
  const dispatch = useDispatch()

  const deleteMediaHandler = (e) => {
    e.stopPropagation()
    setIsDeleting(true)
    dispatch(actions.media.deleteMedia(id))
  }

  const updateVideoHandler = (e) => {
    e.stopPropagation()
    setIsUpdateVideo(true)
  }

  useEffect(() => {
    message && setIsDeleting(false)
  }, [message])

  return (
    <>
      <PlayVideo
        isPlayVideo={isPlayVideo}
        setIsPlayVideo={setIsPlayVideo}
        url={url}
      />

      <UpdateVideo
        isUpdateVideo={isUpdateVideo}
        setIsUpdateVideo={setIsUpdateVideo}
        video={{ _id: id, title, path: url }}
      />

      <figure
        className={style.videos__video}
        onClick={() => setIsPlayVideo(true)}
      >
        <img src={`${API_URL}/images/${thumbnail}`} alt='gallery' />
        <div className={style.videos__actions}>
          {isDeleting ? (
            <Loader
              size='2.5'
              options={{ animation: 'border' }}
              custom={{ color: '#fff', padding: 0 }}
            />
          ) : (
            <span onClick={deleteMediaHandler}>
              {' '}
              <Trash />{' '}
            </span>
          )}
        </div>
        <div className={style.videos__actions}>
          <span onClick={updateVideoHandler}>
            {' '}
            <Edit />{' '}
          </span>
        </div>
        <div className={style.videos__info}>
          <span>
            {' '}
            <Video />{' '}
          </span>
          <p> {title} </p>
        </div>
      </figure>
    </>
  )
}

export default VideoCard
