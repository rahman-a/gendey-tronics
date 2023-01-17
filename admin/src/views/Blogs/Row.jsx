import React, {useState, useEffect} from 'react';
import {Modal, Button, Badge} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './style.module.scss'
import {Times, Check, Copy, Edit, Eye} from '../../icons'
import {Loader} from '../../components'
import actions from '../../actions';
import UserModal from './userModal';
import BlogModal from './blogModal';

const Row = ({blog, idx}) => {
    const [toggleComments, setToggleComments] = useState(false)
    const [blogId, setBlogId] = useState(null)
    const [userData, setUserData] = useState(null)
    const [toggleUser, setToggleUser] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const history = useHistory()
    const dispatch  = useDispatch()
    const { message } = useSelector(state => state.deleteBlog)

    const dateOptions = {
        month:'long',
        year:'numeric',
        day:'numeric'
    }
    
    const copyIdHandler = _ => {
      setIsCopied(true)
      setTimeout(() => {
          setIsCopied(false)
      },500)
    }
    
    
    const initiateDeleteProcess  = id => {
        setBlogId(id)
        setConfirmDelete(true)
    }

    const confirmDeleteBlogHandler = _ => {
        setConfirmDelete(false)
        setIsDeleting(true)
        setTimeout(() => {
          dispatch(actions.blogs.deleteBlog(blogId))
        },500)
        
      }

    const showUserData = (user) => {
        setUserData(user)
        setToggleUser(true)
    }
    
    useEffect(() => {
        message && setIsDeleting(false)
    },[message])

  
  return <>
        
        {   userData && <UserModal 
            toggleUser={toggleUser}
            setToggleUser={setToggleUser}
            userData={userData}/> 
        } 

        {
         <BlogModal
           toggleComments={toggleComments}
           setToggleComments={setToggleComments}
           comments={blog.comments}
           blog={blog._id}/> 
        }


        
        <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
          <Modal.Body>
            <p className={style.blogs__confirmDelete}
            style={{fontSize:'2rem'}}> Are you sure?</p>
            <p className={style.blogs__confirmDelete}>Do You Really want to delete the blog permanently.</p> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" size='lg' onClick={() => setConfirmDelete(false)}>
              NO, Don't Delete
            </Button>
            <Button variant="danger" size='lg' onClick={confirmDeleteBlogHandler}>
              YES, Delete
            </Button>
          </Modal.Footer>
        </Modal>

    {
        <>
            <td>{idx + 1}</td>
            <td className='row-id'>
                <CopyToClipboard text={blog._id} onCopy={copyIdHandler}>
                    <span>
                    {isCopied ? <Check/> :<Copy/>} 
                    </span>
                </CopyToClipboard>
                { blog._id.substring(0,12) + '...' }
            </td>
            <td>{blog.title}</td>
            <td>
                <img className='row-photo' src={`/api/images/${blog.image}`} alt={blog.title} />
            </td>
            <td className={style.blogs__name}>
            {
                <span onClick={() => showUserData(blog.author)}> 
                    {blog.author.firstName + ' ' + blog.author.lastName} 
                </span>  
            }
            </td>
            <td>
                {
                blog.seen === 0 
                ? <Badge bg='dark'> no views </Badge>
                : blog.seen
                }
            </td>
            <td>
                {
                    blog.comments.length === 0 
                    ? <Badge bg='danger'> No Comments </Badge>
                    :<span style={{color:'green', cursor:'pointer'}}
                    onClick={() => setToggleComments(true)}>
                        <Eye/> 
                    </span>
                }
                
                
            </td>
            <td>
                {
                    new Date(blog.createdAt).toLocaleDateString('en-US', dateOptions)
                }
            </td>
            <td className={style.blogs__action}>
                <span className={style.blogs__delete}
                style={{position:'relative'}}>
                    {
                    isDeleting 
                    ? <Loader size='4' center options={{animation:'border'}}/>
                    : <span style={{cursor:'pointer'}} onClick={() => initiateDeleteProcess(blog._id)}> 
                        <Times/> 
                    </span> 
                    }
                </span> 
                <span className={style.blogs__edit}
                style={{position:'relative'}}>
                    <span style={{cursor:'pointer'}} onClick={() => history.push(`/blogs/${blog._id}`)}> 
                        <Edit/> 
                    </span> 
                </span> 
            </td>
        </>
    }
  </>
};

export default Row;