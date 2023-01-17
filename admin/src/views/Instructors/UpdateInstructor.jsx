import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { SideAlert, Loader } from '../../components'
import { Chalkboard, Trash, Plus } from '../../icons'
import actions from '../../actions'
import constants from '../../constants'

const Instructor = ({ isEditing, setIsEditing, instructor }) => {
  const [info, setInfo] = useState([{ id: uuidv4(), about: '' }])
  const [image, setImage] = useState(null)
  const [role, setRole] = useState(instructor.role)
  const { isLoading, error, message } = useSelector(
    (state) => state.updateInstructor
  )
  const dispatch = useDispatch()

  const extractInfo = () => {
    const points = []
    const splitText = instructor.about.split('</li>')
    splitText.forEach((text) => {
      const removeTags = text.replace(/<[^>]*>?/gm, '')
      const removeQuotes = removeTags.replace(/['"]+/g, '')
      const about = removeQuotes.replace(/\s+/g, ' ').trim()
      return about && points.push({ id: uuidv4(), about })
    })
    setInfo(points)
  }

  const updateInstructorHandler = () => {
    const points = info.map((item) => {
      return `<li>${item.about}</li>`
    })
    const about = `<ul class='instructor_info_7gt'> ${points.join(' ')} </ul>`
    const data = new FormData()
    data.append('about', about)
    image && data.append('avatar', image)
    data.append('role', role)
    dispatch(actions.instructor.updateInstructor(instructor._id, data))
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
    dispatch({ type: constants.instructor.INSTRUCTOR_UPDATE_RESET })
  }

  useEffect(() => {
    message &&
      setTimeout(() => {
        setIsEditing(false)
      }, 500)
  }, [message])

  useEffect(() => {
    instructor && extractInfo()
  }, [instructor])

  return (
    <>
      <SideAlert
        isOn={error ? true : false}
        text={error}
        type='danger'
        reset={() => clearAlert()}
      />
      <SideAlert
        isOn={message ? true : false}
        text={message}
        type='success'
        reset={() => clearAlert()}
      />
      <Modal show={isEditing} onHide={() => setIsEditing(false)}>
        <Modal.Header>
          <Modal.Title>
            <span style={{ marginRight: '1rem', color: 'cadetblue' }}>
              {' '}
              <Chalkboard />{' '}
            </span>
            Update Instructor Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && (
            <div className={style.instructors__overlay}>
              <Loader size='5' center options={{ animation: 'border' }} />
            </div>
          )}
          <Form className='p-3'>
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
                placeholder={instructor.role}
                value={role}
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
                <Row className='mb-3' key={point.id}>
                  <Col>
                    <Form.Control
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
            onClick={() => setIsEditing(false)}
          >
            Close
          </Button>
          <Button variant='success' size='lg' onClick={updateInstructorHandler}>
            Update Instructor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Instructor
