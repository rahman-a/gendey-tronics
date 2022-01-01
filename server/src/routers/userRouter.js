import express from 'express'
const router = express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'

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
    verifyAuthLink
} from '../controllers/userController.js'

router.post('/new', createNewUser)
router.post('/login', userAuthentication)
router.post('/login/google', googleSignIn)
router.post('/login/facebook', facebookSignIn)
router.post('/logout',isAuth, userLogout)
router.patch('/', isAuth, updateUserData)
router.patch('/credential', isAuth, updatePassword)
router.delete('/', isAuth, deleteUserAccount)
router.get('/me', isAuth, getUserData)
router.get('/:id', isAuth, isAdmin, getUserDataById)
router.get('/', isAuth, isAdmin, listAllUsers)
router.post('/email-link-activation',sendEmailActivationLink)
router.post('/reset-password-link', sendRestPasswordLink)
router.patch('/verify-auth-link', verifyAuthLink)

export default router