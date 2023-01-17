import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {SideAlert, Loader} from '../../components'
import {Trash} from '../../icons'
import actions from '../../actions'

const Requirements = ({data, courseId}) => {
  const [requirements, setRequirements] = useState(null)
  const {loading, error, message} = useSelector(state => state.updateCourse)
  const dispatch = useDispatch()

  const updateRequirementHandler = (e, idx) => {
      const updateRequirements = [...requirements] 
      updateRequirements[idx] = e.target.value

      setRequirements(updateRequirements)
  }

  const removeRequirementHandler =  idx => {
    const updateRequirements = [...requirements] 
    updateRequirements.splice(idx, 1)
    setRequirements(updateRequirements)
  }

  const addNewRequirementInput = _ => {
    const updateRequirements = [...requirements] 
    updateRequirements.push(' ')
    setRequirements(updateRequirements)
  }

  const updateRequirementsHandler = _ => {
    dispatch(actions.courses.updateCourse(courseId, {requirements}))
  }
  
  useEffect(() => {
    data && setRequirements(data)
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
            Course Requirements
        </h1>
        {
            requirements && requirements.map((target, idx) => (
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
            <Button style={{marginLeft:'1.5rem'}} variant='success' onClick={updateRequirementsHandler}>
                update
            </Button>
            { loading && <Loader size='4' options={{animation:'border'}}/> }
        </div>
    </div>
  )
}

export default Requirements