import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector } from 'react-redux'
import { Form, Button, Alert } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { Loader } from '../../components'

const ProductData = ({ saveProductInfo, loading, info, setInfo, imageRef }) => {
  const { pages } = useSelector((state) => state.listPages)
  const [errors, setErrors] = useState(null)

  const getProductInfo = (e) => {
    const value = { [e.target.name]: e.target.value }
    setInfo({ ...info, ...value })
  }

  const isFormValid = (_) => {
    const values = []
    for (let key in info) {
      if (info[key]) {
        values.push(info[key])
      }
    }
    if (!values.length) {
      setErrors('Please Provide The Required Data...')
      return false
    }
    if (!info.name) {
      setErrors('Please Provide Product Name...')
      return false
    }
    if (!info.short) {
      setErrors('Please Provide Short Description...')
      return false
    }

    if (!info.description) {
      setErrors('Please Provide Product Description...')
      return false
    }
    if (!info.type) {
      setErrors('Please Provide Product Type...')
      return false
    }
    if (!info.price) {
      setErrors('Please Provide Product Price...')
      return false
    }
    if (!info.quantity) {
      setErrors('Please Provide Product Quantity...')
      return false
    }
    if (!info.images) {
      setErrors('Please Upload Product Image...')
      return false
    }

    return true
  }

  const saveTheProductInfo = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      let productData = {}
      for (let key in info) {
        if (info[key]) {
          productData[key] = info[key]
        }
      }
      saveProductInfo(productData)
    }
  }

  return (
    <>
      <div className={style.product__form}>
        {errors && (
          <Alert variant='danger' className='text-center'>
            {errors}
            <Button variant='outline-danger' onClick={() => setErrors(null)}>
              Close
            </Button>
          </Alert>
        )}

        <Form>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>
              Product Name
              <sup style={{ color: 'red' }} title='required'>
                *
              </sup>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Add Product Name'
              name='name'
              value={info.name}
              onChange={(e) => getProductInfo(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicShort'>
            <Form.Label>
              Short Description
              <sup style={{ color: 'red' }} title='required'>
                *
              </sup>
            </Form.Label>
            <Form.Control
              type='text'
              name='short'
              value={info.short}
              placeholder='Add Short Product Description'
              onChange={(e) => getProductInfo(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicDescription'>
            <Form.Label>
              Product Description
              <sup style={{ color: 'red' }} title='required'>
                *
              </sup>
            </Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              placeholder='Add Long Product Description'
              value={info.description}
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

          <Form.Group className='mb-3' controlId='formBasicVideo'>
            <Form.Label>Product Video</Form.Label>
            <Form.Control
              type='text'
              name='video'
              placeholder='Add Product Video Link'
              value={info.video}
              onChange={(e) => getProductInfo(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPrice'>
            <Form.Label>
              Product Price
              <sup style={{ color: 'red' }} title='required'>
                *
              </sup>
            </Form.Label>
            <Form.Control
              type='number'
              name='price'
              placeholder='Add Product Price'
              value={info.price}
              onChange={(e) => getProductInfo(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicQuantity'>
            <Form.Label>
              Product Quantity
              <sup style={{ color: 'red' }} title='required'>
                *
              </sup>
            </Form.Label>
            <Form.Control
              type='number'
              name='quantity'
              placeholder='Add Product Quantity'
              value={info.quantity}
              onChange={(e) => getProductInfo(e)}
            />
          </Form.Group>

          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>
              upload the Product Image
              <sup style={{ color: 'red' }} title='required'>
                *
              </sup>
            </Form.Label>
            <Form.Control
              ref={imageRef}
              type='file'
              multiple
              size='lg'
              onChange={(e) => setInfo({ ...info, images: e.target.files })}
            />
          </Form.Group>

          <div className={style.product__submit}>
            <Button
              variant='primary'
              type='submit'
              size='lg'
              disabled={loading ? true : false}
              onClick={saveTheProductInfo}
            >
              Save
            </Button>
            {loading && <Loader size='4' options={{ animation: 'border' }} />}
          </div>
        </Form>
      </div>
    </>
  )
}

export default ProductData
