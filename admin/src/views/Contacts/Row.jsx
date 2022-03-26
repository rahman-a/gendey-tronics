import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './style.module.scss'
import {Times, Check, Copy, EyeSlash, Reader, Eye} from '../../icons'
import {Loader, NoteModal} from '../../components'
import actions from '../../actions';

const Row = ({contact, idx}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [isMessageOn, setIsMessageOn] = useState(false)
    const dispatch  = useDispatch() 
    const { message } = useSelector(state => state.deleteContact)
    const { message:toggle_message } = useSelector(state => state.toggleContact)

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
    
    
    const initiateDeleteProcess  = _ => {
        setConfirmDelete(true)
    }

    const confirmDeleteContactHandler = _ => {
        setConfirmDelete(false)
        setIsDeleting(true)
        setTimeout(() => {
          dispatch(actions.contacts.deleteContact(contact._id))
        },500)
        
    }

    const toggleTheContact = _ => {
        setIsToggling(true)
        dispatch(actions.contacts.toggleContact(contact._id))
    }

    useEffect(() => {
        message && setIsDeleting(false)
    },[message])

    useEffect(() => {
        toggle_message && setIsToggling(false)
    },[toggle_message])

  
  return <>
    
         
     <NoteModal
        isNoteOn={isMessageOn}
        setIsNoteOn={setIsMessageOn}
        note={contact.message}
        />

        
        <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
          <Modal.Body>
            <p className={style.contacts__confirmDelete}
            style={{fontSize:'2rem'}}> Are you sure?</p>
            <p className={style.contacts__confirmDelete}>Do You Really want to delete the message permanently.</p> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" size='lg' onClick={() => setConfirmDelete(false)}>
              NO, Don't Delete
            </Button>
            <Button variant="danger" size='lg' onClick={confirmDeleteContactHandler}>
              YES, Delete
            </Button>
          </Modal.Footer>
        </Modal>

    {
        <>
            <td>{idx + 1}</td>
            <td className='row-id'>
                <CopyToClipboard text={contact._id} onCopy={copyIdHandler}>
                    <span>
                    {isCopied ? <Check/> :<Copy/>} 
                    </span>
                </CopyToClipboard>
                { contact._id.substring(0,12) + '...' }
            </td>    
            
            <td> {contact.name} </td>
            
            <td> {contact.email} </td>
            <td> {contact.phone} </td>
            
            <td style={{padding:'0'}}>
                <p className={style.contacts__message}> 
                    <span onClick={() => setIsMessageOn(true)}><Reader/></span> 
                    <i style={{lineBreak:'anywhere', padding:'0 0.8rem'}}>
                        { contact.message?.substring(0, 35) + '...' }
                    </i> 
                </p>  
            </td>
            
            <td>
                {
                    new Date(contact.createdAt).toLocaleDateString('en-US', dateOptions)
                }
            </td>
            <td className={style.contacts__action}>
                <span className={style.contacts__delete}
                style={{position:'relative'}}>
                    {
                    isDeleting 
                    ? <Loader size='4' center options={{animation:'border'}}/>
                    : <span style={{cursor:'pointer'}} onClick={initiateDeleteProcess}> 
                        <Times/> 
                    </span> 
                    }
                </span> 
                <span className={style.contacts__edit}
                style={{position:'relative'}}>
                    
                    {
                        isToggling 
                        ? <Loader size='4' center options={{animation:'border'}}/>
                        : <span title='mark call as done' style={{cursor:'pointer'}} onClick={toggleTheContact}> 
                          {contact.isRead ? <EyeSlash/> : <Eye/> } 
                        </span> 
                    }
                    
                   
                </span> 
            </td>
        </>
    }
  </>
};

export default Row;