import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'

import {
    mainDashboardInfo,
    latestRegisteredUsers,
    latestEnrollments,
    latestListedOrders,
    latestContactsAndCalls
} from '../controllers/Dashboard.js'

router.get('/info', isAuth, isAdmin, mainDashboardInfo)
router.get('/users', isAuth, isAdmin, latestRegisteredUsers)
router.get('/enrollments', isAuth, isAdmin, latestEnrollments)
router.get('/orders', isAuth, isAdmin, latestListedOrders)
router.get('/contacts', isAuth, isAdmin, latestContactsAndCalls)


export default router