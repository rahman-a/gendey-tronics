import express from 'express'
const router = express.Router()

import {isAdmin, isAuth} from '../middlewares/auth.js'

import {
    //incomingEmails,
    outgoingEmails,
    getEmailData,
    listAllEmails,
    deleteEmail,
    updateEmail
} from '../controllers/supportControllers.js'

//router.post('/incoming',incomingEmails)
router.post('/outgoing', isAuth, isAdmin, outgoingEmails)
router.get('/:id', isAuth, isAdmin, getEmailData)
router.get('/', isAuth, isAdmin, listAllEmails)
router.delete('/:id', isAuth, isAdmin, deleteEmail)
router.patch('/:id', isAuth, isAdmin, updateEmail)

export default router