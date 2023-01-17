import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { SideAlert, Loader } from '../../components'
import { Chalkboard, Trash, Plus } from '../../icons'
import actions from '../../actions'
import constants from '../../constants'

const Instructor = ({ isInstructor, setIsInstructor, id }) => {
  const [info, setInfo] = useState([{ id: uuidv4(), about: '' }])
  const [image, setImage] = useState('')
  const [role, setRole] = useState('')
  const [isError, setIsError] = useState(null)
  const { isLoading, error, message } = useSelector(
    (state) => state.createInstructor
  )
  const dispatch = useDispatch()

  const validateForm = () => {
    if (!image) {
      setIsError('Please select an image')
      return false
    }
    if (!role) {
      setIsError('Please Define Instructor Job')
      return false
    }
    for (const i of info) {
      if (!i.about) {
        setIsError('Please Provide Instructor Info')
        return false
      }
    }

    return true
  }

  const createInstructorHandler = () => {
    if (validateForm()) {
      const points = info.map((item) => {
        return `<li>${item.about}</li>`
      })
      const about = `<ul class='instructor_info_7gt'> ${points.join(' ')} </ul>`
      const data = new FormData()
      data.append('about', about)
      data.append('avatar', image)
      data.append('role', role)
      data.append('info', id)
      dispatch(actions.instructor.createInstructor(data))
    }
  }

  const createNewPoint = () => {
    setInfo([
      ...info,
      {
        id: uuidv4(),
        about: '',
      },
    ])
  }

  const deletePoint = (id) => {
    info.length > 1 && setInfo(info.filter((point) => point.id !== id))
  }

  const updatePoint = (id, e) => {
    const newInfo = info.map((point) => {
      if (point.id === id) {
        return {
          ...point,
          about: e.target.value,
        }
      }
      return point
    })
    setInfo(newInfo)
  }

  const clearAlert = () => {
    setIsError(null)
    dispatch({ type: constants.instructor.INSTRUCTOR_CREATE_RESET })
  }

  useEffect(() => {
    error && setIsError(error)
  }, [error])

  useEffect(() => {
    message &&
      setTimeout(() => {
        setIsInstructor(false)
      }, 500)
  }, [message])

  return (
    <>
      <SideAlert
        isOn={isError ? true : false}
        text={isError}
        type='danger'
        reset={() => clearAlert()}
      />
      <SideAlert
        isOn={message ? true : false}
        text={message}
        type='success'
        reset={() => clearAlert()}
      />
      <Modal show={isInstructor} onHide={() => setIsInstructor(false)}>
        <Modal.Header>
          <Modal.Title>
            <span style={{ marginRight: '1rem', color: 'cadetblue' }}>
              {' '}
              <Chalkboard />{' '}
            </span>
            Set User As Instructor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && (
            <div className={style.users__overlay}>
              <Loader size='5' center options={{ animation: 'border' }} />
            </div>
          )}
          <Form className='p-3' onSubmit={createInstructorHandler}>
            {/* Upload Instructor Image */}
            <Form.Group controlId='formBasicImage' className='mb-3'>
              <Form.Label>Instructor Photo</Form.Label>
              <Form.Control
                type='file'
                placeholder='Upload Image'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            {/* Define Instructor Role */}
            <Form.Group controlId='formBasicImage' className='mb-3'>
              <Form.Label>Instructor Job</Form.Label>
              <Form.Control
                placeholder='instructor job'
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>

            {/* Add Instructor Info in Points */}
            <Form.Group controlId='formBasicInfo'>
              <Form.Label className='mb-3'>
                About Instructor in Points
                <Button
                  style={{ marginLeft: '1rem', height: '2.5rem' }}
                  variant='success'
                  onClick={() => createNewPoint()}
                >
                  {' '}
                  <Plus />{' '}
                </Button>
              </Form.Label>
              {info.map((point) => (
                <Row className='mb-3'>
                  <Col>
                    <Form.Control
                      key={point.id}
                      type='text'
                      placeholder='About Instructor'
                      value={point.about}
                      onChange={(e) => updatePoint(point.id, e)}
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{ height: '2.5rem' }}
                      variant='danger'
                      onClick={() => deletePoint(point.id)}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            size='lg'
            onClick={() => setIsInstructor(false)}
          >
            Close
          </Button>
          <Button variant='success' size='lg' onClick={createInstructorHandler}>
            Set As Instructor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Instructor
