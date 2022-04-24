import express from 'express'
const router = express.Router()

import { isAdmin, isAuth } from '../middlewares/auth.js'

import { uploadHandler } from '../middlewares/upload.js'

import {
  createItem,
  listAllItems,
  updateItem,
  deleteItem,
  listAllPages,
} from '../controllers/menuController.js'

router.post('/new', isAuth, isAdmin, uploadHandler.single('image'), createItem)
router.patch(
  '/:id/:parent?',
  isAuth,
  isAdmin,
  uploadHandler.single('image'),
  updateItem
)
router.get('/', isAuth, isAdmin, listAllItems)
router.get('/pages', isAuth, isAdmin, listAllPages)
router.delete('/:id/:parent?', isAuth, isAdmin, deleteItem)

export default router
