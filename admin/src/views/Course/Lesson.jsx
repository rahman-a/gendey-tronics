import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Accordion, Form, Button, OverlayTrigger, Popover} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {SideAlert, Loader} from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const Lesson = ({data, chapterId, idx, removeLesson}) => {
  
  const [lesson, setLesson] = useState(null)
  const [isPaid, setIsPaid] = useState(data.isPaid)
  const [isLoading, setIsLoading] = useState(false)
  const {error, message} = useSelector(state => state.updateLesson)
  const {error:create_error, message:create_message} = useSelector(state => state.createLesson)
  const {error:delete_error, message:delete_message} = useSelector(state => state.deleteLesson)
  const dispatch = useDispatch()
 
  const updateLessonHandler = e => {
      const copiedLesson = {...lesson} 
      copiedLesson[e.target.name] = e.target.value 
      setLesson(copiedLesson)
  }  

  const saveLessonHandler = _ => {
    setIsLoading(true)
    
    if(lesson.isNew) {

        const info = {...lesson}
        delete info.isNew 
        info.isPaid = isPaid

        dispatch(actions.courses.createLesson(chapterId, info))
        return 
    }
    
    const info = {
        title:lesson.title,
        description:lesson.description,
        video:lesson.video,
        duration:lesson.duration,
        isPaid,
    }
 
    dispatch(actions.courses.updateLesson(data._id, chapterId, info))
  }

  const removeLessonHandler = _ => {
        setIsLoading(true)
        if(lesson.isNew) {
            removeLesson(data._id, chapterId)
            return
        }
        dispatch(actions.courses.deleteLesson(data._id, chapterId))
  }

  const clearAlert = _ => {
      dispatch({type:constants.courses.CREATE_LESSON_RESET})
      dispatch({type:constants.courses.UPDATE_LESSON_RESET})
      dispatch({type:constants.courses.DELETE_LESSON_RESET})
  }

  const confirmDelete = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Are You Sure?!!</Popover.Header>
      <Popover.Body style={{textAlign:'-webkit-center'}}>
        {
          isLoading 
          ?  <Loader size='4' options={{animation:'grow'}}/>
          :  <Button size='lg' variant='danger' onClick={removeLessonHandler}>delete</Button>
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
        <Button  variant='danger'> delete </Button>
    </OverlayTrigger>
   </div>
  )

  useEffect(() => {
    setLesson(data)
  },[data])
  
  useEffect(() => {
    (message || create_message || delete_message) 
    && setIsLoading(false)
  },[message,create_message,delete_message])

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
    
        <Accordion.Item className='bg-light ' eventKey={idx} key={data._id}>
        <Accordion.Header>{data.title}</Accordion.Header>
        <Accordion.Body>
            <div  className={style.course__lesson}>
                {
                lesson && 
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Lesson Title</Form.Label>
                        <Form.Control
                        placeholder={data.title}
                        name='title'
                        onChange={updateLessonHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Lesson Description</Form.Label>
                        <Form.Control 
                        as='textarea'
                        name='description' 
                        row={8} 
                        placeholder={data.description || 'N/A'}
                        onChange={updateLessonHandler}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicVideo">
                        <Form.Label>Lesson Video Link</Form.Label>
                        <Form.Control
                        placeholder={data.video}
                        name='video'
                        onChange={updateLessonHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDuration">
                        <Form.Label>Lesson Video Length</Form.Label>
                        <Form.Control
                        placeholder={data.duration}
                        name='duration'
                        type='number'
                        onChange={updateLessonHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label={isPaid ? 'Paid Lesson' : 'Free Lesson'}
                            value={isPaid}
                            onChange={() => setIsPaid(prev => !prev)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3" controlId="formBasicState">
                        <Button style={{marginRight:'1rem'}} variant='success' onClick={saveLessonHandler}>
                            {lesson.isNew ? 'save' : 'update'}
                        </Button>
                        {deleteButton}
                        {isLoading && <Loader size='4' options={{animation:'border'}}/>}
                    </Form.Group>
                </Form>
                }
            </div>
        </Accordion.Body>
        </Accordion.Item>
    </>
  )
}

export default Lesson