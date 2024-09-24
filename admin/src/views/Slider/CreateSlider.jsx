import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { Loader, SideAlert } from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const CreateSlider = ({ isCreateSlide, setIsCreateSlide }) => {
  const [data, setData] = useState({})
  const [target, setTarget] = useState({})
  const [isError, setIsError] = useState(null)
  const dispatch = useDispatch()
  const { loading, message, error } = useSelector((state) => state.createSlider)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'slider') {
      setData({ ...data, [name]: files[0] })
      return
    }
    setData({ ...data, [name]: value })
  }

  const handleTargetInputChange = (e) => {
    const { name, value } = e.target
    setTarget({ ...target, [name]: value })
  }

  const isFormValid = () => {
    const { headerEn, headerAr, subHeaderEn, subHeaderAr, slider } = data
    const { itemId, type } = target
    // if (!headerEn) {
    //   setIsError('Please Write English Header For Slider')
    //   return false
    // }
    // if (!headerAr) {
    //   setIsError('Please Write Arabic Header For Slider')
    //   return false
    // }
    // if (!subHeaderEn) {
    //   setIsError('Please Write English Sub Header For Slider')
    //   return false
    // }
    // if (!subHeaderAr) {
    //   setIsError('Please Write Arabic Sub Header For Slider')
    //   return false
    // }
    if (!slider) {
      setIsError('Please Select Slider Image')
      return false
    }
    if (!itemId) {
      setIsError('Please Define Asset Id For Slider')
      return false
    }
    if (!type) {
      setIsError('Please Define Type of the Asset')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      const formData = new FormData()
      formData.append(
        'header',
        JSON.stringify({ ar: data.headerAr, en: data.headerEn })
      )
      formData.append(
        'subHeader',
        JSON.stringify({ ar: data.subHeaderAr, en: data.subHeaderEn })
      )
      formData.append('slider', data.slider)
      formData.append('target', JSON.stringify(target))
      dispatch(actions.admin.createSlider(formData))
    }
  }

  const clearAlert = () => {
    dispatch({ type: constants.admin.CREATE_SLIDER_RESET })
    setIsError(null)
  }

  useEffect(() => {
    error && setIsError(error)
  }, [error])

  useEffect(() => {
    message && setIsCreateSlide(false)
  }, [message])

  return (
    <>
      <SideAlert
        isOn={isError ? true : false}
        text={isError}
        type='danger'
        time={5000}
        reset={() => clearAlert()}
      />
      <Modal show={isCreateSlide} onHide={() => setIsCreateSlide(false)}>
        <Modal.Header>
          <Modal.Title>Create Slider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`${style.sliders__slider} font-size-input font-size-span`}
          >
            {loading && (
              <div className={style.sliders__overlay}>
                <Loader size='5' center options={{ animation: 'border' }} />
              </div>
            )}
            <Form>
              {/* Slider Header English */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Header English </InputGroup.Text>
                <Form.Control
                  name='headerEn'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Slider Header Arabic */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Header Arabic </InputGroup.Text>
                <Form.Control
                  name='headerAr'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Slider Sub Header English*/}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Sub Header English </InputGroup.Text>
                <Form.Control
                  name='subHeaderEn'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Slider Sub Header Arabic */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> Sub Header Arabic </InputGroup.Text>
                <Form.Control
                  name='subHeaderAr'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Slider Image */}
              <InputGroup>
                <InputGroup.Text> Slider Image </InputGroup.Text>
                <Form.Control
                  type='file'
                  name='slider'
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>
              <Form.Text className='d-block text-muted fs-5 mb-3'>
                max size 10MB
              </Form.Text>

              {/* Slider Link to => */}
              <div className={style.sliders__target}>
                <InputGroup className='mb-3' style={{ marginRight: '2rem' }}>
                  <InputGroup.Text> Link to &#x021AA; </InputGroup.Text>
                  <Form.Control
                    name='itemId'
                    onChange={(e) => handleTargetInputChange(e)}
                    placeholder='type id of product, course or blog'
                  />
                </InputGroup>
                <InputGroup className='mb-3' style={{ flexShrink: '2' }}>
                  <InputGroup.Text> type </InputGroup.Text>
                  <Form.Select
                    name='type'
                    onChange={(e) => handleTargetInputChange(e)}
                  >
                    <option value=''>........</option>
                    <option value='product'>product</option>
                    <option value='course'>course</option>
                    <option value='blog'>blog</option>
                  </Form.Select>
                </InputGroup>
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size='lg'
            variant='secondary'
            onClick={() => setIsCreateSlide(false)}
          >
            Close
          </Button>
          <Button size='lg' variant='success' onClick={handleSubmit}>
            create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateSlider
