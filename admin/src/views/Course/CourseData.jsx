import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Loader, SideAlert} from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const CourseData = ({data}) => {
  const [isPaid, setIsPaid] = useState(false)
  const [info, setInfo] = useState({
        name:'',
        description:'',
        trailer:'',
        price:'',
        discount:''
    })


    const {loading, error, message} = useSelector(state => state.updateCourse)


    const dispatch = useDispatch()
  
    const getCourseInfo = e => {
        const value = {[e.target.name]:e.target.value} 
        setInfo({...info, ...value})
    }

    const switchCourseState = _ => {
        if(isPaid) {
            const formInfo = {...info}
             setInfo({
             name:formInfo.name,
             description:formInfo.description,
             trailer:formInfo.trailer,
             price:0,
             discount:0
            })
        }
        setIsPaid(prev => !prev)
    }

    const updateTheCourseInfo = e => {
        e.preventDefault()
        
        let courseData = {isPaid}
        
        for (let key in info) {
            if(info[key]) {
                courseData[key] = info[key]
            }
        }
        dispatch(actions.courses.updateCourse(data._id, courseData))
    }

   
    const clearUpdateCourseAlert = _ => {
        dispatch({type:constants.courses.UPDATE_COURSE_RESET})
    }
    
    useEffect(() => {
     data && setIsPaid(data.isPaid)
    },[data])
   
   useEffect(() => {
      message && setInfo({
        name:'',
        description:'',
        trailer:'',
        price:'',
        discount:'',
        isPaid:''
    })
    },[message])

    return (
    
    <Form>

        <SideAlert
        type='danger'
        position='left'
        time={3000}
        isOn={error ? true : false}
        text={error}
        reset={() => clearUpdateCourseAlert()}
        />

        <SideAlert
        type='success'
        position='left'
        time={3000}
        isOn={message ? true : false}
        text={message}
        reset={() => clearUpdateCourseAlert()}
        />

        <h2 className={style.course__level}> General Information </h2>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control 
            type="text" 
            placeholder={data.name}
            name='name' 
            value={info.name}
            onChange={(e) => getCourseInfo(e)}/>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Course Description</Form.Label>
            <Form.Control 
            as='textarea'
            name='description' 
            row={8} 
            placeholder={data.description || 'N/A'}
            value={info.description}
            onChange={(e) => getCourseInfo(e)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicVideo">
            <Form.Label>Trailer</Form.Label>
            <Form.Control 
            type="text"
            name='trailer' 
            placeholder={data.trailer || 'N/A'} 
            value={info.trailer}
            onChange={(e) => getCourseInfo(e)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Course Price</Form.Label>
            <Form.Control 
            type="number"
            name='price' 
            placeholder={data.price} 
            value={info.price}
            onChange={(e) => getCourseInfo(e)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Course Discount</Form.Label>
            <Form.Control 
            type="number"
            name='discount' 
            placeholder={data.discount} 
            value={info.discount}
            onChange={(e) => getCourseInfo(e)}/>
        </Form.Group>
        
        <Form.Check 
            type="switch"
            id="custom-switch"
            label={isPaid ? 'Paid Course' : 'Free Course'}
            value={isPaid}
            onChange={switchCourseState}
        />
        
        <div className={style.course__submit}>
            
            <Button  
            variant="primary" 
            type="submit"
            size='lg' 
            disabled={loading ? true : false}
            onClick={updateTheCourseInfo}>
                Update
            </Button>
        
            { loading && <Loader size='4' options={{animation:'border'}}/> }
        </div>
    </Form> 
)}

export default CourseData