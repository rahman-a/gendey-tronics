import constants from '../constants'
import api from '../api'

const createInstructor = (info) => async (dispatch) => {
  dispatch({ type: constants.instructor.INSTRUCTOR_CREATE_REQUEST })
  try {
    const { data } = await api.instructor.createInstructor(info)
    dispatch({
      type: constants.instructor.INSTRUCTOR_CREATE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.instructor.INSTRUCTOR_CREATE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getAllInstructors = (query) => async (dispatch) => {
  dispatch({ type: constants.instructor.INSTRUCTOR_LIST_REQUEST })
  try {
    const { data } = await api.instructor.getAllInstructors(query)
    dispatch({
      type: constants.instructor.INSTRUCTOR_LIST_SUCCESS,
      payload: { instructors: data.instructors, count: data.count },
    })
  } catch (error) {
    dispatch({
      type: constants.instructor.INSTRUCTOR_LIST_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateInstructor = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.instructor.INSTRUCTOR_UPDATE_REQUEST })
  try {
    const { data } = await api.instructor.updateInstructor(id, info)

    const { instructors, count } = getState().listInstructors

    if (instructors) {
      const newInstructors = [...instructors]
      const index = instructors.findIndex((instructor) => instructor._id === id)
      newInstructors[index] = data.instructor
      dispatch({
        type: constants.instructor.INSTRUCTOR_LIST_SUCCESS,
        payload: { instructors: newInstructors, count },
      })
    }

    dispatch({
      type: constants.instructor.INSTRUCTOR_UPDATE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.instructor.INSTRUCTOR_UPDATE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteInstructor = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.instructor.INSTRUCTOR_DELETE_REQUEST })
  try {
    const { data } = await api.instructor.deleteInstructor(id)
    const { instructors, count } = getState().listInstructors

    if (instructors) {
      const newInstructors = instructors.filter(
        (instructor) => instructor._id !== id
      )
      dispatch({
        type: constants.instructor.INSTRUCTOR_LIST_SUCCESS,
        payload: { instructors: newInstructors, count: count - 1 },
      })
    }

    dispatch({
      type: constants.instructor.INSTRUCTOR_DELETE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.instructor.INSTRUCTOR_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listInstructorReviews = (id) => async (dispatch) => {
  dispatch({ type: constants.instructor.INSTRUCTOR_REVIEWS_REQUEST })
  try {
    const { data } = await api.instructor.getInstructorReviews(id)
    dispatch({
      type: constants.instructor.INSTRUCTOR_REVIEWS_SUCCESS,
      payload: data.reviews,
    })
  } catch (error) {
    dispatch({
      type: constants.instructor.INSTRUCTOR_REVIEWS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  createInstructor,
  getAllInstructors,
  updateInstructor,
  deleteInstructor,
  listInstructorReviews,
}

export default actions
