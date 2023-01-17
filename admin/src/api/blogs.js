import service from "./service";



const blogsAPI = {
    index(query) {
        const queryString = new URLSearchParams(query).toString()
        return service().get(`blogs?${queryString}`)
    },
    get(id) {
        return service().get(`blogs/${id}`)
    },
    create(data) {
        return service().post(`blogs/new`, data)
    },
    update(id, data) {
        return service().patch(`blogs/${id}`, data)
    },
    updateImage(id, data) {
        return service().patch(`blogs/image/${id}`, data)
    },
    delete(id) {
        return service().delete(`blogs/${id}`)
    },
    deleteComment(blog, comment) {
        return service().delete(`blogs/${blog}/comments/${comment}`)
    }
}

export default blogsAPI