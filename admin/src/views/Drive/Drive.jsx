import React,{useState, useEffect} from 'react'
import style from './style.module.scss'
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import actions from '../../actions'
import {Loader, HeaderAlert} from '../../components'
import {HardDrive} from '../../icons'
import Files from './Files'

const Drive = () => {
  const [driveFiles, setDriveFiles] = useState([])
  const {loading, error, url, files} = useSelector(state => state.authenticateMember)
  const {
      loading:access_loading,
      error:access_error,
      files:access_files
  } = useSelector(state => state.getAccessToken)
  
  const dispatch = useDispatch()
  
  const code = new URLSearchParams(useLocation().search).get('code')

  const errorActions = (
    <div className={style.drive__error}>
      <HeaderAlert 
      type='danger' 
      size='3' 
      text={error || access_error}
      custom={{position:'relative', width:'fit-content'}}/>
      {/* <Button variant='dark'> try again...</Button> */}
    </div>
  )

  const authenticateMemberHandler = () => {
    dispatch(actions.drive.authenticateMember())
  }
  
  useEffect(() => {
  !code && authenticateMemberHandler()
  },[])


  useEffect(() => {
    if(files) {
      setDriveFiles(files)
    }
    if(access_files) {
      setDriveFiles(access_files)
    }
  },[files, access_files])


  useEffect(() => {
    if(code) {
      dispatch(actions.drive.getAccessToken(code))
    }
  },[code])

  return (
    <div className={style.drive}>
       <div className='container'>
            <div className={style.drive__wrapper}>
                {
                    
                  loading || access_loading
                  ? <Loader  size='6' center options={{animation:'border'}}/>
                  : error || access_error
                  ? errorActions
                  : driveFiles
                  ? <Files files={driveFiles}/>
                  : url 
                  && <div className={style.drive__welcome}>
                      <h1>Welcome to Google Drive Access Page</h1>
                      <Button href={url} variant='warning' size='lg'>
                        Click to Access your Drive <span style={{marginLeft:'0.5rem'}}> <HardDrive/> </span>
                      </Button>
                    </div>
                }
            </div>
       </div>
    </div>
  )
}

export default Drive