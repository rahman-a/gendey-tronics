import constants from '../constants'

const createInstructor = (state, action) => {
  const cases = {
    [constants.instructor.INSTRUCTOR_CREATE_REQUEST]: {
      ...state,
      isLoading: true,
      error: false,
    },
    [constants.instructor.INSTRUCTOR_CREATE_SUCCESS]: {
      ...state,
      isLoading: false,
      error: false,
      message: action.payload,
    },
    [constants.instructor.INSTRUCTOR_CREATE_FAIL]: {
      ...state,
      isLoading: false,
      error: action.payload,
    },
    [constants.instructor.INSTRUCTOR_CREATE_RESET]: {
      ...state,
      isLoading: false,
      isError: false,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const listInstructors = (state, action) => {
  const cases = {
    [constants.instructor.INSTRUCTOR_LIST_REQUEST]: {
      ...state,
      isLoading: true,
      error: false,
    },
    [constants.instructor.INSTRUCTOR_LIST_SUCCESS]: {
      ...state,
      isLoading: false,
      error: false,
      instructors: action.payload?.instructors,
      count: action.payload?.count,
    },
    [constants.instructor.INSTRUCTOR_LIST_FAIL]: {
      ...state,
      isLoading: false,
      error: action.payload,
    },
    [constants.instructor.INSTRUCTOR_LIST_RESET]: {
      ...state,
      isLoading: false,
      isError: false,
      instructors: null,
      count: null,
    },
  }

  return cases[action.type] || { ...state }
}

const updateInstructor = (state, action) => {
  const cases = {
    [constants.instructor.INSTRUCTOR_UPDATE_REQUEST]: {
      ...state,
      isLoading: true,
      error: false,
    },
    [constants.instructor.INSTRUCTOR_UPDATE_SUCCESS]: {
      ...state,
      isLoading: false,
      error: false,
      message: action.payload,
    },
    [constants.instructor.INSTRUCTOR_UPDATE_FAIL]: {
      ...state,
      isLoading: false,
      error: action.payload,
    },
    [constants.instructor.INSTRUCTOR_UPDATE_RESET]: {
      ...state,
      isLoading: false,
      isError: false,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const deleteInstructor = (state, action) => {
  const cases = {
    [constants.instructor.INSTRUCTOR_DELETE_REQUEST]: {
      ...state,
      isLoading: true,
      error: false,
    },
    [constants.instructor.INSTRUCTOR_DELETE_SUCCESS]: {
      ...state,
      isLoading: false,
      error: false,
      message: action.payload,
    },
    [constants.instructor.INSTRUCTOR_DELETE_FAIL]: {
      ...state,
      isLoading: false,
      error: action.payload,
    },
    [constants.instructor.INSTRUCTOR_DELETE_RESET]: {
      ...state,
      isLoading: false,
      isError: false,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const listInstructorReviews = (state, action) => {
  const cases = {
    [constants.instructor.INSTRUCTOR_REVIEWS_REQUEST]: {
      ...state,
      isLoading: true,
      error: false,
    },
    [constants.instructor.INSTRUCTOR_REVIEWS_SUCCESS]: {
      ...state,
      isLoading: false,
      error: false,
      reviews: action.payload,
    },
    [constants.instructor.INSTRUCTOR_REVIEWS_FAIL]: {
      ...state,
      isLoading: false,
      error: action.payload,
    },
    [constants.instructor.INSTRUCTOR_REVIEWS_RESET]: {
      ...state,
      isLoading: false,
      isError: false,
      reviews: null,
    },
  }

  return cases[action.type] || { ...state }
}

const reducer = {
  createInstructor,
  listInstructors,
  updateInstructor,
  deleteInstructor,
  listInstructorReviews,
}

export default reducer
