import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Badge } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import actions from '../../actions'
import { Times, Check, Copy, Edit } from '../../icons'
import { Loader } from '../../components'
import UpdateItem from './UpdateItem'

const Row = ({ item, parent }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isUpdateItem, setIsUpdateItem] = useState(false)
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.deleteItem)

  const confirmDeleteItemHandler = (_) => {
    setIsDeleting(true)
    setConfirmDelete(false)
    setTimeout(() => {
      dispatch(actions.menu.deleteItem(item._id, parent, item.order))
    }, 500)
  }
  const initiateDeleteProcess = (_) => {
    setConfirmDelete(true)
  }

  const copyIdHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }

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
      <UpdateItem
        isUpdateItem={isUpdateItem}
        setIsUpdateItem={setIsUpdateItem}
        item={{ ...item, parent }}
      />
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Body>
          <p className={style.menu__confirmDelete} style={{ fontSize: '2rem' }}>
            {' '}
            Are you sure?
          </p>
          <p className={style.menu__confirmDelete}>
            Do You Really want to delete the item permanently.
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
          <Button variant='danger' size='lg' onClick={confirmDeleteItemHandler}>
            YES, Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {
        <>
          <td> {item.order} </td>

          <td className='row-id'>
            <CopyToClipboard text={item._id} onCopy={copyIdHandler}>
              <span>{isCopied ? <Check /> : <Copy />}</span>
            </CopyToClipboard>
            {item._id.substring(0, 12) + '...'}
          </td>

          <td> {item.title['en']} </td>

          <td> {item.title['ar']} </td>

          <td>
            {' '}
            {new Date(item.createdAt).toLocaleDateString(
              'en-US',
              dateOptions
            )}{' '}
          </td>
          <td className={style.menu__action}>
            <span
              className={style.menu__delete}
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
            <span className={style.menu__edit} style={{ position: 'relative' }}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setIsUpdateItem(true)}
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
