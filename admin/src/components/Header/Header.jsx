import React, { useState, useRef, useEffect } from 'react'
import style from './style.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../actions'
import {
  HandDollar,
  MenuBars,
  Envelope,
  Headset,
  BrowserWebsite,
  Logout,
  User,
} from '../../icons'
import { SideNavbar, NotificationContainer } from '../../components'
import { API_URL, CLIENT_WEBSITE } from '../../constants'

const Header = () => {
  const [showSideMenu, setSideMenu] = useState(false)
  const [toggleNotification, setToggleNotification] = useState(false)
  const [toggleMessages, setToggleMessages] = useState(false)
  const [logoutDisplay, setLogoutDisplay] = useState('none')
  const headerBgRef = useRef(null)
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.login)
  const { count, calls } = useSelector((state) => state.latestCalls)
  const { count: contact_count, contacts } = useSelector(
    (state) => state.latestContacts
  )
  const { isLogout } = useSelector((state) => state.logout)
  const { loading, image } = useSelector((state) => state.getAdminAvatar)
  const navigate = useHistory().push
  const page = useLocation().pathname

  const toggleLogoutDisplay = (_) => {
    if (logoutDisplay === 'none') {
      setLogoutDisplay('flex')
    } else {
      setLogoutDisplay('none')
    }
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(actions.admin.logout())
  }

  const toggleNotifyData = (type) => {
    if (type === 'Calls') {
      setToggleMessages(false)
      setToggleNotification((prev) => !prev)
    } else {
      setToggleNotification(false)
      setToggleMessages((prev) => !prev)
    }
  }

  const toggleSideMenuHandler = (e) => {
    e.stopPropagation()
    if (!showSideMenu) {
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
      setSideMenu(true)
    } else {
      document.body.style.height = 'unset'
      document.body.style.overflow = 'unset'
      setSideMenu(false)
    }
  }

  window.addEventListener('click', () => {
    setSideMenu(false)
    document.body.style.height = 'unset'
    document.body.style.overflow = 'unset'
  })

  useEffect(() => {
    if (isAuth) {
      dispatch(actions.calls.latestCalls())
      dispatch(actions.contacts.latestContacts())
    }
  }, [isAuth])

  useEffect(() => {
    if (isLogout) {
      setSideMenu(false)
      navigate('/login')
    }
  }, [isLogout])

  return (
    <>
      <div
        className={style.header__bg}
        ref={headerBgRef}
        style={{ display: showSideMenu ? 'block' : 'none' }}
      ></div>

      <div
        className={style.header}
        style={{
          display: page === '/login' ? 'none' : 'block',
        }}
      >
        <div className='container'>
          <div className={style.header__wrapper}>
            {/* display the main icon */}
            <div className={style.header__icon}>
              {isAuth && (
                <span
                  className={style.header__bars}
                  onClick={toggleSideMenuHandler}
                >
                  <MenuBars />
                </span>
              )}
              <span onClick={() => navigate('/')}>
                <img src='/images/gendy_logo_white.png' alt='logo' />
              </span>
            </div>

            {/* display the actions buttons */}
            <div className={style.header__actions}>
              {/* display the messages and notifications   */}
              <div className={style.header__notify}>
                <div className={style.header__notify_list}></div>
                {/* <span>
                                    <span className={style.header__notify_num}>10</span>
                                    <AtSymbol/>
                                </span> */}
                <span onClick={() => toggleNotifyData('Calls')}>
                  {count > 0 && (
                    <span className={style.header__notify_num}>{count}</span>
                  )}
                  <Headset />
                </span>
                <span onClick={() => toggleNotifyData('messages')}>
                  {contact_count > 0 && (
                    <span className={style.header__notify_num}>
                      {contact_count}
                    </span>
                  )}
                  <Envelope />
                </span>
                <span
                  style={{ bottom: '5px' }}
                  className={style.header__logout}
                  onClick={toggleLogoutDisplay}
                >
                  {image ? (
                    <img
                      src={`${API_URL}/images/${image}`}
                      alt='personal avatar'
                    />
                  ) : (
                    <img
                      style={{
                        width: '3rem',
                        height: '3rem',
                        transform: 'translateY(5px)',
                      }}
                      src='/images/user-avatar.svg'
                      alt='personal avatar'
                    />
                  )}
                  <div style={{ display: logoutDisplay }}>
                    <span onClick={() => navigate('/profile#info')}>
                      Profile <User />
                    </span>
                    <a
                      href={`${CLIENT_WEBSITE}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Website <BrowserWebsite />
                    </a>
                    <span onClick={logoutHandler}>
                      Logout <Logout />
                    </span>
                  </div>
                </span>

                {/* Notification List */}
                {toggleNotification && (
                  <NotificationContainer
                    setToggleNotification={setToggleNotification}
                    setToggleMessages={setToggleMessages}
                    title='Calls'
                    data={calls}
                  />
                )}

                {/* Messages List */}
                {toggleMessages && (
                  <NotificationContainer
                    setToggleNotification={setToggleNotification}
                    setToggleMessages={setToggleMessages}
                    title='Contacts'
                    data={contacts}
                  />
                )}
              </div>
            </div>
          </div>
          {/* display side menu */}
          {isAuth && (
            <SideNavbar showSideMenu={showSideMenu} setSideMenu={setSideMenu} />
          )}
        </div>
      </div>
    </>
  )
}

export default Header
