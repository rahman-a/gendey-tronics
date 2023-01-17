import constants from "../constants";
import api from '../api'


const listBlogs = query => async dispatch => {
    dispatch({type: constants.blogs.LIST_BLOGS_REQUEST}) 

    try {
        const {data} = await api.blogs.index(query) 
        dispatch({
            type:constants.blogs.LIST_BLOGS_SUCCESS,
            blogs:data.blogs,
            count:data.count
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.LIST_BLOGS_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const createBlog = info => async dispatch => {
    dispatch({type: constants.blogs.CREATE_BLOG_REQUEST}) 

    try {
        const {data} = await api.blogs.create(info)
        dispatch({
            type:constants.blogs.CREATE_BLOG_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.CREATE_BLOG_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const getBlog = id => async dispatch => {
    dispatch({type: constants.blogs.GET_BLOG_REQUEST}) 

    try {
        const {data} = await api.blogs.get(id)
        dispatch({
            type:constants.blogs.GET_BLOG_SUCCESS,
            payload:data.blog
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.GET_BLOG_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const updateBlog = (id, info) => async dispatch => {
    dispatch({type: constants.blogs.UPDATE_BLOG_REQUEST}) 

    try {
        const {data} = await api.blogs.update(id, info)
        
        dispatch({
            type:constants.blogs.GET_BLOG_SUCCESS,
            payload:data.blog
        })
        
        dispatch({
            type:constants.blogs.UPDATE_BLOG_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.UPDATE_BLOG_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const updateBlogImage = (id, info) => async (dispatch, getState) => {
    dispatch({type: constants.blogs.UPDATE_BLOG_IMAGE_REQUEST}) 

    try {
        const {data} = await api.blogs.updateImage(id, info)
        
        const {blog} = getState().getBlog 
        
        if(blog) {
            blog.image = data.image
            dispatch({
                type:constants.blogs.GET_BLOG_SUCCESS,
                payload:blog
            })
        }
        
        dispatch({
            type:constants.blogs.UPDATE_BLOG_IMAGE_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.UPDATE_BLOG_IMAGE_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const deleteBlog = id => async dispatch => {
    dispatch({type: constants.blogs.DELETE_BLOG_REQUEST}) 

    try {
        const {data} = await api.blogs.delete(id)
        dispatch({
            type:constants.blogs.DELETE_BLOG_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.DELETE_BLOG_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const deleteCommentBlog = (blog, comment) => async (dispatch, getState) => {
    
    dispatch({type: constants.blogs.DELETE_BLOG_COMMENT_REQUEST}) 

    try {
        const {data} = await api.blogs.deleteComment(blog, comment)
        let {blogs, count} = getState().listAllBlogs
        if(blogs) {
            
            let targetBlog = blogs.find(bg => bg._id === blog)
            targetBlog.comments = targetBlog.comments.filter(comment => comment._id !== data.comment)
            blogs = blogs.filter(blog => blog._id !== targetBlog._id)
            blogs = [...blogs, targetBlog]

            dispatch({
                type:constants.blogs.LIST_BLOGS_SUCCESS,
                blogs,
                count
            })
        }
        
        dispatch({
            type:constants.blogs.DELETE_BLOG_COMMENT_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.blogs.DELETE_BLOG_COMMENT_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const actions = {
    listBlogs,
    createBlog,
    getBlog,
    updateBlog,
    updateBlogImage,
    deleteBlog,
    deleteCommentBlog
}

export default actions