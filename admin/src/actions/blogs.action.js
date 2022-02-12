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

const actions = {
    listBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
}

export default actions