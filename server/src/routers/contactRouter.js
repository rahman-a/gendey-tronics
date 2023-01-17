import express from 'express'
const router = express.Router()

import {isAdmin, isAuth} from '../middlewares/auth.js'

import {
    createNewContact,
    listAllContacts,
    latestContacts,
    toggleContactReadState,
    deleteContact
} from '../controllers/contactController.js'

router.post('/new',createNewContact)
router.patch('/:id', isAuth, isAdmin, toggleContactReadState)
router.get('/', isAuth, isAdmin, listAllContacts)
router.get('/latest', isAuth, isAdmin, latestContacts)
router.delete('/:id', isAuth, isAdmin, deleteContact)

export default router