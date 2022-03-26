import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Loader from '../Loader'
import actions from '../../actions'
import strings from '../../localization'

const DownloadAsset = ({id}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {fileData} = useSelector(state => state.downloadAsset)
    const {lang} = useSelector(state => state.language)

    const downloadFileHandler = () => {
        setIsLoading(true)
        dispatch(actions.courses.downloadFile(id))
    }

    const deletePermission = () => {
        dispatch(actions.courses.deletePermission(id))
    }

    const initiateFileDownload = () => {
        if(fileData) {
            // const link = `https://www.googleapis.com/drive/v3/files/${id}/?key=${key}&alt=media`
            // const link = `https://drive.google.com/uc?id=${id}&export=download`
            const anchor = document.createElement('a')
            anchor.href = fileData.webContentLink
            anchor.click()
            setIsLoading(false)
            setTimeout(() => {
                deletePermission()
            },5000)
        }
      }

    useEffect(() => {
      fileData && initiateFileDownload()
    },[fileData])
    
    return (
        <td style={{position:'relative', width:'15rem'}}>
            {isLoading ? 
            <Loader size='4' center/>
            : <Button variant='primary' 
                onClick={downloadFileHandler}>
                {strings.product[lang].download_product}
            </Button> }
        </td>
    )
}

export default DownloadAsset