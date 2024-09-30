import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import strings from '../../localization'
import { Helmet } from 'react-helmet-async'

const VerifyEmail = () => {
  const [width, setWidth] = useState(0)
  const { loading, error, success } = useSelector((state) => state.verifyEmail)
  const { lang } = useSelector((state) => state.language)
  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const token = params.get('TOKEN')
  const history = useHistory()

  const clearAlert = () => {
    dispatch({ type: constants.client.VERIFY_EMAIL_RESET })
    dispatch(actions.client.verifyEmail({ type: 'activate', token }))
  }

  useEffect(() => {
    !success &&
      dispatch(actions.client.verifyEmail({ type: 'activate', token }))
    if (success) {
      const interval = setInterval(() => {
        setWidth((prev) => prev + 25)
      }, 1000)
      setTimeout(() => {
        clearInterval(interval)
        history.push('/login')
      }, 5000)
    }
  }, [token, history, success])
  return (
    <Template>
      <Helmet>
        <title>E-mail Verification</title>
        <meta
          name='description'
          content='verify your E-mail and start use your account'
        />
      </Helmet>
      <div className={style.verify}>
        <div className='container'>
          {loading ? (
            <Loader
              size='15'
              center
              custom={{ color: '#fff', marginTop: '5rem' }}
            />
          ) : error ? (
            <Alert
              style={{ textAlign: 'center' }}
              variant='danger'
              dismissible
              onClose={clearAlert}
            >
              {error}
            </Alert>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h1>{strings.client[lang].verify_email}</h1>
              <div className={style.verify__progress}>
                <span style={{ width: `${width}%` }}></span>
              </div>
              <h4>{strings.client[lang].main_page_redirect}</h4>
            </div>
          )}
        </div>
      </div>
    </Template>
  )
}

export default VerifyEmail
