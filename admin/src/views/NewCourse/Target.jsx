import React from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import {Trash} from '../../icons'

const Target = ({course, setCourse}) => {


  const updateTargetHandler = (e, idx) => {
      const updateTargets = [...course.targets] 
      updateTargets[idx] = e.target.value

     setCourse({...course, targets:updateTargets})
  }

  const removeTargetHandler = idx => {
    const updateTargets = [...course.targets] 
    updateTargets.splice(idx, 1)
    setCourse({...course, targets:updateTargets})
  }

  const addNewTargetInput = _ => {
    const updateTargets = [...course.targets] 
    updateTargets.push(' ')
    setCourse({...course, targets:updateTargets})
  }

return (
    <div className={style.course__points}>
      
        <h1 className={style.course__level}>
            Course Targets Audience
        </h1>
        {
           course.targets.map((target, idx) => (
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
        </div>
    </div>
  )
}

export default Target