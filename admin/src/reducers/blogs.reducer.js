import constants from "../constants";

const listAllBlogs = (state, action) => {
    switch(action.type){
        case constants.blogs.LIST_BLOGS_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.LIST_BLOGS_SUCCESS: 
            return {loading:false, error:null, blogs:action.blogs, count:action.count} 
        case constants.blogs.LIST_BLOGS_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.blogs.LIST_BLOGS_RESET: 
            return {loading:false, error:null, blogs:null} 
        default: 
            return {...state}
    }
}

const createNewBlog = (state, action) => {
    switch(action.type){
        case constants.blogs.CREATE_BLOG_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.CREATE_BLOG_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.blogs.CREATE_BLOG_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.blogs.CREATE_BLOG_RESET: 
            return {loading:false, error:null, message:null} 
        default: 
            return {...state}
    }
}

const getBlog = (state, action) => {
    switch(action.type){
        case constants.blogs.GET_BLOG_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.GET_BLOG_SUCCESS: 
            return {loading:false, error:null, blog:action.payload} 
        case constants.blogs.GET_BLOG_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.blogs.GET_BLOG_RESET: 
            return {loading:false, error:null, blog:null} 
        default: 
            return {...state}
    }
}


const updateBlog = (state, action) => {
    switch(action.type){
        case constants.blogs.UPDATE_BLOG_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.UPDATE_BLOG_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.blogs.UPDATE_BLOG_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.blogs.UPDATE_BLOG_RESET: 
            return {loading:false, error:null, message:null} 
        default: 
            return {...state}
    }
}

const deleteBlog = (state, action) => {
    switch(action.type){
        case constants.blogs.DELETE_BLOG_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.DELETE_BLOG_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.blogs.DELETE_BLOG_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.blogs.DELETE_BLOG_RESET: 
            return {loading:false, error:null, message:null} 
        default: 
            return {...state}
    }
}


const reducer = {
    listAllBlogs,
    getBlog,
    createNewBlog,
    updateBlog,
    deleteBlog
}

export default reducer