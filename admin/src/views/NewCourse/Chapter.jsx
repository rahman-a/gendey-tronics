import React from 'react'
import style from './style.module.scss'
import {Form, Button, Accordion, OverlayTrigger, Popover} from 'react-bootstrap'
import ObjectId from 'bson-objectid'
import Lesson from './Lesson'
import {Trash, Plus} from '../../icons'


const Chapters = ({course, setCourse, chapter, idx}) => {

    const updateTitleHandler = e => {
        const updatedChapters = [...course.chapters] 
        updatedChapters.forEach(ch => {
          if(ch._id === chapter._id) {
            ch.title = e.target.value
          }
        })
        setCourse({...course, chapters:updatedChapters})
    }
    
    const createLessonHandler = e => {
      e.stopPropagation()
      const lesson = {
        _id:ObjectId().toHexString(),
        chapter:chapter._id,
        title:'New Lesson??',
        description:'',
        video:'',
        duration:0,
        isPaid:course.isPaid,
        order:chapter.lessons.length,
      }
     
      const updatedChapters = [...course.chapters] 
        updatedChapters.forEach(ch => {
          if(ch._id === chapter._id) {
            ch.lessons = [...ch.lessons, lesson]
          }
        })
        setCourse({...course, chapters:updatedChapters})
    }

    
    const removeChapterHandler =  e => {
      const updatedChapters = course.chapters.filter(ch => ch._id !== chapter._id)
      setCourse({...course, chapters:updatedChapters})
    }

    const setChapterStateHandler = _ => {
      const updatedChapters = [...course.chapters] 
        updatedChapters.forEach(ch => {
          if(ch._id === chapter._id) {
            ch.isPaid = !ch.isPaid
          }
        })
        setCourse({...course, chapters:updatedChapters})
    }


    const confirmDelete = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Are You Sure?!!</Popover.Header>
        <Popover.Body style={{textAlign:'-webkit-center'}}>  
          <Button size='lg' variant='danger' onClick={removeChapterHandler}>delete</Button>
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


return (

  <>
    <Accordion.Item eventKey={idx} key={chapter._id}>
      <Accordion.Header>
        <div className={style.course__chapter_title}>
          <span> {chapter.title} </span>
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
                placeholder={chapter.title}
                name='title'
                onChange={updateTitleHandler}
              />

              <Form.Check 
                type="switch"
                id="custom-switch"
                label={chapter.isPaid ? 'Paid Chapter' : 'Free Chapter'}
                value={chapter.isPaid}
                style={{width:'12rem', marginLeft:'1rem', fontSize:'1rem'}}
                onChange={setChapterStateHandler}
              />
          
            </div>
            <p style={{fontSize:'1.3rem', margin:'1rem 0'}}>
              chapter lessons...
            </p>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {
                  chapter.lessons.map((lesson, idx) => (
                      <Lesson 
                      course={course}
                      setCourse={setCourse}
                      lesson={lesson} 
                      chapterId={chapter._id}
                      idx={idx} 
                      key={lesson._id}/>
                  ))
                }
            </Accordion>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  </>
  )
}

export default Chapters