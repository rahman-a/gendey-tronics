import express from 'express'
const router = express.Router()

import {isAdmin, isAuth} from '../middlewares/auth.js'

import {
    bookingCall,
    toggleCallActiveState,
    deleteCall,
    listAllActiveCalls
} from '../controllers/callController.js'

router.post('/book',isAuth, bookingCall)
router.patch('/:id', isAuth, isAdmin, toggleCallActiveState)
router.get('/', isAuth, isAdmin, listAllActiveCalls)
router.delete('/:id', isAuth, isAdmin, deleteCall)

export default router