import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Template from '../../components/Template'
import ImageCard from '../../components/ImageCard'
import { Overlay } from '../../components/Overlay'
import { Modal } from '../../components/Modal'
import Loader from '../../components/Loader'
import actions from '../../actions'
import strings from '../../localization'

const PhotoGallery = () => {
  const [showImage, setShowImage] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [isRightArrow, setIsRightArrow] = useState(true)
  const [isLeftArrow, setIsLeftArrow] = useState(true)
  const [skip, setSkip] = useState(0)
  const history = useHistory()
  const { lang } = useSelector((state) => state.language)
  const { images, count, isLoading } = useSelector(
    (state) => state.listGalleryItems
  )
  const dispatch = useDispatch()

  const showImageHandler = (img, idx) => {
    setShowImage(true)
    setImageSrc(img)
    setImageIndex(idx)
    if (idx === 0) {
      setIsLeftArrow(false)
    }
    if (idx === images.length - 1) {
      setIsRightArrow(false)
    }
  }

  const nextImageHandler = (_) => {
    if (imageIndex >= images.length - 1) {
      return
    }
    if (imageIndex >= 0) {
      setIsLeftArrow(true)
    }
    const image = images[imageIndex + 1].path
    setImageSrc(image)
    setImageIndex(imageIndex + 1)
    if (imageIndex === images.length - 2) {
      setIsRightArrow(false)
    }
  }

  const prevImageHandler = (_) => {
    if (imageIndex <= 0) {
      return
    }
    if (imageIndex <= images.length - 1) {
      setIsRightArrow(true)
    }
    const image = images[imageIndex - 1].path
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
  const nextHandlerImages = () => {
    const skipValue = skip + 15
    if (skipValue < count) {
      setSkip(skipValue)
      dispatch(
        actions.content.listGalleryItems({
          type: 'image',
          skip: String(skipValue),
        })
      )
    }
  }
  const prevHandlerImages = () => {
    if (skip >= 5) {
      const skipValue = skip - 15
      setSkip(skipValue)
      dispatch(
        actions.content.listGalleryItems({
          type: 'image',
          skip: String(skipValue),
        })
      )
    }
  }
  useEffect(() => {
    dispatch(
      actions.content.listGalleryItems({ type: 'image', skip: String(skip) })
    )
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
      <Modal toggle={showImage} closeHandler={closeModalHandler}>
        <figure style={{ minWidth: '40rem', maxHeight: '100vh', margin: '0' }}>
          <img
            src={`${import.meta.env.VITE_API_URL}/images/${imageSrc}`}
            alt=''
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </figure>
      </Modal>
      <Template>
        <div className={style.photoGallery}>
          <figure>
            <img src='images/screen.jpg' alt='screen' />
            <div className={style.photoGallery__switch}>
              <h2>{strings.gallery[lang].photo_gallery}</h2>
              <button onClick={() => history.push('/videos')}>
                {strings.gallery[lang].video_switch}
              </button>
            </div>
          </figure>

          <div className='container'>
            <div className={style.photoGallery__wrapper}>
              {isLoading ? (
                <Loader size='8' center custom={{ top: '10%' }} />
              ) : images && images.length === 0 ? (
                <div>
                  <img
                    className={style.photoGallery__noImage}
                    src='/images/no-image-available.png'
                    alt='not found'
                  />
                </div>
              ) : (
                images &&
                images.map((image, idx) => {
                  return (
                    <ImageCard
                      key={image._id}
                      src={image.path}
                      idx={idx}
                      showImage={showImageHandler}
                    />
                  )
                })
              )}
            </div>
          </div>
          {count && count > 15 && (
            <div className={style.photoGallery__pagination}>
              <button onClick={prevHandlerImages}>
                {lang === 'en' ? 'prev' : 'السابق'}
              </button>
              <button onClick={nextHandlerImages}>
                {lang === 'en' ? 'next' : 'التالى'}
              </button>
            </div>
          )}
        </div>
      </Template>
    </>
  )
}
export default PhotoGallery
