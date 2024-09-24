import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import actions from '../../actions'
import { Eye, Times } from '../../icons'
import { Loader, NotAvailable } from '../../components'

const Row = ({ slide, idx }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isImage, setIsImage] = useState(false)
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.deleteSlider)
  const navigate = useHistory().push

  const confirmDeleteSliderHandler = (_) => {
    setIsDeleting(true)
    setConfirmDelete(false)
    setTimeout(() => {
      dispatch(actions.admin.deleteSlider(slide._id))
    }, 500)
  }
  const initiateDeleteProcess = (_) => {
    setConfirmDelete(true)
  }

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  const navigateTo = () => {
    switch (slide.target.type) {
      case 'blog':
        navigate(`/blogs/${slide.target.itemId._id}`)
        break
      case 'product':
        navigate(`/products/${slide.target.itemId._id}`)
        break
      case 'course':
        navigate(`/courses/${slide.target.itemId._id}`)
        break
      default:
        break
    }
  }

  useEffect(() => {
    message && setIsDeleting(false)
  }, [message])

  return (
    <>
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Body>
          <p
            className={style.sliders__confirmDelete}
            style={{ fontSize: '2rem' }}
          >
            {' '}
            Are you sure?
          </p>
          <p className={style.sliders__confirmDelete}>
            Do You Really want to delete the slider permanently.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='info'
            size='lg'
            onClick={() => setConfirmDelete(false)}
          >
            NO, Don't Delete
          </Button>
          <Button
            variant='danger'
            size='lg'
            onClick={confirmDeleteSliderHandler}
          >
            YES, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isImage} onHide={() => setIsImage(false)} fullscreen={true}>
        <Modal.Header>
          <Modal.Title> Slider Image </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            style={{ width: '100%', height: '100%' }}
            src={`/api/images/${slide.image}`}
            alt='slider'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ marginRight: '2rem' }}
            variant='secondary'
            size='lg'
            onClick={() => setIsImage(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {
        <>
          <td>{idx + 1}</td>

          <td> {slide.header ? slide.header.en : <NotAvailable />} </td>
          <td> {slide.header ? slide.header.ar : <NotAvailable />} </td>

          <td> {slide.subHeader ? slide.subHeader.en : <NotAvailable />} </td>
          <td> {slide.subHeader ? slide.subHeader.ar : <NotAvailable />} </td>

          <td style={{ padding: '0' }}>
            <p className={style.sliders__image}>
              <span onClick={() => setIsImage(true)}>
                <Eye />
              </span>
              <img src={`/api/images/${slide.image}`} alt='slider' />
            </p>
          </td>

          <td>
            <span className={style.sliders__item} onClick={navigateTo}>
              {slide.target.itemId?.name || slide.target.itemId?.title}
            </span>
          </td>

          <td>
            {' '}
            {new Date(slide.createdAt).toLocaleDateString(
              'en-US',
              dateOptions
            )}{' '}
          </td>
          <td className={style.sliders__action}>
            <span
              className={style.sliders__delete}
              style={{ position: 'relative' }}
            >
              {isDeleting ? (
                <Loader size='4' center options={{ animation: 'border' }} />
              ) : (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={initiateDeleteProcess}
                >
                  <Times />
                </span>
              )}
            </span>
          </td>
        </>
      }
    </>
  )
}

export default Row
