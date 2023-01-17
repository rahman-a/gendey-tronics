import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHTML from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import {SideAlert, Loader} from '../../components'
import actions from '../../actions'
import {PaperPlane} from '../../icons'
import constants from '../../constants';

const Send = ({isNewEmail, setIsNewEmail, isReplay, setIsReplay}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [sender, setSender] = useState('')
    const [subject, setSubject] = useState('')
    const [recipient, setRecipient] = useState('')
    const isSentEmailOpen = new URLSearchParams(useLocation().search).has('isSent')
    const dispatch = useDispatch()
    const {isLoading, error, message} = useSelector(state => state.sendEmail)
    const editorToolbarOptions = ['inline', 'fontSize']

    const sendEmail = () => {
        const data = {
            html: draftToHTML(convertToRaw(editorState.getCurrentContent())),
            sender,
            subject,
            recipient
        }

        dispatch(actions.support.sendEmail(data, isSentEmailOpen))
    }

    const clearAlert = () => {
        dispatch({type:constants.support.SEND_EMAIL_RESET})
    }


    const resetCreateEmail = () => {
        setIsNewEmail(false)
        setIsReplay(null)
        setEditorState(EditorState.createEmpty())
        setSender('')
        setSubject('')
        setRecipient('')
    }


    useEffect(() => {
       message && resetCreateEmail()
    },[message])

    useEffect(() => {
        if(isReplay){
            console.log({isReplay})
            setSender(isReplay.sender)
            setSubject(isReplay.subject)
            setRecipient(isReplay.recipient)
        }
    } ,[isReplay])
    
    return (
        <>
            <SideAlert
                isOn={message ? true :false}
                text={message}
                type='success'
                reset={() => clearAlert()}
            />
            <SideAlert
                isOn={error ? true :false}
                text={error}
                type='danger'
                reset={() => clearAlert()}
            />
            <Modal show={isNewEmail} onHide={resetCreateEmail}>
                <Modal.Header>
                    <Modal.Title> 
                        <span style={{marginRight:'0.5rem'}}> <PaperPlane/> </span> 
                        New E-mail
                    </Modal.Title>
                    <div className={style.support__sender}>
                        <Form.Select size='md' value={sender} onChange={(e) => setSender(e.target.value)}>
                            <option value=''>select sender E-mail</option>
                            <option value="noreplay@gendyecu.com">noreplay@gendyecu.com</option>
                            <option value="support@gendyecu.com">support@gendyecu.com</option>
                        </Form.Select>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className={style.support__mail}>
                        {isLoading && <div className={style.support__overlay}>
                            <Loader size='5' center options={{animation:'border'}}/>
                        </div> }
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                                <FormControl value={recipient} onChange={(e) => setRecipient(e.target.value)}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Subject</InputGroup.Text>
                                <FormControl value={subject} onChange={(e) => setSubject(e.target.value)}/>
                            </InputGroup>
                        </div>
                        <div>
                            <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            toolbar={{
                                options: editorToolbarOptions
                            }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={sendEmail}>Send</Button>
                    <Button variant="secondary" onClick={() => resetCreateEmail()}>Discard</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Send