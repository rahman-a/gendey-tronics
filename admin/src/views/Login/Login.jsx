import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { Lock, AtSymbol } from '../../icons'
import { Loader } from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const navigate = useHistory().push
  const dispatch = useDispatch()
  const { loading, error, isAuth } = useSelector((state) => state.login)

  const loginHandler = (_) => {
    if (!email) {
      setErrors('Please Provide E-mail Address')
      return
    }

    if (!password) {
      setErrors('Please Provide Password')
      return
    }

    dispatch(actions.admin.login({ email, password }))
  }

  const loginOnKeyDown = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      loginHandler()
    }
  }

  const clearAlert = (_) => {
    dispatch({ type: constants.admin.ADMIN_LOGIN_RESET })
    setErrors(null)
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/')
      console.log('Navigate to Main page')
    }
  }, [isAuth, navigate])

  useEffect(() => {
    error && setErrors(error)
  }, [error])

  return (
    <div className={style.login}>
      <div className={style.login__logo}>
        <img src='/images/gendy_logo_white.png' alt='logo' />
      </div>
      <div className={style.login__wrapper}>
        <div className={style.login__Form} onKeyDown={loginOnKeyDown}>
          {errors && (
            <Alert variant='danger' onClose={clearAlert} dismissible>
              {errors}
            </Alert>
          )}

          <div className={style.login__group}>
            <span>
              <AtSymbol />
            </span>
            <input
              type='email'
              name='email'
              placeholder='Enter Your E-mail'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.login__group}>
            <span>
              <Lock />
            </span>
            <input
              type='password'
              placeholder='Enter Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={style.login__submit}
            onClick={loginHandler}
            disabled={loading}
          >
            {loading ? (
              <Loader size='4' options={{ animation: 'border' }} />
            ) : (
              'login'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
