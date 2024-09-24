import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { HardDrive, GridMenu, StackMenu } from '../../icons'
import { Pagination } from '../../components'
import actions from '../../actions'
import File from './File'
import UploadAction from './Upload'

const Files = ({ files }) => {
  const [isUpload, setIsUpload] = useState(false)
  const [isHorizontal, setIsHorizontal] = useState(false)
  const [name, setName] = useState(null)
  const [driveFiles, setDriveFiles] = useState([])
  const dispatch = useDispatch()
  const {
    loading,
    error,
    files: filteredFiles,
  } = useSelector((state) => state.searchFiles)

  const filterFilesByTypeHandler = (value) => {
    dispatch(actions.drive.searchFiles({ folder: value }))
  }

  const resetSearchHandler = (_) => {
    dispatch(actions.drive.searchFiles())
  }

  const filterFilesByNameHandler = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      dispatch(actions.drive.searchFiles({ name }))
    }
  }

  useEffect(() => {
    files && setDriveFiles(files)
  }, [files])

  useEffect(() => {
    if (filteredFiles) {
      setDriveFiles(filteredFiles)
    }
  }, [filteredFiles])

  return (
    <div className={style.drive__content}>
      <UploadAction isUpload={isUpload} setIsUpload={setIsUpload} />

      <h1 className='main-header'>Google Drive Files List</h1>
      <div className={style.drive__content_wrapper}>
        <div className={style.drive__content_header}>
          <button>
            <span> </span>
            <span onClick={() => setIsUpload(true)}> Upload New File </span>
          </button>
        </div>
        {/* <h2>
                  <span> <HardDrive/> </span>
                  No Files has been Uploaded Yet
              </h2> */}
        <div className={style.drive__content_files}>
          <div className={style.drive__content_actions}>
            <div className={style.drive__content_search}>
              <Form.Group className='mb-3' controlId='formBasicType'>
                <Form.Select
                  name='type'
                  size='lg'
                  onChange={(e) => filterFilesByTypeHandler(e.target.value)}
                >
                  <option value=''>search by type...</option>
                  <option value='products'>Products</option>
                  <option value='courses'>Courses</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='formBasicType'
                onKeyDown={filterFilesByNameHandler}
              >
                <Form.Control
                  placeholder='search by name....'
                  onChange={(e) => setName(e.target.value)}
                  size='lg'
                  name='name'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicType'>
                <Button variant='dark' onClick={resetSearchHandler}>
                  reset..
                </Button>
              </Form.Group>
            </div>
            <div className={style.drive__content_layout}>
              <Button variant='light' onClick={() => setIsHorizontal(false)}>
                {' '}
                <GridMenu />{' '}
              </Button>
              <Button variant='light' onClick={() => setIsHorizontal(true)}>
                {' '}
                <StackMenu />{' '}
              </Button>
            </div>
          </div>
          {files.length === 0 && (
            <div className={style.drive__noFiles}>
              <p>
                {' '}
                <HardDrive />{' '}
              </p>
              <h3> No Files Found </h3>
              <h4> Start a New Upload </h4>
            </div>
          )}
          <div
            className={`
                ${style.drive__content_container} ${
              isHorizontal ? style.drive__content_container_horizontal : ''
            }`}
          >
            {loading ? (
              <div
                className={style.drive__noFiles}
                style={{ alignItems: 'center', width: '100%', color: '#333' }}
              >
                <Spinner size='lg' animation='border' />
              </div>
            ) : (
              driveFiles.map((file) => (
                <File key={file.id} file={file} isHorizontal={isHorizontal} />
              ))
            )}
          </div>
          {/* { files.length > 0 
               && <div className={style.drive__pagination}>
                    <Pagination count={10}/>
                </div> } */}
        </div>
      </div>
    </div>
  )
}

export default Files
