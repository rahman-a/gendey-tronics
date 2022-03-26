import express from 'express'
const router = express.Router()

import {isAdmin, isAuth} from '../middlewares/auth.js'

import {
    bookingCall,
    toggleCallActiveState,
    deleteCall,
    listAllCalls,
    latestCalls
} from '../controllers/callController.js'

router.post('/book',isAuth, bookingCall)
router.patch('/:id', isAuth, isAdmin, toggleCallActiveState)
router.get('', isAuth, isAdmin, listAllCalls)
router.get('/latest', isAuth, isAdmin, latestCalls)
router.delete('/:id', isAuth, isAdmin, deleteCall)

export default router