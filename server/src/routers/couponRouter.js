import express from 'express'
const router = express.Router()

import {isAdmin, isAuth} from '../middlewares/auth.js'

import {
   createNewCoupon,
   listAllCoupon,
   acquireCoupon,
   toggleCouponValidityState,
   updateCoupon,
   deleteCoupon
} from '../controllers/couponController.js'

router.post('/new', isAuth, isAdmin, createNewCoupon)
router.patch('/:id', isAuth, isAdmin, updateCoupon)
router.patch('/:id/validity', isAuth, isAdmin, toggleCouponValidityState)
router.get('/acquire', isAuth, acquireCoupon)
router.get('/', isAuth, isAdmin, listAllCoupon)
router.delete('/:id', isAuth, isAdmin, deleteCoupon)

export default router