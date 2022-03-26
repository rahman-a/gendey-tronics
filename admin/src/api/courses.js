import service from './service'


const courseAPI = {
    index(query) {
        const queryObject = {}
        for(let key in query) {
            if(query[key]) {
                queryObject[key] = query[key]
            }
        }
        const queryString = new URLSearchParams(queryObject).toString()
        return service().get(`courses?${queryString}`)
    },
    create(data){
        return service().post('courses/new', data)
    },
    getCourse(id) {
        return service().get(`courses/${id}`)
    },
    updateCourse(id, data){
        return service().patch(`courses/${id}`, data)
    },
    delete(id){
        return service().delete(`courses/${id}`)
    },
    updateImage(id, data){
        return service().patch(`courses/${id}/image`, data)
    },
    createChapter(id, data){
        return service().post(`courses/${id}/chapters/new`, data)
    },
    updateChapter(id, data){
        return service().patch(`courses/chapters/${id}`, data)
    },
    deleteChapter(id){
        return service().delete(`courses/chapters/${id}`)
    },
    createLesson(id, data){
        return service().post(`courses/chapters/${id}/lessons/new`, data)
    },
    updateLesson(id, data){
        return service().patch(`courses/chapters/lessons/${id}`, data)
    },
    deleteLesson(id){
        return service().delete(`courses/chapters/lessons/${id}`)
    },
    instructors(){
        return service().get('instructors')
    },
    enrollments(id) {
        return service().get(`courses/${id}/enrollments`)
    },
    newEnrollment(id, data){
        return service().post(`courses/${id}/enrollment/new`, data)
    },
    togglePublish(id) {
        return service().patch(`courses/${id}/publish`)
    },
    deleteLink(id, link){
        return service().delete(`courses/${id}/link/${link}`)
    },
    coupons() {
        return service().get('coupons')
    },
    createCoupon(data) {
        return service().post('coupons/new', data)
    },
    deleteCoupons(id) {
        return service().delete(`coupons/${id}`)
    }
}

export default courseAPI