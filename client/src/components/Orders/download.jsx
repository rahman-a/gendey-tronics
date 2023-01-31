import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Accordion, ListGroup } from 'react-bootstrap'
import { Modal } from '../Modal'
import { Overlay } from '../Overlay'
import actions from '../../actions'
import Loader from '../../components/Loader'
import DownloadLink from './downloadLink'
import strings from '../../localization'
import AddReview from '../CourseReviews/AddReview'

const DownloadList = ({ lang }) => {
  const [allItems, setAllItems] = useState([])
  const [addReview, setAddReview] = useState(false)
  const [courseId, setCourseId] = useState(null)
  const dispatch = useDispatch()
  const { loading, error, links } = useSelector((state) => state.downloadsLinks)
  const filterItemsHandler = (type) => {
    let items = []
    if (type === 'course') {
      items = links.filter((link) => link.type === 'course')
    } else if (type === 'product') {
      items = links.filter((link) => link.type === 'product')
    } else items = links

    setAllItems(items)
  }

  const addReviewHandler = (type, id) => {
    if (type === 'close') {
      setAddReview(false)
      setCourseId(null)
    } else {
      setAddReview(true)
      setCourseId(id)
    }
  }

  useEffect(() => {
    links && setAllItems(links)
  }, [links])

  useEffect(() => {
    dispatch(actions.client.downloadLinks())
  }, [])

  return (
    <div className={style.orders__message}>
      {courseId && (
        <>
          <Overlay toggle={addReview} />
          <Modal
            toggle={addReview}
            closeHandler={() => addReviewHandler('close')}
          >
            <AddReview id={courseId} />
          </Modal>
        </>
      )}
      <div className={style.orders__message_type}>
        <Button
          size='lg'
          variant='light'
          onClick={() => filterItemsHandler('course')}
        >
          Courses
        </Button>
        <Button
          size='lg'
          variant='light'
          onClick={() => filterItemsHandler('product')}
        >
          Products
        </Button>
        <Button
          size='lg'
          variant='light'
          onClick={() => filterItemsHandler('all')}
        >
          Reset
        </Button>
      </div>

      {loading ? (
        <Loader size='8' center />
      ) : error ? (
        <h2 style={{ color: 'red' }}> {error} </h2>
      ) : links && allItems.length ? (
        <div className={style.orders__message_content}>
          <Accordion>
            {allItems.map((item, idx) => (
              <Accordion.Item eventKey={`${item._id}`} key={item._id}>
                <Accordion.Header className={style.orders__message_title}>
                  {item.name}
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {item.links.map((link) => (
                      <DownloadLink
                        key={link._id}
                        link={link.link}
                        itemName={item.name}
                        part={link.part}
                      />
                    ))}
                  </ListGroup>
                  {item.type === 'course' && (
                    <button
                      onClick={() => addReviewHandler('open', item._id)}
                      className={style.orders__review}
                    >
                      {strings.course[lang].review_course}
                    </button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ) : (
        <h2>
          {lang === 'en'
            ? 'No Download History To Display'
            : 'لا يوجد هنا سجل للتحميلات'}
        </h2>
      )}
    </div>
  )
}

export default DownloadList
