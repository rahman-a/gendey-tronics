import React, {useEffect} from 'react'
import style from './style.module.scss'
import SingleAnnouncement from './SingleAnnouncement'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useParams } from 'react-router-dom'

const Announcement = ({lang}) => {
  const {loading, error, announcements} = useSelector(state => state.announcements)
  const dispatch = useDispatch()
  const {id} = useParams()

  useEffect(() => {
    (!announcements || announcements.length < 1) 
    && dispatch(actions.courses.listAnnouncements(id))
  }, [id, dispatch,announcements])
  return (
    
    <div className={style.courseLearn__announcements}>
      <div className='container'
      style={{padding:error ? '12rem' :'0'}}>
        {loading ? <Loader size='8' center/>
        : error ? <Message type='error' center message={error}/>
        :  announcements && announcements.map((announcement) => (
            <SingleAnnouncement data={announcement} key={announcement._id} lang={lang}/>
          ))
        }
      </div>
    </div>
  )
}

export default Announcement
