import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'
import {uploadSliderImageHandler} from '../middlewares/upload.js'
import {
    createSlider,
    deleteSlider,
    listSliders
} from '../controllers/sliderController.js'

router.post('/add', isAuth, isAdmin, uploadSliderImageHandler.single('slider'), createSlider)
router.get('/', listSliders)
router.delete('/:id', isAuth, isAdmin, deleteSlider)


export default router