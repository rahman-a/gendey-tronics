import constants from '../constants'


const listBlogsReducer = (state, action) => {
    switch(action.type){
        case constants.blogs.LIST_BLOGS_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.LIST_BLOGS_SUCCESS: 
            return {loading:false, error:null, blogs:action.payload} 
        case constants.blogs.LIST_BLOGS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.blogs.LIST_BLOGS_RESET: 
            return {loading:false, error:null, blogs:null} 
        default:
            return {...state}
    }
}

const getBlogDataReducer = (state, action) => {
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

const controlBlogViewsReducer = (state, action) => {
    switch(action.type){
        case constants.blogs.CONTROL_BLOG_VIEWS_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.CONTROL_BLOG_VIEWS_SUCCESS: 
            return {loading:false, error:null, seen:action.payload} 
        case constants.blogs.CONTROL_BLOG_VIEWS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.blogs.CONTROL_BLOG_VIEWS_RESET: 
            return {loading:false, error:null, seen:null} 
        default:
            return {...state}
    }
}

const listBlogCommentsReducer = (state, action) => {
    switch(action.type){
        case constants.blogs.LIST_BLOG_COMMENTS_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.LIST_BLOG_COMMENTS_SUCCESS: 
            return {loading:false, error:null, comments:action.payload} 
        case constants.blogs.LIST_BLOG_COMMENTS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.blogs.LIST_BLOG_COMMENTS_RESET: 
            return {loading:false, error:null, comments:null} 
        default:
            return {...state}
    }
}

const addBlogComment = (state, action) => {
    switch(action.type){
        case constants.blogs.ADD_BLOG_COMMENT_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.ADD_BLOG_COMMENT_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.blogs.ADD_BLOG_COMMENT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.blogs.ADD_BLOG_COMMENT_RESET: 
            return {loading:false, error:null, message:null} 
        default:
            return {...state}
    }
}

const deleteBlogComment = (state, action) => {
    switch(action.type){
        case constants.blogs.DELETE_BLOG_COMMENT_REQUEST: 
            return {loading:true, error:null} 
        case constants.blogs.DELETE_BLOG_COMMENT_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.blogs.DELETE_BLOG_COMMENT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.blogs.DELETE_BLOG_COMMENT_RESET: 
            return {loading:false, error:null, blogs:null} 
        default:
            return {...state}
    }
}

const blogReducer = {
    blogs:listBlogsReducer,
    blog:getBlogDataReducer,
    blogComments:listBlogCommentsReducer,
    addBlogComment:addBlogComment,
    deleteBlog:deleteBlogComment,
    blogViews:controlBlogViewsReducer
}

export default blogReducer