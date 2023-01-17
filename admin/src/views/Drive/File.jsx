import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Popover, OverlayTrigger, Tooltip, Spinner} from 'react-bootstrap'
import {SideAlert} from '../../components'
import { FileCabinet } from '../../icons'
import actions from '../../actions'
import constants from '../../constants'

const File = ({file, isHorizontal}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    
    // just to make sure initiateFileDownload only work inside targeted component
    const [isKey, setIsKey] = useState(false)
    const dispatch = useDispatch()
    const {error, message} = useSelector(state => state.deleteFile)
    const {error:downloadError, fileData} = useSelector(state => state.downloadFile)
     
    const deleteDriveFileHandler = _ => {
        setIsDeleting(true)
        dispatch(actions.drive.deleteFile(file.id))
    }
    
    const getDownloadFileKay = () => {
        setIsDownloading(true) 
        setIsKey(true)
        dispatch(actions.drive.downloadFile(file.id))
    }
    
    const deletePermission = () => {
        dispatch(actions.drive.deletePermission(file.id))
    }
    
    const initiateFileDownload = () => {
        if(isKey) {
            // const link = `https://www.googleapis.com/drive/v3/files/${file.id}/?key=${key}&alt=media`
            const anchor = document.createElement('a')
            anchor.href = fileData.webContentLink
            anchor.click()
            setIsDownloading(false)
            setIsKey(false)
            setTimeout(() => {
                deletePermission()
            },30000)
        }
    }

      useEffect(() => {
        message && setIsDeleting(false)
      },[message])

      useEffect(() => {
        error && setIsDeleting(false)
      },[error])

      useEffect(() => {
        downloadError && setIsDownloading(false)
      },[downloadError])

      useEffect(() => {
        fileData && initiateFileDownload()
      },[fileData])
    

    const resetDeleteActions = _ => {
      return () => {
        dispatch({type:constants.drive.DELETE_FILE_RESET})
      }  
    }

    
    const confirmDelete = (
        <Popover id="popover-delete">
          <Popover.Header as="h3">Confirm Deleting The Asset</Popover.Header>
          <Popover.Body style={{textAlign:'-webkit-center'}}>
              {
                  isDeleting
                  ? <Spinner animation='border'/>
                  : <Button size='lg' variant='danger' onClick={deleteDriveFileHandler}>Delete</Button>
              }
          </Popover.Body>
        </Popover>
    )
    
    const confirmDownload = (
        <Popover id="popover-download">
          <Popover.Header as="h3">Confirm Downloading The Asset</Popover.Header>
          <Popover.Body style={{textAlign:'-webkit-center'}}>
              {
                  isDownloading 
                  ? <Spinner animation='border'/>
                  : <Button size='lg' variant='info' onClick={getDownloadFileKay}>Download</Button>
              }
             
          </Popover.Body>
        </Popover>
    )

    const deleteButton = (
        <OverlayTrigger 
           trigger="click" 
           placement="top" 
           overlay={confirmDelete}>
            <Button 
            disabled={isDeleting || isDownloading} 
            variant='danger'>
                Delete
            </Button>
        </OverlayTrigger>
    )

    const downloadButton = (
        <OverlayTrigger 
           trigger="click" 
           placement="top" 
           overlay={confirmDownload}>
             <Button disabled={isDownloading || isDeleting} variant='info'>Download</Button>
        </OverlayTrigger>
    )
  const shortText = (file.name || file.originalFilename).substring(0,17) + '...'
  const fullText = (file.name || file.originalFilename)

  return (
      <>
        <SideAlert
        text={message}
        type='success'
        isOn={message ? true : false}
        reset={resetDeleteActions}
        />

      <SideAlert
        text={error}
        type='danger'
        isOn={error ? true :false}
        reset={resetDeleteActions}
        />

    <SideAlert
        text={downloadError}
        type='danger'
        isOn={downloadError ? true :false}
        reset={() => dispatch({type:constants.drive.DOWNLOAD_FILE_RESET})}
        />
      
        <OverlayTrigger
         placement={isHorizontal ? 'left' : 'top'}
         overlay={<Tooltip style={{fontSize:'1.4rem'}} id="button-tooltip-2">{file.name || file.originalFilename}</Tooltip>}
        >
            <div className={`${style.drive__content_file} ${isHorizontal ? style.drive__content_horizontal  : ''}`}>
                <figure>
                    <img src="/images/zip_file.png" alt="file" />
                </figure>
                    <p> {isHorizontal ? fullText : shortText}  </p>
                <div>
                    <span>{deleteButton}</span>
                    <span>{downloadButton}</span>
                </div>
            </div>
        </OverlayTrigger>
      </>
  )
}
// "/images/zip_file.png"

export default File