import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import ObjectId from 'bson-objectid'
import { useDispatch, useSelector } from 'react-redux'
import {SideAlert, Loader} from '../../components'
import {Trash} from '../../icons'
import actions from '../../actions'

const Points = ({data, courseId}) => {
  const [points, setPoints] = useState(null)
  const {loading, error, message} = useSelector(state => state.updateCourse)
  const dispatch = useDispatch()

  const updatePointHandler = (e, id) => {
      const updatePoint = [...points] 
      updatePoint.forEach(point => {
          if(point._id === id) {
              point.point = e.target.value
          }
      })

      setPoints(updatePoint)
  }

  const removePointHandler =  id => {
    const updatePoints = points.filter(point => point._id !== id) 
    setPoints(updatePoints)
  }

  const addNewPointInput = _ => {
    const order = points.length
    const _id = ObjectId().toHexString()
    const newPoint = {_id, order, point:''}
    setPoints([...points, newPoint])
  }

  const updatePointsHandler = _ => {
    dispatch(actions.courses.updateCourse(courseId, {points}))
  }
  
  useEffect(() => {
    data && setPoints(data)
  },[data])

return (
    <div className={style.course__points}>
        
        <SideAlert
        type='danger'
        position='left'
        isOn={error ? true : false}
        text={error}
        />

      <SideAlert
        type='success'
        position='left'
        isOn={message ? true : false}
        text={message}
        />
    
        <h1 className={style.course__level}>
            Course Main Points to Learn 
            
        </h1>
        {
            points && points.map((point, idx) => (
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
            <Button style={{marginLeft:'1.5rem'}} variant='success' onClick={updatePointsHandler}>
                update
            </Button>
            { loading && <Loader size='4' options={{animation:'border'}}/> }
        </div>
    </div>
  )
}

export default Points