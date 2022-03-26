import constants from "../constants"
import api from '../api'



const listAllCourse = (type) => async (dispatch) => {
    dispatch({type: constants.courses.LIST_ALL_REQUEST})
    try {
        const {data} = await api.courses.list(type)
        dispatch({type: constants.courses.LIST_ALL_SUCCESS, payload:data.courses})
    } catch (error) {
        dispatch({
            type:constants.courses.LIST_ALL_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getOneCourseData = (id, type) => async (dispatch, getState) => {
    dispatch({type: constants.courses.GET_ONE_REQUEST})
    try {
        const {data} = await api.courses.get(id, type)
        const {coupon} = getState().verifyCoupon 
        if(coupon) {
            data.course.discount = coupon.discount
        }
        console.log('Course Data', data.course);
        dispatch({type: constants.courses.GET_ONE_SUCCESS, payload:data.course})
    } catch (error) {
        dispatch({
            type:constants.courses.GET_ONE_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getOneCourseChapters = (id) => async (dispatch) => {
    dispatch({type: constants.courses.LIST_CHAPTERS_REQUEST})
    try {
        const {data} = await api.courses.listChapters(id)
        dispatch({type: constants.courses.LIST_CHAPTERS_SUCCESS, payload:data.chapters})
    } catch (error) {
        dispatch({
            type:constants.courses.LIST_CHAPTERS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const createNewEnrollment = (id) => async (dispatch) => {
    dispatch({type: constants.courses.NEW_ENROLLMENT_REQUEST})
    try {
        const {data} = await api.courses.newEnrollment(id)
        dispatch({
            type: constants.courses.NEW_ENROLLMENT_SUCCESS, 
            enroll:data.enroll,
            asset:data.asset
        })
    } catch (error) {
        dispatch({
            type:constants.courses.NEW_ENROLLMENT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const downloadFile = id => async (dispatch) => {
    dispatch({type:constants.courses.DOWNLOAD_ASSET_REQUEST}) 

    try {
        const {data} = await api.courses.downloadFile(id)

        dispatch({
            type:constants.courses.DOWNLOAD_ASSET_SUCCESS,
            payload:data.file
        })

    } catch (error) {
        dispatch({
            type:constants.courses.DOWNLOAD_ASSET_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const deletePermission = id => async (dispatch) => {
    dispatch({type:constants.courses.DELETE_ASSET_PERMISSION_REQUEST}) 

    try {
        
        await api.courses.deletePermission(id)
    
        dispatch({type:constants.courses.DELETE_ASSET_PERMISSION_SUCCESS,})

    } catch (error) {
        dispatch({
            type:constants.courses.DELETE_ASSET_PERMISSION_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getEnrollmentData = (id, enroll) => async dispatch => {
    dispatch({type: constants.courses.GET_ENROLLMENT_REQUEST})
    try {
        const {data} = await api.courses.getEnrollment(id, enroll)
        dispatch({type: constants.courses.GET_ENROLLMENT_SUCCESS, payload:data.enrollment})
    } catch (error) {
        dispatch({
            type:constants.courses.GET_ENROLLMENT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const controlEnrollmentProgress = (courseId, enrollmentId, chapterId, lessonId, type) => async (dispatch, getState) => {
    dispatch({type: constants.courses.ENROLLMENT_PROGRESS_REQUEST})
    try {
        const {data} = await api.courses.progress(courseId, enrollmentId, chapterId, lessonId, type)
        const enrollment = getState().enrollmentData.enrollment
        enrollment.completedLesson = enrollment.completedLesson.concat(lessonId)
        enrollment.progress = data.progress
        dispatch({type: constants.courses.GET_ENROLLMENT_SUCCESS, payload:enrollment})
        dispatch({type: constants.courses.ENROLLMENT_PROGRESS_SUCCESS, payload:{
            progress:data.progress,
            lesson:data.lesson
        }})
    } catch (error) {
        dispatch({
            type:constants.courses.ENROLLMENT_PROGRESS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const listAllCourseNotes = (id) => async (dispatch) => {
    dispatch({type: constants.courses.LIST_NOTES_REQUEST})
    try {
        const {data} = await api.courses.listNotes(id)
        dispatch({type: constants.courses.LIST_NOTES_SUCCESS, payload:data.notes})
    } catch (error) {
        dispatch({
            type:constants.courses.LIST_NOTES_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const createNewNote = (id, info) => async (dispatch, getState) => {
    dispatch({type: constants.courses.CREATE_NOTE_REQUEST})
    try {
        const {data} = await api.courses.newNote(id, info)
        let {notes} = getState().listNotes
        if(notes && notes.length) {
            notes = [data.note, ...notes]
        }else {
            notes = [data.note]
        }
        console.log('Notes', notes);
        dispatch({type: constants.courses.LIST_NOTES_SUCCESS, payload:notes})
        dispatch({type: constants.courses.CREATE_NOTE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.CREATE_NOTE_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const updateNote = (courseId, noteId) => async (dispatch) => {
    dispatch({type: constants.courses.UPDATE_NOTE_REQUEST})
    try {
        const {data} = await api.courses.updateNote(courseId, noteId)
        dispatch({type: constants.courses.UPDATE_NOTE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.UPDATE_NOTE_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const deleteNote = (courseId, noteId) => async (dispatch, getState) => {
    dispatch({type: constants.courses.DELETE_NOTE_REQUEST})
    try {
        const {data} = await api.courses.deleteNote(courseId, noteId)
        const notes = getState().listNotes.notes 
        const filteredNotes = notes.filter(n => n._id !== noteId)
        dispatch({type: constants.courses.LIST_NOTES_SUCCESS, payload:filteredNotes})
        dispatch({type: constants.courses.DELETE_NOTE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.DELETE_NOTE_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const listAllAnnouncements = (id) => async (dispatch) => {
    dispatch({type: constants.courses.LIST_ANNOUNCEMENTS_REQUEST})
    try {
        const {data} = await api.courses.listAnnouncements(id)
        dispatch({type: constants.courses.LIST_ANNOUNCEMENTS_SUCCESS, payload:data.announcements})
    } catch (error) {
        dispatch({
            type:constants.courses.LIST_ANNOUNCEMENTS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const listAllAnnouncementComments = (courseId, announcementId) => async (dispatch) => {
    dispatch({type: constants.courses.LIST_ANNOUNCEMENT_COMMENTS_REQUEST})
    try {
        const {data} = await api.courses.listAnnouncementComments(courseId, announcementId)
        dispatch({type: constants.courses.LIST_ANNOUNCEMENT_COMMENTS_SUCCESS, payload:data.comments})
    } catch (error) {
        dispatch({
            type:constants.courses.LIST_ANNOUNCEMENT_COMMENTS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const addAnnouncementComment = (courseId, announcementId) => async (dispatch) => {
    dispatch({type: constants.courses.ADD_ANNOUNCEMENT_COMMENT_REQUEST})
    try {
        const {data} = await api.courses.addAnnouncementComment(courseId, announcementId)
        dispatch({type: constants.courses.ADD_ANNOUNCEMENT_COMMENT_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.ADD_ANNOUNCEMENT_COMMENT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const deleteAnnouncementComment = (courseId, announcementId) => async (dispatch) => {
    dispatch({type: constants.courses.DELETE_ANNOUNCEMENT_COMMENT_REQUEST})
    try {
        const {data} = await api.courses.deleteAnnouncementComment(courseId, announcementId)
        dispatch({type: constants.courses.DELETE_ANNOUNCEMENT_COMMENT_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.DELETE_ANNOUNCEMENT_COMMENT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const addToWishlist = (info) => async (dispatch, getState) => {
    dispatch({type:constants.courses.ADD_COURSE_TO_WISHLIST_REQUEST})
    try {
        await api.courses.addCourseToWishlist(info)
        const {courses} = getState().listCourses
        const {course} = getState().courseData
        
        if(courses && courses.length) {
            courses.forEach(course => {
                if(course._id === info.item){
                    course.isFav = true
                }
            })
            dispatch({type: constants.courses.LIST_ALL_SUCCESS, payload:courses})
        }
        if(course) {
            course.isFav = true
            dispatch({type: constants.courses.GET_ONE_SUCCESS, payload:course})
        }
        dispatch({type:constants.courses.ADD_COURSE_TO_WISHLIST_SUCCESS, payload:true})
    } catch (error) {
        dispatch({
            type:constants.courses.ADD_COURSE_TO_WISHLIST_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const removeFromWishlist = (id) => async (dispatch, getState) => {
    dispatch({type:constants.courses.REMOVE_COURSE_FROM_WISHLIST_REQUEST})
    try {
        await api.courses.removeCourseFromWishlist(id)
        const {courses} = getState().listCourses
        const {course} = getState().courseData

        if(courses && courses.length) {
            courses.forEach(course => {
                if(course._id === id){
                    course.isFav = false
                }
            })
            dispatch({type: constants.courses.LIST_ALL_SUCCESS, payload:courses})
        }
        if(course) {
            course.isFav = false
            dispatch({type: constants.courses.GET_ONE_SUCCESS, payload:course})
        }
        dispatch({type:constants.courses.REMOVE_COURSE_FROM_WISHLIST_SUCCESS, payload:true})
    } catch (error) {
        dispatch({
            type:constants.courses.REMOVE_COURSE_FROM_WISHLIST_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const applyCoupon = (coupon) => async (dispatch, getState) => {
    dispatch({type:constants.courses.VERIFY_COUPON_REQUEST})
    try {
        const {data} = await api.courses.applyCoupon(coupon)
        const {course} = getState().courseData 
        course.discount = data.discount
        dispatch({type:constants.courses.GET_ONE_SUCCESS, payload:course})
        dispatch({type:constants.courses.VERIFY_COUPON_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:constants.courses.VERIFY_COUPON_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const listPurchasedCourses = () => async (dispatch) => {
    dispatch({type: constants.courses.LIST_PURCHASED_COURSES_REQUEST})
    try {
        const {data} = await api.courses.purchased()
        dispatch({type: constants.courses.LIST_PURCHASED_COURSES_SUCCESS, payload:data.courses})
    } catch (error) {
        dispatch({
            type:constants.courses.LIST_PURCHASED_COURSES_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const addReview = (review) => async (dispatch) => {
    dispatch({type: constants.courses.ADD_REVIEW_REQUEST})
    try {
        const {data} = await api.courses.addReview(review)
        dispatch({type: constants.courses.ADD_REVIEW_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.ADD_REVIEW_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getReview = (id) => async (dispatch) => {
    dispatch({type: constants.courses.GET_REVIEW_REQUEST})
    try {
        const {data} = await api.courses.getReview(id)
        dispatch({type: constants.courses.GET_REVIEW_SUCCESS, payload:data.review})
    } catch (error) {
        dispatch({
            type:constants.courses.GET_REVIEW_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const updateReview = (id, review) => async (dispatch, getState) => {
    dispatch({type: constants.courses.UPDATE_REVIEW_REQUEST})
    try {
        const {data} = await api.courses.updateReview(id, review)
        dispatch({type: constants.courses.GET_REVIEW_SUCCESS, payload:data.review})
        dispatch({type: constants.courses.UPDATE_REVIEW_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.courses.UPDATE_REVIEW_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const courseActions = {
    listCourses:listAllCourse,
    getCourse:getOneCourseData,
    listChapters:getOneCourseChapters,
    newEnrollment:createNewEnrollment,
    getEnrollment:getEnrollmentData,
    controlProgress:controlEnrollmentProgress,
    listNotes:listAllCourseNotes,
    createNote:createNewNote,
    updateNote:updateNote,
    deleteNote:deleteNote,
    listAnnouncements:listAllAnnouncements,
    listAnnouncementComments:listAllAnnouncementComments,
    addAnnouncementComment:addAnnouncementComment,
    deleteAnnouncementComment:deleteAnnouncementComment,
    purchasedCourses:listPurchasedCourses,
    addToWishlist,
    removeFromWishlist,
    applyCoupon,
    addReview,
    getReview,
    updateReview,
    downloadFile,
    deletePermission
}

export default courseActions