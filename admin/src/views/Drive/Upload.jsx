import React, {useState, useEffect, useRef} from 'react'
import style from './style.module.scss'
import {Modal, Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Upload} from '../../icons'
import {Loader, ProgressBar, SideAlert} from '../../components'
import UploadFrom from './UploadFrom'
import actions from '../../actions'
import constants from '../../constants'

const UploadAction = ({isUpload, setIsUpload}) => {
    const [asset, setAsset] = useState(null)
    const [assetId, setAssetId] = useState(null)
    const [file, setFile] = useState(null)
    const [part, setPart] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [progressWidth, setProgressWidth] = useState(0)
    const [progressText, setProgressText] = useState('preparing file...')
    const chunkTracker = useRef(0)
    const dispatch = useDispatch()
    const {error, uploaded, message}  = useSelector(state => state.uploadFile)
    const {error:resume_error, message:resume_message, range} = useSelector(state => state.resumeFile)
    
    const divideFileIntoChunks = fileData => {
        const fileChunks = [];
        const maxBlob = 2.5 * 1024 * 1024; // each chunk size (2.5MB)
        let offset = 0;
        while (offset < fileData.size) {
            const chunkSize = Math.min(maxBlob, fileData.size - offset);
            fileChunks.push({
                blob: fileData.slice(offset, (offset + chunkSize)),
                start: offset,
                end: offset + chunkSize,
                length:fileData.size
            })
            offset += chunkSize;
        }
        return fileChunks;
    }


    const uploadFileHandler = async e => {
        
        if(file) {
            const chunks = divideFileIntoChunks(file)
            const formData = new FormData();
            formData.append('blob', chunks[chunkTracker.current].blob, file.name);
            formData.append('start', chunks[chunkTracker.current].start);
            formData.append('end', chunks[chunkTracker.current].end);
            formData.append('length', file.size);
            formData.append('id', assetId)
            formData.append('type', asset)
            formData.append('part', parseInt(part))
            dispatch(actions.drive.uploadFile(formData))
            setIsUploading(true)
        }
    }


    const resumeFileHandler = _ => {
        if(file && range) {
            console.log({range});
            const rangeValue = Number(range.replace(/\D/g, ''))
            const chunkSize = 2.5 * 1024 * 1024
            chunkTracker.current = Math.floor(rangeValue / chunkSize)
            const leftToUpload = file.size - rangeValue
            const progressValue = ((file.size - leftToUpload) * 100) / file.size
            setProgressText(`uploading in progress ${parseFloat(progressValue).toFixed(1)}%`)
            setProgressWidth(progressValue)
            uploadFileHandler()
        }
    }
    
    const checkPreviousDownloadStatus = async _ => {
        if(file) {
            dispatch(actions.drive.resumeFile({type:asset, id:assetId, size:file.size, part}))
        }
    }
    
    
    const resetAlert = () => {
        dispatch({type:constants.drive.UPLOAD_FILE_RESET})
        dispatch({type:constants.drive.RESUME_FILE_RESET})
    }

    const resetUploadHandler = _ => {
        setIsUpload(false)
        setIsUploading(false)
        setProgressWidth(0)
        setProgressText('preparing file...')
        chunkTracker.current = 0
        setFile(null)
        setAsset(null)
        setAssetId(null)
        resetAlert()
    }
    
    useEffect(() => {
      if(uploaded) {
        chunkTracker.current++
        uploadFileHandler()
        const progress = ((file.size - uploaded) * 100) / file.size
        setProgressText(`uploading in progress ${parseFloat(progress).toFixed(1)}%`)
        setProgressWidth(progress)
      } 
    },[uploaded])

    useEffect(() => {
        if(message) {
            console.log({message});
            setProgressWidth(100)
            setProgressText(message)
        } 
    },[message])

    useEffect(() => {
      range && resumeFileHandler();
    },[range])

    return (
    <Modal show={isUpload}>
        
        <SideAlert
          isOn={error ? true : false}
          text={error}
          type='danger'
          reset={() => resetAlert()}
        />

       <SideAlert
          isOn={resume_error ? true : false}
          text={resume_error}
          type='danger'
          reset={() => resetAlert()}
        />

        <SideAlert
          isOn={resume_message ? true : false}
          text={resume_message}
          type='success'
          reset={() => resetAlert()}
        />
        
        
        <Modal.Header>
              <p>
                <span style={{marginRight:'0.5rem'}}> <Upload/> </span>
                <span> Upload new Asset </span>
              </p>  
        </Modal.Header>
        <Modal.Body>
            <div className={style.drive__upload}>
               {
                   !isUploading && 
                   <div  className={style.drive__upload_type}>
                        <Button  
                        variant='info'
                        onClick={() => setAsset('product')}>
                            Product
                        </Button>
                        <Button 
                        className='mx-3' 
                        variant='warning'
                        onClick={() => setAsset('course')}>
                            Course
                        </Button>
                    </div>
               }
                { isUploading 
                ?  <div className={style.drive__progress}> 
                        <ProgressBar width={progressWidth} text={progressText}/> 
                    </div> 
                : asset && 
                    <UploadFrom 
                    uploadFileHandler={uploadFileHandler}
                    checkPreviousDownloadStatus={checkPreviousDownloadStatus} 
                    asset={asset} 
                    setId={setAssetId} 
                    setFile={setFile}
                    setPart={setPart}/> 
                }
            </div>
        </Modal.Body>
        <Modal.Footer>
             <Button variant='danger' onClick={resetUploadHandler}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default UploadAction