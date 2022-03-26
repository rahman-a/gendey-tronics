import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'
import {uploadHandler} from '../middlewares/upload.js'
import {
    createNewProduct, 
    listAllProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
    updateProductImage,
    toggleProductListing,
    deleteProductLink
} from '../controllers/productController.js'

import {
    addItemToCart,
    removeItemFromCart,
    listCartItems,
    deleteAllCartItems
} from '../controllers/cartController.js'

// Cart Endpoints
router.get('/cart', isAuth, listCartItems)
router.post('/cart/new', isAuth, addItemToCart)
router.delete('/cart/:id', isAuth, removeItemFromCart)
router.delete('/cart', isAuth, deleteAllCartItems)

router.post('/new', isAuth, isAdmin, uploadHandler.single('image') ,createNewProduct)
router.get('/:id/public', getOneProduct)
router.get('/:id',isAuth, getOneProduct)
router.get('/', listAllProduct)
router.patch('/:id', isAuth, isAdmin, updateProduct)
router.patch('/:id/listing', isAuth, isAdmin, toggleProductListing)
router.patch('/image/:id', isAuth, isAdmin,uploadHandler.single('image'), updateProductImage)
router.delete('/:id', isAuth, isAdmin, deleteProduct)
router.delete('/:id/link/:link', isAuth, isAdmin, deleteProductLink)



export default router 