import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button, Accordion, OverlayTrigger, Popover} from 'react-bootstrap'
import ObjectId from 'bson-objectid'
import { useDispatch, useSelector } from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Lesson from './Lesson'
import {SideAlert, Loader} from '../../components'
import {Trash, Plus} from '../../icons'
import actions from '../../actions'
import constants from '../../constants'

const Chapters = ({data,courseId, idx, removeChapter, createLesson, removeLesson}) => {
  
    const [chapter, setChapter] = useState(null)
    const [isPaid, setIsPaid] = useState(data.isPaid)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const {error, message} = useSelector(state => state.updateChapter)

    const {
        error:delete_error, 
        message:delete_message
    } = useSelector(state => state.deleteChapter)

    const {
      error:create_error,
      message:create_message
    } = useSelector(state => state.createChapter)

    const dispatch = useDispatch()
    
    const updateTitleHandler = e => {
        const updateChapter = {...chapter} 
        updateChapter.title = e.target.value
        setChapter(updateChapter)
    }
    
    const updateChapterHandler = _ => {
      setIsLoading(true)
      if(data.isNew) {
        const info = {...chapter} 
        info.isPaid = isPaid 
        delete info.isNew 

       dispatch(actions.courses.createChapter(courseId, info))
      } else {
        const info = {title:chapter.title, isPaid}
        dispatch(actions.courses.updateChapter(data._id, info))
      }
    }

    const createLessonHandler = e => {
      e.stopPropagation()
      const lesson = {
        _id:ObjectId().toHexString(),
        chapter:data._id,
        title:'New Lesson??',
        description:'',
        video:'',
        duration:0,
        isPaid:true,
        order:data.lessons.length,
        isNew:true
      }
     
      createLesson(lesson, data._id)
      
    }

    
    
    const removeChapterHandler =  e => {
        
        if(chapter.isNew) {
          removeChapter(data._id)
          return
        }
        
        setIsDeleting(true)
        dispatch(actions.courses.deleteChapter(data._id))

    }


    const clearAlert = _ => {
      dispatch({type:constants.courses.CREATE_CHAPTER_RESET})
      dispatch({type:constants.courses.UPDATE_CHAPTER_RESET})
      dispatch({type:constants.courses.DELETE_CHAPTER_RESET})
    }


    const confirmDelete = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Are You Sure?!!</Popover.Header>
        <Popover.Body style={{textAlign:'-webkit-center'}}>
          {
            isDeleting 
            ?  <Loader size='4' options={{animation:'grow'}}/>
            :  <Button size='lg' variant='danger' onClick={removeChapterHandler}>delete</Button>
          }
        </Popover.Body>
      </Popover>
    )

    const deleteButton = (
     <div onClick={(e) => e.stopPropagation()}>
        <OverlayTrigger 
        trigger="click" 
        placement="top" 
        overlay={confirmDelete}>
          <span> <Trash/> </span>
      </OverlayTrigger>
     </div>
    )


  useEffect(() => {
    (message || create_message) 
    && setIsLoading(false)
  },[message,create_message])

  useEffect(() => {
    delete_message && setIsDeleting(false)
  },[delete_message])
  
    useEffect(() => {
    data && setChapter(data)
  },[data])

return (

  <>
      <SideAlert
        type='danger'
        position='left'
        time={3000}
        isOn={error ? true : false}
        text={error}
        reset={() => clearAlert()}
        />

      <SideAlert
        type='success'
        position='left'
        time={3000}
        isOn={message ? true : false}
        text={message}
        reset={() => clearAlert()}
        />

      <SideAlert
        type='danger'
        position='left'
        time={3000}
        isOn={create_error ? true : false}
        text={create_error}
        reset={() => clearAlert()}
        />

      <SideAlert
        type='success'
        position='left'
        time={3000}
        isOn={create_message ? true : false}
        text={create_message}
        reset={() => clearAlert()}
        />

      <SideAlert
        type='danger'
        position='left'
        time={3000}
        isOn={delete_error ? true : false}
        text={delete_error}
        reset={() => clearAlert()}
        />

      <SideAlert
        type='success'
        position='left'
        time={3000}
        isOn={delete_message ? true : false}
        text={delete_message}
        reset={() => clearAlert()}
        />
  
    <Accordion.Item eventKey={idx} key={data._id}>
      <Accordion.Header>
        <div className={style.course__chapter_title}>
          <span> {data.title} </span>
          <div className={style.course__chapter_actions}>
              <span onClick={createLessonHandler}> <Plus/> </span>
                { deleteButton }
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div  className={style.course__chapter}>
            <div className={style.course__chapter_header}>
              <Form.Control
                placeholder={data.title}
                name='title'
                onChange={updateTitleHandler}
              />

              <Form.Check 
                type="switch"
                id="custom-switch"
                label={isPaid ? 'Paid Chapter' : 'Free Chapter'}
                value={isPaid}
                style={{width:'12rem', marginLeft:'1rem', fontSize:'1rem'}}
                onChange={() => setIsPaid(prev => !prev)}
              />
              
              {isLoading 
              ? <Loader size='4' options={{animation:'border'}} custom={{marginLeft:'1rem', width:'4.8rem'}}/>
              :<Button variant='success' onClick={updateChapterHandler}>
                {data.isNew ? 'save' : 'update'}
              </Button>}
            </div>
            <p style={{fontSize:'1.3rem', margin:'1rem 0'}}>
              chapter lessons...
            </p>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <TransitionGroup>
                {
                  data.lessons.map((lesson, idx) => (
                      <CSSTransition key={lesson._id} timeout={700} classNames='lesson'>
                        <Lesson 
                        data={lesson} 
                        chapterId={data._id}
                        removeLesson={removeLesson}
                        idx={idx} 
                        />
                      </CSSTransition>
                  ))
                }
                </TransitionGroup>
            </Accordion>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  </>
  )
}

export default Chapters