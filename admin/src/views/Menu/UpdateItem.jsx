import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { Loader, SideAlert } from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const CreateItem = ({ isUpdateItem, setIsUpdateItem, item }) => {
  const [data, setData] = useState({
    arabicTitle: item.title.ar,
    englishTitle: item.title.en,
    order: item.order,
    parent: item.parent,
  })
  const [isError, setIsError] = useState(null)
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  const { isLoading, message } = useSelector((state) => state.updateItem)

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const isFormValid = () => {
    const { arabicTitle, englishTitle, order } = data
    if (!englishTitle) {
      setIsError('Please Write The English Title For Item')
      return false
    }
    if (!arabicTitle) {
      setIsError('Please Write The Arabic Title For Item')
      return false
    }
    if (!order) {
      setIsError('Please Define order for the item')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      const title = {
        ar: data.arabicTitle,
        en: data.englishTitle,
      }
      const info = { title: JSON.stringify(title), order: data.order }
      if (data.parent) {
        info.parent = data.parent
      }
      if (image) {
        info.image = image
      }
      dispatch(actions.menu.updateItem(info, item._id, item.parent))
    }
  }

  const clearAlert = () => {
    dispatch({ type: constants.menu.UPDATE_MENU_ITEM_RESET })
    setIsError(null)
  }

  useEffect(() => {
    message && setIsUpdateItem(false)
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
      <Modal show={isUpdateItem} onHide={() => setIsUpdateItem(false)}>
        <Modal.Header>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.menu__slider}>
            {isLoading && (
              <div className={style.menu__overlay}>
                <Loader size='5' center options={{ animation: 'border' }} />
              </div>
            )}
            <Form>
              {/* Item English Title */}
              <InputGroup className='mb-3'>
                <InputGroup.Text> English Title </InputGroup.Text>
                <Form.Control
                  name='englishTitle'
                  placeholder={item.title.en}
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Item Arabic Title */}
              <InputGroup className='mb-3'>
                <InputGroup.Text>Arabic Title </InputGroup.Text>
                <Form.Control
                  name='arabicTitle'
                  placeholder={item.title.ar}
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              {/* Item Header Image */}
              <InputGroup className='mb-3'>
                <Form.Control
                  name='image'
                  type='file'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </InputGroup>

              {/* Item Order */}
              <InputGroup className='mb-3'>
                <InputGroup.Text>Item Order </InputGroup.Text>
                <Form.Control
                  type='number'
                  name='order'
                  placeholder={item.order}
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>

              <InputGroup>
                <InputGroup.Text>Item Parent </InputGroup.Text>
                <Form.Control
                  name='parent'
                  placeholder={item.parent && item.parent}
                  onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setIsUpdateItem(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateItem
