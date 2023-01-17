import service from './service'

const mediaAPI = {
  createMedia(data) {
    return service().post('/media', data)
  },
  listMedia(query) {
    const queryObject = {}
    for (let key in query) {
      if (query[key]) {
        queryObject[key] = query[key]
      }
    }
    const queryString = new URLSearchParams(queryObject).toString()
    return service().get(`/media?${queryString}`)
  },
  updateMedia(id, data) {
    return service().put(`/media/${id}`, data)
  },
  deleteMedia(id) {
    return service().delete(`/media/${id}`)
  },
}

export default mediaAPI
