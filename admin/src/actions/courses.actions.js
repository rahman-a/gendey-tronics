import constants from '../constants'
import api from '../api'

const listCourses = (query) => async (dispatch) => {
  dispatch({ type: constants.courses.LIST_COURSES_REQUEST })

  try {
    const { data } = await api.courses.index(query)
    dispatch({
      type: constants.courses.LIST_COURSES_SUCCESS,
      courses: data.courses,
      count: data.count,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.LIST_COURSES_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createCourse = (info) => async (dispatch) => {
  dispatch({ type: constants.courses.CREATE_COURSE_REQUEST })
  try {
    const { data } = await api.courses.create(info)
    dispatch({
      type: constants.courses.CREATE_COURSE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.CREATE_COURSE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getCourse = (id) => async (dispatch) => {
  dispatch({ type: constants.courses.GET_COURSE_REQUEST })

  try {
    const { data } = await api.courses.getCourse(id)
    dispatch({
      type: constants.courses.GET_COURSE_SUCCESS,
      payload: data.course,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.GET_COURSE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteCourse = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.DELETE_COURSE_REQUEST })

  try {
    const { data } = await api.courses.delete(id)

    const { courses, count } = getState().listAllCourses

    if (courses) {
      const filteredCourses = courses.filter((course) => course._id !== id)
      dispatch({
        type: constants.courses.LIST_COURSES_SUCCESS,
        courses: filteredCourses,
        count: count - 1,
      })
    }

    dispatch({
      type: constants.courses.DELETE_COURSE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.DELETE_COURSE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateCourse = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.UPDATE_COURSE_REQUEST })

  try {
    const { data } = await api.courses.updateCourse(id, info)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      for (let key in data.course) {
        if (key !== 'instructor') copiedCourse[key] = data.course[key]
      }
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.UPDATE_COURSE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.UPDATE_COURSE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateCourseImage = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.UPDATE_COURSE_IMAGE_REQUEST })

  try {
    const { data } = await api.courses.updateImage(id, info)

    const { course } = getState().getCourse

    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.image = data.image
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.UPDATE_COURSE_IMAGE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.UPDATE_COURSE_IMAGE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createChapter = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.CREATE_CHAPTER_REQUEST })

  try {
    const { data } = await api.courses.createChapter(id, info)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      const filteredChapter = copiedCourse.chapters.filter(
        (chapter) => chapter._id !== data.chapter._id
      )
      copiedCourse.chapters = [
        ...filteredChapter,
        { ...data.chapter, lessons: [] },
      ]
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.CREATE_CHAPTER_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.CREATE_CHAPTER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateChapter = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.UPDATE_CHAPTER_REQUEST })

  try {
    const { data } = await api.courses.updateChapter(id, info)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.chapters.forEach((chapter) => {
        if (chapter._id === id) {
          chapter.title = data.chapter.title
          chapter.isPaid = data.chapter.isPaid
        }
      })
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.UPDATE_CHAPTER_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.UPDATE_CHAPTER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteChapter = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.DELETE_CHAPTER_REQUEST })

  try {
    const { data } = await api.courses.deleteChapter(id)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.chapters = copiedCourse.chapters.filter(
        (chapter) => chapter._id !== id
      )
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }
    dispatch({
      type: constants.courses.DELETE_CHAPTER_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.DELETE_CHAPTER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createLesson = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.CREATE_LESSON_REQUEST })
  try {
    const { data } = await api.courses.createLesson(id, info)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.chapters.forEach((chapter) => {
        if (chapter._id === id) {
          const filteredLessons = chapter.lessons.filter(
            (lesson) => lesson._id !== data.lesson._id
          )
          chapter.lessons = [...filteredLessons, data.lesson]
        }
      })
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.CREATE_LESSON_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.CREATE_LESSON_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateLesson = (id, chapterId, info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.UPDATE_LESSON_REQUEST })
  try {
    const { data } = await api.courses.updateLesson(id, info)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.chapters.forEach((chapter) => {
        if (chapter._id === chapterId) {
          chapter.lessons.forEach((lesson) => {
            if (lesson._id === id) {
              for (let key in lesson) {
                lesson[key] = data.lesson[key]
              }
            }
          })
        }
      })

      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.UPDATE_LESSON_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.UPDATE_LESSON_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteLesson = (id, chapterId) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.DELETE_LESSON_REQUEST })
  try {
    const { data } = await api.courses.deleteLesson(id)

    const { course } = getState().getCourse

    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.chapters.forEach((chapter) => {
        if (chapter._id === chapterId) {
          const filtered = chapter.lessons.filter((lesson) => lesson._id !== id)
          chapter.lessons = filtered
        }
      })

      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.DELETE_LESSON_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.DELETE_LESSON_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listInstructors = (_) => async (dispatch) => {
  dispatch({ type: constants.courses.LIST_INSTRUCTORS_REQUEST })
  try {
    const { data } = await api.courses.instructors()
    dispatch({
      type: constants.courses.LIST_INSTRUCTORS_SUCCESS,
      payload: data.instructors,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.LIST_INSTRUCTORS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listCourseEnrollments = (id) => async (dispatch) => {
  dispatch({ type: constants.courses.LIST_ENROLLMENTS_REQUEST })

  try {
    const { data } = await api.courses.enrollments(id)
    dispatch({
      type: constants.courses.LIST_ENROLLMENTS_SUCCESS,
      payload: data.enrollments,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.LIST_ENROLLMENTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const togglePublish = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.TOGGLE_PUBLISH_REQUEST })

  try {
    const { data } = await api.courses.togglePublish(id)
    const { course } = getState().getCourse

    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.isPublished = data.isPublished

      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.TOGGLE_PUBLISH_SUCCESS,
      payload: data.isPublished,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.TOGGLE_PUBLISH_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createEnrollment = (id, enrollment) => async (dispatch) => {
  dispatch({ type: constants.courses.CREATE_ENROLLMENT_REQUEST })

  try {
    const { data } = await api.courses.newEnrollment(id, enrollment)
    dispatch({
      type: constants.courses.CREATE_ENROLLMENT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.CREATE_ENROLLMENT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteLink = (id, link) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.DELETE_LINK_REQUEST })

  try {
    const { data } = await api.courses.deleteLink(id, link)
    const { course } = getState().getCourse
    if (course) {
      const copiedCourse = { ...course }
      copiedCourse.driveFile = copiedCourse.driveFile.filter(
        (lk) => lk._id.toString() !== link
      )
      dispatch({
        type: constants.courses.GET_COURSE_SUCCESS,
        payload: copiedCourse,
      })
    }

    dispatch({
      type: constants.courses.DELETE_LINK_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.DELETE_LINK_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listCoupons = () => async (dispatch) => {
  dispatch({ type: constants.courses.LIST_COUPONS_REQUEST })

  try {
    const { data } = await api.courses.coupons()

    dispatch({
      type: constants.courses.LIST_COUPONS_SUCCESS,
      coupons: data.coupons,
      count: data.count,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.LIST_COUPONS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createCoupons = (info) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.CREATE_COUPON_REQUEST })

  try {
    const { data } = await api.courses.createCoupon(info)
    const { coupons, count } = getState().listCoupons
    if (coupons) {
      let copiedCoupons = JSON.parse(JSON.stringify(coupons))
      copiedCoupons = copiedCoupons.concat(data.coupon)
      dispatch({
        type: constants.courses.LIST_COUPONS_SUCCESS,
        coupons: copiedCoupons,
        count: count + 1,
      })
    }
    dispatch({
      type: constants.courses.CREATE_COUPON_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.CREATE_COUPON_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteCoupons = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.DELETE_COUPON_REQUEST })

  try {
    const { data } = await api.courses.deleteCoupons(id)
    const { coupons, count } = getState().listCoupons
    if (coupons) {
      let copiedCoupons = JSON.parse(JSON.stringify(coupons))
      copiedCoupons = copiedCoupons.filter((coupon) => coupon._id !== id)

      dispatch({
        type: constants.courses.LIST_COUPONS_SUCCESS,
        coupons: copiedCoupons,
        count: count - 1,
      })
    }
    dispatch({
      type: constants.courses.DELETE_COUPON_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.DELETE_COUPON_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  listCourses,
  createCourse,
  getCourse,
  deleteCourse,
  updateCourse,
  updateCourseImage,
  createChapter,
  updateChapter,
  deleteChapter,
  createLesson,
  updateLesson,
  deleteLesson,
  listInstructors,
  listCourseEnrollments,
  togglePublish,
  createEnrollment,
  deleteLink,
  listCoupons,
  createCoupons,
  deleteCoupons,
}

export default actions
