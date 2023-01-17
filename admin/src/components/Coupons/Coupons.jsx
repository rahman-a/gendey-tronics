import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal,
  Button,
  InputGroup,
  Form,
  Row,
  Col,
  Table,
  Badge,
} from 'react-bootstrap'
import { Coupon, Trash } from '../../icons'
import actions from '../../actions'
import { Loader } from '../../components'
import constants from '../../constants'

const Coupons = ({ isCoupon, setIsCoupon }) => {
  const [code, setCode] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [limits, setLimits] = useState(0)
  const [errors, setErrors] = useState(null)
  const [expiryAt, setExpiryAt] = useState()
  const dispatch = useDispatch()
  const { coupons } = useSelector((state) => state.listCoupons)
  const { loading, error, message } = useSelector((state) => state.createCoupon)

  const listCoupons = (_) => {
    // pagination won't be added until website released and doing modification
    //  when there is time for that
    dispatch(actions.courses.listCoupons())
  }

  const addCouponHandler = (_) => {
    setErrors(null)
    if (!code) {
      setErrors('Please Provide Code for Coupon')
      return
    }
    if (!discount) {
      setErrors('Please Provide Discount Value for Coupon')
      return
    }
    if (limits === 0 && !expiryAt) {
      setErrors('Please Provide Expiry Date or use Limit for Coupon')
      return
    }

    if (new Date(expiryAt).getTime() < new Date().getTime()) {
      setErrors('Expiry Date must be greater than today')
      return
    }
    const data = {
      applyLimit: limits,
      code,
      discountPercentage: discount,
      expiryAt,
    }
    dispatch(actions.courses.createCoupons(data))
  }

  const deleteCouponHandler = (id) => {
    dispatch(actions.courses.deleteCoupons(id))
  }

  const onModalHide = () => {
    dispatch({ type: constants.courses.CREATE_COUPON_RESET })
    setIsCoupon(false)
    setErrors(null)
  }

  useEffect(() => {
    error && setErrors(error)
  }, [error])
  return (
    <Modal show={isCoupon} onShow={listCoupons} onHide={onModalHide} size='lg'>
      <Modal.Header>
        <p>
          <span>
            {' '}
            <Coupon width='2em' height='2em' />{' '}
          </span>
          <span style={{ marginLeft: '1rem' }}> Coupons </span>
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className={`${style.coupons} font-size-input font-size-span`}>
          <div
            style={{
              marginBottom: '1rem',
              maxHeight: '35rem',
              overflowY: 'auto',
            }}
          >
            <Table
              striped
              bordered
              hover
              size='sm'
              className='text-center fs-5'
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Discount %</th>
                  <th>Is Valid</th>
                  <th>Limited To</th>
                  <th>Expiry At</th>
                  <th>Number of Use</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coupons &&
                  coupons.map((coupon, idx) => (
                    <tr>
                      <td> {idx + 1} </td>
                      <td> {coupon.code} </td>
                      <td> {coupon.discountPercentage} </td>
                      <td>
                        {coupon.isValid ? (
                          <Badge bg='success'> valid </Badge>
                        ) : (
                          <Badge bg='danger'> not valid </Badge>
                        )}
                      </td>
                      <td> {coupon.applyLimit} </td>
                      <td>
                        {coupon.expiryAt ? (
                          new Date(coupon.expiryAt).toLocaleDateString()
                        ) : (
                          <Badge bg='dark'>N/A</Badge>
                        )}
                      </td>
                      <td> {coupon.applyCount} </td>
                      <td>
                        {' '}
                        <Button
                          variant='danger'
                          onClick={() => deleteCouponHandler(coupon._id)}
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <Row>
            <InputGroup className='mb-3' style={{ flexGrow: '3' }} as={Col}>
              <InputGroup.Text> coupon Code </InputGroup.Text>
              <Form.Control
                onChange={({ target: { value } }) => setCode(value)}
              />
            </InputGroup>

            <InputGroup className='mb-3' style={{ flexGrow: '3' }} as={Col}>
              <InputGroup.Text> discount value % </InputGroup.Text>
              <Form.Control
                type='number'
                onChange={({ target: { value } }) => setDiscount(value)}
              />
            </InputGroup>

            <InputGroup className='mb-3' style={{ flexGrow: '2' }} as={Col}>
              <InputGroup.Text> limited to </InputGroup.Text>
              <Form.Control
                type='number'
                onChange={({ target: { value } }) => setLimits(value)}
              />
            </InputGroup>

            <InputGroup className='mb-3' style={{ flexGrow: '3' }} as={Col}>
              <InputGroup.Text> expired at </InputGroup.Text>
              <Form.Control
                type='date'
                onChange={({ target: { value } }) => setExpiryAt(value)}
              />
            </InputGroup>

            {loading && <Loader size='3' options={{ animation: 'border' }} />}

            <Button size='lg' variant='success' onClick={addCouponHandler}>
              Add
            </Button>

            {(errors || message) && (
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  color: errors ? 'red' : 'green',
                }}
              >
                {errors || message}
              </p>
            )}
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant='success' onClick={createEnrollmentHandler}> Create Enrollment </Button> */}
        <Button size='lg' variant='danger' onClick={onModalHide}>
          {' '}
          Cancel{' '}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Coupons
