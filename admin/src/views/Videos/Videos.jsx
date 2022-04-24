import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Overlay, Loader, HeaderAlert } from '../../components'
import actions from '../../actions'
import Video from './Video'
import AddVideo from './AddVideo'

const videosMedia = [
  {
    _id: uuidv4(),
    thumbnail:
      'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
    path: 'https://www.youtube.com/embed/IUN664s7N-c',
    title:
      'How to make a website, this just title for test purpose to check the length of the title',
  },
  {
    _id: uuidv4(),
    thumbnail:
      'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
    path: 'https://www.youtube.com/embed/Mffxz2PNrLY',
    title: 'How to make a website',
  },
]

const Photos = () => {
  const [isAddVideo, setIsAddVideo] = useState(false)
  const { isLoading, error, media } = useSelector((state) => state.listMedia)

  const dispatch = useDispatch()

  const playVideoHandler = () => {}

  useEffect(() => {
    dispatch(actions.media.listMedia({ type: 'video' }))
  }, [])
  return (
    <>
      <AddVideo isAddVideo={isAddVideo} setIsAddVideo={setIsAddVideo} />

      <div className={style.videos}>
        <h1 className='main-header'>Videos</h1>
        <Button
          variant='dark'
          onClick={() => setIsAddVideo(true)}
          className={style.videos__add}
        >
          Add New Video
        </Button>
        <div className='container'>
          <div
            className={style.videos__wrapper}
            style={{ height: isLoading ? '75vh' : 'auto' }}
          >
            {isLoading ? (
              <Loader size='6' center options={{ animation: 'border' }} />
            ) : error ? (
              <HeaderAlert type='danger' size='3' text={error} />
            ) : media && !media.length ? (
              <HeaderAlert type='danger' size='3' text='No Videos Found' />
            ) : (
              media &&
              media.map((video, idx) => (
                <Video
                  key={video._id}
                  id={video._id}
                  thumbnail={video.thumbnail}
                  url={video.path}
                  title={video.title}
                  playVideoHandler={playVideoHandler}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Photos
