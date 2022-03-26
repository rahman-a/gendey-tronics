import React, {useState, useEffect} from 'react';
import {Modal, Button, Badge} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './style.module.scss'
import {Times, Check, Copy, HandshakeSlash, Phone, Whatsapp, Zoom} from '../../icons'
import {Loader} from '../../components'
import actions from '../../actions';
import UserModal from './userModal';

const Row = ({call, idx}) => {
    const [userData, setUserData] = useState(null)
    const [toggleUser, setToggleUser] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const history = useHistory()
    const dispatch  = useDispatch() 
    const { message } = useSelector(state => state.deleteCall)
    const { message:toggle_message } = useSelector(state => state.toggleCall)

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

    const confirmDeleteCallHandler = _ => {
        setConfirmDelete(false)
        setIsDeleting(true)
        setTimeout(() => {
          dispatch(actions.calls.deleteCall(call._id))
        },500)
        
    }

    const toggleTheCall = _ => {
        if(!call.isDone) {
            setIsToggling(true)
            dispatch(actions.calls.toggleCall(call._id))
        }
    }

    const showUserData = _ => {
        setUserData(call.user)
        setToggleUser(true)
    }

    const navigateToProduct = _ => {
        history.push(`/products?name=${call.product.name}`)
    }
    
    useEffect(() => {
        message && setIsDeleting(false)
    },[message])

    useEffect(() => {
        toggle_message && setIsToggling(false)
    },[toggle_message])

  
  return <>
        
        {   userData && <UserModal 
            toggleUser={toggleUser}
            setToggleUser={setToggleUser}
            userData={userData}/> 
        } 

        
        <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
          <Modal.Body>
            <p className={style.calls__confirmDelete}
            style={{fontSize:'2rem'}}> Are you sure?</p>
            <p className={style.calls__confirmDelete}>Do You Really want to delete the call permanently.</p> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" size='lg' onClick={() => setConfirmDelete(false)}>
              NO, Don't Delete
            </Button>
            <Button variant="danger" size='lg' onClick={confirmDeleteCallHandler}>
              YES, Delete
            </Button>
          </Modal.Footer>
        </Modal>

    {
        <>
            <td>{idx + 1}</td>
            <td className='row-id'>
                <CopyToClipboard text={call._id} onCopy={copyIdHandler}>
                    <span>
                    {isCopied ? <Check/> :<Copy/>} 
                    </span>
                </CopyToClipboard>
                { call._id.substring(0,12) + '...' }
            </td>    
            <td className={style.calls__name}>
            {
                <span onClick={showUserData}> 
                    {call.user.firstName + ' ' + call.user.lastName} 
                </span>  
            }
            </td>
            
            <td className={style.calls__name}>
            {
                <span onClick={navigateToProduct}> 
                    {call.product.name} 
                </span>  
            }
            </td>

            <td> {call.phone} </td>
            <td className={style.calls__method}> 
            {
              call.method === 'phone'
              ? <Badge bg='danger' title='Phone'> <Phone/> </Badge>
              : call.method === 'whats'
              ? <Badge bg='success' title='whats up'> <Whatsapp/> </Badge>
              : call.method === 'zoom' && <Badge bg='primary' title='Zoom'> <Zoom/> </Badge>
            
            } 
            
            </td>
            
            
            <td> {call.isDone ? <Badge bg='success'>Done</Badge> : <Badge bg='warning'>Active</Badge>} </td>

            <td>
                {
                    new Date(call.createdAt).toLocaleDateString('en-US', dateOptions)
                }
            </td>
            <td className={style.calls__action}>
                <span className={style.calls__delete}
                style={{position:'relative'}}>
                    {
                    isDeleting 
                    ? <Loader size='4' center options={{animation:'border'}}/>
                    : <span style={{cursor:'pointer'}} onClick={initiateDeleteProcess}> 
                        <Times/> 
                    </span> 
                    }
                </span> 
                <span className={style.calls__edit}
                style={{position:'relative'}}>
                    
                    {
                        isToggling 
                        ? <Loader size='4' center options={{animation:'border'}}/>
                        : <span title='mark call as done' style={{cursor:'pointer'}} onClick={toggleTheCall}> 
                            <HandshakeSlash/> 
                        </span> 
                    }
                    
                   
                </span> 
            </td>
        </>
    }
  </>
};

export default Row;