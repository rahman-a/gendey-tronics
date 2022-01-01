import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'
import {
    addInstructor,
    getOneInstructor,
    listAllInstructors,
    updateInstructorData,
    deleteInstructor,
    addInstructorReview,
    listAllReviews,
    deleteReview
} from '../controllers/instructorController.js'

router.post('/add', isAuth, isAdmin, addInstructor)
router.get('/:id', isAuth, getOneInstructor)
router.get('/', isAuth, isAdmin, listAllInstructors)
router.patch('/:id', isAuth, updateInstructorData) 
router.delete('/:id', isAuth, isAdmin, deleteInstructor)
router.get('/:id/reviews', listAllReviews)
router.post('/:id/reviews/add', isAuth, addInstructorReview)
router.delete('/:id/reviews', isAuth, deleteReview)
export default router