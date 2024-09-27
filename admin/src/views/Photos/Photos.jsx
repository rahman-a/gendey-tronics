import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Overlay, CardModal, Loader, HeaderAlert } from '../../components'
import { Trash } from '../../icons'
import actions from '../../actions'
import Image from './Image'

// const images = [
//   '/images/img-3.png',
//   '/images/image-1639832126607-.png',
//   '/images/img-1.png',
//   '/images/img-2.png',
//   '/images/img-3.png',
//   '/images/img-4.png',
//   '/images/img-1.png',
//   '/images/img-2.png',
//   '/images/img-3.png',
//   '/images/img-4.png',
// ]

const Photos = () => {
  const [showImage, setShowImage] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [isRightArrow, setIsRightArrow] = useState(true)
  const [isLeftArrow, setIsLeftArrow] = useState(true)
  const { isLoading, error, media } = useSelector((state) => state.listMedia)
  const { isLoading: create_loading } = useSelector(
    (state) => state.createMedia
  )
  const dispatch = useDispatch()

  const uploadNewImage = (e) => {
    const data = new FormData()
    data.append('type', 'image')
    data.append('media', e.target.files[0])
    dispatch(actions.media.createMedia(data))
  }

  const showImageHandler = (img, idx) => {
    setShowImage(true)
    setImageSrc(img)
    setImageIndex(idx)
    if (idx === 0) {
      setIsLeftArrow(false)
    }
    if (idx === media.length - 1) {
      setIsRightArrow(false)
    }
  }

  const nextImageHandler = (_) => {
    if (imageIndex >= media.length - 1) {
      return
    }
    if (imageIndex >= 0) {
      setIsLeftArrow(true)
    }
    const image = media[imageIndex + 1].path
    setImageSrc(image)
    setImageIndex(imageIndex + 1)
    if (imageIndex === media.length - 2) {
      setIsRightArrow(false)
    }
  }

  const prevImageHandler = (_) => {
    if (imageIndex <= 0) {
      return
    }
    if (imageIndex <= media.length - 1) {
      setIsRightArrow(true)
    }
    const image = media[imageIndex - 1].path
    setImageSrc(image)
    setImageIndex(imageIndex - 1)
    if (imageIndex === 1) {
      setIsLeftArrow(false)
    }
  }

  const closeModalHandler = (_) => {
    setShowImage(false)
    setIsRightArrow(true)
    setIsLeftArrow(true)
  }

  useEffect(() => {
    dispatch(actions.media.listMedia({ type: 'image' }))
  }, [])
  return (
    <>
      <Overlay
        toggle={showImage}
        arrow
        rightArrowHandler={nextImageHandler}
        leftArrowHandler={prevImageHandler}
        isRightArrow={isRightArrow}
        isLeftArrow={isLeftArrow}
      />
      <CardModal toggle={showImage} closeHandler={closeModalHandler}>
        <figure style={{ minWidth: '40rem', maxHeight: '100vh', margin: '0' }}>
          <img
            src={`${import.meta.env.VITE_API_URL}/images/${imageSrc}`}
            alt=''
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </figure>
      </CardModal>
      <div className={style.photos}>
        <h1 className='main-header'>Gallery</h1>
        <label htmlFor='gallery-image' className={style.photos__add}>
          {create_loading ? (
            <Loader
              size='2'
              custom={{ padding: 0 }}
              options={{ animation: 'border' }}
            />
          ) : (
            'Upload new Image'
          )}
        </label>
        <input
          type='file'
          style={{ display: 'none' }}
          id='gallery-image'
          onChange={uploadNewImage}
        />
        <div className='container'>
          <div
            className={style.photos__wrapper}
            style={{ height: isLoading ? '75vh' : 'auto' }}
          >
            {isLoading ? (
              <Loader size='6' center options={{ animation: 'border' }} />
            ) : error ? (
              <HeaderAlert type='danger' size='3' text={error} />
            ) : media && !media.length ? (
              <HeaderAlert type='danger' size='3' text='No Photos Found' />
            ) : (
              media &&
              media.map((image, idx) => (
                <Image
                  key={image._id}
                  id={image._id}
                  src={image.path}
                  idx={idx}
                  showImageHandler={showImageHandler}
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
