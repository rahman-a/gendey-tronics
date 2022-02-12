import React, {useState,useEffect} from 'react';
import style from './style.module.scss'
import Row from './Row'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Table, Pagination, HeaderAlert, SideAlert, Input} from '../../components'
import actions from '../../actions';
import constants from '../../constants';

const Users = () => {
  
  const [nameSearch, setNameSearch] = useState(null)
  const [skipValue, setSkipValue] = useState(0)
  const dispatch  = useDispatch()
  
  const {loading, error, users, count} = useSelector(state => state.listAllUsers)
  const {
    message,
    error:delete_error
  } = useSelector(state => state.deleteUser)
  
  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    const query = nameSearch ? {name:nameSearch, ...skip} : skip
    dispatch(actions.users.listAllUsers(query))
  }
  
  const searchUserHandler = name => {
    setNameSearch(name.name)
    dispatch(actions.users.listAllUsers(name))
  }

  useEffect(() => {
    return () => dispatch({type: constants.users.DELETE_USER_RESET})
  },[])

  useEffect(() => {
    dispatch(actions.users.listAllUsers())
  },[message])
  
  return <div className={style.users}>
        
        <SideAlert 
        type='danger' 
        text={delete_error}
        isOn={delete_error ? true : false}/>

      <SideAlert 
        type='success' 
        text={message}
        isOn={message ? true : false}/>
        
        <h1>Users List</h1>

        <Input
         type="text" 
         name='search' 
         onChange={(e) => searchUserHandler({name:e.target.value})}
         placeholder='search by first name....'
         className={style.users__search}
        />

       
       
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail Address</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.map((user, idx) => (
                <tr key={user._id}>
                  <Row 
                  user={user} 
                  idx={idx  + skipValue}/>
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
        
  </div>;
};

export default Users;
