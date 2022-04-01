import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import Loader from '../../components/Loader'
import actions from '../../actions'
import constants from '../../constants'

const DownloadLink = ({link, part, itemName}) => {
  
    const [prepareAsset, setPrepareAsset] = useState(false)
    const [downloadLink, setDownloadLink] = useState(null)
    const dispatch = useDispatch()
    const {fileData} = useSelector(state => state.downloadAsset)

    const deletePermission = () => {
        dispatch(actions.courses.deletePermission(downloadLink))
    }
    
    const initiateFileDownload = () => {
        if(fileData) {
            const anchor = document.createElement('a')
            anchor.href = fileData.webContentLink
            anchor.click()
            setPrepareAsset(false)
            dispatch({type:constants.courses.DOWNLOAD_ASSET_RESET})
            setTimeout(() => {
                deletePermission()
            },5000)
        }
    }
    
    const downloadAssetHandler = _ => {
        setPrepareAsset(true)
        // get Download Key
        dispatch(actions.courses.downloadFile(link))
        setDownloadLink(link)
    }
      
    useEffect(() => {
        fileData && initiateFileDownload()
    },[fileData])
    
    return (
    <ListGroup.Item
        onClick={downloadAssetHandler}
        className={style.orders__message_item} action>
            {`${itemName} part-${part}`} 
            { prepareAsset 
            && <Loader size='4' center custom={{left:'2rem'}}/> }
    </ListGroup.Item>
  )
}

export default DownloadLink