import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import { PhoneAlt, Schedule } from '../../components/icons'
import { Modal } from '../../components/Modal'
import Contact from '../../views/Product/contant'
import Call from '../../views/Product/call'
import PhoneNumber from '../../views/Product/phoneNumber'
import Calender from '../../components/Calender'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../actions'
import { useLocation, useHistory } from 'react-router-dom'
import strings from '../../localization'
import Map from './Map'
import { Helmet } from 'react-helmet-async'

const ContactPage = () => {
  const [toggle, setToggle] = useState(false)
  const [contactType, setContactType] = useState('calender')
  const [actionType, setActionType] = useState('')
  const [contactDetails, setContactDetails] = useState({})
  const [callDate, setCallDate] = useState('')
  const [callMethod, setCallMethod] = useState('')
  const [callPhone, setCallPhone] = useState('')
  const path = useLocation().pathname
  const history = useHistory()
  const dispatch = useDispatch()
  const { isAuth, info } = useSelector((state) => state.client)
  const { lang } = useSelector((state) => state.language)
  const { loading, error, message } = useSelector((state) => state.newContact)
  const {
    loading: call_loading,
    error: call_error,
    message: call_message,
  } = useSelector((state) => state.bookCall)

  const setActionTypeHandler = (action) => {
    setToggle(true)
    setActionType(action)
  }

  const activateBookingHandler = () => {
    if (!isAuth) {
      history.push(`/login?redirect=${path}`)
      return
    }
    setActionTypeHandler('contact')
  }

  const BookCallHandler = () => {
    const bookingInfo = {
      date: callDate,
      method: callMethod,
      phone: callPhone,
    }
    if (info) {
      bookingInfo.user = info._id
    }
    dispatch(actions.products.bookCall(bookingInfo))
    setContactType('done')
  }

  const captureFormDetailsHandler = (e) => {
    const value = { [e.target.name]: e.target.value }
    setContactDetails({ ...contactDetails, ...value })
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    dispatch(actions.contact.newContact(contactDetails))
  }

  useEffect(() => {
    if (info) {
      setContactDetails({ ...contactDetails, user: info._id })
    }
  }, [info])
  return (
    <Template>
      <Helmet>
        <title>Contact us</title>
        <meta
          name='description'
          content="We're here to answer your questions"
        />
      </Helmet>
      <Modal
        toggle={toggle}
        closeHandler={() => setToggle(false)}
        styling={{ boxShadow: '-1px 1px 11px 0px rgb(0 0 0 / 50%)' }}
      >
        {actionType === 'call' ? (
          <Call />
        ) : (
          actionType === 'contact' && (
            <>
              {contactType === 'option' ? (
                <Contact
                  setContactType={setContactType}
                  setCallMethod={setCallMethod}
                  callMethod={callMethod}
                  lang={lang}
                />
              ) : contactType === 'phone' ? (
                <PhoneNumber
                  setContactType={setContactType}
                  setCallPhone={setCallPhone}
                  callPhone={callPhone}
                  BookCallHandler={BookCallHandler}
                  lang={lang}
                />
              ) : contactType === 'calender' ? (
                <Calender
                  setContactType={setContactType}
                  setCallDate={setCallDate}
                  lang={lang}
                />
              ) : (
                contactType === 'done' && (
                  <div className={style.contact__done}>
                    {call_loading ? (
                      <Loader size='15' center />
                    ) : call_error ? (
                      <Message
                        type='error'
                        size='3'
                        center
                        message={call_error}
                      />
                    ) : (
                      call_message && <span>{strings.contact[lang].done}</span>
                    )}
                  </div>
                )
              )}
            </>
          )
        )}
      </Modal>
      <div
        className={style.contact__overlay}
        style={{ transform: toggle ? 'scale(1)' : 'scale(0)' }}
      ></div>
      <div className={style.contact}>
        <div className='container'>
          <div className={style.contact__wrapper}>
            <div className={style.contact__map}>
              <div
                className={`
                                ${style.contact__map_wrapper}
                                ${
                                  lang === 'ar'
                                    ? style.contact__map_wrapper_ar
                                    : ''
                                }
                            `}
              >
                {/* <img src="images/map.png" alt="map" /> */}
                <Map />
              </div>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.google.com/maps/place/elgendy+autotronics+center/@30.0119032,31.2026221,17z/data=!3m1!4b1!4m5!3m4!1s0x1458471af66be909:0x44ad4252caae1158!8m2!3d30.0119031!4d31.2048034'
              >
                {strings.contact[lang].location}
              </a>
            </div>
            <form onSubmit={submitFormHandler}>
              <h3>{strings.contact[lang].send}</h3>
              <input
                type='text'
                name='name'
                placeholder={strings.contact[lang].name}
                onChange={(e) => captureFormDetailsHandler(e)}
                required
              />
              <input
                type='text'
                name='phone'
                placeholder={strings.contact[lang].phone}
                onChange={(e) => captureFormDetailsHandler(e)}
                required
              />
              <input
                type='email'
                name='email'
                placeholder={strings.contact[lang].email}
                onChange={(e) => captureFormDetailsHandler(e)}
                required
              />
              <textarea
                name='message'
                placeholder={strings.contact[lang].message}
                cols='30'
                rows='10'
                onChange={(e) => captureFormDetailsHandler(e)}
                required
              ></textarea>
              <button
                type='submit'
                style={{ position: 'relative', padding: loading && '1rem' }}
              >
                {loading ? (
                  <Loader size='4' center />
                ) : (
                  strings.contact[lang].submit
                )}
              </button>
              {(message || error) && (
                <Message
                  type={message ? 'success' : error && 'error'}
                  size='2'
                  message={message || error}
                  custom={{ marginTop: '1rem' }}
                />
              )}
            </form>
          </div>
          <div
            className={`
                        ${style.contact__cta}
                        ${lang === 'ar' ? style.contact__cta_ar : ''}
                    `}
          >
            <button
              className={style.product__cta_gray}
              onClick={() => setActionTypeHandler('call')}
            >
              <PhoneAlt /> {strings.contact[lang].call}
            </button>
            <button
              className={style.product__cta_yellow}
              onClick={activateBookingHandler}
            >
              <Schedule /> {strings.contact[lang].book}
            </button>
            <p> {strings.contact[lang].contact_message} </p>
          </div>
        </div>
      </div>
    </Template>
  )
}

export default ContactPage
