import {service} from './service'

export const courseApi = {
    list(){
        return service().get('courses?isPublic=true')
    },
    get(id, type){
        const url = type === 'public' 
        ? `courses/${id}/public`
        : type === 'preview'
        ?`courses/${id}?type=preview`
        : `courses/${id}`
        return service().get(url)
    },
    listChapters(id){
        return service().get(`courses/${id}/chapters`)
    },
    newEnrollment(id){
        return service().post(`courses/${id}/enrollment/new`)
    },
    getEnrollment(id, enroll) {
        return service().get(`courses/${id}/enrollment/${enroll}`)
    },
    progress(course, enrollment, chapter, lesson, type){
        const url = type === 'add'
        ? `courses/${course}/enrollment/${enrollment}/chapters/${chapter}/lessons/${lesson}/add`
        : `courses/${course}/enrollment/${enrollment}/chapters/${chapter}/lessons/${lesson}/sub`
        return service().patch(url)
    },
    listNotes(id){
        return service().get(`courses/${id}/notes`)
    },
    newNote(id, data){
        return service().post(`courses/${id}/notes/new`, data)
    },
    updateNote(course, note){
        return service().patch(`courses/${course}/notes/${note}`)
    },
    deleteNote(course, note){
        return service().delete(`courses/${course}/notes/${note}`)
    },
    listAnnouncements(id){
        return service().get(`courses/${id}/announcements`)
    },
    listAnnouncementComments(course, announcement){
        return service().get(`courses/${course}/announcements/${announcement}/comments`)
    },
    addAnnouncementComment(course, announcement){
        return service().post(`courses/${course}/announcements/${announcement}/comments/add`)
    },
    deleteAnnouncementComment(course, announcement){
        return service().delete(`courses/${course}/announcements/${announcement}/comments/delete`)
    },
    addCourseToWishlist(data){
        return service().post('wishlist/add', data)
    },
    removeCourseFromWishlist(id){
        return service().delete(`wishlist/${id}`)
    },
    applyCoupon(coupon){
        return service().get(`coupons/acquire?code=${coupon}`)
    },
    purchased(){
        return service().get('courses/purchased')
    },
    addReview(review) {
        return service().post('reviews/add', review)
    },
    getReview(id) {
        return service().get(`reviews/${id}`)
    },
    updateReview(id, review) {
        return service().patch(`reviews/${id}`, review)
    },
    downloadFile(id) {
        return service().get(`drive/download/${id}`)
    },
    deletePermission(id) {
        return service().delete(`drive/permission/${id}`)
    }
} 