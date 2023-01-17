import express from 'express'

const router = new express.Router()

import {
    isAuth,
    isAdmin
} from '../middlewares/auth.js'

import {
    createOrder,
    getAllOrders,
    getAllUserOrders,
    getOrderById,
    updateOrder,
} from '../controllers/orderController.js'


router.post('/new', isAuth, createOrder)
router.get('/all', isAuth, isAdmin, getAllOrders)
router.get('/:id', isAuth, getOrderById)
router.get('/', isAuth, getAllUserOrders)
router.patch('/:id', isAuth, updateOrder)

export default router