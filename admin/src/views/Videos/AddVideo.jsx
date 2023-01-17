import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { Loader, SideAlert } from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const AddVideo = ({ isAddVideo, setIsAddVideo }) => {
  const [data, setData] = useState({})
  const [isError, setIsError] = useState(null)
  const dispatch = useDispatch()
  const { isLoading, error, message } = useSelector(
    (state) => state.createMedia
  )

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'thumbnail') {
      setData({ ...data, [name]: files[0] })
      return
    }
    setData({ ...data, [name]: value })
  }

  const isFormValid = () => {
    const { title, url, thumbnail } = data
    if (!title) {
      setIsError('Please Write Title For Video')
      return false
    }
    if (!url) {
      setIsError('Please Write The Url For Video')
      return false
    }
    if (!thumbnail) {
      setIsError('Please Select Thumbnail For Video')
      return false
    }

    if (thumbnail.size > 500000) {
      setIsError('Thumbnail size is too large')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('url', data.url)
      formData.append('length', data.length)
      formData.append('media', data.thumbnail)
      formData.append('type', 'video')
      dispatch(actions.media.createMedia(formData))
    }
  }

  const clearAlert = () => {
    dispatch({ type: constants.media.CREATE_MEDIA_RESET })
    setIsError(null)
  }

  useEffect(() => {
    message && setIsAddVideo(false)
  }, [message])

  useEffect(() => {
    error && setIsError(error)
  }, [error])

  return (
    <>
      <SideAlert
        isOn={isError ? true : false}
        text={isError}
        type='danger'
        time={5000}
        reset={() => clearAlert()}
      />
      <Modal show={isAddVideo} onHide={() => setIsAddVideo(false)}>
        <Modal.Header>
          <Modal.Title>Add New Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`${style.videos__new} font-size-input font-size-span`}
          >
            {isLoading && (
              <div className={style.videos__overlay}>
                <Loader size='5' center options={{ animation: 'border' }} />
              </div>
            )}
            <Form>
              {/* Video Title */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Video Title </InputGroup.Text>
                <Form.Control
                  name='title'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Video URL */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Video URL </InputGroup.Text>
                <Form.Control
                  name='url'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Video Thumbnail */}
              <InputGroup>
                <InputGroup.Text> Video Thumbnail </InputGroup.Text>
                <Form.Control
                  type='file'
                  name='thumbnail'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>
              <Form.Text className='d-block text-muted fs-5 mb-3'>
                max size 500KB - recommended size: 200x200
              </Form.Text>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size='lg'
            variant='secondary'
            onClick={() => setIsAddVideo(false)}
          >
            Close
          </Button>
          <Button size='lg' variant='success' onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddVideo
