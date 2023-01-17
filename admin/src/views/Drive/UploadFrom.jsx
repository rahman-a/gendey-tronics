import React from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'

const UploadFrom = ({asset, setId, setFile, setPart, uploadFileHandler, checkPreviousDownloadStatus}) => {
  return (
    <Form>
        <Form.Group className="mt-3">
            <Form.Label htmlFor='asset' className='text-muted fs-5'>  
                {
                    asset === 'product' 
                    ?'Enter Product Id:' 
                    : asset === 'course' 
                    && 'Enter Course Id:'
                } 
                
            </Form.Label>
            <Form.Control
                id='asset'
                placeholder=
                {
                    asset === 'product' 
                    ? 'Enter Product Id...' 
                    : asset === 'course' 
                    && 'Enter Course Id'
                }
                size='lg'
                name='id'
                onChange={(e) => setId(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
            <Form.Label className='text-muted fs-5' htmlFor='assetFile'>
                {
                    asset === 'product'
                    ? 'Upload The Product file'
                    : asset === 'course'
                    && 'Upload The Course file'
                }
            </Form.Label>
            <Form.Control
            type="file"  
            size='lg'
            name='asset'
            id='assetFile'
            accept=".zip,.rar"
            onChange={(e) => setFile(e.target.files[0])}
            />
        </Form.Group>

        <InputGroup className='mb-3 w-25'>
                <Form.Label className='text-muted fs-5' htmlFor='filePart'> 
                    Enter The Specified Part 
                </Form.Label>
                <InputGroup.Text> Part </InputGroup.Text>
                <Form.Control
                type='number'
                name='part'
                id='filePart'
                onChange={(e) => setPart(e.target.value)}
                />
        </InputGroup>

        <Form.Group controlId="formFile" className="mt-3">
            <Button 
            variant='success' 
            onClick={uploadFileHandler}>
                upload the file...
            </Button>

            <Button 
            className='mx-3' 
            onClick={checkPreviousDownloadStatus} 
            variant='dark'>
                resume for previous upload...
            </Button>
        </Form.Group>
    </Form>
  )
}

export default UploadFrom