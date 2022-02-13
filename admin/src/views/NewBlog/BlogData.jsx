import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Form, Button, Alert} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHTML from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Loader} from '../../components'

const BlogData = ({saveBlogInfo, loading, info, setInfo, imageRef}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const [errors, setErrors] = useState(null)

    const {message} = useSelector(state => state.createNewBlog)

    const editorToolbarOptions = ['inline', 'blockType', 'fontSize', 'fontFamily', 'textAlign',
     'colorPicker', 'link', 'emoji']
    
    
    const getBlogInfo = e => {
        const value = {[e.target.name]:e.target.value} 
        setInfo({...info, ...value})
    }

    const isFormValid = _ => {
        const values = [] 
        for(let key in info) {
            if(info[key]) {
                values.push(info[key])
            }
        }
        if(!values.length) {
            setErrors('Please Provide The Required Data...')
            return false
        }
        if(!info.title) {
            setErrors('Please Provide The Blog Title...')
            return false
        }
        if(info.body.length < 50) {
            setErrors('Please Write Content Minimum Length 50 Characters')
            return false
        }
        if(!info.image) {
            setErrors('Please Upload The Blog Image...')
            return false
        }

        return true
    }
    
    const saveTheBlogInfo = e => {
        e.preventDefault()
        
        if(isFormValid()) {

            let blogData = {}
            
            for (let key in info) {
                if(info[key]) {
                    blogData[key] = info[key]
                }
            }
            saveBlogInfo(blogData)
        }
    }

    useEffect(() => {
        if(message) {
            setEditorState(() => EditorState.createEmpty())
        }
    },[message])
    
    useEffect(() => {
     if(editorState)  {
        setInfo({...info, body:draftToHTML(convertToRaw(editorState.getCurrentContent()))})
     }
    },[editorState])

    return (
    <>
        <div className={style.blog__form}>
        
        {
            errors && 
            <Alert 
            variant='danger' 
            className='text-center'> 
                {errors}
                <Button variant='outline-danger' onClick={() => setErrors(null)}>
                    Close
                </Button>               
            </Alert>
        } 

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
                        placeholder='Add Blog Title'
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
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>upload the Blog Image 
                        <sup style={{color:'red'}} title='required'>*</sup>
                    </Form.Label>
                    <Form.Control
                    ref={imageRef}
                    type="file"  
                    size='lg'
                    onChange={(e) => setInfo({...info, image:e.target.files[0]})}/>
                </Form.Group>
                
                <div className={style.blog__submit}>
                    <Button  
                        variant="primary" 
                        type="submit"
                        size='lg' 
                        disabled={loading ? true : false}
                        onClick={saveTheBlogInfo}>
                            Save
                    </Button>
                  {loading && <Loader size='4' options={{animation:'border'}}/> }
                </div>
                
            </Form> 
        </div>
    </>
)}

export default BlogData