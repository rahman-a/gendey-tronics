import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Trash } from '../../icons'
import { Loader, SideAlert } from '../../components'
import actions from '../../actions'

const ProductData = ({ data }) => {
  const [info, setInfo] = useState({
    name: '',
    short: '',
    description: '',
    video: '',
    price: '',
    quantity: '',
    image: '',
    type: '',
  })

  const [deleteModal, setDeleteModal] = useState(false)

  const navigate = useHistory().push

  const { loading, error, message } = useSelector((state) => state.editProduct)
  const {
    loading: delete_loading,
    error: delete_error,
    message: delete_message,
  } = useSelector((state) => state.deleteProduct)

  const { pages } = useSelector((state) => state.listPages)

  const dispatch = useDispatch()

  const getProductInfo = (e) => {
    const value = { [e.target.name]: e.target.value }
    setInfo({ ...info, ...value })
  }

  const updateTheProductInfo = (e) => {
    e.preventDefault()

    let productData = {}

    for (let key in info) {
      if (info[key]) {
        productData[key] = info[key]
      }
    }

    dispatch(actions.products.updateProduct(data._id, productData))
  }

  const initiateDeleteProcess = (e) => {
    e.preventDefault()
    setDeleteModal(true)
  }

  const deleteProductHandler = (e) => {
    e.preventDefault()
    dispatch(actions.products.deleteProduct(data._id))
  }

  useEffect(() => {
    if (delete_message) {
      setDeleteModal(false)
      setTimeout(() => {
        navigate('/products')
      }, 2000)
    }
  }, [delete_message])

  useEffect(() => {
    message &&
      setInfo({
        name: '',
        short: '',
        description: '',
        video: '',
        price: '',
        quantity: '',
        image: '',
        type: '',
      })
  }, [message])

  return (
    <>
      <SideAlert
        type='danger'
        position='left'
        isOn={error ? true : false}
        text={error}
      />

      <SideAlert
        type='danger'
        position='left'
        isOn={delete_error ? true : false}
        text={delete_error}
      />

      <SideAlert
        type='success'
        position='left'
        isOn={message ? true : false}
        text={message}
      />

      <SideAlert
        type='success'
        position='left'
        time={1200}
        isOn={delete_message ? true : false}
        text={delete_message}
      />

      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <Trash /> &nbsp; {data.name}
          </p>
        </Modal.Header>

        <Modal.Body>
          {delete_loading && (
            <Loader size='8' center options={{ animation: 'border' }} />
          )}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'red', fontWeight: '300' }}> Are You Sure? </h3>
            <p style={{ margin: '1rem 0' }}>
              {' '}
              Do you really want to delete the product{' '}
            </p>
            <p style={{ margin: '1rem 0' }}> This Process Can't be undone </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='primary'
            size='lg'
            disabled={delete_loading ? true : false}
            onClick={() => setDeleteModal(false)}
          >
            NO, Don't Delete
          </Button>
          <Button
            variant='danger'
            size='lg'
            disabled={delete_loading ? true : false}
            onClick={deleteProductHandler}
          >
            YES, Delete Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Form>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type='text'
            placeholder={data.name}
            name='name'
            value={info.name}
            onChange={(e) => getProductInfo(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicShort'>
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            type='text'
            name='short'
            placeholder={data.short || 'N/A'}
            value={info.short}
            onChange={(e) => getProductInfo(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicDescription'>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as='textarea'
            name='description'
            row={8}
            placeholder={data.description || 'N/A'}
            value={info.description}
            onChange={(e) => getProductInfo(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicVideo'>
          <Form.Label>Short Video</Form.Label>
          <Form.Control
            type='text'
            name='video'
            placeholder={data.video || 'N/A'}
            value={info.video}
            onChange={(e) => getProductInfo(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicQuantity'>
          <Form.Label>
            Set Page
            <sup style={{ color: 'red' }} title='required'>
              *
            </sup>
          </Form.Label>
          <Form.Select
            name='type'
            id='type'
            value={info.type}
            onChange={(e) => getProductInfo(e)}
          >
            <option value='' selected>
              ........
            </option>
            {pages?.length &&
              pages.map((page) => (
                <option
                  className={style.product__form_page}
                  key={uuidv4()}
                  value={page.toLocaleLowerCase()}
                >
                  {page}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPrice'>
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type='number'
            name='price'
            placeholder={data.price}
            value={info.price}
            onChange={(e) => getProductInfo(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicQuantity'>
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type='number'
            name='quantity'
            placeholder={data.quantity}
            value={info.quantity}
            onChange={(e) => getProductInfo(e)}
          />
        </Form.Group>

        <div className={style.product__submit}>
          <Button
            variant='primary'
            type='submit'
            size='lg'
            disabled={loading ? true : false}
            onClick={updateTheProductInfo}
          >
            Update
          </Button>

          <Button
            variant='danger'
            type='submit'
            size='lg'
            disabled={loading ? true : false}
            onClick={initiateDeleteProcess}
          >
            Delete
          </Button>

          {loading && <Loader size='4' options={{ animation: 'border' }} />}
        </div>
      </Form>
    </>
  )
}

export default ProductData
