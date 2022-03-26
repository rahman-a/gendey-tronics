import React, {useEffect, useState} from 'react'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Modal,Table, Button, Form, Spinner } from 'react-bootstrap'
import { Loader } from '../../components' 
import {GraduationCap} from '../../icons'
import actions from '../../actions'

const Enrollments = ({isEnrollments, setIsEnrollments, id}) => {
    const [allEnrollments, setAllEnrollments] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const {loading, error, enrollments} = useSelector(state => state.listCourseEnrollments)
    const dispatch = useDispatch()

    const dateOptions = {
        month:'long',
        year:'numeric',
        day:'numeric'
    }

    const searchEnrollmentsHandler = e => {
        if(e.keyCode === 13 || e.which === 13) {
            if(userEmail === '') {
                setAllEnrollments(enrollments)
                return
            }
            const filteredEnrollments = allEnrollments.filter(enroll => enroll.user.email === userEmail)
            setAllEnrollments(filteredEnrollments)
        }
    }
    
    useEffect(() => {
        enrollments && setAllEnrollments(enrollments)
    },[enrollments])

    useEffect(() => {
     isEnrollments && dispatch(actions.courses.listCourseEnrollments(id))
    },[isEnrollments])
  
  return <Modal show={isEnrollments} onHide={() => setIsEnrollments(false)}>
  <Modal.Header>
       <div style={{display:'flex'}}>
           <span style={{marginRight:'1rem'}}> <GraduationCap/> </span>
           <span style={{fontSize:'1.8rem'}}> Enrollments </span>
       </div>
  </Modal.Header>
  <Modal.Body>
      <div className={style.orders__data}>
            <Form.Group className='mb-3'>
                <Form.Control
                name='email'
                placeholder='search by E-mail'
                size='lg'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                onKeyDown={searchEnrollmentsHandler}
                style={{width:'25rem'}}
                />
            </Form.Group>
            <div style={{
                position:'relative', 
                maxHeight:loading ?'unset' :'30rem',
                height:loading ? '6rem' :'unset',
                overflowY:loading ? 'initial' :'auto',
                overflowX:'hidden'
            }}>
            {loading ? <Loader size='5' center options={{animation:'border'}}/>
               : <Table striped hover bordered size='sm'>
                    <thead>
                        <th style={{fontWeight:'400'}}>#</th>
                        <th style={{fontWeight:'400'}}>Name</th>
                        <th style={{fontWeight:'400'}}>E-mail Address</th>
                        <th style={{fontWeight:'400'}}>Phone Number</th>
                        <th style={{fontWeight:'400'}}>Enrolled At</th>
                    </thead>
                    <tbody>
                        {
                            allEnrollments.map((enroll, idx) => (
                                <tr>
                                    <td style={{fontSize:'1.4rem'}}>
                                            {idx + 1} 
                                        </td>
                                    <td style={{fontSize:'1.3rem'}}>
                                            {`${enroll.user.firstName} ${enroll.user.lastName}`} 
                                        </td>
                                    <td style={{fontSize:'1.3rem'}}>
                                            {enroll.user.email} 
                                        </td>
                                    <td style={{fontSize:'1.3rem'}}>
                                            {enroll.user.phoneNumber} 
                                        </td>
                                    <td style={{fontSize:'1.3rem'}}>
                                            {new Date(enroll.createdAt).toLocaleDateString('en-US', dateOptions)} 
                                        </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>}
            </div>
      </div>
  </Modal.Body>
  <Modal.Footer>
       <Button size='lg' variant='danger' onClick={() => setIsEnrollments(false)}>
           Close
       </Button>
  </Modal.Footer>
</Modal>
}

export default Enrollments

// {new Date(paymentData.update_time).toLocaleDateString('en-US', dateOptions)} 