import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Badge } from 'react-bootstrap'
import parser from 'html-react-parser'
import style from './style.module.scss'
import { Times, Check, Copy, Edit, Reader, Comments } from '../../icons'
import { Loader, Note, Reviews } from '../../components'
import actions from '../../actions'
import UpdateInstructor from './UpdateInstructor'

const Row = ({ instructor, idx }) => {
  const [isDescriptionOn, setIsDescriptionOn] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isReviews, setIsReviews] = useState(false)
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.deleteInstructor)

  const copyIdHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }

  const initiateDeleteProcess = (_) => {
    setConfirmDelete(true)
  }

  const confirmDeleteInstructorHandler = (_) => {
    setConfirmDelete(false)
    setIsDeleting(true)
    setTimeout(() => {
      dispatch(actions.instructor.deleteInstructor(instructor._id))
    }, 500)
  }

  const cutText = (text) => {
    const strippedHtml = text.replace(/<[^>]*>?/gm, '')
    return strippedHtml.length > 25
      ? strippedHtml.slice(0, 25) + '...'
      : strippedHtml
  }

  const reviews = instructor?.reviews.map((review, idx) => ({
    _id: review._id,
    name: `${review.user.firstName} ${review.user.lastName}`,
    comment: review.body,
    rating: review.rating,
  }))

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  useEffect(() => {
    message && setIsDeleting(false)
  }, [message])

  return (
    <>
      <Note
        isNoteOn={isDescriptionOn}
        setIsNoteOn={setIsDescriptionOn}
        note={parser(instructor.about)}
        title='About Instructor'
      />

      <Reviews
        isReviews={isReviews}
        setIsReview={setIsReviews}
        reviews={reviews}
      />

      <UpdateInstructor
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        instructor={instructor}
      />

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Body>
          <p
            className={style.instructors__confirmDelete}
            style={{ fontSize: '2rem' }}
          >
            {' '}
            Are you sure?
          </p>
          <p className={style.instructors__confirmDelete}>
            Do You Really want to delete the Instructor permanently.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            size='lg'
            onClick={() => setConfirmDelete(false)}
          >
            NO, Don't Delete
          </Button>
          <Button
            variant='info'
            size='lg'
            onClick={confirmDeleteInstructorHandler}
          >
            YES, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {
        <>
          <td>{idx + 1}</td>
          <td className={style.instructors__code}>
            <CopyToClipboard text={instructor._id} onCopy={copyIdHandler}>
              <i>{isCopied ? <Check /> : <Copy />}</i>
            </CopyToClipboard>
            <Badge bg='dark'> {instructor._id.substring(0, 12) + '...'} </Badge>
          </td>
          <td>{`${instructor.info.firstName} ${instructor.info.lastName}`}</td>
          <td>
            <img
              className='row-photo'
              src={`${import.meta.env.VITE_API_URL}/images/${
                instructor.avatar
              }`}
              alt={instructor.info.firstName}
            />
          </td>

          <td style={{ padding: instructor.about ? '0' : '2.5rem 0' }}>
            {instructor.about ? (
              <p className={style.instructors__about}>
                <span onClick={() => setIsDescriptionOn(true)}>
                  <Reader />
                </span>
                <i style={{ lineBreak: 'anywhere', padding: '0 0.8rem' }}>
                  {cutText(instructor.about)}
                </i>
              </p>
            ) : (
              'N/A'
            )}
          </td>
          <td>{instructor.role}</td>

          <td>
            <Badge bg='success'>
              {new Date(instructor.createdAt).toLocaleDateString(
                'en-US',
                dateOptions
              )}
            </Badge>
          </td>

          <td className={style.instructors__action}>
            <span
              className={style.instructors__delete}
              style={{ position: 'relative' }}
            >
              {isDeleting ? (
                <Loader size='4' center options={{ animation: 'border' }} />
              ) : (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => initiateDeleteProcess()}
                >
                  <Times />
                </span>
              )}
            </span>
            <span
              className={style.instructors__edit}
              style={{ position: 'relative' }}
              onClick={() => setIsEditing(true)}
            >
              <span style={{ cursor: 'pointer' }}>
                <Edit />
              </span>
            </span>
            <span
              className={style.instructors__review}
              style={{ position: 'relative' }}
              onClick={() => setIsReviews(true)}
            >
              <span style={{ cursor: 'pointer' }}>
                <Comments />
              </span>
            </span>
          </td>
        </>
      }
    </>
  )
}

export default Row
