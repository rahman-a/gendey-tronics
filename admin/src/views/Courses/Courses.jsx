import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Dropdown} from 'react-bootstrap'
import {
  Table, 
  Input, 
  Loader, 
  Pagination, 
  HeaderAlert,
  DropdownMenu,
  SideAlert,
  CreateEnrollment,
  Coupons
} from '../../components'

import {EllipsesVertical} from '../../icons'
import actions from '../../actions'
import constants from '../../constants'
import Row from './Row'

const Courses = () => {
  const [isEnrollment, setIsEnrollment] = useState(false)
  const [isCoupons, setIsCoupons] = useState(false)
  const [filter, setFilter] = useState(null)
  const [skipValue, setSkipValue] = useState(0)
  const dispatch = useDispatch()
  const {loading, error, courses, count} = useSelector(state => state.listAllCourses)
  const {
    message,
    error:delete_error
} = useSelector(state => state.deleteCourse)

  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    const query = {...filter, ...skip}  
    dispatch(actions.courses.listCourses(query))
  }

  const getProductFilterQuery = e => {
    const value = {[e.target.name]: e.target.value}
    setFilter({...filter, ...value})
  }

  const searchProductHandler = _ => {
    dispatch(actions.courses.listCourses({...filter}))
  }

  
  useEffect(() => {
    dispatch(actions.courses.listCourses())
    return () => dispatch({type: constants.courses.DELETE_COURSE_RESET})
  },[])
  return (
    <>
      <SideAlert 
        type='danger' 
        text={delete_error}
        isOn={delete_error ? true : false}/>

       <SideAlert 
        type='success' 
        text={message}
        isOn={message ? true : false}/>

        <CreateEnrollment
        isEnrollment={isEnrollment}
        setIsEnrollment={setIsEnrollment}
        />

        <Coupons
        isCoupon={isCoupons}
        setIsCoupon={setIsCoupons}
        />
    
      <div className={style.courses}>

      <Dropdown 
        className={style.courses__enrollment}
        variant='dark'
        id="dropdown-item-button"
        align="end"
        >
        <Dropdown.Toggle 
        variant="dark" 
        id="dropdown-basic"
        style={{cursor:'pointer'}}
        as={EllipsesVertical}/>
        
        <Dropdown.Menu>
          <Dropdown.Item className='fs-4' as="button" onClick={() => setIsEnrollment(true)}>
            Create Enrollment
          </Dropdown.Item>
          <Dropdown.Item className='fs-4' as="button" onClick={() => setIsCoupons(true)}>
            Coupons
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
       
        <h1 className='main-header'>Courses List</h1>
        
        <div className={style.courses__filter}>
              <Input
              type="text" 
              name='name' 
              onChange={(e) => getProductFilterQuery(e)}
              placeholder='search by course name....'
              className={style.courses__search}
              />

              <Input
              type="text" 
              name='price' 
              onChange={(e) => getProductFilterQuery(e)}
              placeholder='search by course price ex 500:800....'
              className={style.courses__search}
              />

              <Input
              type="text" 
              name='students' 
              onChange={(e) => getProductFilterQuery(e)}
              placeholder='search by student number ex 200:400....'
              className={style.courses__search}
              />

            <div style={{width:'20rem', marginRight:'1.5rem'}}>
              <DropdownMenu
              onSelectHandler={(value) => setFilter({...filter, rating:value})}
              data={{
                label:'search by rating...',
                items:[
                  {text:'search by rating...', value:''},
                  {text:'0.5', value:0.5},
                  {text:'1.0', value:1},
                  {text:'1.5', value:1.5},
                  {text:'2.0', value:2},
                  {text:'2.5', value:2.5},
                  {text:'3.0', value:3},
                  {text:'3.5', value:3.5},
                  {text:'4.0', value:4},
                  {text:'4.5', value:4.5},
                  {text:'5.0', value:5},
                ]
              }}
              />
            </div>

              <Button 
              variant='warning' 
              size='lg'
              onClick={searchProductHandler}> 
                SEARCH 
              </Button>

          </div>

        { loading
        ? <Loader size='10' options={{animation:'border'}}/>
        : error 
        ? <HeaderAlert type='danger' size='3' text={error}/>
        :<>
        <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Students</th>
                <th>Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                courses && courses.map((course, idx) => (
                  <tr key={course._id}>
                    <Row 
                    course={course} 
                    idx={idx + skipValue}/>
                  </tr>
                ))
              }
            </tbody>
          </Table>
            {
              count > 10 &&
              <Pagination
              count={Math.ceil(count / 10)}
              moveToPageHandler={(skip) => fetchNextRowsHandler(skip)}/>
            } 
          </>
          }
      </div>
    </>
  )
}

export default Courses