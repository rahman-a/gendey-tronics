import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { Loader, SideAlert } from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const UpdateVideo = ({ isUpdateVideo, setIsUpdateVideo, video }) => {
  const [data, setData] = useState({
    title: video.title,
    path: video.path,
  })
  const [isError, setIsError] = useState(null)
  const dispatch = useDispatch()
  const { isLoading, error, message } = useSelector(
    (state) => state.updateMedia
  )

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'thumbnail') {
      setData({ ...data, [name]: files[0] })
      return
    }
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('url', data.path)
    data.thumbnail && formData.append('media', data.thumbnail)
    formData.append('type', 'video')
    dispatch(actions.media.updateMedia(video._id, formData))
  }

  const clearAlert = () => {
    dispatch({ type: constants.media.UPDATE_MEDIA_RESET })
    setIsError(null)
  }

  useEffect(() => {
    message && setIsUpdateVideo(false)
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
      <Modal show={isUpdateVideo} onHide={() => setIsUpdateVideo(false)}>
        <Modal.Header>
          <Modal.Title>Update Video Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.videos__new}>
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
                  placeholder={video.title}
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Video URL */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Video URL </InputGroup.Text>
                <Form.Control
                  name='path'
                  placeholder={video.path}
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
          <Button variant='secondary' onClick={() => setIsUpdateVideo(false)}>
            Close
          </Button>
          <Button variant='success' onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateVideo
