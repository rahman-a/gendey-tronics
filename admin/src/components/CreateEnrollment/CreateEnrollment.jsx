import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {Modal, Button, Form, InputGroup} from 'react-bootstrap'
import {GraduationCap} from '../../icons'
import {Loader, SideAlert} from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const CreateEnrollment = ({isEnrollment, setIsEnrollment}) => {
  
  const [courseId, setCourseId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [paidByClient, setPaidByClient] = useState(0)
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch()
  const {loading, error, message} = useSelector(state => state.createEnrollment)
  
  const createEnrollmentHandler  = _ => {
    if(!userId) {
        setErrors('User Id is Required')
        return
    }
    if(!courseId) {
        setErrors('Course Id is Required')
        return
    }
    console.log({
        course:courseId,
        user:userId,
        payment:paidByClient
    })
    dispatch(actions.courses.createEnrollment(courseId, {user:userId, payment:paidByClient}))
  }

  const clearAlert = _ => {
      setErrors(null)
      dispatch({type:constants.courses.CREATE_ENROLLMENT_RESET})
  }

  useEffect(() => {
    error && setErrors(error)
  },[error])
  
    return (
    
    <>
        <SideAlert
        text={errors}
        isOn={errors ? true : false}
        type='danger'
        reset={() => clearAlert()}
        />
        <SideAlert
        text={message}
        isOn={message ? true : false}
        type='success'
        reset={() => clearAlert()}
        />
        <Modal show={isEnrollment} onHide={() => setIsEnrollment(false)}>
            <Modal.Header>
                <p>
                    <span> <GraduationCap/> </span>
                    <span style={{marginLeft:'1rem'}}> Create Enrollment </span>
                </p>
            </Modal.Header>
            <Modal.Body>
                <div className={style.enrollment}>
                    {loading && <div className={style.enrollment__overlay}>
                            <Loader size='5' center options={{animation:'border'}}/>
                    </div> }
                    <Form>
                        
                        {/* User Id */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text> user id </InputGroup.Text>
                            <Form.Control name='user' onChange={({target:{value}}) => setUserId(value)}/>
                        </InputGroup>
                        
                        {/* Course Id */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text> course id </InputGroup.Text>
                            <Form.Control name='course' onChange={({target:{value}}) => setCourseId(value)}/>
                        </InputGroup>
                        
                        {/* Amount Paid By client */}
                        <InputGroup className='mb-3 w-25'>
                            <InputGroup.Text> paid by client </InputGroup.Text>
                            <Form.Control 
                                value={paidByClient} 
                                name='course' 
                                type='number' 
                                onChange={({target:{value}}) => setPaidByClient(value)}/>
                            <InputGroup.Text> $ </InputGroup.Text>
                        </InputGroup>

                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={createEnrollmentHandler}> Create Enrollment </Button>
                <Button variant='danger' onClick={() => setIsEnrollment(false)}> Cancel </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default CreateEnrollment