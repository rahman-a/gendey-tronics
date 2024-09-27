import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { SideAlert, Loader } from '../../components'
import { Photos, Trash } from '../../icons'
import actions from '../../actions'
import constants from '../../constants'

const Gallery = ({ isGallery, setIsGallery }) => {
  const [imgSrc, setImgSrc] = useState(null)
  const { product } = useSelector((state) => state.getProduct)
  const { message, loading, error } = useSelector(
    (state) => state.deleteProductImage
  )
  const dispatch = useDispatch()

  const deleteImageHandler = (_) => {
    dispatch(actions.products.deleteProductImage(product._id, imgSrc._id))
  }

  const clearAlert = () => {
    dispatch({ type: constants.products.DELETE_IMAGE_RESET })
  }

  let galleryContent = (
    <p style={{ textAlign: 'center', color: '#ccc' }}>
      Please Select image from right sidebar
    </p>
  )

  if (imgSrc) {
    galleryContent = (
      <>
        <div>
          {loading ? (
            <Loader
              size='2.5'
              options={{ animation: 'border' }}
              custom={{ color: '#fff', padding: 0 }}
            />
          ) : (
            <span onClick={deleteImageHandler}>
              <Trash />
            </span>
          )}
        </div>
        <img src={imgSrc.src} alt='product' />
      </>
    )
  }

  useEffect(() => {
    return () => clearAlert()
  }, [])

  useEffect(() => {
    if (product || message) {
      setImgSrc({
        src: `${import.meta.env.VITE_API_URL}/images/${product.images[0]?.src}`,
        _id: product.images[0]?._id,
      })
    }
    message && clearAlert()
  }, [product, message])

  return (
    <>
      <SideAlert
        isOn={error ? true : false}
        text={error}
        type='danger'
        reset={() => clearAlert()}
      />
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
            Images Gallery
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.product__gallery}>
            <div className={style.product__gallery_sidebar}>
              {product?.images.map((image) => (
                <img
                  key={image._id}
                  className={
                    imgSrc?.src ===
                    `${import.meta.env.VITE_API_URL}/images/${image.src}`
                      ? style.product__gallery_active
                      : ''
                  }
                  onClick={() =>
                    setImgSrc({
                      src: `${import.meta.env.VITE_API_URL}/images/${
                        image.src
                      }`,
                      _id: image._id,
                    })
                  }
                  src={`${import.meta.env.VITE_API_URL}/images/${image.src}`}
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
