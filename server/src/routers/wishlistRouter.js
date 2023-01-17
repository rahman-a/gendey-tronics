import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'

import {
    addItemToWishlist,
    removeItemFromWishlist,
    listAllWishlistItem
} from "../controllers/wishlistController.js"

router.post('/add', isAuth, addItemToWishlist)
router.delete('/:id', isAuth, removeItemFromWishlist)
router.get('/', isAuth, listAllWishlistItem)

export default router