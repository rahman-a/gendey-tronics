import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Badge } from 'react-bootstrap'
import style from './style.module.scss'
import Enrollments from './Enrollments'
import { Times, Check, Copy, Edit, Reader } from '../../icons'
import { Loader, Note, Rating } from '../../components'
import actions from '../../actions'

const Row = ({ course, idx }) => {
  const [isDescriptionOn, setIsDescriptionOn] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isEnrollments, setIsEnrollments] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.deleteCourse)

  const copyIdHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }

  const initiateDeleteProcess = (_) => {
    setConfirmDelete(true)
  }

  const confirmDeleteProductHandler = (_) => {
    setConfirmDelete(false)
    setIsDeleting(true)
    setTimeout(() => {
      dispatch(actions.courses.deleteCourse(course._id))
    }, 500)
  }

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1)
    let minutes = (ms / (1000 * 60)).toFixed(1)
    let hours = (ms / (1000 * 60 * 60)).toFixed(1)
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1)
    if (seconds < 60) return 'a few seconds'
    else if (minutes < 60) return Math.round(minutes) + ' minutes'
    else if (hours < 24) return Math.round(hours) + ' hours'
    else {
      if (Math.round(days) === 1) {
        return Math.round(days) + ' day'
      } else {
        return Math.round(days) + ' days'
      }
    }
  }

  const showCourseEnrollments = (_) => {
    if (course.students > 0) {
      setIsEnrollments(true)
    }
  }

  useEffect(() => {
    message && setIsDeleting(false)
  }, [message])

  return (
    <>
      <Note
        isNoteOn={isDescriptionOn}
        setIsNoteOn={setIsDescriptionOn}
        note={course.description}
        title='Course Description'
      />

      {
        <Enrollments
          isEnrollments={isEnrollments}
          setIsEnrollments={setIsEnrollments}
          id={course._id}
        />
      }

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Body>
          <p
            className={style.courses__confirmDelete}
            style={{ fontSize: '2rem' }}
          >
            {' '}
            Are you sure?
          </p>
          <p className={style.courses__confirmDelete}>
            Do You Really want to delete the course permanently.
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
            onClick={confirmDeleteProductHandler}
          >
            YES, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {
        <>
          <td>{idx + 1}</td>
          <td className={style.courses__code}>
            <CopyToClipboard text={course._id} onCopy={copyIdHandler}>
              <i>{isCopied ? <Check /> : <Copy />}</i>
            </CopyToClipboard>
            <Badge bg='dark'> {course._id.substring(0, 12) + '...'} </Badge>
          </td>
          <td>
            <span style={{ lineBreak: 'anywhere', padding: '0 0.8rem' }}>
              {course.name?.substring(0, 35) + '...'}
            </span>
          </td>
          <td>
            <img
              className='row-photo'
              src={`/api/images/${course.image}`}
              alt={course.name}
            />
          </td>

          <td style={{ padding: course.description ? '0' : '2.5rem 0' }}>
            {course.description ? (
              <p className={style.courses__description}>
                <span onClick={() => setIsDescriptionOn(true)}>
                  <Reader />
                </span>
                <i style={{ lineBreak: 'anywhere', padding: '0 0.8rem' }}>
                  {course.description?.substring(0, 35) + '...'}
                </i>
              </p>
            ) : (
              'N/A'
            )}
          </td>

          <td>
            {course.isPaid ? (
              `${course.price}$`
            ) : (
              <Badge bg='success'>FREE</Badge>
            )}
          </td>

          <td>
            <Rating rating={course.rating} />
          </td>

          <td className={course.students > 0 && style.courses__enroll}>
            {<span onClick={showCourseEnrollments}>{course.students}</span>}
          </td>

          <td>
            {msToTime(
              new Date().getTime() - new Date(course.updatedAt).getTime()
            ) + ' ago'}
          </td>

          <td className={style.courses__action}>
            <span
              className={style.courses__delete}
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
              className={style.courses__edit}
              style={{ position: 'relative' }}
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => history.push(`/courses/${course._id}`)}
              >
                <Edit />
              </span>
            </span>
          </td>
        </>
      }
    </>
  )
}

export default Row
