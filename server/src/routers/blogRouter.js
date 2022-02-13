import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'
import {uploadHandler} from '../middlewares/upload.js'
import {
    createNewBlog,
    updateBlog,
    updateBlogImage,
    listAllBlogs,
    getOneBlog,
    controlBlogVisibility,
    deleteBlog,
    listAllComments, 
    addBlogComment,
    deleteComment
} from '../controllers/blogController.js'

router.post('/new', isAuth, isAdmin, uploadHandler.single('image') ,createNewBlog)
router.get('/:id', getOneBlog)
router.get('/', listAllBlogs)
router.patch('/:id', isAuth, isAdmin, updateBlog)
router.patch('/:id/views', controlBlogVisibility)
router.patch('/image/:id', isAuth, isAdmin,uploadHandler.single('image'), updateBlogImage)
router.delete('/:id', isAuth, isAdmin, deleteBlog)
router.get('/:id/comments', listAllComments)
router.post('/:id/comments/add', isAuth, addBlogComment)
router.delete('/:id/comments/:commentId?', isAuth, deleteComment)

export default router