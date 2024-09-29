import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Modal, Button } from 'react-bootstrap'
import { Photos } from '../../components/icons'
import { API_URL } from '../../constants'

const Gallery = ({ isGallery, setIsGallery, images, name }) => {
  const [imgSrc, setImgSrc] = useState(null)

  let galleryContent = (
    <p style={{ textAlign: 'center', color: '#ccc' }}>
      Please Select image from right sidebar
    </p>
  )

  if (imgSrc) {
    galleryContent = (
      <>
        <img src={imgSrc.src} alt='product' />
      </>
    )
  }

  useEffect(() => {
    if (images) {
      setImgSrc({
        src: `${API_URL}/images/${images[0]?.src}`,
        _id: images[0]?._id,
      })
    }
  }, [images])

  return (
    <>
      <Modal
        show={isGallery}
        onHide={() => setIsGallery(false)}
        centered
        size='lg'
      >
        <Modal.Header>
          <Modal.Title>
            <span style={{ marginRight: '1rem', color: 'cadetblue' }}>
              {' '}
              <Photos width='2.5rem' height='2.5rem' />{' '}
            </span>
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.product__gallery}>
            <div className={style.product__gallery_sidebar}>
              {images &&
                images.map((image) => (
                  <img
                    key={image.key}
                    className={
                      imgSrc?.src === `${API_URL}/images/${image.src}`
                        ? style.product__gallery_active
                        : ''
                    }
                    onClick={() =>
                      setImgSrc({
                        src: `${API_URL}/images/${image.src}`,
                        _id: image._id,
                      })
                    }
                    src={`${API_URL}/images/${image.src}`}
                    alt='product'
                  />
                ))}
            </div>
            <div className={style.product__gallery__separator}></div>
            <div className={style.product__gallery_image}>{galleryContent}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            size='lg'
            onClick={() => setIsGallery(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Gallery
