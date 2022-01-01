import constants from '../constants'


const listCoursesReducer = (state, action) => {
    switch(action.type){
        case constants.courses.LIST_ALL_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.LIST_ALL_SUCCESS: 
            return {loading:false, error:null, courses:action.payload} 
        case constants.courses.LIST_ALL_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const getCourseDataReducer = (state, action) => {
    switch(action.type){
        case constants.courses.GET_ONE_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.GET_ONE_SUCCESS: 
            return {loading:false, error:null, course:action.payload}
        case constants.courses.GET_ONE_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.GET_ONE_RESET: 
            return {loading:false, error:null, course:null}
        default:
            return {...state}
    }
}

const listCourseChaptersReducer = (state, action) => {
    switch(action.type){
        case constants.courses.LIST_CHAPTERS_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.LIST_CHAPTERS_SUCCESS: 
            return {loading:false, error:null, chapters:action.payload}
        case constants.courses.LIST_CHAPTERS_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const createEnrollmentReducer = (state, action) => {
    switch(action.type){
        case constants.courses.NEW_ENROLLMENT_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.NEW_ENROLLMENT_SUCCESS: 
            return {loading:false, error:null, enrollId:action.payload}
        case constants.courses.NEW_ENROLLMENT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.NEW_ENROLLMENT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const controlEnrollmentProgressReducer = (state, action) => {
    switch(action.type){
        case constants.courses.ENROLLMENT_PROGRESS_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.ENROLLMENT_PROGRESS_SUCCESS: 
            return {loading:false, error:null, 
                progress:action.payload.progress, 
                lesson:action.payload.lesson}
        case constants.courses.ENROLLMENT_PROGRESS_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const enrollmentDataReducer = (state, action) => {
    switch(action.type){
        case constants.courses.GET_ENROLLMENT_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.GET_ENROLLMENT_SUCCESS: 
            return {loading:false, error:null, enrollment:action.payload}
        case constants.courses.GET_ENROLLMENT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.GET_ENROLLMENT_RESET: 
            return {loading:false, error:null, enrollment:null}
        default:
            return {...state}
    }
}

const createNoteReducer = (state, action) => {
    switch(action.type){
        case constants.courses.CREATE_NOTE_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.CREATE_NOTE_SUCCESS: 
            return {loading:false, error:null, message: action.payload}
        case constants.courses.CREATE_NOTE_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.CREATE_NOTE_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const listNotesReducer = (state, action) => {
    switch(action.type){
        case constants.courses.LIST_NOTES_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.LIST_NOTES_SUCCESS: 
            return {loading:false, error:null, notes:action.payload}
        case constants.courses.LIST_NOTES_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}


const updateNoteReducer = (state, action) => {
    switch(action.type){
        case constants.courses.UPDATE_NOTE_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.UPDATE_NOTE_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.courses.UPDATE_NOTE_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.UPDATE_NOTE_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const deleteNoteReducer = (state, action) => {
    switch(action.type){
        case constants.courses.DELETE_NOTE_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.DELETE_NOTE_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.courses.DELETE_NOTE_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.DELETE_NOTE_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const listAnnouncementsReducer = (state, action) => {
    switch(action.type){
        case constants.courses.LIST_ANNOUNCEMENTS_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.LIST_ANNOUNCEMENTS_SUCCESS: 
            return {loading:false, error:null, announcements:action.payload}
        case constants.courses.LIST_ANNOUNCEMENTS_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const listAnnouncementsCommentsReducer = (state, action) => {
    switch(action.type){
        case constants.courses.LIST_ANNOUNCEMENT_COMMENTS_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.LIST_ANNOUNCEMENT_COMMENTS_SUCCESS: 
            return {loading:false, error:null, comments:action.payload}
        case constants.courses.LIST_ANNOUNCEMENT_COMMENTS_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const addAnnouncementCommentReducer = (state, action) => {
    switch(action.type){
        case constants.courses.ADD_ANNOUNCEMENT_COMMENT_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.ADD_ANNOUNCEMENT_COMMENT_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.courses.ADD_ANNOUNCEMENT_COMMENT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.ADD_ANNOUNCEMENT_COMMENT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const deleteAnnouncementCommentReducer = (state, action) => {
    switch(action.type){
        case constants.courses.DELETE_ANNOUNCEMENT_COMMENT_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.DELETE_ANNOUNCEMENT_COMMENT_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.courses.DELETE_ANNOUNCEMENT_COMMENT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.DELETE_ANNOUNCEMENT_COMMENT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const addToWishlistReducer = (state, action) => {
    switch(action.type){
        case constants.courses.ADD_COURSE_TO_WISHLIST_REQUEST: 
            return {loading:true, error:null, isAdded:false} 
        case constants.courses.ADD_COURSE_TO_WISHLIST_SUCCESS: 
            return {loading:false, error:null, isAdded:action.payload}
        case constants.courses.ADD_COURSE_TO_WISHLIST_FAIL: 
            return {loading: false, error:action.payload} 
        default:
            return {...state}
    }
}

const removeFromWishlistReducer = (state, action) => {
    switch(action.type){
        case constants.courses.REMOVE_COURSE_FROM_WISHLIST_REQUEST: 
            return {loading:true, error:null, isRemoved:false} 
        case constants.courses.REMOVE_COURSE_FROM_WISHLIST_SUCCESS: 
            return {loading:false, error:null, isRemoved:action.payload}
        case constants.courses.REMOVE_COURSE_FROM_WISHLIST_FAIL: 
            return {loading: false, error:action.payload} 
        default:
            return {...state}
    }
}

const verifyCouponReducer = (state, action) => {
    switch(action.type){
        case constants.courses.VERIFY_COUPON_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.VERIFY_COUPON_SUCCESS: 
            return {loading:false, error:null, coupon:action.payload}
        case constants.courses.VERIFY_COUPON_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.courses.VERIFY_COUPON_RESET: 
            return {loading:false, error:null, coupon:null}
        default:
            return {...state}
    }
}

const listPurchasedCoursesReducer = (state, action) => {
    switch(action.type){
        case constants.courses.LIST_PURCHASED_COURSES_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.LIST_PURCHASED_COURSES_SUCCESS: 
            return {loading:false, error:null, courses:action.payload} 
        case constants.courses.LIST_PURCHASED_COURSES_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const addReviewReducer = (state, action) => {
    switch(action.type){
        case constants.courses.ADD_REVIEW_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.ADD_REVIEW_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.courses.ADD_REVIEW_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.ADD_REVIEW_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const getReviewReducer = (state, action) => {
    switch(action.type){
        case constants.courses.GET_REVIEW_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.GET_REVIEW_SUCCESS: 
            return {loading:false, error:null, review:action.payload} 
        case constants.courses.GET_REVIEW_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.GET_REVIEW_RESET: 
            return {loading:false, error:null}
        default:
            return {...state}
    }
}

const updateReviewReducer = (state, action) => {
    switch(action.type){
        case constants.courses.UPDATE_REVIEW_REQUEST: 
            return {loading:true, error:null}
        case constants.courses.UPDATE_REVIEW_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.courses.UPDATE_REVIEW_FAIL: 
            return {loading:false, error:action.payload}
        case constants.courses.UPDATE_REVIEW_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const courseReducers = {
    listCourses:listCoursesReducer,
    courseData:getCourseDataReducer,
    courseChapters:listCourseChaptersReducer,
    newEnrollment:createEnrollmentReducer,
    enrollmentData:enrollmentDataReducer,
    enrollmentProgress:controlEnrollmentProgressReducer,
    listNotes:listNotesReducer,
    newNote:createNoteReducer,
    updateNote:updateNoteReducer,
    deleteNote:deleteNoteReducer,
    announcements:listAnnouncementsReducer,
    announcementComments:listAnnouncementsCommentsReducer,
    newAnnouncementComment:addAnnouncementCommentReducer,
    deleteAnnouncementComment:deleteAnnouncementCommentReducer,
    addToWishlist:addToWishlistReducer,
    removeFromWishlist:removeFromWishlistReducer,
    verifyCoupon:verifyCouponReducer,
    purchasedCourses:listPurchasedCoursesReducer,
    addReview:addReviewReducer,
    getReview:getReviewReducer,
    updateReview:updateReviewReducer,
}
export default courseReducers