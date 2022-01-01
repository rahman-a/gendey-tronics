import express from 'express'
const router = new express.Router()

import {isAuth} from '../middlewares/auth.js'
import {
    addCourseReview,
    updateCourseReview,
    deleteOneReview,
    getOneReview, 
    listAllReviews
} from '../controllers/reviewController.js'

router.post('/add', isAuth, addCourseReview)
router.get('/all', listAllReviews)
router.get('/:id', isAuth, getOneReview)
router.patch('/:id', isAuth, updateCourseReview)
router.delete('/:id', isAuth, deleteOneReview)

export default router