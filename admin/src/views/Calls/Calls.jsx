import React, {useState, useEffect, useRef} from 'react'
import style from './style.module.scss'
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {useLocation} from 'react-router-dom'
import actions from '../../actions'
import constants from '../../constants'
import {
  Input, 
  Table, 
  Loader, 
  HeaderAlert, 
  Pagination,
  SideAlert,
  DropdownMenu
} from '../../components'
import Row from './Row'


const Blogs = () => {
  const [filter, setFilter] = useState(null)
  const [skipValue, setSkipValue] = useState(0)
  const {loading, error, count,  calls} = useSelector(state => state.listCalls)
  const {message, error: delete_error} = useSelector(state => state.deleteCall)
  const location = useLocation()
  const phone = new URLSearchParams(location.search).get('phone') 
  
  const dispatch = useDispatch()
 
  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    const query = {...filter, ...skip}  
    dispatch(actions.calls.listCalls(query))
  }
  
    const getCallFilterQuery = e => {
      const value = {[e.target.name]: e.target.value}
      setFilter({...filter, ...value})
    }
    
    const searchCallHandler = _ => {
      dispatch(actions.calls.listCalls({...filter}))
    }

    const resetSearchHandler = _ => {
      dispatch(actions.calls.listCalls())
    }
 
    useEffect(() => {
      phone && dispatch(actions.calls.listCalls({phone}))
    },[phone])
  
    useEffect(() => {
     !phone && dispatch(actions.calls.listCalls())
      return () => dispatch({type: constants.calls.DELETE_CALL_RESET})
    },[])
  
    return (
    <div className={style.calls}>
       
       <SideAlert 
        type='danger' 
        text={delete_error}
        isOn={delete_error ? true : false}/>

       <SideAlert 
        type='success' 
        text={message}
        isOn={message ? true : false}/>

       
       <h1 className='main-header'>Calls List</h1>
    
       <div className={style.calls__filter}>
            <Input
            type="text" 
            name='phone' 
            onChange={(e) => getCallFilterQuery(e)}
            placeholder='search by phone number....'
            className={style.calls__search}
            />

            <DropdownMenu
              data={{
                label:'call Method',
                items:[
                  {text:'Phone Call', value:'phone'},
                  {text:'Whats up', value:'whats'},
                  {text:'Zoom Meeting', value:'zoom'}
                ]
              }}
              onSelectHandler={(value) => setFilter({...filter, method:value})}
              />


              <DropdownMenu
              data={{
                label:'call state',
                items:[
                  {text:'Active Call', value:'false'},
                  {text:'Finished Call', value:'true'}
                ]
              }}
              onSelectHandler={(value) => setFilter({...filter, isDone:value})}
              />

            <Button 
            variant='warning'
            size='lg'
            onClick={searchCallHandler}> 
              SEARCH 
            </Button>
          
          <Button 
            variant='dark'
            size='lg'
            onClick={resetSearchHandler}> 
              RESET 
            </Button>
        </div>
    
        {
           loading
           ? <Loader size='10' options={{animation:'border'}}/>
           : error 
           ? <HeaderAlert type='danger' size='3' text={error}/>
           : <>
              <Table>
                <thead>
                  <th>#</th>
                  <th>Id</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Phone</th>
                  <th>Method</th>
                  <th>State</th>
                  <th>CreatedAt</th>
                  <th></th>
                </thead>
                <tbody>
                  {
                    calls && calls.map((call, idx) => (
                      <tr key={call._id}>
                        <Row 
                        call={call} 
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
  )
}

export default Blogs