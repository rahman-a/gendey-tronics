import React from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import ObjectId from 'bson-objectid'
import {Trash} from '../../icons'

const Points = ({course, setCourse}) => {
  
  const updatePointHandler = (e, id) => {
    const updatePoints = [...course.points] 
    updatePoints.forEach(point => {
        if(point._id === id) {
            point.point = e.target.value
        }
    })

    setCourse({...course, points:updatePoints})
  }

  const removePointHandler =  id => {
    const updatePoints = course.points.filter(point => point._id !== id) 
    setCourse({...course, points:updatePoints})
  }

  const addNewPointInput = _ => {
    const order = course.points.length
    const _id = ObjectId().toHexString()
    const newPoint = {_id, order, point:''}
    const updatedPoints = [...course.points, newPoint]
    setCourse({...course, points:updatedPoints})
  }

return (
    <div className={style.course__points}>
      
        <h1 className={style.course__level}>
            Course Main Points to Learn 
            
        </h1>
        {
            course.points.map((point, idx) => (
                <div className={style.course__point} key={point._id}>
                    <Form.Control
                    placeholder={point.point}
                    onChange={(e) => updatePointHandler(e, point._id)}
                    className='mb-4'
                    />
                    <span onClick={() => removePointHandler(point._id)}> <Trash/> </span>
                </div>
            ))
        }
        <div className={style.course__submit}>
            <Button variant='warning' onClick={addNewPointInput}> Add new point </Button>
        </div>
    </div>
  )
}

export default Points