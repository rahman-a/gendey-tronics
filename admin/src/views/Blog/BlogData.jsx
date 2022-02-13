import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHTML from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Trash} from '../../icons'
import {Loader, SideAlert} from '../../components'
import actions from '../../actions'


const BlogData = ({data}) => {
    const blocksFromHtml = htmlToDraft(data.body);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))
    
    const [info, setInfo] = useState({
        title:'',
        body:'',
    })

    const [deleteModal, setDeleteModal] = useState(false)

    const navigate = useHistory().push

    const {loading, error, message} = useSelector(state => state.updateBlog)
    
    const {
        loading:delete_loading, 
        error:delete_error, 
        message:delete_message
    } = useSelector(state => state.deleteBlog)

    const dispatch = useDispatch()
  
    const editorToolbarOptions = ['inline', 'blockType', 'fontSize', 'fontFamily', 'textAlign',
     'colorPicker', 'link', 'emoji']
    
    
    const getBlogInfo = e => {
        const value = {[e.target.name]:e.target.value} 
        setInfo({...info, ...value})
    }

    const updateTheBlogInfo = e => {
        e.preventDefault()
        
        let blogData = {}
        
        for (let key in info) {
            if(info[key]) {
                blogData[key] = info[key]
            }
        }
        dispatch(actions.blogs.updateBlog(data._id, blogData))
    }

    const initiateDeleteProcess = e => {
        e.preventDefault()
        setDeleteModal(true)
    }
    
    const deleteProductHandler = e => {
        e.preventDefault()
        dispatch(actions.blogs.deleteBlog(data._id))
    }
    
    useEffect(() => {
        if(delete_message) {
            setDeleteModal(false)
            setTimeout(() => {
                navigate('/blogs')
            },2000)
        } 
    },[delete_message])
    
    useEffect(() => {
      message && setInfo({
       title:'',
       body:'',
    })
    },[message])

    useEffect(() => {
     if(editorState) {
         setInfo({...info, body: draftToHTML(convertToRaw(editorState.getCurrentContent()))})
     } 
    },[editorState])

    return (
    <>
      <SideAlert
        type='danger'
        position='left'
        isOn={error ? true : false}
        text={error}
        />

      <SideAlert
        type='danger'
        position='left'
        isOn={delete_error ? true : false}
        text={delete_error}
        />

      <SideAlert
        type='success'
        position='left'
        isOn={message ? true : false}
        text={message}
        />

    <SideAlert
        type='success'
        position='left'
        time={1200}
        isOn={delete_message ? true : false}
        text={delete_message}
        />  


        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            
            <Modal.Header>
                <p style={{display:'flex', alignItems:'center'}}>
                <Trash/>  &nbsp; {data.name}
                </p>
            </Modal.Header>
            
            <Modal.Body>
              {delete_loading && <Loader size='8' center options={{animation:'border'}}/> }  
                <div style={{textAlign:'center'}}>
                    <h3 style={{color:'red', fontWeight:'300'}}> Are You Sure? </h3>
                    <p style={{margin:'1rem 0'}}> Do you really want to delete the blog </p> 
                    <p style={{margin:'1rem 0'}}> This Process Can't be undone </p>
                </div>
            </Modal.Body>
            
            <Modal.Footer>
                <Button 
                    variant='primary'
                    size='lg'
                    disabled={delete_loading ? true : false} 
                    onClick={() => setDeleteModal(false)}>
                    NO, Don't Delete
                </Button>
                <Button 
                    variant='danger' 
                    size='lg' 
                    disabled={delete_loading ? true : false}
                    onClick={deleteProductHandler}>
                    YES, Delete Product
                </Button>
            </Modal.Footer>
        </Modal>

        <Form>

            <div style={{ 
                    border: "1px solid black", 
                    padding: '2px', 
                    minHeight: '400px', 
                    margin:'1rem 0'}}>
                    
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Blog Title
                            <sup style={{color:'red'}} title='required'>*</sup> 
                        </Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder={data.title}
                        name='title' 
                        value={info.title}
                        onChange={(e) => getBlogInfo(e)}/>
                    </Form.Group>
                    
                    <p style={{marginBottom:'1rem'}}> Blog Body 
                        <sup style={{color:'red'}} title='required'>*</sup>
                    </p>
                    <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        options: editorToolbarOptions
                    }}
                    />
                
                </div>
            
            
            
            
            <div className={style.blog__submit}>
                
                <Button  
                variant="primary" 
                type="submit"
                size='lg' 
                disabled={loading ? true : false}
                onClick={updateTheBlogInfo}>
                    Update
                </Button>
                
                <Button  
                variant="danger" 
                type="submit"
                size='lg'
                disabled={loading ? true : false}
                onClick={initiateDeleteProcess}>
                    Delete
                </Button>

               { loading && <Loader size='4' options={{animation:'border'}}/> }
            </div>
        </Form> 
    </>
)}

export default BlogData