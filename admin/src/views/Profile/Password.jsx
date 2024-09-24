import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Alert } from 'react-bootstrap'
import { Loader } from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const Password = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector(
    (state) => state.updateAdminPassword
  )

  const clearAlert = () => {
    setErrors(null)
    dispatch({ type: constants.admin.UPDATE_ADMIN_PASSWORD_RESET })
  }

  const updatePasswordHandler = (e) => {
    e.preventDefault()
    clearAlert()
    if (newPass !== confirmPass) {
      setErrors('New password and confirm password do not match')
      return
    }
    dispatch(actions.admin.updateAdminPassword({ oldPass, newPass }))
  }

  useEffect(() => {
    if (error) {
      setErrors(error)
    }
  }, [error])

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicError'>
        {loading ? (
          <Loader size='4' options={{ animation: 'border' }} />
        ) : errors ? (
          <Alert variant='danger' onClose={clearAlert} dismissible>
            {' '}
            {errors}{' '}
          </Alert>
        ) : (
          message && (
            <Alert variant='success' onClose={clearAlert} dismissible>
              {message}
            </Alert>
          )
        )}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicOld'>
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          onChange={(e) => setOldPass(e.target.value)}
          size='lg'
          type='password'
          placeholder='Enter your old password'
        />
      </Form.Group>
      <div className={style.profile__separator}></div>
      <Form.Group className='mb-3' controlId='formBasicNew'>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          onChange={(e) => setNewPass(e.target.value)}
          size='lg'
          type='password'
          placeholder='Enter your new password'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicConfirm'>
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          onChange={(e) => setConfirmPass(e.target.value)}
          size='lg'
          type='password'
          placeholder='confirm your new password'
        />
      </Form.Group>
      <Button variant='success' onClick={updatePasswordHandler}>
        {' '}
        Save{' '}
      </Button>
    </Form>
  )
}

export default Password
