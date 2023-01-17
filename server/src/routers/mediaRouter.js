import express from 'express'
const router = express.Router()

import { isAuth, isAdmin } from '../middlewares/auth.js'

import { uploadHandler } from '../middlewares/upload.js'

import {
  createMedia,
  listAllMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController.js'

router.post('/', isAuth, isAdmin, uploadHandler.single('media'), createMedia)
router.get('/', listAllMedia)
router.put('/:id', isAuth, isAdmin, uploadHandler.single('media'), updateMedia)
router.delete('/:id', isAuth, isAdmin, deleteMedia)

export default router
