import constants from "../constants";


const listAllCourses = (state, action) => {
    const cases = {
        [constants.courses.LIST_COURSES_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.LIST_COURSES_SUCCESS]: 
        {
            loading:false,
            courses:action.courses ,
            count:action.count
        },
        [constants.courses.LIST_COURSES_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.LIST_COURSES_RESET]: 
        {
            loading:false,
            error:null,
            course:null,
            count:0
        }
    }

    return cases[action.type] || {...state}
}

const deleteCourse = (state, action) => {
    const cases = {
        [constants.courses.DELETE_COURSE_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.DELETE_COURSE_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.DELETE_COURSE_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.DELETE_COURSE_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const createCourse = (state, action) => {
    const cases = {
        [constants.courses.CREATE_COURSE_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.CREATE_COURSE_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.CREATE_COURSE_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.CREATE_COURSE_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const getCourse = (state, action) => {
    const cases = {
        [constants.courses.GET_COURSE_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.GET_COURSE_SUCCESS]: 
        {
            loading:false,
            course:action.payload
        },
        [constants.courses.GET_COURSE_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.GET_COURSE_RESET]: 
        {
            loading:false,
            error:null,
            course:null
        }
    }

    return cases[action.type] || {...state}
}

const updateCourse = (state, action) => {
    const cases = {
        [constants.courses.UPDATE_COURSE_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.UPDATE_COURSE_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.UPDATE_COURSE_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.UPDATE_COURSE_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const updateCourseImage = (state, action) => {
    const cases = {
        [constants.courses.UPDATE_COURSE_IMAGE_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.UPDATE_COURSE_IMAGE_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.UPDATE_COURSE_IMAGE_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.UPDATE_COURSE_IMAGE_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const updateChapter = (state, action) => {
    const cases = {
        [constants.courses.UPDATE_CHAPTER_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.UPDATE_CHAPTER_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.UPDATE_CHAPTER_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.UPDATE_CHAPTER_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const createChapter = (state, action) => {
    const cases = {
        [constants.courses.CREATE_CHAPTER_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.CREATE_CHAPTER_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.CREATE_CHAPTER_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.CREATE_CHAPTER_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const deleteChapter = (state, action) => {
    const cases = {
        [constants.courses.DELETE_CHAPTER_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.DELETE_CHAPTER_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.DELETE_CHAPTER_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.DELETE_CHAPTER_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const createLesson = (state, action) => {
    const cases = {
        [constants.courses.CREATE_LESSON_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.CREATE_LESSON_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.CREATE_LESSON_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.CREATE_LESSON_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const updateLesson = (state, action) => {
    const cases = {
        [constants.courses.UPDATE_LESSON_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.UPDATE_LESSON_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.UPDATE_LESSON_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.UPDATE_LESSON_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const deleteLesson = (state, action) => {
    const cases = {
        [constants.courses.DELETE_LESSON_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.DELETE_LESSON_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.DELETE_LESSON_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.DELETE_LESSON_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const instructors = (state, action) => {
    const cases = {
        [constants.courses.LIST_INSTRUCTORS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.LIST_INSTRUCTORS_SUCCESS]: 
        {
            loading:false,
            instructors:action.payload
        },
        [constants.courses.LIST_INSTRUCTORS_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.LIST_INSTRUCTORS_RESET]: 
        {
            loading:false,
            error:null,
            instructors:null
        }
    }

    return cases[action.type] || {...state}
}

const listCourseEnrollments = (state, action) => {
    const cases = {
        [constants.courses.LIST_ENROLLMENTS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.LIST_ENROLLMENTS_SUCCESS]: 
        {
            loading:false,
            enrollments:action.payload,
        },
        [constants.courses.LIST_ENROLLMENTS_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.LIST_ENROLLMENTS_RESET]: 
        {
            loading:false,
            error:null,
            enrollments:null,
        }
    }

    return cases[action.type] || {...state}
}


const togglePublish = (state, action) => {
    
    const cases = {
        [constants.courses.TOGGLE_PUBLISH_REQUEST] : 
        {
            loading:true,
            error:null
        },
        [constants.courses.TOGGLE_PUBLISH_SUCCESS]: 
        {
            loading:false,
            error:null,
            isPublished:action.payload
        },
        [constants.courses.TOGGLE_PUBLISH_FAIL]:
        {
            loading:false,
            error:action.payload
        },
        [constants.courses.TOGGLE_PUBLISH_RESET]: 
        {
            loading:false,
            error:null,
            isPublished:false
        }
    }

    return cases[action.type] || {...state}
}

const createEnrollment = (state, action) => {
    
    const cases = {
        [constants.courses.CREATE_ENROLLMENT_REQUEST] : 
        {
            loading:true,
            error:null
        },
        [constants.courses.CREATE_ENROLLMENT_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.payload
        },
        [constants.courses.CREATE_ENROLLMENT_FAIL]:
        {
            loading:false,
            error:action.payload
        },
        [constants.courses.CREATE_ENROLLMENT_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const deleteCourseLink = (state, action) => {
    const cases = {
        [constants.courses.DELETE_LINK_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.DELETE_LINK_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.DELETE_LINK_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.DELETE_LINK_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const listCoupons = (state, action) => {
    const cases = {
        [constants.courses.LIST_COUPONS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.LIST_COUPONS_SUCCESS]: 
        {
            loading:false,
            coupons:action.coupons,
            count:action.count
        },
        [constants.courses.LIST_COUPONS_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.LIST_COUPONS_RESET]: 
        {
            loading:false,
            error:null,
            coupons:null,
            count:0
        }
    }

    return cases[action.type] || {...state}
}

const createCoupon = (state, action) => {
    const cases = {
        [constants.courses.CREATE_COUPON_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.CREATE_COUPON_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.CREATE_COUPON_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.CREATE_COUPON_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const deleteCoupon = (state, action) => {
    const cases = {
        [constants.courses.DELETE_COUPON_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.courses.DELETE_COUPON_SUCCESS]: 
        {
            loading:false,
            message:action.payload
        },
        [constants.courses.DELETE_COUPON_FAIL]: {
            loading:false,
            error:action.payload 
        },
        [constants.courses.DELETE_COUPON_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const reducers = {
    listAllCourses,
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
    instructors,
    listCourseEnrollments,
    togglePublish,
    createEnrollment,
    deleteCourseLink,
    createCoupon,
    deleteCoupon,
    listCoupons
}

export default reducers