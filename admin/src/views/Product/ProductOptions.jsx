import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Minus, Check, FilterSearch } from '../../icons'
import constants from '../../constants'
import actions from '../../actions'
import { Loader, SideAlert } from '../../components'

const ProductOptions = ({ data }) => {
  const [addOption, setAddOption] = useState(null)
  const [newOption, setNewOption] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [questionSet, isQuestionSet] = useState(null)
  const [addNewOption, setAddNewOption] = useState(false)
  const [question, setQuestion] = useState('')
  const [elements, setElements] = useState([{ id: uuidv4(), element: '' }])

  const dispatch = useDispatch()
  const { loading, error, message } = useSelector((state) => state.editProduct)

  const initiateAddNewOption = (id) => {
    !addOption && setAddOption(id)
  }

  const updateQuestionHandler = (e, id) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (newQuestion) {
        isQuestionSet(id)

        const updatedData = { ...data }

        updatedData.options.forEach((option) => {
          if (option._id === id) {
            option.question = newQuestion
          }
        })

        dispatch({
          type: constants.products.GET_PRODUCT_SUCCESS,
          payload: updatedData,
        })
        setNewQuestion('')

        setTimeout(() => {
          isQuestionSet(null)
        }, 500)
      }
    }
  }

  const addNewOptionHandler = (e, id) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (newOption) {
        const updatedData = { ...data }

        updatedData.options.forEach((option) => {
          if (option._id === id) {
            option.elements = option.elements.concat(newOption)
          }
        })

        dispatch({
          type: constants.products.GET_PRODUCT_SUCCESS,
          payload: updatedData,
        })
        setNewOption('')
      }

      setAddOption(null)
    }
  }

  const deleteOptionHandler = (id, text) => {
    const updatedData = { ...data }

    updatedData.options.forEach((option) => {
      if (option._id === id) {
        const elements = option.elements.filter((element) => element !== text)
        option.elements = elements
      }
    })

    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: updatedData,
    })
  }

  const deleteEntireQuestionHandler = (id) => {
    let updatedData = { ...data }

    const updatedOptions = data.options.filter((option) => option._id !== id)

    updatedData.options = updatedOptions

    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: updatedData,
    })
  }

  const updateOptionsHandler = (_) => {
    const options = data.options
    dispatch(actions.products.updateProduct(data._id, { options }))
  }

  const setNewOptionElement = (e, id) => {
    const value = e.target.value
    const newElements = elements.map((element) => {
      if (element.id === id) {
        element.element = value
      }
      return element
    })

    setElements(newElements)
  }

  const addRemoveOptionInputHandler = (type, id) => {
    if (type === 'add') {
      const newElement = { id: uuidv4(), element: '' }
      setElements([...elements, newElement])
    } else if (type === 'remove') {
      const newElements = elements.filter((element) => element.id !== id)
      setElements(newElements)
    }
  }

  const addNewProductOptionHandler = (_) => {
    const newElements = elements.map((element) => element.element)

    const newOption = {
      question,
      elements: newElements,
    }

    let updatedData = { ...data }

    updatedData.options = [...updatedData.options, newOption]

    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: updatedData,
    })

    setAddNewOption(false)
  }

  return (
    <div className={style.product__options}>
      <SideAlert
        type='danger'
        position='left'
        isOn={error ? true : false}
        text={error}
      />

      <SideAlert
        type='success'
        position='left'
        isOn={message ? true : false}
        text={message}
      />

      <Modal show={addNewOption} onHide={() => setAddNewOption(false)}>
        <Modal.Header>
          <p>
            <FilterSearch /> &nbsp; New Option
          </p>
        </Modal.Header>

        <Modal.Body>
          <div className={style.product__options}>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicShort'>
                <Form.Label>New Option Question</Form.Label>
                <Form.Control
                  type='text'
                  name='question'
                  placeholder='Add New Question'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Form.Group>
              {elements.map((element, idx) => (
                <div key={element.id}>
                  <Form.Group className='mb-3' controlId={element.id}>
                    <Form.Label>Add Choice</Form.Label>
                    <Form.Control
                      type='text'
                      name='element'
                      placeholder='Add New Option'
                      value={elements[idx].element || ''}
                      onChange={(e) => setNewOptionElement(e, element.id)}
                    />
                  </Form.Group>
                  {idx === elements.length - 1 && (
                    <div className={style.product__options_actions}>
                      <span onClick={() => addRemoveOptionInputHandler('add')}>
                        <Plus />
                      </span>
                      <span
                        onClick={() =>
                          addRemoveOptionInputHandler('remove', element.id)
                        }
                      >
                        <Minus />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='success'
            size='lg'
            onClick={addNewProductOptionHandler}
          >
            ADD NEW OPTIONS
          </Button>

          <Button
            variant='danger'
            size='lg'
            onClick={() => setAddNewOption(false)}
          >
            CLOSE WINDOW
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>
        Product Options
        <span onClick={() => setAddNewOption(true)}>
          {' '}
          <Plus />{' '}
        </span>
      </h2>
      <div className={style.product__options_separator}></div>

      <div className={style.product__options_content}>
        {data &&
          data.options.map((option, idx) => (
            <div className={style.product__options_question} key={option._id}>
              <h4 className={style.product__options_header}>
                Option {idx + 1}
                <span onClick={() => deleteEntireQuestionHandler(option._id)}>
                  {' '}
                  x{' '}
                </span>
              </h4>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type='text'
                  placeholder={`${option.question} => click enter after you type new value`}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => updateQuestionHandler(e, option._id)}
                  style={{ fontSize: '1.2rem' }}
                />

                {questionSet === option._id && (
                  <span style={{ marginLeft: '1rem' }}>
                    <Check />
                  </span>
                )}
              </div>

              <ul className={style.product__options_list}>
                {option.elements.map((element) => (
                  <li key={uuidv4()}>
                    <span> {element} </span>
                    <span
                      onClick={() => deleteOptionHandler(option._id, element)}
                    >
                      x
                    </span>
                  </li>
                ))}

                <li>
                  {addOption === option._id ? (
                    <input
                      type='text'
                      name='option-1'
                      placeholder='click enter to add...'
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyDown={(e) => addNewOptionHandler(e, option._id)}
                    />
                  ) : (
                    <span
                      style={{ color: '#2b8b00', backgroundColor: '#f5f5f5' }}
                      onClick={() => initiateAddNewOption(option._id)}
                    >
                      <Plus />
                    </span>
                  )}
                </li>
              </ul>
              <div className={style.product__options_separator}></div>
            </div>
          ))}
        <div className={style.product__submit}>
          <Button variant='warning' size='lg' onClick={updateOptionsHandler}>
            update options
          </Button>
          {loading && <Loader size='4' options={{ animation: 'border' }} />}
        </div>
      </div>
    </div>
  )
}

export default ProductOptions
