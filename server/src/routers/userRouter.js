import express from 'express'
const router = express.Router()

import { isAuth, isAdmin } from '../middlewares/auth.js'

import {
  createNewUser,
  userAuthentication,
  userLogout,
  updateUserData,
  updatePassword,
  deleteUserAccount,
  getUserData,
  getUserDataById,
  listAllUsers,
  googleSignIn,
  facebookSignIn,
  sendEmailActivationLink,
  sendRestPasswordLink,
  verifyAuthLink,
  adminLogin,
  adminLogout,
  deleteUserById,
  getCourseAndProductDownloadLink,
  generalSearchHandler,
} from '../controllers/userController.js'

router.post('/new', createNewUser)
router.post('/login', userAuthentication)
router.post('/login/google', googleSignIn)
router.post('/login/facebook', facebookSignIn)
router.post('/login/admin', adminLogin)
router.post('/logout', isAuth, userLogout)
router.post('/logout/admin', isAuth, isAdmin, adminLogout)
router.patch('/', isAuth, updateUserData)
router.patch('/credential', isAuth, updatePassword)
router.delete('/', isAuth, deleteUserAccount)
router.delete('/:id', isAuth, isAdmin, deleteUserById)
router.get('/search', generalSearchHandler)
router.get('/me', isAuth, getUserData)
router.get('/links', isAuth, getCourseAndProductDownloadLink)
router.get('/:id', isAuth, isAdmin, getUserDataById)
router.get('/', isAuth, isAdmin, listAllUsers)
router.post('/email-link-activation', sendEmailActivationLink)
router.post('/reset-password-link', sendRestPasswordLink)
router.patch('/verify-auth-link', verifyAuthLink)

export default router
