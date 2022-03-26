import express from 'express'
const router = new express.Router()

import {isAuth, isAdmin} from '../middlewares/auth.js'
import {uploadHandler} from "../middlewares/upload.js"

import {
    createNewCourse,
    getTheCourseData,
    updateCourseData,
    updateCourseImage,
    listAllCourses,
    deleteCourse,
    listPurchasedCourses,
    toggleCoursePublish,
    deleteLink
} from '../controllers/courseController.js'

import {
    createNewChapter,
    updateChapter,
    listAllChapter,
    getOneChapter,
    deleteOneChapter
} from '../controllers/chapterController.js'

import {
    createNewLesson,
    updateLesson, 
    deleteLesson
} from '../controllers/lessonController.js'

import {
    createEnrollment, 
    getEnrollmentData,
    increaseEnrollmentProgress,
    decreaseEnrollmentProgress,
    listCourseEnrollments
} from "../controllers/enrollmentController.js"

import {
    createNote,
    updateNote,
    listAllNotes,
    deleteNote
} from "../controllers/noteController.js"

import {
    createNewAnnouncement,
    updateAnnouncement,
    getOneAnnouncement,
    listAllAnnouncement,
    updateAnnouncementImage,
    deleteAnnouncement,
    addAnnouncementComment,
    listAllAnnouncementComments,
    deleteAnnouncementsComment
} from "../controllers/announcementController.js"

// Courses Routers
router.post('/new', isAuth, isAdmin,uploadHandler.single('image'), createNewCourse)
router.delete('/:id', isAuth, isAdmin, deleteCourse)
router.patch('/:id', isAuth, isAdmin, updateCourseData)
router.patch('/:id/publish', isAuth, isAdmin, toggleCoursePublish)
router.patch('/:id/image', isAuth, isAdmin, uploadHandler.single('image'), updateCourseImage)
router.get('/purchased', isAuth, listPurchasedCourses)
router.get('/', listAllCourses)
router.get('/:id', isAuth, getTheCourseData)
router.get('/:id/public', getTheCourseData)
router.delete('/:id/link/:link', isAuth, isAdmin, deleteLink)

// Chapters Routers
router.post('/:id/chapters/new', isAuth, isAdmin, createNewChapter)
router.patch('/chapters/:id', isAuth, isAdmin, updateChapter)
router.get('/chapters/:id', isAuth, isAdmin, getOneChapter)
router.get('/:id/chapters', listAllChapter)
router.delete('/chapters/:id', isAuth, isAdmin, deleteOneChapter)

// Lessons Routers
router.post('/chapters/:id/lessons/new', isAuth, isAdmin, createNewLesson)
router.patch('/chapters/lessons/:id', isAuth, isAdmin, updateLesson)
router.delete('/chapters/lessons/:id', isAuth, isAdmin, deleteLesson)

// Enrollment Router
router.post('/:id/enrollment/new', isAuth, createEnrollment)
router.get('/:id/enrollment/:enroll', isAuth, getEnrollmentData)
router.get('/:id/enrollments', isAuth, isAdmin, listCourseEnrollments)
router.patch('/:id/enrollment/:enroll/chapters/:chapter/lessons/:lesson/add', isAuth, increaseEnrollmentProgress)
router.patch('/:id/enrollment/:enroll/chapters/:chapter/lessons/:lesson/sub', isAuth, decreaseEnrollmentProgress)

// Notes Router
router.post('/:id/notes/new', isAuth, createNote)
router.get('/:id/notes', isAuth, listAllNotes)
router.patch('/:course/notes/:id', isAuth, updateNote)
router.delete('/:course/notes/:id', isAuth, deleteNote)

// Announcement Router
router.post('/:id/announcements/new', isAuth, isAdmin, uploadHandler.single('image'), createNewAnnouncement)
router.get('/:id/announcements/:announcement', isAuth, isAdmin, getOneAnnouncement)
router.get('/:id/announcements', isAuth, listAllAnnouncement)
router.patch('/:course/announcements/:id', isAuth, isAdmin, updateAnnouncement)
router.patch('/:id/announcements/:announcement/image', isAuth, isAdmin, uploadHandler.single('image'), updateAnnouncementImage)
router.delete('/:id/announcements/:announcement', isAuth, isAdmin, deleteAnnouncement)
router.patch('/:id/announcements/:announcement/comments/add', isAuth, addAnnouncementComment)
router.get('/:id/announcements/:announcement/comments', isAuth, listAllAnnouncementComments)
router.patch('/:id/announcements/:announcement/comments/delete', isAuth, deleteAnnouncementsComment)

export default router