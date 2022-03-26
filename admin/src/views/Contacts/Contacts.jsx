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
  const {loading, error, count,  contacts} = useSelector(state => state.listContacts)
  const {message, error: delete_error} = useSelector(state => state.deleteContact)
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email') 
  
  const dispatch = useDispatch()
 
  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    const query = {...filter, ...skip}  
    dispatch(actions.calls.listCalls(query))
  }
  
    const getContactFilterQuery = e => {
      const value = {[e.target.name]: e.target.value}
      setFilter({...filter, ...value})
    }
    
    const searchContactHandler = _ => {
      dispatch(actions.contacts.listContacts({...filter}))
    }

    const resetSearchHandler = _ => {
      dispatch(actions.contacts.listContacts())
    }
 
    useEffect(() => {
      email && dispatch(actions.contacts.listContacts({email}))
    },[email])

    useEffect(() => {
        contacts && console.log({contacts});
    },[contacts])
  
    useEffect(() => {
     !email && dispatch(actions.contacts.listContacts())
      return () => dispatch({type: constants.contacts.DELETE_CONTACT_RESET})
    },[])
  
    return (
    <div className={style.contacts}>
       
       <SideAlert 
        type='danger' 
        text={delete_error}
        isOn={delete_error ? true : false}/>

       <SideAlert 
        type='success' 
        text={message}
        isOn={message ? true : false}/>
       
       <h1 className='main-header'>Contacts List</h1>
    
       <div className={style.contacts__filter}>
            <Input
            type="text" 
            name='email' 
            onChange={(e) => getContactFilterQuery(e)}
            placeholder='search by E-mail....'
            className={style.contacts__search}
            />

          <Input
            type="text" 
            name='name' 
            onChange={(e) => getContactFilterQuery(e)}
            placeholder='search by sender name....'
            className={style.contacts__search}
            />

          <Input
            type="text" 
            name='phone' 
            onChange={(e) => getContactFilterQuery(e)}
            placeholder='search by phone number....'
            className={style.contacts__search}
            />

              <DropdownMenu
              data={{
                label:'Read State',
                items:[
                  {text:'Read Message', value:'true'},
                  {text:'Unread Message', value:'false'}
                ]
              }}
              onSelectHandler={(value) => setFilter({...filter, isRead:value})}
              />

            <Button 
            variant='warning'
            size='lg'
            onClick={searchContactHandler}> 
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
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>SentAt</th>
                  <th></th>
                </thead>
                <tbody>
                  {
                    contacts && contacts.map((contact, idx) => (
                      <tr key={contact._id} 
                      className={!contact.isRead ? style.contacts__notRead : ''}>
                        <Row 
                        contact={contact} 
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