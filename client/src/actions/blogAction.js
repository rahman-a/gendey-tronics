import constants from '../constants'
import api from '../api'

const listBlogs = (_) => async (dispatch) => {
  dispatch({ type: constants.blogs.LIST_BLOGS_REQUEST })
  try {
    const { data } = await api.blogs.listBlogs()
    dispatch({ type: constants.blogs.LIST_BLOGS_SUCCESS, payload: data.blogs })
  } catch (error) {
    dispatch({
      type: constants.blogs.LIST_BLOGS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getOneBlog = (id) => async (dispatch) => {
  dispatch({ type: constants.blogs.GET_BLOG_REQUEST })
  try {
    const { data } = await api.blogs.getBlog(id)
    dispatch({ type: constants.blogs.GET_BLOG_SUCCESS, payload: data.blog })
  } catch (error) {
    dispatch({
      type: constants.blogs.GET_BLOG_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const controlBlogView = (id) => async (dispatch) => {
  dispatch({ type: constants.blogs.CONTROL_BLOG_VIEWS_REQUEST })
  try {
    const { data } = await api.blogs.blogViews(id)
    dispatch({
      type: constants.blogs.CONTROL_BLOG_VIEWS_SUCCESS,
      payload: data.seen,
    })
  } catch (error) {
    dispatch({
      type: constants.blogs.CONTROL_BLOG_VIEWS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listBlogComments = (id) => async (dispatch) => {
  dispatch({ type: constants.blogs.LIST_BLOG_COMMENTS_REQUEST })
  try {
    const { data } = await api.blogs.listBlogComments(id)
    dispatch({
      type: constants.blogs.LIST_BLOG_COMMENTS_SUCCESS,
      payload: data.comments,
    })
  } catch (error) {
    dispatch({
      type: constants.blogs.LIST_BLOG_COMMENTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const addBlogComment = (id, comment) => async (dispatch, getState) => {
  dispatch({ type: constants.blogs.ADD_BLOG_COMMENT_REQUEST })
  try {
    const { data } = await api.blogs.addBlogComment(id, comment)
    let { blog } = getState().blog
    blog.comments = blog.comments.concat(data.comment)
    dispatch({ type: constants.blogs.GET_BLOG_SUCCESS, payload: blog })
    dispatch({
      type: constants.blogs.ADD_BLOG_COMMENT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.blogs.ADD_BLOG_COMMENT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteBlogComment = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.blogs.DELETE_BLOG_COMMENT_REQUEST })
  try {
    const { data } = await api.blogs.deleteBlogComment(id)
    let { blog } = getState().blog
    blog.comments = blog.comments.filter(
      (comment) => comment._id.toString() !== data.comment.toString()
    )
    dispatch({ type: constants.blogs.GET_BLOG_SUCCESS, payload: blog })
    dispatch({
      type: constants.blogs.DELETE_BLOG_COMMENT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.blogs.DELETE_BLOG_COMMENT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const blogAction = {
  blogs: listBlogs,
  blog: getOneBlog,
  blogViews: controlBlogView,
  blogComments: listBlogComments,
  addBlogComment,
  deleteBlogComment,
}
export default blogAction
