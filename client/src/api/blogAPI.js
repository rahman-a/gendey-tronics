import {service} from './service'

export const blogApi = {
    listBlogs(){
        return service().get('/blogs')
    },
    getBlog(id){
        return service().get(`blogs/${id}`)
    },
    listBlogComments(id){
        return service().get(`blogs/${id}/comments`)
    },
    blogViews(id){
        return service().patch(`blogs/${id}/views`)
    },
    addBlogComment(id,data){
        return service().post(`blogs/${id}/comments/add`, data)
    },
    deleteBlogComment(id){
        return service().delete(`blogs/${id}/comments`)
    }
}
