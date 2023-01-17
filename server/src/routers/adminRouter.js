import express from 'express'
const router = new express.Router()

import { isAuth, isAdmin } from '../middlewares/auth.js'
import { uploadHandler } from '../middlewares/upload.js'

import {
  getAdminInfo,
  updateAdminInfo,
  updateAdminImage,
  getAdminProfilePhoto,
} from '../controllers/adminController.js'

import { updatePassword } from '../controllers/userController.js'

router.get('/info', isAuth, isAdmin, getAdminInfo)
router.get('/avatar', isAuth, isAdmin, getAdminProfilePhoto)
router.patch('/info', isAuth, isAdmin, updateAdminInfo)
router.patch(
  '/image',
  isAuth,
  isAdmin,
  uploadHandler.single('image'),
  updateAdminImage
)
router.patch('/password', isAuth, isAdmin, updatePassword)

export default router
