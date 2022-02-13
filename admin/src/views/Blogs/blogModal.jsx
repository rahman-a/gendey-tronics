import React, {useEffect} from 'react'
import style from './style.module.scss'
import {Modal, Button, Badge} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import constants from '../../constants'
import {Comments} from '../../icons'
import Comment from './Comment'

const BlogModal = ({toggleComments, setToggleComments, comments, blog}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        return () => dispatch({type: constants.blogs.DELETE_BLOG_COMMENT_RESET})
    },[])
    
    return (
    <Modal show={toggleComments} onHide={() => setToggleComments(false)}>
        <Modal.Header>
            <div style={{display:'flex', position:'relative'}}>
            <span style={{marginRight:'1rem'}}> <Comments/> </span>
            <span style={{fontSize:'1.8rem'}}> Comments </span>
        </div>
        </Modal.Header>
        <Modal.Body>
            <div className={style.blogs__comments}>
                {
                    comments.length === 0 
                    ? <Badge bg='danger'> NO COMMENTS </Badge> 
                    :comments.map(comment => (
                        <Comment key={comment._id} comment={comment} blog={blog}/>
                    ))
                }
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button size='lg' variant='danger' onClick={() => setToggleComments(false)}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default BlogModal