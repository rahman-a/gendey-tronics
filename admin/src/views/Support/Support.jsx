import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import actions from '../../actions'
import { Search, EnvelopOpen, Inbox, Envelope } from '../../icons'
import { HeaderAlert } from '../../components'
import Sidebar from './Sidebar'
import Message from './Message'
import Content from './Content'
import Send from './Send'
import { FallbackLoading } from './FallbackLoading'
import { Spinner } from 'react-bootstrap'

const Support = () => {
  const [isNewEmail, setIsNewEmail] = useState(false)
  const [isReplay, setIsReplay] = useState(null)
  const { isLoading, error, inbox, emails } = useSelector(
    (state) => state.listEmails
  )
  const {
    isLoading: isLoadingEmail,
    error: errorEmail,
    email,
  } = useSelector((state) => state.getEmail)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useHistory().push
  const query = useLocation().search

  const updateEmail = (_) => {
    email &&
      !email.isRead &&
      dispatch(actions.support.updateEmail(email._id, { isRead: true }))
  }

  const searchHandler = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      const value = e.target.value
      if (value) {
        if (query) {
          const queryParams = new URLSearchParams(query)
          const isKeyword = queryParams.has('keyword')

          isKeyword
            ? queryParams.set('keyword', value)
            : queryParams.append('keyword', value)

          navigate(`/support?${queryParams.toString()}`)
          return
        }

        navigate(`/support?keyword=${value}`)
        return
      }

      navigate('/support')
      dispatch(actions.support.listEmails())
    }
  }

  useEffect(() => {
    dispatch(actions.support.listEmails())
  }, [])

  useEffect(() => {
    query
      ? dispatch(actions.support.listEmails(query))
      : dispatch(actions.support.listEmails())
  }, [query])

  useEffect(() => {
    email && updateEmail()
  }, [email])

  useEffect(() => {
    id && dispatch(actions.support.getEmail(id))
  }, [id])

  return (
    <div className={style.support}>
      <Send
        isNewEmail={isNewEmail}
        setIsNewEmail={setIsNewEmail}
        isReplay={isReplay}
        setIsReplay={setIsReplay}
      />
      {/* Sidebar */}
      <div className={style.support__actions}>
        <div className={style.support__actions_new}>
          <span onClick={() => setIsNewEmail(true)}>
            {' '}
            <EnvelopOpen />{' '}
          </span>
        </div>
        <Sidebar inbox={inbox} />
      </div>

      {/* MESSAGES COMPONENTS */}
      <div className={style.support__messages}>
        <div className={style.support__messages_search}>
          <span>
            {' '}
            <Search />{' '}
          </span>
          <input type='text' placeholder='Search' onKeyDown={searchHandler} />
        </div>
        <div className={style.support__messages_items}>
          {isLoading ? (
            [...Array(6)].map((_, i) => <FallbackLoading key={i} />)
          ) : error ? (
            <HeaderAlert
              text={error}
              type='danger'
              size='2'
              custom={{ fontSize: '1.4rem', width: '90%', textAlign: 'center' }}
            />
          ) : emails && emails.length === 0 ? (
            <div className={style.support__empty}>
              <span>
                {' '}
                <Inbox />{' '}
              </span>
              <span>No messages found</span>
            </div>
          ) : (
            emails &&
            emails.map((email) => <Message key={email._id} email={email} />)
          )}
        </div>
      </div>

      {/* CONTENT COMPONENTS */}
      <div className={style.support__content}>
        {isLoadingEmail ? (
          <div className={style.support__empty}>
            <span>
              {' '}
              <Spinner animation='border' />{' '}
            </span>
            Loading...
          </div>
        ) : errorEmail ? (
          <HeaderAlert text={errorEmail} type='danger' size='2' />
        ) : email ? (
          <Content
            email={email}
            setIsReplay={setIsReplay}
            setIsNewEmail={setIsNewEmail}
          />
        ) : (
          !email && (
            <div className={style.support__empty}>
              <span>
                {' '}
                <Envelope />{' '}
              </span>
              <span>Please select message on the left</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Support
