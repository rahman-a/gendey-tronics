import express from 'express'
const router = express.Router()

import {
  sendClientId,
  createOrder,
} from '../controllers/purchasingController.js'

import { isAuth } from '../middlewares/auth.js'

router.get('/clientId', isAuth, sendClientId)
router.post('/order/:type', isAuth, createOrder)

export default router
