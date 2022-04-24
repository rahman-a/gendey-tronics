import React, {useState} from 'react'
import style from './style.module.scss'
import { Button, Alert} from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHTML from 'draftjs-to-html'
import { useDispatch, useSelector } from 'react-redux'
import {Loader} from '../../components'
import actions from '../../actions'
import constants from '../../constants'

const About = ({about}) => {
    const blocksFromHtml = htmlToDraft(about);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))
    const dispatch = useDispatch()
    const {loading, error, message} = useSelector(state => state.updateAdminInfo)
    const editorToolbarOptions = ['inline','fontSize', 'fontFamily']

    const clearAlert = () => {
        dispatch({type:constants.admin.UPDATE_ADMIN_INFO_RESET})
    }
    
    const updateAboutHandler = e => {
        e.preventDefault()
        clearAlert()
        const about = draftToHTML(convertToRaw(editorState.getCurrentContent()))
        dispatch(actions.admin.updateAdminInfo({about}))
    }

    return (
        <div className={style.profile__about}>
            <div style={{height:'4rem'}}>
                {
                loading 
                ? <Loader size="4" options={{animation:'border'}}/>
                : error 
                ? <Alert variant="danger" onClose={clearAlert} dismissible> {error} </Alert>
                : message 
                && <Alert variant="success" onClose={clearAlert} dismissible>{message}</Alert>
                }
            </div>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                editorClassName={style.profile__about_editor}
                toolbar={{
                    options: editorToolbarOptions
                }}
            />
            <Button  
                variant="primary" 
                type="submit"
                size='lg' 
                disabled={loading ? true : false}
                onClick={updateAboutHandler}>
                    Update
            </Button>
        </div>
    )
}

export default About