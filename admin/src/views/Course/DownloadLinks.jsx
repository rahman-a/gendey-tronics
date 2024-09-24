import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../../components'
import actions from '../../actions'
import { Trash } from '../../icons'

const DownloadLinks = ({ id, links, name }) => {
  const [link, setLink] = useState(null)
  const [part, setPart] = useState(null)
  const [errors, setErrors] = useState(null)
  const { loading, error, message } = useSelector((state) => state.updateCourse)
  const dispatch = useDispatch()

  const addDownloadLink = (_) => {
    if (!link) {
      setErrors('Please Provide Link to add it')
      return
    }
    if (!part) {
      setErrors('Please Provide File Part')
      return
    }
    const data = { link: { link, part: parseInt(part) } }
    dispatch(actions.courses.updateCourse(id, data))
  }

  const deleteLink = (linkId) => {
    dispatch(actions.courses.deleteLink(id, linkId))
  }

  useEffect(() => {
    error && setErrors(error)
  }, [error])
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        {links &&
          links.map((link) => (
            <div
              style={{
                display: 'flex',
                justifyItems: 'space-between',
                marginTop: '1rem',
              }}
            >
              <p
                style={{
                  marginRight: 'auto',
                  color: '#938d8d',
                  fontSize: '1.4rem',
                }}
              >
                {`${name} part-${link.part}`}
              </p>
              <Button variant='danger' onClick={() => deleteLink(link._id)}>
                <span>
                  {' '}
                  <Trash />{' '}
                </span>
              </Button>
            </div>
          ))}
      </div>
      <Row>
        <InputGroup className='mb-3' as={Col}>
          <InputGroup.Text> Download Link </InputGroup.Text>
          <Form.Control onChange={({ target: { value } }) => setLink(value)} />
        </InputGroup>

        <InputGroup className='mb-3' as={Col}>
          <InputGroup.Text> Part </InputGroup.Text>
          <Form.Control
            type='number'
            onChange={({ target: { value } }) => setPart(value)}
          />
        </InputGroup>

        {loading && <Loader size='4' options={{ animation: 'border' }} />}

        <Button variant='success' onClick={addDownloadLink}>
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
    </>
  )
}

export default DownloadLinks
