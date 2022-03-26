import React from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import {Trash} from '../../icons'

const Requirements = ({course, setCourse}) => {


  const updateRequirementHandler = (e, idx) => {
      const updateRequirements = [...course.requirements] 
      updateRequirements[idx] = e.target.value

      setCourse({...course, requirements:updateRequirements})
  }

  const removeRequirementHandler =  idx => {
    const updateRequirements = [...course.requirements] 
    updateRequirements.splice(idx, 1)
    setCourse({...course, requirements:updateRequirements})
  }

  const addNewRequirementInput = _ => {
    const updateRequirements = [...course.requirements] 
    updateRequirements.push(' ')
    setCourse({...course, requirements:updateRequirements})
  }

return (
    <div className={style.course__points}>
    
        <h1 className={style.course__level}>
            Course Requirements
        </h1>
        {
           course.requirements.map((target, idx) => (
                <div className={style.course__point} key={idx}>
                    <Form.Control
                    placeholder={target}
                    onChange={(e) => updateRequirementHandler(e, idx)}
                    className='mb-4'
                    />
                    <span onClick={() => removeRequirementHandler(idx)}> <Trash/> </span>
                </div>
            ))
        }
        <div className={style.course__submit}>
            <Button variant='warning' onClick={addNewRequirementInput}> Add new requirement </Button>
        </div>
    </div>
  )
}

export default Requirements