import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import style from './style.module.scss'
import { Times, Check, Copy, Edit } from '../../icons'
import { Loader } from '../../components'
import actions from '../../actions'

const Row = ({ product, idx }) => {
  const [productId, setProductId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.deleteProduct)

  const copyIdHandler = (_) => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }

  const initiateDeleteProcess = (id) => {
    setProductId(id)
    setConfirmDelete(true)
  }

  const confirmDeleteProductHandler = (_) => {
    setConfirmDelete(false)
    setIsDeleting(true)
    setTimeout(() => {
      dispatch(actions.products.deleteProduct(productId))
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
            className={style.products__confirmDelete}
            style={{ fontSize: '2rem' }}
          >
            {' '}
            Are you sure?
          </p>
          <p className={style.products__confirmDelete}>
            Do You Really want to delete the product permanently.
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
          <td className='row-id'>
            <CopyToClipboard text={product._id} onCopy={copyIdHandler}>
              <span>{isCopied ? <Check /> : <Copy />}</span>
            </CopyToClipboard>
            {product._id.substring(0, 12) + '...'}
          </td>
          <td>{product.name}</td>
          <td>
            <img
              className='row-photo'
              src={
                product.image
                  ? `${import.meta.env.VITE_API_URL}/images/${product.image}`
                  : product.images?.length
                  ? `${import.meta.env.VITE_API_URL}/images/${
                      product.images[0].src
                    }`
                  : '/images/no-image.png'
              }
              alt={product.name}
            />
          </td>
          <td>{product.type}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td className={style.products__action}>
            <span
              className={style.products__delete}
              style={{ position: 'relative' }}
            >
              {isDeleting ? (
                <Loader size='4' center options={{ animation: 'border' }} />
              ) : (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => initiateDeleteProcess(product._id)}
                >
                  <Times />
                </span>
              )}
            </span>
            <span
              className={style.products__edit}
              style={{ position: 'relative' }}
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => history.push(`/products/${product._id}`)}
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
