import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {SideAlert, Loader} from '../../components'
import {Trash} from '../../icons'
import actions from '../../actions'

const Target = ({data, courseId}) => {
  const [targets, setTarget] = useState(null)
  const {loading, error, message} = useSelector(state => state.updateCourse)
  const dispatch = useDispatch()

  const updateTargetHandler = (e, idx) => {
      const updateTarget = [...targets] 
      updateTarget[idx] = e.target.value

      setTarget(updateTarget)
  }

  const removeTargetHandler =  idx => {
    const updatePoints = [...targets] 
    updatePoints.splice(idx, 1)
    setTarget(updatePoints)
  }

  const addNewTargetInput = _ => {
    const updatePoints = [...targets] 
    updatePoints.push(' ')
    setTarget(updatePoints)
  }

  const updateTargetsHandler = _ => {
    dispatch(actions.courses.updateCourse(courseId, {targets}))
  }
  
  useEffect(() => {
    data && setTarget(data)
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
            Course Targets Audience
        </h1>
        {
            targets && targets.map((target, idx) => (
                <div className={style.course__point} key={idx}>
                    <Form.Control
                    placeholder={target}
                    onChange={(e) => updateTargetHandler(e, idx)}
                    className='mb-4'
                    />
                    <span onClick={() => removeTargetHandler(idx)}> <Trash/> </span>
                </div>
            ))
        }
        <div className={style.course__submit}>
            <Button variant='warning' onClick={addNewTargetInput}> Add new target </Button>
            <Button style={{marginLeft:'1.5rem'}} variant='success' onClick={updateTargetsHandler}>
                update
            </Button>
            { loading && <Loader size='4' options={{animation:'border'}}/> }
        </div>
    </div>
  )
}

export default Target