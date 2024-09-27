import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  OverlayTrigger,
  Popover,
  Button,
  Tooltip,
  Spinner,
} from 'react-bootstrap'
import {
  Trash,
  Star,
  StarEmpty,
  BoxArchive,
  BoxOpen,
  Replay,
} from '../../icons'
import actions from '../../actions'
import { filePlaceholder } from '../../utils'

const Content = ({ email, setIsReplay, setIsNewEmail }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { isUpdated } = useSelector((state) => state.updateEmail)
  const { message } = useSelector((state) => state.deleteEmail)
  const dispatch = useDispatch()

  const deleteEmailHandler = async (_) => {
    setIsLoading(true)
    dispatch(actions.support.deleteEmail(email._id))
  }

  const deleteButton = (
    <Popover id='popover-basic'>
      <Popover.Body>
        <Button variant='danger' onClick={deleteEmailHandler}>
          {isLoading ? <Spinner animation='border' size='sm' /> : <Trash />}
        </Button>
      </Popover.Body>
    </Popover>
  )

  const updateEmail = (key) => {
    setIsLoading(key)
    const value = !email[key]
    dispatch(actions.support.updateEmail(email._id, { [key]: `${value}` }))
  }

  const emailReplayHandler = (_) => {
    setIsReplay({
      subject: `RE: ${email.subject}`,
      sender: email.recipient,
      recipient: email.sender,
    })
    setIsNewEmail(true)
  }

  const displayAsset = (file) => {
    const anchor = document.createElement('a')
    anchor.href = `${import.meta.env.VITE_API_URL}/images/${file}`
    anchor.target = '_blank'
    anchor.click()
  }

  useEffect(() => {
    if (isUpdated || message) {
      setIsLoading(null)
    }
  }, [isUpdated, message])
  return (
    <>
      <div className={style.support__content_header}>
        <p>{email.subject}</p>
        <div>
          {/* <span> <Star/> </span> */}
          <OverlayTrigger
            key='replay'
            placement='bottom'
            overlay={
              <Tooltip id='replay'>
                <strong>Replay</strong>
              </Tooltip>
            }
          >
            <span onClick={emailReplayHandler}>
              {' '}
              <Replay />{' '}
            </span>
          </OverlayTrigger>

          <OverlayTrigger
            key='favourite'
            placement='bottom'
            overlay={
              <Tooltip id='favourite'>
                <strong>{email.isStarred ? 'Unstar' : 'Star'}</strong>
              </Tooltip>
            }
          >
            <span onClick={() => updateEmail('isStarred')}>
              {isLoading === 'isStarred' ? (
                <Spinner animation='border' size='sm' />
              ) : email.isStarred ? (
                <Star />
              ) : (
                <StarEmpty />
              )}
            </span>
          </OverlayTrigger>

          <OverlayTrigger
            key='archive'
            placement='bottom'
            overlay={
              <Tooltip id='archive'>
                <strong>{email.isArchived ? 'Unarchive' : 'Archive'}</strong>
              </Tooltip>
            }
          >
            <span onClick={() => updateEmail('isArchived')}>
              {isLoading === 'isArchived' ? (
                <Spinner animation='border' size='sm' />
              ) : email.isArchived ? (
                <BoxArchive />
              ) : (
                <BoxOpen />
              )}
            </span>
          </OverlayTrigger>

          <OverlayTrigger
            key='delete'
            placement='bottom'
            overlay={
              <Tooltip id='delete'>
                <strong>Delete</strong>
              </Tooltip>
            }
          >
            <OverlayTrigger
              trigger='click'
              placement='top'
              overlay={deleteButton}
            >
              <span>
                <Trash />
              </span>
            </OverlayTrigger>
          </OverlayTrigger>
        </div>
      </div>
      <div className={style.support__content_metadata}>
        <div className={style.support__content_metadata_image}>
          <span>{email.from[0]}</span>
        </div>
        <div className={style.support__content_metadata_body}>
          <p>
            <span> {email.from} </span>
            <span> {`<${email.sender}>`} </span>
            <span> {new Date(email.createdAt).toLocaleDateString()} </span>
          </p>
          <p>To:{email.recipient}</p>
        </div>
      </div>
      <div
        className={style.support__content_attachments}
        style={{ padding: email.attachments.length ? '0.5rem 0' : 0 }}
      >
        {email.attachments.length > 0 &&
          email.attachments.map((file) => (
            <div className={style.support__content_attachment}>
              <div
                className={style.support__content_attachment_block}
                onClick={() => displayAsset(file.path)}
              >
                <span> {file.originalName} </span>
                <figure>
                  <img
                    src={`/images/placeholder/${filePlaceholder(file.path)}`}
                    alt='attachment'
                  />
                </figure>
              </div>
            </div>
          ))}
      </div>
      <div className={style.support__content_body}>
        <div dangerouslySetInnerHTML={{ __html: email.html }} />
      </div>
    </>
  )
}

export default Content
