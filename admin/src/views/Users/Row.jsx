import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import style from './style.module.scss'
import { Times, Check, Copy, Chalkboard } from '../../icons'
import { Loader } from '../../components'
import actions from '../../actions'
import Instructor from './Instructor'

const Row = ({ user, idx }) => {
  const [userId, setUserId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false)
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.deleteUser)

  const copyIdHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }

  const initiateDeleteProcess = (id) => {
    setUserId(id)
    setConfirmDelete(true)
  }

  const confirmDeleteUserHandler = (_) => {
    setConfirmDelete(false)
    setIsDeleting(true)
    setTimeout(() => {
      dispatch(actions.users.deleteUser(userId))
    }, 500)
  }
  useEffect(() => {
    message && setIsDeleting(false)
  }, [message])

  return (
    <>
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Body>
          <p
            className={style.users__confirmDelete}
            style={{ fontSize: '2rem' }}
          >
            {' '}
            Are you sure?
          </p>
          <p className={style.users__confirmDelete}>
            Do You Really want to delete the user permanently.
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
          <Button variant='danger' size='lg' onClick={confirmDeleteUserHandler}>
            YES, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Instructor
        isInstructor={isInstructor}
        setIsInstructor={setIsInstructor}
        id={user._id}
      />

      {
        <>
          <td>{idx + 1}</td>
          <td className='row-id'>
            <CopyToClipboard text={user._id} onCopy={copyIdHandler}>
              <span>{isCopied ? <Check /> : <Copy />}</span>
            </CopyToClipboard>
            {user._id.substring(0, 12) + '...'}
          </td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.phoneNumber}</td>
          <td className={style.users__actions}>
            <span
              className={style.users__delete}
              style={{ position: 'relative' }}
            >
              {isDeleting ? (
                <Loader size='4' center options={{ animation: 'border' }} />
              ) : (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => initiateDeleteProcess(user._id)}
                >
                  <Times />
                </span>
              )}
            </span>
            <span
              className={style.users__instructor}
              onClick={() => setIsInstructor(true)}
            >
              <Chalkboard />
            </span>
          </td>
        </>
      }
    </>
  )
}

export default Row
