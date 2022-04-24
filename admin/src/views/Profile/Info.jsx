import React, {useEffect, useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../actions'
import {Loader} from '../../components'
import constants from '../../constants'


const Info = ({info}) => {
    const [data, setData] = useState({
        firstName:info.firstName,
        lastName:info.lastName,
        email:info.email,
        phoneNumber:info.phoneNumber,
        role:info.role,
    })

    const {loading, error, message} = useSelector(state => state.updateAdminInfo)
    
    const dispatch = useDispatch()

    const clearAlert = () => {
        dispatch({type:constants.admin.UPDATE_ADMIN_INFO_RESET})
    }
    
    const updateAdminInfoHandler = e => {
        e.preventDefault()
        clearAlert()
        dispatch(actions.admin.updateAdminInfo(data))
    }

    return (
    <Form>
        <Form.Group className="mb-3" controlId="formBasicError">
            {
              loading 
              ? <Loader size="4" options={{animation:'border'}}/>
              : error 
              ? <Alert variant="danger" onClose={clearAlert} dismissible> {error} </Alert>
              : message 
              && <Alert variant="success" onClose={clearAlert} dismissible>{message}</Alert>
            }
        </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
                size="lg" 
                type="text"
                name="firstName"
                onChange={(e) => setData({...data, [e.target.name]:e.target.value})}
                placeholder={info.firstName} />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
                size="lg" 
                type="text"
                name="lastName"
                onChange={(e) => setData({...data, [e.target.name]:e.target.value})} 
                placeholder={info.lastName} />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicJobName">
            <Form.Label>Job Name</Form.Label>
            <Form.Control 
                size="lg" 
                type="text"
                name="role"
                onChange={(e) => setData({...data, [e.target.name]:e.target.value})} 
                placeholder={info.role} />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                size="lg" 
                type="email"
                name="email"
                onChange={(e) => setData({...data, [e.target.name]:e.target.value})} 
                placeholder={info.email} />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
                size="lg" 
                type="number"
                name="phoneNumber"
                onChange={(e) => setData({...data, [e.target.name]:e.target.value})} 
                placeholder={info.phoneNumber} />
        </Form.Group> 
        <Button variant='success' onClick={updateAdminInfoHandler}> Save </Button>
    </Form>
  )
}

export default Info