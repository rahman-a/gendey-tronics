import service from './service'

const instructorAPI = {
  getAllInstructors: (query) => {
    const queryObject = {}
    for (let key in query) {
      if (query[key]) {
        queryObject[key] = query[key]
      }
    }
    const queryString = new URLSearchParams(queryObject).toString()
    return service().get(`/instructors?${queryString}`)
  },
  createInstructor: (data) => {
    return service().post('/instructors/add', data)
  },
  updateInstructor: (id, data) => {
    return service().patch(`/instructors/${id}`, data)
  },
  deleteInstructor: (id) => {
    return service().delete(`/instructors/${id}`)
  },
  getInstructorReviews: (id) => {
    return service().get(`/instructors/${id}/reviews`)
  },
}

export default instructorAPI
