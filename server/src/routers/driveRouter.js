import express from 'express'

const router = express.Router() 

import {
    isAuth,
    isAdmin
} from '../middlewares/auth.js'

import {ChunkUploadHandler} from '../middlewares/upload.js'

import {
    authenticateMember,
    getAccessToken,
    uploadFile,
    getResumableURI,
    downloadFile,
    deleteFilePermission,
    deleteFile,
    resumePreviousUpload,
    searchDriveFiles
} from '../controllers/driveControllers.js'

router.post('/authenticate',isAuth, isAdmin, authenticateMember)
router.post('/accessToken', isAuth, isAdmin, getAccessToken)
router.post('/upload', isAuth, isAdmin, ChunkUploadHandler.single('blob'), getResumableURI, uploadFile)
router.patch('/resume', isAuth,isAdmin, resumePreviousUpload)
router.delete('/delete/:id', isAuth, isAdmin, deleteFile)
router.get('/download/:id', isAuth, downloadFile)
router.delete('/permission/:id', isAuth, deleteFilePermission)
router.get('/search', isAuth, searchDriveFiles)


export default router