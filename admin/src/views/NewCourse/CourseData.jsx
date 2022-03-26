import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {SideAlert} from '../../components'
import actions from '../../actions'

const CourseData = ({course, setCourse, labelString, setLabelString}) => {
    const [uploadError, setUploadError] = useState(null)
    const {loading, error, instructors} = useSelector(state => state.instructors)
    const dispatch = useDispatch()

    const getCourseInfo = e => {
        let value = null 
        if (e.target.name === 'price') {
            value = {price:parseInt(e.target.value)}
        } else {
            value = {[e.target.name]:e.target.value} 
        }
        setCourse({...course, ...value})
    }

    const switchCourseState = _ => {
        if(course.isPaid) {
            setCourse({...course, isPaid:!course.isPaid})
            return
        }
        setCourse({...course, isPaid:true})
    }

    const imageUploadHandler = e => {
        const image = e.target.files[0]
        console.log({image});
        const extension = image.type.split('/')[1]
        const allowedExtension = ["png","jpg","jpeg","PNG","JPG","JPEG"]
        if(!(allowedExtension.includes(extension))) {
            setUploadError('please upload following extension PNG or JPG')
            return
        }
        encodeImageFileAsURL(image)
        setLabelString(`Course-Hero-Image.${extension}`)
    }

    function encodeImageFileAsURL(file) {
        let reader = new FileReader();
        reader.onload = function(fileLoadedEvent) {
           setCourse({...course, image:fileLoadedEvent.target.result})
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
      if(course.image) {
        const mimeType = course.image.split(';')[0].split(':')[1]
        const extension = mimeType.split('/')[1]
        if(extension) setLabelString(`Course-Hero-Image.${extension}`)
      }
    },[course])

    useEffect(() => {
        dispatch(actions.courses.listInstructors())
    },[])

    return (
    <>
    
    <SideAlert
    type='danger'
    isOn={uploadError ? true :false}
    text={uploadError}
    time={5000}
    reset={() => setUploadError(null)}
    />
    
        <Form>
            <h2 className={style.course__level}> General Information </h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder={course.name || 'enter course name'}
                name='name' 
                onChange={(e) => getCourseInfo(e)}/>
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Course Description</Form.Label>
                <Form.Control 
                as='textarea'
                name='description' 
                row={8} 
                placeholder={course.description || 'type good description for course'}
                onChange={(e) => getCourseInfo(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicVideo">
                <Form.Label>Trailer</Form.Label>
                <Form.Control 
                type="text"
                name='trailer' 
                placeholder={course.trailer || 'enter trailer youtube link'}           
                onChange={(e) => getCourseInfo(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Course Price</Form.Label>
                <Form.Control 
                type="number"
                name='price' 
                placeholder={course.price || 'enter the price'}    
                onChange={(e) => getCourseInfo(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Course Discount</Form.Label>
                <Form.Control 
                type="number"
                name='discount' 
                placeholder={course.discount || 'enter discount if there is?'} 
                onChange={(e) => getCourseInfo(e)}/>
            </Form.Group>

            
            <Form.Group controlId="formLanguage" className="mb-3">
                <Form.Label>Choose The Course Language</Form.Label>
                <Form.Select name='language' onChange={(e) => getCourseInfo(e)}> 
                    <option value=''> ..... </option>
                    <option value="arabic" selected={course.language === 'arabic'}>Arabic</option>
                    <option value="english" selected={course.language === 'english'}>English</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="formInstructor" className="mb-3">
                <Form.Label>Course Instructor</Form.Label>
                <Form.Select name='instructor' onChange={(e) => getCourseInfo(e)}> 
                    <option value=''> ...... </option>
                    {
                        instructors && instructors.map(instructor => (
                            <option 
                            key={instructor._id} 
                            value={instructor._id}
                            selected={course.instructor === instructor._id}> 
                                {instructor.info.firstName + ' ' + instructor.info.lastName} 
                            </option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            
            <Form.Group controlId="formFile" className="mb-3">
                <label className={style.course__upload} 
                htmlFor='hero'> {labelString} </label>
                <input 
                type="file" 
                name='image' 
                id='hero'
                style={{display:'none'}}
                onChange={(e) => imageUploadHandler(e)}/>
            </Form.Group>
            
            <Form.Check 
                type="switch"
                id="custom-switch"
                label={course.isPaid ? 'Paid Course' : 'Free Course'}
                value={course.isPaid}
                onChange={switchCourseState}
            />
        </Form> 
    </>
)}

export default CourseData