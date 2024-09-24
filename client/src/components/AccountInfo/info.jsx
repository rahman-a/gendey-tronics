import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import Loader from '../Loader'
import Alert from 'react-bootstrap/Alert'
import { useSelector, useDispatch } from 'react-redux'
import constants from '../../constants'
import actions from '../../actions'

const Info = ({ lang, strings }) => {
  const [userInfo, setUserInfo] = useState({})
  const [shippingAddress, setShippingAddress] = useState({})
  const dispatch = useDispatch()
  const { info } = useSelector((state) => state.client)
  const { loading, error, message } = useSelector((state) => state.update)
  const getUserInfoHandler = (e) => {
    if (e.target.name === 'city' || e.target.name === 'country') {
      setShippingAddress({
        ...shippingAddress,
        [e.target.name]: e.target.value,
      })
    } else {
      const data = { [e.target.name]: e.target.value }
      setUserInfo({ ...userInfo, ...data })
    }
  }

  const clearAlerts = () => {
    dispatch({ type: constants.client.UPDATE_RESET })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    clearAlerts()
    dispatch(actions.client.update({ ...userInfo, shippingAddress }))
  }
  useEffect(() => {
    if (error || message) {
      window.scrollTo(0, 500)
    }
  }, [error, message])
  return (
    <form
      className={`${style.accountInfo__info}
        ${lang === 'ar' ? style.accountInfo__info_ar : ''}`}
      onSubmit={submitHandler}
    >
      <div className={style.accountInfo__info_group}>
        {error ? (
          <Alert
            dismissible
            onClose={clearAlerts}
            variant='danger'
            style={{ width: 'max-content' }}
          >
            {error}
          </Alert>
        ) : (
          message && (
            <Alert
              dismissible
              onClose={clearAlerts}
              variant='success'
              style={{ width: 'max-content' }}
            >
              {message}
            </Alert>
          )
        )}
        <h3>{strings.client[lang].basic_info}</h3>
        <div className='row'>
          <div className={style.accountInfo__info_input}>
            <label htmlFor='first_name'>
              {strings.client[lang].first_name}
            </label>
            <input
              type='text'
              name='firstName'
              defaultValue={info && info.firstName}
              id='first_name'
              placeholder={strings.client[lang].first_name_holder}
              onChange={(e) => getUserInfoHandler(e)}
            />
          </div>
          <div className={style.accountInfo__info_input}>
            <label htmlFor='last_name'>{strings.client[lang].last_name}</label>
            <input
              type='text'
              name='lastName'
              defaultValue={info && info.lastName}
              id='last_name'
              placeholder={strings.client[lang].last_name_holder}
              onChange={(e) => getUserInfoHandler(e)}
            />
          </div>
        </div>
      </div>
      {/* <div className={style.accountInfo__info_group}>
                <h3>Address</h3>
                <div className="row">
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="city">City</label>
                        <input 
                        type="text" 
                        name="city"
                        defaultValue={info && info.shippingAddress?.city}  
                        id="city"
                        placeholder='Write The City Name'  
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                    <div className={style.accountInfo__info_input}>
                        <label htmlFor="country">Country</label>
                        <input 
                        type="text"
                        name="country"
                        defaultValue={info && info.shippingAddress?.country} 
                        id="country"
                        placeholder='Write The Country Name' 
                        onChange={(e) => getUserInfoHandler(e)}/>
                    </div>
                </div>
            </div> */}
      <div className={style.accountInfo__info_group}>
        <h3>{strings.client[lang].contact_info}</h3>
        <div className='row'>
          <div className={style.accountInfo__info_input}>
            <label htmlFor='mobile'>{strings.client[lang].mobile}</label>
            <input
              type='text'
              name='phoneNumber'
              defaultValue={info && info.phoneNumber}
              id='mobile'
              placeholder={strings.client[lang].mobile_holder}
              onChange={(e) => getUserInfoHandler(e)}
            />
          </div>
          <div className={style.accountInfo__info_input}>
            <label htmlFor='email'>{strings.client[lang].email}</label>
            <input
              type='email'
              name='email'
              defaultValue={info && info.email}
              id='email'
              placeholder={strings.client[lang].email_holder}
              onChange={(e) => getUserInfoHandler(e)}
            />
          </div>
        </div>
      </div>
      <div className={style.accountInfo__info_group}>
        <div
          className={style.accountInfo__info_input}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <input
            type='submit'
            value={strings.client[lang].save}
            disabled={loading ? true : false}
            style={{ pointerEvents: loading ? 'none' : 'visible' }}
          />
          {loading && <Loader size='4.5' />}
        </div>
      </div>
    </form>
  )
}

export default Info
