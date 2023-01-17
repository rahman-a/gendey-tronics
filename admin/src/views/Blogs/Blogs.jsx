import React, {useState, useEffect, useRef} from 'react'
import style from './style.module.scss'
import {Button, Popover, Overlay} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import {
  Input, 
  Table, 
  Loader, 
  HeaderAlert, 
  Pagination,
  SideAlert
} from '../../components'
import Row from './Row'


const Blogs = () => {
  const [filter, setFilter] = useState(null)
  const [skipValue, setSkipValue] = useState(0)
  const [popover, setPopover] = useState(false) 
  const [popoverTarget, setPopoverTarget] = useState(null)
  const popoverRef = useRef(null)
  const {loading, error, count,  blogs} = useSelector(state => state.listAllBlogs)
  const {message, error: delete_error} = useSelector(state => state.deleteBlog)
  const {message:comment_message, error:comment_error} = useSelector(state => state.deleteBlogComment)
  
  const dispatch = useDispatch()
 
  const fetchNextRowsHandler = (skip) => {
    setSkipValue(skip.skip)
    const query = {...filter, ...skip}  
    dispatch(actions.blogs.listBlogs(query))
  }
  
    const getBlogFilterQuery = e => {
      const value = {[e.target.name]: e.target.value}
      setFilter({...filter, ...value})
    }
    
    const searchBlogHandler = _ => {
      dispatch(actions.blogs.listBlogs({...filter}))
    }

    const showPopoverToggle = (event) => {
      setPopover(!popover);
      setPopoverTarget(event.target);
    };
    
    const popoverContent = (
      <Popover id="popover-basic">
        <Popover.Body>
         <span style={{fontSize:'1.2rem'}}> 
           search by typing views range eg (100-200) 
          </span> 
        </Popover.Body>
      </Popover>
    );
    
    
    useEffect(() => {
      return () => dispatch({type: constants.blogs.DELETE_BLOG_RESET})
    },[])
  
    useEffect(() => {
      dispatch(actions.blogs.listBlogs())
    },[message])
  
    return (
    <div className={style.blogs}>
       
       <SideAlert 
        type='danger' 
        text={delete_error}
        isOn={delete_error ? true : false}/>

       <SideAlert 
        type='success' 
        text={message}
        isOn={message ? true : false}/>

      <SideAlert 
        type='danger' 
        text={comment_error}
        isOn={comment_error ? true : false}/>

       <SideAlert 
        type='success' 
        text={comment_message}
        isOn={comment_message ? true : false}/>
       
       <h1 className='main-header'>Blogs List</h1>
    
       <div className={style.blogs__filter}>
            <Input
            type="text" 
            name='title' 
            onChange={(e) => getBlogFilterQuery(e)}
            placeholder='search by blog title....'
            className={style.blogs__search}
            />

          <div ref={popoverRef}
          style={{transform:'translateY(-5px)'}}>
              <Input
                type="text" 
                name='views' 
                placeholder='search by blog views....'
                onChange={(e) => getBlogFilterQuery(e)}
                options={{
                  autoComplete:'off',
                  onFocus:showPopoverToggle
                }}
                
                className={style.orders__search_input}
              />
               <Overlay
               show={popover}
               target={popoverTarget}
               placement="top"
               container={popoverRef}
               containerPadding={20}>
                  {popoverContent}
              </Overlay>
          </div>

            <Button 
            variant='warning' 
            onClick={searchBlogHandler}> 
              SEARCH 
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
                  <th>Title</th>
                  <th>Image</th>
                  <th>Author</th>
                  <th>Views</th>
                  <th>comments</th>
                  <th>Created At</th>
                  <th></th>
                </thead>
                <tbody>
                  {
                    blogs && blogs.map((blog, idx) => (
                      <tr key={blog._id}>
                        <Row 
                        blog={blog} 
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