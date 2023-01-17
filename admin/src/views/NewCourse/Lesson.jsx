import React from 'react'
import style from './style.module.scss'
import {Accordion, Form, Button, OverlayTrigger, Popover} from 'react-bootstrap'


const Lesson = ({course, setCourse,chapterId, lesson, idx}) => {
  
 
  const updateLessonHandler = e => {
      const updatedChapters = [...course.chapters] 
      updatedChapters.forEach(ch => {
        if(ch._id === chapterId) {
          ch.lessons.forEach(ls => {
            if(ls._id === lesson._id) {
              if(e.target.name === 'duration') {
                ls[e.target.name] = parseInt(e.target.value)
              }else {
                ls[e.target.name] = e.target.value
              }
            }
          })
        }
      })

      setCourse({...course, chapters:updatedChapters})
  }  


  const removeLessonHandler = _ => {
    const updatedChapters = [...course.chapters] 
      updatedChapters.forEach(ch => {
        if(ch._id === chapterId) {
          ch.lessons = ch.lessons.filter(ls => ls._id !== lesson._id)
        }
      })
      setCourse({...course, chapters:updatedChapters})
  }

  const changeLessonStateHandler = _ => {
    const updatedChapters = [...course.chapters] 
    updatedChapters.forEach(ch => {
      if(ch._id === chapterId) {
        ch.lessons.forEach(ls => {
          if(ls._id === lesson._id) {
            ls.isPaid = !ls.isPaid
          }
        })
      }
    })

    setCourse({...course, chapters:updatedChapters})
  }

  const confirmDelete = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Are You Sure?!!</Popover.Header>
      <Popover.Body style={{textAlign:'-webkit-center'}}>
        <Button size='lg' variant='danger' onClick={removeLessonHandler}>delete</Button>
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

  return (

    <>
        <Accordion.Item className='bg-light ' eventKey={idx} key={lesson._id}>
        <Accordion.Header>{lesson.title}</Accordion.Header>
        <Accordion.Body>
            <div  className={style.course__lesson}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Lesson Title</Form.Label>
                        <Form.Control
                        placeholder={lesson.title}
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
                        placeholder={lesson.description || 'N/A'}
                        onChange={updateLessonHandler}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicVideo">
                        <Form.Label>Lesson Video Link</Form.Label>
                        <Form.Control
                        placeholder={lesson.video}
                        name='video'
                        onChange={updateLessonHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDuration">
                        <Form.Label>Lesson Video Length</Form.Label>
                        <Form.Control
                        placeholder={lesson.duration}
                        name='duration'
                        type='number'
                        onChange={updateLessonHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label={lesson.isPaid ? 'Paid Lesson' : 'Free Lesson'}
                            value={lesson.isPaid}
                            onChange={changeLessonStateHandler}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3" controlId="formBasicState">
                        {deleteButton}
                    </Form.Group>
                </Form>
            </div>
        </Accordion.Body>
        </Accordion.Item>
    </>
  )
}

export default Lesson