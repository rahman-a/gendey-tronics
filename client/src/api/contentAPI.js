import { service } from './service'

export const contentAPI = {
  listNavItems: () => {
    return service().get('/menu')
  },
  listGalleryItems: (query) => {
    const queryObject = {}
    for (let key in query) {
      if (query[key]) {
        queryObject[key] = query[key]
      }
    }
    const queryString = new URLSearchParams(queryObject).toString()
    console.log('queryString: ', queryString)
    return service().get(`/media?${queryString}`)
  },
}
